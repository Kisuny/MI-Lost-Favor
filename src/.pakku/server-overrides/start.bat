@echo off
setlocal EnableDelayedExpansion
cd /d "%~dp0"

set NEOFORGE_VERSION=21.1.249

if not defined MAX_CRASHES set MAX_CRASHES=5
if not defined CRASH_WINDOW set CRASH_WINDOW=600
if not defined RESTART_DELAY set RESTART_DELAY=10
if not defined MIN_UPTIME set MIN_UPTIME=60

where java >nul 2>nul
if errorlevel 1 (
    echo Java was not found. Install Java 21 or newer.
    pause
    exit /b 1
)

for /f "tokens=3" %%v in ('java -version 2^>^&1 ^| findstr /i "version"') do set JAVA_VERSION=%%~v
for /f "delims=." %%m in ("%JAVA_VERSION%") do set JAVA_MAJOR=%%m
if %JAVA_MAJOR% LSS 21 (
    echo Java %JAVA_MAJOR% found, but Java 21 or newer is required.
    pause
    exit /b 1
)

set INSTALLER=neoforge-%NEOFORGE_VERSION%-installer.jar
set ARGS_FILE=libraries\net\neoforged\neoforge\%NEOFORGE_VERSION%\win_args.txt

if not exist "%ARGS_FILE%" (
    echo Installing NeoForge %NEOFORGE_VERSION%...
    curl -fL -o "%INSTALLER%" "https://maven.neoforged.net/releases/net/neoforged/neoforge/%NEOFORGE_VERSION%/%INSTALLER%"
    if errorlevel 1 (
        echo Failed to download the NeoForge installer.
        pause
        exit /b 1
    )
    java -jar "%INSTALLER%" --installServer
    del "%INSTALLER%" "%INSTALLER%.log" 2>nul
)

set CRASHES=0

:run
for /f %%t in ('powershell -NoProfile -Command "[DateTimeOffset]::UtcNow.ToUnixTimeSeconds()"') do set STARTED=%%t

java @user_jvm_args.txt @"%ARGS_FILE%" nogui %*
set CODE=!ERRORLEVEL!

for /f %%t in ('powershell -NoProfile -Command "[DateTimeOffset]::UtcNow.ToUnixTimeSeconds()"') do set NOW=%%t
set /a UPTIME=NOW-STARTED

set QUICK=1
if !CODE! EQU 0 if !UPTIME! GEQ %MIN_UPTIME% set QUICK=0

if !QUICK! EQU 0 (
    set CRASHES=0
    echo Server stopped after !UPTIME!s.
) else (
    if !UPTIME! GTR %CRASH_WINDOW% set CRASHES=0
    set /a CRASHES+=1
    echo Server exited with code !CODE! after !UPTIME!s ^(failure !CRASHES! of %MAX_CRASHES%^).
    if !CRASHES! GEQ %MAX_CRASHES% (
        echo Too many failures in a row, not restarting. Check the logs and crash-reports folders.
        goto :end
    )
)

echo Restarting in %RESTART_DELAY% seconds. Press Ctrl+C to cancel.
set /a PINGS=RESTART_DELAY+1
ping -n !PINGS! 127.0.0.1 >nul
goto :run

:end
pause
