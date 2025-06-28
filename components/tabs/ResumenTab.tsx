// components/tabs/ResumenTab.tsx
import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faChartBar, faClipboardList, faUserCheck, faCity, faArrowUp,
  faGlobe, faSpinner, faVideo, faCheckCircle, faExclamationTriangle
} from '@fortawesome/free-solid-svg-icons'

interface Estadisticas {
  totalDespachos: number
  promedioDespachosDiarios: number
  reporterosActivos: number
  coberturaNacional: number
  despachosEnVivo: number
  porcentajeEnVivo: number
  despachosConProblemas: number
  porcentajeConProblemas: number
  topCiudades: Array<{
    id: number
    nombre: string
    despachos: number
    porcentaje: number
  }>
  topReporteros: Array<{
    id: number
    nombre: string
    ciudad: string
    despachos: number
    porcentaje: number
  }>
  despachosPorDia: Array<{
    dia: string
    total: number
  }>
}

const ResumenTab = () => {
  const [weekSelect, setWeekSelect] = useState('3')
  const [periodoSelect, setPeriodoSelect] = useState('semanal')
  const [estadisticas, setEstadisticas] = useState<Estadisticas | null>(null)
  const [loading, setLoading] = useState(true)

  // Cargar estadísticas desde la API
  useEffect(() => {
    const fetchEstadisticas = async () => {
      setLoading(true)
      try {
        const response = await fetch(`/api/estadisticas?periodo=${periodoSelect}`)
        if (!response.ok) {
          throw new Error('Error al obtener estadísticas')
        }
        const data = await response.json()
        setEstadisticas(data)
      } catch (error) {
        console.error('Error al cargar estadísticas:', error)
        // Usar datos de ejemplo si hay error
        setEstadisticas({
          totalDespachos: 178,
          promedioDespachosDiarios: 25.4,
          reporterosActivos: 18,
          coberturaNacional: 76,
          despachosEnVivo: 42,
          porcentajeEnVivo: 23.6,
          despachosConProblemas: 3,
          porcentajeConProblemas: 1.7,
          topCiudades: [
            { id: 1, nombre: 'Arequipa', despachos: 45, porcentaje: 25 },
            { id: 2, nombre: 'Trujillo', despachos: 32, porcentaje: 18 },
            { id: 3, nombre: 'Cusco', despachos: 22, porcentaje: 12 },
            { id: 4, nombre: 'Piura', despachos: 18, porcentaje: 10 },
            { id: 5, nombre: 'Chiclayo', despachos: 15, porcentaje: 8 }
          ],
          topReporteros: [
            { id: 3, nombre: 'Carlos Nina', ciudad: 'Arequipa', despachos: 15, porcentaje: 8 },
            { id: 2, nombre: 'Richard Calcina', ciudad: 'Arequipa', despachos: 12, porcentaje: 7 },
            { id: 10, nombre: 'Percy Pillca', ciudad: 'Cusco', despachos: 10, porcentaje: 6 },
            { id: 24, nombre: 'Roxana Gamboa', ciudad: 'Trujillo', despachos: 9, porcentaje: 5 },
            { id: 4, nombre: 'Diego Condori', ciudad: 'Arequipa', despachos: 8, porcentaje: 4 }
          ],
          despachosPorDia: [
            { dia: '2025-06-22', total: 12 },
            { dia: '2025-06-23', total: 18 },
            { dia: '2025-06-24', total: 14 },
            { dia: '2025-06-25', total: 10 },
            { dia: '2025-06-26', total: 16 },
            { dia: '2025-06-27', total: 9 },
            { dia: '2025-06-28', total: 8 }
          ]
        })
      } finally {
        setLoading(false)
      }
    }
    
    fetchEstadisticas()
  }, [periodoSelect])

  if (loading) {
    return (
      <div className="flex justify-center items-center p-10">
        <FontAwesomeIcon icon={faSpinner} spin className="text-3xl text-primary mr-3" />
        <span className="text-lg">Cargando estadísticas...</span>
      </div>
    )
  }

  // Si no hay estadísticas, mostrar mensaje
  if (!estadisticas) {
    return (
      <div className="text-center p-8 bg-[#f8fafc] rounded-lg border border-[#e2e8f0] text-[#64748b]">
        <p>No hay datos estadísticos disponibles.</p>
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-[#1a365d] flex items-center gap-3">
          <FontAwesomeIcon icon={faChartBar} />
          Resumen Semanal
        </h2>
        <div className="flex gap-4">
          <select 
            className="px-3.5 py-2.5 text-sm border border-[#e2e8f0] rounded-lg shadow-sm transition-all focus:outline-none focus:border-[#1a56db] focus:ring focus:ring-[#1a56db] focus:ring-opacity-25"
            value={periodoSelect}
            onChange={(e) => setPeriodoSelect(e.target.value)}
          >
            <option value="diario">Diario</option>
            <option value="semanal">Semanal</option>
            <option value="mensual">Mensual</option>
          </select>
          <select 
            className="w-64 px-3.5 py-2.5 text-sm border border-[#e2e8f0] rounded-lg shadow-sm transition-all focus:outline-none focus:border-[#1a56db] focus:ring focus:ring-[#1a56db] focus:ring-opacity-25"
            value={weekSelect}
            onChange={(e) => setWeekSelect(e.target.value)}
          >
            <option value="1">Semana 1 (3 Jun - 9 Jun 2025)</option>
            <option value="2">Semana 2 (10 Jun - 16 Jun 2025)</option>
            <option value="3">Semana 3 (17 Jun - 23 Jun 2025)</option>
            <option value="4">Semana 4 (24 Jun - 30 Jun 2025)</option>
          </select>
        </div>
      </div>

      {/* KPIs principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-5 hover:shadow-md hover:-translate-y-[2px] transition-all">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm text-[#64748b] font-medium">Total Despachos</h4>
              <p className="text-2xl font-bold mt-1 mb-0 text-[#1e293b]">{estadisticas.totalDespachos}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-[#e0f2fe] text-[#1a56db] flex items-center justify-center text-xl">
              <FontAwesomeIcon icon={faClipboardList} />
            </div>
          </div>
          <div className="mt-2 text-sm text-[#10b981] flex items-center">
            <FontAwesomeIcon icon={faArrowUp} className="mr-1" /> 
            <span>14% vs semana anterior</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-5 hover:shadow-md hover:-translate-y-[2px] transition-all">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm text-[#64748b] font-medium">Promedio Diario</h4>
              <p className="text-2xl font-bold mt-1 mb-0 text-[#1e293b]">{estadisticas.promedioDespachosDiarios}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-[#ecfdf5] text-[#10b981] flex items-center justify-center text-xl">
              <FontAwesomeIcon icon={faClipboardList} />
            </div>
          </div>
          <div className="mt-2 text-sm text-[#10b981] flex items-center">
            <FontAwesomeIcon icon={faArrowUp} className="mr-1" /> 
            <span>2.1 más que semana anterior</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-5 hover:shadow-md hover:-translate-y-[2px] transition-all">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm text-[#64748b] font-medium">Reporteros Activos</h4>
              <p className="text-2xl font-bold mt-1 mb-0 text-[#1e293b]">{estadisticas.reporterosActivos}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-[#fffbeb] text-[#f59e0b] flex items-center justify-center text-xl">
              <FontAwesomeIcon icon={faUserCheck} />
            </div>
          </div>
          <div className="mt-2 text-sm text-[#10b981] flex items-center">
            <FontAwesomeIcon icon={faArrowUp} className="mr-1" /> 
            <span>2 más que semana anterior</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-5 hover:shadow-md hover:-translate-y-[2px] transition-all">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm text-[#64748b] font-medium">Cobertura Nacional</h4>
              <p className="text-2xl font-bold mt-1 mb-0 text-[#1e293b]">{estadisticas.coberturaNacional}%</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-[#eff6ff] text-[#3b82f6] flex items-center justify-center text-xl">
              <FontAwesomeIcon icon={faGlobe} />
            </div>
          </div>
          <div className="mt-2 text-sm text-[#10b981] flex items-center">
            <FontAwesomeIcon icon={faArrowUp} className="mr-1" /> 
            <span>5% más que semana anterior</span>
          </div>
        </div>
      </div>

      {/* KPIs secundarios */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-4 hover:shadow-md hover:-translate-y-[2px] transition-all flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#e0f2fe] text-[#1a56db] flex items-center justify-center text-xl">
              <FontAwesomeIcon icon={faVideo} />
            </div>
            <div>
              <h4 className="text-sm text-[#64748b] font-medium">Despachos En Vivo</h4>
              <p className="text-xl font-bold mt-0.5 mb-0 text-[#1e293b]">{estadisticas.despachosEnVivo}</p>
            </div>
          </div>
          <div className="text-xl font-semibold text-[#1a56db]">
            {estadisticas.porcentajeEnVivo}%
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4 hover:shadow-md hover:-translate-y-[2px] transition-all flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#ecfdf5] text-[#10b981] flex items-center justify-center text-xl">
              <FontAwesomeIcon icon={faCheckCircle} />
            </div>
            <div>
              <h4 className="text-sm text-[#64748b] font-medium">Cumplimiento de Metas</h4>
              <p className="text-xl font-bold mt-0.5 mb-0 text-[#1e293b]">92%</p>
            </div>
          </div>
          <div className="w-20 h-4 bg-[#f1f5f9] rounded-full overflow-hidden">
            <div className="h-full bg-[#10b981] rounded-full" style={{ width: `92%` }}></div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4 hover:shadow-md hover:-translate-y-[2px] transition-all flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#fee2e2] text-[#ef4444] flex items-center justify-center text-xl">
              <FontAwesomeIcon icon={faExclamationTriangle} />
            </div>
            <div>
              <h4 className="text-sm text-[#64748b] font-medium">Despachos con Problemas</h4>
              <p className="text-xl font-bold mt-0.5 mb-0 text-[#1e293b]">{estadisticas.despachosConProblemas}</p>
            </div>
          </div>
          <div className="text-xl font-semibold text-[#ef4444]">
            {estadisticas.porcentajeConProblemas}%
          </div>
        </div>
      </div>

      {/* Top Ciudades y Reporteros */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Top 5 Ciudades */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b border-[#e2e8f0]">
            <h3 className="font-semibold text-[#1a365d] flex items-center gap-2">
              <FontAwesomeIcon icon={faCity} className="text-[#1a56db]" />
              Top 5 Ciudades
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {estadisticas.topCiudades.map((ciudad, index) => (
                <div key={ciudad.id} className="flex items-center">
                  <div className="w-6 text-xs text-[#64748b] font-medium">{index + 1}.</div>
                  <div className="w-24 md:w-32 font-medium text-[#1e293b]">{ciudad.nombre}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2 bg-[#f1f5f9] rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-[#1a56db] rounded-full" 
                          style={{ width: `${ciudad.porcentaje}%` }}
                        ></div>
                      </div>
                      <div className="w-12 text-xs font-semibold text-[#1a56db]">{ciudad.despachos}</div>
                      <div className="w-10 text-xs text-[#64748b]">{ciudad.porcentaje}%</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top 5 Reporteros */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b border-[#e2e8f0]">
            <h3 className="font-semibold text-[#1a365d] flex items-center gap-2">
              <FontAwesomeIcon icon={faUserCheck} className="text-[#1a56db]" />
              Top 5 Reporteros
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {estadisticas.topReporteros.map((reportero, index) => (
                <div key={reportero.id} className="flex items-center">
                  <div className="w-6 text-xs text-[#64748b] font-medium">{index + 1}.</div>
                  <div className="w-28 md:w-40 font-medium text-[#1e293b]">{reportero.nombre}</div>
                  <div className="w-16 md:w-20 text-xs text-[#64748b]">{reportero.ciudad}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2 bg-[#f1f5f9] rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-[#10b981] rounded-full" 
                          style={{ width: `${reportero.porcentaje * 2}%` }}
                        ></div>
                      </div>
                      <div className="w-8 text-xs font-semibold text-[#10b981]">{reportero.despachos}</div>
                      <div className="w-8 text-xs text-[#64748b]">{reportero.porcentaje}%</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Gráfico de despachos por día */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="p-4 border-b border-[#e2e8f0]">
          <h3 className="font-semibold text-[#1a365d]">Despachos por Día</h3>
        </div>
        <div className="p-6">
          <div className="h-[300px] relative">
            {estadisticas.despachosPorDia.map((dia, index) => {
              const left = 50 + (index * 100)
              const height = (dia.total / 20) * 200 // Máximo 200px de altura, escalado a 20 despachos
              const date = new Date(dia.dia)
              const dayName = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'][date.getDay()]
              
              return (
                <div key={dia.dia}>
                  <div 
                    className="absolute bottom-0 w-[30px] bg-[#1a56db] rounded-t-md cursor-pointer hover:bg-[#1e429f] group transition-all"
                    style={{ left: `${left}px`, height: `${height}px` }}
                  >
                    <div className="absolute top-[-25px] w-[60px] left-[-15px] text-center font-semibold text-xs text-[#1a56db] opacity-0 group-hover:opacity-100 transition-opacity">
                      {dia.total}
                    </div>
                  </div>
                  <div 
                    className="absolute bottom-[-25px] w-[60px] text-center text-xs text-[#64748b]"
                    style={{ left: `${left - 15}px` }}
                  >
                    {dayName}
                  </div>
                </div>
              )
            })}
            <div className="absolute left-0 right-0 bottom-0 h-[1px] bg-[#f1f5f9]"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResumenTab