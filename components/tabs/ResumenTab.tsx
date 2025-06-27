import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faChartBar, faClipboardList, faUserCheck, faCity, faArrowUp,
  faGlobe, faLocationDot, faCalendarCheck, faChartLine, faMapMarkerAlt,
  faVideo, faCheckCircle, faExclamationTriangle, faPercentage
} from '@fortawesome/free-solid-svg-icons'

const ResumenTab = () => {
  const [weekSelect, setWeekSelect] = useState('3')
  const [periodoSelect, setperiodoSelect] = useState('semanal')

  // Datos simulados para las nuevas estadísticas (actualizados con las ciudades correctas)
  const topCiudades = [
    { ciudad: 'Arequipa', despachos: 45, porcentaje: 25 },
    { ciudad: 'Trujillo', despachos: 32, porcentaje: 18 },
    { ciudad: 'Cusco', despachos: 22, porcentaje: 12 },
    { ciudad: 'Piura', despachos: 18, porcentaje: 10 },
    { ciudad: 'Chiclayo', despachos: 15, porcentaje: 8 },
  ]

  const topReporteros = [
    { nombre: 'Carlos Nina', ciudad: 'Arequipa', despachos: 15, porcentaje: 8 },
    { nombre: 'Richard Calcina', ciudad: 'Arequipa', despachos: 12, porcentaje: 7 },
    { nombre: 'Percy Pillca', ciudad: 'Cusco', despachos: 10, porcentaje: 6 },
    { nombre: 'Roxana Gamboa', ciudad: 'Trujillo', despachos: 9, porcentaje: 5 },
    { nombre: 'Diego Condori', ciudad: 'Arequipa', despachos: 8, porcentaje: 4 },
  ]

  // Datos para KPIs
  const kpis = {
    totalDespachos: 178,
    promedioDespachosDiarios: 25.4,
    reporterosActivos: 18,
    coberturaNacional: 76,
    cumplimientoMetas: 92,
    totalEnVivo: 42,
    despachosConProblemas: 3
  }

  // Datos para el gráfico de tendencia
  const tendenciaSemanal = [
    { semana: 'Sem 1', despachos: 143 },
    { semana: 'Sem 2', despachos: 156 },
    { semana: 'Sem 3', despachos: 178 },
  ]

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
            onChange={(e) => setperiodoSelect(e.target.value)}
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
              <p className="text-2xl font-bold mt-1 mb-0 text-[#1e293b]">{kpis.totalDespachos}</p>
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
              <p className="text-2xl font-bold mt-1 mb-0 text-[#1e293b]">{kpis.promedioDespachosDiarios}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-[#ecfdf5] text-[#10b981] flex items-center justify-center text-xl">
              <FontAwesomeIcon icon={faCalendarCheck} />
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
              <p className="text-2xl font-bold mt-1 mb-0 text-[#1e293b]">{kpis.reporterosActivos}</p>
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
              <p className="text-2xl font-bold mt-1 mb-0 text-[#1e293b]">{kpis.coberturaNacional}%</p>
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
              <p className="text-xl font-bold mt-0.5 mb-0 text-[#1e293b]">{kpis.totalEnVivo}</p>
            </div>
          </div>
          <div className="text-xl font-semibold text-[#1a56db]">
            {Math.round((kpis.totalEnVivo / kpis.totalDespachos) * 100)}%
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4 hover:shadow-md hover:-translate-y-[2px] transition-all flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#ecfdf5] text-[#10b981] flex items-center justify-center text-xl">
              <FontAwesomeIcon icon={faCheckCircle} />
            </div>
            <div>
              <h4 className="text-sm text-[#64748b] font-medium">Cumplimiento de Metas</h4>
              <p className="text-xl font-bold mt-0.5 mb-0 text-[#1e293b]">{kpis.cumplimientoMetas}%</p>
            </div>
          </div>
          <div className="w-20 h-4 bg-[#f1f5f9] rounded-full overflow-hidden">
            <div className="h-full bg-[#10b981] rounded-full" style={{ width: `${kpis.cumplimientoMetas}%` }}></div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4 hover:shadow-md hover:-translate-y-[2px] transition-all flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#fee2e2] text-[#ef4444] flex items-center justify-center text-xl">
              <FontAwesomeIcon icon={faExclamationTriangle} />
            </div>
            <div>
              <h4 className="text-sm text-[#64748b] font-medium">Despachos con Problemas</h4>
              <p className="text-xl font-bold mt-0.5 mb-0 text-[#1e293b]">{kpis.despachosConProblemas}</p>
            </div>
          </div>
          <div className="text-xl font-semibold text-[#ef4444]">
            {Math.round((kpis.despachosConProblemas / kpis.totalDespachos) * 100)}%
          </div>
        </div>
      </div>

      {/* Mapa y tendencias */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Gráfico de tendencia */}
<div className="bg-white rounded-lg shadow">
  <div className="p-4 border-b border-[#e2e8f0]">
    <h3 className="font-semibold text-[#1a365d] flex items-center gap-2">
      <FontAwesomeIcon icon={faChartLine} className="text-[#1a56db]" />
      Tendencia de Despachos
    </h3>
  </div>
  <div className="p-6">
    <div className="flex items-end justify-around h-[220px] relative">
      {/* Semana 1 */}
      <div className="flex flex-col items-center">
        <div className="px-2 py-1 bg-[#1a56db] text-white text-xs font-semibold rounded mb-1">
          143
        </div>
        <div 
          className="w-24 bg-[#1a56db] rounded-t-md group hover:bg-[#1e429f] transition-all cursor-pointer"
          style={{ height: `${(143 / 200) * 180}px` }}
        ></div>
        <div className="text-xs text-[#64748b] mt-2">Sem 1</div>
      </div>
      
      {/* Semana 2 */}
      <div className="flex flex-col items-center">
        <div className="px-2 py-1 bg-[#1a56db] text-white text-xs font-semibold rounded mb-1">
          156
        </div>
        <div 
          className="w-24 bg-[#1a56db] rounded-t-md group hover:bg-[#1e429f] transition-all cursor-pointer"
          style={{ height: `${(156 / 200) * 180}px` }}
        ></div>
        <div className="text-xs text-[#64748b] mt-2">Sem 2</div>
      </div>
      
      {/* Semana 3 */}
      <div className="flex flex-col items-center">
        <div className="px-2 py-1 bg-[#1a56db] text-white text-xs font-semibold rounded mb-1">
          178
        </div>
        <div 
          className="w-24 bg-[#1a56db] rounded-t-md group hover:bg-[#1e429f] transition-all cursor-pointer"
          style={{ height: `${(178 / 200) * 180}px` }}
        ></div>
        <div className="text-xs text-[#64748b] mt-2">Sem 3</div>
      </div>
    </div>
  </div>
</div>

        {/* Mapa de cobertura */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b border-[#e2e8f0]">
            <h3 className="font-semibold text-[#1a365d] flex items-center gap-2">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="text-[#1a56db]" />
              Cobertura Nacional
            </h3>
          </div>
          <div className="p-6">
            <div className="flex justify-center items-center h-[220px] bg-[#f8fafc] rounded-lg">
              {/* Aquí iría un mapa real de Perú, esto es una representación simple */}
              <div className="text-center">
                <div className="text-5xl text-[#1a56db] mb-3">
                  <FontAwesomeIcon icon={faGlobe} />
                </div>
                <div className="text-xl font-semibold text-[#1a56db] mb-1">{kpis.coberturaNacional}% de cobertura</div>
                <div className="text-sm text-[#64748b]">18 de 24 departamentos</div>
                <div className="mt-3 flex justify-center gap-4">
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-[#1a56db]"></div>
                    <span className="text-xs text-[#64748b]">Alta cobertura</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-[#93c5fd]"></div>
                    <span className="text-xs text-[#64748b]">Media cobertura</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-[#dbeafe]"></div>
                    <span className="text-xs text-[#64748b]">Baja cobertura</span>
                  </div>
                </div>
              </div>
            </div>
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
              {topCiudades.map((ciudad, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-6 text-xs text-[#64748b] font-medium">{index + 1}.</div>
                  <div className="w-24 md:w-32 font-medium text-[#1e293b]">{ciudad.ciudad}</div>
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
              {topReporteros.map((reportero, index) => (
                <div key={index} className="flex items-center">
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

      {/* Tabla de despachos por ciudad */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="p-4 border-b border-[#e2e8f0]">
          <h3 className="font-semibold text-[#1a365d]">Despachos por Ciudad</h3>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left py-3 px-4 bg-[#f1f5f9] font-semibold text-[#475569] border-b border-[#e2e8f0]">Ciudad</th>
                  <th className="text-left py-3 px-4 bg-[#f1f5f9] font-semibold text-[#475569] border-b border-[#e2e8f0]">Total Despachos</th>
                  <th className="text-left py-3 px-4 bg-[#f1f5f9] font-semibold text-[#475569] border-b border-[#e2e8f0]">Reportero más Activo</th>
                  <th className="text-left py-3 px-4 bg-[#f1f5f9] font-semibold text-[#475569] border-b border-[#e2e8f0]">Porcentaje</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-[#f1f5f9]">
                  <td className="py-3 px-4 border-b border-[#e2e8f0]">Arequipa</td>
                  <td className="py-3 px-4 border-b border-[#e2e8f0]">45</td>
                  <td className="py-3 px-4 border-b border-[#e2e8f0]">Carlos Nina</td>
                  <td className="py-3 px-4 border-b border-[#e2e8f0]">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 max-w-[200px] h-2 bg-[#f1f5f9] rounded-full overflow-hidden">
                        <div className="h-full bg-[#1a56db] rounded-full" style={{ width: '25%' }}></div>
                      </div>
                      <span>25%</span>
                    </div>
                  </td>
                </tr>
                <tr className="hover:bg-[#f1f5f9]">
                  <td className="py-3 px-4 border-b border-[#e2e8f0]">Trujillo</td>
                  <td className="py-3 px-4 border-b border-[#e2e8f0]">32</td>
                  <td className="py-3 px-4 border-b border-[#e2e8f0]">Roxana Gamboa</td>
                  <td className="py-3 px-4 border-b border-[#e2e8f0]">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 max-w-[200px] h-2 bg-[#f1f5f9] rounded-full overflow-hidden">
                        <div className="h-full bg-[#1a56db] rounded-full" style={{ width: '18%' }}></div>
                      </div>
                      <span>18%</span>
                    </div>
                  </td>
                </tr>
                <tr className="hover:bg-[#f1f5f9]">
                  <td className="py-3 px-4 border-b border-[#e2e8f0]">Cusco</td>
                  <td className="py-3 px-4 border-b border-[#e2e8f0]">22</td>
                  <td className="py-3 px-4 border-b border-[#e2e8f0]">Percy Pillca</td>
                  <td className="py-3 px-4 border-b border-[#e2e8f0]">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 max-w-[200px] h-2 bg-[#f1f5f9] rounded-full overflow-hidden">
                        <div className="h-full bg-[#1a56db] rounded-full" style={{ width: '12%' }}></div>
                      </div>
                      <span>12%</span>
                    </div>
                  </td>
                </tr>
                <tr className="hover:bg-[#f1f5f9]">
                  <td className="py-3 px-4 border-b border-[#e2e8f0]">Piura</td>
                  <td className="py-3 px-4 border-b border-[#e2e8f0]">18</td>
                  <td className="py-3 px-4 border-b border-[#e2e8f0]">Percy Bereche</td>
                  <td className="py-3 px-4 border-b border-[#e2e8f0]">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 max-w-[200px] h-2 bg-[#f1f5f9] rounded-full overflow-hidden">
                        <div className="h-full bg-[#1a56db] rounded-full" style={{ width: '10%' }}></div>
                      </div>
                      <span>10%</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Gráfico de despachos por día */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b border-[#e2e8f0]">
          <h3 className="font-semibold text-[#1a365d]">Despachos por Día</h3>
        </div>
        <div className="p-6">
          <div className="h-[300px] relative">
            {/* Lunes */}
            <div className="absolute left-[50px] bottom-0 w-[30px] h-[120px] bg-[#1a56db] rounded-t-md cursor-pointer hover:bg-[#1e429f] group transition-all">
              <div className="absolute top-[-25px] w-[60px] left-[-15px] text-center font-semibold text-xs text-[#1a56db] opacity-0 group-hover:opacity-100 transition-opacity">12</div>
            </div>
            <div className="absolute left-[50px] bottom-[-25px] w-[60px] ml-[-15px] text-center text-xs text-[#64748b]">Lun</div>
            
            {/* Martes */}
            <div className="absolute left-[150px] bottom-0 w-[30px] h-[180px] bg-[#1a56db] rounded-t-md cursor-pointer hover:bg-[#1e429f] group transition-all">
              <div className="absolute top-[-25px] w-[60px] left-[-15px] text-center font-semibold text-xs text-[#1a56db] opacity-0 group-hover:opacity-100 transition-opacity">18</div>
            </div>
            <div className="absolute left-[150px] bottom-[-25px] w-[60px] ml-[-15px] text-center text-xs text-[#64748b]">Mar</div>
            
            {/* Miércoles */}
            <div className="absolute left-[250px] bottom-0 w-[30px] h-[140px] bg-[#1a56db] rounded-t-md cursor-pointer hover:bg-[#1e429f] group transition-all">
              <div className="absolute top-[-25px] w-[60px] left-[-15px] text-center font-semibold text-xs text-[#1a56db] opacity-0 group-hover:opacity-100 transition-opacity">14</div>
            </div>
            <div className="absolute left-[250px] bottom-[-25px] w-[60px] ml-[-15px] text-center text-xs text-[#64748b]">Mié</div>
            
            {/* Jueves */}
            <div className="absolute left-[350px] bottom-0 w-[30px] h-[100px] bg-[#1a56db] rounded-t-md cursor-pointer hover:bg-[#1e429f] group transition-all">
              <div className="absolute top-[-25px] w-[60px] left-[-15px] text-center font-semibold text-xs text-[#1a56db] opacity-0 group-hover:opacity-100 transition-opacity">10</div>
            </div>
            <div className="absolute left-[350px] bottom-[-25px] w-[60px] ml-[-15px] text-center text-xs text-[#64748b]">Jue</div>
            
            {/* Viernes */}
            <div className="absolute left-[450px] bottom-0 w-[30px] h-[160px] bg-[#1a56db] rounded-t-md cursor-pointer hover:bg-[#1e429f] group transition-all">
              <div className="absolute top-[-25px] w-[60px] left-[-15px] text-center font-semibold text-xs text-[#1a56db] opacity-0 group-hover:opacity-100 transition-opacity">16</div>
            </div>
            <div className="absolute left-[450px] bottom-[-25px] w-[60px] ml-[-15px] text-center text-xs text-[#64748b]">Vie</div>
            
            {/* Sábado */}
            <div className="absolute left-[550px] bottom-0 w-[30px] h-[90px] bg-[#1a56db] rounded-t-md cursor-pointer hover:bg-[#1e429f] group transition-all">
              <div className="absolute top-[-25px] w-[60px] left-[-15px] text-center font-semibold text-xs text-[#1a56db] opacity-0 group-hover:opacity-100 transition-opacity">9</div>
            </div>
            <div className="absolute left-[550px] bottom-[-25px] w-[60px] ml-[-15px] text-center text-xs text-[#64748b]">Sáb</div>
            
            {/* Domingo */}
            <div className="absolute left-[650px] bottom-0 w-[30px] h-[80px] bg-[#1a56db] rounded-t-md cursor-pointer hover:bg-[#1e429f] group transition-all">
              <div className="absolute top-[-25px] w-[60px] left-[-15px] text-center font-semibold text-xs text-[#1a56db] opacity-0 group-hover:opacity-100 transition-opacity">8</div>
            </div>
            <div className="absolute left-[650px] bottom-[-25px] w-[60px] ml-[-15px] text-center text-xs text-[#64748b]">Dom</div>
            
            {/* Línea base */}
            <div className="absolute left-0 right-0 bottom-0 h-[1px] bg-[#f1f5f9]"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResumenTab