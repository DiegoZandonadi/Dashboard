import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://dashboard-rwtm.onrender.com'

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export interface MetricsSummary {
  totalUsers: number
  activeUsers: number
  revenue: number
  conversionRate: number
  timestamp: string
}

export interface SalesData {
  date: string
  vendas: number
  lucro: number
  pedidos: number
  ticketMedio: number
}

export interface TrafficData {
  hora: string
  visitantes: number
  pageviews: number
  bounceRate: number
}

export interface PerformanceData {
  timestamp: string
  cpu: number
  memoria: number
  disco: number
  rede: number
  tempoResposta: number
}

export interface ReportConfig {
  title: string
  metrics: string[]
  dateRange: string
  format: string
}

export const fetchMetricsSummary = async (): Promise<MetricsSummary> => {
  const response = await api.get<MetricsSummary>('/api/metrics/summary')
  return response.data
}

export const fetchSalesData = async (): Promise<SalesData[]> => {
  const response = await api.get<SalesData[]>('/api/metrics/sales')
  return response.data
}

export const fetchTrafficData = async (): Promise<TrafficData[]> => {
  const response = await api.get<TrafficData[]>('/api/metrics/traffic')
  return response.data
}

export const fetchPerformanceData = async (): Promise<PerformanceData[]> => {
  const response = await api.get<PerformanceData[]>('/api/metrics/performance')
  return response.data
}

export const fetchUsersData = async (): Promise<any> => {
  const response = await api.get('/api/metrics/users')
  return response.data
}

export const generateReport = async (config: ReportConfig): Promise<any> => {
  const response = await api.post('/api/reports/generate', config)
  return response.data
}
