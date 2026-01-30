# Script de Parada - SOC Dashboard

Write-Host "================================" -ForegroundColor Cyan
Write-Host "   SOC Dashboard - Stop" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Parando todos os serviços..." -ForegroundColor Yellow
docker-compose down

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✅ Todos os serviços foram parados!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Para iniciar novamente, execute:" -ForegroundColor Cyan
    Write-Host "  .\start.ps1" -ForegroundColor White
    Write-Host ""
    Write-Host "Para remover também os volumes (CUIDADO: apaga dados do banco):" -ForegroundColor Yellow
    Write-Host "  docker-compose down -v" -ForegroundColor White
    Write-Host ""
} else {
    Write-Host ""
    Write-Host "❌ Erro ao parar os serviços!" -ForegroundColor Red
    Write-Host ""
}
