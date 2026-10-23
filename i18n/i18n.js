/*
============================================================
  SERVICE WEBPAGE
  Developed by SOX
  © 2026

  Licensed under the PolyForm Noncommercial License 1.0.0
  https://polyformproject.org/licenses/noncommercial/1.0.0
  Required Notice: Copyright 2026 SOX

  Language engine (i18n).

  - Plain script: works from file:// and Live Server
    (no fetch, no JSON, no ES modules).
  - Dictionaries are loaded BEFORE this file:
      i18n/lang.it.js, i18n/lang.en.js, ...
  - Static text:  <span data-i18n="key">Fallback</span>
  - Dynamic text: I18N.t("key")
  - The root page (index.html) keeps the chosen language and
    forwards it to both pages through postMessage.
============================================================
*/

(function (global) {
  "use strict";

  var STORAGE_KEY = "serviceWebpageLanguage";

  var DEFAULT_LANGUAGE = "it";

  /* Used when the browser language has no dictionary (e.g. a French browser). */
  var BROWSER_FALLBACK_LANGUAGE = "en";

  /* Order shown in the language selector (only loaded languages appear). */
  var LANGUAGE_ORDER = ["it", "en", "es", "fr", "de"];

  var MESSAGE_TYPE = "service-webpage-language";
  var HELLO_TYPE = "service-webpage-language-hello";

  var TEXT_ATTRIBUTES = ["title", "aria-label", "placeholder"];

  var dictionaries = (global.I18N_DICTIONARIES = global.I18N_DICTIONARIES || {});

  var currentLanguage = DEFAULT_LANGUAGE;

  var listeners = [];

  function hasOwn(object, key) {
    return Object.prototype.hasOwnProperty.call(object, key);
  }

  function isAvailable(language) {
    return typeof language === "string" && hasOwn(dictionaries, language);
  }

  /* Available languages, in selector order. */
  function getAvailableLanguages() {
    var ordered = LANGUAGE_ORDER.filter(isAvailable);

    Object.keys(dictionaries).forEach(function (language) {
      if (ordered.indexOf(language) === -1) {
        ordered.push(language);
      }
    });

    return ordered;
  }

  function lookup(language, key) {
    var dictionary = dictionaries[language];

    if (dictionary && hasOwn(dictionary, key)) {
      return dictionary[key];
    }

    return undefined;
  }

  /*
     Translation: current language -> default language -> the key itself.
     Placeholders like {name} are replaced with values from `values`.
  */
  function t(key, values) {
    var text = lookup(currentLanguage, key);

    if (text === undefined) {
      text = lookup(DEFAULT_LANGUAGE, key);
    }

    if (text === undefined) {
      text = key;
    }

    if (values) {
      text = text.replace(/\{(\w+)\}/g, function (match, name) {
        return hasOwn(values, name) ? values[name] : match;
      });
    }

    return text;
  }

  function forEachNode(list, callback) {
    Array.prototype.forEach.call(list, callback);
  }

  /* Applies the translations to every data-i18n* element inside `root`. */
  function apply(root) {
    root = root || document;

    forEachNode(root.querySelectorAll("[data-i18n]"), function (element) {
      element.textContent = t(element.getAttribute("data-i18n"));
    });

    /* Only for trusted text from our own dictionaries (e.g. contains <code>). */
    forEachNode(root.querySelectorAll("[data-i18n-html]"), function (element) {
      element.innerHTML = t(element.getAttribute("data-i18n-html"));
    });

    TEXT_ATTRIBUTES.forEach(function (attribute) {
      var selector = "[data-i18n-" + attribute + "]";

      forEachNode(root.querySelectorAll(selector), function (element) {
        element.setAttribute(
          attribute,
          t(element.getAttribute("data-i18n-" + attribute))
        );
      });
    });
  }

  /*
    First visit (no saved choice): uses the browser language when a
    dictionary exists for it, otherwise English.
  */
  function detectBrowserLanguage() {
    var tags = [];

    if (global.navigator) {
      if (global.navigator.languages && global.navigator.languages.length) {
        tags = Array.prototype.slice.call(global.navigator.languages);
      } else if (global.navigator.language) {
        tags = [global.navigator.language];
      }
    }

    for (var i = 0; i < tags.length; i++) {
      var code = String(tags[i]).toLowerCase().split("-")[0];

      if (isAvailable(code)) {
        return code;
      }
    }

    return isAvailable(BROWSER_FALLBACK_LANGUAGE)
      ? BROWSER_FALLBACK_LANGUAGE
      : DEFAULT_LANGUAGE;
  }

  function readStoredLanguage() {
    try {
      return global.localStorage.getItem(STORAGE_KEY);
    } catch (error) {
      return null;
    }
  }

  function storeLanguage(language) {
    try {
      global.localStorage.setItem(STORAGE_KEY, language);
    } catch (error) {
      /* Storage unavailable: the language simply isn't remembered. */
    }
  }

  function notifyParent(language) {
    if (!global.parent || global.parent === global) {
      return;
    }

    try {
      global.parent.postMessage({ type: MESSAGE_TYPE, lang: language }, "*");
    } catch (error) {
      /* Ignore. */
    }
  }

  /*
     Changes the language. options.broadcast === false avoids
     sending the change back to the parent (used for received messages).
  */
  function setLanguage(language, options) {
    if (!isAvailable(language)) {
      return false;
    }

    currentLanguage = language;

    storeLanguage(language);

    document.documentElement.setAttribute("lang", language);

    apply(document);

    listeners.slice().forEach(function (listener) {
      try {
        listener(language);
      } catch (error) {
        if (global.console) {
          global.console.error("I18N listener error:", error);
        }
      }
    });

    if (!options || options.broadcast !== false) {
      notifyParent(language);
    }

    return true;
  }

  function getLanguage() {
    return currentLanguage;
  }

  function onChange(listener) {
    if (typeof listener === "function") {
      listeners.push(listener);
    }
  }

  function getLanguageCode(language) {
    return lookup(language, "lang.code") || String(language).toUpperCase();
  }

  function getLanguageName(language) {
    return lookup(language, "lang.name") || getLanguageCode(language);
  }

  /* Language sent by the parent page (root index.html). */
  global.addEventListener("message", function (event) {
    if (event.source !== global.parent) {
      return;
    }

    var data = event.data;

    if (!data || data.type !== MESSAGE_TYPE || !isAvailable(data.lang)) {
      return;
    }

    if (data.lang !== currentLanguage) {
      setLanguage(data.lang, { broadcast: false });
    }
  });

  /* Language changed in another tab/window of the same browser. */
  global.addEventListener("storage", function (event) {
    if (event.key !== STORAGE_KEY || !isAvailable(event.newValue)) {
      return;
    }

    if (event.newValue !== currentLanguage) {
      setLanguage(event.newValue, { broadcast: false });
    }
  });

  function init() {
    var stored = readStoredLanguage();

    currentLanguage = isAvailable(stored) ? stored : detectBrowserLanguage();

    document.documentElement.setAttribute("lang", currentLanguage);

    apply(document);

    /* Lets dynamic texts (set from script.js) pick up the initial language. */
    listeners.slice().forEach(function (listener) {
      try {
        listener(currentLanguage);
      } catch (error) {
        if (global.console) {
          global.console.error("I18N listener error:", error);
        }
      }
    });

    /* Asks the root page which language is active. */
    if (global.parent && global.parent !== global) {
      try {
        global.parent.postMessage({ type: HELLO_TYPE }, "*");
      } catch (error) {
        /* Ignore. */
      }
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  global.I18N = {
    t: t,
    apply: apply,
    setLanguage: setLanguage,
    getLanguage: getLanguage,
    getAvailableLanguages: getAvailableLanguages,
    getLanguageCode: getLanguageCode,
    getLanguageName: getLanguageName,
    onChange: onChange,
  };
})(window);
