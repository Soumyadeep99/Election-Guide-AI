@echo off
echo Attempting to open the Election Assistant...
powershell -Command "Start-Process 'index.html'"
if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Could not open index.html automatically.
    echo Please try to right-click index.html and select 'Open with' -> 'Google Chrome'.
    pause
)
