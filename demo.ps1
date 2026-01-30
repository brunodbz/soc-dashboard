# Demonstração Visual do SOC Dashboard
# Este script simula a interface no console

function Show-Header {
    Clear-Host
    Write-Host "╔═══════════════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
    Write-Host "║                         SOC DASHBOARD - DEMO                          ║" -ForegroundColor Cyan
    Write-Host "╚═══════════════════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
    Write-Host ""
}

function Show-LoginScreen {
    Show-Header
    Write-Host "┌─────────────────────────────────────────┐" -ForegroundColor White
    Write-Host "│                                         │" -ForegroundColor White
    Write-Host "│         " -NoNewline -ForegroundColor White
    Write-Host "🔐 SOC Dashboard" -NoNewline -ForegroundColor Cyan
    Write-Host "                │" -ForegroundColor White
    Write-Host "│                                         │" -ForegroundColor White
    Write-Host "│  ┌───────────────────────────────────┐ │" -ForegroundColor White
    Write-Host "│  │ Usuário:                          │ │" -ForegroundColor White
    Write-Host "│  │ " -NoNewline -ForegroundColor White
    Write-Host "admin" -NoNewline -ForegroundColor Green
    Write-Host "                         │ │" -ForegroundColor White
    Write-Host "│  │                                   │ │" -ForegroundColor White
    Write-Host "│  │ Senha:                            │ │" -ForegroundColor White
    Write-Host "│  │ " -NoNewline -ForegroundColor White
    Write-Host "••••••••" -NoNewline -ForegroundColor Green
    Write-Host "                      │ │" -ForegroundColor White
    Write-Host "│  │                                   │ │" -ForegroundColor White
    Write-Host "│  │      " -NoNewline -ForegroundColor White
    Write-Host "[  Entrar  ]" -NoNewline -ForegroundColor Green
    Write-Host "                   │ │" -ForegroundColor White
    Write-Host "│  │                                   │ │" -ForegroundColor White
    Write-Host "│  │ " -NoNewline -ForegroundColor White
    Write-Host "Credenciais: admin / admin123" -NoNewline -ForegroundColor DarkGray
    Write-Host " │ │" -ForegroundColor White
    Write-Host "│  └───────────────────────────────────┘ │" -ForegroundColor White
    Write-Host "│                                         │" -ForegroundColor White
    Write-Host "└─────────────────────────────────────────┘" -ForegroundColor White
    Write-Host ""
    Write-Host "  Pressione ENTER para fazer login..." -ForegroundColor Yellow
    Read-Host
}

function Show-Dashboard {
    Show-Header
    Write-Host "┌─ Dashboard ─┐  ┌─ Painel de Controle ─┐           " -NoNewline -ForegroundColor White
    Write-Host "admin" -NoNewline -ForegroundColor Green
    Write-Host " | Sair" -ForegroundColor White
    Write-Host ""
    Write-Host "  " -NoNewline
    Write-Host "Dashboard de Segurança" -NoNewline -ForegroundColor Cyan
    Write-Host "        Atualização automática a cada 30s ⟳" -ForegroundColor DarkGray
    Write-Host ""
    
    # Primeira linha de cards
    Write-Host "  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐" -ForegroundColor White
    Write-Host "  │" -NoNewline -ForegroundColor White
    Write-Host "🔍 Elastic Search" -NoNewline -ForegroundColor Cyan
    Write-Host "│  │" -NoNewline -ForegroundColor White
    Write-Host "🛡️  Defender 365 " -NoNewline -ForegroundColor Cyan
    Write-Host "│  │" -NoNewline -ForegroundColor White
    Write-Host "🎯 OpenCTI      " -NoNewline -ForegroundColor Cyan
    Write-Host "│" -ForegroundColor White
    Write-Host "  ├─────────────────┤  ├─────────────────┤  ├─────────────────┤" -ForegroundColor White
    
    # Alertas Elastic
    Write-Host "  │┌───────────────┐│  │┌───────────────┐│  │┌───────────────┐│" -ForegroundColor White
    Write-Host "  ││Tentativa de   ││  ││Malware detec. ││  ││Novo IOC de    ││" -ForegroundColor White
    Write-Host "  ││acesso não aut.││  ││no endpoint    ││  ││ransomware     ││" -ForegroundColor White
    Write-Host "  ││" -NoNewline -ForegroundColor White
    Write-Host "[Crítico]" -NoNewline -ForegroundColor Red
    Write-Host " 🔴  ││  ││" -NoNewline -ForegroundColor Red
    Write-Host "[Crítico]" -NoNewline -ForegroundColor Red
    Write-Host " 🔴  ││  ││" -NoNewline -ForegroundColor Red
    Write-Host "[Crítico]" -NoNewline -ForegroundColor Red
    Write-Host " 🔴  ││" -ForegroundColor Red
    Write-Host "  ││27/01 15:55    ││  ││27/01 15:57    ││  ││27/01 15:52    ││" -ForegroundColor DarkGray
    Write-Host "  │└───────────────┘│  │└───────────────┘│  │└───────────────┘│" -ForegroundColor White
    
    Write-Host "  │┌───────────────┐│  │┌───────────────┐│  │┌───────────────┐│" -ForegroundColor White
    Write-Host "  ││Tráfego anômalo││  ││Atividade susp.││  ││Campanha de APT││" -ForegroundColor White
    Write-Host "  ││na rede        ││  ││de phishing    ││  ││detectada      ││" -ForegroundColor White
    Write-Host "  ││" -NoNewline -ForegroundColor White
    Write-Host "[Alto]" -NoNewline -ForegroundColor Yellow
    Write-Host "     🟠  ││  ││" -NoNewline -ForegroundColor Yellow
    Write-Host "[Alto]" -NoNewline -ForegroundColor Yellow
    Write-Host "     🟠  ││  ││" -NoNewline -ForegroundColor Yellow
    Write-Host "[Alto]" -NoNewline -ForegroundColor Yellow
    Write-Host "     🟠  ││" -ForegroundColor Yellow
    Write-Host "  ││27/01 15:40    ││  ││27/01 15:35    ││  ││27/01 15:30    ││" -ForegroundColor DarkGray
    Write-Host "  │└───────────────┘│  │└───────────────┘│  │└───────────────┘│" -ForegroundColor White
    
    Write-Host "  │┌───────────────┐│  │┌───────────────┐│  │┌───────────────┐│" -ForegroundColor White
    Write-Host "  ││Múltiplas tent.││  ││Aplicação não  ││  ││Domínio malicio││" -ForegroundColor White
    Write-Host "  ││login falhadas ││  ││autorizada     ││  ││so reportado   ││" -ForegroundColor White
    Write-Host "  ││" -NoNewline -ForegroundColor White
    Write-Host "[Médio]" -NoNewline -ForegroundColor DarkYellow
    Write-Host "    🟡  ││  ││" -NoNewline -ForegroundColor DarkYellow
    Write-Host "[Médio]" -NoNewline -ForegroundColor DarkYellow
    Write-Host "    🟡  ││  ││" -NoNewline -ForegroundColor DarkYellow
    Write-Host "[Médio]" -NoNewline -ForegroundColor DarkYellow
    Write-Host "    🟡  ││" -ForegroundColor DarkYellow
    Write-Host "  │└───────────────┘│  │└───────────────┘│  │└───────────────┘│" -ForegroundColor White
    Write-Host "  └─────────────────┘  └─────────────────┘  └─────────────────┘" -ForegroundColor White
    Write-Host ""
    
    # Segunda linha de cards
    Write-Host "  ┌─────────────────┐  ┌─────────────────┐" -ForegroundColor White
    Write-Host "  │" -NoNewline -ForegroundColor White
    Write-Host "🔐 Tenable.io   " -NoNewline -ForegroundColor Cyan
    Write-Host "│  │" -NoNewline -ForegroundColor White
    Write-Host "📰 RSS Feeds    " -NoNewline -ForegroundColor Cyan
    Write-Host "│" -ForegroundColor White
    Write-Host "  ├─────────────────┤  ├─────────────────┤" -ForegroundColor White
    
    Write-Host "  │┌───────────────┐│  │┌───────────────┐│" -ForegroundColor White
    Write-Host "  ││Vulnerabilidade││  ││Nova vulnerab. ││" -ForegroundColor White
    Write-Host "  ││crítica CVE... ││  ││zero-day anunc.││" -ForegroundColor White
    Write-Host "  ││" -NoNewline -ForegroundColor White
    Write-Host "[Crítico]" -NoNewline -ForegroundColor Red
    Write-Host " 🔴  ││  ││" -NoNewline -ForegroundColor Red
    Write-Host "[Médio]" -NoNewline -ForegroundColor DarkYellow
    Write-Host "    🟡  ││" -ForegroundColor DarkYellow
    Write-Host "  │└───────────────┘│  │└───────────────┘│" -ForegroundColor White
    
    Write-Host "  │┌───────────────┐│  │┌───────────────┐│" -ForegroundColor White
    Write-Host "  ││SSL/TLS config.││  ││Atualização de ││" -ForegroundColor White
    Write-Host "  ││fraca          ││  ││segurança crít.││" -ForegroundColor White
    Write-Host "  ││" -NoNewline -ForegroundColor White
    Write-Host "[Alto]" -NoNewline -ForegroundColor Yellow
    Write-Host "     🟠  ││  ││" -NoNewline -ForegroundColor Yellow
    Write-Host "[Médio]" -NoNewline -ForegroundColor DarkYellow
    Write-Host "    🟡  ││" -ForegroundColor DarkYellow
    Write-Host "  │└───────────────┘│  │└───────────────┘│" -ForegroundColor White
    Write-Host "  └─────────────────┘  └─────────────────┘" -ForegroundColor White
    Write-Host ""
    Write-Host "  Pressione ENTER para ir ao Painel de Controle..." -ForegroundColor Yellow
    Read-Host
}

function Show-ControlPanel {
    Show-Header
    Write-Host "  ┌─ Dashboard ─┐  " -NoNewline -ForegroundColor DarkGray
    Write-Host "┌─ Painel de Controle ─┐" -NoNewline -ForegroundColor White
    Write-Host "           " -NoNewline
    Write-Host "admin" -NoNewline -ForegroundColor Green
    Write-Host " | Sair" -ForegroundColor White
    Write-Host ""
    Write-Host "  " -NoNewline
    Write-Host "Painel de Controle" -ForegroundColor Cyan
    Write-Host ""
    
    Write-Host "  ┌─────────────────────────────┐  ┌─────────────────────────────────┐" -ForegroundColor White
    Write-Host "  │ " -NoNewline -ForegroundColor White
    Write-Host "Nova Configuração" -NoNewline -ForegroundColor Cyan
    Write-Host "           │  │ " -NoNewline -ForegroundColor White
    Write-Host "Configurações Existentes" -NoNewline -ForegroundColor Cyan
    Write-Host "         │" -ForegroundColor White
    Write-Host "  ├─────────────────────────────┤  ├─────────────────────────────────┤" -ForegroundColor White
    Write-Host "  │                             │  │                                 │" -ForegroundColor White
    Write-Host "  │ Serviço: *                  │  │ ┌─────────────────────────────┐ │" -ForegroundColor White
    Write-Host "  │ [Elastic Search        ▼]   │  │ │ " -NoNewline -ForegroundColor White
    Write-Host "elastic" -NoNewline -ForegroundColor Green
    Write-Host "                     │ │" -ForegroundColor White
    Write-Host "  │                             │  │ │ Tipo: SIEM                  │ │" -ForegroundColor White
    Write-Host "  │ Tipo de Serviço: *          │  │ │ " -NoNewline -ForegroundColor White
    Write-Host "[Ativo]" -NoNewline -ForegroundColor Green
    Write-Host " " -NoNewline
    Write-Host "[Excluir]" -NoNewline -ForegroundColor Red
    Write-Host "           │ │" -ForegroundColor White
    Write-Host "  │ [SIEM                  ]    │  │ └─────────────────────────────┘ │" -ForegroundColor White
    Write-Host "  │                             │  │                                 │" -ForegroundColor White
    Write-Host "  │ URL:                        │  │ ┌─────────────────────────────┐ │" -ForegroundColor White
    Write-Host "  │ [https://elastic.com   ]    │  │ │ " -NoNewline -ForegroundColor White
    Write-Host "defender" -NoNewline -ForegroundColor Green
    Write-Host "                    │ │" -ForegroundColor White
    Write-Host "  │                             │  │ │ Tipo: EDR                   │ │" -ForegroundColor White
    Write-Host "  │ API Key:                    │  │ │ " -NoNewline -ForegroundColor White
    Write-Host "[Ativo]" -NoNewline -ForegroundColor Green
    Write-Host " " -NoNewline
    Write-Host "[Excluir]" -NoNewline -ForegroundColor Red
    Write-Host "           │ │" -ForegroundColor White
    Write-Host "  │ [••••••••••••••••••••  ]    │  │ └─────────────────────────────┘ │" -ForegroundColor White
    Write-Host "  │                             │  │                                 │" -ForegroundColor White
    Write-Host "  │ Token:                      │  │ ┌─────────────────────────────┐ │" -ForegroundColor White
    Write-Host "  │ [••••••••••••••••••••  ]    │  │ │ " -NoNewline -ForegroundColor White
    Write-Host "rss" -NoNewline -ForegroundColor Green
    Write-Host "                         │ │" -ForegroundColor White
    Write-Host "  │                             │  │ │ Tipo: NEWS                  │ │" -ForegroundColor White
    Write-Host "  │ ☑ Configuração ativa        │  │ │ " -NoNewline -ForegroundColor White
    Write-Host "[Ativo]" -NoNewline -ForegroundColor Green
    Write-Host " " -NoNewline
    Write-Host "[Excluir]" -NoNewline -ForegroundColor Red
    Write-Host "           │ │" -ForegroundColor White
    Write-Host "  │                             │  │ └─────────────────────────────┘ │" -ForegroundColor White
    Write-Host "  │ " -NoNewline -ForegroundColor White
    Write-Host "[Salvar Configuração]" -NoNewline -ForegroundColor Green
    Write-Host "     │  │                                 │" -ForegroundColor White
    Write-Host "  └─────────────────────────────┘  └─────────────────────────────────┘" -ForegroundColor White
    Write-Host ""
    
    Write-Host "  ┌──────────────────────────────────────────────────────────────────┐" -ForegroundColor White
    Write-Host "  │ " -NoNewline -ForegroundColor White
    Write-Host "Histórico de Auditoria" -NoNewline -ForegroundColor Cyan
    Write-Host "                          " -NoNewline
    Write-Host "[Atualizar]" -NoNewline -ForegroundColor Green
    Write-Host "        │" -ForegroundColor White
    Write-Host "  ├──────────────────────────────────────────────────────────────────┤" -ForegroundColor White
    Write-Host "  │ Data/Hora         Usuário    Ação      Entidade                 │" -ForegroundColor White
    Write-Host "  │ 27/01/26 15:58    admin      " -NoNewline -ForegroundColor White
    Write-Host "CREATE" -NoNewline -ForegroundColor Green
    Write-Host "    config                   │" -ForegroundColor White
    Write-Host "  │ 27/01/26 15:45    admin      " -NoNewline -ForegroundColor White
    Write-Host "UPDATE" -NoNewline -ForegroundColor Yellow
    Write-Host "    config                   │" -ForegroundColor White
    Write-Host "  │ 27/01/26 15:30    admin      " -NoNewline -ForegroundColor White
    Write-Host "DELETE" -NoNewline -ForegroundColor Red
    Write-Host "    config                   │" -ForegroundColor White
    Write-Host "  │ 27/01/26 15:15    admin      " -NoNewline -ForegroundColor White
    Write-Host "CREATE" -NoNewline -ForegroundColor Green
    Write-Host "    config                   │" -ForegroundColor White
    Write-Host "  └──────────────────────────────────────────────────────────────────┘" -ForegroundColor White
    Write-Host ""
    Write-Host "  Pressione ENTER para finalizar a demo..." -ForegroundColor Yellow
    Read-Host
}

function Show-FinalScreen {
    Show-Header
    Write-Host "  " -NoNewline
    Write-Host "✅ Demonstração Concluída!" -ForegroundColor Green
    Write-Host ""
    Write-Host "  Para executar a aplicação real:" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "  1. Instale o Docker Desktop:" -ForegroundColor Yellow
    Write-Host "     https://www.docker.com/products/docker-desktop" -ForegroundColor White
    Write-Host ""
    Write-Host "  2. Execute o script de inicialização:" -ForegroundColor Yellow
    Write-Host "     .\start.ps1" -ForegroundColor White
    Write-Host ""
    Write-Host "  3. Acesse no navegador:" -ForegroundColor Yellow
    Write-Host "     http://localhost" -ForegroundColor White
    Write-Host ""
    Write-Host "  4. Login com:" -ForegroundColor Yellow
    Write-Host "     Usuário: admin" -ForegroundColor White
    Write-Host "     Senha: admin123" -ForegroundColor White
    Write-Host ""
    Write-Host "  Características da aplicação:" -ForegroundColor Cyan
    Write-Host "  ✅ Atualização automática a cada 30 segundos" -ForegroundColor White
    Write-Host "  ✅ 5 integrações de segurança (com mocks)" -ForegroundColor White
    Write-Host "  ✅ Criptografia de credenciais no banco" -ForegroundColor White
    Write-Host "  ✅ Auditoria completa de mudanças" -ForegroundColor White
    Write-Host "  ✅ Interface responsiva e profissional" -ForegroundColor White
    Write-Host "  ✅ Tratamento resiliente de erros" -ForegroundColor White
    Write-Host ""
    Write-Host "  Pressione ENTER para sair..." -ForegroundColor Yellow
    Read-Host
}

# Executar a demo
Show-LoginScreen
Show-Dashboard
Show-ControlPanel
Show-FinalScreen

Clear-Host
Write-Host "Obrigado por usar o SOC Dashboard! 🚀" -ForegroundColor Cyan
Write-Host ""
