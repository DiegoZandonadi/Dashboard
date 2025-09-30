import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { TrendingUp } from 'lucide-react'
import { SalesData } from '../../services/api'

interface SalesChartProps {
  data: SalesData[]
}

const SalesChart = ({ data }: SalesChartProps) => {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 animate-fade-in">
      <div className="flex items-center space-x-2 mb-6">
        <TrendingUp className="w-5 h-5 text-green-400" />
        <h2 className="text-xl font-bold text-white">Vendas e Lucro (30 dias)</h2>
      </div>
      
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorVendas" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorLucro" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis 
            dataKey="date" 
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
          <Area 
            type="monotone" 
            dataKey="vendas" 
            stroke="#3b82f6" 
            fillOpacity={1} 
            fill="url(#colorVendas)"
            name="Vendas"
          />
          <Area 
            type="monotone" 
            dataKey="lucro" 
            stroke="#10b981" 
            fillOpacity={1} 
            fill="url(#colorLucro)"
            name="Lucro"
          />
        </AreaChart>
      </ResponsiveContainer>

      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="bg-gray-900/50 rounded-lg p-3">
          <p className="text-xs text-gray-400 mb-1">Ticket Médio</p>
          <p className="text-lg font-bold text-white">
            ${data.length > 0 ? (data.reduce((acc, d) => acc + d.ticketMedio, 0) / data.length).toFixed(2) : '0'}
          </p>
        </div>
        <div className="bg-gray-900/50 rounded-lg p-3">
          <p className="text-xs text-gray-400 mb-1">Total Pedidos</p>
          <p className="text-lg font-bold text-white">
            {data.reduce((acc, d) => acc + d.pedidos, 0).toLocaleString()}
          </p>
        </div>
        <div className="bg-gray-900/50 rounded-lg p-3">
          <p className="text-xs text-gray-400 mb-1">Receita Total</p>
          <p className="text-lg font-bold text-white">
            ${data.reduce((acc, d) => acc + d.vendas, 0).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  )
}

export default SalesChart
