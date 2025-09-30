# 🔌 Exemplos de Uso da API

## 📡 Endpoints REST

### 1. Verificar Status da API

```bash
curl http://localhost:8000
```

**Resposta:**
```json
{
  "message": "Dashboard API está funcionando!",
  "version": "1.0.0"
}
```

---

### 2. Obter Resumo das Métricas

```bash
curl http://localhost:8000/api/metrics/summary
```

**Resposta:**
```json
{
  "totalUsers": 12543,
  "activeUsers": 6789,
  "revenue": 78432.50,
  "conversionRate": 4.2,
  "timestamp": "2025-09-30T10:30:00"
}
```

---

### 3. Obter Dados de Vendas

```bash
curl http://localhost:8000/api/metrics/sales
```

**Resposta:**
```json
[
  {
    "date": "2025-09-01",
    "vendas": 8234.50,
    "lucro": 2456.30,
    "pedidos": 145,
    "ticketMedio": 56.78
  },
  ...
]
```

---

### 4. Obter Dados de Tráfego

```bash
curl http://localhost:8000/api/metrics/traffic
```

**Resposta:**
```json
[
  {
    "hora": "00:00",
    "visitantes": 456,
    "pageviews": 1234,
    "bounceRate": 42.5
  },
  ...
]
```

---

### 5. Obter Dados de Performance

```bash
curl http://localhost:8000/api/metrics/performance
```

**Resposta:**
```json
[
  {
    "timestamp": "10:00",
    "cpu": 45.2,
    "memoria": 68.5,
    "disco": 55.0,
    "rede": 234.5,
    "tempoResposta": 125.5
  },
  ...
]
```

---

### 6. Obter Dados de Usuários

```bash
curl http://localhost:8000/api/metrics/users
```

**Resposta:**
```json
{
  "porRegiao": [
    {"regiao": "Norte", "usuarios": 2345},
    {"regiao": "Sul", "usuarios": 3456}
  ],
  "porIdade": [...],
  "novosVsRecorrentes": {...},
  "dispositivosAtivos": [...]
}
```

---

### 7. Gerar Relatório Personalizado

```bash
curl -X POST http://localhost:8000/api/reports/generate \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Relatório Mensal",
    "metrics": ["sales", "traffic"],
    "dateRange": "30days",
    "format": "json"
  }'
```

**Resposta:**
```json
{
  "id": "report_1727698200",
  "title": "Relatório Mensal",
  "generatedAt": "2025-09-30T10:30:00",
  "dateRange": "30days",
  "format": "json",
  "data": {
    "sales": [...],
    "traffic": [...]
  }
}
```

---

## 🔌 WebSocket

### Conectar ao Stream de Dados em Tempo Real

**URL:** `ws://localhost:8000/ws/realtime`

**Exemplo em JavaScript:**
```javascript
const ws = new WebSocket('ws://localhost:8000/ws/realtime');

ws.onopen = () => {
  console.log('Conectado ao WebSocket');
};

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log('Dados recebidos:', data);
};

ws.onerror = (error) => {
  console.error('Erro:', error);
};
```

**Estrutura dos Dados Recebidos:**
```json
{
  "timestamp": "2025-09-30T10:30:00",
  "metrics": {
    "activeUsers": 687,
    "requestsPerSecond": 145,
    "cpuUsage": 56.3,
    "memoryUsage": 68.2,
    "responseTime": 125.5,
    "errorRate": 0.5
  },
  "recentSales": [
    {
      "id": "sale_1",
      "amount": 234.50,
      "product": "Produto A",
      "timestamp": "2025-09-30T10:30:00"
    }
  ]
}
```

---

## 🐍 Exemplos em Python

### Usando `requests`

```python
import requests

# Obter resumo
response = requests.get('http://localhost:8000/api/metrics/summary')
data = response.json()
print(f"Total de usuários: {data['totalUsers']}")

# Gerar relatório
config = {
    "title": "Relatório de Vendas",
    "metrics": ["sales"],
    "dateRange": "30days",
    "format": "json"
}
response = requests.post(
    'http://localhost:8000/api/reports/generate',
    json=config
)
report = response.json()
print(f"Relatório gerado: {report['id']}")
```

---

## 🟢 Exemplos em Node.js

### Usando `axios`

```javascript
const axios = require('axios');

// Obter dados de vendas
async function getSalesData() {
  try {
    const response = await axios.get('http://localhost:8000/api/metrics/sales');
    console.log('Vendas:', response.data);
  } catch (error) {
    console.error('Erro:', error);
  }
}

// Gerar relatório
async function generateReport() {
  try {
    const response = await axios.post('http://localhost:8000/api/reports/generate', {
      title: 'Relatório Completo',
      metrics: ['sales', 'traffic', 'performance'],
      dateRange: '30days',
      format: 'json'
    });
    console.log('Relatório:', response.data);
  } catch (error) {
    console.error('Erro:', error);
  }
}
```

---

## 📊 Documentação Interativa

Acesse a documentação Swagger em:
**http://localhost:8000/docs**

Lá você pode:
- Ver todos os endpoints
- Testar requisições diretamente no navegador
- Ver esquemas de dados
- Obter exemplos de respostas

---

## 🧪 Testes com PowerShell

```powershell
# Testar endpoint
Invoke-RestMethod -Uri "http://localhost:8000/api/metrics/summary" -Method Get

# Gerar relatório
$body = @{
    title = "Relatório Teste"
    metrics = @("sales", "traffic")
    dateRange = "30days"
    format = "json"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:8000/api/reports/generate" `
                  -Method Post `
                  -Body $body `
                  -ContentType "application/json"
```

---

## 🎯 Rate Limits

Atualmente **não há** rate limits configurados.

## 🔐 Autenticação

Atualmente **não há** autenticação requerida.

---

**💡 Dica:** Use a documentação Swagger em `/docs` para testar todos os endpoints interativamente!
