"""
============================================================
  SERVICE WEBPAGE — Nerd Stats Server
  Developed by SOX
  © 2026

  Licensed under the PolyForm Noncommercial License 1.0.0
  https://polyformproject.org/licenses/noncommercial/1.0.0
  Required Notice: Copyright 2026 SOX
============================================================
 
  Reads the PC's CPU, RAM, GPU and disk activity and exposes
  them as JSON at http://127.0.0.1:8765/stats, for the
  "NERD STATS" panel of the dashboard.

  It also serves the dashboard itself at http://127.0.0.1:8765/
  and keeps the dashboard data in files (see "DATA FILES" below),
  so that the data do not depend on the browser's site data.
 
  Designed to run on Windows ONLY (uses ctypes/WinDLL and,
  for the disk, a counter read through PowerShell).
 
  Recommended start: via install-stats.bat, which
  registers a scheduled task started at every Windows
  logon. It can still be run manually with:
      pythonw stats_server.py      (no console window)
      python stats_server.py       (with console window, useful
                                     for seeing any errors)
 
  To verify that it works, with the server running open in
  the browser: http://127.0.0.1:8765/stats
 
============================================================
"""
 
import ctypes
import email.utils
import json
import mimetypes
import os
import re
import shutil
import threading
import time
import urllib.parse
from concurrent.futures import ThreadPoolExecutor
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
 
 
# =========================
# CONFIGURATION
# =========================
 
PORT = 8765
 
REFRESH_SECONDS = 1.0
 
# Sampling stays active only if the dashboard has requested data
# within the last IDLE_SECONDS seconds. After that, the service waits
# (almost no consumption) and resumes on the first request.
IDLE_SECONDS = 30.0

# DATA FILES
# The dashboard state is saved in DATA_DIR/page1.json and page2.json.
# DATA_DIR comes from (in this order): the environment variable
# SERVICE_WEBPAGE_DATA_DIR, the "data_dir" value of config.json (next to
# this file), or the folder "ServiceWebpageData" in the user profile.
# Old versions of the files are kept in DATA_DIR/backups.
BACKUP_MIN_INTERVAL_SECONDS = 600
BACKUP_KEEP = 30
MAX_STATE_BYTES = 5 * 1024 * 1024
 
 
kernel32 = ctypes.WinDLL("kernel32", use_last_error=True)
 
 
class FILETIME(ctypes.Structure):
    _fields_ = [
        ("dwLowDateTime", ctypes.c_uint32),
        ("dwHighDateTime", ctypes.c_uint32),
    ]
 
 
class MEMORYSTATUSEX(ctypes.Structure):
    _fields_ = [
        ("dwLength", ctypes.c_uint32),
        ("dwMemoryLoad", ctypes.c_uint32),
        ("ullTotalPhys", ctypes.c_uint64),
        ("ullAvailPhys", ctypes.c_uint64),
        ("ullTotalPageFile", ctypes.c_uint64),
        ("ullAvailPageFile", ctypes.c_uint64),
        ("ullTotalVirtual", ctypes.c_uint64),
        ("ullAvailVirtual", ctypes.c_uint64),
        ("ullAvailExtendedVirtual", ctypes.c_uint64),
    ]
 
 
kernel32.GetSystemTimes.argtypes = [
    ctypes.POINTER(FILETIME),
    ctypes.POINTER(FILETIME),
    ctypes.POINTER(FILETIME),
]
kernel32.GetSystemTimes.restype = ctypes.c_bool
 
kernel32.GlobalMemoryStatusEx.argtypes = [
    ctypes.POINTER(MEMORYSTATUSEX)
]
kernel32.GlobalMemoryStatusEx.restype = ctypes.c_bool
 
 
def _filetime_to_int(filetime):
    return (filetime.dwHighDateTime << 32) | filetime.dwLowDateTime
 
 
def get_cpu_usage(previous=None):
    idle = FILETIME()
    kernel = FILETIME()
    user = FILETIME()
 
    if not kernel32.GetSystemTimes(
        ctypes.byref(idle),
        ctypes.byref(kernel),
        ctypes.byref(user),
    ):
        raise ctypes.WinError(ctypes.get_last_error())
 
    current = (
        _filetime_to_int(idle),
        _filetime_to_int(kernel),
        _filetime_to_int(user),
    )
 
    if previous is None:
        return None, current
 
    previous_idle, previous_kernel, previous_user = previous
 
    idle_delta = current[0] - previous_idle
    kernel_delta = current[1] - previous_kernel
    user_delta = current[2] - previous_user
    total_delta = kernel_delta + user_delta
 
    if total_delta <= 0:
        return 0.0, current
 
    usage = 100.0 * (1.0 - (idle_delta / total_delta))
    return max(0.0, min(100.0, usage)), current
 
 
def get_memory_usage():
    memory = MEMORYSTATUSEX()
    memory.dwLength = ctypes.sizeof(MEMORYSTATUSEX)
 
    if not kernel32.GlobalMemoryStatusEx(ctypes.byref(memory)):
        raise ctypes.WinError(ctypes.get_last_error())
 
    return {
        "usage_percent": float(memory.dwMemoryLoad),
        "total_bytes": int(memory.ullTotalPhys),
        "available_bytes": int(memory.ullAvailPhys),
        "used_bytes": int(memory.ullTotalPhys - memory.ullAvailPhys),
    }
 
 
def get_performance_counter_paths():
    import subprocess
 
    command = [
        "powershell",
        "-NoProfile",
        "-Command",
        """
        $sets = Get-Counter -ListSet * -ErrorAction SilentlyContinue
 
        $ssd = $sets |
            Where-Object {
                $_.Paths -match '.*(PhysicalDisk|Disco fisico).*'
            } |
            Select-Object -First 1
 
        [PSCustomObject]@{
 
            SSD = if ($ssd) {
                ($ssd.Paths | Where-Object {
                    $_ -match '(% Disk Time|% Tempo disco)'
                } | Select-Object -First 1)
            } else {
                $null
            }
        } | ConvertTo-Json -Compress
        """
    ]
 
    result = subprocess.run(
        command,
        capture_output=True,
        text=True,
        creationflags=subprocess.CREATE_NO_WINDOW,
    )
 
    if result.returncode != 0:
        return {
            "SSD": None,
        }
 
    try:
        return json.loads(result.stdout.strip())
    except (json.JSONDecodeError, TypeError):
        return {
            "SSD": None,
        }
 
 
def get_gpu_usage_amd():
    from adlx import ADLX
 
    helper = ADLX.ADLXHelper()
 
    try:
        if helper.Initialize() != ADLX.ADLX_OK:
            return None
 
        system = helper.GetSystemServices()
 
        if system is None:
            return None
 
        gpu_list = system.GetGPUs()
 
        if gpu_list is None:
            return None
 
        gpu = gpu_list[0]
 
        if gpu is None:
            return None
 
        services = system.GetPerformanceMonitoringServices()
 
        if services is None:
            return None
 
        support = services.GetSupportedGPUMetrics(gpu)
 
        if support is None:
            return None
 
        if not support.IsSupportedGPUUsage():
            return None
 
        metrics = services.GetCurrentGPUMetrics(gpu)
 
        if metrics is None:
            return None
 
        usage = metrics.GPUUsage()
 
        if usage is None:
            return None
 
        return max(0.0, min(100.0, float(usage)))
 
    finally:
        if "metrics" in locals():
            del metrics
 
        if "support" in locals():
            del support
 
        if "services" in locals():
            del services
 
        if "gpu" in locals():
            del gpu
 
        if "gpu_list" in locals():
            del gpu_list
 
        if "system" in locals():
            del system
 
        helper.Terminate()
 
 
def get_gpu_usage_nvidia():
    try:
        import pynvml
 
        pynvml.nvmlInit()
 
        try:
            device_count = pynvml.nvmlDeviceGetCount()
 
            if device_count <= 0:
                return None
 
            device = pynvml.nvmlDeviceGetHandleByIndex(0)
 
            utilization = pynvml.nvmlDeviceGetUtilizationRates(device)
 
            return max(0.0, min(100.0, float(utilization.gpu)))
 
        finally:
            pynvml.nvmlShutdown()
 
    except Exception:
        return None
 
 
def get_gpu_usage_windows():
    import subprocess
 
    command = [
        "powershell",
        "-NoProfile",
        "-Command",
        "Get-CimInstance Win32_PerfFormattedData_GPUPerformanceCounters_GPUEngine "
        "-ErrorAction SilentlyContinue | "
        "ForEach-Object { \"$($_.Name)|$($_.UtilizationPercentage)\" }",
    ]
 
    result = subprocess.run(
        command,
        capture_output=True,
        text=True,
        creationflags=subprocess.CREATE_NO_WINDOW,
    )
 
    if result.returncode != 0:
        return None
 
    marker = "engtype_"
    totals = {}
 
    for line in result.stdout.splitlines():
        name, separator, raw = line.rpartition("|")
 
        if not separator:
            continue
 
        index = name.find(marker)
 
        if index < 0:
            continue
 
        try:
            value = float(raw.strip().replace(",", "."))
        except ValueError:
            continue
 
        engine_type = name[index + len(marker):]
        totals[engine_type] = totals.get(engine_type, 0.0) + value
 
    if not totals:
        return None
 
    return max(0.0, min(100.0, max(totals.values())))
 
 
# =========================
# AUTOMATIC SOURCE DETECTION
# =========================
#
# Every PC has different components: a metric can have several
# possible sources. MetricProbe tries them in order, remembers the
# first one that returns a value and from then on uses only that one.
# If the remembered source fails FAIL_LIMIT readings in a row,
# the search starts again. If no source works, the value stays
# None and the search is retried every RESEARCH_SECONDS.
 
class MetricProbe:
 
    FAIL_LIMIT = 3
    RESEARCH_SECONDS = 30.0
 
    def __init__(self, sources):
        self._sources = sources
        self._active = None
        self._fail_count = 0
        self._next_search = 0.0
 
    @staticmethod
    def _call(source):
        try:
            return source()
        except Exception:
            return None
 
    def read(self):
 
        if self._active is not None:
            value = self._call(self._active)
 
            if value is not None:
                self._fail_count = 0
                return value
 
            self._fail_count += 1
 
            if self._fail_count < self.FAIL_LIMIT:
                return None
 
            self._active = None
            self._fail_count = 0
 
        now = time.time()
 
        if now < self._next_search:
            return None
 
        for source in self._sources:
            value = self._call(source)
 
            if value is not None:
                self._active = source
                return value
 
        self._next_search = now + self.RESEARCH_SECONDS
        return None
 
 
def get_disk_usage_wmi():
    # WMI class with NON-localized names: works with any
    # Windows language.
    import subprocess
 
    command = [
        "powershell",
        "-NoProfile",
        "-Command",
        "Get-CimInstance Win32_PerfFormattedData_PerfDisk_PhysicalDisk "
        "-ErrorAction SilentlyContinue | "
        "Where-Object { $_.Name -eq '_Total' } | "
        "ForEach-Object { $_.PercentDiskTime }",
    ]
 
    result = subprocess.run(
        command,
        capture_output=True,
        text=True,
        creationflags=subprocess.CREATE_NO_WINDOW,
    )
 
    if result.returncode != 0:
        return None
 
    for line in result.stdout.splitlines():
        try:
            value = float(line.strip().replace(",", "."))
        except ValueError:
            continue
 
        return max(0.0, min(100.0, value))
 
    return None
 
 
_disk_counter_cache = {"resolved": False, "path": None}
 
 
def get_disk_usage_counter():
    # Second source: PowerShell counter (localized names,
    # recognized only for English and Italian).
    if not _disk_counter_cache["resolved"]:
        paths = get_performance_counter_paths()
        _disk_counter_cache["path"] = paths.get("SSD")
        _disk_counter_cache["resolved"] = True
 
    return get_ssd_usage(_disk_counter_cache["path"])
 
 
def get_ssd_usage(counter_path):
    import subprocess
 
    if not counter_path:
        return None
 
    command = [
        "powershell",
        "-NoProfile",
        "-Command",
        f"(Get-Counter '{counter_path}').CounterSamples | "
        "Where-Object { $_.CookedValue -ge 0 } | "
        "ForEach-Object { $_.CookedValue }",
    ]
 
    result = subprocess.run(
        command,
        capture_output=True,
        text=True,
        creationflags=subprocess.CREATE_NO_WINDOW,
    )
 
    if result.returncode != 0:
        return None
 
    values = []
 
    for line in result.stdout.splitlines():
        try:
            value = float(line.strip().replace(",", "."))
            if value >= 0:
                values.append(value)
        except ValueError:
            continue
 
    if not values:
        return None
 
    return max(0.0, min(100.0, max(values)))
 
 
# =========================
# SHARED STATE
# =========================
#
# The background thread writes the latest values here,
# once per second. The HTTP server reads only from here:
# it recalculates nothing at request time, so it
# always answers instantly.
 
_state_lock = threading.Lock()
 
_latest = {
    "cpu": None,
    "ram": None,
    "gpu": None,
    "disk": None,
    "timestamp": None,
}
 
_activity_state = {"last": 0.0}
_activity = threading.Event()
 
 
def _mark_activity():
    with _state_lock:
        _activity_state["last"] = time.monotonic()
 
    _activity.set()
 
 
def _publish(**values):
    with _state_lock:
        _latest.update(values)
 
 
def _updater_loop():
 
    previous_cpu = None
 
    gpu_probe = MetricProbe([
        get_gpu_usage_amd,
        get_gpu_usage_nvidia,
        get_gpu_usage_windows,
    ])
 
    disk_probe = MetricProbe([
        get_disk_usage_wmi,
        get_disk_usage_counter,
    ])
 
    pool = ThreadPoolExecutor(max_workers=2)
 
    while True:
 
        with _state_lock:
            idle_for = time.monotonic() - _activity_state["last"]
 
        if idle_for > IDLE_SECONDS:
 
            # No recent requests: pause sampling,
            # clear the values (to avoid serving stale data) and
            # restart the CPU calculation from zero on resume.
            previous_cpu = None
 
            _publish(cpu=None, ram=None, gpu=None, disk=None, timestamp=None)
 
            _activity.clear()
            _activity.wait(timeout=2.0)
            continue
 
        cycle_start = time.time()
 
        # CPU and RAM are instantaneous: they are published right away,
        # without waiting for GPU and disk (which use PowerShell and are slower).
 
        try:
            cpu_usage, previous_cpu = get_cpu_usage(previous_cpu)
 
            if cpu_usage is None:
                # first sample after a pause: a second one is needed
                time.sleep(0.25)
                cpu_usage, previous_cpu = get_cpu_usage(previous_cpu)
        except Exception:
            cpu_usage = None
 
        try:
            memory = get_memory_usage()
            ram_usage = memory["usage_percent"]
        except Exception:
            ram_usage = None
 
        _publish(cpu=cpu_usage, ram=ram_usage, timestamp=time.time())
 
        # GPU and disk in parallel: the time taken is that of the slowest one,
        # not the sum of the two.
 
        gpu_future = pool.submit(gpu_probe.read)
        disk_future = pool.submit(disk_probe.read)
 
        try:
            gpu_usage = gpu_future.result()
        except Exception:
            gpu_usage = None
 
        try:
            disk_usage = disk_future.result()
        except Exception:
            disk_usage = None
 
        _publish(gpu=gpu_usage, disk=disk_usage, timestamp=time.time())
 
        elapsed = time.time() - cycle_start
 
        time.sleep(max(0.0, REFRESH_SECONDS - elapsed))
 
 
# =========================
# DATA FILES
# =========================

_BASE_DIR = os.path.dirname(os.path.abspath(__file__))
WEB_ROOT = os.path.realpath(os.path.dirname(_BASE_DIR))

# The only parts of the project served over HTTP (nothing else: not the
# system-monitor folder, not the provenance folder, not hidden files).
_WEB_DIRS = {"Page_1", "Page_2", "i18n", "shared", "transition"}
_WEB_FILES = {"index.html"}

# Only these file types are served: exports, backups, archives or any other
# file left by mistake inside the served folders are never exposed.
_WEB_EXTENSIONS = {
    ".html", ".css", ".js",
    ".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg", ".ico",
    ".woff", ".woff2", ".ttf", ".otf",
}

_STATE_PAGES = {"page1", "page2"}
_STATE_SCHEMA = 1
_data_lock = threading.Lock()


def _load_data_dir():
    configured = os.environ.get("SERVICE_WEBPAGE_DATA_DIR")

    if not configured:
        try:
            with open(os.path.join(_BASE_DIR, "config.json"), encoding="utf-8-sig") as handle:
                configured = json.load(handle).get("data_dir")
        except (OSError, ValueError, AttributeError):
            configured = None

    if not configured:
        configured = os.path.join(os.path.expanduser("~"), "ServiceWebpageData")

    return os.path.abspath(os.path.expandvars(os.path.expanduser(str(configured))))


DATA_DIR = _load_data_dir()


def _state_path(page):
    return os.path.join(DATA_DIR, page + ".json")


def _allowed_entry_keys(page):
    return {page, page + "_edited", page + "_meta", page + "_deletedServices"}


def _read_state_bytes(page):
    try:
        with open(_state_path(page), "rb") as handle:
            return handle.read()
    except FileNotFoundError:
        return None


def _prune_backups(page):
    backup_dir = os.path.join(DATA_DIR, "backups")

    try:
        names = sorted(
            name for name in os.listdir(backup_dir)
            if name.startswith(page + "_") and name.endswith(".json")
        )
    except OSError:
        return

    for name in names[:-BACKUP_KEEP]:
        try:
            os.remove(os.path.join(backup_dir, name))
        except OSError:
            pass


def _backup_current(page):
    # A copy of the file being replaced, at most one every
    # BACKUP_MIN_INTERVAL_SECONDS.
    source = _state_path(page)

    if not os.path.exists(source):
        return

    backup_dir = os.path.join(DATA_DIR, "backups")
    os.makedirs(backup_dir, exist_ok=True)

    newest = 0.0

    for name in os.listdir(backup_dir):
        if name.startswith(page + "_") and name.endswith(".json"):
            try:
                newest = max(newest, os.path.getmtime(os.path.join(backup_dir, name)))
            except OSError:
                pass

    if time.time() - newest < BACKUP_MIN_INTERVAL_SECONDS:
        return

    stamp = time.strftime("%Y%m%d_%H%M%S")
    shutil.copy2(source, os.path.join(backup_dir, f"{page}_{stamp}.json"))
    _prune_backups(page)


def _write_state(page, incoming):
    # Returns (http_status, payload).
    entries = incoming.get("entries")

    if incoming.get("schema") != _STATE_SCHEMA or incoming.get("page") != page \
            or not isinstance(entries, dict):
        return 400, {"error": "invalid_state"}

    if not set(entries.keys()) <= _allowed_entry_keys(page):
        return 400, {"error": "invalid_keys"}

    saved_at = incoming.get("savedAt")

    if not isinstance(saved_at, (int, float)) or isinstance(saved_at, bool):
        return 400, {"error": "invalid_state"}

    with _data_lock:
        os.makedirs(DATA_DIR, exist_ok=True)

        previous = _read_state_bytes(page)
        revision = 1

        if previous is not None:
            # Never replace existing data with an empty state.
            if not entries.get(page):
                return 409, {"error": "refused_empty_state"}

            try:
                revision = int(json.loads(previous.decode("utf-8")).get("revision", 0)) + 1
            except (ValueError, AttributeError, TypeError):
                revision = 1

            _backup_current(page)

        document = {
            "app": "service-webpage",
            "schema": _STATE_SCHEMA,
            "page": page,
            "revision": revision,
            "savedAt": saved_at,
            "entries": entries,
        }

        body = json.dumps(document, ensure_ascii=False, indent=1).encode("utf-8")

        target = _state_path(page)
        temporary = target + ".tmp"

        with open(temporary, "wb") as handle:
            handle.write(body)
            handle.flush()
            os.fsync(handle.fileno())

        os.replace(temporary, target)

    return 200, {"ok": True, "revision": revision}


# =========================
# HTTP SERVER
# =========================

ALLOWED_HOSTS = {f"127.0.0.1:{PORT}", f"localhost:{PORT}"}
CANONICAL_HOST = f"127.0.0.1:{PORT}"

# The dashboard opened from a file has the origin "null"; opened from a
# local web server it has an http(s) origin on the loopback address.
_ORIGIN_RE = re.compile(r"^https?://(127\.0\.0\.1|localhost)(:[0-9]{1,5})?$")

_MIME_OVERRIDES = {
    ".html": "text/html; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".js": "text/javascript; charset=utf-8",
    ".json": "application/json; charset=utf-8",
    ".svg": "image/svg+xml",
    ".webp": "image/webp",
    ".woff": "font/woff",
    ".woff2": "font/woff2",
    ".ttf": "font/ttf",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".gif": "image/gif",
    ".ico": "image/x-icon",
}


def _origin_allowed(origin):
    return origin is None or origin == "null" or bool(_ORIGIN_RE.match(origin))


def _resolve_web_path(url_path):
    # Maps a URL path to a file inside the served part of the project,
    # or returns None.
    decoded = urllib.parse.unquote(url_path)

    if "\x00" in decoded or "\\" in decoded or ":" in decoded:
        return None

    parts = [part for part in decoded.split("/") if part != ""]

    if any(part in (".", "..") or part.startswith(".") for part in parts):
        return None

    if not parts:
        parts = ["index.html"]

    if len(parts) == 1:
        if parts[0] not in _WEB_FILES:
            return None
    elif parts[0] not in _WEB_DIRS:
        return None

    candidate = os.path.realpath(os.path.join(WEB_ROOT, *parts))

    if os.path.isdir(candidate):
        candidate = os.path.join(candidate, "index.html")

    if not (candidate == WEB_ROOT or candidate.startswith(WEB_ROOT + os.sep)):
        return None

    top = os.path.relpath(candidate, WEB_ROOT).split(os.sep)

    if len(top) == 1:
        if top[0] not in _WEB_FILES:
            return None
    elif top[0] not in _WEB_DIRS:
        return None

    if os.path.splitext(candidate)[1].lower() not in _WEB_EXTENSIONS:
        return None

    return candidate if os.path.isfile(candidate) else None


class StatsHandler(BaseHTTPRequestHandler):

    # A client that stalls (slow or incomplete request) is dropped, so it
    # cannot keep a thread busy forever.
    timeout = 15

    def _request_allowed(self):
        # Host check: blocks DNS-rebinding (a hostile domain resolved to
        # 127.0.0.1). Origin check: blocks pages of other websites.
        host = (self.headers.get("Host") or "").lower()
        origin = self.headers.get("Origin")
        return host in ALLOWED_HOSTS and _origin_allowed(origin)

    def _same_origin_request(self):
        # Data API: only the dashboard served by this very server.
        host = (self.headers.get("Host") or "").lower()
        origin = self.headers.get("Origin")
        site = self.headers.get("Sec-Fetch-Site")
        return (
            host in ALLOWED_HOSTS
            and (origin is None or origin == f"http://{host}")
            and site in (None, "same-origin", "none")
        )

    def _send_common_headers(self):
        origin = self.headers.get("Origin")
        if origin is not None:
            self.send_header("Access-Control-Allow-Origin", origin)
            self.send_header("Vary", "Origin")
        self.send_header("Access-Control-Allow-Methods", "GET, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.send_header("Cache-Control", "no-store")
        self.send_header("X-Content-Type-Options", "nosniff")

    def _reject(self):
        self.send_response(403)
        self.send_header("Content-Length", "0")
        self.end_headers()

    def _send_json(self, status, payload):
        body = json.dumps(payload).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Cache-Control", "no-store")
        self.send_header("X-Content-Type-Options", "nosniff")
        self.send_header("X-Service-Webpage-Api", "1")
        self.send_header("Cross-Origin-Resource-Policy", "same-origin")
        self.end_headers()
        self.wfile.write(body)

    def _send_not_found(self):
        self.send_response(404)
        self._send_common_headers()
        self.send_header("Content-Length", "0")
        self.end_headers()

    def _state_page(self, path):
        match = re.fullmatch(r"/api/state/(page[12])", path)
        return match.group(1) if match else None

    def do_OPTIONS(self):
        if not self._request_allowed():
            self._reject()
            return
        self.send_response(204)
        self._send_common_headers()
        self.end_headers()

    def do_GET(self):

        if not self._request_allowed():
            self._reject()
            return

        parsed = urllib.parse.urlsplit(self.path)
        path = parsed.path

        if path == "/stats":
            self._send_stats()
            return

        if path.startswith("/api/"):
            self._get_state(path)
            return

        self._serve_static(path)

    def do_PUT(self):

        parsed = urllib.parse.urlsplit(self.path)
        page = self._state_page(parsed.path)

        if page is None:
            self._send_not_found()
            return

        if not self._same_origin_request() or self.headers.get("X-Service-Webpage") != "1" \
                or self.headers.get("Origin") is None:
            self._reject()
            return

        content_type = (self.headers.get("Content-Type") or "").split(";")[0].strip().lower()

        try:
            length = int(self.headers.get("Content-Length", ""))
        except ValueError:
            length = -1

        if content_type != "application/json" or length < 0:
            self._send_json(400, {"error": "invalid_request"})
            return

        if length > MAX_STATE_BYTES:
            self._send_json(413, {"error": "too_large"})
            return

        raw = self.rfile.read(length)

        try:
            incoming = json.loads(raw.decode("utf-8"))
        except (ValueError, UnicodeDecodeError, RecursionError):
            self._send_json(400, {"error": "invalid_json"})
            return

        if not isinstance(incoming, dict):
            self._send_json(400, {"error": "invalid_state"})
            return

        try:
            status, payload = _write_state(page, incoming)
        except (OSError, RecursionError):
            self._send_json(500, {"error": "write_failed"})
            return

        self._send_json(status, payload)

    def _get_state(self, path):
        page = self._state_page(path)

        if page is None or not self._same_origin_request():
            self._reject()
            return

        with _data_lock:
            data = _read_state_bytes(page)

        if data is None:
            self._send_json(404, {"error": "not_found"})
            return

        self.send_response(200)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(data)))
        self.send_header("Cache-Control", "no-store")
        self.send_header("X-Content-Type-Options", "nosniff")
        self.send_header("X-Service-Webpage-Api", "1")
        self.send_header("Cross-Origin-Resource-Policy", "same-origin")
        self.end_headers()
        self.wfile.write(data)

    def _send_stats(self):
        _mark_activity()

        with _state_lock:
            payload = dict(_latest)

        body = json.dumps(payload).encode("utf-8")

        self.send_response(200)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self._send_common_headers()
        self.end_headers()
        self.wfile.write(body)

    def _serve_static(self, path):
        host = (self.headers.get("Host") or "").lower()

        # One single origin for the browser storage: localhost -> 127.0.0.1
        if host != CANONICAL_HOST:
            self.send_response(302)
            self.send_header("Location", f"http://{CANONICAL_HOST}{self.path}")
            self.send_header("Content-Length", "0")
            self.end_headers()
            return

        target = _resolve_web_path(path)

        if target is None:
            self._send_not_found()
            return

        try:
            handle = open(target, "rb")
        except OSError:
            self._send_not_found()
            return

        with handle:
            stat = os.fstat(handle.fileno())
            modified = email.utils.formatdate(stat.st_mtime, usegmt=True)

            if self.headers.get("If-Modified-Since") == modified:
                self.send_response(304)
                self.send_header("Last-Modified", modified)
                self.send_header("Cache-Control", "no-cache")
                self.end_headers()
                return

            extension = os.path.splitext(target)[1].lower()
            content_type = _MIME_OVERRIDES.get(extension) \
                or mimetypes.guess_type(target)[0] or "application/octet-stream"

            self.send_response(200)
            self.send_header("Content-Type", content_type)
            self.send_header("Content-Length", str(stat.st_size))
            self.send_header("Last-Modified", modified)
            self.send_header("Cache-Control", "no-cache")
            self.send_header("X-Content-Type-Options", "nosniff")
            self.send_header("Referrer-Policy", "no-referrer")
            self.send_header("Cross-Origin-Resource-Policy", "same-origin")

            if extension == ".html":
                # Only this dashboard (its own frames) may embed its pages.
                self.send_header("Content-Security-Policy", "frame-ancestors 'self'")

            self.end_headers()
            shutil.copyfileobj(handle, self.wfile, 65536)

    def log_message(self, format, *args):
        # Silent: without this, every request (one per
        # second, while the dashboard is open) would print
        # a log line.
        pass
 
 
def main():
 
    updater = threading.Thread(target=_updater_loop, daemon=True)
    updater.start()
 
    server = ThreadingHTTPServer(("127.0.0.1", PORT), StatsHandler)
 
    print(f"Dashboard at http://127.0.0.1:{PORT}/")
    print(f"Dashboard stats active at http://127.0.0.1:{PORT}/stats")
    print(f"Dashboard data folder: {DATA_DIR}")
    print("Press CTRL+C to stop (if run manually).")
 
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.server_close()
 
 
if __name__ == "__main__":
    main()
