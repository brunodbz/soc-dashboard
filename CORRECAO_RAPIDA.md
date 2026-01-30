# 🚀 CORREÇÃO RÁPIDA - Executar no Ubuntu

## ⚡ Comandos Rápidos (Copie e Cole)

```bash
cd /opt/painel

# Parar containers
docker compose down

# Corrigir Backend Dockerfile
cat > backend/Dockerfile << 'EOF'
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["node", "dist/server.js"]
EOF

# Corrigir Frontend Dockerfile
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

# Remover warning do version
sed -i '/^version:/d' docker-compose.yml

# Limpar cache
docker system prune -f

# Reconstruir
docker compose up -d --build

# Ver logs
docker compose logs -f
```

## ✅ O que foi feito:

1. ✅ Mudou `npm ci` para `npm install` no backend
2. ✅ Mudou `npm ci` para `npm install` no frontend  
3. ✅ Removeu linha `version:` do docker-compose.yml
4. ✅ Limpou cache do Docker

## 📊 Verificar se funcionou:

```bash
# Status dos containers (todos devem estar "Up")
docker compose ps

# Testar acesso
curl http://localhost
```

## 🌐 Acessar no navegador:

```
http://IP_DO_SEU_SERVIDOR
```

Login: `admin` / `admin123`

---

**Tempo estimado**: 5-10 minutos para build completo
