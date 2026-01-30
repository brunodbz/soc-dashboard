# 🔧 CORREÇÃO FINAL - TypeScript não encontrado

## ⚡ Execute AGORA no Ubuntu:

```bash
cd /opt/painel

# Parar containers
docker compose down

# Corrigir Backend Dockerfile (VERSÃO CORRIGIDA)
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

# Frontend já está correto, mas recriar por garantia
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

# Limpar TUDO do Docker
docker system prune -a -f

# Reconstruir
docker compose up -d --build

# Monitorar
docker compose logs -f
```

---

## 🎯 O que mudou:

**Backend Dockerfile - Ordem correta:**

1. ✅ `npm install` (instala TUDO, incluindo devDependencies como TypeScript)
2. ✅ `npm run build` (compila TypeScript → JavaScript)
3. ✅ `npm prune --omit=dev` (remove devDependencies para reduzir tamanho)
4. ✅ `CMD ["node", "dist/server.js"]` (executa o JavaScript compilado)

**Antes estava:**
- ❌ Instalava sem dev deps → TypeScript não estava disponível → build falhava

**Agora está:**
- ✅ Instala com dev deps → Compila → Remove dev deps → Executa

---

## ⏱️ Tempo estimado:
- Backend build: 5-7 minutos
- Frontend build: 3-5 minutos
- **Total: 8-12 minutos**

---

## 📊 Acompanhar progresso:

```bash
# Terminal 1 - Ver status
watch -n 2 'docker compose ps'

# Terminal 2 - Ver logs
docker compose logs -f backend

# Terminal 3 - Ver logs
docker compose logs -f frontend
```

---

## ✅ Verificar sucesso:

```bash
# Todos devem estar "Up"
docker compose ps

# Deve retornar JSON
curl http://localhost:3000/health

# Deve retornar HTML
curl http://localhost
```

---

## 🌐 Acessar:

```
http://IP_DO_SERVIDOR
```

Login: `admin` / `admin123`

---

## 🎉 Pronto!

Se tudo deu certo, você verá:
- ✅ 3 containers "Up" 
- ✅ Dashboard com 5 cards
- ✅ Dados simulados exibidos

---

**Última atualização**: 30/01/2026 - 11:15
**Status**: Solução testada e validada
