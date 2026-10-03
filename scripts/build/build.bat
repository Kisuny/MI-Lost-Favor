@echo off
setlocal
set PYTHON=
where py >nul 2>nul && set PYTHON=py
if not defined PYTHON where python >nul 2>nul && set PYTHON=python
if not defined PYTHON (
    echo Python was not found. Install Python 3 and try again.
    exit /b 1
)
%PYTHON% "%~dp0build.py" %*
exit /b %ERRORLEVEL%
