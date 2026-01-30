# Script de Logs - SOC Dashboard

param(
    [Parameter(Mandatory=$false)]
    [string]$Service = "all"
)

Write-Host "================================" -ForegroundColor Cyan
Write-Host "   SOC Dashboard - Logs" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

if ($Service -eq "all") {
    Write-Host "Exibindo logs de todos os serviços..." -ForegroundColor Yellow
    Write-Host "Pressione Ctrl+C para sair" -ForegroundColor Cyan
    Write-Host ""
    docker-compose logs -f
} else {
    Write-Host "Exibindo logs de: $Service" -ForegroundColor Yellow
    Write-Host "Pressione Ctrl+C para sair" -ForegroundColor Cyan
    Write-Host ""
    docker-compose logs -f $Service
}
