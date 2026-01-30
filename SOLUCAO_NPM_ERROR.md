# 🔧 Solução para Erro "npm ci" no Docker Build

## 📋 Problema

Erro ao executar `docker compose up -d --build`:

```
npm error The `npm ci` command can only install with an existing package-lock.json
```

---

## ✅ Solução Rápida (Recomendada)

### No servidor Ubuntu, execute:

```bash
# 1. Entrar no diretório do projeto
cd /opt/painel
# ou
cd /opt/soc-dashboard

# 2. Parar containers existentes
docker compose down

# 3. Editar Dockerfile do Backend
nano backend/Dockerfile
```

**Mude a linha 6 de:**
```dockerfile
RUN npm ci --only=production
```

**Para:**
```dockerfile
RUN npm install --omit=dev
```

**Salvar**: `Ctrl+O`, `Enter`, `Ctrl+X`

---

```bash
# 4. Editar Dockerfile do Frontend
nano frontend/Dockerfile
```

**Mude a linha 6 de:**
```dockerfile
RUN npm ci
```

**Para:**
```dockerfile
RUN npm install
```

**Salvar**: `Ctrl+O`, `Enter`, `Ctrl+X`

---

```bash
# 5. Remover aviso do docker-compose.yml
nano docker-compose.yml
```

**Delete a primeira linha que diz:**
```yaml
version: '3.8'
```

**Salvar**: `Ctrl+O`, `Enter`, `Ctrl+X`

---

```bash
# 6. Limpar cache do Docker
docker system prune -f

# 7. Reconstruir e iniciar
docker compose up -d --build

# 8. Monitorar logs
docker compose logs -f
```

---

## 🚀 Solução Automatizada

### Método 1: Usar Script Pronto

**No Windows (onde você tem os arquivos):**

Os Dockerfiles já foram corrigidos automaticamente!

**Envie os arquivos atualizados para o servidor:**

```bash
# No servidor Ubuntu, baixe os arquivos corrigidos
# Ou use SCP/WinSCP para enviar:
# - backend/Dockerfile
# - frontend/Dockerfile
```

---

**No servidor Ubuntu:**

```bash
cd /opt/painel

# Baixar script de correção (ou criar manualmente)
nano fix-npm-error.sh
```

**Cole o conteúdo do script, salve e execute:**

```bash
chmod +x fix-npm-error.sh
./fix-npm-error.sh
```

---

## 📊 Diferença entre `npm ci` e `npm install`

### `npm ci` (Clean Install)
- ✅ Mais rápido em ambientes de CI/CD
- ✅ Garante instalações determinísticas
- ❌ **Requer** `package-lock.json`
- Uso: Produção com lock file

### `npm install`
- ✅ Mais flexível
- ✅ Funciona sem `package-lock.json`
- ✅ Gera `package-lock.json` automaticamente
- Uso: Desenvolvimento ou quando lock file não existe

**Para este projeto**, como não temos os `package-lock.json` commitados, usamos `npm install`.

---

## 🔄 Alternativa: Gerar package-lock.json

Se você preferir usar `npm ci` (mais profissional), gere os lock files:

### No Windows (seu computador):

```powershell
# Backend
cd C:\Users\Bruno\OneDrive\Documentos2\soc-dashboad\backend
npm install
# Isso gera package-lock.json

# Frontend
cd C:\Users\Bruno\OneDrive\Documentos2\soc-dashboad\frontend
npm install
# Isso gera package-lock.json
```

**Depois envie os arquivos `package-lock.json` para o servidor:**
- `backend/package-lock.json`
- `frontend/package-lock.json`

**No servidor, reconstrua:**

```bash
cd /opt/painel
docker compose up -d --build
```

---

## 🐛 Possíveis Erros Adicionais

### Erro: "Cannot find module 'typescript'"

**Solução**: Adicione typescript como dependência.

```bash
# No diretório backend ou frontend
nano package.json
```

Certifique-se de que `typescript` está em `devDependencies`.

---

### Erro: "EACCES: permission denied"

**Solução**: Ajustar permissões.

```bash
sudo chown -R $USER:$USER /opt/painel
```

---

### Erro: "Out of memory" durante build

**Solução**: Aumentar memória do Docker ou do sistema.

```bash
# Ver memória disponível
free -h

# Limpar cache
docker system prune -a -f
```

---

## ✅ Verificação Final

Após executar `docker compose up -d --build`, verifique:

```bash
# 1. Status dos containers
docker compose ps
```

**Deve mostrar:**
```
NAME            STATUS          PORTS
soc-backend     Up X minutes    0.0.0.0:3000->3000/tcp
soc-db          Up X minutes    0.0.0.0:5432->5432/tcp
soc-frontend    Up X minutes    0.0.0.0:80->80/tcp
```

```bash
# 2. Logs (verificar se não há erros)
docker compose logs backend
docker compose logs frontend

# 3. Testar acesso
curl http://localhost/
curl http://localhost:3000/health
```

**Se tudo estiver "Up" e sem erros nos logs, sucesso!** ✅

---

## 🌐 Acessar a Aplicação

**No navegador:**
```
http://IP_DO_SERVIDOR
```

**Login:**
- Usuário: `admin`
- Senha: `admin123`

---

## 📝 Resumo dos Comandos

```bash
# Solução completa em comandos únicos
cd /opt/painel
docker compose down
sed -i '6s/.*/RUN npm install --omit=dev/' backend/Dockerfile
sed -i '6s/.*/RUN npm install/' frontend/Dockerfile
sed -i '/^version:/d' docker-compose.yml
docker system prune -f
docker compose up -d --build
docker compose logs -f
```

---

## 🔍 Diagnóstico Completo

Se ainda tiver problemas, execute:

```bash
# Informações do sistema
{
    echo "=== Sistema ==="
    uname -a
    echo ""
    
    echo "=== Docker ==="
    docker --version
    docker compose version
    echo ""
    
    echo "=== Arquivos ==="
    ls -la backend/Dockerfile
    ls -la frontend/Dockerfile
    ls -la docker-compose.yml
    echo ""
    
    echo "=== Conteúdo Dockerfile Backend ==="
    cat backend/Dockerfile
    echo ""
    
    echo "=== Conteúdo Dockerfile Frontend ==="
    cat frontend/Dockerfile
    echo ""
    
    echo "=== Containers ==="
    docker compose ps
    echo ""
    
    echo "=== Logs Backend ==="
    docker compose logs backend --tail=50
    echo ""
    
    echo "=== Logs Frontend ==="
    docker compose logs frontend --tail=50
    echo ""
    
} > diagnostico-npm-error.txt

cat diagnostico-npm-error.txt
```

Envie `diagnostico-npm-error.txt` se precisar de mais ajuda.

---

**Última atualização**: 30 de Janeiro de 2026
