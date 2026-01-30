# Guia de Simulação - Dashboard SOC

Este guia mostra como visualizar a aplicação funcionando.

## Opção 1: Instalação Rápida com Docker (RECOMENDADO)

### Pré-requisitos
1. Instale o Docker Desktop para Windows: https://www.docker.com/products/docker-desktop
2. Após instalar, reinicie o computador

### Executar a Aplicação

```powershell
# 1. Navegue até o diretório do projeto
cd C:\Users\Bruno\OneDrive\Documentos2\soc-dashboad

# 2. Inicie todos os serviços
docker-compose up -d

# 3. Aguarde cerca de 30 segundos para tudo inicializar

# 4. Acesse no navegador
# http://localhost
```

### Parar a Aplicação

```powershell
docker-compose down
```

---

## Opção 2: Desenvolvimento Local (Requer Node.js)

### Pré-requisitos
1. Instale o Node.js 20+: https://nodejs.org/
2. Instale o PostgreSQL 16+: https://www.postgresql.org/download/

### Passo 1: Configurar Banco de Dados

```powershell
# Criar banco de dados
psql -U postgres
CREATE DATABASE soc_dashboard;
CREATE USER socadmin WITH PASSWORD 'securepassword';
GRANT ALL PRIVILEGES ON DATABASE soc_dashboard TO socadmin;
\q

# Executar migrations
psql -U socadmin -d soc_dashboard -f backend/src/database/migrations/init.sql
```

### Passo 2: Configurar Backend

```powershell
cd backend

# Instalar dependências
npm install

# Criar arquivo .env
@"
DB_HOST=localhost
DB_PORT=5432
DB_NAME=soc_dashboard
DB_USER=socadmin
DB_PASSWORD=securepassword
NODE_ENV=development
PORT=3000
JWT_SECRET=meu-secret-super-seguro-para-desenvolvimento
ENCRYPTION_KEY=minha-chave-de-32-chars-aqui!!!
"@ | Out-File -FilePath .env -Encoding UTF8

# Iniciar o servidor backend
npm run dev
```

O backend estará rodando em: http://localhost:3000

### Passo 3: Configurar Frontend (em outro terminal)

```powershell
cd frontend

# Instalar dependências
npm install

# Criar arquivo .env
@"
VITE_API_URL=http://localhost:3000/api
"@ | Out-File -FilePath .env -Encoding UTF8

# Iniciar o servidor de desenvolvimento
npm run dev
```

O frontend estará rodando em: http://localhost:5173

---

## O Que Você Verá

### 1. Tela de Login (http://localhost ou http://localhost:5173)

```
┌─────────────────────────────────────────┐
│                                         │
│         SOC Dashboard                   │
│                                         │
│  ┌───────────────────────────────────┐ │
│  │ Usuário:                          │ │
│  │ [admin                         ]  │ │
│  │                                   │ │
│  │ Senha:                            │ │
│  │ [••••••••                      ]  │ │
│  │                                   │ │
│  │      [ Entrar ]                   │ │
│  │                                   │ │
│  │ Credenciais padrão: admin/admin123│ │
│  └───────────────────────────────────┘ │
│                                         │
└─────────────────────────────────────────┘
```

### 2. Dashboard Principal (após login)

```
┌──────────────────────────────────────────────────────────────────────┐
│ SOC Dashboard    [ Dashboard ]  [ Painel de Controle ]    admin  Sair│
├──────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  Dashboard de Segurança        Atualização automática a cada 30s ⟳   │
│                                                                       │
│  ┌───────────────┐  ┌───────────────┐  ┌───────────────┐          │
│  │🔍 Elastic     │  │🛡️ Defender   │  │🎯 OpenCTI     │          │
│  │   Search      │  │   365         │  │               │          │
│  ├───────────────┤  ├───────────────┤  ├───────────────┤          │
│  │┌─────────────┐│  │┌─────────────┐│  │┌─────────────┐│          │
│  ││Tentativa... ││  ││Malware det..││  ││Novo IOC...  ││          │
│  ││[Crítico] 🔴 ││  ││[Crítico] 🔴 ││  ││[Crítico] 🔴 ││          │
│  ││27/01 15:30  ││  ││27/01 15:28  ││  ││27/01 15:25  ││          │
│  │└─────────────┘│  │└─────────────┘│  │└─────────────┘│          │
│  │┌─────────────┐│  │┌─────────────┐│  │┌─────────────┐│          │
│  ││Tráfego...   ││  ││Atividade... ││  ││Campanha APT ││          │
│  ││[Alto] 🟠    ││  ││[Alto] 🟠    ││  ││[Alto] 🟠    ││          │
│  ││27/01 15:15  ││  ││27/01 15:10  ││  ││27/01 15:05  ││          │
│  │└─────────────┘│  │└─────────────┘│  │└─────────────┘│          │
│  │┌─────────────┐│  │┌─────────────┐│  │┌─────────────┐│          │
│  ││Múltiplas... ││  ││Aplicação... ││  ││Domínio mal..││          │
│  ││[Médio] 🟡   ││  ││[Médio] 🟡   ││  ││[Médio] 🟡   ││          │
│  │└─────────────┘│  │└─────────────┘│  │└─────────────┘│          │
│  └───────────────┘  └───────────────┘  └───────────────┘          │
│                                                                       │
│  ┌───────────────┐  ┌───────────────┐                               │
│  │🔐 Tenable.io  │  │📰 RSS Feeds   │                               │
│  ├───────────────┤  ├───────────────┤                               │
│  │┌─────────────┐│  │┌─────────────┐│                               │
│  ││Vulnerab...  ││  ││Nova vulne...││                               │
│  ││[Crítico] 🔴 ││  ││[Médio] 🟡   ││                               │
│  │└─────────────┘│  │└─────────────┘│                               │
│  │┌─────────────┐│  │┌─────────────┐│                               │
│  ││SSL/TLS...   ││  ││Atualização..││                               │
│  ││[Alto] 🟠    ││  ││[Médio] 🟡   ││                               │
│  │└─────────────┘│  │└─────────────┘│                               │
│  └───────────────┘  └───────────────┘                               │
│                                                                       │
└──────────────────────────────────────────────────────────────────────┘
```

### 3. Painel de Controle

```
┌──────────────────────────────────────────────────────────────────────┐
│ SOC Dashboard    [ Dashboard ]  [Painel de Controle]    admin  Sair │
├──────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  Painel de Controle                                                  │
│                                                                       │
│  ┌─────────────────────────┐  ┌─────────────────────────────────┐  │
│  │ Nova Configuração       │  │ Configurações Existentes         │  │
│  ├─────────────────────────┤  ├─────────────────────────────────┤  │
│  │                         │  │                                  │  │
│  │ Serviço: *              │  │ ┌─────────────────────────────┐ │  │
│  │ [Elastic Search    ▼]   │  │ │ elastic                     │ │  │
│  │                         │  │ │ Tipo: SIEM                  │ │  │
│  │ Tipo de Serviço: *      │  │ │ [Ativo] [Excluir]           │ │  │
│  │ [SIEM             ]     │  │ └─────────────────────────────┘ │  │
│  │                         │  │                                  │  │
│  │ URL:                    │  │ ┌─────────────────────────────┐ │  │
│  │ [https://elastic.com]   │  │ │ defender                    │ │  │
│  │                         │  │ │ Tipo: EDR                   │ │  │
│  │ API Key:                │  │ │ [Ativo] [Excluir]           │ │  │
│  │ [••••••••••••••••]      │  │ └─────────────────────────────┘ │  │
│  │                         │  │                                  │  │
│  │ Token:                  │  │ ┌─────────────────────────────┐ │  │
│  │ [••••••••••••••••]      │  │ │ rss                         │ │  │
│  │                         │  │ │ Tipo: NEWS                  │ │  │
│  │ ☑ Configuração ativa    │  │ │ [Ativo] [Excluir]           │ │  │
│  │                         │  │ └─────────────────────────────┘ │  │
│  │ [Salvar Configuração]   │  │                                  │  │
│  └─────────────────────────┘  └─────────────────────────────────┘  │
│                                                                       │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │ Histórico de Auditoria                    [Atualizar]        │   │
│  ├──────────────────────────────────────────────────────────────┤   │
│  │ Data/Hora         Usuário    Ação      Entidade             │   │
│  │ 27/01/26 15:45    admin      CREATE    config               │   │
│  │ 27/01/26 15:30    admin      UPDATE    config               │   │
│  │ 27/01/26 15:15    admin      DELETE    config               │   │
│  └──────────────────────────────────────────────────────────────┘   │
│                                                                       │
└──────────────────────────────────────────────────────────────────────┘
```

---

## Funcionalidades para Testar

### 1. Dashboard
- ✅ Visualize os 5 cards com dados simulados
- ✅ Observe a atualização automática a cada 30 segundos
- ✅ Veja as cores de severidade (Crítico=vermelho, Alto=laranja, Médio=amarelo, Baixo=azul)

### 2. Painel de Controle
- ✅ Adicione uma nova configuração de integração
- ✅ Ative/desative configurações existentes
- ✅ Exclua configurações
- ✅ Visualize o histórico de auditoria

### 3. Comportamento com Erros
- ✅ Quando uma integração falha, o card mostra mensagem de erro
- ✅ As outras integrações continuam funcionando normalmente

---

## Dados Simulados (Mocks)

Por padrão, a aplicação exibe **dados simulados** até você configurar as integrações reais:

- **Elastic Search**: 5 alertas de segurança simulados
- **Microsoft Defender 365**: 5 alertas de malware/phishing simulados
- **OpenCTI**: 5 indicadores de ameaça simulados
- **Tenable.io**: 5 vulnerabilidades simuladas
- **RSS Feeds**: 5 notícias de segurança simuladas

### Como Testar com Integrações Reais

1. Acesse o **Painel de Controle**
2. Clique em **Nova Configuração**
3. Selecione o serviço (ex: Elastic Search)
4. Preencha:
   - **Tipo de Serviço**: SIEM
   - **URL**: https://seu-elastic.com:9200
   - **API Key**: sua_api_key_real
5. Clique em **Salvar Configuração**
6. Volte ao **Dashboard** e veja os dados reais aparecendo

---

## Cores e Paleta Soft

A aplicação usa uma paleta de cores suave e profissional, adequada para videowall:

- **Fundo**: Slate-50/100 (#f8fafc / #f1f5f9)
- **Textos**: Slate-800 (#1e293b)
- **Crítico**: Red-300 soft (#fca5a5)
- **Alto**: Orange-300 soft (#fdba74)
- **Médio**: Yellow-300 soft (#fcd34d)
- **Baixo**: Blue-300 soft (#93c5fd)
- **Info**: Indigo-300 soft (#a5b4fc)

---

## Troubleshooting Rápido

### Porta 80 já está em uso
```powershell
# Pare outros serviços que usam a porta 80
# Ou edite docker-compose.yml e mude "80:80" para "8080:80"
# Depois acesse: http://localhost:8080
```

### Banco de dados não inicializa
```powershell
# Remova os volumes e recrie
docker-compose down -v
docker-compose up -d
```

### Frontend não carrega
```powershell
# Verifique se o backend está rodando
docker-compose logs backend

# Aguarde 30 segundos para todos os serviços iniciarem
```

---

## Screenshots de Referência

### Paleta de Cores dos Badges
```
🔴 Crítico  - Fundo: #fca5a5 | Texto: #7f1d1d
🟠 Alto     - Fundo: #fdba74 | Texto: #7c2d12
🟡 Médio    - Fundo: #fcd34d | Texto: #713f12
🔵 Baixo    - Fundo: #93c5fd | Texto: #1e3a8a
```

### Layout Responsivo
- **Desktop (>1024px)**: 3 colunas
- **Tablet (768-1024px)**: 2 colunas
- **Mobile (<768px)**: 1 coluna

---

## Próximos Passos

1. **Instale o Docker Desktop** (ou Node.js + PostgreSQL)
2. **Execute** `docker-compose up -d`
3. **Acesse** http://localhost
4. **Login** com `admin` / `admin123`
5. **Explore** o dashboard e o painel de controle!

---

## Observações Importantes

- O dashboard **atualiza automaticamente** a cada 30 segundos
- As **credenciais são criptografadas** no banco de dados
- O **histórico de auditoria** registra todas as mudanças
- Os **mocks garantem** que você veja a aplicação funcionando imediatamente
- Você pode **configurar integrações reais** a qualquer momento no Painel de Controle

Divirta-se explorando o SOC Dashboard! 🚀
