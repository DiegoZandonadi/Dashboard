# 🚀 Início Rápido - Dashboard Interativo

## ⚡ Opção 1: Script Automático (Windows)

A forma mais rápida de iniciar o projeto:

```bash
# Execute o script que inicia backend e frontend automaticamente
scripts\start-all.bat
```

Este script irá:
1. ✅ Criar ambiente virtual Python (se necessário)
2. ✅ Instalar dependências do backend
3. ✅ Iniciar servidor FastAPI (porta 8000)
4. ✅ Instalar dependências do frontend
5. ✅ Iniciar servidor Vite (porta 3000)

Aguarde alguns segundos e acesse: **http://localhost:3000**

---

## 📋 Opção 2: Execução Manual

### Passo 1: Backend

```bash
# Navegar para o backend
cd backend

# Criar ambiente virtual (primeira vez)
python -m venv venv

# Ativar ambiente virtual
venv\Scripts\activate          # Windows
source venv/bin/activate       # Linux/Mac

# Instalar dependências
pip install -r requirements.txt

# Iniciar servidor
python main.py
```

✅ Backend rodando em: `http://localhost:8000`

### Passo 2: Frontend (Em outro terminal)

```bash
# Navegar para o frontend
cd frontend

# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev
```

✅ Frontend rodando em: `http://localhost:3000`

---

## 🎯 Primeiro Acesso

1. **Abra o navegador** em `http://localhost:3000`

2. **Explore o Dashboard:**
   - Veja as métricas principais nos cards
   - Observe os gráficos interativos
   - Aguarde a conexão WebSocket (indicador verde)
   - Veja as métricas em tempo real sendo atualizadas

3. **Gere um Relatório:**
   - Clique na aba "Relatórios"
   - Selecione as métricas desejadas
   - Escolha o período
   - Clique em "Gerar Relatório"
   - Faça download do resultado

---

## 🔍 Verificação de Status

### Backend
Acesse: http://localhost:8000
- Deve retornar: `{"message": "Dashboard API está funcionando!", "version": "1.0.0"}`

### Documentação da API
Acesse: http://localhost:8000/docs
- Interface interativa Swagger UI com todos os endpoints

### WebSocket
O frontend conectará automaticamente em: `ws://localhost:8000/ws/realtime`
- Status visível no topo do dashboard

---

## ❓ Problemas Comuns

### Backend não inicia
- **Erro:** `ModuleNotFoundError`
  - **Solução:** Execute `pip install -r requirements.txt` novamente

- **Erro:** `Port 8000 already in use`
  - **Solução:** Feche outros processos na porta 8000 ou altere em `main.py`

### Frontend não inicia
- **Erro:** `command not found: npm`
  - **Solução:** Instale Node.js de https://nodejs.org

- **Erro:** Dependências não instaladas
  - **Solução:** Delete `node_modules` e execute `npm install` novamente

### WebSocket não conecta
- Verifique se o backend está rodando
- Verifique se não há firewall bloqueando
- Veja o console do navegador (F12) para detalhes

---

## 🎨 Recursos do Dashboard

### 📊 Gráficos Disponíveis
1. **Vendas e Lucro** - Área chart dos últimos 30 dias
2. **Tráfego por Hora** - Bar chart com visitantes e pageviews
3. **Performance do Sistema** - Line chart com CPU, memória e disco

### 🔄 Métricas em Tempo Real
- Usuários ativos no momento
- Requisições por segundo
- Uso de CPU e memória
- Tempo de resposta médio
- Taxa de erro
- Feed de vendas recentes

### 📄 Relatórios Personalizados
- Selecione múltiplas métricas
- Escolha período (7, 30, 90 dias ou 1 ano)
- Exporte em JSON, CSV ou PDF
- Download instantâneo

---

## 🛑 Parar os Servidores

### Backend
Pressione `Ctrl + C` no terminal do backend

### Frontend
Pressione `Ctrl + C` no terminal do frontend

### Scripts (Windows)
Feche as janelas do terminal ou pressione `Ctrl + C`

---

## 📚 Próximos Passos

1. Leia o [README.md](README.md) completo para mais detalhes
2. Explore a API em http://localhost:8000/docs
3. Customize cores e temas em `frontend/tailwind.config.js`
4. Adicione novas métricas seguindo os exemplos em `data_generator.py`

---

**🎉 Divirta-se explorando o Dashboard!**
