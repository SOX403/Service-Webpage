/*
============================================================
  SERVICE WEBPAGE - Italian (reference language)
  Developed by SOX
  © 2026

  Licensed under the PolyForm Noncommercial License 1.0.0
  https://polyformproject.org/licenses/noncommercial/1.0.0
  Required Notice: Copyright 2026 SOX

  To add a language: copy this file to lang.<code>.js,
  translate only the VALUES (never the keys) and add the
  <script> tag to the root index.html and to both pages.
  Do not translate service names.
============================================================
*/

(window.I18N_DICTIONARIES = window.I18N_DICTIONARIES || {}).it = {
  /* Language */
  "lang.code": "IT",
  "lang.flag": '<svg viewBox="0 0 3 2" aria-hidden="true"><rect width="1" height="2" fill="#009246"/><rect x="1" width="1" height="2" fill="#fff"/><rect x="2" width="1" height="2" fill="#ce2b37"/></svg>',
  "lang.name": "Italiano",

  /* Settings */
  "settings.open": "Apri impostazioni",
  "settings.title": "IMPOSTAZIONI",
  "settings.credits": "CREDITS",
  "settings.edit": "MODIFICA",
  "settings.fix": "FISSA",
  "settings.nerd": "STATISTICHE PER NERD",
  "settings.language": "LINGUA",
  "settings.export": "ESPORTA",
  "settings.import": "IMPORTA",

  /* End editing confirmation */
  "confirm.title": "TERMINARE LA MODIFICA?",
  "confirm.text":
    "Sei sicuro di voler terminare la modifica?\nCONFERMA salva le modifiche, ANNULLA le scarta.",
  "confirm.cancel": "ANNULLA",
  "confirm.accept": "CONFERMA",

  /* Delete service confirmation */
  "delete.title": "ELIMINARE QUESTO SERVIZIO?",
  "delete.text":
    "Sei sicuro di voler eliminare «{name}»?",
  "delete.no": "NO",
  "delete.yes": "SI",

  /* Credits */
  "credits.close": "Chiudi Credits",
  "credits.title": "CREDITS",
  "credits.version": "Versione",
  "credits.original": "Original Project",

  /* Nerd stats */
  "nerd.disk": "DISCO",
  "nerd.error": "Statistiche non disponibili",
  "nerd.error.title":
    "Il servizio locale delle statistiche non risponde. Vedi LEGGIMI per l'installazione.",

  /* Footer (Page 1) */
  "footer.tagline": "Tutto ciò che ti serve, in un unico spazio.",

  /* Sections */
  "section.gaming": "GAMING",
  "section.utility": "UTILITY",
  "section.social": "SOCIAL",
  "section.services": "SERVICES",
  "section.ecommerce": "E-COMMERCE",
  "section.streaming": "STREAMING",

  /* Services */
  "service.show": "Mostra servizio",
  "service.hide": "Nascondi servizio",
  "service.edit": "Modifica servizio",

  /* Add service */
  "add.button": "AGGIUNGI SERVIZIO",
  "add.title": "AGGIUNGI SERVIZIO",
  "add.confirm": "AGGIUNGI",
  "add.close": "Chiudi",

  /* Modifica servizio */
  "edit.title": "MODIFICA SERVIZIO",
  "edit.save": "SALVA",

  /* Shared dialog fields */
  "field.name": "NOME",
  "field.url": "URL",
  "field.logo": "LOGO",
  "field.enhance": "MIGLIORA LOGO",
  "field.cancel": "ANNULLA",
  "field.logoInfo": "Informazioni sui loghi",
  "field.logoInfo.favicon":
    "inserisci un URL che restituisca direttamente l'icona/favicon, ad esempio un URL Google Favicon.",
  "field.logoInfo.local":
    "inserisci il percorso relativo a un'immagine presente nel progetto, ad esempio <code>icons/logo.png</code>.",

  /* Errors */
  "error.fillAll": "Compila tutti i campi.",
  "error.duplicate": "Esiste già un servizio con questo nome.",
  "error.invalidName": "Nome non valido (massimo 120 caratteri, senza spazi iniziali o finali).",
  "error.invalidUrl": "URL non valido: sono ammessi solo indirizzi http o https.",
  "error.invalidIcon": "Icona non valida: sono ammessi solo indirizzi http o https oppure immagini incorporate.",
  "placeholder.gaming": "Gaming {n}",
  "placeholder.utility": "Utility {n}",
  "placeholder.social": "Social {n}",
  "placeholder.services": "Servizio {n}",
  "placeholder.ecommerce": "E-Commerce {n}",
  "placeholder.streaming": "Streaming {n}",
  "error.invalidCategory": "Categoria non valida.",

  /* Import */
  "import.title": "IMPORTA SALVATAGGIO",
  "import.file": "FILE",
  "import.choose": "SCEGLI FILE",
  "import.noFile": "Nessun file selezionato",
  "import.mode": "MODALITÀ",
  "import.modeInfo": "Informazioni sulle modalità",
  "import.merge": "INTEGRA",
  "import.replace": "SOSTITUISCI TUTTO",
  "import.info.merge": "aggiunge solo i servizi mancanti.",
  "import.info.replace": "sostituisce la configurazione attuale della pagina corrente con il salvataggio importato.",
  "import.info.merge.note": "Se un servizio esiste già ma con valori diversi, puoi scegliere se aggiornarlo con le informazioni presenti nel salvataggio importato.",
  "import.info.replace.note": "Prima di sostituire la configurazione, i dati attuali vengono salvati nel browser e potrai ripristinarli con \"RIPRISTINA SALVATAGGIO PRECEDENTE\".",
  "import.confirm": "IMPORTA",
  "import.confirmReplace": "SOSTITUISCI",
  "import.close": "CHIUDI",
  "import.file.info": "File: {count} servizi, {deleted} eliminati, esportato il {date}.",
  "import.plan.add": "Da aggiungere: {n}",
  "import.plan.present": "Già presenti: {n}",
  "import.plan.deletedHere": "Eliminati da te, non reinseriti: {n}",
  "import.plan.duplicates": "Stesso indirizzo di un servizio già presente, non aggiunti: {n}",
  "import.plan.skipped": "Ignorati perché non validi o sconosciuti: {n} ({names})",
  "import.plan.conflicts": "Differenze trovate: {n}. Spunta i servizi da aggiornare con i valori del file; senza spunta resta il valore attuale.",
  "import.plan.nothing": "Nessuna differenza da importare.",
  "import.conflict.current": "ATTUALE",
  "import.conflict.file": "FILE",
  "import.replace.counts": "Dopo l'importazione la pagina avrà {total} servizi. Rimossi: {removed}. Aggiunti: {added}. Eliminati registrati: {deleted}.",
  "import.replace.warning": "Tutto il contenuto attuale della pagina verrà sostituito. Prima i dati attuali vengono salvati nel browser: potrai tornarci con RIPRISTINA SALVATAGGIO PRECEDENTE. Premi SOSTITUISCI per confermare.",
  "import.result.merge": "Importazione completata. Aggiunti: {added}. Aggiornati: {updated}. Icone aggiornate: {icons}.",
  "import.result.replace": "Sostituzione completata. Servizi: {total}. Rimossi: {removed}. Aggiunti: {added}.",
  "import.err.format": "File non valido: non è un export di Service Webpage.",
  "import.err.page": "Questo file appartiene a un'altra pagina ({page}).",
  "import.err.version": "Versione del file non supportata.",
  "import.err.empty": "Il file non contiene servizi validi.",
  "import.err.big": "File troppo grande o con troppi servizi.",
  "import.err.read": "Impossibile leggere il file.",
  "import.err.apply": "Importazione non riuscita. Ricarica la pagina e controlla i dati.",
  "import.undo.button": "RIPRISTINA SALVATAGGIO PRECEDENTE",
  "import.undo.confirm": "CONFERMA RIPRISTINO",
  "import.undo.info": "Dati salvati il {when}, prima {action}. Servizi presenti nel salvataggio: {n}.",
  "import.undo.action.merge": "dell'integrazione",
  "import.undo.action.replace": "della sostituzione",
  "import.undo.action.undo": "del ripristino",
  "import.undo.warning": "Tornerai ai dati che la pagina aveva prima dell'ultima importazione. Le modifiche fatte da allora andranno perse. Premi di nuovo per confermare.",
  "import.undo.done": "Ripristino completato. Servizi: {n}.",
  "import.err.undo": "Ripristino non riuscito.",

  /* Page navigation (root index.html) */
  "nav.page1": "Vai alla Page 1",
  "nav.page2": "Vai alla Page 2",

  /* Page 2 - background texts (titles and taglines stay in English) */
  "p2.title.1": "ALL",
  "p2.title.2": "YOUR",
  "p2.title.3": "SERVICES",
  "p2.tagline.1": "FASTER",
  "p2.tagline.2": "SIMPLER",
  "p2.tagline.3": "TOGETHER",
  "p2.cat.services": "SERVIZI",
  "p2.cat.services.sub.1": "LAVORO",
  "p2.cat.services.sub.2": "SANITÀ",
  "p2.cat.services.sub.3": "PRATICHE",
  "p2.cat.ecommerce": "E-COMMERCE",
  "p2.cat.ecommerce.sub.1": "SHOP",
  "p2.cat.ecommerce.sub.2": "DEALS",
  "p2.cat.ecommerce.sub.3": "MARKETPLACE",
  "p2.cat.streaming": "STREAMING",
  "p2.cat.streaming.sub.1": "FILM",
  "p2.cat.streaming.sub.2": "SERIE TV",
  "p2.cat.streaming.sub.3": "MUSICA",
  "p2.cat.streaming.sub.4": "LIVE",
};
