@echo off
rem Licensed under the PolyForm Noncommercial License 1.0.0 (see LICENSE)
rem Required Notice: Copyright 2026 SOX
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0install-stats.ps1"
if errorlevel 1 (
    echo.
    pause
) else (
    timeout /t 5
)