import { useState, useEffect } from 'react'
import { Users, DollarSign, TrendingUp, Activity, Zap, Clock } from 'lucide-react'
import MetricCard from './MetricCard'
import SalesChart from './charts/SalesChart'
import TrafficChart from './charts/TrafficChart'
import PerformanceChart from './charts/PerformanceChart'
import RealtimeMetrics from './RealtimeMetrics'
import { useWebSocket } from '../hooks/useWebSocket'
import {
  fetchMetricsSummary,
  fetchSalesData,
  fetchTrafficData,
  fetchPerformanceData,
  type MetricsSummary,
  type SalesData,
  type TrafficData,
  type PerformanceData,
} from '../services/api'

const Dashboard = () => {
  const [summary, setSummary] = useState<MetricsSummary | null>(null)
  const [salesData, setSalesData] = useState<SalesData[]>([])
  const [trafficData, setTrafficData] = useState<TrafficData[]>([])
  const [performanceData, setPerformanceData] = useState<PerformanceData[]>([])
  const [loading, setLoading] = useState(true)

  const { data: realtimeData, isConnected } = useWebSocket('ws://localhost:8000/ws/realtime')

  useEffect(() => {
    loadDashboardData()
    const interval = setInterval(loadDashboardData, 30000) // Atualizar a cada 30 segundos
    return () => clearInterval(interval)
  }, [])

  const loadDashboardData = async () => {
    try {
      const [summaryRes, salesRes, trafficRes, performanceRes] = await Promise.all([
        fetchMetricsSummary(),
        fetchSalesData(),
        fetchTrafficData(),
        fetchPerformanceData(),
      ])

      setSummary(summaryRes)
      setSalesData(salesRes)
      setTrafficData(trafficRes)
      setPerformanceData(performanceRes)
    } catch (error) {
      console.error('Erro ao carregar dados:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Status de conexão em tempo real */}
      <div className="flex items-center justify-between bg-gray-800/30 rounded-lg px-4 py-2 border border-gray-700/50">
        <div className="flex items-center space-x-2">
          <Zap className="w-4 h-4 text-yellow-400" />
          <span className="text-sm text-gray-400">Dados em Tempo Real</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
          <span className="text-xs text-gray-400">
            {isConnected ? 'Conectado' : 'Desconectado'}
          </span>
        </div>
      </div>

      {/* Cards de métricas principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total de Usuários"
          value={summary?.totalUsers.toLocaleString() || '0'}
          icon={Users}
          trend={8.5}
          color="blue"
        />
        <MetricCard
          title="Usuários Ativos"
          value={realtimeData?.metrics.activeUsers || summary?.activeUsers || 0}
          icon={Activity}
          color="green"
          isRealtime={isConnected}
        />
        <MetricCard
          title="Receita"
          value={`$${summary?.revenue.toLocaleString() || '0'}`}
          icon={DollarSign}
          trend={12.3}
          color="purple"
        />
        <MetricCard
          title="Taxa de Conversão"
          value={`${summary?.conversionRate || 0}%`}
          icon={TrendingUp}
          trend={-2.1}
          color="orange"
        />
      </div>

      {/* Métricas em tempo real */}
      {isConnected && realtimeData && (
        <RealtimeMetrics data={realtimeData} />
      )}

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SalesChart data={salesData} />
        <TrafficChart data={trafficData} />
      </div>

      <div className="grid grid-cols-1 gap-6">
        <PerformanceChart data={performanceData} />
      </div>
    </div>
  )
}

export default Dashboard
