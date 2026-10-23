# Service Webpage

[Italiano](README.it.md)

A personal start page with a cyber-style interface, made of two pages of service shortcuts (cards grouped in sections). It runs entirely in the browser: no server, no account, no build step.

## Features

- Two pages of shortcuts, switched from the navigation bar. Every page keeps its own services.
- Edit mode: add, edit, delete and drag cards to reorder them. A lock option freezes the layout.
- All user data is stored in the browser (IndexedDB). The code only contains placeholder services.
- Export and import per page (JSON). Import offers *merge* or *replace everything*; before every import the previous state is saved internally and can be restored from the import panel.
- Italian and English interface; the language follows the browser language (English when the browser language is not available). Placeholder services are named in the interface language.
- Optional "Nerd Stats" panel (CPU, RAM, GPU, disk) fed by a small local server. Windows only.
- Full-screen layout showing seven cards per section.

## Quick start

1. Download or clone the repository.
2. Open `index.html` in a Chromium-based browser (the project is tested automatically on Chromium; other browsers are not tested).
3. Use **Settings > Edit** to replace the placeholder services with your own.

No installation is required. The page also works from a local web server, but this is not needed.

## Your data

- Everything you add lives in your browser profile (IndexedDB database `ServiceWebpageDB`). Clearing site data deletes it.
- **Export regularly** (Settings > Export). The export file is the only copy outside the browser. Exports and backups contain your service list: do not publish them. The `.gitignore` of this repository already excludes `service-webpage-page*.json` and `backup-*.json`.
- Accepted URLs are `http`, `https` or relative addresses; icons are `http`, `https` or embedded images. Other schemes are refused when adding, editing and importing.

## Nerd Stats (optional, Windows only)

The panel reads `http://127.0.0.1:8765/stats`, served by `system-monitor/stats_server.py` (Python 3, Windows API through `ctypes`).

- `system-monitor/install-stats.bat` registers a scheduled task that starts the server at every Windows logon; `uninstall-stats.bat` removes it.
- The server listens on the loopback address only and accepts requests from the local dashboard (origin `null` for files, or `127.0.0.1` / `localhost`) with a matching `Host` header. Any other origin gets `403`.
- It can also be started manually: `python system-monitor/stats_server.py`.

## Privacy and external requests

The project has no analytics and sends no data to the author. The browser, however, contacts Google for two things:

- fonts (Orbitron, Oxanium) loaded from Google Fonts;
- service icons, when they use the Google favicon service (`google.com/s2/favicons`), which reveals the domain of each service to Google.

Replace those icons with embedded images, or self-host the fonts, to avoid these requests. Your IP address is visible to Google in both cases.

## Security notes

- User-typed and imported names, URLs and icons are validated; values read from storage are checked again before rendering. User data is never inserted as HTML.
- Pages communicate only with their own frames; messages from other sources are ignored.
- Content Security Policy limits `object`, `base` and `form` actions; no referrer is sent.

No system is free of defects. This list describes what was implemented, not a guarantee.

## Repository layout

| Path | Content |
|---|---|
| `index.html` | Shell: navigation bar, background effects, the two pages as frames |
| `Page_1/`, `Page_2/` | The two pages (HTML, CSS, JavaScript, backgrounds) |
| `i18n/` | Language router and Italian / English dictionaries |
| `system-monitor/` | Optional local statistics server and its Windows install scripts |
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
- Images generated with AI tools may resemble existing works. The author gives no assurance that they do not infringe third-party rights, and anyone who reuses them does so at their own risk. If you believe an image infringes your rights, open an Issue: the report will be evaluated and, where appropriate, the image removed.
- Nothing in this notice limits any liability that cannot be excluded or limited by law.

## Contributing

Reports and contributions are welcome. Open an Issue to report a problem or suggest a change; Pull Requests are accepted and may be declined. By submitting a contribution you confirm that you have the right to submit it and agree that it is distributed under the project license. Do not include personal data, exports or backups in Issues or Pull Requests.
