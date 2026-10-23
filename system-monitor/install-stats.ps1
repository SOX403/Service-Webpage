# Licensed under the PolyForm Noncommercial License 1.0.0 (see LICENSE)
# Required Notice: Copyright 2026 SOX

# Service Webpage - stats service installation (Windows)
# Registers stats_server.py so that it starts at every Windows logon.
# Does not require administrator privileges (if possible).

$ErrorActionPreference = 'Stop'

$TaskName = 'ServiceWebpageStats'
$Port     = 8765
$Here     = Split-Path -Parent $MyInvocation.MyCommand.Path
$Script   = Join-Path $Here 'stats_server.py'

function Find-Pythonw {
    $code = "import sys,os;print(os.path.join(os.path.dirname(sys.executable),'pythonw.exe'))"
    $candidates = @(
        @{ Exe = 'python'; Params = @('-c', $code) },
        @{ Exe = 'py';     Params = @('-3', '-c', $code) }
    )
    foreach ($c in $candidates) {
        if (-not (Get-Command $c.Exe -ErrorAction SilentlyContinue)) { continue }
        try {
            $out  = & $c.Exe @($c.Params) 2>$null
            $path = ($out | Select-Object -First 1)
            if ($path) {
                $path = $path.ToString().Trim()
                if (Test-Path $path) { return $path }
            }
        } catch { }
    }
    return $null
}

function Test-StatsServer {
    for ($i = 0; $i -lt 15; $i++) {
        try {
            $r = Invoke-WebRequest -Uri "http://127.0.0.1:$Port/stats" -UseBasicParsing -TimeoutSec 2
            if ($r.StatusCode -eq 200) { return $true }
        } catch { }
        Start-Sleep -Seconds 1
    }
    return $false
}

Write-Host ''
Write-Host '=== Service Webpage - stats installation ===' -ForegroundColor Cyan
Write-Host ''

if (-not (Test-Path $Script)) {
    Write-Host "ERROR: stats_server.py not found in $Here" -ForegroundColor Red
    exit 1
}

$pythonw = Find-Pythonw
if (-not $pythonw) {
    Write-Host 'ERROR: Python 3 not found (or pythonw.exe missing).' -ForegroundColor Red
    Write-Host 'Install Python from python.org, checking "Add Python to PATH", then run this file again.'
    exit 1
}
Write-Host "Python:  $pythonw"
Write-Host "Script:  $Script"

# Removes any previous installation
try { Stop-ScheduledTask -TaskName $TaskName -ErrorAction Stop } catch { }
try { Unregister-ScheduledTask -TaskName $TaskName -Confirm:$false -ErrorAction Stop } catch { }

$method = $null

try {
    $user      = "$env:USERDOMAIN\$env:USERNAME"
    $arguments = '"' + $Script + '"'

    $action    = New-ScheduledTaskAction -Execute $pythonw -Argument $arguments -WorkingDirectory $Here
    $trigger   = New-ScheduledTaskTrigger -AtLogOn -User $user
    $settings  = New-ScheduledTaskSettingsSet `
                    -AllowStartIfOnBatteries `
                    -DontStopIfGoingOnBatteries `
                    -StartWhenAvailable `
                    -RestartCount 5 `
                    -RestartInterval (New-TimeSpan -Minutes 1) `
                    -ExecutionTimeLimit ([TimeSpan]::Zero) `
                    -MultipleInstances IgnoreNew
    $principal = New-ScheduledTaskPrincipal -UserId $user -LogonType Interactive -RunLevel Limited

    Register-ScheduledTask -TaskName $TaskName -Action $action -Trigger $trigger `
        -Settings $settings -Principal $principal -Force | Out-Null

    Start-ScheduledTask -TaskName $TaskName
    $method = 'scheduled task'
}
catch {
    Write-Host 'Scheduled task not created, using the Startup folder.' -ForegroundColor Yellow

    try {
        $startup = [Environment]::GetFolderPath('Startup')
        $lnk     = Join-Path $startup 'ServiceWebpageStats.lnk'
        $shell   = New-Object -ComObject WScript.Shell
        $sc      = $shell.CreateShortcut($lnk)
        $sc.TargetPath       = $pythonw
        $sc.Arguments        = '"' + $Script + '"'
        $sc.WorkingDirectory = $Here
        $sc.WindowStyle      = 7
        $sc.Save()

        Start-Process -FilePath $pythonw -ArgumentList ('"' + $Script + '"') -WorkingDirectory $Here
        $method = 'Startup folder'
    }
    catch {
        Write-Host "ERROR: installation failed: $($_.Exception.Message)" -ForegroundColor Red
        exit 1
    }
}

Write-Host "Auto-start method: $method"
Write-Host 'Checking the service...'

if (Test-StatsServer) {
    Write-Host ''
    Write-Host "OK: service running at http://127.0.0.1:$Port/stats" -ForegroundColor Green
    Write-Host 'It will start by itself at every Windows logon.'
} else {
    Write-Host ''
    Write-Host 'WARNING: the service is not responding. Try running it manually:' -ForegroundColor Yellow
    Write-Host "  python `"$Script`""
    Write-Host 'to see any errors.'
    exit 1
}
