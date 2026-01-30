#!/bin/bash
# Script para verificar e iniciar o Docker no Linux

echo "==================================="
echo "  Diagnóstico e Correção do Docker"
echo "==================================="
echo ""

# Verificar se Docker está instalado
echo "[1/5] Verificando se Docker está instalado..."
if ! command -v docker &> /dev/null; then
    echo "❌ Docker não está instalado!"
    echo ""
    echo "Para instalar, execute:"
    echo "  curl -fsSL https://get.docker.com -o get-docker.sh"
    echo "  sudo sh get-docker.sh"
    echo ""
    exit 1
fi

echo "✅ Docker está instalado: $(docker --version)"
echo ""

# Verificar status do serviço Docker
echo "[2/5] Verificando status do serviço Docker..."
if sudo systemctl is-active --quiet docker; then
    echo "✅ Docker daemon está rodando"
else
    echo "❌ Docker daemon NÃO está rodando"
    echo "Tentando iniciar..."
    sudo systemctl start docker
    
    if sudo systemctl is-active --quiet docker; then
        echo "✅ Docker iniciado com sucesso!"
    else
        echo "❌ Falha ao iniciar Docker"
        echo "Verificando logs:"
        sudo journalctl -u docker -n 20 --no-pager
        exit 1
    fi
fi
echo ""

# Verificar se o usuário está no grupo docker
echo "[3/5] Verificando permissões do usuário..."
if groups $USER | grep -q docker; then
    echo "✅ Usuário está no grupo docker"
else
    echo "⚠️  Usuário NÃO está no grupo docker"
    echo "Adicionando usuário ao grupo..."
    sudo usermod -aG docker $USER
    echo "✅ Usuário adicionado ao grupo docker"
    echo ""
    echo "⚠️  IMPORTANTE: Você precisa fazer logout e login novamente para aplicar as mudanças!"
    echo "Ou execute: newgrp docker"
fi
echo ""

# Testar Docker
echo "[4/5] Testando Docker..."
if sudo docker ps &> /dev/null; then
    echo "✅ Docker funcionando corretamente"
    echo ""
    echo "Containers rodando:"
    sudo docker ps
else
    echo "❌ Docker não está respondendo"
    echo "Logs recentes:"
    sudo journalctl -u docker -n 20 --no-pager
    exit 1
fi
echo ""

# Habilitar inicialização automática
echo "[5/5] Habilitando inicialização automática..."
sudo systemctl enable docker
echo "✅ Docker configurado para iniciar automaticamente"
echo ""

echo "==================================="
echo "  ✅ Docker está pronto para uso!"
echo "==================================="
echo ""
echo "Execute novamente:"
echo "  cd /opt/painel"
echo "  docker compose up -d --build"
echo ""
