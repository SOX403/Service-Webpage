# Changelog

Format based on [Keep a Changelog](https://keepachangelog.com/).

Versions 1.0.0 to 2.0.0 were private development versions and were never published. Their entries were reconstructed by comparing the archived copies of each version; dates are the date of the most recent file in each copy.

## [Unreleased]

### Changed
- Long service names wrap on at most two lines with an ellipsis in normal use as well (previously only in edit mode).

### Fixed
- The line shown before restoring the previous save, and the message shown after restoring it, reported the number of visibility entries instead of the number of services in the save.

## [3.0.0] - 2026-10-23 - Initial public release

### Added
- Export per page (one JSON file) and import with two modes, MERGE or REPLACE ALL. Before every import the previous state is saved internally and can be restored from the import panel (RESTORE PREVIOUS SAVE).
- Edits to services (name, URL, icon) and the list of deleted services are stored in IndexedDB together with the rest of the state, with a schema marker and internal copies made when the services defined in the code change.
- Deleted services are remembered, including services added by the user; creating a service with a deleted name restores it.
- Validation of names, URLs and icons on add, edit and import; the same checks run again before rendering.
- Origin and Host checks on the statistics server; Content Security Policy and no-referrer in the three HTML files.
- Documentation: README (English and Italian), THIRD_PARTY, CHANGELOG, license text and the font license (OFL).

### Changed (relative to 2.x)
- User data moved from browser localStorage to IndexedDB.
- Services defined in the code are now placeholders; the real service list lives in the browser and in export files.
- Placeholder service names follow the interface language (English when the browser language is not available). The identifiers of the Page 2 placeholders are now `Service N`.
- The delete confirmation names the service to be deleted.
- In edit mode, long service names wrap on at most two lines with an ellipsis and no longer overlap the card buttons.
- Sizes of the settings menu labels adjusted; the navigation bar is hidden behind the credits, lock and delete confirmation dialogs.
- Unused functions and style rules removed.
- Author credit in file headers and in the license notice reduced to the author name "SOX".

### Fixed
- Scrollbars inactive on first load in full screen.
- Page 1 full-screen height aligned with Page 2.

## [2.0.0] - 2026-10-14

Development from the first two-page snapshot (2026-09-24) to this version.

### Added
- Second page (Page 2) with its own services and sections.
- Main page that shows the two pages as frames, with a navigation bar to switch between them and an animated page-change transition (first a video, later an animated particle effect over an image).
- Add-service dialog (name, URL, icon, section) with an information button.
- Edit-service dialog (name, URL, icon) and a delete confirmation.
- Remembered list of deleted services.
- Full-screen detection with its own list heights, and per-section card border and scrollbar colors.
- Italian / English interface with a language selector in the settings menu.
- Optional "Nerd Stats" panel (CPU, RAM, GPU, disk) with a local server and Windows install / uninstall scripts.
- Removal of orphaned data on start-up, with an internal backup.
- PolyForm Noncommercial 1.0.0 license, `.gitignore`, `.gitattributes` and a bundled font on Page 2.

### Changed
- Folders renamed to `Page_1` and `Page_2`; background images replaced.
- Code comments and section headers translated into English.

## [1.2.0] - 2026-09-19

### Added
- Five more default shortcuts.

### Changed
- State (visibility and order) moved from localStorage to IndexedDB (database `ServiceWebpageDB`); values from the previous version are read when IndexedDB is empty.

## [1.1.0] - 2026-09-18

### Added
- The settings button is split into three click zones (gear, EDIT, CREDITS) with separators.
- Configuration kept separately for each page, with migration of the previous configuration.
- Automatic scrolling of the list while dragging a card near its edge.

### Changed
- CANCEL in edit mode restores the state read from the page itself, even when no configuration has been saved yet.
- Author credit in the file header written as "SOX".

## [1.0.0] - 2026-09-17

Initial private version.

- Single page with 25 default shortcuts in three sections (Gaming, Utility, Social).
- Edit mode with show / hide of cards and drag-and-drop reordering; confirmation before leaving edit mode.
- Visibility and order saved in localStorage.
- Credits window, custom scrollbars and responsive layout.
