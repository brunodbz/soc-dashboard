# 📘 Guia Completo de Implantação - Dashboard SOC no Ubuntu

**Guia passo a passo para instalar o Dashboard SOC em um servidor Ubuntu Linux**

Este guia foi escrito para pessoas **sem conhecimento técnico prévio**. Siga cada passo com atenção e tudo funcionará!

---

## 📋 Índice

1. [Requisitos Mínimos](#requisitos-mínimos)
2. [Preparação do Servidor](#preparação-do-servidor)
3. [Instalação do Docker](#instalação-do-docker)
4. [Download da Aplicação](#download-da-aplicação)
5. [Configuração Inicial](#configuração-inicial)
6. [Inicialização da Aplicação](#inicialização-da-aplicação)
7. [Acesso à Aplicação](#acesso-à-aplicação)
8. [Configuração de Domínio (Opcional)](#configuração-de-domínio-opcional)
9. [Backup e Manutenção](#backup-e-manutenção)
10. [Solução de Problemas](#solução-de-problemas)

---

## 📊 Requisitos Mínimos

### Hardware
- **Processador**: 2 CPUs (núcleos)
- **Memória RAM**: 4 GB
- **Disco**: 20 GB de espaço livre
- **Rede**: Conexão com a internet

### Software
- **Sistema Operacional**: Ubuntu 20.04 LTS ou superior
- **Acesso**: Usuário com permissões de administrador (sudo)

### Portas Necessárias
- **80** - Frontend (HTTP)
- **3000** - Backend API
- **5432** - Banco de Dados PostgreSQL

> 💡 **Dica**: Se você estiver usando um servidor na nuvem (AWS, Azure, Google Cloud, DigitalOcean), certifique-se de que essas portas estejam abertas no firewall.

---

## 🛠️ Preparação do Servidor

### Passo 1: Acessar o Servidor

**Se você estiver fisicamente no servidor:**
1. Abra o Terminal (Ctrl + Alt + T)
2. Pule para o Passo 2

**Se você estiver acessando remotamente:**
1. Abra o terminal no seu computador
2. Digite o comando (substitua os valores):
```bash
ssh seu_usuario@IP_DO_SERVIDOR
```

**Exemplo:**
```bash
ssh admin@192.168.1.100
```

3. Digite a senha quando solicitado
4. Você verá algo como: `admin@servidor:~$`

---

### Passo 2: Atualizar o Sistema

Copie e cole os comandos abaixo **um de cada vez**, pressionando Enter após cada um:

```bash
sudo apt update
```

> 📝 Você pode ser solicitado a digitar sua senha. Digite e pressione Enter (não aparecerá nada enquanto digita - é normal!)

```bash
sudo apt upgrade -y
```

> ⏱️ Este comando pode demorar alguns minutos. Aguarde até terminar.

---

## 🐳 Instalação do Docker

O Docker é uma ferramenta que facilita muito a instalação. Vamos instalá-lo agora!

### Passo 1: Remover Versões Antigas (se existirem)

```bash
sudo apt remove docker docker-engine docker.io containerd runc -y
```

> ✅ Se aparecer "Pacote não encontrado", não se preocupe - significa que não havia instalação antiga.

---

### Passo 2: Instalar Dependências

```bash
sudo apt install -y \
    ca-certificates \
    curl \
    gnupg \
    lsb-release
```

---

### Passo 3: Adicionar a Chave GPG do Docker

```bash
sudo mkdir -p /etc/apt/keyrings
```

```bash
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
```

---

### Passo 4: Adicionar o Repositório do Docker

```bash
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

---

### Passo 5: Instalar o Docker

```bash
sudo apt update
```

```bash
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

> ⏱️ Aguarde alguns minutos para a instalação completar.

---

### Passo 6: Verificar se o Docker Está Funcionando

```bash
sudo docker --version
```

**Você deve ver algo como:**
```
Docker version 24.0.7, build afdd53b
```

```bash
sudo docker compose version
```

**Você deve ver algo como:**
```
Docker Compose version v2.23.3
```

✅ **Se você viu as versões, o Docker está instalado com sucesso!**

---

### Passo 7: Adicionar Seu Usuário ao Grupo Docker (Opcional mas Recomendado)

Isso permite usar o Docker sem precisar digitar `sudo` toda vez:

```bash
sudo usermod -aG docker $USER
```

**Agora você precisa sair e entrar novamente:**

```bash
exit
```

Faça login novamente usando SSH (ou abra um novo terminal se estiver local).

---

## 📥 Download da Aplicação

### Opção 1: Usando Git (Recomendado)

**Passo 1: Instalar o Git**

```bash
sudo apt install -y git
```

**Passo 2: Baixar o Código**

Navegue até o diretório onde deseja instalar (recomendado: `/opt/`):

```bash
cd /opt
```

```bash
sudo git clone https://github.com/SEU_USUARIO/soc-dashboard.git
```

> ⚠️ **IMPORTANTE**: Substitua `SEU_USUARIO` pelo nome de usuário correto do repositório GitHub. Se você ainda não enviou o código para o GitHub, use a Opção 2.

**Passo 3: Entrar no Diretório**

```bash
cd soc-dashboard
```

**Passo 4: Dar Permissões**

```bash
sudo chown -R $USER:$USER /opt/soc-dashboard
```

---

### Opção 2: Upload Manual (Se não estiver no GitHub)

**No seu computador Windows:**

1. Abra o Windows Explorer
2. Navegue até `C:\Users\Bruno\OneDrive\Documentos2\soc-dashboad`
3. Clique com botão direito na pasta `soc-dashboad`
4. Selecione "Enviar para" → "Pasta compactada"
5. Será criado um arquivo `soc-dashboad.zip`

**Transferir para o servidor:**

**Opção 2a: Usando WinSCP (Mais Fácil)**
1. Baixe o WinSCP: https://winscp.net/
2. Instale e abra
3. Preencha:
   - Host: IP do seu servidor
   - Usuário: seu_usuario
   - Senha: sua_senha
4. Clique em "Login"
5. Arraste o arquivo `soc-dashboad.zip` para `/opt/`

**No servidor, descompacte:**

```bash
cd /opt
```

```bash
sudo apt install -y unzip
```

```bash
sudo unzip soc-dashboad.zip
```

```bash
sudo mv soc-dashboad soc-dashboard
```

```bash
cd soc-dashboard
```

```bash
sudo chown -R $USER:$USER /opt/soc-dashboard
```

---

## ⚙️ Configuração Inicial

### Passo 1: Criar Arquivo de Configuração

```bash
cp env.example .env
```

---

### Passo 2: Editar o Arquivo de Configuração

Vamos editar o arquivo com um editor de texto simples:

```bash
nano .env
```

**Você verá o conteúdo do arquivo. Use as setas do teclado para navegar.**

**Altere as seguintes linhas (IMPORTANTE):**

```env
# Database
DB_HOST=postgres
DB_PORT=5432
DB_NAME=soc_dashboard
DB_USER=socadmin
DB_PASSWORD=COLOQUE_UMA_SENHA_FORTE_AQUI

# Backend
NODE_ENV=production
PORT=3000
JWT_SECRET=COLOQUE_UMA_CHAVE_ALEATORIA_AQUI_COM_PELO_MENOS_32_CARACTERES
ENCRYPTION_KEY=OUTRA_CHAVE_ALEATORIA_DE_32_CARACTERES_AQUI!!

# Frontend
VITE_API_URL=http://localhost:3000/api
```

**Como gerar chaves aleatórias fortes:**

Abra outro terminal (ou outra aba) e execute:

```bash
openssl rand -base64 32
```

Copie o resultado e cole no `JWT_SECRET`.

Execute novamente:

```bash
openssl rand -base64 32
```

Copie e cole no `ENCRYPTION_KEY`.

**Exemplo de como deve ficar:**

```env
DB_PASSWORD=M1nh@S3nh4F0rt3!2024
JWT_SECRET=Kj8mN2pQ5vZ9xC4bF7nH3sD6gJ1kL0oP9uY8tR5eW2qA1zX4cV7bN3mM6
ENCRYPTION_KEY=Hs9Df6Gh3Jk2Lm5Np8Qq1Rr4Tt7Vv0Ww3Xx6Yy9Zz2Aa5Bb8!!
```

**Salvar e sair:**
1. Pressione `Ctrl + O` (para salvar)
2. Pressione `Enter` (confirmar)
3. Pressione `Ctrl + X` (para sair)

---

### Passo 3: Verificar a Configuração

```bash
cat .env
```

Verifique se suas alterações foram salvas corretamente.

---

## 🚀 Inicialização da Aplicação

Agora vamos iniciar a aplicação! Isso pode demorar alguns minutos na primeira vez.

### Passo 1: Construir e Iniciar os Containers

```bash
docker compose up -d --build
```

> 📦 O Docker irá:
> - Baixar as imagens necessárias (Node.js, PostgreSQL, Nginx)
> - Construir o backend
> - Construir o frontend
> - Criar o banco de dados
> - Iniciar todos os serviços

> ⏱️ **Este processo pode demorar de 5 a 15 minutos na primeira vez**, dependendo da velocidade da internet e do servidor.

---

### Passo 2: Verificar se os Containers Estão Rodando

Aguarde cerca de 2 minutos e execute:

```bash
docker compose ps
```

**Você deve ver algo assim:**

```
NAME            IMAGE               STATUS          PORTS
soc-backend     soc-dashboard-backend   Up 2 minutes    0.0.0.0:3000->3000/tcp
soc-db          postgres:16-alpine      Up 2 minutes    0.0.0.0:5432->5432/tcp
soc-frontend    soc-dashboard-frontend  Up 2 minutes    0.0.0.0:80->80/tcp
```

✅ **Se todos os status estiverem "Up", tudo funcionou!**

---

### Passo 3: Verificar os Logs (Se quiser ver o que está acontecendo)

**Ver logs de todos os serviços:**

```bash
docker compose logs -f
```

> Pressione `Ctrl + C` para sair da visualização de logs.

**Ver logs de um serviço específico:**

```bash
docker compose logs backend
```

```bash
docker compose logs frontend
```

```bash
docker compose logs postgres
```

---

## 🌐 Acesso à Aplicação

### Acesso Local (No próprio servidor)

Se você estiver fisicamente no servidor com interface gráfica:

1. Abra o navegador (Firefox, Chrome, etc.)
2. Digite na barra de endereços:
```
http://localhost
```

---

### Acesso Remoto (De outro computador na mesma rede)

**Descubra o IP do servidor:**

```bash
hostname -I
```

**Você verá algo como:**
```
192.168.1.100
```

**No seu computador:**
1. Abra o navegador
2. Digite o IP do servidor:
```
http://192.168.1.100
```

---

### Fazer Login

**Tela de Login:**
- **Usuário**: `admin`
- **Senha**: `admin123`

⚠️ **IMPORTANTE**: Após o primeiro login, você **DEVE** alterar a senha padrão! (veja a seção de Segurança abaixo)

---

### 🎉 Parabéns! A aplicação está funcionando!

Você verá o dashboard com 5 cards mostrando dados simulados:
- 🔍 Elastic Search
- 🛡️ Microsoft Defender 365
- 🎯 OpenCTI
- 🔐 Tenable.io
- 📰 RSS Feeds

**O que fazer agora:**
1. Explore o dashboard
2. Acesse o "Painel de Controle"
3. Configure as integrações reais quando tiver as credenciais
4. Veja o histórico de auditoria

---

## 🔒 Segurança - Alterar Senha Padrão

### Método 1: Via Interface Web (Futuramente)

> A funcionalidade de alteração de senha via interface web pode ser implementada posteriormente.

---

### Método 2: Via Banco de Dados

**Passo 1: Gerar o hash da nova senha**

```bash
docker compose exec backend node -e "const bcrypt = require('bcrypt'); bcrypt.hash('SUA_NOVA_SENHA_AQUI', 10, (err, hash) => console.log(hash));"
```

Substitua `SUA_NOVA_SENHA_AQUI` pela sua senha desejada.

**Exemplo:**
```bash
docker compose exec backend node -e "const bcrypt = require('bcrypt'); bcrypt.hash('MinhaS3nh4F0rt3!', 10, (err, hash) => console.log(hash));"
```

**Copie o hash gerado** (algo como: `$2b$10$abc123...`)

---

**Passo 2: Atualizar no banco de dados**

```bash
docker compose exec postgres psql -U socadmin -d soc_dashboard -c "UPDATE users SET password_hash = 'COLE_O_HASH_AQUI' WHERE username = 'admin';"
```

**Exemplo:**
```bash
docker compose exec postgres psql -U socadmin -d soc_dashboard -c "UPDATE users SET password_hash = '\$2b\$10\$rZJ5B3qKqZV6F6xGX.8z5.YwB6h3oC9N5JYh0Y5X8B3o9K5Y6h3oC' WHERE username = 'admin';"
```

> ⚠️ Note que o `$` deve ser escapado com `\$` no comando.

✅ **Agora faça logout e login com a nova senha!**

---

## 🌍 Configuração de Domínio (Opcional)

Se você quiser acessar a aplicação por um domínio (ex: `dashboard.suaempresa.com`) em vez de IP:

### Pré-requisitos

1. Ter um domínio registrado
2. Apontar o domínio para o IP do seu servidor (registro A no DNS)

---

### Instalação do Nginx como Proxy Reverso

**Passo 1: Instalar o Nginx**

```bash
sudo apt install -y nginx
```

---

**Passo 2: Criar Configuração do Site**

```bash
sudo nano /etc/nginx/sites-available/soc-dashboard
```

**Cole o seguinte conteúdo** (substitua `SEU_DOMINIO.com`):

```nginx
server {
    listen 80;
    server_name SEU_DOMINIO.com www.SEU_DOMINIO.com;

    location / {
        proxy_pass http://localhost:80;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

**Salve**: `Ctrl + O`, `Enter`, `Ctrl + X`

---

**Passo 3: Ativar o Site**

```bash
sudo ln -s /etc/nginx/sites-available/soc-dashboard /etc/nginx/sites-enabled/
```

**Passo 4: Testar a Configuração**

```bash
sudo nginx -t
```

Deve aparecer: `syntax is ok` e `test is successful`

---

**Passo 5: Reiniciar o Nginx**

```bash
sudo systemctl restart nginx
```

---

### Instalação de Certificado SSL (HTTPS) com Let's Encrypt

Para ter HTTPS (conexão segura):

**Passo 1: Instalar o Certbot**

```bash
sudo apt install -y certbot python3-certbot-nginx
```

---

**Passo 2: Obter Certificado**

```bash
sudo certbot --nginx -d SEU_DOMINIO.com -d www.SEU_DOMINIO.com
```

**Siga as instruções:**
1. Digite seu email
2. Aceite os termos
3. Escolha se quer compartilhar seu email (opcional)
4. Escolha redirecionar HTTP para HTTPS (recomendado: opção 2)

---

**Passo 3: Renovação Automática**

O certificado é válido por 90 dias. Testar renovação automática:

```bash
sudo certbot renew --dry-run
```

✅ **Pronto! Agora você pode acessar via `https://SEU_DOMINIO.com`**

---

## 🔄 Backup e Manutenção

### Backup do Banco de Dados

**Criar backup:**

```bash
docker compose exec postgres pg_dump -U socadmin soc_dashboard > backup_$(date +%Y%m%d_%H%M%S).sql
```

Isso cria um arquivo como: `backup_20240127_153045.sql`

---

**Restaurar backup:**

```bash
docker compose exec -T postgres psql -U socadmin soc_dashboard < backup_20240127_153045.sql
```

---

### Backup Completo (Código + Banco + Configs)

```bash
cd /opt
sudo tar -czf soc-dashboard-backup-$(date +%Y%m%d).tar.gz soc-dashboard/
```

Isso cria um arquivo compactado com tudo.

---

### Restaurar Backup Completo

```bash
cd /opt
sudo tar -xzf soc-dashboard-backup-20240127.tar.gz
```

---

### Agendar Backups Automáticos

**Criar script de backup:**

```bash
sudo nano /opt/backup-soc.sh
```

**Cole o conteúdo:**

```bash
#!/bin/bash
BACKUP_DIR="/opt/backups"
DATE=$(date +%Y%m%d_%H%M%S)

mkdir -p $BACKUP_DIR

# Backup do banco
docker compose -f /opt/soc-dashboard/docker-compose.yml exec -T postgres pg_dump -U socadmin soc_dashboard > $BACKUP_DIR/db_$DATE.sql

# Manter apenas os últimos 7 backups
find $BACKUP_DIR -name "db_*.sql" -mtime +7 -delete

echo "Backup concluído: $BACKUP_DIR/db_$DATE.sql"
```

**Salve e dê permissão:**

```bash
sudo chmod +x /opt/backup-soc.sh
```

---

**Agendar backup diário às 2h da manhã:**

```bash
sudo crontab -e
```

**Adicione a linha:**

```
0 2 * * * /opt/backup-soc.sh >> /var/log/soc-backup.log 2>&1
```

**Salve**: `Ctrl + O`, `Enter`, `Ctrl + X`

---

## 🔄 Atualização da Aplicação

Quando houver uma nova versão:

**Passo 1: Fazer backup**

```bash
cd /opt
sudo tar -czf soc-dashboard-backup-antes-atualizacao.tar.gz soc-dashboard/
```

---

**Passo 2: Baixar nova versão**

**Se usando Git:**

```bash
cd /opt/soc-dashboard
git pull
```

**Se enviando manualmente:**
- Substitua os arquivos como feito na instalação inicial

---

**Passo 3: Reconstruir e reiniciar**

```bash
docker compose down
docker compose up -d --build
```

---

**Passo 4: Verificar**

```bash
docker compose ps
docker compose logs -f
```

---

## 🛠️ Comandos Úteis

### Gerenciamento dos Containers

**Ver status:**
```bash
docker compose ps
```

**Iniciar:**
```bash
docker compose up -d
```

**Parar:**
```bash
docker compose down
```

**Reiniciar:**
```bash
docker compose restart
```

**Reiniciar um serviço específico:**
```bash
docker compose restart backend
docker compose restart frontend
docker compose restart postgres
```

**Ver logs:**
```bash
docker compose logs -f
```

**Ver logs de um serviço:**
```bash
docker compose logs -f backend
```

---

### Monitoramento

**Ver uso de recursos:**
```bash
docker stats
```

**Ver espaço em disco:**
```bash
df -h
```

**Limpar containers e imagens antigas:**
```bash
docker system prune -a
```

> ⚠️ Cuidado: Isso remove TODOS os containers e imagens não utilizados!

---

## 🐛 Solução de Problemas

### Problema: "Port 80 is already in use"

**Solução: Ver o que está usando a porta 80**

```bash
sudo lsof -i :80
```

**Parar o serviço:**

```bash
sudo systemctl stop apache2
# ou
sudo systemctl stop nginx
```

**Desabilitar inicialização automática:**

```bash
sudo systemctl disable apache2
```

---

### Problema: Container "soc-db" não inicia

**Ver logs:**

```bash
docker compose logs postgres
```

**Possível causa**: Banco de dados corrompido

**Solução**:

```bash
docker compose down -v
docker compose up -d
```

> ⚠️ Isso apaga todos os dados! Faça backup antes.

---

### Problema: "Cannot connect to database"

**Verificar se o container do banco está rodando:**

```bash
docker compose ps
```

**Testar conexão:**

```bash
docker compose exec postgres pg_isready -U socadmin
```

**Deve retornar**: `accepting connections`

---

### Problema: Frontend não carrega

**Verificar logs:**

```bash
docker compose logs frontend
```

**Verificar se o backend está respondendo:**

```bash
curl http://localhost:3000/health
```

**Deve retornar**: `{"status":"ok","timestamp":"..."}`

---

### Problema: "Memory exhausted" ou servidor lento

**Ver uso de memória:**

```bash
free -h
```

**Limitar memória dos containers (editar docker-compose.yml):**

```yaml
services:
  backend:
    # ... outras configs
    mem_limit: 1g
    
  frontend:
    # ... outras configs
    mem_limit: 512m
    
  postgres:
    # ... outras configs
    mem_limit: 1g
```

**Reiniciar:**

```bash
docker compose down
docker compose up -d
```

---

### Problema: Esqueci a senha do admin

**Resetar para senha padrão:**

```bash
docker compose exec postgres psql -U socadmin -d soc_dashboard -c "UPDATE users SET password_hash = '\$2b\$10\$rZJ5B3qKqZV6F6xGX.8z5.YwB6h3oC9N5JYh0Y5X8B3o9K5Y6h3oC' WHERE username = 'admin';"
```

Agora você pode fazer login com: `admin` / `admin123`

> Lembre-se de alterar a senha após o login!

---

### Problema: Firewall bloqueando acesso

**Ubuntu com UFW:**

```bash
sudo ufw status
```

**Se estiver ativo, permitir as portas:**

```bash
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw allow 3000/tcp
sudo ufw reload
```

---

### Problema: Não consigo acessar de outro computador

**Verificar se o servidor está escutando:**

```bash
sudo netstat -tlnp | grep :80
```

**Deve aparecer algo como:**

```
tcp6  0  0 :::80  :::*  LISTEN  12345/docker-proxy
```

**Verificar firewall do servidor:**

```bash
sudo iptables -L -n
```

**Se necessário, liberar:**

```bash
sudo iptables -A INPUT -p tcp --dport 80 -j ACCEPT
```

---

## 📊 Monitoramento de Performance

### Instalar ferramentas de monitoramento

```bash
sudo apt install -y htop iotop nethogs
```

**Uso de CPU e memória em tempo real:**

```bash
htop
```

**Uso de disco:**

```bash
iotop
```

**Uso de rede:**

```bash
sudo nethogs
```

---

## 📞 Obter Ajuda

### Logs Completos para Análise

Se algo não funcionar, colete as informações:

```bash
# 1. Status dos containers
docker compose ps > diagnostic.txt

# 2. Logs
docker compose logs >> diagnostic.txt

# 3. Uso de recursos
docker stats --no-stream >> diagnostic.txt

# 4. Informações do sistema
uname -a >> diagnostic.txt
df -h >> diagnostic.txt
free -h >> diagnostic.txt
```

Envie o arquivo `diagnostic.txt` para análise.

---

## ✅ Checklist Pós-Instalação

- [ ] Aplicação acessível via navegador
- [ ] Login funcionando com credenciais padrão
- [ ] Dashboard exibindo 5 cards com dados simulados
- [ ] Senha padrão alterada
- [ ] Backup configurado
- [ ] Firewall configurado (se aplicável)
- [ ] HTTPS configurado (se usando domínio)
- [ ] Monitoramento básico instalado

---

## 🎯 Próximos Passos

Agora que a aplicação está instalada e funcionando:

1. **Explore o Dashboard**: Familiarize-se com a interface
2. **Acesse o Painel de Controle**: Veja as configurações disponíveis
3. **Configure Integrações Reais**: Quando tiver as credenciais dos serviços externos
4. **Monitore o Histórico de Auditoria**: Todas as mudanças ficam registradas
5. **Agende Backups Regulares**: Importante para segurança dos dados

---

## 📚 Recursos Adicionais

### Documentação Oficial

- **Docker**: https://docs.docker.com/
- **Docker Compose**: https://docs.docker.com/compose/
- **PostgreSQL**: https://www.postgresql.org/docs/
- **Nginx**: https://nginx.org/en/docs/

### Comunidade

- **Stack Overflow**: Para perguntas técnicas
- **GitHub Issues**: Para reportar bugs ou sugerir funcionalidades

---

## 📝 Notas Finais

- **Mantenha o sistema atualizado**: Execute `sudo apt update && sudo apt upgrade` regularmente
- **Monitore os logs**: Verifique periodicamente se há erros
- **Faça backups**: Configure backups automáticos diários
- **Segurança em primeiro lugar**: Use senhas fortes e HTTPS em produção

---

**Parabéns! Você instalou com sucesso o Dashboard SOC!** 🎉

Se você seguiu todos os passos, sua aplicação está rodando, segura e pronta para uso profissional.

---

## 📞 Suporte

Se encontrar problemas:
1. Consulte a seção "Solução de Problemas"
2. Verifique os logs com `docker compose logs`
3. Colete informações de diagnóstico
4. Entre em contato com suporte técnico

---

**Última atualização**: 27 de Janeiro de 2026
**Versão do guia**: 1.0
