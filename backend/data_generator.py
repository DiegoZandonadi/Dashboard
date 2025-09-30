import random
from datetime import datetime, timedelta
from typing import List, Dict

class DataGenerator:
    """Gerador de dados simulados para o dashboard"""
    
    def __init__(self):
        self.products = ["Produto A", "Produto B", "Produto C", "Produto D", "Produto E"]
        self.categories = ["Eletrônicos", "Roupas", "Alimentos", "Livros", "Esportes"]
        self.regions = ["Norte", "Sul", "Leste", "Oeste", "Centro"]
        
    def generate_sales_data(self) -> List[Dict]:
        """Gera dados de vendas para os últimos 30 dias"""
        data = []
        base_date = datetime.now() - timedelta(days=30)
        
        for i in range(30):
            date = base_date + timedelta(days=i)
            data.append({
                "date": date.strftime("%Y-%m-%d"),
                "vendas": round(random.uniform(5000, 15000), 2),
                "lucro": round(random.uniform(1000, 5000), 2),
                "pedidos": random.randint(50, 200),
                "ticketMedio": round(random.uniform(50, 150), 2)
            })
        
        return data
    
    def generate_traffic_data(self) -> List[Dict]:
        """Gera dados de tráfego por hora do dia"""
        data = []
        
        for hour in range(24):
            # Simular padrão de tráfego mais alto durante horário comercial
            base_traffic = 1000
            if 9 <= hour <= 18:
                multiplier = random.uniform(1.5, 2.5)
            else:
                multiplier = random.uniform(0.3, 1.0)
            
            data.append({
                "hora": f"{hour:02d}:00",
                "visitantes": int(base_traffic * multiplier),
                "pageviews": int(base_traffic * multiplier * random.uniform(2, 4)),
                "bounceRate": round(random.uniform(30, 60), 2)
            })
        
        return data
    
    def generate_performance_data(self) -> List[Dict]:
        """Gera dados de performance do sistema"""
        data = []
        base_time = datetime.now() - timedelta(hours=24)
        
        for i in range(24):
            time = base_time + timedelta(hours=i)
            data.append({
                "timestamp": time.strftime("%H:%M"),
                "cpu": round(random.uniform(20, 80), 2),
                "memoria": round(random.uniform(40, 75), 2),
                "disco": round(random.uniform(50, 70), 2),
                "rede": round(random.uniform(100, 500), 2),
                "tempoResposta": round(random.uniform(50, 300), 2)
            })
        
        return data
    
    def generate_users_data(self) -> Dict:
        """Gera dados demográficos de usuários"""
        return {
            "porRegiao": [
                {"regiao": region, "usuarios": random.randint(1000, 5000)}
                for region in self.regions
            ],
            "porIdade": [
                {"faixa": "18-24", "usuarios": random.randint(500, 2000)},
                {"faixa": "25-34", "usuarios": random.randint(1000, 3000)},
                {"faixa": "35-44", "usuarios": random.randint(800, 2500)},
                {"faixa": "45-54", "usuarios": random.randint(500, 1500)},
                {"faixa": "55+", "usuarios": random.randint(300, 1000)}
            ],
            "novosVsRecorrentes": {
                "novos": random.randint(3000, 5000),
                "recorrentes": random.randint(5000, 8000)
            },
            "dispositivosAtivos": [
                {"dispositivo": "Desktop", "porcentagem": round(random.uniform(40, 50), 2)},
                {"dispositivo": "Mobile", "porcentagem": round(random.uniform(35, 45), 2)},
                {"dispositivo": "Tablet", "porcentagem": round(random.uniform(10, 20), 2)}
            ]
        }
    
    def generate_category_sales(self) -> List[Dict]:
        """Gera dados de vendas por categoria"""
        return [
            {
                "categoria": category,
                "vendas": round(random.uniform(10000, 50000), 2),
                "crescimento": round(random.uniform(-10, 30), 2)
            }
            for category in self.categories
        ]
    
    def generate_top_products(self) -> List[Dict]:
        """Gera lista de produtos mais vendidos"""
        products = []
        for i, product in enumerate(self.products):
            products.append({
                "rank": i + 1,
                "produto": product,
                "vendas": round(random.uniform(5000, 20000), 2),
                "unidades": random.randint(100, 500),
                "avaliacoes": round(random.uniform(3.5, 5.0), 1)
            })
        
        return sorted(products, key=lambda x: x["vendas"], reverse=True)
