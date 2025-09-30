import { useState } from 'react'
import { FileText, Download, Settings } from 'lucide-react'
import { generateReport } from '../services/api'

const ReportGenerator = () => {
  const [config, setConfig] = useState({
    title: 'Relatório Personalizado',
    metrics: [] as string[],
    dateRange: '30days',
    format: 'json'
  })
  const [generatedReport, setGeneratedReport] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const availableMetrics = [
    { id: 'sales', label: 'Vendas', description: 'Dados de vendas e receita' },
    { id: 'traffic', label: 'Tráfego', description: 'Visitantes e pageviews' },
    { id: 'performance', label: 'Performance', description: 'Métricas do sistema' },
    { id: 'users', label: 'Usuários', description: 'Dados demográficos' },
  ]

  const handleMetricToggle = (metricId: string) => {
    setConfig(prev => ({
      ...prev,
      metrics: prev.metrics.includes(metricId)
        ? prev.metrics.filter(m => m !== metricId)
        : [...prev.metrics, metricId]
    }))
  }

  const handleGenerateReport = async () => {
    if (config.metrics.length === 0) {
      alert('Selecione pelo menos uma métrica')
      return
    }

    setLoading(true)
    try {
      const report = await generateReport(config)
      setGeneratedReport(report)
    } catch (error) {
      console.error('Erro ao gerar relatório:', error)
      alert('Erro ao gerar relatório')
    } finally {
      setLoading(false)
    }
  }

  const handleDownloadReport = () => {
    if (!generatedReport) return

    const dataStr = JSON.stringify(generatedReport, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${generatedReport.id}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
        <div className="flex items-center space-x-3 mb-6">
          <Settings className="w-6 h-6 text-blue-400" />
          <h2 className="text-2xl font-bold text-white">Configurar Relatório</h2>
        </div>

        {/* Título do relatório */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Título do Relatório
          </label>
          <input
            type="text"
            value={config.title}
            onChange={(e) => setConfig(prev => ({ ...prev, title: e.target.value }))}
            className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Digite o título do relatório"
          />
        </div>

        {/* Seleção de métricas */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-400 mb-3">
            Selecione as Métricas
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {availableMetrics.map((metric) => (
              <div
                key={metric.id}
                onClick={() => handleMetricToggle(metric.id)}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  config.metrics.includes(metric.id)
                    ? 'border-blue-500 bg-blue-500/10'
                    : 'border-gray-700 bg-gray-900/30 hover:border-gray-600'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-white font-semibold mb-1">{metric.label}</h3>
                    <p className="text-sm text-gray-400">{metric.description}</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={config.metrics.includes(metric.id)}
                    readOnly
                    className="w-5 h-5 text-blue-500 rounded focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Período */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Período
          </label>
          <select
            value={config.dateRange}
            onChange={(e) => setConfig(prev => ({ ...prev, dateRange: e.target.value }))}
            className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="7days">Últimos 7 dias</option>
            <option value="30days">Últimos 30 dias</option>
            <option value="90days">Últimos 90 dias</option>
            <option value="1year">Último ano</option>
          </select>
        </div>

        {/* Formato */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Formato de Exportação
          </label>
          <select
            value={config.format}
            onChange={(e) => setConfig(prev => ({ ...prev, format: e.target.value }))}
            className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="json">JSON</option>
            <option value="csv">CSV</option>
            <option value="pdf">PDF</option>
          </select>
        </div>

        {/* Botão gerar */}
        <button
          onClick={handleGenerateReport}
          disabled={loading || config.metrics.length === 0}
          className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold py-3 rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Gerando...</span>
            </>
          ) : (
            <>
              <FileText className="w-5 h-5" />
              <span>Gerar Relatório</span>
            </>
          )}
        </button>
      </div>

      {/* Resultado */}
      {generatedReport && (
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <FileText className="w-6 h-6 text-green-400" />
              <div>
                <h3 className="text-xl font-bold text-white">{generatedReport.title}</h3>
                <p className="text-sm text-gray-400">
                  Gerado em: {new Date(generatedReport.generatedAt).toLocaleString('pt-BR')}
                </p>
              </div>
            </div>
            <button
              onClick={handleDownloadReport}
              className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Download</span>
            </button>
          </div>

          <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/30 max-h-96 overflow-auto">
            <pre className="text-sm text-gray-300">
              {JSON.stringify(generatedReport, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  )
}

export default ReportGenerator
