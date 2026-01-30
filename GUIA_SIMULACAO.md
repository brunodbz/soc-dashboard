# 🧪 Guia de Simulação Local (Windows)

## ⚠️ IMPORTANTE
Este guia é para testar **localmente no Windows** antes de enviar para o servidor Ubuntu.

---

## Pré-requisitos Windows

- Docker Desktop instalado e rodando
- Git Bash ou PowerShell
- Porta 80 e 3000 livres

---

## 🔧 Passo 1: Parar containers existentes

```powershell
docker compose down
docker system prune -a -f
```

---

## 🔧 Passo 2: Verificar arquivos corrigidos

Certifique-se de que os seguintes arquivos têm as correções:

### `frontend\tsconfig.json` linha 8:
```json
"types": ["vite/client"],
```
❌ NÃO DEVE TER `"node"` aqui!

### `frontend\src\hooks\usePolling.ts` linha 11:
```typescript
const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
```
❌ NÃO DEVE TER `NodeJS.Timeout`!

### `backend\tsconfig.json` linhas 20-21:
```json
"noUnusedLocals": false,
"noUnusedParameters": false,
```

### `frontend\tsconfig.json` linhas 18-19:
```json
"noUnusedLocals": false,
"noUnusedParameters": false,
```

### `backend\Dockerfile` linha 6 e `frontend\Dockerfile` linha 4:
```dockerfile
RUN npm install
```
❌ NÃO DEVE SER `npm ci`!

---

## 🚀 Passo 3: Build local

```powershell
docker compose up -d --build
```

---

## 📊 Passo 4: Monitorar logs

```powershell
docker compose logs -f
```

### ✅ O que você DEVE ver:

**Backend:**
```
soc-backend | Servidor rodando na porta 3000
soc-backend | Conectado ao PostgreSQL
```

**Frontend:**
```
soc-frontend | ✓ built in XXXms
soc-frontend | dist/index.html
```

**Database:**
```
soc-db | database system is ready to accept connections
```

### ❌ O que NÃO DEVE aparecer:

- `error TS2688: Cannot find type definition file for 'node'`
- `error TS2503: Cannot find namespace 'NodeJS'`
- `error TS6133: 'req' is declared but its value is never read`
- `error TS2339: Property 'env' does not exist on type 'ImportMeta'`
- `npm error The 'npm ci' command can only install`

Pressione `Ctrl+C` para sair dos logs.

---

## 🔍 Passo 5: Verificar status

```powershell
docker compose ps
```

Deve mostrar:
```
NAME           STATUS         PORTS
soc-backend    Up             0.0.0.0:3000->3000/tcp
soc-db         Up (healthy)   0.0.0.0:5432->5432/tcp
soc-frontend   Up             0.0.0.0:80->80/tcp
```

---

## 🌐 Passo 6: Testar no navegador

Abra: http://localhost

**Login:**
- Usuário: `admin`
- Senha: `admin123`

### ✅ O que testar:

1. ✅ Página de login carrega
2. ✅ Após login, dashboard aparece com 5 cards
3. ✅ Cards mostram dados simulados (mocks)
4. ✅ Severidade aparece com cores (vermelho/amarelo/azul)
5. ✅ Navegação para "Painel de Controle" funciona
6. ✅ Formulário de configuração aparece

---

## 🐛 Troubleshooting Local

### Problema: "Port 80 is already allocated"
```powershell
# Descobrir o que está usando a porta 80
netstat -ano | findstr :80

# Parar o processo (substitua PID pelo número encontrado)
taskkill /PID <PID> /F

# Ou altere a porta no docker-compose.yml:
# ports:
#   - "8080:80"
```

### Problema: Docker Desktop não inicia
1. Abra Docker Desktop
2. Settings → Resources → Alocar mais RAM (mínimo 4GB)
3. Restart Docker Desktop

### Problema: Containers param imediatamente
```powershell
# Ver logs de erro
docker compose logs backend
docker compose logs frontend
docker compose logs postgres
```

---

## 🔄 Passo 7: Limpar tudo (se necessário)

```powershell
docker compose down -v
docker system prune -a --volumes -f
docker compose up -d --build
```

---

## ✅ Passo 8: Quando tudo funcionar localmente

**ENTÃO** copie o comando único do arquivo `SOLUCAO_DEFINITIVA.txt` e execute no servidor Ubuntu remoto.

---

## 📋 Checklist Final Local

- [ ] `docker compose ps` mostra todos "Up"
- [ ] Logs não mostram erros TypeScript
- [ ] http://localhost abre a tela de login
- [ ] Login funciona (admin/admin123)
- [ ] Dashboard mostra 5 cards com dados
- [ ] Painel de Controle acessível
- [ ] Console do navegador sem erros críticos (F12)

---

## 🚀 Deploy no Servidor Ubuntu

Somente após TODOS os itens do checklist estarem ✅:

1. Acesse o servidor Ubuntu via SSH
2. Copie e cole TODO o conteúdo de `SOLUCAO_DEFINITIVA.txt`
3. Aguarde 12-15 minutos
4. Acesse via IP do servidor

---

## 💡 Dica Final

Se funcionar localmente mas falhar no servidor:
- Verifique firewall (porta 80)
- Verifique Docker instalado no Ubuntu
- Verifique permissões de arquivo (`chmod +x`)
- Compare versões do Docker (`docker --version`)
