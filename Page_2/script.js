/*
============================================================
  SERVICE WEBPAGE
  Developed by SOX
  © 2026
============================================================

  Licensed under the PolyForm Noncommercial License 1.0.0
  https://polyformproject.org/licenses/noncommercial/1.0.0
  Required Notice: Copyright 2026 SOX

============================================================
*/


(function () {
    var s = document.getElementById("bg-texts");
    if (!s) return;
    function f() {
        s.style.transform = "scale(" + (window.innerWidth / 1536) + "," + (Math.max(window.innerHeight, 560) / 1024) + ")";
    }
    f();
    window.addEventListener("resize", f);
})();


/* Keyboard navigation detection: only Tab enables the focus ring */
document.addEventListener(
  "keydown",
  function (event) {
    if (event.key === "Tab") {
      document.documentElement.classList.add("using-keyboard");
    }
  },
  true
);

["mousedown", "pointerdown", "touchstart"].forEach(function (type) {
  document.addEventListener(
    type,
    function () {
      document.documentElement.classList.remove("using-keyboard");
    },
    true
  );
});


const PROJECT_AUTHOR = "SOX";
const PROJECT_NAME = "Service Webpage";
const PROJECT_VERSION = "3.0.0";
const PROJECT_YEAR = "2026";
const PROJECT_ID = "SOX-SERVICE-WEBPAGE-2026";

Object.defineProperty(window, "__SERVICE_WEBPAGE_META__", {
  value: {
    author: PROJECT_AUTHOR,
    project: PROJECT_NAME,
    version: PROJECT_VERSION,
    year: PROJECT_YEAR,
    projectId: PROJECT_ID,
  },
  writable: false,
  configurable: false,
  enumerable: false,
});

const services = {
  services: [
    {
      name: "Service 1",
      nameKey: "placeholder.services",
      nameNumber: 1,
      url: "#",
      icon: "https://www.google.com/s2/favicons?domain=example.com&sz=64",
    },
    {
      name: "Service 2",
      nameKey: "placeholder.services",
      nameNumber: 2,
      url: "#",
      icon: "https://www.google.com/s2/favicons?domain=example.com&sz=64",
    },
    {
      name: "Service 3",
      nameKey: "placeholder.services",
      nameNumber: 3,
      url: "#",
      icon: "https://www.google.com/s2/favicons?domain=example.com&sz=64",
    },
    {
      name: "Service 4",
      nameKey: "placeholder.services",
      nameNumber: 4,
      url: "#",
      icon: "https://www.google.com/s2/favicons?domain=example.com&sz=64",
    },
    {
      name: "Service 5",
      nameKey: "placeholder.services",
      nameNumber: 5,
      url: "#",
      icon: "https://www.google.com/s2/favicons?domain=example.com&sz=64",
    },
    {
      name: "Service 6",
      nameKey: "placeholder.services",
      nameNumber: 6,
      url: "#",
      icon: "https://www.google.com/s2/favicons?domain=example.com&sz=64",
    },
    {
      name: "Service 7",
      nameKey: "placeholder.services",
      nameNumber: 7,
      url: "#",
      icon: "https://www.google.com/s2/favicons?domain=example.com&sz=64",
    },
    {
      name: "Service 8",
      nameKey: "placeholder.services",
      nameNumber: 8,
      url: "#",
      icon: "https://www.google.com/s2/favicons?domain=example.com&sz=64",
    },
  ],

  ecommerce: [
    {
      name: "E-Commerce 1",
      nameKey: "placeholder.ecommerce",
      nameNumber: 1,
      url: "#",
      icon: "https://www.google.com/s2/favicons?domain=example.com&sz=64",
    },
    {
      name: "E-Commerce 2",
      nameKey: "placeholder.ecommerce",
      nameNumber: 2,
      url: "#",
      icon: "https://www.google.com/s2/favicons?domain=example.com&sz=64",
    },
    {
      name: "E-Commerce 3",
      nameKey: "placeholder.ecommerce",
      nameNumber: 3,
      url: "#",
      icon: "https://www.google.com/s2/favicons?domain=example.com&sz=64",
    },
    {
      name: "E-Commerce 4",
      nameKey: "placeholder.ecommerce",
      nameNumber: 4,
      url: "#",
      icon: "https://www.google.com/s2/favicons?domain=example.com&sz=64",
    },
    {
      name: "E-Commerce 5",
      nameKey: "placeholder.ecommerce",
      nameNumber: 5,
      url: "#",
      icon: "https://www.google.com/s2/favicons?domain=example.com&sz=64",
    },
    {
      name: "E-Commerce 6",
      nameKey: "placeholder.ecommerce",
      nameNumber: 6,
      url: "#",
      icon: "https://www.google.com/s2/favicons?domain=example.com&sz=64",
    },
    {
      name: "E-Commerce 7",
      nameKey: "placeholder.ecommerce",
      nameNumber: 7,
      url: "#",
      icon: "https://www.google.com/s2/favicons?domain=example.com&sz=64",
    },
    {
      name: "E-Commerce 8",
      nameKey: "placeholder.ecommerce",
      nameNumber: 8,
      url: "#",
      icon: "https://www.google.com/s2/favicons?domain=example.com&sz=64",
    },
  ],

  streaming: [
    {
      name: "Streaming 1",
      nameKey: "placeholder.streaming",
      nameNumber: 1,
      url: "#",
      icon: "https://www.google.com/s2/favicons?domain=example.com&sz=64",
    },
    {
      name: "Streaming 2",
      nameKey: "placeholder.streaming",
      nameNumber: 2,
      url: "#",
      icon: "https://www.google.com/s2/favicons?domain=example.com&sz=64",
    },
    {
      name: "Streaming 3",
      nameKey: "placeholder.streaming",
      nameNumber: 3,
      url: "#",
      icon: "https://www.google.com/s2/favicons?domain=example.com&sz=64",
    },
    {
      name: "Streaming 4",
      nameKey: "placeholder.streaming",
      nameNumber: 4,
      url: "#",
      icon: "https://www.google.com/s2/favicons?domain=example.com&sz=64",
    },
    {
      name: "Streaming 5",
      nameKey: "placeholder.streaming",
      nameNumber: 5,
      url: "#",
      icon: "https://www.google.com/s2/favicons?domain=example.com&sz=64",
    },
    {
      name: "Streaming 6",
      nameKey: "placeholder.streaming",
      nameNumber: 6,
      url: "#",
      icon: "https://www.google.com/s2/favicons?domain=example.com&sz=64",
    },
    {
      name: "Streaming 7",
      nameKey: "placeholder.streaming",
      nameNumber: 7,
      url: "#",
      icon: "https://www.google.com/s2/favicons?domain=example.com&sz=64",
    },
    {
      name: "Streaming 8",
      nameKey: "placeholder.streaming",
      nameNumber: 8,
      url: "#",
      icon: "https://www.google.com/s2/favicons?domain=example.com&sz=64",
    },
  ],
};

/* =========================
   CONFIGURATION
========================= */

const STORAGE_PAGE_ID = "page2";

const INDEXED_DB_NAME = "ServiceWebpageDB";
const INDEXED_DB_VERSION = 1;
const INDEXED_DB_STORE = "dashboardState";
const INDEXED_DB_STATE_KEY = STORAGE_PAGE_ID;
const INDEXED_DB_DELETED_KEY = `${STORAGE_PAGE_ID}_deletedServices`;
const INDEXED_DB_EDITED_KEY = `${STORAGE_PAGE_ID}_edited`;
const INDEXED_DB_META_KEY = `${STORAGE_PAGE_ID}_meta`;
const INDEXED_DB_CODE_BACKUP_KEY = `${STORAGE_PAGE_ID}_codeChangeBackup`;
const CODE_BACKUP_LIMIT = 3;
const STORAGE_SCHEMA_VERSION = 2;


let dashboardDB = null;

let dashboardState = {
  visibility: {},
  order: {},
  sections: {},
  customServices: {}
};

/* Translation helper: falls back to the key if the language engine is missing. */
function t(key, values) {
  return window.I18N ? window.I18N.t(key, values) : key;
}

function serviceLabel(service) {
  if (service.displayName) return service.displayName;

  if (service.nameKey) {
    return t(service.nameKey, { n: service.nameNumber });
  }

  return service.name;
}

/* Placeholder services are named in the interface language. */
function refreshServiceLabels() {
  if (!document.querySelector(".service-wrapper")) return;

  const defined = getAllDefinedServices();

  document.querySelectorAll(".service-wrapper").forEach(wrapper => {
    const service = defined[wrapper.dataset.service];

    if (!service) return;

    const label = serviceLabel(service);
    const span = wrapper.querySelector(".service > span");
    const img = wrapper.querySelector(".service img");

    if (span) span.textContent = label;
    if (img) img.alt = label;
  });
}

let editMode = false;
let editSnapshot = null;
let settingsMenuOpen = false;
let draggedItem = null;
let dragPreview = null;

let dragCurrentY = 0;

let dragAutoScrollFrame = null;

let deletedServices = [];
let pendingDeleteWrapper = null;

let editedServices = {};
let pendingServiceEdit = null;

let savedStateFound = false;
let deletionLog = [];



function openDashboardDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(INDEXED_DB_NAME, INDEXED_DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;

      if (!db.objectStoreNames.contains(INDEXED_DB_STORE)) {
        db.createObjectStore(INDEXED_DB_STORE);
      }
    };

    request.onsuccess = (event) => {
      dashboardDB = event.target.result;

      resolve(dashboardDB);
    };

    request.onerror = () => {
      reject(request.error || new Error("Unable to open IndexedDB."));
    };
  });
}

function readDashboardState() {
  return new Promise((resolve, reject) => {
    const transaction = dashboardDB.transaction(INDEXED_DB_STORE, "readonly");

    const store = transaction.objectStore(INDEXED_DB_STORE);

    const request = store.get(INDEXED_DB_STATE_KEY);

    request.onsuccess = () => {
      resolve(request.result || null);
    };

    request.onerror = () => {
      reject(request.error || new Error("Unable to read IndexedDB."));
    };
  });
}

function writeDashboardState() {
  if (!dashboardDB) return;

  const stateToSave = structuredClone(dashboardState);

  const transaction = dashboardDB.transaction(INDEXED_DB_STORE, "readwrite");

  const store = transaction.objectStore(INDEXED_DB_STORE);

  store.put(stateToSave, INDEXED_DB_STATE_KEY);
}


async function readDeletedServices() {
  const transaction = dashboardDB.transaction(INDEXED_DB_STORE, "readonly");

  const store = transaction.objectStore(INDEXED_DB_STORE);

  const request = store.get(INDEXED_DB_DELETED_KEY);

  return new Promise((resolve, reject) => {
    request.onsuccess = () => {
      resolve(request.result || []);
    };

    request.onerror = () => {
      reject(
        request.error || new Error("Unable to read the deletions."),
      );
    };
  });
}

function writeDeletedServices() {
  if (!dashboardDB) return;

  const transaction = dashboardDB.transaction(INDEXED_DB_STORE, "readwrite");

  const store = transaction.objectStore(INDEXED_DB_STORE);

  store.put(structuredClone(deletedServices), INDEXED_DB_DELETED_KEY);
}


/*
   The edits (name, URL, icon) are stored in IndexedDB together with the
   rest of the state (schema 2).
*/
async function loadEditedServices() {
  const stored = await readIdbKey(INDEXED_DB_EDITED_KEY);

  if (stored && typeof stored === "object" && !Array.isArray(stored)) {
    editedServices = stored;

    return;
  }

  editedServices = {};

  await writeIdbKeyConfirmed(INDEXED_DB_EDITED_KEY, {});
}

function saveEditedServices() {
  if (!dashboardDB) return;

  const transaction = dashboardDB.transaction(INDEXED_DB_STORE, "readwrite");

  const store = transaction.objectStore(INDEXED_DB_STORE);

  store.put(structuredClone(editedServices), INDEXED_DB_EDITED_KEY);
}


async function initializeDashboardStorage() {
  await openDashboardDB();

  await loadEditedServices();

  deletedServices = await readDeletedServices();

  const savedState = await readDashboardState();

  if (savedState) {
    savedStateFound = true;

    await syncCodeMeta(savedState);

    dashboardState = {
  visibility:
    savedState.visibility || {},

  order:
    savedState.order || {},

  sections:
    savedState.sections || {},

  customServices:
    savedState.customServices || {}
};

normalizeDashboardState();

writeDashboardState();

    return;
  }

  normalizeDashboardState();

  writeDashboardState();

  await syncCodeMeta(null);
}

function getVisibilityData() {
  return dashboardState.visibility;
}

/* =========================
   SERVICE STATE MANAGEMENT
========================= */

function getAllDefinedServices() {

  const defined = {};

  Object.values(services).forEach(
    sectionServices => {

      sectionServices.forEach(
        service => {

          if (!defined[service.name]) {
            const edited = editedServices[service.name];

            defined[service.name] = edited
              ? {
                  ...service,
                  displayName: edited.name,
                  url: edited.url,
                  icon: edited.icon,
                  ...(typeof edited.enhanced === "boolean" ? { enhanced: edited.enhanced } : {}),
                }
              : service;
          }

        }
      );

    }
  );


  Object.entries(
    dashboardState.customServices || {}
  ).forEach(
    ([serviceName, service]) => {

      if (!defined[serviceName]) {
        const edited = editedServices[serviceName];

        defined[serviceName] = edited
          ? {
              ...service,
              displayName: edited.name,
              url: edited.url,
              icon: edited.icon,
                  ...(typeof edited.enhanced === "boolean" ? { enhanced: edited.enhanced } : {}),
            }
          : service;
      }

    }
  );


  return defined;
}


function normalizeDashboardState() {

  const definedServices =
    getAllDefinedServices();


  const defaultSections = {};

  const sectionNames =
    Object.keys(services);


  /*
     Determines the original section
     of the cards defined in the code.
  */

  sectionNames.forEach(
    sectionName => {

      services[sectionName].forEach(
        service => {

          if (
            !defaultSections[
              service.name
            ]
          ) {

            defaultSections[
              service.name
            ] = sectionName;

          }

        }
      );

    }
  );


  const oldOrder =
    dashboardState.order || {};

  const oldSections =
    dashboardState.sections || {};


  const sections = {};

  const order = {};


  sectionNames.forEach(
    sectionName => {

      order[sectionName] = [];

    }
  );


  /*
     Determines the effective section
     of each card.
  */

  Object.keys(
    definedServices
  ).forEach(
    serviceName => {

      if (deletedServices.includes(serviceName)) {
        return;
      }

      let sectionName =
        oldSections[
          serviceName
        ];


      /*
         If a saved section exists,
         it takes priority.
      */

      if (
        !sectionNames.includes(
          sectionName
        )
      ) {

        sectionName = null;

      }


      /*
         Compatibility with the old
         order format.
      */

      if (!sectionName) {

        sectionNames.some(
          candidate => {

            const savedOrder =
              oldOrder[
                candidate
              ] || [];


            if (
              savedOrder.includes(
                serviceName
              )
            ) {

              sectionName =
                candidate;

              return true;

            }


            return false;

          }
        );

      }


      /*
         New card or card without
         customization:
         use the original section
         defined in the code.
      */

      if (!sectionName) {

        sectionName =
          defaultSections[
            serviceName
          ];

      }


      if (sectionName) {

        sections[
          serviceName
        ] = sectionName;

      }

    }
  );


  /*
     Rebuilds the order while keeping
     the previously saved one.
  */

  sectionNames.forEach(
    sectionName => {

      const savedOrder =
        oldOrder[
          sectionName
        ] || [];


      savedOrder.forEach(
        serviceName => {

          if (
            sections[
              serviceName
            ] === sectionName &&
            !order[
              sectionName
            ].includes(
              serviceName
            )
          ) {

            order[
              sectionName
            ].push(
              serviceName
            );

          }

        }
      );

    }
  );


  /*
     Adds any new cards
     that were not present in the order.
  */

  Object.keys(
    definedServices
  ).forEach(
    serviceName => {

      const sectionName =
        sections[
          serviceName
        ];


      if (
        sectionName &&
        !order[
          sectionName
        ].includes(
          serviceName
        )
      ) {

        order[
          sectionName
        ].push(
          serviceName
        );

      }

    }
  );


  dashboardState = {

    visibility:
      dashboardState.visibility || {},

    order,

    sections,

    customServices:
      dashboardState.customServices || {}

  };

}


function getServicesForSection(
  sectionName
) {

  const definedServices =
    getAllDefinedServices();


  const order =
    dashboardState.order[
      sectionName
    ] || [];


  const sectionServices = [];


  order.forEach(
    serviceName => {

      const service =
        definedServices[
          serviceName
        ];


      if (
        service &&
        dashboardState.sections[
          serviceName
        ] === sectionName
      ) {

        sectionServices.push(
          service
        );

      }

    }
  );


  return sectionServices;

}


function rerenderAllServices() {

  document
    .querySelectorAll(
      ".services"
    )
    .forEach(
      container => {

        container.innerHTML = "";

      }
    );


  Object.keys(
    services
  ).forEach(
    sectionName => {

      renderServices(
        sectionName
      );

    }
  );


  updateEditMode();


  requestAnimationFrame(
    () => {

      document
        .querySelectorAll(
          ".services"
        )
        .forEach(
          container => {

            container.dispatchEvent(
              new Event("scroll")
            );

          }
        );

    }
  );

}


/* =========================
   INTERNAL COPY WHEN THE CODE SERVICES CHANGE
========================= */

/*
   Records which services the code defines. When the list differs from the
   one recorded at the previous start, a copy of the saved state (taken
   before it is normalized) is stored in IndexedDB. It never runs when the
   list is empty and any error leaves the startup untouched.
*/
async function syncCodeMeta(savedState) {
  try {
    const names = [...getCodeServiceNames()].sort();

    if (names.length === 0) return;

    const meta = await readIdbKey(INDEXED_DB_META_KEY);

    const previous =
      meta && Array.isArray(meta.codeServices) ? meta.codeServices : null;

    const changed =
      previous !== null &&
      (previous.length !== names.length ||
        previous.some((name, index) => name !== names[index]));

    if (changed && savedState) {
      const backups = await readIdbKey(INDEXED_DB_CODE_BACKUP_KEY);

      const list = Array.isArray(backups) ? backups : [];

      list.push({
        date: new Date().toISOString(),
        added: names.filter((name) => !previous.includes(name)),
        removed: previous.filter((name) => !names.includes(name)),
        state: structuredClone(savedState),
        deleted: structuredClone(deletedServices),
        edited: structuredClone(editedServices),
      });

      await writeIdbKeyConfirmed(
        INDEXED_DB_CODE_BACKUP_KEY,
        list.slice(-CODE_BACKUP_LIMIT),
      );
    }

    if (
      previous === null ||
      changed ||
      meta.schemaVersion !== STORAGE_SCHEMA_VERSION
    ) {
      await writeIdbKeyConfirmed(INDEXED_DB_META_KEY, {
        schemaVersion: STORAGE_SCHEMA_VERSION,
        codeServices: names,
      });
    }
  } catch (error) {
    console.error("Code services record skipped:", error);
  }
}

/* =========================
   DELETION CLEANUP AND ORPHAN REMOVAL
========================= */

const INDEXED_DB_BACKUP_KEY = `${STORAGE_PAGE_ID}_orphanBackup`;

const ORPHAN_BACKUP_LIMIT = 5;

function hasOwnKey(object, key) {
  return Object.prototype.hasOwnProperty.call(object, key);
}

/* Names of the services defined in the code (the "services" block). */
function getCodeServiceNames() {
  const names = new Set();

  if (!services || typeof services !== "object") {
    return names;
  }

  Object.values(services).forEach((list) => {
    if (!Array.isArray(list)) return;

    list.forEach((service) => {
      if (service && typeof service.name === "string") {
        names.add(service.name);
      }
    });
  });

  return names;
}

function readIdbKey(key) {
  return new Promise((resolve, reject) => {
    const request = dashboardDB
      .transaction(INDEXED_DB_STORE, "readonly")
      .objectStore(INDEXED_DB_STORE)
      .get(key);

    request.onsuccess = () => resolve(request.result);

    request.onerror = () =>
      reject(request.error || new Error("Unable to read IndexedDB."));
  });
}

/* Resolves only when the write is committed. */
function writeIdbKeyConfirmed(key, value) {
  return new Promise((resolve, reject) => {
    const transaction = dashboardDB.transaction(INDEXED_DB_STORE, "readwrite");

    transaction.objectStore(INDEXED_DB_STORE).put(value, key);

    transaction.oncomplete = () => resolve();

    transaction.onerror = () =>
      reject(transaction.error || new Error("Unable to write IndexedDB."));

    transaction.onabort = () =>
      reject(transaction.error || new Error("IndexedDB write aborted."));
  });
}

/*
   Cancel in edit mode: undoes the deletions (and the restorations of
   deleted names) made during the session, so the saved data matches the
   restored snapshot.
*/
function undoSessionDeletions() {
  if (!deletionLog.length) return;

  for (let i = deletionLog.length - 1; i >= 0; i--) {
    const record = deletionLog[i];

    if (record.tombstoneAdded) {
      deletedServices = deletedServices.filter((n) => n !== record.name);
    }

    if (record.tombstoneRemoved && !deletedServices.includes(record.name)) {
      deletedServices.push(record.name);
    }

    if (record.prevEdited) {
      editedServices[record.name] = record.prevEdited;
    } else {
      delete editedServices[record.name];
    }
  }

  deletionLog = [];

  writeDeletedServices();

  saveEditedServices();
}

/*
   Startup cleanup: removes saved data that belongs to no service.
   It never runs unless the state was fully and correctly loaded, it
   never runs if the list of services defined in the code is empty, the
   removed data is copied into a backup key first, and any error leaves
   the data untouched.
*/
async function cleanupOrphanedData() {
  try {
    if (!dashboardDB || !savedStateFound) return;

    const codeNames = getCodeServiceNames();

    if (codeNames.size === 0) return;

    const custom = dashboardState.customServices || {};

    const visibility = dashboardState.visibility || {};

    const tombstones = new Set(deletedServices);

    const removed = {
      editedServices: {},
      customServices: {},
      visibility: {},
    };

    let found = false;

    Object.keys(editedServices).forEach((name) => {
      const known = codeNames.has(name) || hasOwnKey(custom, name);

      if (!known || tombstones.has(name)) {
        removed.editedServices[name] = editedServices[name];
        found = true;
      }
    });

    Object.keys(custom).forEach((name) => {
      if (tombstones.has(name) && !codeNames.has(name)) {
        removed.customServices[name] = custom[name];
        found = true;
      }
    });

    Object.keys(visibility).forEach((name) => {
      const known = codeNames.has(name) || hasOwnKey(custom, name);

      const removedCustom = hasOwnKey(removed.customServices, name);

      if (!known || tombstones.has(name) || removedCustom) {
        removed.visibility[name] = visibility[name];
        found = true;
      }
    });

    if (!found) return;

    /* Backup first: if it fails, nothing is removed. */

    const previousBackups = await readIdbKey(INDEXED_DB_BACKUP_KEY);

    const backups = Array.isArray(previousBackups) ? previousBackups : [];

    backups.push({
      date: new Date().toISOString(),
      removed: structuredClone(removed),
    });

    await writeIdbKeyConfirmed(
      INDEXED_DB_BACKUP_KEY,
      backups.slice(-ORPHAN_BACKUP_LIMIT),
    );

    Object.keys(removed.editedServices).forEach((name) => {
      delete editedServices[name];
    });

    Object.keys(removed.customServices).forEach((name) => {
      delete dashboardState.customServices[name];
    });

    Object.keys(removed.visibility).forEach((name) => {
      delete dashboardState.visibility[name];
    });

    saveEditedServices();

    writeDashboardState();
  } catch (error) {
    console.error("Orphan cleanup skipped:", error);
  }
}

/* =========================
   EDIT SNAPSHOT
========================= */

function createEditSnapshot() {

  deletionLog = [];


  editSnapshot =
    structuredClone(
      dashboardState
    );

}


/* =========================
   SNAPSHOT RESTORE
========================= */

function restoreEditSnapshot() {

  if (!editSnapshot) return;

  dashboardState =
    structuredClone(
      editSnapshot
    );

  normalizeDashboardState();

  writeDashboardState();

  rerenderAllServices();

}


/* =========================
   SAVE CURRENT STATE
========================= */

function saveCurrentState() {

  const visibilityData = {};

  const orderData = {};

  const sectionsData = {};


  document
    .querySelectorAll(
      ".service-wrapper"
    )
    .forEach(
      wrapper => {

        const serviceName =
          wrapper.dataset.service;


        visibilityData[
          serviceName
        ] =
          !wrapper.classList.contains(
            "service-hidden"
          );

      }
    );


  document
    .querySelectorAll(
      ".services"
    )
    .forEach(
      container => {

        const sectionName =
          container.id.replace(
            "-services",
            ""
          );


        orderData[
          sectionName
        ] = [
          ...container.querySelectorAll(
            ".service-wrapper"
          )
        ].map(
          item =>
            item.dataset.service
        );


        orderData[
          sectionName
        ].forEach(
          serviceName => {

            sectionsData[
              serviceName
            ] =
              sectionName;

          }
        );

      }
    );


  dashboardState.visibility =
    structuredClone(
      visibilityData
    );


  dashboardState.order =
    structuredClone(
      orderData
    );


  dashboardState.sections =
    structuredClone(
      sectionsData
    );


  normalizeDashboardState();


  writeDashboardState();

}

/* =========================
   SERVICE CREATION
========================= */


function renderServices(
  sectionName
) {

  const container =
    document.getElementById(
      `${sectionName}-services`
    );


  if (!container) {
    return;
  }


  const visibilityData =
    getVisibilityData();


  const sectionServices =
    getServicesForSection(
      sectionName
    );


  sectionServices.forEach(
    service => {

      const wrapper =
        document.createElement(
          "div"
        );


      wrapper.className =
        "service-wrapper";


      wrapper.dataset.service =
        service.name;


      const isHidden =
        visibilityData[
          service.name
        ] === false;


      if (isHidden) {

        wrapper.classList.add(
          "service-hidden"
        );

      }


      const link =
        document.createElement(
          "a"
        );


      link.className =
        "service";


      link.href =
        safeLinkUrl(service.url);


      link.target =
        "_blank";


      link.rel =
        "noopener noreferrer";


      const image =
        document.createElement(
          "img"
        );


      image.src =
        safeIconUrl(service.icon);


      image.alt = serviceLabel(service);


      if (service.enhanced) {

        image.classList.add(
          "enhanced-logo"
        );

      }


      const name =
        document.createElement(
          "span"
        );


      name.textContent = serviceLabel(service);


      const visibilityToggle =
        document.createElement(
          "button"
        );


      visibilityToggle.className =
        "visibility-toggle";


      visibilityToggle.type =
        "button";


      visibilityToggle.addEventListener(
        "click",
        event => {

          event.preventDefault();

          event.stopPropagation();


          if (!editMode) {
            return;
          }


          wrapper.classList.toggle(
            "service-hidden"
          );


          updateVisibilityButton(
            wrapper
          );

        }
      );


      const editToggle = document.createElement("button");

      editToggle.className = "edit-toggle";

      editToggle.type = "button";

      editToggle.setAttribute("data-i18n-aria-label", "service.edit");

      editToggle.setAttribute("aria-label", t("service.edit"));

      editToggle.innerHTML = `
  <svg
    class="edit-toggle-icon"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      d="M4 20h4L19.5 8.5a2.12 2.12 0 0 0-3-3L5 17v3Z"
    ></path>

    <path
      d="m14.5 6.5 3 3"
    ></path>
  </svg>
`;

      editToggle.addEventListener("click", (event) => {
        event.preventDefault();

        event.stopPropagation();

        if (!editMode) {
          return;
        }

        openServiceEditDialog(service.name);
      });

      const deleteToggle = document.createElement("button");

      deleteToggle.className = "delete-toggle";

      deleteToggle.type = "button";

      deleteToggle.addEventListener("click", (event) => {
        event.preventDefault();

        event.stopPropagation();

        if (!editMode) {
          return;
        }

        pendingDeleteWrapper = wrapper;

        openDeleteConfirmDialog();
      });

      deleteToggle.textContent = "×";


      link.appendChild(
        image
      );

      link.appendChild(
        name
      );

      link.appendChild(visibilityToggle);

      link.appendChild(editToggle);

      link.appendChild(deleteToggle);


      wrapper.appendChild(
        link
      );


      container.appendChild(
        wrapper
      );


      updateVisibilityButton(
        wrapper
      );

    }
  );


  /*
     Placeholder for adding
     a new service.
  */

  const addWrapper = document.createElement("div");

  addWrapper.className = "add-service-wrapper";

  const addPlaceholder = document.createElement("button");

  addPlaceholder.type = "button";

  addPlaceholder.className = "add-service-placeholder";

  addPlaceholder.dataset.section = sectionName;

  addPlaceholder.innerHTML = `
  <span
    class="add-service-plus"
    aria-hidden="true"
  >+</span>

  <span
    class="add-service-text"
    data-i18n="add.button"
  >${t("add.button")}</span>
`;

  addWrapper.appendChild(addPlaceholder);

  container.appendChild(addWrapper);

}


/* =========================
   ADD SERVICES
========================= */

function createAddServiceDialog() {

  if (
    document.getElementById(
      "add-service-overlay"
    )
  ) {
    return;
  }


  const overlay =
    document.createElement(
      "div"
    );


  overlay.className =
    "add-service-overlay";


  overlay.id =
    "add-service-overlay";


  overlay.innerHTML = `
    <div
      class="add-service-dialog"
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-service-title"
    >

      <button
        type="button"
        class="add-service-close"
        id="add-service-close"
        data-i18n-aria-label="add.close"
        aria-label="${t("add.close")}"
      >
        ×
      </button>


      <div
        class="add-service-title"
        id="add-service-title"
        data-i18n="add.title"
      >
        ${t("add.title")}
      </div>


      <div
        class="add-service-section"
        id="add-service-section"
      ></div>


      <label class="add-service-field">

        <span data-i18n="field.name">${t("field.name")}</span>

        <input
          type="text"
          id="add-service-name"
          autocomplete="off"
        >

      </label>


      <label class="add-service-field">

        <span data-i18n="field.url">${t("field.url")}</span>

        <input
          type="text"
          id="add-service-url"
          autocomplete="off"
        >

      </label>


      <div class="add-service-field">

        <span class="add-service-label-row">

  <span data-i18n="field.logo">${t("field.logo")}</span>

  <button
    type="button"
    class="add-service-info-button"
    id="add-service-info-button"
    data-i18n-aria-label="field.logoInfo"
    aria-label="${t("field.logoInfo")}"
    aria-expanded="false"
  >!</button>

</span>

        <input
          type="text"
          id="add-service-icon"
          autocomplete="off"
        >

      </div>

      <label class="enhance-toggle">
        <input type="checkbox" id="add-service-enhanced">
        <span class="enhance-track" aria-hidden="true"></span>
        <span class="enhance-label" data-i18n="field.enhance">${t("field.enhance")}</span>
      </label>



      <div
  class="add-service-info"
  id="add-service-info"
  role="note"
>
  <div>
    <strong>Favicon</strong>: <span data-i18n-html="field.logoInfo.favicon">${t("field.logoInfo.favicon")}</span>
  </div>

  <div>
    <strong>Local</strong>: <span data-i18n-html="field.logoInfo.local">${t("field.logoInfo.local")}</span>
  </div>
</div>


      <div
        class="add-service-error"
        id="add-service-error"
      ></div>


      <div class="add-service-actions">

        <button
          type="button"
          class="add-service-cancel"
          id="add-service-cancel"
          data-i18n="field.cancel"
        >
          ${t("field.cancel")}
        </button>


        <button
          type="button"
          class="add-service-confirm"
          id="add-service-confirm"
          data-i18n="add.confirm"
        >
          ${t("add.confirm")}
        </button>

      </div>

    </div>
  `;


  document.body.appendChild(
    overlay
  );


const addServiceInfoButton = document.getElementById("add-service-info-button");

const addServiceInfo = document.getElementById("add-service-info");

if (addServiceInfoButton && addServiceInfo) {
  addServiceInfoButton.addEventListener("click", (event) => {
    event.stopPropagation();

    const isActive = addServiceInfo.classList.toggle("active");

    addServiceInfoButton.setAttribute("aria-expanded", String(isActive));
  });

  addServiceInfo.addEventListener("click", (event) => {
    event.stopPropagation();
  });

  document.addEventListener("click", (event) => {
    if (!addServiceInfo.classList.contains("active")) {
      return;
    }

    if (
      event.target.closest("#add-service-info-button") ||
      event.target.closest("#add-service-info")
    ) {
      return;
    }

    addServiceInfo.classList.remove("active");

    addServiceInfoButton.setAttribute("aria-expanded", "false");
  });
}


  const close =
    () => {

      overlay.classList.remove(
        "active"
      );

      window.parent.postMessage(
        {
          type: "add-service-modal",
          open: false,
        },
        "*",
      );

    };


  document
    .getElementById(
      "add-service-close"
    )
    .addEventListener(
      "click",
      close
    );


  document
    .getElementById(
      "add-service-cancel"
    )
    .addEventListener(
      "click",
      close
    );


  document
    .getElementById(
      "add-service-confirm"
    )
    .addEventListener(
      "click",
      () => {

        const sectionName =
          overlay.dataset.section;


        const name =
          document
            .getElementById(
              "add-service-name"
            )
            .value
            .trim();


        const url =
          document
            .getElementById(
              "add-service-url"
            )
            .value
            .trim();


        const icon =
          document
            .getElementById(
              "add-service-icon"
            )
            .value
            .trim();


        const error =
          document.getElementById(
            "add-service-error"
          );


        error.textContent =
          "";


        if (
          !name ||
          !url ||
          !icon
        ) {

          error.textContent =
            t("error.fillAll");

          return;

        }


        const inputError =
          validateServiceInput(name, url, icon);


        if (inputError) {

          error.textContent =
            t(inputError);

          return;

        }


        const definedServices =
          getAllDefinedServices();


        if (
          definedServices[name] &&
          !deletedServices.includes(name)
        ) {

          error.textContent =
            t("error.duplicate");

          return;

        }


        if (
          !Object.prototype.hasOwnProperty.call(
            services,
            sectionName
          )
        ) {

          error.textContent =
            t("error.invalidCategory");

          return;

        }


        const enhanced = document.getElementById("add-service-enhanced").checked;



        const wasDeleted = deletedServices.includes(name);

        const isCodeService = getCodeServiceNames().has(name);

        if (wasDeleted) {
          deletionLog.push({
            name,
            tombstoneAdded: false,
            tombstoneRemoved: true,
            prevEdited: hasOwnKey(editedServices, name)
              ? structuredClone(editedServices[name])
              : null,
          });

          deletedServices = deletedServices.filter((n) => n !== name);

          writeDeletedServices();
        }

        if (wasDeleted && isCodeService) {
          /*
             Name of a deleted service defined in the code: the service
             is restored and the values entered now are applied on top,
             so the user sees exactly what was typed.
          */

          editedServices[name] = { name, url, icon, enhanced };

          saveEditedServices();
        } else {
          if (hasOwnKey(editedServices, name)) {
            delete editedServices[name];

            saveEditedServices();
          }

          dashboardState.customServices[name] = {
            name,
            url,
            icon,
            ...(enhanced ? { enhanced: true } : {}),
          };
        }


        dashboardState.sections[
          name
        ] =
          sectionName;


        dashboardState.order[
          sectionName
        ] = [

          ...(
            dashboardState.order[
              sectionName
            ] || []
          ),

          name

        ];


        dashboardState.visibility[
          name
        ] =
          true;


        writeDashboardState();


        rerenderAllServices();


        close();

      }
    );

}


function createServiceEditDialog() {
  if (document.getElementById("service-edit-overlay")) {
    return;
  }

  const overlay = document.createElement("div");

  overlay.className = "add-service-overlay";

  overlay.id = "service-edit-overlay";

  overlay.innerHTML = `
    <div
      class="add-service-dialog"
      role="dialog"
      aria-modal="true"
    >

      <button
        type="button"
        class="add-service-close"
        id="service-edit-close"
        data-i18n-aria-label="add.close"
        aria-label="${t("add.close")}"
      >
        ×
      </button>

      <div
        class="add-service-title"
        data-i18n="edit.title"
      >
        ${t("edit.title")}
      </div>

      <label class="add-service-field">

        <span data-i18n="field.name">${t("field.name")}</span>

        <input
          type="text"
          id="service-edit-name"
          autocomplete="off"
        >

      </label>

      <label class="add-service-field">

        <span data-i18n="field.url">${t("field.url")}</span>

        <input
          type="text"
          id="service-edit-url"
          autocomplete="off"
        >

      </label>

      <label class="add-service-field">

        <span data-i18n="field.logo">${t("field.logo")}</span>

        <input
          type="text"
          id="service-edit-icon"
          autocomplete="off"
        >

      </label>

      <label class="enhance-toggle">
        <input type="checkbox" id="service-edit-enhanced">
        <span class="enhance-track" aria-hidden="true"></span>
        <span class="enhance-label" data-i18n="field.enhance">${t("field.enhance")}</span>
      </label>


      <div
        class="add-service-error"
        id="service-edit-error"
      ></div>

      <div
        class="add-service-actions"
      >

        <button
          type="button"
          class="add-service-cancel"
          id="service-edit-cancel"
          data-i18n="field.cancel"
        >
          ${t("field.cancel")}
        </button>

        <button
          type="button"
          class="add-service-confirm"
          id="service-edit-save"
          data-i18n="edit.save"
        >
          ${t("edit.save")}
        </button>

      </div>

    </div>
  `;

  document.body.appendChild(overlay);

  document
    .getElementById("service-edit-close")
    .addEventListener("click", closeServiceEditDialog);

  document
    .getElementById("service-edit-cancel")
    .addEventListener("click", closeServiceEditDialog);

  document
    .getElementById("service-edit-save")
    .addEventListener("click", saveServiceEdit);
}


function openServiceEditDialog(serviceId) {
  createServiceEditDialog();

  const overlay = document.getElementById("service-edit-overlay");

  const service = getAllDefinedServices()[serviceId];

  if (!service) {
    return;
  }

  pendingServiceEdit = serviceId;

  document.getElementById("service-edit-name").value =
    serviceLabel(service);

  document.getElementById("service-edit-url").value = service.url;

  document.getElementById("service-edit-icon").value = service.icon;

  document.getElementById("service-edit-enhanced").checked =
    service.enhanced === true;

  document.getElementById("service-edit-error").textContent = "";

  window.parent.postMessage(
    {
      type: "add-service-modal",
      open: true,
    },
    "*",
  );

  overlay.classList.add("active");
}


function closeServiceEditDialog() {
  const overlay = document.getElementById("service-edit-overlay");

  if (!overlay) {
    return;
  }

  overlay.classList.remove("active");

  pendingServiceEdit = null;

  window.parent.postMessage(
    {
      type: "add-service-modal",
      open: false,
    },
    "*",
  );
}


function saveServiceEdit() {
  if (!pendingServiceEdit) {
    return;
  }

  const serviceId = pendingServiceEdit;

  const name = document.getElementById("service-edit-name").value.trim();

  const url = document.getElementById("service-edit-url").value.trim();

  const icon = document.getElementById("service-edit-icon").value.trim();

  const error = document.getElementById("service-edit-error");

  error.textContent = "";

  if (!name || !url || !icon) {
    error.textContent = t("error.fillAll");

    return;
  }

  const inputError = validateServiceInput(name, url, icon);

  if (inputError) {
    error.textContent = t(inputError);

    return;
  }

  const definedServices = getAllDefinedServices();

  const duplicate = Object.entries(definedServices).some(([id, service]) => {
    if (id === serviceId || deletedServices.includes(id)) {
      return false;
    }

    const currentName = serviceLabel(service);

    return currentName.toLowerCase() === name.toLowerCase();
  });

  if (duplicate) {
    error.textContent = t("error.duplicate");

    return;
  }

  editedServices[serviceId] = {
    name,
    url,
    icon,
    enhanced: document.getElementById("service-edit-enhanced").checked,
  };

  saveEditedServices();

  rerenderAllServices();

  closeServiceEditDialog();
}


function openAddServiceDialog(
  sectionName
) {

  createAddServiceDialog();


  const overlay =
    document.getElementById(
      "add-service-overlay"
    );


  const sectionLabel =
    document.getElementById(
      "add-service-section"
    );


  overlay.dataset.section =
    sectionName;


  sectionLabel.textContent =
    t("section." + sectionName) !== "section." + sectionName
      ? t("section." + sectionName)
      : sectionName.toUpperCase();


  document
    .getElementById(
      "add-service-name"
    )
    .value = "";


  document
    .getElementById(
      "add-service-url"
    )
    .value = "";


  document
    .getElementById(
      "add-service-icon"
    )
    .value = "";


  document.getElementById("add-service-enhanced").checked = false;


  document
    .getElementById(
      "add-service-error"
    )
    .textContent = "";


    const addServiceInfo = document.getElementById("add-service-info");

    const addServiceInfoButton = document.getElementById(
      "add-service-info-button",
    );

    if (addServiceInfo && addServiceInfoButton) {
      addServiceInfo.classList.remove("active");

      addServiceInfoButton.setAttribute("aria-expanded", "false");
    }


  window.parent.postMessage(
    {
      type: "add-service-modal",
      open: true,
    },
    "*",
  );

  overlay.classList.add(
    "active"
  );


  requestAnimationFrame(
    () => {

      document
        .getElementById(
          "add-service-name"
        )
        .focus();

    }
  );

}


document.addEventListener(
  "click",
  event => {

    const placeholder =
      event.target.closest(
        ".add-service-placeholder"
      );


    if (
      !placeholder ||
      !editMode
    ) {
      return;
    }


    event.preventDefault();

    event.stopPropagation();


    openAddServiceDialog(
      placeholder.dataset.section
    );

  }
);


/* =========================
   UPDATE VISIBILITY ICON
========================= */

function updateVisibilityButton(wrapper) {
  const button = wrapper.querySelector(".visibility-toggle");

  if (!button) return;

  const hidden = wrapper.classList.contains("service-hidden");

  button.innerHTML = hidden
    ? `
        <svg class="visibility-icon eye-off"
             viewBox="0 0 24 24"
             aria-hidden="true">

          <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z"/>

          <circle cx="12" cy="12" r="2.5"/>

          <path class="eye-slash"
                d="M4 4l16 16"/>

        </svg>
      `
    : `
        <svg class="visibility-icon eye-on"
             viewBox="0 0 24 24"
             aria-hidden="true">

          <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z"/>

          <circle cx="12" cy="12" r="2.5"/>

        </svg>
      `;

  button.title = hidden ? t("service.show") : t("service.hide");

  button.setAttribute("aria-label", button.title);
}

/* =========================
   SERVICES RENDER
========================= */

renderServices("services");

renderServices("ecommerce");

renderServices("streaming");

/* =========================
   SETTINGS
========================= */

const settingsButton = document.querySelector(".settings-button");

const settingsText = document.querySelector("#settings-text");

const settingsCredits = document.querySelector("#settings-credits");

const settingsMainZone = document.querySelector("#settings-main-zone");
const settingsCard = document.querySelector("#settings-card");

const confirmOverlay = document.querySelector("#confirm-overlay");

const confirmCancel = document.querySelector("#confirm-cancel");

const confirmAccept = document.querySelector("#confirm-accept");

const creditsOverlay = document.querySelector("#credits-overlay");

const creditsClose = document.querySelector("#credits-close");

const creditsVersion = document.querySelector("#credits-version");

const creditsYear = document.querySelector("#credits-year");

/* =========================
   CREDITS
========================= */

function openCredits() {
  if (!creditsOverlay) return;

  if (creditsVersion) {
    creditsVersion.textContent = `${t("credits.version")} ${PROJECT_VERSION}`;
  }

  if (creditsYear) {
    creditsYear.textContent = `© ${PROJECT_YEAR}`;
  }

  creditsOverlay.classList.add("active");

  /* The page-switch bar lives outside this frame: it goes behind the overlay
     while the credits are open (same message as the other modals). */
  window.parent.postMessage({ type: "add-service-modal", open: true }, "*");

}

function closeCredits() {
  if (!creditsOverlay) return;

  creditsOverlay.classList.remove("active");

  /* The page-switch bar lives outside this frame: it goes behind the overlay
     while the credits are open (same message as the other modals). */
  window.parent.postMessage({ type: "add-service-modal", open: false }, "*");

}

if (creditsClose) {
  creditsClose.addEventListener("click", closeCredits);
}

if (creditsOverlay) {
  creditsOverlay.addEventListener("click", (event) => {
    if (event.target === creditsOverlay) {
      closeCredits();
    }
  });
}

if (settingsCredits) {
  settingsCredits.addEventListener("click", (event) => {
    event.preventDefault();

    event.stopPropagation();

    openCredits();
  });

  settingsCredits.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();

      event.stopPropagation();

      openCredits();
    }
  });
}

/* =========================
   SETTINGS PANEL
========================= */

function openSettingsCard() {
  if (!settingsCard) return;

  settingsCard.classList.add("open");
  settingsCard.setAttribute("aria-hidden", "false");

  if (settingsMainZone) {
    settingsMainZone.classList.add("card-open");
    settingsMainZone.setAttribute("aria-expanded", "true");
  }
}

function closeSettingsCard() {
  if (!settingsCard) return;

  settingsCard.classList.remove("open");
  settingsCard.setAttribute("aria-hidden", "true");

  if (settingsMainZone) {
    settingsMainZone.classList.remove("card-open");
    settingsMainZone.setAttribute("aria-expanded", "false");
  }
}

/* =========================
   OPEN SETTINGS
========================= */

function openSettingsMenu() {
  if (!settingsButton) return;

  settingsMenuOpen = true;

  settingsButton.classList.remove("menu-closing");

  settingsButton.classList.add("menu-opening");

  settingsButton.classList.add("menu-open");

  if (settingsText) {
  settingsText.textContent = editMode ? t("settings.fix") : t("settings.title");
  }

  setTimeout(() => {
    settingsButton.classList.remove("menu-opening");
  }, 450);
}

/* =========================
   CLOSE SETTINGS
========================= */

function closeSettingsMenu() {
  if (!settingsButton) return;
  closeSettingsCard();

  settingsMenuOpen = false;

  settingsButton.classList.remove("menu-opening");

  settingsButton.classList.remove("menu-open");

  settingsButton.classList.add("menu-closing");

  setTimeout(() => {
    settingsButton.classList.remove("menu-closing");
  }, 450);
}

/* =========================
   CONFIRM
========================= */

function openConfirmDialog() {
  if (!confirmOverlay) return;

  confirmOverlay.classList.add("active");

  /* The page-switch bar is outside this frame: it goes behind the overlay
     while the dialog is open (same message as the other modals). */
  window.parent.postMessage({ type: "add-service-modal", open: true }, "*");

}

function closeConfirmDialog() {
  if (!confirmOverlay) return;

  confirmOverlay.classList.remove("active");

  /* The page-switch bar is outside this frame: it goes behind the overlay
     while the dialog is open (same message as the other modals). */
  window.parent.postMessage({ type: "add-service-modal", open: false }, "*");

}


/* =========================
   CONFIRM DELETION
========================= */

const deleteConfirmOverlay =
  document.createElement("div");

deleteConfirmOverlay.id =
  "delete-confirm-overlay";

deleteConfirmOverlay.className =
  "confirm-overlay";

deleteConfirmOverlay.innerHTML = `
  <div class="confirm-dialog">
    <h3 data-i18n="delete.title">${t("delete.title")}</h3>

    <p id="delete-confirm-text"></p>

    <div class="confirm-actions">
      <button
        type="button"
        class="confirm-cancel"
        id="delete-confirm-no"
        data-i18n="delete.no"
      >
        ${t("delete.no")}
      </button>

      <button
        type="button"
        class="confirm-accept"
        id="delete-confirm-yes"
        data-i18n="delete.yes"
      >
        ${t("delete.yes")}
      </button>
    </div>
  </div>
`;

document.body.appendChild(
  deleteConfirmOverlay
);


function openDeleteConfirmDialog() {

  /* The text names the service being deleted (shown name, as on the card). */
  const deleteConfirmText = document.getElementById("delete-confirm-text");

  if (deleteConfirmText) {
    const label = pendingDeleteWrapper
      ? pendingDeleteWrapper.querySelector(".service > span")
      : null;

    deleteConfirmText.textContent = t("delete.text", {
      name: label ? label.textContent : "",
    });
  }

  deleteConfirmOverlay.classList.add(
    "active"
  );

  /* The page-switch bar is outside this frame: it goes behind the overlay
     while the dialog is open (same message as the other modals). */
  window.parent.postMessage({ type: "add-service-modal", open: true }, "*");


}


function closeDeleteConfirmDialog() {

  deleteConfirmOverlay.classList.remove(
    "active"
  );

  /* The page-switch bar is outside this frame: it goes behind the overlay
     while the dialog is open (same message as the other modals). */
  window.parent.postMessage({ type: "add-service-modal", open: false }, "*");


}


document
  .querySelector("#delete-confirm-no")
  .addEventListener(
    "click",
    () => {

      pendingDeleteWrapper =
        null;

      closeDeleteConfirmDialog();

    }
  );


document
  .querySelector("#delete-confirm-yes")
  .addEventListener(
    "click",
    () => {

      if (!pendingDeleteWrapper) {
        closeDeleteConfirmDialog();
        return;
      }

      const serviceName =
        pendingDeleteWrapper.dataset.service;

      const deletionRecord = {
        name: serviceName,
        tombstoneAdded: false,
        tombstoneRemoved: false,
        prevEdited: hasOwnKey(editedServices, serviceName)
          ? structuredClone(editedServices[serviceName])
          : null,
      };

      /*
         Every deleted service keeps a tombstone (its name only): a service
         defined in the code would be created again at every load, and an
         import that adds the missing services must not bring back a
         service that was deleted here. All its other data is removed.
      */

      if (!deletedServices.includes(serviceName)) {
        deletedServices.push(serviceName);

        deletionRecord.tombstoneAdded = true;
      }

      if (hasOwnKey(editedServices, serviceName)) {
        delete editedServices[serviceName];

        saveEditedServices();
      }

      if (hasOwnKey(dashboardState.customServices || {}, serviceName)) {
        delete dashboardState.customServices[serviceName];
      }

      deletionLog.push(deletionRecord);

      writeDeletedServices();

      pendingDeleteWrapper.remove();

      pendingDeleteWrapper =
        null;

      saveCurrentState();

      closeDeleteConfirmDialog();

    }
  );


/* =========================
   EDIT MODE
========================= */

function updateEditMode() {
  if (!settingsButton) return;

  if (editMode) {
    document.body.classList.add("edit-mode");

    settingsButton.classList.add("active");

    settingsButton.classList.add("editing");

    if (settingsText) {
      settingsText.textContent = t("settings.fix");
    }
  } else {
    document.body.classList.remove("edit-mode");

    settingsButton.classList.remove("active");

    settingsButton.classList.remove("editing");

    if (settingsText) {
      settingsText.textContent = t("settings.title");
    }
  }

  updateDraggableState();
}

/* =========================
   GEAR ZONE CLICK
========================= */

const settingsIconZone = document.querySelector("#settings-icon-zone");
const settingsEditZone = document.querySelector("#settings-edit-zone");

if (settingsIconZone) {
  settingsIconZone.addEventListener("click", (event) => {
    event.preventDefault();

    event.stopPropagation();

    if (!settingsMenuOpen) {
      openSettingsMenu();

      return;
    }

    closeSettingsMenu();
  });
}

/* =========================
   EDIT ZONE CLICK
========================= */

if (settingsEditZone) {
  settingsEditZone.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (editMode) return;

    /* Snapshot BEFORE entering edit mode. */
    createEditSnapshot();

    editMode = true;

    /* The panel closes: it must not cover the draggable cards. */
    closeSettingsCard();

    updateEditMode();
  });
}

/* =========================
   EXPORT SERVICES
========================= */

/*
   One JSON file per page. It describes what the dashboard shows now
   (names, URLs, icons, section, order, visibility) and the names of the
   deleted services. It reads the state only: nothing is changed.
*/
const EXPORT_APP_ID = "service-webpage";

const EXPORT_FILE_VERSION = 1;

function buildExportData() {
  const codeNames = getCodeServiceNames();

  const visibility = dashboardState.visibility || {};

  const sections = Object.keys(services).map((sectionName) => ({
    id: sectionName,
    services: getServicesForSection(sectionName).map((service) => ({
      name: service.name,
      displayName: service.displayName || service.name,
      url: service.url,
      icon: service.icon,
      ...(typeof service.enhanced === "boolean" ? { enhanced: service.enhanced } : {}),
      visible: visibility[service.name] !== false,
      origin: codeNames.has(service.name) ? "code" : "custom",
    })),
  }));

  return {
    app: EXPORT_APP_ID,
    page: STORAGE_PAGE_ID,
    schemaVersion: EXPORT_FILE_VERSION,
    exportedAt: new Date().toISOString(),
    sections,
    deletedServices: [...deletedServices],
  };
}

function getExportFileName() {
  const now = new Date();

  const pad = (value) => String(value).padStart(2, "0");

  const date = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;

  return `${EXPORT_APP_ID}-${STORAGE_PAGE_ID}-${date}.json`;
}

function exportServices() {
  try {
    const text = JSON.stringify(buildExportData(), null, 2);

    const blob = new Blob([text], { type: "application/json" });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download = getExportFileName();

    document.body.appendChild(link);

    link.click();

    link.remove();

    setTimeout(() => URL.revokeObjectURL(url), 1000);
  } catch (error) {
    console.error("Export failed:", error);
  }
}

const settingsExportZone = document.querySelector("#settings-export-zone");

if (settingsExportZone) {
  settingsExportZone.addEventListener("click", (event) => {
    event.preventDefault();

    event.stopPropagation();

    if (editMode) return;

    exportServices();
  });
}

/* =========================
   IMPORT SERVICES
========================= */

/*
   Reads a file made by the export of this same page. Two modes:
   - merge: adds only the missing services, never deletes anything;
   - replace: this page becomes equal to the file.
   Everything read from the file is validated and is only ever written to
   the page as text (never as HTML). A copy of the current data is saved
   inside IndexedDB before any change.
*/
const IMPORT_MAX_BYTES = 1024 * 1024;

const IMPORT_MAX_SERVICES = 500;

const IMPORT_MAX_NAME = 120;

const IMPORT_MAX_URL = 2000;

const IMPORT_MAX_ICON = 20000;

const IMPORT_BACKUP_KEY = `${STORAGE_PAGE_ID}_importBackup`;

const IMPORT_BACKUP_LIMIT = 3;

const IMPORT_FORBIDDEN_NAMES = ["__proto__", "constructor", "prototype"];

function importShown(value) {
  return typeof value === "string" ? value.slice(0, 60) : "?";
}

function importIsSafeName(value) {
  return (
    typeof value === "string" &&
    value.length > 0 &&
    value.length <= IMPORT_MAX_NAME &&
    value.trim() === value &&
    !IMPORT_FORBIDDEN_NAMES.includes(value)
  );
}

function importParseUrl(value) {
  if (
    typeof value !== "string" ||
    value.length === 0 ||
    value.length > IMPORT_MAX_URL
  ) {
    return null;
  }

  try {
    const parsed = new URL(value);

    return parsed.protocol === "http:" || parsed.protocol === "https:"
      ? parsed
      : null;
  } catch {
    return null;
  }
}

/* A URL is valid when it is an http(s) address or has no scheme at all
   ("#" is used by the placeholder services). Other schemes are refused. */
function importIsValidUrl(value) {
  if (
    typeof value !== "string" ||
    value.length === 0 ||
    value.length > IMPORT_MAX_URL
  ) {
    return false;
  }

  if (/^[a-z][a-z0-9+.\-]*:/i.test(value)) {
    return importParseUrl(value) !== null;
  }

  return true;
}

function importNormalizeUrl(value) {
  const parsed = importParseUrl(value);

  if (!parsed) return String(value || "").trim().toLowerCase();

  const host = parsed.hostname.toLowerCase().replace(/^www\./, "");

  const path = parsed.pathname.replace(/\/+$/, "");

  return host + (parsed.port ? ":" + parsed.port : "") + path + parsed.search;
}

function importIsValidIcon(value) {
  if (
    typeof value !== "string" ||
    value.length === 0 ||
    value.length > IMPORT_MAX_ICON
  ) {
    return false;
  }

  if (/^data:image\//i.test(value)) return true;

  if (/^[a-z][a-z0-9+.\-]*:/i.test(value)) {
    return importParseUrl(value) !== null;
  }

  return value.length <= IMPORT_MAX_URL;
}

/* Validation of user-typed service values (same rules as the import). */
function validateServiceInput(name, url, icon) {
  if (!importIsSafeName(name)) return "error.invalidName";

  if (!importIsValidUrl(url)) return "error.invalidUrl";

  if (!importIsValidIcon(icon)) return "error.invalidIcon";

  return "";
}

/* Render-time guards: a stored value with a disallowed scheme is never
   written to href/src, whatever the way it reached the storage. */
function safeLinkUrl(value) {
  return importIsValidUrl(value) ? value : "#";
}

function safeIconUrl(value) {
  return importIsValidIcon(value) ? value : "";
}

/* Returns { error, values } or { entries, skipped, tombstones, date }. */
function parseImportFile(text) {
  let raw;

  try {
    raw = JSON.parse(text);
  } catch {
    return { error: "import.err.format" };
  }

  if (
    !raw ||
    typeof raw !== "object" ||
    Array.isArray(raw) ||
    raw.app !== EXPORT_APP_ID ||
    typeof raw.page !== "string" ||
    !Array.isArray(raw.sections)
  ) {
    return { error: "import.err.format" };
  }

  if (
    !Number.isInteger(raw.schemaVersion) ||
    raw.schemaVersion < 1 ||
    raw.schemaVersion > EXPORT_FILE_VERSION
  ) {
    return { error: "import.err.version" };
  }

  if (raw.page !== STORAGE_PAGE_ID) {
    return { error: "import.err.page", values: { page: importShown(raw.page) } };
  }

  const codeNames = getCodeServiceNames();

  const entries = [];

  const skipped = [];

  const seen = new Set();

  let total = 0;

  for (const section of raw.sections) {
    if (!section || typeof section !== "object") continue;

    if (!Array.isArray(section.services)) continue;

    const sectionOk =
      typeof section.id === "string" && hasOwnKey(services, section.id);

    for (const item of section.services) {
      total++;

      if (total > IMPORT_MAX_SERVICES) return { error: "import.err.big" };

      if (!item || typeof item !== "object") {
        skipped.push("?");

        continue;
      }

      const name = item.name;

      if (!importIsSafeName(name)) {
        skipped.push(importShown(name));

        continue;
      }

      const displayName =
        item.displayName === undefined ? name : item.displayName;

      const isCode = codeNames.has(name);

      if (
        seen.has(name) ||
        !sectionOk ||
        !importIsSafeName(displayName) ||
        !importIsValidUrl(item.url) ||
        !importIsValidIcon(item.icon) ||
        (item.origin === "code" && !isCode)
      ) {
        skipped.push(name);

        continue;
      }

      seen.add(name);

      entries.push({
        section: section.id,
        name,
        displayName,
        url: item.url,
        icon: item.icon,
        enhanced: typeof item.enhanced === "boolean" ? item.enhanced : undefined,
        visible: item.visible !== false,
        isCode,
      });
    }
  }

  if (entries.length === 0) return { error: "import.err.empty" };

  const tombstones = [];

  if (Array.isArray(raw.deletedServices)) {
    raw.deletedServices.slice(0, IMPORT_MAX_SERVICES).forEach((name) => {
      if (importIsSafeName(name) && !tombstones.includes(name)) {
        tombstones.push(name);
      }
    });
  }

  return {
    entries,
    skipped,
    tombstones,
    date: typeof raw.exportedAt === "string" ? raw.exportedAt.slice(0, 10) : "",
  };
}

/* Services currently shown on the page (defined and not deleted). */
function importKeepEnhanced(name) {
  const prev = hasOwnKey(editedServices, name) ? editedServices[name] : null;

  return prev && typeof prev.enhanced === "boolean"
    ? { enhanced: prev.enhanced }
    : {};
}

function importLocalServices() {
  const defined = getAllDefinedServices();

  const tomb = new Set(deletedServices);

  const present = {};

  Object.keys(defined).forEach((name) => {
    if (!tomb.has(name)) present[name] = defined[name];
  });

  return { defined, present, tomb };
}

function planImportMerge(parsed) {
  const { defined, present, tomb } = importLocalServices();

  const urls = new Map();

  Object.keys(present).forEach((name) => {
    if (importParseUrl(present[name].url)) {
      urls.set(importNormalizeUrl(present[name].url), name);
    }
  });

  const plan = {
    add: [],
    present: [],
    conflicts: [],
    deletedHere: [],
    duplicates: [],
    iconChecks: [],
  };

  parsed.entries.forEach((entry) => {
    if (tomb.has(entry.name)) {
      plan.deletedHere.push(entry);

      return;
    }

    if (hasOwnKey(defined, entry.name)) {
      const current = defined[entry.name];

      const currentLabel = current.displayName || current.name;

      const same =
        currentLabel === entry.displayName &&
        importNormalizeUrl(current.url) === importNormalizeUrl(entry.url);

      if (same) {
        plan.present.push(entry);

        if (current.icon !== entry.icon) {
          plan.iconChecks.push({
            entry,
            currentLabel,
            currentUrl: current.url,
            currentIcon: current.icon,
          });
        }
      } else {
        plan.conflicts.push({
          entry,
          current: {
            displayName: currentLabel,
            url: current.url,
            icon: current.icon,
          },
        });
      }

      return;
    }

    /* Only real addresses are compared: placeholders ("#") are not. */
    const key = importParseUrl(entry.url) ? importNormalizeUrl(entry.url) : null;

    if (key && urls.has(key)) {
      plan.duplicates.push(entry);

      return;
    }

    if (key) urls.set(key, entry.name);

    plan.add.push(entry);
  });

  return plan;
}

function planImportReplace(parsed) {
  const { present } = importLocalServices();

  const fileNames = new Set(parsed.entries.map((entry) => entry.name));

  const removed = Object.keys(present).filter((name) => !fileNames.has(name));

  const added = parsed.entries.filter((entry) => !hasOwnKey(present, entry.name));

  const codeAbsent = [...getCodeServiceNames()].filter(
    (name) => !fileNames.has(name),
  );

  const tombstones = [
    ...new Set([
      ...parsed.tombstones.filter((name) => !fileNames.has(name)),
      ...codeAbsent,
    ]),
  ];

  return { total: parsed.entries.length, removed, added, tombstones };
}

/* Copy of the current data, confirmed before anything is changed. */
async function backupBeforeImport(mode) {
  const previous = await readIdbKey(IMPORT_BACKUP_KEY);

  const list = Array.isArray(previous) ? previous : [];

  list.push({
    date: new Date().toISOString(),
    mode,
    state: structuredClone({
      visibility: dashboardState.visibility,
      order: dashboardState.order,
      sections: dashboardState.sections,
      customServices: dashboardState.customServices,
    }),
    deleted: structuredClone(deletedServices),
    edited: structuredClone(editedServices),
  });

  await writeIdbKeyConfirmed(IMPORT_BACKUP_KEY, list.slice(-IMPORT_BACKUP_LIMIT));
}

async function persistAfterImport() {
  normalizeDashboardState();

  await writeIdbKeyConfirmed(INDEXED_DB_STATE_KEY, structuredClone(dashboardState));

  await writeIdbKeyConfirmed(INDEXED_DB_DELETED_KEY, structuredClone(deletedServices));

  await writeIdbKeyConfirmed(INDEXED_DB_EDITED_KEY, structuredClone(editedServices));

  deletionLog = [];

  rerenderAllServices();
}

function importIconLoads(source) {
  return new Promise((resolve) => {
    let finished = false;

    const finish = (value) => {
      if (!finished) {
        finished = true;

        resolve(value);
      }
    };

    const image = new Image();

    image.onload = () => finish(true);

    image.onerror = () => finish(false);

    setTimeout(() => finish(false), 4000);

    image.src = source;
  });
}

async function applyImportMerge(plan, acceptedConflicts) {
  await backupBeforeImport("merge");

  if (!dashboardState.customServices) dashboardState.customServices = {};

  plan.add.forEach((entry) => {
    dashboardState.customServices[entry.name] = {
      name: entry.name,
      url: entry.url,
      icon: entry.icon,
      ...(entry.enhanced ? { enhanced: true } : {}),
    };

    if (entry.displayName !== entry.name) {
      editedServices[entry.name] = {
        name: entry.displayName,
        url: entry.url,
        icon: entry.icon,
      ...importKeepEnhanced(entry.name),
      };
    }

    dashboardState.sections[entry.name] = entry.section;

    dashboardState.order[entry.section] = [
      ...(dashboardState.order[entry.section] || []),
      entry.name,
    ];

    dashboardState.visibility[entry.name] = entry.visible;
  });

  acceptedConflicts.forEach(({ entry }) => {
    editedServices[entry.name] = {
      name: entry.displayName,
      url: entry.url,
      icon: entry.icon,
      ...importKeepEnhanced(entry.name),
    };
  });

  /* Same service, different icon: keeps the current one unless it does
     not load and the one in the file does. */
  let iconsUpdated = 0;

  const checks = await Promise.all(
    plan.iconChecks.map(async (check) => {
      const currentWorks = await importIconLoads(check.currentIcon);

      if (currentWorks) return false;

      return importIconLoads(check.entry.icon);
    }),
  );

  plan.iconChecks.forEach((check, index) => {
    if (!checks[index]) return;

    editedServices[check.entry.name] = {
      name: check.currentLabel,
      url: check.currentUrl,
      icon: check.entry.icon,
      ...importKeepEnhanced(check.entry.name),
    };

    iconsUpdated++;
  });

  await persistAfterImport();

  return {
    added: plan.add.length,
    updated: acceptedConflicts.length,
    icons: iconsUpdated,
  };
}

async function applyImportReplace(parsed, plan) {
  await backupBeforeImport("replace");

  const codeDefaults = {};

  Object.values(services).forEach((list) => {
    list.forEach((service) => {
      if (!hasOwnKey(codeDefaults, service.name)) {
        codeDefaults[service.name] = service;
      }
    });
  });

  const state = { visibility: {}, order: {}, sections: {}, customServices: {} };

  Object.keys(services).forEach((sectionName) => {
    state.order[sectionName] = [];
  });

  const edited = {};

  parsed.entries.forEach((entry) => {
    state.order[entry.section].push(entry.name);

    state.sections[entry.name] = entry.section;

    state.visibility[entry.name] = entry.visible;

    if (entry.isCode) {
      const base = codeDefaults[entry.name];

      const enhancedChanged =
        typeof entry.enhanced === "boolean" &&
        entry.enhanced !== (base.enhanced === true);

      if (
        entry.displayName !== base.name ||
        entry.url !== base.url ||
        entry.icon !== base.icon ||
        enhancedChanged
      ) {
        edited[entry.name] = {
          name: entry.displayName,
          url: entry.url,
          icon: entry.icon,
          ...(enhancedChanged ? { enhanced: entry.enhanced } : {}),
        };
      }
    } else {
      state.customServices[entry.name] = {
        name: entry.name,
        url: entry.url,
        icon: entry.icon,
        ...(entry.enhanced ? { enhanced: true } : {}),
      };

      if (entry.displayName !== entry.name) {
        edited[entry.name] = {
          name: entry.displayName,
          url: entry.url,
          icon: entry.icon,
        };
      }
    }
  });

  dashboardState.visibility = state.visibility;

  dashboardState.order = state.order;

  dashboardState.sections = state.sections;

  dashboardState.customServices = state.customServices;

  editedServices = edited;

  deletedServices = [...plan.tombstones];

  await persistAfterImport();

  return {
    total: plan.total,
    removed: plan.removed.length,
    added: plan.added.length,
  };
}

/* ---- dialog ---- */

let importDialogReady = false;

let importParsed = null;

let importMergePlan = null;

let importAwaitingReplace = false;

let importBusy = false;

function importEl(id) {
  return document.getElementById(id);
}

function importLine(text, className) {
  const line = document.createElement("div");

  if (className) line.className = className;

  line.textContent = text;

  return line;
}

function importMode() {
  const checked = document.querySelector('input[name="import-mode"]:checked');

  return checked ? checked.value : "merge";
}

function importList(names) {
  const shown = names.slice(0, 8).join(", ");

  return names.length > 8 ? `${shown} … (+${names.length - 8})` : shown;
}

function importSetError(key, values) {
  importEl("import-error").textContent = key ? t(key, values) : "";
}

function importResetReport() {
  importEl("import-report").textContent = "";

  importEl("import-conflicts").textContent = "";

  importEl("import-conflicts").classList.remove("active");

  importEl("import-done").hidden = true;

  importEl("import-confirm").hidden = false;

  importEl("import-confirm").disabled = true;

  importEl("import-confirm").textContent = t("import.confirm");

  importAwaitingReplace = false;
}

function renderImportReport() {
  importResetReport();

  importSetError("");

  if (!importParsed) return;

  const report = importEl("import-report");

  report.appendChild(
    importLine(
      t("import.file.info", {
        count: importParsed.entries.length,
        deleted: importParsed.tombstones.length,
        date: importParsed.date || "?",
      }),
    ),
  );

  if (importMode() === "merge") {
    const plan = importMergePlan;

    report.appendChild(importLine(t("import.plan.add", { n: plan.add.length })));

    report.appendChild(importLine(t("import.plan.present", { n: plan.present.length })));

    if (plan.deletedHere.length) {
      report.appendChild(
        importLine(t("import.plan.deletedHere", { n: plan.deletedHere.length })),
      );
    }

    if (plan.duplicates.length) {
      report.appendChild(
        importLine(t("import.plan.duplicates", { n: plan.duplicates.length })),
      );
    }

    if (importParsed.skipped.length) {
      report.appendChild(
        importLine(
          t("import.plan.skipped", {
            n: importParsed.skipped.length,
            names: importList(importParsed.skipped),
          }),
        ),
      );
    }

    if (plan.conflicts.length) {
      report.appendChild(
        importLine(t("import.plan.conflicts", { n: plan.conflicts.length })),
      );

      const box = importEl("import-conflicts");

      box.classList.add("active");

      plan.conflicts.forEach((conflict, index) => {
        const row = document.createElement("label");

        row.className = "import-conflict";

        const check = document.createElement("input");

        check.type = "checkbox";

        check.dataset.index = String(index);

        row.appendChild(check);

        const body = document.createElement("span");

        body.appendChild(importLine(conflict.entry.name, "import-conflict-name"));

        body.appendChild(
          importLine(
            `${t("import.conflict.current")}: ${conflict.current.displayName} · ${conflict.current.url}`,
          ),
        );

        body.appendChild(
          importLine(
            `${t("import.conflict.file")}: ${conflict.entry.displayName} · ${conflict.entry.url}`,
          ),
        );

        row.appendChild(body);

        box.appendChild(row);
      });
    }

    const nothing =
      plan.add.length === 0 &&
      plan.conflicts.length === 0 &&
      plan.iconChecks.length === 0;

    if (nothing) {
      report.appendChild(importLine(t("import.plan.nothing")));
    }

    importEl("import-confirm").disabled = nothing;

    return;
  }

  const plan = planImportReplace(importParsed);

  report.appendChild(
    importLine(
      t("import.replace.counts", {
        total: plan.total,
        removed: plan.removed.length,
        added: plan.added.length,
        deleted: plan.tombstones.length,
      }),
    ),
  );

  if (importParsed.skipped.length) {
    report.appendChild(
      importLine(
        t("import.plan.skipped", {
          n: importParsed.skipped.length,
          names: importList(importParsed.skipped),
        }),
      ),
    );
  }

  importEl("import-confirm").disabled = false;
}

function resetImportDialog() {
  importParsed = null;

  importMergePlan = null;

  importBusy = false;

  importEl("import-file-input").value = "";

  const fileName = importEl("import-file-name");

  fileName.textContent = t("import.noFile");

  document.querySelector('input[name="import-mode"][value="merge"]').checked = true;

  importEl("import-info").classList.remove("active");

  importEl("import-info-button").setAttribute("aria-expanded", "false");

  importResetReport();

  importSetError("");
}

function closeImportDialog() {
  const overlay = importEl("import-overlay");

  if (!overlay) return;

  overlay.classList.remove("active");

  window.parent.postMessage({ type: "add-service-modal", open: false }, "*");
}

async function handleImportFile(file) {
  importDisarmUndo();

  importParsed = null;

  importMergePlan = null;

  importResetReport();

  importSetError("");

  if (!file) {
    importEl("import-file-name").textContent = t("import.noFile");

    return;
  }

  importEl("import-file-name").textContent = file.name.slice(0, 80);

  if (file.size > IMPORT_MAX_BYTES) {
    importSetError("import.err.big");

    return;
  }

  let text;

  try {
    text = await file.text();
  } catch {
    importSetError("import.err.read");

    return;
  }

  const parsed = parseImportFile(text);

  if (parsed.error) {
    importSetError(parsed.error, parsed.values);

    return;
  }

  importParsed = parsed;

  importMergePlan = planImportMerge(parsed);

  renderImportReport();
}

async function runImport() {
  if (!importParsed || importBusy || editMode) return;

  if (importMode() === "replace" && !importAwaitingReplace) {
    importAwaitingReplace = true;

    importEl("import-confirm").textContent = t("import.confirmReplace");

    importSetError("import.replace.warning");

    return;
  }

  importBusy = true;

  importEl("import-confirm").disabled = true;

  try {
    const report = importEl("import-report");

    let message;

    if (importMode() === "merge") {
      const accepted = [];

      importEl("import-conflicts")
        .querySelectorAll("input:checked")
        .forEach((check) => {
          const conflict = importMergePlan.conflicts[Number(check.dataset.index)];

          if (conflict) accepted.push(conflict);
        });

      const result = await applyImportMerge(importMergePlan, accepted);

      message = t("import.result.merge", {
        added: result.added,
        updated: result.updated,
        icons: result.icons,
      });
    } else {
      const plan = planImportReplace(importParsed);

      const result = await applyImportReplace(importParsed, plan);

      message = t("import.result.replace", {
        total: result.total,
        removed: result.removed,
        added: result.added,
      });
    }

    importResetReport();

    importSetError("");

    importEl("import-confirm").hidden = true;

    importEl("import-conflicts").classList.remove("active");

    report.textContent = "";

    report.appendChild(importLine(message));

    importEl("import-done").hidden = false;

    importParsed = null;

    refreshImportUndo();
  } catch (error) {
    console.error("Import failed:", error);

    importSetError("import.err.apply");

    importEl("import-confirm").disabled = false;
  } finally {
    importBusy = false;
  }
}

/* ---- undo the last import ---- */

let importUndoArmed = false;

function importUndoEntryValid(entry) {
  return (
    !!entry &&
    typeof entry === "object" &&
    !!entry.state &&
    typeof entry.state === "object" &&
    ["visibility", "order", "sections", "customServices"].every(
      (key) =>
        entry.state[key] &&
        typeof entry.state[key] === "object" &&
        !Array.isArray(entry.state[key]),
    ) &&
    Array.isArray(entry.deleted) &&
    !!entry.edited &&
    typeof entry.edited === "object" &&
    !Array.isArray(entry.edited)
  );
}

async function importLastBackup() {
  try {
    const list = await readIdbKey(IMPORT_BACKUP_KEY);

    const entry = Array.isArray(list) && list.length ? list[list.length - 1] : null;

    return importUndoEntryValid(entry) ? entry : null;
  } catch {
    return null;
  }
}

function importDisarmUndo() {
  importUndoArmed = false;

  const button = importEl("import-undo-button");

  if (button) button.textContent = t("import.undo.button");
}

async function refreshImportUndo() {
  const box = importEl("import-undo");

  if (!box) return;

  importDisarmUndo();

  const entry = await importLastBackup();

  if (!entry) {
    box.hidden = true;

    return;
  }

  const when = new Date(entry.date);

  const actionKey = ["merge", "replace", "undo"].includes(entry.mode)
    ? `import.undo.action.${entry.mode}`
    : "import.undo.action.merge";

  importEl("import-undo-info").textContent = t("import.undo.info", {
    when: Number.isNaN(when.getTime()) ? "?" : when.toLocaleString(),
    action: t(actionKey),
    n: Object.keys(entry.state.visibility).length,
  });

  box.hidden = false;
}

async function runImportUndo() {
  if (importBusy || editMode) return;

  const entry = await importLastBackup();

  if (!entry) {
    importSetError("import.err.undo");

    return;
  }

  if (!importUndoArmed) {
    importUndoArmed = true;

    importEl("import-undo-button").textContent = t("import.undo.confirm");

    importSetError("import.undo.warning");

    return;
  }

  importBusy = true;

  importEl("import-undo-button").disabled = true;

  try {
    /* The data being replaced are saved first, so this step can be undone too. */
    await backupBeforeImport("undo");

    dashboardState.visibility = structuredClone(entry.state.visibility);

    dashboardState.order = structuredClone(entry.state.order);

    dashboardState.sections = structuredClone(entry.state.sections);

    dashboardState.customServices = structuredClone(entry.state.customServices);

    editedServices = structuredClone(entry.edited);

    deletedServices = structuredClone(entry.deleted);

    await persistAfterImport();

    importResetReport();

    importSetError("");

    importParsed = null;

    importMergePlan = null;

    importEl("import-confirm").hidden = true;

    importEl("import-report").appendChild(
      importLine(
        t("import.undo.done", { n: Object.keys(entry.state.visibility).length }),
      ),
    );

    importEl("import-done").hidden = false;

    importEl("import-undo").hidden = true;
  } catch (error) {
    console.error("Undo failed:", error);

    importSetError("import.err.undo");
  } finally {
    importBusy = false;

    importEl("import-undo-button").disabled = false;
  }
}

function createImportDialog() {
  if (importDialogReady) return;

  const overlay = document.createElement("div");

  overlay.className = "add-service-overlay";

  overlay.id = "import-overlay";

  overlay.innerHTML = `
    <div class="add-service-dialog import-dialog" role="dialog" aria-modal="true" aria-labelledby="import-title">

      <button type="button" class="add-service-close" id="import-close" data-i18n-aria-label="add.close" aria-label="${t("add.close")}">×</button>

      <div class="add-service-title" id="import-title" data-i18n="import.title">${t("import.title")}</div>

      <div class="add-service-field">
        <span data-i18n="import.file">${t("import.file")}</span>
        <div class="import-file-row">
          <button type="button" class="import-file-button" id="import-file-button" data-i18n="import.choose">${t("import.choose")}</button>
          <span class="import-file-name" id="import-file-name">${t("import.noFile")}</span>
        </div>
        <input type="file" id="import-file-input" accept=".json,application/json" hidden>
      </div>

      <div class="add-service-field">
        <span class="add-service-label-row">
          <span data-i18n="import.mode">${t("import.mode")}</span>
          <button type="button" class="add-service-info-button" id="import-info-button" data-i18n-aria-label="import.modeInfo" aria-label="${t("import.modeInfo")}" aria-expanded="false">?</button>
        </span>
        <div class="import-modes">
          <label class="import-mode"><input type="radio" name="import-mode" value="merge" checked><span data-i18n="import.merge">${t("import.merge")}</span></label>
          <label class="import-mode"><input type="radio" name="import-mode" value="replace"><span data-i18n="import.replace">${t("import.replace")}</span></label>
        </div>
      </div>

      <div class="import-info" id="import-info" role="note">
        <div><strong data-i18n="import.merge">${t("import.merge")}</strong>: <span data-i18n="import.info.merge">${t("import.info.merge")}</span><div class="import-info-note" data-i18n="import.info.merge.note">${t("import.info.merge.note")}</div></div>
        <div><strong data-i18n="import.replace">${t("import.replace")}</strong>: <span data-i18n="import.info.replace">${t("import.info.replace")}</span><div class="import-info-note" data-i18n="import.info.replace.note">${t("import.info.replace.note")}</div></div>
      </div>

      <div class="import-report" id="import-report"></div>

      <div class="import-conflicts" id="import-conflicts"></div>

      <div class="add-service-error" id="import-error"></div>

      <div class="import-undo" id="import-undo" hidden>
        <div class="import-undo-info" id="import-undo-info"></div>
        <button type="button" class="import-undo-button" id="import-undo-button" data-i18n="import.undo.button">${t("import.undo.button")}</button>
      </div>

      <div class="add-service-actions">
        <button type="button" class="add-service-cancel" id="import-cancel" data-i18n="field.cancel">${t("field.cancel")}</button>
        <button type="button" class="add-service-confirm" id="import-confirm" data-i18n="import.confirm" disabled>${t("import.confirm")}</button>
        <button type="button" class="add-service-confirm" id="import-done" data-i18n="import.close" hidden>${t("import.close")}</button>
      </div>

    </div>
  `;

  document.body.appendChild(overlay);

  importEl("import-close").addEventListener("click", closeImportDialog);

  importEl("import-cancel").addEventListener("click", closeImportDialog);

  importEl("import-done").addEventListener("click", closeImportDialog);

  importEl("import-file-button").addEventListener("click", () => {
    importEl("import-file-input").click();
  });

  importEl("import-file-input").addEventListener("change", (event) => {
    handleImportFile(event.target.files && event.target.files[0]);
  });

  document.querySelectorAll('input[name="import-mode"]').forEach((radio) => {
    radio.addEventListener("change", () => {
      importDisarmUndo();

      if (importParsed) renderImportReport();
    });
  });

  importEl("import-confirm").addEventListener("click", runImport);

  importEl("import-undo-button").addEventListener("click", runImportUndo);

  const infoButton = importEl("import-info-button");

  const info = importEl("import-info");

  infoButton.addEventListener("click", (event) => {
    event.stopPropagation();

    const active = info.classList.toggle("active");

    infoButton.setAttribute("aria-expanded", String(active));
  });

  importDialogReady = true;
}

function openImportDialog() {
  if (editMode) return;

  createImportDialog();

  resetImportDialog();

  importEl("import-undo").hidden = true;

  refreshImportUndo();

  window.parent.postMessage({ type: "add-service-modal", open: true }, "*");

  importEl("import-overlay").classList.add("active");
}

const settingsImportZone = document.querySelector("#settings-import-zone");

if (settingsImportZone) {
  settingsImportZone.addEventListener("click", (event) => {
    event.preventDefault();

    event.stopPropagation();

    openImportDialog();
  });
}

/* =========================
   SETTINGS ITEM / FIX CLICK
========================= */

if (settingsMainZone) {
  settingsMainZone.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();

    /* In edit mode the item is FIX → confirm. */
    if (editMode) {
      openConfirmDialog();
      return;
    }

    if (settingsCard && settingsCard.classList.contains("open")) {
      closeSettingsCard();
    } else {
      openSettingsCard();
    }
  });
}

/* =========================
   CLOSE MENU ON EMPTY-SPACE CLICK
========================= */

document.addEventListener("click", (event) => {
  /*
       Works only when the menu is open
       and we are not in edit mode.
    */

  if (!settingsMenuOpen || editMode) {
    return;
  }

  /*
       Clicks on the settings zones
       are handled by their own listeners.
    */

  if (settingsButton && settingsButton.contains(event.target)) {
    return;
  }

      /*
       A click inside the settings panel
       must not close the menu.
    */

    if (
      settingsCard &&
      settingsCard.contains(event.target)
    ) {

      return;

    }

  /*
        Do not close when clicking interactive elements.
    */

  if (
    event.target.closest(
      ".service, .custom-scrollbar, .visibility-toggle, " +
        ".confirm-overlay, .confirm-dialog",
    )
  ) {
    return;
  }

  if (!settingsButton) return;

  const rect = settingsButton.getBoundingClientRect();

  /*
       Distance of the empty space around
       the gear.
    */

  const margin = 150;

  const isNearSettings =
    event.clientX >= rect.left - margin &&
    event.clientX <= rect.right + margin &&
    event.clientY >= rect.top - margin &&
    event.clientY <= rect.bottom + margin;

  if (!isNearSettings) {
    return;
  }

  closeSettingsMenu();
});

/* =========================
   CANCEL (DISCARD CHANGES)
========================= */

if (confirmCancel) {
  confirmCancel.addEventListener("click", () => {
    /*
         Restores EXACTLY the state
         that existed before entering
         EDIT mode.

         Saves nothing to Local Storage.
      */

    undoSessionDeletions();

      restoreEditSnapshot();

    closeConfirmDialog();

    editMode = false;

    updateEditMode();

    setTimeout(() => {
      closeSettingsMenu();
    }, 150);

    editSnapshot = null;
  });
}

/* =========================
  CONFIRM END OF EDITING
========================= */

if (confirmAccept) {
  confirmAccept.addEventListener("click", () => {
    /*
         Only CONFIRM makes
         the changes permanent.
      */

    saveCurrentState();

    deletionLog = [];


    closeConfirmDialog();

    editMode = false;

    updateEditMode();

    setTimeout(() => {
      closeSettingsMenu();
    }, 150);

    editSnapshot = null;
  });
}

/* =========================
   CLICK OUTSIDE THE DIALOG
========================= */

if (confirmOverlay) {
  confirmOverlay.addEventListener("click", (event) => {
    if (event.target === confirmOverlay) {
      /*
           Closes the dialog only.

           Temporary changes remain
           in place and can be confirmed
           or cancelled later.
        */

      closeConfirmDialog();
    }
  });
}

/* =========================
   AUTO-SCROLL DRAG
========================= */

function startDragAutoScroll(container) {
  if (dragAutoScrollFrame) {
    return;
  }

  const edge = 65;

  function step() {
    if (!editMode || !draggedItem) {
      stopDragAutoScroll();

      return;
    }

    const rect = container.getBoundingClientRect();

    let speed = 0;

    if (dragCurrentY < rect.top + edge) {
      const distance = rect.top + edge - dragCurrentY;

      speed = -Math.min(12, Math.max(1.5, distance / 5));
    } else if (dragCurrentY > rect.bottom - edge) {
      const distance = dragCurrentY - (rect.bottom - edge);

      speed = Math.min(12, Math.max(1.5, distance / 5));
    }

    if (speed !== 0) {
      container.scrollTop += speed;
    }

    dragAutoScrollFrame = requestAnimationFrame(step);
  }

  dragAutoScrollFrame = requestAnimationFrame(step);
}

function stopDragAutoScroll() {
  if (dragAutoScrollFrame) {
    cancelAnimationFrame(dragAutoScrollFrame);
  }

  dragAutoScrollFrame = null;
}

/* =========================
   CARD ORDERING
========================= */

function updateDraggableState() {
  document.querySelectorAll(".service-wrapper").forEach((item) => {
    item.draggable = editMode;
  });
}

document.querySelectorAll(".services").forEach((container) => {
  /* =========================
         DRAG START
      ========================= */

  container.addEventListener("dragstart", (event) => {
    if (!editMode) {
      event.preventDefault();

      return;
    }

    const item = event.target.closest(".service-wrapper");

    if (!item) return;

    draggedItem = item;

    dragCurrentY = event.clientY;

    /*
             Creates a copy of the real card
             as the drag preview.
          */

    dragPreview = item.cloneNode(true);

    const itemRect = item.getBoundingClientRect();

    dragPreview.style.position = "fixed";

    dragPreview.style.left = "-10000px";

    dragPreview.style.top = "-10000px";

    dragPreview.style.width = `${itemRect.width}px`;

    dragPreview.style.height = `${itemRect.height}px`;

    dragPreview.style.margin = "0";

    dragPreview.style.opacity = ".45";

    dragPreview.style.pointerEvents = "none";

    dragPreview.style.transform = "none";

    dragPreview.style.transition = "none";

    document.body.appendChild(dragPreview);

    item.classList.add("dragging");

    event.dataTransfer.setDragImage(
      dragPreview,
      event.clientX - itemRect.left,
      event.clientY - itemRect.top,
    );

    event.dataTransfer.effectAllowed = "move";
  });

  /* =========================
         DRAG END
      ========================= */

  container.addEventListener("dragend", (event) => {
    const item = event.target.closest(".service-wrapper");

    if (item) {
      item.classList.remove("dragging");
    }

    if (dragPreview) {
      dragPreview.remove();

      dragPreview = null;
    }

    draggedItem = null;

    stopDragAutoScroll();
  });

  /* =========================
         DRAG MOVEMENT
      ========================= */

  container.addEventListener("dragover", (event) => {
    if (!editMode || !draggedItem) {
      return;
    }

    event.preventDefault();

    dragCurrentY = event.clientY;

    const afterElement = getDragAfterElement(container, event.clientY);

    if (afterElement == null) {
      const addWrapper = container.querySelector(".add-service-wrapper");

      if (addWrapper) {
        container.insertBefore(draggedItem, addWrapper);
      } else {
        container.appendChild(draggedItem);
      }
    } else {
      container.insertBefore(draggedItem, afterElement);
    }

    startDragAutoScroll(container);
  });
});

/* =========================
   DRAG PREVIEW CLEANUP
========================= */

document.addEventListener("dragend", () => {
  if (dragPreview) {
    dragPreview.remove();

    dragPreview = null;
  }

  draggedItem = null;

  stopDragAutoScroll();
});

/* =========================
   DRAG POSITION CALCULATION
========================= */

function getDragAfterElement(container, mouseY) {
  const items = [
    ...container.querySelectorAll(".service-wrapper:not(.dragging)"),
  ];

  let closest = {
    offset: Number.NEGATIVE_INFINITY,

    element: null,
  };

  items.forEach((item) => {
    const box = item.getBoundingClientRect();

    const offset = mouseY - box.top - box.height / 2;

    if (offset < 0 && offset > closest.offset) {
      closest = {
        offset,

        element: item,
      };
    }
  });

  return closest.element;
}

/* =========================
   CUSTOM SCROLLBAR
========================= */

function createCustomScrollbar(container) {
  const wrapper = document.createElement("div");

  wrapper.className = "services-wrapper";

  const scrollbar = document.createElement("div");

  scrollbar.className = "custom-scrollbar";

  const thumb = document.createElement("div");

  thumb.className = "custom-scrollbar-thumb";

  scrollbar.appendChild(thumb);

  container.parentNode.insertBefore(wrapper, container);

  wrapper.appendChild(container);

  wrapper.appendChild(scrollbar);

  /* =========================
     UPDATE SCROLLBAR
  ========================= */

  function updateScrollbar() {
    const visibleHeight = container.clientHeight;

    const totalHeight = container.scrollHeight;

    if (totalHeight <= visibleHeight + 1) {
      scrollbar.classList.remove("active");

      return;
    }

    scrollbar.classList.add("active");

    const trackHeight = scrollbar.clientHeight;

    const thumbHeight = Math.max(
      35,
      (visibleHeight / totalHeight) * trackHeight,
    );

    const maxScroll = totalHeight - visibleHeight;

    const maxThumbPosition = trackHeight - thumbHeight;

    const scrollRatio = maxScroll > 0 ? container.scrollTop / maxScroll : 0;

    const thumbPosition = scrollRatio * maxThumbPosition;

    thumb.style.height = `${thumbHeight}px`;

    thumb.style.transform = `translateY(${thumbPosition}px)`;
  }

  /* =========================
     MOUSE WHEEL SCROLL
  ========================= */

  container.addEventListener("scroll", updateScrollbar);

  /* =========================
     SCROLLBAR DRAG
  ========================= */

  let dragging = false;

  let startY = 0;

  let startScrollTop = 0;

  scrollbar.addEventListener("pointerdown", (event) => {
    if (!scrollbar.classList.contains("active")) {
      return;
    }

    dragging = true;

    startY = event.clientY;

    startScrollTop = container.scrollTop;

    wrapper.classList.add("scrollbar-dragging");

    scrollbar.setPointerCapture(event.pointerId);

    event.preventDefault();
  });

  scrollbar.addEventListener("pointermove", (event) => {
    if (!dragging) return;

    const trackHeight = scrollbar.clientHeight;

    const thumbHeight = thumb.offsetHeight;

    const maxThumbMovement = trackHeight - thumbHeight;

    const maxScroll = container.scrollHeight - container.clientHeight;

    if (maxThumbMovement <= 0 || maxScroll <= 0) {
      return;
    }

    const deltaY = event.clientY - startY;

    const scrollDelta = (deltaY / maxThumbMovement) * maxScroll;

    container.scrollTop = Math.max(
      0,
      Math.min(maxScroll, startScrollTop + scrollDelta),
    );
  });

  function stopDragging(event) {
    if (!dragging) return;

    dragging = false;

    wrapper.classList.remove("scrollbar-dragging");

    if (event && scrollbar.hasPointerCapture(event.pointerId)) {
      scrollbar.releasePointerCapture(event.pointerId);
    }
  }

  scrollbar.addEventListener("pointerup", stopDragging);

  scrollbar.addEventListener("pointercancel", stopDragging);

  /* =========================
     RESIZE
  ========================= */

  const resizeObserver = new ResizeObserver(() => {
    updateScrollbar();
  });

  resizeObserver.observe(container);

  resizeObserver.observe(wrapper);

  /* Rendering or removing services does not change the size of the container,
     so content changes are watched explicitly. */

  new MutationObserver(updateScrollbar).observe(container, { childList: true });

  window.addEventListener("resize", updateScrollbar);

  requestAnimationFrame(updateScrollbar);
}

/* =========================
   SCROLLBAR INITIALIZATION
========================= */

document.querySelectorAll(".services").forEach((container) => {
  createCustomScrollbar(container);
});


/* =========================
   FULLSCREEN LIST HEIGHTS
========================= */

function updateFullscreenServiceHeights() {

  const isFullscreen =
    document.body.classList.contains(
      "browser-fullscreen"
    );

  const containers =
    document.querySelectorAll(
      ".services-category .services, .ecommerce .services, .streaming .services"
    );

  containers.forEach((container) => {

    if (!isFullscreen) {

      container.style.height = "";

      return;
    }

    const firstWrapper =
      container.querySelector(
        ".service-wrapper"
      );

    if (!firstWrapper) {
      return;
    }

    /*
       Actual height of a single
       card unit + inner spacing
       of the wrapper.
    */

    const wrapperHeight =
      firstWrapper.getBoundingClientRect().height;

    const computedStyle =
      window.getComputedStyle(
        container
      );

    const gap =
      parseFloat(
        computedStyle.rowGap ||
        computedStyle.gap ||
        "0"
      );

    const itemHeight =
      wrapperHeight + gap;

    if (itemHeight <= 0) {
      return;
    }

    /*
       Page 2 must show
       exactly 7 complete cards.
    */

    const visibleCards = 7;

    container.style.height =
      `${(itemHeight * visibleCards) - gap}px`;
  });
}


/* =========================
   FULLSCREEN DETECTION
========================= */

let previousFullscreenState =
  false;


function refreshAllScrollbars() {

  document
    .querySelectorAll(".services")
    .forEach((container) => {

      container.dispatchEvent(
        new Event("scroll")
      );

    });
}


function updateBrowserFullscreenState() {

  // The screen.height check can fail when served over http (e.g. Live Server):
  // display-mode: fullscreen is a second, independent signal.

  const isBrowserFullscreen =
    document.fullscreenElement !== null ||
    window.matchMedia("(display-mode: fullscreen)").matches ||
    window.innerHeight >= screen.height - 2;

  const isFullscreen =
    window.innerWidth >= 1001 &&
    isBrowserFullscreen;

  document.body.classList.toggle(
    "browser-fullscreen",
    isFullscreen
  );

  updateFullscreenServiceHeights();

  if (
    previousFullscreenState &&
    !isFullscreen
  ) {

    document
      .querySelectorAll(".services")
      .forEach((container) => {

        container.scrollTop = 0;

      });
  }

  previousFullscreenState =
    isFullscreen;

  requestAnimationFrame(() => {

    updateFullscreenServiceHeights();

    refreshAllScrollbars();

  });
}


window.addEventListener(
  "resize",
  updateBrowserFullscreenState
);


window.addEventListener(
  "orientationchange",
  updateBrowserFullscreenState
);


document.addEventListener(
  "fullscreenchange",
  updateBrowserFullscreenState
);


window
  .matchMedia("(display-mode: fullscreen)")
  .addEventListener(
    "change",
    updateBrowserFullscreenState
  );


updateBrowserFullscreenState();


/* =========================
   INITIAL STATE
========================= */

updateEditMode();

/* =========================
   INDEXEDDB INITIALIZATION
========================= */

(async () => {
  try {
    await initializeDashboardStorage();

    document.querySelectorAll(".services").forEach((container) => {
      container.innerHTML = "";
    });

    renderServices("services");

    renderServices("ecommerce");

    renderServices("streaming");

    updateEditMode();

    requestAnimationFrame(() => {
      updateFullscreenServiceHeights();

      refreshAllScrollbars();
    });

    await cleanupOrphanedData();

  } catch (error) {
    console.error("IndexedDB error:", error);
  }
})();


const settingsLangZone = document.getElementById("settings-lang-zone");
const settingsLangCode = document.getElementById("settings-lang-code");
const settingsLangFlag = document.getElementById("settings-lang-flag");

function refreshLanguageTexts() {

  refreshServiceLabels();

  /* Texts managed by JavaScript (not by data-i18n). */

  if (settingsText) {
    settingsText.textContent = editMode ? t("settings.fix") : t("settings.title");
  }

  if (settingsLangCode && window.I18N) {
    settingsLangCode.textContent = window.I18N.getLanguageCode(window.I18N.getLanguage());
  }

  /* Flag of the current language (inline SVG from the dictionary: also works on Windows,
     where flag emoji are not rendered). */
  if (settingsLangFlag) {
    settingsLangFlag.innerHTML = t("lang.flag");
  }

  document.querySelectorAll(".service-wrapper").forEach(wrapper => {
    updateVisibilityButton(wrapper);
  });

  if (creditsVersion) {
    creditsVersion.textContent = `${t("credits.version")} ${PROJECT_VERSION}`;
  }

}

if (window.I18N) {
  window.I18N.onChange(refreshLanguageTexts);
}

if (settingsLangZone) {
  settingsLangZone.addEventListener("click", event => {

    event.preventDefault();

    event.stopPropagation();

    if (!window.I18N) return;

    const languages = window.I18N.getAvailableLanguages();

    if (languages.length < 2) return;

    const next =
      languages[
        (languages.indexOf(window.I18N.getLanguage()) + 1) % languages.length
      ];

    window.I18N.setLanguage(next);

  });
}


const STORAGE_NERD_STATS = "nerdStatsEnabled_page2";
const NERD_STATS_URL = "http://127.0.0.1:8765/stats";
const NERD_STATS_INTERVAL_MS = 1000;

const NERD_THRESHOLDS = {
  cpu: { warn: 75, crit: 90 },
  ram: { warn: 80, crit: 92 },
  gpu: { warn: 85, crit: 96 },
  disk: { warn: 70, crit: 90 },
};

const nerdStatsToggle = document.getElementById("settings-nerd-toggle");
const nerdStatsBar = document.getElementById("nerd-stats-bar");

const nerdStatsValueEls = {
  cpu: document.getElementById("nerd-stat-cpu"),
  ram: document.getElementById("nerd-stat-ram"),
  gpu: document.getElementById("nerd-stat-gpu"),
  disk: document.getElementById("nerd-stat-disk"),
};

const nerdStatsRowEls = {
  cpu: nerdStatsValueEls.cpu ? nerdStatsValueEls.cpu.closest(".nerd-stat") : null,
  ram: nerdStatsValueEls.ram ? nerdStatsValueEls.ram.closest(".nerd-stat") : null,
  gpu: nerdStatsValueEls.gpu ? nerdStatsValueEls.gpu.closest(".nerd-stat") : null,
  disk: nerdStatsValueEls.disk ? nerdStatsValueEls.disk.closest(".nerd-stat") : null,
};

let nerdStatsTimer = null;
let nerdStatsFailCount = 0;

function nerdStatsLevelFor(metric, value) {
  const limits = NERD_THRESHOLDS[metric];
  if (value >= limits.crit) return "crit";
  if (value >= limits.warn) return "warn";
  return "ok";
}

function updateNerdStatRow(metric, value) {
  const row = nerdStatsRowEls[metric];
  const valueEl = nerdStatsValueEls[metric];
  if (!row || !valueEl) return;

  if (value === null || value === undefined) {
    valueEl.textContent = "—";
    row.classList.remove("ok", "warn", "crit");
    return;
  }

  const level = nerdStatsLevelFor(metric, value);

  valueEl.textContent = Math.round(value);

  row.classList.remove("ok", "warn", "crit");
  row.classList.add(level);
}

async function fetchNerdStats() {
  try {
    const response = await fetch(NERD_STATS_URL, { cache: "no-store" });
    if (!response.ok) throw new Error("Invalid response");
    const data = await response.json();

    nerdStatsFailCount = 0;
    nerdStatsBar.classList.remove("unreachable");

    updateNerdStatRow("cpu", data.cpu);
    updateNerdStatRow("ram", data.ram);
    updateNerdStatRow("gpu", data.gpu);
    updateNerdStatRow("disk", data.disk);
  } catch (error) {
    nerdStatsFailCount += 1;

    if (nerdStatsFailCount >= 2) {
      nerdStatsBar.classList.add("unreachable");
      ["cpu", "ram", "gpu", "disk"].forEach(metric => updateNerdStatRow(metric, null));
    }
  }
}

function startNerdStatsPolling() {
  if (nerdStatsTimer) return;
  fetchNerdStats();
  nerdStatsTimer = window.setInterval(fetchNerdStats, NERD_STATS_INTERVAL_MS);
}

function stopNerdStatsPolling() {
  if (nerdStatsTimer) {
    window.clearInterval(nerdStatsTimer);
    nerdStatsTimer = null;
  }
  nerdStatsFailCount = 0;
  nerdStatsBar.classList.remove("unreachable");
}

function setNerdStatsEnabled(enabled, persist = true) {
  if (!nerdStatsBar) return;

  nerdStatsBar.classList.toggle("visible", enabled);

  if (enabled) {
    startNerdStatsPolling();
  } else {
    stopNerdStatsPolling();
  }

  if (persist) {
    localStorage.setItem(STORAGE_NERD_STATS, enabled ? "1" : "0");
  }
}

if (nerdStatsToggle) {
  nerdStatsToggle.addEventListener("change", () => {
    setNerdStatsEnabled(nerdStatsToggle.checked);
  });

  if (localStorage.getItem(STORAGE_NERD_STATS) === "1") {
    nerdStatsToggle.checked = true;
    setNerdStatsEnabled(true, false);
  }
}


/* =========================
   SCROLL REPORT (for the switch bar in the root page)
   Tells the root page how far this page can still scroll down, so the switch
   bar can travel with the page content instead of floating over the cards.
========================= */

(function reportScrollToRoot() {
  if (window.parent === window) {
    return;
  }

  const scroller = document.scrollingElement || document.documentElement;
  let queued = false;

  function send() {
    queued = false;

    const remaining = Math.max(
      0,
      scroller.scrollHeight - scroller.clientHeight - scroller.scrollTop
    );

    window.parent.postMessage(
      { type: "service-webpage-scroll", remaining: Math.round(remaining) },
      "*"
    );
  }

  function queue() {
    if (!queued) {
      queued = true;
      window.setTimeout(send, 0);
    }
  }

  window.addEventListener("scroll", queue, { passive: true });
  window.addEventListener("resize", queue);
  window.addEventListener("load", queue);

  if ("ResizeObserver" in window) {
    new ResizeObserver(queue).observe(document.documentElement);
  }

  queue();
})();
