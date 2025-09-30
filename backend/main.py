from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import asyncio
import json
from datetime import datetime
import random
from data_generator import DataGenerator

app = FastAPI(title="Dashboard API", version="1.0.0")

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Gerenciador de conexões WebSocket
class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def broadcast(self, message: dict):
        for connection in self.active_connections:
            try:
                await connection.send_json(message)
            except:
                pass

manager = ConnectionManager()
data_generator = DataGenerator()

# Modelos
class ReportConfig(BaseModel):
    title: str
    metrics: List[str]
    dateRange: str
    format: str

class MetricData(BaseModel):
    timestamp: str
    value: float
    metric: str

# Rotas
@app.get("/")
async def root():
    return {"message": "Dashboard API está funcionando!", "version": "1.0.0"}

@app.get("/api/metrics/summary")
async def get_metrics_summary():
    """Retorna resumo das métricas principais"""
    return {
        "totalUsers": random.randint(10000, 15000),
        "activeUsers": random.randint(5000, 8000),
        "revenue": round(random.uniform(50000, 100000), 2),
        "conversionRate": round(random.uniform(2.5, 5.5), 2),
        "timestamp": datetime.now().isoformat()
    }

@app.get("/api/metrics/sales")
async def get_sales_data():
    """Retorna dados de vendas para gráficos"""
    return data_generator.generate_sales_data()

@app.get("/api/metrics/traffic")
async def get_traffic_data():
    """Retorna dados de tráfego"""
    return data_generator.generate_traffic_data()

@app.get("/api/metrics/performance")
async def get_performance_data():
    """Retorna dados de performance"""
    return data_generator.generate_performance_data()

@app.get("/api/metrics/users")
async def get_users_data():
    """Retorna dados de usuários"""
    return data_generator.generate_users_data()

@app.post("/api/reports/generate")
async def generate_report(config: ReportConfig):
    """Gera relatório personalizado baseado na configuração"""
    report_data = {
        "id": f"report_{datetime.now().timestamp()}",
        "title": config.title,
        "generatedAt": datetime.now().isoformat(),
        "dateRange": config.dateRange,
        "format": config.format,
        "data": {}
    }
    
    # Gerar dados baseados nas métricas solicitadas
    for metric in config.metrics:
        if metric == "sales":
            report_data["data"]["sales"] = data_generator.generate_sales_data()
        elif metric == "traffic":
            report_data["data"]["traffic"] = data_generator.generate_traffic_data()
        elif metric == "performance":
            report_data["data"]["performance"] = data_generator.generate_performance_data()
        elif metric == "users":
            report_data["data"]["users"] = data_generator.generate_users_data()
    
    return report_data

@app.websocket("/ws/realtime")
async def websocket_endpoint(websocket: WebSocket):
    """WebSocket para dados em tempo real"""
    await manager.connect(websocket)
    try:
        while True:
            # Enviar dados atualizados a cada 2 segundos
            realtime_data = {
                "timestamp": datetime.now().isoformat(),
                "metrics": {
                    "activeUsers": random.randint(500, 1000),
                    "requestsPerSecond": random.randint(50, 200),
                    "cpuUsage": round(random.uniform(20, 80), 2),
                    "memoryUsage": round(random.uniform(40, 75), 2),
                    "responseTime": round(random.uniform(50, 300), 2),
                    "errorRate": round(random.uniform(0, 2), 2)
                },
                "recentSales": [
                    {
                        "id": f"sale_{i}",
                        "amount": round(random.uniform(10, 500), 2),
                        "product": random.choice(["Produto A", "Produto B", "Produto C", "Produto D"]),
                        "timestamp": datetime.now().isoformat()
                    }
                    for i in range(5)
                ]
            }
            
            await manager.broadcast(realtime_data)
            await asyncio.sleep(2)
            
    except WebSocketDisconnect:
        manager.disconnect(websocket)
    except Exception as e:
        print(f"Erro no WebSocket: {e}")
        manager.disconnect(websocket)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
