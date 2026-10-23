/*
============================================================
  SERVICE WEBPAGE - English
  Developed by SOX
  © 2026

  Licensed under the PolyForm Noncommercial License 1.0.0
  https://polyformproject.org/licenses/noncommercial/1.0.0
  Required Notice: Copyright 2026 SOX

  Translate only the VALUES, never the keys.
  Do not translate service names.
============================================================
*/

(window.I18N_DICTIONARIES = window.I18N_DICTIONARIES || {}).en = {
  /* Language */
  "lang.code": "EN",
  "lang.flag": '<svg viewBox="0 0 60 30" aria-hidden="true"><clipPath id="uk-s"><path d="M0,0 v30 h60 v-30 z"/></clipPath><clipPath id="uk-t"><path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z"/></clipPath><g clip-path="url(#uk-s)"><path d="M0,0 v30 h60 v-30 z" fill="#012169"/><path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" stroke-width="6"/><path d="M0,0 L60,30 M60,0 L0,30" clip-path="url(#uk-t)" stroke="#C8102E" stroke-width="4"/><path d="M30,0 v30 M0,15 h60" stroke="#fff" stroke-width="10"/><path d="M30,0 v30 M0,15 h60" stroke="#C8102E" stroke-width="6"/></g></svg>',
  "lang.name": "English",

  /* Settings */
  "settings.open": "Open settings",
  "settings.title": "SETTINGS",
  "settings.credits": "CREDITS",
  "settings.edit": "EDIT",
  "settings.fix": "LOCK",
  "settings.nerd": "NERD STATS",
  "settings.language": "LANGUAGE",
  "settings.export": "EXPORT",
  "settings.import": "IMPORT",

  /* End editing confirmation */
  "confirm.title": "END EDITING?",
  "confirm.text":
    "Are you sure you want to end editing?\nCONFIRM saves your changes, CANCEL discards them.",
  "confirm.cancel": "CANCEL",
  "confirm.accept": "CONFIRM",

  /* Delete service confirmation */
  "delete.title": "DELETE THIS SERVICE?",
  "delete.text":
    "Are you sure you want to delete “{name}”?",
  "delete.no": "NO",
  "delete.yes": "YES",

  /* Credits */
  "credits.close": "Close Credits",
  "credits.title": "CREDITS",
  "credits.version": "Version",
  "credits.original": "Original Project",

  /* Nerd stats */
  "nerd.disk": "DISK",
  "nerd.error": "Stats unavailable",
  "nerd.error.title":
    "The local statistics service is not responding. See the README for installation.",

  /* Footer (Page 1) */
  "footer.tagline": "Everything you need, in one place.",

  /* Sections */
  "section.gaming": "GAMING",
  "section.utility": "UTILITY",
  "section.social": "SOCIAL",
  "section.services": "SERVICES",
  "section.ecommerce": "E-COMMERCE",
  "section.streaming": "STREAMING",

  /* Services */
  "service.show": "Show service",
  "service.hide": "Hide service",
  "service.edit": "Edit service",

  /* Add service */
  "add.button": "ADD SERVICE",
  "add.title": "ADD SERVICE",
  "add.confirm": "ADD",
  "add.close": "Close",

  /* Edit service */
  "edit.title": "EDIT SERVICE",
  "edit.save": "SAVE",

  /* Shared dialog fields */
  "field.name": "NAME",
  "field.url": "URL",
  "field.logo": "LOGO",
  "field.enhance": "ENHANCE LOGO",
  "field.cancel": "CANCEL",
  "field.logoInfo": "Logo information",
  "field.logoInfo.favicon":
    "enter a URL that directly returns the icon/favicon, for example a Google Favicon URL.",
  "field.logoInfo.local":
    "enter the relative path of an image inside the project, for example <code>icons/logo.png</code>.",

  /* Errors */
  "error.fillAll": "Fill all the fields.",
  "error.duplicate": "A service with this name already exists.",
  "error.invalidName": "Invalid name (maximum 120 characters, no leading or trailing spaces).",
  "error.invalidUrl": "Invalid URL: only http or https addresses are allowed.",
  "error.invalidIcon": "Invalid icon: only http or https addresses or embedded images are allowed.",
  "placeholder.gaming": "Gaming {n}",
  "placeholder.utility": "Utility {n}",
  "placeholder.social": "Social {n}",
  "placeholder.services": "Service {n}",
  "placeholder.ecommerce": "E-Commerce {n}",
  "placeholder.streaming": "Streaming {n}",
  "error.invalidCategory": "Invalid category.",

  /* Import */
  "import.title": "IMPORT SAVE",
  "import.file": "FILE",
  "import.choose": "CHOOSE FILE",
  "import.noFile": "No file selected",
  "import.mode": "MODE",
  "import.modeInfo": "Information about the modes",
  "import.merge": "MERGE",
  "import.replace": "REPLACE ALL",
  "import.info.merge": "adds only the missing services.",
  "import.info.replace": "replaces the current configuration of the current page with the imported save.",
  "import.info.merge.note": "If a service already exists but with different values, you can choose whether to update it with the information in the imported save.",
  "import.info.replace.note": "Before replacing the configuration, the current data is saved in the browser and you can restore it with \"RESTORE PREVIOUS SAVE\".",
  "import.confirm": "IMPORT",
  "import.confirmReplace": "REPLACE",
  "import.close": "CLOSE",
  "import.file.info": "File: {count} services, {deleted} deleted, exported on {date}.",
  "import.plan.add": "To add: {n}",
  "import.plan.present": "Already present: {n}",
  "import.plan.deletedHere": "Deleted by you, not added back: {n}",
  "import.plan.duplicates": "Same address as a service already present, not added: {n}",
  "import.plan.skipped": "Ignored because invalid or unknown: {n} ({names})",
  "import.plan.conflicts": "Differences found: {n}. Tick the services to update with the values in the file; unticked ones keep the current value.",
  "import.plan.nothing": "No differences to import.",
  "import.conflict.current": "CURRENT",
  "import.conflict.file": "FILE",
  "import.replace.counts": "After the import the page will have {total} services. Removed: {removed}. Added: {added}. Deleted recorded: {deleted}.",
  "import.replace.warning": "All the current content of the page will be replaced. First the current data is saved in the browser: you can go back to it with RESTORE PREVIOUS SAVE. Press REPLACE to confirm.",
  "import.result.merge": "Import completed. Added: {added}. Updated: {updated}. Icons updated: {icons}.",
  "import.result.replace": "Replacement completed. Services: {total}. Removed: {removed}. Added: {added}.",
  "import.err.format": "Invalid file: it is not a Service Webpage export.",
  "import.err.page": "This file belongs to another page ({page}).",
  "import.err.version": "File version not supported.",
  "import.err.empty": "The file contains no valid services.",
  "import.err.big": "File too large or with too many services.",
  "import.err.read": "Unable to read the file.",
  "import.err.apply": "Import failed. Reload the page and check the data.",
  "import.undo.button": "RESTORE PREVIOUS SAVE",
  "import.undo.confirm": "CONFIRM RESTORE",
  "import.undo.info": "Data saved on {when}, before {action}. Services in the save: {n}.",
  "import.undo.action.merge": "the merge",
  "import.undo.action.replace": "the replacement",
  "import.undo.action.undo": "the restore",
  "import.undo.warning": "You will go back to the data the page had before the last import. Changes made since then will be lost. Press again to confirm.",
  "import.undo.done": "Restore completed. Services: {n}.",
  "import.err.undo": "Restore failed.",

  /* Page navigation (root index.html) */
  "nav.page1": "Go to Page 1",
  "nav.page2": "Go to Page 2",

  /* Page 2 - background texts (titles and taglines stay in English) */
  "p2.title.1": "ALL",
  "p2.title.2": "YOUR",
  "p2.title.3": "SERVICES",
  "p2.tagline.1": "FASTER",
  "p2.tagline.2": "SIMPLER",
  "p2.tagline.3": "TOGETHER",
  "p2.cat.services": "SERVICES",
  "p2.cat.services.sub.1": "WORK",
  "p2.cat.services.sub.2": "HEALTH",
  "p2.cat.services.sub.3": "PAPERWORK",
  "p2.cat.ecommerce": "E-COMMERCE",
  "p2.cat.ecommerce.sub.1": "SHOP",
  "p2.cat.ecommerce.sub.2": "DEALS",
  "p2.cat.ecommerce.sub.3": "MARKETPLACE",
  "p2.cat.streaming": "STREAMING",
  "p2.cat.streaming.sub.1": "MOVIES",
  "p2.cat.streaming.sub.2": "TV SHOWS",
  "p2.cat.streaming.sub.3": "MUSIC",
  "p2.cat.streaming.sub.4": "LIVE",
};
