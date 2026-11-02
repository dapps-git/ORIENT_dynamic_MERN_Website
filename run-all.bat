@echo off
title ORIENT Energy - Launcher All Services
echo ========================================================
echo   ORIENT ENERGY TRADING COMPANY - STARTING ALL SIDES
echo ========================================================
echo.

:: 1. Check or start MongoDB
echo [1/4] Checking MongoDB (Port 27017)...
powershell -Command "Get-NetTCPConnection -LocalPort 27017 -State Listen -ErrorAction SilentlyContinue" >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo [OK] MongoDB is already running on port 27017.
) else (
    echo [INFO] Starting MongoDB daemon...
    start "ORIENT MongoDB [27017]" "C:\Program Files\MongoDB\Server\8.0\bin\mongod.exe" --dbpath "C:\data\db" --port 27017
    timeout /t 3 >nul
)

:: 2. Start Backend
echo [2/4] Starting Backend API on http://localhost:5000 ...
start "ORIENT Backend [Port 5000]" cmd /k "cd /d %~dp0backend && npm run dev"

:: 3. Start Admin Panel
echo [3/4] Starting Admin Panel on http://localhost:3001 ...
start "ORIENT Admin [Port 3001]" cmd /k "cd /d %~dp0admin && npm run dev"

:: 4. Start Frontend
echo [4/4] Starting Frontend Website on http://localhost:3000 ...
start "ORIENT Frontend [Port 3000]" cmd /k "cd /d %~dp0frontend && npm run dev"

echo.
echo ========================================================
echo   ALL SIDES LAUNCHED SUCCESSFULLY!
echo ========================================================
echo   - Frontend: http://localhost:3000
echo   - Admin:    http://localhost:3001 (orient@adminpanel.com / orient@admin#1234)
echo   - Backend:  http://localhost:5000
echo ========================================================
echo.
pause
