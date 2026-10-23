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
import json
import re
import threading
import time
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
# HTTP SERVER
# =========================
 
ALLOWED_HOSTS = {f"127.0.0.1:{PORT}", f"localhost:{PORT}"}

# The dashboard opened from a file has the origin "null"; opened from a
# local web server it has an http(s) origin on the loopback address.
_ORIGIN_RE = re.compile(r"^https?://(127\.0\.0\.1|localhost)(:[0-9]{1,5})?$")


def _origin_allowed(origin):
    return origin is None or origin == "null" or bool(_ORIGIN_RE.match(origin))


class StatsHandler(BaseHTTPRequestHandler):

    def _request_allowed(self):
        # Host check: blocks DNS-rebinding (a hostile domain resolved to
        # 127.0.0.1). Origin check: blocks pages of other websites.
        host = (self.headers.get("Host") or "").lower()
        origin = self.headers.get("Origin")
        return host in ALLOWED_HOSTS and _origin_allowed(origin)

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

        if self.path != "/stats":
            self.send_response(404)
            self._send_common_headers()
            self.send_header("Content-Length", "0")
            self.end_headers()
            return

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

    def log_message(self, format, *args):
        # Silent: without this, every request (one per
        # second, while the dashboard is open) would print
        # a log line.
        pass
 
 
def main():
 
    updater = threading.Thread(target=_updater_loop, daemon=True)
    updater.start()
 
    server = ThreadingHTTPServer(("127.0.0.1", PORT), StatsHandler)
 
    print(f"Dashboard stats active at http://127.0.0.1:{PORT}/stats")
    print("Press CTRL+C to stop (if run manually).")
 
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.server_close()
 
 
if __name__ == "__main__":
    main()