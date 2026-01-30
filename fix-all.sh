#!/bin/bash
# Script de Correção Completa - Dashboard SOC
# Última atualização: 30/01/2026

echo "╔══════════════════════════════════════════════════════════════╗"
echo "║                                                              ║"
echo "║      🚀 CORREÇÃO COMPLETA - Dashboard SOC                   ║"
echo "║                                                              ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""

# Verificar se está no diretório correto
if [ ! -f "docker-compose.yml" ]; then
    echo "❌ Erro: docker-compose.yml não encontrado!"
    echo "Execute no diretório do projeto: /opt/painel ou /opt/soc-dashboard"
    exit 1
fi

echo "[1/7] Parando containers..."
docker compose down
echo "✅ Containers parados"
echo ""

echo "[2/7] Corrigindo Backend Dockerfile..."
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
echo "✅ Backend Dockerfile corrigido"
echo ""

echo "[3/7] Corrigindo Backend tsconfig.json..."
cat > backend/tsconfig.json << 'EOF'
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "moduleResolution": "node",
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "noUnusedLocals": false,
    "noUnusedParameters": false,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
EOF
echo "✅ tsconfig.json corrigido"
echo ""

echo "[4/7] Corrigindo Frontend Dockerfile..."
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
echo "✅ Frontend Dockerfile corrigido"
echo ""

echo "[5/7] Removendo warning do docker-compose.yml..."
sed -i '/^version:/d' docker-compose.yml
echo "✅ Warning removido"
echo ""

echo "[6/7] Limpando cache do Docker (pode demorar)..."
docker system prune -a -f
echo "✅ Cache limpo"
echo ""

echo "[7/7] Reconstruindo containers (8-12 minutos)..."
echo "⏳ Aguarde... Não interrompa o processo!"
echo ""

docker compose up -d --build

if [ $? -eq 0 ]; then
    echo ""
    echo "╔══════════════════════════════════════════════════════════════╗"
    echo "║                                                              ║"
    echo "║      ✅ SUCESSO! Containers reconstruídos                   ║"
    echo "║                                                              ║"
    echo "╚══════════════════════════════════════════════════════════════╝"
    echo ""
    echo "Aguarde 30-60 segundos para todos os serviços iniciarem..."
    echo ""
    sleep 10
    echo "Status dos containers:"
    docker compose ps
    echo ""
    echo "Para ver os logs:"
    echo "  docker compose logs -f"
    echo ""
    echo "Acesse no navegador:"
    echo "  http://$(hostname -I | awk '{print $1}')"
    echo ""
    echo "Login: admin"
    echo "Senha: admin123"
    echo ""
else
    echo ""
    echo "╔══════════════════════════════════════════════════════════════╗"
    echo "║                                                              ║"
    echo "║      ❌ ERRO durante o build                                ║"
    echo "║                                                              ║"
    echo "╚══════════════════════════════════════════════════════════════╝"
    echo ""
    echo "Verifique os logs:"
    echo "  docker compose logs backend"
    echo "  docker compose logs frontend"
    echo ""
    exit 1
fi
