#!/bin/bash
# Script de Correção - Erro npm ci no Docker Build

echo "=================================================="
echo "  Correção: Erro 'npm ci' no Docker Build"
echo "=================================================="
echo ""

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Diretório do projeto
PROJECT_DIR="/opt/painel"

# Verificar se está no diretório correto
if [ ! -f "docker-compose.yml" ]; then
    echo -e "${RED}❌ Erro: docker-compose.yml não encontrado!${NC}"
    echo "Execute este script no diretório do projeto:"
    echo "  cd $PROJECT_DIR"
    echo "  ./fix-npm-error.sh"
    exit 1
fi

echo -e "${YELLOW}[1/5] Parando containers existentes...${NC}"
docker compose down
echo -e "${GREEN}✅ Containers parados${NC}"
echo ""

echo -e "${YELLOW}[2/5] Corrigindo Dockerfile do Backend...${NC}"
cat > backend/Dockerfile << 'EOF'
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

RUN npm prune --omit=dev

EXPOSE 3000

CMD ["node", "dist/server.js"]
EOF
echo -e "${GREEN}✅ Backend Dockerfile corrigido${NC}"
echo ""

echo -e "${YELLOW}[3/5] Corrigindo Dockerfile do Frontend...${NC}"
cat > frontend/Dockerfile << 'EOF'
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
EOF
echo -e "${GREEN}✅ Frontend Dockerfile corrigido${NC}"
echo ""

echo -e "${YELLOW}[4/5] Removendo linha 'version' do docker-compose.yml...${NC}"
if grep -q "^version:" docker-compose.yml; then
    sed -i '/^version:/d' docker-compose.yml
    echo -e "${GREEN}✅ Linha 'version' removida${NC}"
else
    echo -e "${GREEN}✅ Linha 'version' já estava ausente${NC}"
fi
echo ""

echo -e "${YELLOW}[5/5] Limpando cache do Docker...${NC}"
docker system prune -f
echo -e "${GREEN}✅ Cache limpo${NC}"
echo ""

echo "=================================================="
echo -e "  ${GREEN}✅ Correções aplicadas com sucesso!${NC}"
echo "=================================================="
echo ""
echo "Agora execute:"
echo -e "${YELLOW}  docker compose up -d --build${NC}"
echo ""
echo "Para monitorar o processo:"
echo -e "${YELLOW}  docker compose logs -f${NC}"
echo ""
