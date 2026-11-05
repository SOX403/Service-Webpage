# Service Webpage

[Italiano](README.it.md)

A customizable start page with a cyber-style interface, made of two pages of links to services chosen and added by the user (added links are grouped in sections; each page has its own services and sections). It runs entirely in the browser: no server, no account, no build step.

## Features

- Edit mode: add, edit, delete and drag cards to reorder them. The "LOCK" button freezes the changes: after confirmation, the layout is saved.
- All user data is stored in the browser (IndexedDB). The code only contains placeholder services.
- Export and import per page (JSON). Import can be run in two modes: MERGE or REPLACE ALL. Before every import the previous state is saved internally and can be restored from the import panel with RESTORE PREVIOUS SAVE.
- Italian and English interface; the language follows the one set in the user's browser (English when the browser language is not supported by the project). Placeholder services are named in the interface language.
- Optional "Nerd Stats" panel (CPU, RAM, GPU, disk) fed by a small local server. It has currently been tested and works on Windows only.
- Full-screen layout showing seven cards per section.

## Quick start

1. Download or copy the repository.
2. Open `index.html` in a Chromium-based browser (the project has been tested automatically on Chromium; other browsers have not been tested).
3. Use **Settings > Edit** to replace the placeholder services with your own.

No installation is required. The page also works from a local web server, but this is not needed.

## Your data

- Everything you add lives in your browser profile (IndexedDB database `ServiceWebpageDB`). Clearing site data deletes it.
- **Export regularly** (Settings > Export). The export file is the only copy outside the browser. Exports and backups contain your service list: do not publish them. The `.gitignore` of this repository already excludes `service-webpage-page*.json` and `backup-*.json`.
- Accepted URLs are `http`, `https` or relative addresses; icons are `http`, `https`, local images (relative path) or embedded images. Other schemes are refused when adding, editing and importing.

## Data in a file (optional, with the local server)

When the dashboard is opened from the local server (`http://127.0.0.1:8765/`, the same server as Nerd Stats), its data are also kept in files on your PC and no longer depend on the browser's site data:

- on opening, the file is read and restores the state; after every change the file is rewritten (about one second later);
- one file per page (`page1.json`, `page2.json`) in the data folder, plus up to 30 older copies in its `backups` subfolder (at most one every 10 minutes);
- the data folder is, in this order: the environment variable `SERVICE_WEBPAGE_DATA_DIR`, the `data_dir` value of `system-monitor/config.json` (copy `config.example.json`), or `ServiceWebpageData` in your user folder;
- if the server cannot be reached, a notice appears and the changes stay in the browser until it is back; the server never replaces existing data with an empty state; a browser with no synchronisation history (for example after its site data was cleared) writes nothing until it has read the file, and the server refuses writes made on an outdated revision (409), so an emptied browser or an old tab cannot overwrite newer data;
- if another tab or browser has changed the file in the meantime, a notice asks you to reload the page; the previous content of a browser that had to be replaced by the file is kept in the browser under `<page>_unsyncedBackup`;
- the data folder must not be inside the dashboard folder (the server refuses to start);
- the browser stores a separate database for each address: the first time you use `http://127.0.0.1:8765/`, import your export once (Settings > Import).

Install the server with `system-monitor/install-stats.bat` (Windows, Python 3) and set `http://127.0.0.1:8765/` as the browser's home or start page. Opened from a file (`file://`) the dashboard works as before, with the data in the browser only. Saving to files has been tested on Windows (and, with the Windows-specific parts simulated, in a Linux test environment); it is not verified on other systems, where the server can be started manually with `python system-monitor/stats_server.py`. The data files contain your service list: keep them outside the repository.

## Nerd Stats (optional, Windows only)

The panel reads `http://127.0.0.1:8765/stats`, served by `system-monitor/stats_server.py` (Python 3, Windows API through `ctypes`).

- `system-monitor/install-stats.bat` registers a scheduled task that starts the server at every Windows logon; `uninstall-stats.bat` removes it. The task runs the `stats_server.py` of the folder from which the script was run: if you move or rename the project folder, run `install-stats.bat` again.
- The server listens on the loopback address only and accepts requests from the local dashboard (origin `null` for files, or `127.0.0.1` / `localhost`) with a matching `Host` header. Any other origin gets `403`.
- It can also be started manually: `python system-monitor/stats_server.py`.

## Privacy and external requests

The project has no analytics and sends no data to the author. The browser, however, contacts Google for two things:

- fonts (Orbitron, Oxanium) loaded from Google Fonts;
- service icons, when they use the Google favicon service (`google.com/s2/favicons`), which reveals the domain of each service to Google.

Replace those icons with local images and self-host the fonts to avoid these requests.

## Security notes

- User-typed and imported names, URLs and icons are validated; values read from storage are checked again before rendering. User data is never inserted as HTML.
- Pages communicate only with their own frames; messages from other sources are ignored.
- Content Security Policy limits `object`, `base` and `form` actions; no referrer is sent.
- The local server listens on `127.0.0.1` only (not reachable from the network). It checks the `Host` header, and for the data API the origin of the request (same origin only, plus a custom header for writes), so pages of other websites cannot read or change your data. It serves only the dashboard's own page, style, script, image and font files, never exports, backups, configuration or data files. Data files are written atomically, an empty state never replaces existing data, and a write based on an outdated revision is refused.
- Limit: any program running on the same PC, and any other Windows account on it, can reach `127.0.0.1:8765` and read the dashboard data through the API, as a program running under your account can already read the data files. Browser extensions allowed on all sites could do the same.

No system is free of defects. This list describes what was implemented, not a guarantee.

## Repository layout

| Path | Content |
|---|---|
| `index.html` | Main page: navigation bar, background effects, the two pages embedded as frames |
| `Page_1/`, `Page_2/` | The two pages (HTML, CSS, JavaScript, backgrounds) |
| `i18n/` | Language router and Italian / English dictionaries |
| `shared/` | Script that mirrors the dashboard data in a file (used only with the local server) |
| `system-monitor/` | Optional local server (statistics, dashboard, data files) and its Windows install scripts |
| `transition/` | Page-change effect image |

## License

Code: [PolyForm Noncommercial License 1.0.0](LICENSE). Required notice: Copyright 2026 SOX.
Third-party components and image terms: see [THIRD_PARTY.md](THIRD_PARTY.md).

## AI-assisted development

Developed with the assistance of AI tools on the author's directions. The page backgrounds and the transition image were created with AI tools (see `THIRD_PARTY.md`).

## Disclaimer

- The software is provided "as is", without warranty of any kind, express or implied, as stated in the license ("No Liability").
- To the maximum extent permitted by law, the author is not liable for any damage arising from the use of, the modification of, or the inability to use the software, including loss of data. Keeping backups of your data is your responsibility.
- The author is not responsible for uses of the software that are unlawful or contrary to the license, nor for modified versions or derivative works distributed by third parties.
- The user is responsible for the content they add (names, addresses, icons) and for complying with applicable laws and with the terms of the services they link.
- Names, logos and trademarks of third parties belong to their owners; no affiliation or endorsement is implied.
- Images generated with AI tools may resemble existing works. The author gives no assurance that they do not infringe third-party rights, and anyone who reuses them does so at their own risk.

## Contributing

Reports and contributions are welcome. Open an Issue to report a problem or suggest a change; Pull Requests are accepted and may be declined. By submitting a contribution you confirm that you have the right to submit it and agree that it is distributed under the project license. Do not include personal data, exports or backups in Issues or Pull Requests.

To report a security vulnerability, do not open a public Issue: use "Report a vulnerability" in the Security tab of the repository (private report).
