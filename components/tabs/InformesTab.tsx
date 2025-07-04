// components/tabs/InformesTab.tsx - Versión Simplificada
import { useState, useEffect } from 'react'
import { useAppContext } from '../AppContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faFilePdf, faCalendarDay, faCity, faUser, 
  faChartBar, faSpinner, faDownload
} from '@fortawesome/free-solid-svg-icons'
import { 
  exportDespachosReportero, 
  exportResumenCiudad, 
  exportEstadisticasGenerales, 
  exportDespachosPorFecha 
} from '../../utils/pdfExporter'
import { formatCityName } from '../../utils/cityUtils'

const InformesTab = () => {
  const { 
    currentDate, 
    setNotification 
  } = useAppContext()
  
  const [selectedReportero, setSelectedReportero] = useState<string>('')
  const [selectedCiudad, setSelectedCiudad] = useState<string>('')
  const [selectedFecha, setSelectedFecha] = useState<string>(currentDate.toISOString().split('T')[0])
  const [selectedPeriodo, setSelectedPeriodo] = useState<string>('semanal')
  const [isGenerating, setIsGenerating] = useState<string | null>(null)
  const [ciudades, setCiudades] = useState<any[]>([])
  const [reporteros, setReporteros] = useState<any[]>([])
  
  // Cargar datos al montar
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ciudadesRes, reporterosRes] = await Promise.all([
          fetch('/api/ciudades'),
          fetch('/api/reporteros')
        ])
        
        const [ciudadesData, reporterosData] = await Promise.all([
          ciudadesRes.json(),
          reporterosRes.json()
        ])
        
        setCiudades(ciudadesData)
        setReporteros(reporterosData)
      } catch (error) {
        console.error('Error al cargar datos:', error)
      }
    }
    
    fetchData()
  }, [])

  // Generar informe de reportero
  const handleGenerateReportero = async () => {
    if (!selectedReportero) {
      setNotification({
        show: true,
        type: 'error',
        title: 'Error',
        message: 'Seleccione un reportero'
      })
      return
    }

    setIsGenerating('reportero')
    
    try {
      const reportero = reporteros.find(r => r.id === parseInt(selectedReportero))
      const hoy = new Date()
      const haceUnaSemana = new Date()
      haceUnaSemana.setDate(hoy.getDate() - 7)
      
      const response = await fetch(
        `/api/despachos?reportero_id=${reportero.id}&desde=${haceUnaSemana.toISOString().split('T')[0]}&hasta=${hoy.toISOString().split('T')[0]}`
      )
      const despachos = await response.json()
      
      exportDespachosReportero(reportero, despachos, haceUnaSemana, hoy)
      
      setNotification({
        show: true,
        type: 'success',
        title: '¡Listo!',
        message: `Informe de ${reportero.nombre} descargado`
      })
    } catch (error) {
      console.error('Error:', error)
      setNotification({
        show: true,
        type: 'error',
        title: 'Error',
        message: 'No se pudo generar el informe'
      })
    } finally {
      setIsGenerating(null)
    }
  }

  // Generar informe de ciudad
  const handleGenerateCiudad = async () => {
    if (!selectedCiudad) {
      setNotification({
        show: true,
        type: 'error',
        title: 'Error',
        message: 'Seleccione una ciudad'
      })
      return
    }

    setIsGenerating('ciudad')
    
    try {
      const reporterosCiudad = reporteros.filter(r => r.ciudad.codigo === selectedCiudad)
      const hoy = new Date()
      const haceUnaSemana = new Date()
      haceUnaSemana.setDate(hoy.getDate() - 7)
      
      const response = await fetch(
        `/api/despachos?ciudad_codigo=${selectedCiudad}&desde=${haceUnaSemana.toISOString().split('T')[0]}&hasta=${hoy.toISOString().split('T')[0]}`
      )
      const despachos = await response.json()
      
      exportResumenCiudad(
        selectedCiudad, 
        reporterosCiudad, 
        despachos, 
        `Última semana`
      )
      
      setNotification({
        show: true,
        type: 'success',
        title: '¡Listo!',
        message: `Resumen de ${formatCityName(selectedCiudad)} descargado`
      })
    } catch (error) {
      console.error('Error:', error)
      setNotification({
        show: true,
        type: 'error',
        title: 'Error',
        message: 'No se pudo generar el informe'
      })
    } finally {
      setIsGenerating(null)
    }
  }

  // Generar informe por fecha
  const handleGenerateFecha = async () => {
    setIsGenerating('fecha')
    
    try {
      const response = await fetch(`/api/despachos?fecha=${selectedFecha}`)
      const despachos = await response.json()
      
      exportDespachosPorFecha(new Date(selectedFecha), despachos)
      
      setNotification({
        show: true,
        type: 'success',
        title: '¡Listo!',
        message: 'Informe del día descargado'
      })
    } catch (error) {
      console.error('Error:', error)
      setNotification({
        show: true,
        type: 'error',
        title: 'Error',
        message: 'No se pudo generar el informe'
      })
    } finally {
      setIsGenerating(null)
    }
  }

  // Generar estadísticas
  const handleGenerateEstadisticas = async () => {
    setIsGenerating('estadisticas')
    
    try {
      const response = await fetch(`/api/estadisticas?periodo=${selectedPeriodo}`)
      const estadisticas = await response.json()
      
      exportEstadisticasGenerales(estadisticas)
      
      setNotification({
        show: true,
        type: 'success',
        title: '¡Listo!',
        message: 'Informe estadístico descargado'
      })
    } catch (error) {
      console.error('Error:', error)
      setNotification({
        show: true,
        type: 'error',
        title: 'Error',
        message: 'No se pudo generar el informe'
      })
    } finally {
      setIsGenerating(null)
    }
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-[#1a365d] mb-2">
          Generación de Informes PDF
        </h2>
        <p className="text-[#64748b]">
          Selecciona el tipo de informe que deseas generar
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Informe por Reportero */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <FontAwesomeIcon icon={faUser} className="text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold">Informe por Reportero</h3>
          </div>
          
          <div className="space-y-4">
            <select 
              className="w-full px-4 py-2 border border-[#e2e8f0] rounded-lg"
              value={selectedReportero}
              onChange={(e) => setSelectedReportero(e.target.value)}
            >
              <option value="">Seleccione un reportero</option>
              {reporteros.map(r => (
                <option key={r.id} value={r.id}>
                  {r.nombre} - {r.ciudad.nombre}
                </option>
              ))}
            </select>
            
            <button
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center justify-center gap-2"
              onClick={handleGenerateReportero}
              disabled={isGenerating === 'reportero'}
            >
              {isGenerating === 'reportero' ? (
                <>
                  <FontAwesomeIcon icon={faSpinner} spin />
                  Generando...
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faDownload} />
                  Generar PDF
                </>
              )}
            </button>
          </div>
        </div>

        {/* Informe por Ciudad */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <FontAwesomeIcon icon={faCity} className="text-green-600" />
            </div>
            <h3 className="text-lg font-semibold">Informe por Ciudad</h3>
          </div>
          
          <div className="space-y-4">
            <select 
              className="w-full px-4 py-2 border border-[#e2e8f0] rounded-lg"
              value={selectedCiudad}
              onChange={(e) => setSelectedCiudad(e.target.value)}
            >
              <option value="">Seleccione una ciudad</option>
              {ciudades.map(c => (
                <option key={c.id} value={c.codigo}>{c.nombre}</option>
              ))}
            </select>
            
            <button
              className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center justify-center gap-2"
              onClick={handleGenerateCiudad}
              disabled={isGenerating === 'ciudad'}
            >
              {isGenerating === 'ciudad' ? (
                <>
                  <FontAwesomeIcon icon={faSpinner} spin />
                  Generando...
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faDownload} />
                  Generar PDF
                </>
              )}
            </button>
          </div>
        </div>

        {/* Informe por Fecha */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
              <FontAwesomeIcon icon={faCalendarDay} className="text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold">Informe por Fecha</h3>
          </div>
          
          <div className="space-y-4">
            <input 
              type="date"
              className="w-full px-4 py-2 border border-[#e2e8f0] rounded-lg"
              value={selectedFecha}
              onChange={(e) => setSelectedFecha(e.target.value)}
            />
            
            <button
              className="w-full px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 flex items-center justify-center gap-2"
              onClick={handleGenerateFecha}
              disabled={isGenerating === 'fecha'}
            >
              {isGenerating === 'fecha' ? (
                <>
                  <FontAwesomeIcon icon={faSpinner} spin />
                  Generando...
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faDownload} />
                  Generar PDF
                </>
              )}
            </button>
          </div>
        </div>

        {/* Informe Estadístico */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <FontAwesomeIcon icon={faChartBar} className="text-red-600" />
            </div>
            <h3 className="text-lg font-semibold">Informe Estadístico</h3>
          </div>
          
          <div className="space-y-4">
            <select 
              className="w-full px-4 py-2 border border-[#e2e8f0] rounded-lg"
              value={selectedPeriodo}
              onChange={(e) => setSelectedPeriodo(e.target.value)}
            >
              <option value="diario">Diario</option>
              <option value="semanal">Semanal</option>
              <option value="mensual">Mensual</option>
            </select>
            
            <button
              className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 flex items-center justify-center gap-2"
              onClick={handleGenerateEstadisticas}
              disabled={isGenerating === 'estadisticas'}
            >
              {isGenerating === 'estadisticas' ? (
                <>
                  <FontAwesomeIcon icon={faSpinner} spin />
                  Generando...
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faDownload} />
                  Generar PDF
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Accesos Rápidos */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-[#1a365d] mb-4">Accesos Rápidos</h3>
        <div className="flex gap-4 flex-wrap">
          <button
            className="px-4 py-2 bg-white border border-[#e2e8f0] rounded-lg hover:bg-[#f8fafc] flex items-center gap-2"
            onClick={() => {
              setSelectedFecha(currentDate.toISOString().split('T')[0])
              handleGenerateFecha()
            }}
          >
            <FontAwesomeIcon icon={faFilePdf} className="text-red-500" />
            PDF de Hoy
          </button>
          
          <button
            className="px-4 py-2 bg-white border border-[#e2e8f0] rounded-lg hover:bg-[#f8fafc] flex items-center gap-2"
            onClick={() => {
              setSelectedPeriodo('semanal')
              handleGenerateEstadisticas()
            }}
          >
            <FontAwesomeIcon icon={faFilePdf} className="text-red-500" />
            Resumen Semanal
          </button>
          
          <button
            className="px-4 py-2 bg-white border border-[#e2e8f0] rounded-lg hover:bg-[#f8fafc] flex items-center gap-2"
            onClick={() => {
              setSelectedPeriodo('mensual')
              handleGenerateEstadisticas()
            }}
          >
            <FontAwesomeIcon icon={faFilePdf} className="text-red-500" />
            Resumen Mensual
          </button>
        </div>
      </div>
    </div>
  )
}

export default InformesTab