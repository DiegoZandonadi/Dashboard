import { Activity, Cpu, HardDrive, Zap, Clock, AlertCircle } from 'lucide-react'
import { RealtimeData } from '../hooks/useWebSocket'
import { format } from 'date-fns'

interface RealtimeMetricsProps {
  data: RealtimeData
}

const RealtimeMetrics = ({ data }: RealtimeMetricsProps) => {
  const metrics = [
    {
      label: 'Req/s',
      value: data.metrics.requestsPerSecond,
      icon: Zap,
      color: 'text-yellow-400',
      unit: ''
    },
    {
      label: 'CPU',
      value: data.metrics.cpuUsage,
      icon: Cpu,
      color: 'text-blue-400',
      unit: '%'
    },
    {
      label: 'Memória',
      value: data.metrics.memoryUsage,
      icon: HardDrive,
      color: 'text-purple-400',
      unit: '%'
    },
    {
      label: 'Tempo de Resposta',
      value: data.metrics.responseTime,
      icon: Clock,
      color: 'text-green-400',
      unit: 'ms'
    },
    {
      label: 'Taxa de Erro',
      value: data.metrics.errorRate,
      icon: AlertCircle,
      color: 'text-red-400',
      unit: '%'
    },
  ]

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Activity className="w-5 h-5 text-green-400 animate-pulse" />
          <h2 className="text-xl font-bold text-white">Métricas em Tempo Real</h2>
        </div>
        <span className="text-xs text-gray-400">
          Atualizado: {format(new Date(data.timestamp), 'HH:mm:ss')}
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        {metrics.map((metric) => {
          const Icon = metric.icon
          return (
            <div key={metric.label} className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/30">
              <div className="flex items-center space-x-2 mb-2">
                <Icon className={`w-4 h-4 ${metric.color}`} />
                <span className="text-xs text-gray-400">{metric.label}</span>
              </div>
              <p className="text-2xl font-bold text-white">
                {metric.value.toFixed(metric.unit === 'ms' ? 0 : 1)}
                <span className="text-sm text-gray-400 ml-1">{metric.unit}</span>
              </p>
            </div>
          )
        })}
      </div>

      {/* Vendas recentes */}
      <div>
        <h3 className="text-sm font-semibold text-gray-400 mb-3">Vendas Recentes</h3>
        <div className="space-y-2 max-h-40 overflow-y-auto">
          {data.recentSales.map((sale) => (
            <div
              key={sale.id}
              className="flex items-center justify-between bg-gray-900/30 rounded-lg p-3 border border-gray-700/20"
            >
              <div>
                <p className="text-sm font-medium text-white">{sale.product}</p>
                <p className="text-xs text-gray-500">
                  {format(new Date(sale.timestamp), 'HH:mm:ss')}
                </p>
              </div>
              <span className="text-sm font-bold text-green-400">
                ${sale.amount.toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default RealtimeMetrics
