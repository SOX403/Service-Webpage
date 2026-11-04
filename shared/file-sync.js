/*
============================================================
  SERVICE WEBPAGE - File synchronisation
  Developed by SOX
  © 2026

  Licensed under the PolyForm Noncommercial License 1.0.0
  https://polyformproject.org/licenses/noncommercial/1.0.0
  Required Notice: Copyright 2026 SOX
============================================================

  When the dashboard is served by the local server of
  system-monitor/stats_server.py (http://127.0.0.1:8765/), the
  state kept in IndexedDB is mirrored in a file on the PC:

    - on opening, the file is read and restores the state;
    - after every change, the file is rewritten (about 1 second later).

  The data therefore survive any cleaning of the browser's site data.
  When the page is opened from a file (file://) or from any other
  server, this script does nothing and the dashboard works as before.
============================================================
*/

(function () {
  "use strict";

  var DB_NAME = "ServiceWebpageDB";
  var STORE = "dashboardState";
  var API_PATH = "/api/state/";
  var SCHEMA = 1;

  var PUSH_DELAY_MS = 800;
  var RETRY_DELAY_MS = 10000;
  var PULL_TIMEOUT_MS = 3000;
  var PUSH_TIMEOUT_MS = 15000;
  var BLOCKED_RETRY_MS = 10000;

  var served =
    location.protocol === "http:" &&
    (location.hostname === "127.0.0.1" || location.hostname === "localhost");

  var nativePut =
    typeof IDBObjectStore !== "undefined" ? IDBObjectStore.prototype.put : null;

  var pageId = null;
  var syncKeys = [];
  var metaKey = "";
  var db = null;

  var changeCounter = 0;
  var needsPush = false;
  var pushTimer = null;
  var pushing = false;
  var pushAgain = false;
  var disabled = false;
  var hookInstalled = false;
  var lastRevision = 0;
  var lastSerialized = null;
  var badge = null;

  /*
     True when the browser state could not be compared with the file (server
     unreachable on opening) and this browser has never synchronised before:
     its content may be only the default state of an emptied browser, so
     nothing is written to the file until the file has been read.
  */
  var blocked = false;
  var retryPullTimer = null;
  var hasSynced = false;


  /* ---------- IndexedDB helpers (own connection, original put) ---------- */

  function openDb() {
    return new Promise(function (resolve, reject) {
      var request = indexedDB.open(DB_NAME);

      request.onupgradeneeded = function (event) {
        var database = event.target.result;

        if (!database.objectStoreNames.contains(STORE)) {
          database.createObjectStore(STORE);
        }
      };

      request.onsuccess = function () {
        var database = request.result;

        /* Never block a schema upgrade requested by the page itself. */
        database.onversionchange = function () {
          database.close();

          if (db === database) {
            db = null;
          }
        };

        /* Closed by the browser (site data cleared): reopen on next use. */
        database.onclose = function () {
          if (db === database) {
            db = null;
          }
        };

        resolve(database);
      };

      request.onerror = function () {
        reject(request.error || new Error("Unable to open IndexedDB."));
      };
    });
  }

  function ensureDb() {
    if (db) {
      return Promise.resolve(db);
    }

    return openDb().then(function (database) {
      db = database;

      return database;
    });
  }

  function idbGet(key) {
    return new Promise(function (resolve, reject) {
      var request = db.transaction(STORE, "readonly").objectStore(STORE).get(key);

      request.onsuccess = function () {
        resolve(request.result);
      };

      request.onerror = function () {
        reject(request.error);
      };
    });
  }

  function idbPutAll(values, deleteKeys) {
    return new Promise(function (resolve, reject) {
      var transaction = db.transaction(STORE, "readwrite");
      var store = transaction.objectStore(STORE);

      Object.keys(values).forEach(function (key) {
        nativePut.call(store, values[key], key);
      });

      (deleteKeys || []).forEach(function (key) {
        store.delete(key);
      });

      transaction.oncomplete = function () {
        resolve();
      };

      transaction.onerror = transaction.onabort = function () {
        reject(transaction.error || new Error("IndexedDB write failed."));
      };
    });
  }

  function saveMeta(meta) {
    var values = {};

    values[metaKey] = meta;

    return idbPutAll(values, []);
  }

  function readEntries() {
    var entries = {};

    return Promise.all(
      syncKeys.map(function (key) {
        return idbGet(key).then(function (value) {
          if (value !== undefined) {
            entries[key] = value;
          }
        });
      })
    ).then(function () {
      return entries;
    });
  }


  /* ---------- Status badge (only when something is wrong) ---------- */

  function translate(key, fallback) {
    try {
      if (window.I18N && typeof window.I18N.t === "function") {
        var text = window.I18N.t(key);

        if (text && text !== key) {
          return text;
        }
      }
    } catch (error) {
      /* fallback below */
    }

    return fallback;
  }

  function setStatus(status) {
    document.documentElement.setAttribute("data-file-sync", status);

    var text = "";

    if (status === "offline") {
      text = translate(
        "sync.offline",
        "Saving to file unavailable: changes are kept in the browser only."
      );
    }
    else if (status === "refused") {
      text = translate(
        "sync.refused",
        "File not updated: the server refused an empty state."
      );
    }
    else if (status === "conflict") {
      text = translate(
        "sync.conflict",
        "The file was changed elsewhere: reload the page to avoid overwriting newer data."
      );
    }

    if (!text) {
      if (badge) {
        badge.style.display = "none";
      }

      return;
    }

    if (!badge) {
      badge = document.createElement("div");
      badge.setAttribute("role", "status");
      badge.style.cssText =
        "position:fixed;left:12px;bottom:12px;max-width:min(420px,calc(100vw - 24px));" +
        "padding:8px 12px;border:1px solid rgba(255,120,100,.6);border-radius:8px;" +
        "background:rgba(20,8,8,.88);color:#ffb4a8;font:12px/1.4 system-ui,sans-serif;" +
        "z-index:2147483000;pointer-events:none;";
      document.body.appendChild(badge);
    }

    badge.textContent = text;
    badge.style.display = "block";
  }


  /* ---------- Reading the file ---------- */

  function validRemote(data) {
    return (
      data &&
      typeof data === "object" &&
      data.schema === SCHEMA &&
      data.page === pageId &&
      data.entries &&
      typeof data.entries === "object"
    );
  }

  function fetchRemote() {
    var controller =
      typeof AbortController !== "undefined" ? new AbortController() : null;

    var timer = controller
      ? setTimeout(function () {
          controller.abort();
        }, PULL_TIMEOUT_MS)
      : null;

    return fetch(API_PATH + pageId, {
      cache: "no-store",
      credentials: "same-origin",
      signal: controller ? controller.signal : undefined
    })
      .then(function (response) {
        clearTimeout(timer);

        if (!response.headers.get("X-Service-Webpage-Api")) {
          return { status: "unavailable" };
        }

        if (response.status === 404) {
          return { status: "missing" };
        }

        if (!response.ok) {
          return { status: "offline" };
        }

        return response.json().then(function (data) {
          return validRemote(data)
            ? { status: "ok", data: data }
            : { status: "offline" };
        });
      })
      .catch(function () {
        clearTimeout(timer);

        return { status: "offline" };
      });
  }

  function applyRemote(data) {
    var values = {};
    var missing = [];

    syncKeys.forEach(function (key) {
      if (Object.prototype.hasOwnProperty.call(data.entries, key)) {
        values[key] = data.entries[key];
      }
      else {
        missing.push(key);
      }
    });

    return idbPutAll(values, missing);
  }


  /* ---------- Writing the file ---------- */

  function schedulePush(delay) {
    if (disabled || blocked) {
      return;
    }

    clearTimeout(pushTimer);

    pushTimer = setTimeout(function () {
      push(false);
    }, delay);
  }

  function push(useKeepalive) {
    if (disabled || blocked) {
      return Promise.resolve();
    }

    if (pushing) {
      pushAgain = true;

      return Promise.resolve();
    }

    pushing = true;

    var counterAtStart = changeCounter;

    return ensureDb()
      .then(readEntries)
      .then(function (entries) {
        var serialized = JSON.stringify(entries);

        if (serialized === lastSerialized) {
          needsPush = changeCounter !== counterAtStart;

          return saveMeta({
            dirty: needsPush,
            localSavedAt: Date.now(),
            revision: lastRevision,
            hasSynced: true
          }).then(function () {
            setStatus("ok");
          });
        }

        var savedAt = Date.now();

        var body = JSON.stringify({
          schema: SCHEMA,
          page: pageId,
          savedAt: savedAt,
          baseRevision: lastRevision,
          entries: entries
        });

        var options = {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "X-Service-Webpage": "1"
          },
          body: body,
          cache: "no-store",
          credentials: "same-origin"
        };

        if (typeof AbortController === "function") {
          var controller = new AbortController();

          options.signal = controller.signal;
          setTimeout(function () {
            controller.abort();
          }, PUSH_TIMEOUT_MS);
        }

        /* keepalive requests are limited to 64 KiB (bytes, not characters) */
        if (useKeepalive && new TextEncoder().encode(body).length < 60000) {
          options.keepalive = true;
        }

        return fetch(API_PATH + pageId, options).then(function (response) {
          if (!response.headers.get("X-Service-Webpage-Api")) {
            disabled = true;
            setStatus("off");

            return null;
          }

          if (response.status === 409) {
            return response.json().then(function (info) {
              setStatus(info && info.error === "revision_conflict" ? "conflict" : "refused");

              return null;
            }).catch(function () {
              setStatus("refused");

              return null;
            });
          }

          if (response.status >= 400 && response.status < 500) {
            /* permanent refusal (invalid or too large): do not retry */
            setStatus("refused");

            return null;
          }

          if (!response.ok) {
            throw new Error("HTTP " + response.status);
          }

          return response.json().then(function (info) {
            lastRevision = info.revision;
            lastSerialized = serialized;
            needsPush = changeCounter !== counterAtStart;

            return saveMeta({
              dirty: needsPush,
              localSavedAt: savedAt,
              revision: lastRevision,
              hasSynced: true
            }).then(function () {
              setStatus("ok");

              if (needsPush) {
                schedulePush(PUSH_DELAY_MS);
              }
            });
          });
        });
      })
      .catch(function () {
        setStatus("offline");

        /* no timers in hidden tabs: resume() runs when the tab is visible */
        if (document.visibilityState === "visible") {
          schedulePush(RETRY_DELAY_MS);
        }
      })
      .then(function () {
        pushing = false;

        if (pushAgain) {
          pushAgain = false;
          schedulePush(0);
        }
      });
  }

  function noteChange() {
    changeCounter++;
    needsPush = true;

    if (db) {
      saveMeta({
        dirty: true,
        localSavedAt: Date.now(),
        revision: lastRevision,
        hasSynced: !blocked
      }).catch(function () {});
    }

    schedulePush(PUSH_DELAY_MS);
  }

  function installHook() {
    if (hookInstalled || !nativePut) {
      return;
    }

    hookInstalled = true;

    IDBObjectStore.prototype.put = function (value, key) {
      var request = nativePut.apply(this, arguments);

      try {
        if (
          this.name === STORE &&
          this.transaction.db.name === DB_NAME &&
          syncKeys.indexOf(key) !== -1
        ) {
          noteChange();
        }
      }
      catch (error) {
        /* the hook must never break a write */
      }

      return request;
    };

    window.addEventListener("pagehide", function () {
      if (needsPush) {
        clearTimeout(pushTimer);
        push(true);
      }
    });

    document.addEventListener("visibilitychange", function () {
      if (document.visibilityState === "hidden") {
        clearTimeout(retryPullTimer);

        if (needsPush) {
          clearTimeout(pushTimer);
          push(true);
        }
      }
      else {
        resume();
      }
    });

    window.addEventListener("online", resume);
  }

  function resume() {
    if (disabled) {
      return;
    }

    if (blocked) {
      tryUnblock();
    }
    else if (needsPush) {
      schedulePush(0);
    }
  }

  /*
     Blocked mode: the file could not be read on opening and this browser
     has no synchronisation history. Read the file as soon as it answers;
     the local content is kept aside before being replaced.
  */
  function scheduleUnblock() {
    clearTimeout(retryPullTimer);

    if (document.visibilityState !== "visible") {
      return;
    }

    retryPullTimer = setTimeout(tryUnblock, BLOCKED_RETRY_MS);
  }

  function tryUnblock() {
    if (!blocked || disabled) {
      return;
    }

    clearTimeout(retryPullTimer);

    fetchRemote().then(function (remote) {
      if (!blocked) {
        return null;
      }

      if (remote.status === "unavailable") {
        disabled = true;
        setStatus("off");

        return null;
      }

      if (remote.status === "offline") {
        scheduleUnblock();

        return null;
      }

      if (remote.status === "missing") {
        blocked = false;
        needsPush = true;
        lastRevision = 0;
        schedulePush(PUSH_DELAY_MS);

        return null;
      }

      return readEntries()
        .then(function (entries) {
          var values = {};

          values[pageId + "_unsyncedBackup"] = {
            savedAt: Date.now(),
            entries: entries
          };

          return idbPutAll(values, []);
        })
        .then(function () {
          return applyRemote(remote.data);
        })
        .then(function () {
          return saveMeta({
            dirty: false,
            localSavedAt: remote.data.savedAt || 0,
            revision: remote.data.revision || 0,
            hasSynced: true
          });
        })
        .then(function () {
          location.reload();
        });
    }).catch(function () {
      scheduleUnblock();
    });
  }


  /* ---------- Entry point ---------- */

  /*
     Called by the page BEFORE it reads its state from IndexedDB.
     It never rejects: in the worst case the page works as without it.
  */
  function init(id) {
    if (!served || !nativePut || typeof fetch !== "function") {
      return Promise.resolve("off");
    }

    pageId = id;
    syncKeys = [id, id + "_edited", id + "_meta", id + "_deletedServices"];
    metaKey = "_fileSync_" + id;

    return openDb()
      .then(function (database) {
        db = database;
        installHook();

        return Promise.all([idbGet(metaKey), fetchRemote()]);
      })
      .then(function (results) {
        var meta = results[0] || { dirty: false, localSavedAt: 0, revision: 0 };
        var remote = results[1];

        lastRevision = meta.revision || 0;
        hasSynced = meta.hasSynced === true;

        if (remote.status === "unavailable") {
          disabled = true;
          setStatus("off");

          return "off";
        }

        if (remote.status === "offline") {
          setStatus("offline");

          if (!hasSynced) {
            blocked = true;
            scheduleUnblock();
          }
          else if (document.visibilityState === "visible") {
            schedulePush(RETRY_DELAY_MS);
          }

          return "offline";
        }

        if (remote.status === "missing") {
          /* No file yet: the current state (if any) becomes the file. */
          return idbGet(pageId).then(function (local) {
            lastRevision = 0;

            if (local) {
              needsPush = true;
              schedulePush(PUSH_DELAY_MS);
            }

            setStatus("ok");

            return "created";
          });
        }

        var localIsNewer =
          hasSynced &&
          meta.revision > 0 &&
          meta.dirty === true &&
          typeof remote.data.savedAt === "number" &&
          meta.localSavedAt > remote.data.savedAt;

        if (localIsNewer) {
          /* Changes made while the server was unreachable: keep them. */
          lastRevision = remote.data.revision || 0;
          needsPush = true;
          schedulePush(PUSH_DELAY_MS);
          setStatus("ok");

          return "local";
        }

        return applyRemote(remote.data)
          .then(function () {
            lastRevision = remote.data.revision || 0;

            return readEntries();
          })
          .then(function (entries) {
            lastSerialized = JSON.stringify(entries);

            return saveMeta({
              dirty: false,
              localSavedAt: remote.data.savedAt || 0,
              revision: lastRevision,
              hasSynced: true
            });
          })
          .then(function () {
            setStatus("ok");

            return "restored";
          });
      })
      .catch(function () {
        try {
          setStatus("offline");

          if (!hasSynced) {
            blocked = true;
            scheduleUnblock();
          }
        }
        catch (error) {
          /* ignored */
        }

        return "error";
      });
  }

  window.FileSync = {
    init: init,
    flush: function () {
      clearTimeout(pushTimer);

      return push(false);
    }
  };
})();
