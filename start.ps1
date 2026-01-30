# Script de Inicialização Rápida - SOC Dashboard
# Execute este script após instalar o Docker Desktop

Write-Host "================================" -ForegroundColor Cyan
Write-Host "   SOC Dashboard - Setup" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# Verificar se Docker está instalado
Write-Host "[1/5] Verificando Docker..." -ForegroundColor Yellow
$dockerInstalled = Get-Command docker -ErrorAction SilentlyContinue

if (-not $dockerInstalled) {
    Write-Host "❌ Docker não encontrado!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Por favor, instale o Docker Desktop:" -ForegroundColor Yellow
    Write-Host "https://www.docker.com/products/docker-desktop" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Após instalar, reinicie o computador e execute este script novamente." -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ Docker encontrado!" -ForegroundColor Green
Write-Host ""

# Verificar se Docker está rodando
Write-Host "[2/5] Verificando se Docker está rodando..." -ForegroundColor Yellow
try {
    docker ps | Out-Null
    Write-Host "✅ Docker está rodando!" -ForegroundColor Green
} catch {
    Write-Host "❌ Docker não está rodando!" -ForegroundColor Red
    Write-Host "Por favor, inicie o Docker Desktop e tente novamente." -ForegroundColor Yellow
    exit 1
}
Write-Host ""

# Criar arquivo .env se não existir
Write-Host "[3/5] Configurando variáveis de ambiente..." -ForegroundColor Yellow
if (-not (Test-Path ".env")) {
    Copy-Item "env.example" ".env"
    Write-Host "✅ Arquivo .env criado!" -ForegroundColor Green
} else {
    Write-Host "✅ Arquivo .env já existe!" -ForegroundColor Green
}
Write-Host ""

# Parar containers antigos se existirem
Write-Host "[4/5] Limpando containers antigos..." -ForegroundColor Yellow
docker-compose down -v 2>$null
Write-Host "✅ Limpeza concluída!" -ForegroundColor Green
Write-Host ""

# Iniciar os serviços
Write-Host "[5/5] Iniciando serviços..." -ForegroundColor Yellow
Write-Host "Isso pode levar alguns minutos na primeira vez..." -ForegroundColor Cyan
Write-Host ""

docker-compose up -d

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "================================" -ForegroundColor Green
    Write-Host "   ✅ SUCESSO!" -ForegroundColor Green
    Write-Host "================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "Aguarde 30-60 segundos para todos os serviços iniciarem completamente..." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Em seguida, acesse:" -ForegroundColor Cyan
    Write-Host "  🌐 Frontend: http://localhost" -ForegroundColor White
    Write-Host "  🔐 Login: admin / admin123" -ForegroundColor White
    Write-Host ""
    Write-Host "Para ver os logs:" -ForegroundColor Cyan
    Write-Host "  docker-compose logs -f" -ForegroundColor White
    Write-Host ""
    Write-Host "Para parar os serviços:" -ForegroundColor Cyan
    Write-Host "  docker-compose down" -ForegroundColor White
    Write-Host ""
    
    # Aguardar 10 segundos
    Start-Sleep -Seconds 10
    
    # Verificar status dos containers
    Write-Host "Status dos containers:" -ForegroundColor Cyan
    docker-compose ps
    
    Write-Host ""
    Write-Host "Abrindo navegador em 5 segundos..." -ForegroundColor Yellow
    Start-Sleep -Seconds 5
    Start-Process "http://localhost"
    
} else {
    Write-Host ""
    Write-Host "================================" -ForegroundColor Red
    Write-Host "   ❌ ERRO!" -ForegroundColor Red
    Write-Host "================================" -ForegroundColor Red
    Write-Host ""
    Write-Host "Ocorreu um erro ao iniciar os serviços." -ForegroundColor Red
    Write-Host "Verifique os logs com:" -ForegroundColor Yellow
    Write-Host "  docker-compose logs" -ForegroundColor White
    Write-Host ""
    exit 1
}
