# Service Webpage

[English](README.md)

Start page personalizzabile con interfaccia in stile cyber, composta da due pagine di collegamenti a servizi scelti e aggiunti dall'utente (i collegamenti aggiunti sono raggruppati in sezioni; ogni pagina ha propri servizi e sezioni). Funziona interamente nel browser: nessun server, nessun account, nessuna compilazione.

## Funzioni

- Modalità modifica: aggiunta, modifica, eliminazione e riordino delle schede trascinandole. Il pulsante "FISSA" congela le modifiche: dopo la conferma la disposizione viene salvata.
- Tutti i dati dell'utente sono salvati nel browser (IndexedDB). Il codice contiene solo servizi segnaposto.
- Esportazione e importazione per pagina (JSON). L'importazione può essere eseguita in due modalità: INTEGRA o SOSTITUISCI TUTTO. Prima di ogni importazione lo stato precedente viene salvato internamente e può essere ripristinato dal pannello di importazione tramite la voce RIPRISTINA SALVATAGGIO PRECEDENTE.
- Interfaccia in italiano e in inglese; la lingua segue quella impostata sul browser dell'utente (resta inglese se la lingua del browser non è supportata nel progetto). I servizi segnaposto sono nominati nella lingua dell'interfaccia.
- Pannello facoltativo "Nerd Stats" (CPU, RAM, GPU, disco) alimentato da un piccolo server locale. Attualmente è stato testato ed è funzionante solo su Windows.
- Disposizione a schermo intero con sette schede visibili per sezione.

## Avvio rapido

1. Scarica o copia il repository.
2. Apri `index.html` in un browser basato su Chromium (il progetto è stato testato in modo automatico su Chromium; gli altri browser non sono stati testati).
3. Usa **Impostazioni > Modifica** per sostituire i servizi segnaposto con i tuoi.

Non serve alcuna installazione. La pagina funziona anche da un server web locale, ma non è necessario.

## I tuoi dati

- Tutto ciò che aggiungi resta nel profilo del browser (database IndexedDB `ServiceWebpageDB`). Cancellare i dati del sito li elimina.
- **Esporta con regolarità** (Impostazioni > Esporta). Il file di esportazione è l'unica copia fuori dal browser. Esportazioni e backup contengono l'elenco dei tuoi servizi: non pubblicarli. Il `.gitignore` di questo repository esclude già `service-webpage-page*.json` e `backup-*.json`.
- Gli URL ammessi sono `http`, `https` o indirizzi relativi; le icone sono `http`, `https`, immagini locali (percorso relativo) o immagini incorporate. Gli altri schemi vengono rifiutati in aggiunta, modifica e importazione.

## Nerd Stats (facoltativo, solo Windows)

Il pannello legge `http://127.0.0.1:8765/stats`, servito da `system-monitor/stats_server.py` (Python 3, API di Windows tramite `ctypes`).

- `system-monitor/install-stats.bat` registra un'attività pianificata che avvia il server a ogni accesso a Windows; `uninstall-stats.bat` la rimuove.
- Il server ascolta solo sull'indirizzo di loopback e accetta le richieste del cruscotto locale (origine `null` per i file, oppure `127.0.0.1` / `localhost`) con intestazione `Host` coerente. Ogni altra origine riceve `403`.
- Si può avviare anche manualmente: `python system-monitor/stats_server.py`.

## Privacy e richieste esterne

Il progetto non ha strumenti di analisi e non invia dati all'autore. Il browser contatta però Google per due motivi:

- i caratteri (Orbitron, Oxanium) caricati da Google Fonts;
- le icone dei servizi, quando usano il servizio favicon di Google (`google.com/s2/favicons`), che rivela a Google il dominio di ciascun servizio.

Sostituisci quelle icone con immagini locali e ospita i caratteri in locale, per evitare queste richieste.

## Note di sicurezza

- Nomi, URL e icone digitati o importati vengono validati; i valori letti dall'archivio vengono ricontrollati prima della visualizzazione. I dati dell'utente non vengono mai inseriti come HTML.
- Le pagine comunicano solo con i propri frame; i messaggi di altre origini vengono ignorati.
- La Content Security Policy limita le azioni `object`, `base` e `form`; non viene inviato il referrer.

Nessun sistema è privo di difetti. Questo elenco descrive ciò che è stato implementato, non una garanzia.

## Struttura del repository

| Percorso | Contenuto |
|---|---|
| `index.html` | Pagina principale: barra di navigazione, effetti di sfondo, le due pagine incorporate come frame |
| `Page_1/`, `Page_2/` | Le due pagine (HTML, CSS, JavaScript, sfondi) |
| `i18n/` | Selettore di lingua e dizionari italiano / inglese |
| `system-monitor/` | Server locale facoltativo delle statistiche e script di installazione per Windows |
| `transition/` | Immagine dell'effetto di cambio pagina |

## Licenza

Codice: [PolyForm Noncommercial License 1.0.0](LICENSE). Avviso richiesto: Copyright 2026 SOX.
Componenti di terzi e termini delle immagini: vedi [THIRD_PARTY.md](THIRD_PARTY.md).

## Sviluppo assistito da IA

Sviluppato con l'assistenza di strumenti di IA su indicazioni dell'autore. Gli sfondi delle pagine e l'immagine di transizione sono stati creati con strumenti di IA (vedi `THIRD_PARTY.md`).

## Esclusione di responsabilità

- Il software è fornito "così com'è", senza garanzie di alcun tipo, esplicite o implicite, come previsto dalla licenza ("No Liability").
- Nella misura massima consentita dalla legge, l'autore non risponde di alcun danno derivante dall'uso, dalla modifica o dall'impossibilità di usare il software, compresa la perdita di dati. La conservazione di copie dei propri dati è responsabilità dell'utente.
- L'autore non risponde di usi del software illeciti o contrari alla licenza, né di versioni modificate o opere derivate diffuse da terzi.
- L'utente è responsabile dei contenuti che inserisce (nomi, indirizzi, icone), del rispetto delle leggi applicabili e dei termini dei servizi a cui rimanda.
- Nomi, loghi e marchi di terzi appartengono ai rispettivi titolari; non si intende alcuna affiliazione o approvazione.
- Le immagini generate con strumenti di IA possono somigliare a opere esistenti. L'autore non assicura che non violino diritti di terzi e chi le riutilizza lo fa a proprio rischio.

## Contributi

Segnalazioni e contributi sono benvenuti. Apri una Issue per segnalare un problema o proporre una modifica; le Pull Request sono accettate e possono essere rifiutate. Inviando un contributo confermi di avere il diritto di farlo e accetti che sia distribuito con la licenza del progetto. Non includere dati personali, esportazioni o backup in Issue o Pull Request.

Per segnalare una vulnerabilità di sicurezza non aprire una Issue pubblica: usa "Report a vulnerability" nella scheda Security del repository (segnalazione privata).
