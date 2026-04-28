@echo off
echo Starting local server for Election Assistant...
echo Please do not close this window while using the app.
echo.
start "" "http://localhost:8080"
python -m http.server 8080
pause
