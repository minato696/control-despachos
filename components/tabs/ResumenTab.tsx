"use client"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartBar, faClipboardList, faUserCheck, faCity } from '@fortawesome/free-solid-svg-icons'

const ResumenTab = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-primary-darker flex items-center gap-3">
          <FontAwesomeIcon icon={faChartBar} />
          Resumen Semanal
        </h2>
        <div className="w-64">
          <select className="w-full px-3.5 py-2.5 text-sm border border-gray-light rounded shadow-sm transition-all focus:outline-none focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-25">
            <option value="1">Semana 1 (3 Jun - 9 Jun 2025)</option>
            <option value="2">Semana 2 (10 Jun - 16 Jun 2025)</option>
            <option value="3" selected>Semana 3 (17 Jun - 23 Jun 2025)</option>
            <option value="4">Semana 4 (24 Jun - 30 Jun 2025)</option>
          </select>
        </div>
      </div>

      {/* Tarjetas de estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded shadow p-6 hover:shadow-md transition-all">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded bg-primary-light text-primary flex items-center justify-center text-xl">
              <FontAwesomeIcon icon={faClipboardList} />
            </div>
            <div>
              <h4 className="text-sm text-gray font-medium">Total de Despachos</h4>
              <p className="text-2xl font-bold mt-1 mb-1">87</p>
              <p className="text-sm text-gray">
                <FontAwesomeIcon icon={faChartBar} className="text-success" /> 12% más que la semana anterior
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded shadow p-6 hover:shadow-md transition-all">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded bg-success-light text-success flex items-center justify-center text-xl">
              <FontAwesomeIcon icon={faUserCheck} />
            </div>
            <div>
              <h4 className="text-sm text-gray font-medium">Reportero más Activo</h4>
              <p className="text-2xl font-bold mt-1 mb-1">Carlos Nina</p>
              <p className="text-sm text-gray">15 despachos esta semana</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded shadow p-6 hover:shadow-md transition-all">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded bg-warning-light text-warning flex items-center justify-center text-xl">
              <FontAwesomeIcon icon={faCity} />
            </div>
            <div>
              <h4 className="text-sm text-gray font-medium">Ciudad con más Cobertura</h4>
              <p className="text-2xl font-bold mt-1 mb-1">Arequipa</p>
              <p className="text-sm text-gray">32 despachos (37% del total)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabla de despachos por ciudad */}
      <div className="bg-white rounded shadow mb-6">
        <div className="p-4 border-b border-gray-light">
          <h3 className="font-semibold text-primary-darker">Despachos por Ciudad</h3>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left py-3 px-4 bg-gray-light font-semibold text-gray-dark border-b border-gray-light">Ciudad</th>
                  <th className="text-left py-3 px-4 bg-gray-light font-semibold text-gray-dark border-b border-gray-light">Total Despachos</th>
                  <th className="text-left py-3 px-4 bg-gray-light font-semibold text-gray-dark border-b border-gray-light">Reportero más Activo</th>
                  <th className="text-left py-3 px-4 bg-gray-light font-semibold text-gray-dark border-b border-gray-light">Porcentaje</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-light">
                  <td className="py-3 px-4 border-b border-gray-light">Arequipa</td>
                  <td className="py-3 px-4 border-b border-gray-light">32</td>
                  <td className="py-3 px-4 border-b border-gray-light">Carlos Nina</td>
                  <td className="py-3 px-4 border-b border-gray-light">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 max-w-[200px] h-2 bg-gray-light rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: '37%' }}></div>
                      </div>
                      <span>37%</span>
                    </div>
                  </td>
                </tr>
                <tr className="hover:bg-gray-light">
                  <td className="py-3 px-4 border-b border-gray-light">Lima</td>
                  <td className="py-3 px-4 border-b border-gray-light">28</td>
                  <td className="py-3 px-4 border-b border-gray-light">María Rodríguez</td>
                  <td className="py-3 px-4 border-b border-gray-light">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 max-w-[200px] h-2 bg-gray-light rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: '32%' }}></div>
                      </div>
                      <span>32%</span>
                    </div>
                  </td>
                </tr>
                <tr className="hover:bg-gray-light">
                  <td className="py-3 px-4 border-b border-gray-light">Cusco</td>
                  <td className="py-3 px-4 border-b border-gray-light">15</td>
                  <td className="py-3 px-4 border-b border-gray-light">Pedro Quispe</td>
                  <td className="py-3 px-4 border-b border-gray-light">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 max-w-[200px] h-2 bg-gray-light rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: '17%' }}></div>
                      </div>
                      <span>17%</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Gráfico de despachos por día */}
      <div className="bg-white rounded shadow">
        <div className="p-4 border-b border-gray-light">
          <h3 className="font-semibold text-primary-darker">Despachos por Día</h3>
        </div>
        <div className="p-6">
          <div className="h-[300px] relative">
            {/* Aquí iría el gráfico real. Para simplificar, mostramos barras estáticas */}
            <div className="absolute left-[50px] bottom-0 w-[30px] h-[120px] bg-primary rounded-t cursor-pointer hover:bg-primary-dark transition-all">
              <div className="absolute top-[-25px] w-[60px] left-[-15px] text-center font-semibold text-xs text-primary opacity-0 hover:opacity-100 transition-opacity">12</div>
            </div>
            <div className="absolute left-[50px] bottom-[-25px] w-[60px] ml-[-15px] text-center text-xs text-gray">Lun</div>
            
            <div className="absolute left-[150px] bottom-0 w-[30px] h-[180px] bg-primary rounded-t cursor-pointer hover:bg-primary-dark transition-all">
              <div className="absolute top-[-25px] w-[60px] left-[-15px] text-center font-semibold text-xs text-primary opacity-0 hover:opacity-100 transition-opacity">18</div>
            </div>
            <div className="absolute left-[150px] bottom-[-25px] w-[60px] ml-[-15px] text-center text-xs text-gray">Mar</div>
            
            <div className="absolute left-[250px] bottom-0 w-[30px] h-[140px] bg-primary rounded-t cursor-pointer hover:bg-primary-dark transition-all">
              <div className="absolute top-[-25px] w-[60px] left-[-15px] text-center font-semibold text-xs text-primary opacity-0 hover:opacity-100 transition-opacity">14</div>
            </div>
            <div className="absolute left-[250px] bottom-[-25px] w-[60px] ml-[-15px] text-center text-xs text-gray">Mié</div>
            
            <div className="absolute left-[350px] bottom-0 w-[30px] h-[100px] bg-primary rounded-t cursor-pointer hover:bg-primary-dark transition-all">
              <div className="absolute top-[-25px] w-[60px] left-[-15px] text-center font-semibold text-xs text-primary opacity-0 hover:opacity-100 transition-opacity">10</div>
            </div>
            <div className="absolute left-[350px] bottom-[-25px] w-[60px] ml-[-15px] text-center text-xs text-gray">Jue</div>
            
            <div className="absolute left-[450px] bottom-0 w-[30px] h-[160px] bg-primary rounded-t cursor-pointer hover:bg-primary-dark transition-all">
              <div className="absolute top-[-25px] w-[60px] left-[-15px] text-center font-semibold text-xs text-primary opacity-0 hover:opacity-100 transition-opacity">16</div>
            </div>
            <div className="absolute left-[450px] bottom-[-25px] w-[60px] ml-[-15px] text-center text-xs text-gray">Vie</div>
            
            <div className="absolute left-[550px] bottom-0 w-[30px] h-[90px] bg-primary rounded-t cursor-pointer hover:bg-primary-dark transition-all">
              <div className="absolute top-[-25px] w-[60px] left-[-15px] text-center font-semibold text-xs text-primary opacity-0 hover:opacity-100 transition-opacity">9</div>
            </div>
            <div className="absolute left-[550px] bottom-[-25px] w-[60px] ml-[-15px] text-center text-xs text-gray">Sáb</div>
            
            <div className="absolute left-[650px] bottom-0 w-[30px] h-[80px] bg-primary rounded-t cursor-pointer hover:bg-primary-dark transition-all">
              <div className="absolute top-[-25px] w-[60px] left-[-15px] text-center font-semibold text-xs text-primary opacity-0 hover:opacity-100 transition-opacity">8</div>
            </div>
            <div className="absolute left-[650px] bottom-[-25px] w-[60px] ml-[-15px] text-center text-xs text-gray">Dom</div>
            
            {/* Línea base */}
            <div className="absolute left-0 right-0 bottom-0 h-[1px] bg-gray-light"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResumenTab