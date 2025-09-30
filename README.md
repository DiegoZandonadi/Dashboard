<div align="center">

# 📊 Dashboard Interativo

### Análise de Dados em Tempo Real

[![React](https://img.shields.io/badge/React-18.2-61dafb?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2-3178c6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.104-009688?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com/)
[![Python](https://img.shields.io/badge/Python-3.8+-3776ab?style=for-the-badge&logo=python)](https://www.python.org/)

Um dashboard moderno e interativo para análise de dados com gráficos em tempo real e relatórios personalizados.

[🚀 Início Rápido](#-instalação-e-execução) •
[📚 Documentação](#-tecnologias-utilizadas) •
[🎯 Funcionalidades](#-funcionalidades) •
[🔌 API](#-api-endpoints)

</div>

---

## ✨ Funcionalidades

### 🎯 Dashboard Principal
- **Métricas em Tempo Real**: Atualização automática via WebSocket
- **Cards de Métricas**: Total de usuários, usuários ativos, receita e taxa de conversão
- **Gráficos Interativos**:
  - 📈 Gráfico de vendas e lucro (últimos 30 dias)
  - 👥 Gráfico de tráfego por hora
  - ⚡ Gráfico de performance do sistema (24h)

### 📄 Sistema de Relatórios
- **Relatórios Personalizados**: Configure métricas, período e formato
- **Múltiplas Métricas**: Vendas, tráfego, performance e usuários
- **Exportação**: Suporte para JSON, CSV e PDF
- **Download**: Baixe relatórios gerados diretamente

### 🔄 Dados em Tempo Real
- Conexão WebSocket para atualizações instantâneas
- Métricas de sistema (CPU, memória, requisições/s, tempo de resposta)
- Feed de vendas recentes
- Indicador visual de status de conexão

## 🚀 Tecnologias Utilizadas

### Frontend
- **React 18** com **TypeScript**
- **Vite** - Build tool ultrarrápido
- **Tailwind CSS** - Estilização moderna
- **Recharts** - Gráficos interativos
- **Axios** - Cliente HTTP
- **Lucide React** - Ícones
- **date-fns** - Manipulação de datas

### Backend
- **FastAPI** - Framework Python moderno
- **WebSocket** - Comunicação em tempo real
- **Pydantic** - Validação de dados
- **Uvicorn** - Servidor ASGI

## 📦 Instalação e Execução

### Pré-requisitos
- Node.js 18+ e npm/yarn
- Python 3.8+
- pip

### 1. Configurar Backend

```bash
# Navegar para o diretório do backend
cd backend

# Criar ambiente virtual (opcional, mas recomendado)
python -m venv venv

# Ativar ambiente virtual
# Windows:
venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

# Instalar dependências
pip install -r requirements.txt

# Iniciar o servidor
python main.py
```

O backend estará rodando em: `http://localhost:8000`

### 2. Configurar Frontend

```bash
# Navegar para o diretório do frontend
cd frontend

# Instalar dependências
npm install

# Iniciar o servidor de desenvolvimento
npm run dev
```

O frontend estará rodando em: `http://localhost:3000`

## 🎨 Interface do Usuário

### Dashboard
- **Cards de métricas** com indicadores de tendência
- **Gráficos responsivos** que se adaptam a diferentes tamanhos de tela
- **Design moderno** com gradientes e animações suaves
- **Modo escuro** por padrão para melhor visualização

### Relatórios
- **Interface intuitiva** para configuração de relatórios
- **Seleção múltipla** de métricas
- **Pré-visualização** do relatório gerado
- **Download rápido** em diversos formatos

## 📡 API Endpoints

### REST API

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/metrics/summary` | Resumo das métricas principais |
| GET | `/api/metrics/sales` | Dados de vendas (30 dias) |
| GET | `/api/metrics/traffic` | Dados de tráfego por hora |
| GET | `/api/metrics/performance` | Métricas de performance (24h) |
| GET | `/api/metrics/users` | Dados demográficos de usuários |
| POST | `/api/reports/generate` | Gerar relatório personalizado |


## 🎯 Funcionalidades Destacadas

### 1. Métricas em Tempo Real
O dashboard utiliza WebSocket para receber atualizações em tempo real:
- Usuários ativos
- Requisições por segundo
- Uso de CPU e memória
- Tempo de resposta
- Taxa de erro
- Vendas recentes

### 2. Gráficos Interativos
Todos os gráficos são interativos com:
- Tooltips informativos
- Legendas customizáveis
- Responsividade completa
- Animações suaves

### 3. Relatórios Personalizados
Sistema completo de geração de relatórios:
- Escolha métricas específicas
- Defina o período de análise
- Selecione o formato de exportação
- Faça download instantâneo

## 🔧 Customização

### Adicionar Novas Métricas

1. **Backend** (`data_generator.py`):
```python
def generate_new_metric(self) -> List[Dict]:
    # Sua lógica aqui
    return data
```

2. **Backend** (`main.py`):
```python
@app.get("/api/metrics/new-metric")
async def get_new_metric():
    return data_generator.generate_new_metric()
```

3. **Frontend** (`services/api.ts`):
```typescript
export const fetchNewMetric = async () => {
  const response = await api.get('/api/metrics/new-metric')
  return response.data
}
```

### Personalizar Cores e Tema

Edite o arquivo `frontend/tailwind.config.js` para customizar o tema:
```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Suas cores aqui
      }
    }
  }
}
```

## 📊 Dados Simulados

O backend gera dados simulados realistas para demonstração:
- Vendas com variação diária
- Tráfego com picos em horário comercial
- Performance do sistema com flutuações
- Dados demográficos variados

## 🐛 Solução de Problemas

### Backend não inicia
- Verifique se todas as dependências foram instaladas: `pip install -r requirements.txt`
- Confirme que a porta 8000 está disponível

### Frontend não conecta ao backend
- Verifique se o backend está rodando em `http://localhost:8000`
- Confirme as configurações de proxy no `vite.config.ts`

### WebSocket não conecta
- Verifique o firewall
- Confirme que o backend aceita conexões WebSocket
- Veja o console do navegador para mensagens de erro

## 📝 Licença

Este projeto é open-source e está disponível sob a licença MIT.

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para:
1. Fazer fork do projeto
2. Criar uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abrir um Pull Request

## 📧 Contato

Para dúvidas ou sugestões, sinta-se à vontade para abrir uma issue.

---

**Desenvolvido com ❤️ usando React, TypeScript e Python**
