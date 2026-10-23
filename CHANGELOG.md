# Changelog

Format based on [Keep a Changelog](https://keepachangelog.com/).

## [3.0.0] - Initial public release

### Added
- Two-page start page with placeholder services only.
- Browser storage in IndexedDB; export and import per page (merge or replace everything) with internal backups and restore of the previous state.
- Italian / English interface.
- Optional local statistics server (Windows) and install scripts.
- Validation of names, URLs and icons on add, edit and import; checks before rendering.
- Origin and Host checks on the statistics server; Content Security Policy and no-referrer in the three HTML files.

### Changed (relative to 2.x)
- User data moved from browser localStorage to IndexedDB.
- Services defined in the code are now placeholders; the real service list lives in the browser and in export files.
- Placeholder service names follow the interface language (English when the browser language is not available). The identifiers of the Page 2 placeholders are now `Service N`.

### Fixed
- Scrollbars inactive on first load in full screen.
- Page 1 full-screen height aligned with Page 2.
