@echo off
rem Installs NeoForge on first run, then starts the server. Requires Java 21+.
cd /d "%~dp0"

set NEOFORGE_VERSION=21.1.249

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

java @user_jvm_args.txt @"%ARGS_FILE%" nogui %*
pause
