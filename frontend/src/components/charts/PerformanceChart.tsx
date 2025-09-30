import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Activity } from 'lucide-react'
import { PerformanceData } from '../../services/api'

interface PerformanceChartProps {
  data: PerformanceData[]
}

const PerformanceChart = ({ data }: PerformanceChartProps) => {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 animate-fade-in">
      <div className="flex items-center space-x-2 mb-6">
        <Activity className="w-5 h-5 text-purple-400" />
        <h2 className="text-xl font-bold text-white">Performance do Sistema (24h)</h2>
      </div>
      
      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis 
            dataKey="timestamp" 
            stroke="#9ca3af"
            tick={{ fill: '#9ca3af' }}
          />
          <YAxis 
            stroke="#9ca3af"
            tick={{ fill: '#9ca3af' }}
            label={{ value: '%', angle: -90, position: 'insideLeft', fill: '#9ca3af' }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#1f2937', 
              border: '1px solid #374151',
              borderRadius: '8px',
              color: '#fff'
            }}
          />
          <Legend 
            wrapperStyle={{ color: '#9ca3af' }}
          />
          <Line 
            type="monotone" 
            dataKey="cpu" 
            stroke="#3b82f6" 
            strokeWidth={2}
            dot={false}
            name="CPU (%)"
          />
          <Line 
            type="monotone" 
            dataKey="memoria" 
            stroke="#8b5cf6" 
            strokeWidth={2}
            dot={false}
            name="Memória (%)"
          />
          <Line 
            type="monotone" 
            dataKey="disco" 
            stroke="#10b981" 
            strokeWidth={2}
            dot={false}
            name="Disco (%)"
          />
        </LineChart>
      </ResponsiveContainer>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6">
        <div className="bg-gray-900/50 rounded-lg p-3">
          <p className="text-xs text-gray-400 mb-1">CPU Média</p>
          <p className="text-lg font-bold text-blue-400">
            {(data.reduce((acc, d) => acc + d.cpu, 0) / data.length).toFixed(1)}%
          </p>
        </div>
        <div className="bg-gray-900/50 rounded-lg p-3">
          <p className="text-xs text-gray-400 mb-1">Memória Média</p>
          <p className="text-lg font-bold text-purple-400">
            {(data.reduce((acc, d) => acc + d.memoria, 0) / data.length).toFixed(1)}%
          </p>
        </div>
        <div className="bg-gray-900/50 rounded-lg p-3">
          <p className="text-xs text-gray-400 mb-1">Disco Médio</p>
          <p className="text-lg font-bold text-green-400">
            {(data.reduce((acc, d) => acc + d.disco, 0) / data.length).toFixed(1)}%
          </p>
        </div>
        <div className="bg-gray-900/50 rounded-lg p-3">
          <p className="text-xs text-gray-400 mb-1">Rede Média</p>
          <p className="text-lg font-bold text-yellow-400">
            {(data.reduce((acc, d) => acc + d.rede, 0) / data.length).toFixed(0)} MB/s
          </p>
        </div>
        <div className="bg-gray-900/50 rounded-lg p-3">
          <p className="text-xs text-gray-400 mb-1">Tempo Resposta</p>
          <p className="text-lg font-bold text-orange-400">
            {(data.reduce((acc, d) => acc + d.tempoResposta, 0) / data.length).toFixed(0)} ms
          </p>
        </div>
      </div>
    </div>
  )
}

export default PerformanceChart
