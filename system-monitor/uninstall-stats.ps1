# Licensed under the PolyForm Noncommercial License 1.0.0 (see LICENSE)
# Required Notice: Copyright 2026 SOX

# Service Webpage - stats service uninstallation (Windows)

$TaskName = 'ServiceWebpageStats'

Write-Host ''
Write-Host '=== Service Webpage -  stats uninstallation ===' -ForegroundColor Cyan
Write-Host ''

try { Stop-ScheduledTask -TaskName $TaskName -ErrorAction Stop } catch { }

try {
    Unregister-ScheduledTask -TaskName $TaskName -Confirm:$false -ErrorAction Stop
    Write-Host 'Scheduled task removed.'
} catch {
    Write-Host 'No scheduled task to remove.'
}

$lnk = Join-Path ([Environment]::GetFolderPath('Startup')) 'ServiceWebpageStats.lnk'
if (Test-Path $lnk) {
    Remove-Item $lnk -Force
    Write-Host 'Auto-start shortcut removed.'
}

$procs = Get-CimInstance Win32_Process -ErrorAction SilentlyContinue |
    Where-Object { $_.CommandLine -like '*stats_server.py*' -and $_.Name -match '^pythonw?\.exe$' }

foreach ($p in $procs) {
    try {
        Stop-Process -Id $p.ProcessId -Force -ErrorAction Stop
        Write-Host "Process terminated (PID $($p.ProcessId))."
    } catch { }
}

Write-Host ''
Write-Host 'Done. The stats will no longer start automatically.' -ForegroundColor Green
