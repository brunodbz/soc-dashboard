# Dashboard SOC - Sistema de Monitoramento de Segurança

Dashboard completo de monitoramento de segurança (SOC) com integrações para Elastic Search, Microsoft Defender 365, OpenCTI, Tenable.io e RSS Feeds. Desenvolvido com React, TypeScript, Node.js e PostgreSQL.

## Características Principais

- **Dashboard em tempo real** com atualização automática a cada 30 segundos
- **5 Integrações de segurança**: Elastic Search, Microsoft Defender 365, OpenCTI, Tenable.io e RSS Feeds
- **Mocks integrados**: Exibe dados simulados até que as integrações reais sejam configuradas
- **Autenticação JWT** com login seguro
- **Criptografia de credenciais** usando PostgreSQL pgcrypto
- **Auditoria completa** de todas as mudanças de configuração
- **Interface responsiva** com design soft e profissional (Tailwind CSS)
- **Tratamento de erros resiliente**: Continue monitorando outras fontes mesmo se uma falhar

## Pré-requisitos

- Docker 24.0+
- Docker Compose 2.20+
- Git

## Instalação Rápida

### 1. Clone o repositório

```bash
git clone <repo-url>
cd soc-dashboard
```

### 2. Configure as variáveis de ambiente

```bash
cp env.example .env
```

Edite o arquivo `.env` com suas credenciais:

```env
# Database
DB_HOST=postgres
DB_PORT=5432
DB_NAME=soc_dashboard
DB_USER=socadmin
DB_PASSWORD=SEU_PASSWORD_SEGURO_AQUI

# Backend
NODE_ENV=production
PORT=3000
JWT_SECRET=SEU_JWT_SECRET_ALEATORIO_AQUI
ENCRYPTION_KEY=SUA_CHAVE_DE_32_CARACTERES_AQUI!!

# Frontend
VITE_API_URL=http://localhost:3000/api
```

### 3. Inicie os contêineres

```bash
docker-compose up -d
```

### 4. Acesse a aplicação

- **Frontend**: http://localhost
- **Backend API**: http://localhost:3000
- **Credenciais padrão**: `admin` / `admin123`

## Estrutura do Projeto

```
soc-dashboard/
├── backend/                 # API Node.js + TypeScript
│   ├── src/
│   │   ├── controllers/     # Controllers da API
│   │   ├── services/        # Lógica de negócio
│   │   │   ├── integrations/  # Serviços de integração
│   │   │   └── mocks/         # Geradores de dados mock
│   │   ├── middlewares/     # Middlewares (auth, error)
│   │   ├── routes/          # Definição de rotas
│   │   ├── database/        # Conexão e migrations
│   │   └── types/           # Tipos TypeScript
│   └── Dockerfile
├── frontend/                # React + TypeScript
│   ├── src/
│   │   ├── components/      # Componentes React
│   │   │   ├── Dashboard/   # Componentes do dashboard
│   │   │   ├── Admin/       # Painel de controle
│   │   │   ├── Auth/        # Autenticação
│   │   │   └── Layout/      # Layout e navegação
│   │   ├── hooks/           # Hooks customizados
│   │   ├── services/        # Serviços de API
│   │   └── types/           # Tipos TypeScript
│   ├── Dockerfile
│   └── nginx.conf
└── docker-compose.yml
```

## Configuração de Integrações

A aplicação exibe **dados simulados (mocks)** até que você configure as integrações reais. Acesse o **Painel de Controle** para configurar cada serviço.

### Elastic Search

1. Acesse o Painel de Controle
2. Selecione "Elastic Search" no formulário
3. Configure:
   - **URL**: `https://seu-elastic.com:9200`
   - **API Key**: Sua API Key do Elastic

### Microsoft Defender 365

1. Obtenha um token OAuth2 via Azure AD:
   - Registre um aplicativo no Azure AD
   - Conceda permissões `SecurityEvents.Read.All`
   - Gere um token de acesso
2. Configure:
   - **Token**: Seu Bearer token

### OpenCTI

1. Gere uma API key no OpenCTI:
   - Acesse Settings → API Access
   - Crie uma nova API Key
2. Configure:
   - **URL**: `https://seu-opencti.com`
   - **API Key**: Sua API Key

### Tenable.io

1. Gere Access Key e Secret Key:
   - Acesse Settings → My Account → API Keys
   - Crie um novo par de chaves
2. Configure:
   - **API Key**: Sua Access Key
   - **Token**: Sua Secret Key

### RSS Feeds

1. Configure:
   - **URL**: URL do feed RSS (ex: `https://feeds.feedburner.com/TheHackersNews`)

## Comandos Úteis

### Desenvolvimento Local

#### Backend

```bash
cd backend
npm install
npm run dev
```

#### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Docker

```bash
# Iniciar todos os serviços
docker-compose up -d

# Ver logs
docker-compose logs -f

# Ver logs de um serviço específico
docker-compose logs -f backend

# Parar todos os serviços
docker-compose down

# Reconstruir e reiniciar
docker-compose up -d --build

# Remover volumes (CUIDADO: apaga dados do banco)
docker-compose down -v
```

### Banco de Dados

```bash
# Backup do banco
docker exec soc-db pg_dump -U socadmin soc_dashboard > backup.sql

# Restaurar backup
docker exec -i soc-db psql -U socadmin soc_dashboard < backup.sql

# Acessar o console do PostgreSQL
docker exec -it soc-db psql -U socadmin -d soc_dashboard
```

## Segurança

### Credenciais Criptografadas

Todas as API Keys e tokens são criptografados no banco de dados usando a extensão `pgcrypto` do PostgreSQL antes de serem armazenados.

### Autenticação JWT

- Tokens JWT com expiração de 24 horas
- Senhas hashadas com bcrypt (10 rounds)
- Middleware de autenticação em todas as rotas protegidas

### Boas Práticas

- **Altere as credenciais padrão** imediatamente após a instalação
- Use **HTTPS em produção** (configure um reverse proxy como Nginx ou Traefik)
- Mantenha o `JWT_SECRET` e `ENCRYPTION_KEY` **seguros e aleatórios**
- Configure **firewall** para expor apenas as portas necessárias
- Faça **backups regulares** do banco de dados

## Auditoria

Todas as operações de criação, atualização e exclusão de configurações são registradas na tabela `audit_log` com:

- Usuário responsável
- Data e hora
- Tipo de ação (CREATE, UPDATE, DELETE)
- Valores antigos e novos
- Endereço IP

Acesse o histórico no **Painel de Controle**.

## Troubleshooting

### Backend não conecta ao banco de dados

```bash
# Verifique o status dos serviços
docker-compose ps

# Verifique os logs do PostgreSQL
docker-compose logs postgres

# Verifique se a migration foi aplicada
docker exec -it soc-db psql -U socadmin -d soc_dashboard -c "\dt"
```

### Frontend não carrega dados

```bash
# Verifique se o backend está rodando
curl http://localhost:3000/health

# Verifique os logs do backend
docker-compose logs backend

# Verifique se o token JWT é válido
# Faça logout e login novamente
```

### Erro "Token inválido ou expirado"

- Faça logout e login novamente
- Verifique se o `JWT_SECRET` está configurado corretamente
- Verifique se os horários do servidor estão sincronizados

### Integrações retornam erro

- Verifique as credenciais no Painel de Controle
- Teste a conectividade com o serviço externo
- Verifique os logs do backend para detalhes do erro
- Certifique-se de que as URLs estão corretas

## Arquitetura

```
┌─────────────────────────────────────────────────────────────┐
│                         Frontend                             │
│  React + TypeScript + Tailwind CSS + React Router          │
│                                                              │
│  ┌────────────┐  ┌──────────────┐  ┌──────────────────┐   │
│  │ Dashboard  │  │ Painel de    │  │ Autenticação     │   │
│  │ Grid       │  │ Controle     │  │ JWT              │   │
│  └────────────┘  └──────────────┘  └──────────────────┘   │
│         │                │                    │             │
│         └────────────────┴────────────────────┘             │
│                          │                                   │
│                    Polling (30s)                            │
└─────────────────────────┼───────────────────────────────────┘
                          │ HTTP/REST
                          │ JWT Token
┌─────────────────────────▼───────────────────────────────────┐
│                        Backend                               │
│       Node.js + Express + TypeScript                        │
│                                                              │
│  ┌──────────────┐  ┌─────────────┐  ┌──────────────────┐  │
│  │ Auth         │  │ Config      │  │ Integrations     │  │
│  │ Service      │  │ Service     │  │ Manager          │  │
│  └──────────────┘  └─────────────┘  └──────────────────┘  │
│         │                 │                    │            │
│         └─────────────────┴────────────────────┤            │
└───────────────────────────────────────────────┼────────────┘
                                                 │
                          ┌──────────────────────┴──────────────┐
                          │                                      │
┌─────────────────────────▼─────┐    ┌───────────────────────────▼──────┐
│      PostgreSQL                │    │    Serviços Externos             │
│  ┌──────────────────────────┐ │    │  • Elastic Search                │
│  │ • users                  │ │    │  • Microsoft Defender 365        │
│  │ • configs (encrypted)    │ │    │  • OpenCTI                       │
│  │ • audit_log              │ │    │  • Tenable.io                    │
│  │ • pgcrypto extension     │ │    │  • RSS Feeds                     │
│  └──────────────────────────┘ │    └──────────────────────────────────┘
└────────────────────────────────┘
```

## Tecnologias Utilizadas

### Backend
- Node.js 20 + TypeScript
- Express.js
- PostgreSQL 16 + pgcrypto
- JWT (jsonwebtoken)
- bcrypt
- axios
- xml2js

### Frontend
- React 18 + TypeScript
- Vite
- Tailwind CSS
- React Router Dom
- React Hook Form
- axios

### Infraestrutura
- Docker + Docker Compose
- Nginx (para servir o frontend)

## Licença

MIT

## Suporte

Para reportar problemas ou sugerir melhorias, abra uma issue no repositório do projeto.
