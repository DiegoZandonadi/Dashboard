import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Users } from 'lucide-react'
import { TrafficData } from '../../services/api'

interface TrafficChartProps {
  data: TrafficData[]
}

const TrafficChart = ({ data }: TrafficChartProps) => {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 animate-fade-in">
      <div className="flex items-center space-x-2 mb-6">
        <Users className="w-5 h-5 text-blue-400" />
        <h2 className="text-xl font-bold text-white">Tráfego por Hora</h2>
      </div>
      
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis 
            dataKey="hora" 
            stroke="#9ca3af"
            tick={{ fill: '#9ca3af' }}
          />
          <YAxis 
            stroke="#9ca3af"
            tick={{ fill: '#9ca3af' }}
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
          <Bar 
            dataKey="visitantes" 
            fill="#3b82f6" 
            name="Visitantes"
            radius={[8, 8, 0, 0]}
          />
          <Bar 
            dataKey="pageviews" 
            fill="#8b5cf6" 
            name="Pageviews"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>

      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="bg-gray-900/50 rounded-lg p-3">
          <p className="text-xs text-gray-400 mb-1">Total Visitantes</p>
          <p className="text-lg font-bold text-white">
            {data.reduce((acc, d) => acc + d.visitantes, 0).toLocaleString()}
          </p>
        </div>
        <div className="bg-gray-900/50 rounded-lg p-3">
          <p className="text-xs text-gray-400 mb-1">Total Pageviews</p>
          <p className="text-lg font-bold text-white">
            {data.reduce((acc, d) => acc + d.pageviews, 0).toLocaleString()}
          </p>
        </div>
        <div className="bg-gray-900/50 rounded-lg p-3">
          <p className="text-xs text-gray-400 mb-1">Bounce Rate Médio</p>
          <p className="text-lg font-bold text-white">
            {(data.reduce((acc, d) => acc + d.bounceRate, 0) / data.length).toFixed(1)}%
          </p>
        </div>
      </div>
    </div>
  )
}

export default TrafficChart
