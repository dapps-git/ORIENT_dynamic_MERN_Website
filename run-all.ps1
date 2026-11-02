Write-Host "========================================================" -ForegroundColor Cyan
Write-Host "   ORIENT ENERGY TRADING COMPANY - STARTING ALL SIDES" -ForegroundColor Cyan
Write-Host "========================================================" -ForegroundColor Cyan

# 1. MongoDB
$mongoCheck = Get-NetTCPConnection -LocalPort 27017 -State Listen -ErrorAction SilentlyContinue
if ($mongoCheck) {
    Write-Host "[OK] MongoDB is running on port 27017" -ForegroundColor Green
} else {
    Write-Host "[INFO] Starting MongoDB on port 27017..." -ForegroundColor Yellow
    Start-Process -FilePath "C:\Program Files\MongoDB\Server\8.0\bin\mongod.exe" -ArgumentList "--dbpath C:\data\db --port 27017"
    Start-Sleep -Seconds 3
}

# 2. Backend
$root = $PSScriptRoot
Write-Host "[INFO] Starting Backend API on http://localhost:5000..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit -Command Set-Location '$root\backend'; npm run dev"

# 3. Admin
Write-Host "[INFO] Starting Admin Panel on http://localhost:3001..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit -Command Set-Location '$root\admin'; npm run dev"

# 4. Frontend
Write-Host "[INFO] Starting Frontend Website on http://localhost:3000..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit -Command Set-Location '$root\frontend'; npm run dev"

Write-Host "========================================================" -ForegroundColor Green
Write-Host "   ALL SIDES LAUNCHED SUCCESSFULLY!" -ForegroundColor Green
Write-Host "   - Frontend: http://localhost:3000" -ForegroundColor White
Write-Host "   - Admin:    http://localhost:3001" -ForegroundColor White
Write-Host "   - Backend:  http://localhost:5000" -ForegroundColor White
Write-Host "========================================================" -ForegroundColor Green
