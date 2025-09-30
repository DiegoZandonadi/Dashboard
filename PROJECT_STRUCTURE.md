# 📁 Estrutura do Projeto - Dashboard Interativo

```
Dashboard/
│
├── 📂 backend/                      # Backend Python (FastAPI)
│   ├── main.py                      # API principal com endpoints REST e WebSocket
│   ├── data_generator.py            # Gerador de dados simulados realistas
│   ├── requirements.txt             # Dependências Python
│   └── .env.example                 # Exemplo de configuração de ambiente
│
├── 📂 frontend/                     # Frontend React + TypeScript
│   ├── 📂 src/
│   │   ├── 📂 components/
│   │   │   ├── Dashboard.tsx                 # 🎯 Componente principal do dashboard
│   │   │   ├── MetricCard.tsx               # 📊 Card de métrica com ícone e tendência
│   │   │   ├── RealtimeMetrics.tsx          # ⚡ Painel de métricas em tempo real
│   │   │   ├── ReportGenerator.tsx          # 📄 Gerador de relatórios personalizados
│   │   │   └── 📂 charts/
│   │   │       ├── SalesChart.tsx           # 📈 Gráfico de área (vendas/lucro)
│   │   │       ├── TrafficChart.tsx         # 📊 Gráfico de barras (tráfego)
│   │   │       └── PerformanceChart.tsx     # 📉 Gráfico de linhas (performance)
│   │   │
│   │   ├── 📂 hooks/
│   │   │   └── useWebSocket.ts              # 🔌 Hook customizado para WebSocket
│   │   │
│   │   ├── 📂 services/
│   │   │   └── api.ts                       # 🌐 Cliente HTTP com tipos TypeScript
│   │   │
│   │   ├── App.tsx                          # Componente raiz da aplicação
│   │   ├── main.tsx                         # Entry point do React
│   │   ├── index.css                        # Estilos globais + Tailwind
│   │   └── vite-env.d.ts                    # Tipos do Vite
│   │
│   ├── index.html                   # HTML base
│   ├── package.json                 # Dependências Node.js
│   ├── tsconfig.json                # Configuração TypeScript
│   ├── tsconfig.node.json           # Configuração TypeScript para Node
│   ├── vite.config.ts               # Configuração Vite + Proxy
│   ├── tailwind.config.js           # Configuração Tailwind CSS
│   └── postcss.config.js            # Configuração PostCSS
│
├── 📂 scripts/                      # Scripts úteis para Windows
│   ├── start-backend.bat            # Inicia apenas o backend
│   ├── start-frontend.bat           # Inicia apenas o frontend
│   └── start-all.bat                # ⭐ Inicia tudo automaticamente
│
├── README.md                        # 📚 Documentação completa
├── QUICK_START.md                   # 🚀 Guia de início rápido
├── PROJECT_STRUCTURE.md             # 📁 Este arquivo
└── .gitignore                       # Arquivos ignorados pelo Git
```

---

## 🎯 Componentes Principais

### Backend (Python)

#### `main.py` - Servidor FastAPI
- ✅ 6 endpoints REST para métricas
- ✅ 1 endpoint WebSocket para tempo real
- ✅ CORS configurado
- ✅ Gerenciador de conexões WebSocket
- ✅ Documentação automática Swagger

#### `data_generator.py` - Gerador de Dados
- 📊 Dados de vendas (30 dias)
- 👥 Dados de tráfego (24 horas)
- ⚡ Dados de performance do sistema
- 👤 Dados demográficos de usuários
- 🎲 Valores aleatórios realistas

### Frontend (React + TypeScript)

#### Componentes de UI

| Componente | Descrição | Features |
|------------|-----------|----------|
| `Dashboard.tsx` | Página principal | Integra todos os componentes, gerencia estado |
| `MetricCard.tsx` | Card de métrica | Ícone, valor, tendência, animações |
| `RealtimeMetrics.tsx` | Painel em tempo real | WebSocket, atualização automática |
| `ReportGenerator.tsx` | Gerador de relatórios | Configuração, geração, download |

#### Componentes de Gráficos

| Gráfico | Tipo | Dados | Bibliotec |
|---------|------|-------|-----------|
| `SalesChart` | Area Chart | Vendas + Lucro | Recharts |
| `TrafficChart` | Bar Chart | Visitantes + Pageviews | Recharts |
| `PerformanceChart` | Line Chart | CPU + Memória + Disco | Recharts |

#### Services & Hooks

| Arquivo | Propósito |
|---------|-----------|
| `api.ts` | Cliente HTTP com Axios, tipos TypeScript |
| `useWebSocket.ts` | Hook customizado para conexão WebSocket |

---

## 🔄 Fluxo de Dados

```
┌─────────────┐
│   Browser   │
│ (Frontend)  │
└──────┬──────┘
       │
       ├─── HTTP REST ────┐
       │                  │
       ├─── WebSocket ────┤
       │                  ▼
       │         ┌──────────────┐
       │         │   FastAPI    │
       │         │   (Backend)  │
       │         └──────┬───────┘
       │                │
       │                ├─── data_generator.py
       │                │     (Dados Simulados)
       │                │
       └────────────────┘
     (Atualização em Tempo Real)
```

---

## 🎨 Tecnologias por Camada

### Frontend
```
React 18 (UI Framework)
  └── TypeScript (Type Safety)
      └── Vite (Build Tool)
          ├── Tailwind CSS (Styling)
          ├── Recharts (Charts)
          ├── Axios (HTTP Client)
          └── Lucide React (Icons)
```

### Backend
```
FastAPI (Web Framework)
  ├── Uvicorn (ASGI Server)
  ├── Pydantic (Data Validation)
  └── WebSockets (Real-time)
```

---

## 📊 Endpoints Disponíveis

### REST API

| Método | Rota | Retorna |
|--------|------|---------|
| `GET` | `/` | Status da API |
| `GET` | `/api/metrics/summary` | Resumo geral |
| `GET` | `/api/metrics/sales` | Dados de vendas (30 dias) |
| `GET` | `/api/metrics/traffic` | Dados de tráfego (24h) |
| `GET` | `/api/metrics/performance` | Performance do sistema (24h) |
| `GET` | `/api/metrics/users` | Dados de usuários |
| `POST` | `/api/reports/generate` | Gera relatório personalizado |

### WebSocket

| Rota | Descrição |
|------|-----------|
| `/ws/realtime` | Stream de métricas em tempo real (atualização a cada 2s) |

---

## 🚀 Scripts de Inicialização

### Windows

1. **`start-all.bat`** ⭐ Recomendado
   - Inicia backend E frontend automaticamente
   - Cria ambientes virtuais se necessário
   - Instala dependências
   - Abre em janelas separadas

2. **`start-backend.bat`**
   - Apenas backend
   - Porta 8000

3. **`start-frontend.bat`**
   - Apenas frontend
   - Porta 3000

### Linux/Mac

Use os comandos manuais descritos no `QUICK_START.md`

---

## 📦 Dependências

### Backend (Python)
```
fastapi==0.104.1        # Framework web
uvicorn==0.24.0         # Servidor ASGI
pydantic==2.5.0         # Validação de dados
websockets==12.0        # Suporte WebSocket
```

### Frontend (Node.js)
```
react@18.2.0            # UI Library
typescript@5.2.2        # Tipagem estática
vite@5.0.8              # Build tool
recharts@2.10.3         # Gráficos
axios@1.6.2             # Cliente HTTP
tailwindcss@3.3.6       # CSS Framework
lucide-react@0.294.0    # Ícones
```

---

## 🎯 Próximas Funcionalidades Sugeridas

- [ ] Autenticação de usuários
- [ ] Persistência de dados em banco
- [ ] Mais tipos de gráficos (Pizza, Radar, etc)
- [ ] Exportação em PDF real
- [ ] Temas claro/escuro
- [ ] Filtros avançados
- [ ] Dashboard customizável (drag & drop)
- [ ] Notificações em tempo real
- [ ] Integração com APIs externas

---

**📚 Para mais informações, consulte [README.md](README.md) ou [QUICK_START.md](QUICK_START.md)**
