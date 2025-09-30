import { useEffect, useState, useCallback } from 'react'

export interface RealtimeMetrics {
  activeUsers: number
  requestsPerSecond: number
  cpuUsage: number
  memoryUsage: number
  responseTime: number
  errorRate: number
}

export interface RecentSale {
  id: string
  amount: number
  product: string
  timestamp: string
}

export interface RealtimeData {
  timestamp: string
  metrics: RealtimeMetrics
  recentSales: RecentSale[]
}

export const useWebSocket = (url: string = 'wss://dashboard-zwtm.onrender.com/ws/realtime') => {
  const [data, setData] = useState<RealtimeData | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const connect = useCallback(() => {
    try {
      const ws = new WebSocket(url)

      ws.onopen = () => {
        setIsConnected(true)
        setError(null)
        console.log('WebSocket conectado')
      }

      ws.onmessage = (event) => {
        try {
          const parsedData = JSON.parse(event.data)
          setData(parsedData)
        } catch (err) {
          console.error('Erro ao processar dados:', err)
        }
      }

      ws.onerror = (event) => {
        console.error('Erro no WebSocket:', event)
        setError('Erro na conexão WebSocket')
        setIsConnected(false)
      }

      ws.onclose = () => {
        setIsConnected(false)
        console.log('WebSocket desconectado')
        
        // Tentar reconectar após 3 segundos
        setTimeout(() => {
          console.log('Tentando reconectar...')
          connect()
        }, 3000)
      }

      return ws
    } catch (err) {
      console.error('Erro ao conectar WebSocket:', err)
      setError('Falha ao conectar ao servidor')
      return null
    }
  }, [url])

  useEffect(() => {
    const ws = connect()

    return () => {
      if (ws) {
        ws.close()
      }
    }
  }, [connect])

  return { data, isConnected, error }
}
