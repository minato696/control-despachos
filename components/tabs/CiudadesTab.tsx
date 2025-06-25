import { useState } from 'react'
import { useAppContext } from '../AppContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCity, faPlus, faSearch, faUser, faClipboardList } from '@fortawesome/free-solid-svg-icons'

const CiudadesTab = () => {
  const { reporteros, setActiveTab, setSelectedCity } = useAppContext()
  const [searchTerm, setSearchTerm] = useState('')

  // Filtrar ciudades según búsqueda
  const filteredCities = Object.keys(reporteros)
    .filter(city => city.includes(searchTerm.toLowerCase()))

  // Función para seleccionar ciudad y cambiar a pestaña de registro
  const selectCityAndTab = (city: string) => {
    setSelectedCity(city)
    setActiveTab('registro')
  }

  // Mapeo de ciudades a nombres en español
  const cityNameMap: {[key: string]: string} = {
    'arequipa': 'Arequipa',
    'lima': 'Lima',
    'cusco': 'Cusco',
    'trujillo': 'Trujillo',
    'huancayo': 'Huancayo',
    'piura': 'Piura',
    'chiclayo': 'Chiclayo',
    'tacna': 'Tacna',
    'ica': 'Ica',
    'pucallpa': 'Pucallpa'
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-[#1a365d] flex items-center gap-3">
          <FontAwesomeIcon icon={faCity} />
          Todas las Ciudades
        </h2>
        <button className="flex items-center gap-2 px-3 py-1.5 text-sm bg-[#1a56db] text-white rounded-lg shadow-sm hover:bg-[#1e429f] transition-colors">
          <FontAwesomeIcon icon={faPlus} />
          Agregar Ciudad
        </button>
      </div>

      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
          <FontAwesomeIcon icon={faSearch} className="text-[#64748b]" />
        </div>
        <input 
          type="text" 
          className="w-full pl-12 pr-4 py-3 text-sm border border-[#e2e8f0] rounded-lg shadow-sm transition-all focus:outline-none focus:border-[#1a56db] focus:ring focus:ring-[#1a56db] focus:ring-opacity-25"
          placeholder="Buscar ciudad..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredCities.map((city) => {
          const cityReporters = reporteros[city]
          return (
            <div 
              key={city}
              className="border border-[#e2e8f0] rounded-lg shadow p-6 hover:shadow-md hover:-translate-y-[3px] transition-all cursor-pointer h-full flex flex-col"
            >
              <div className="flex justify-between items-center pb-4 border-b border-[#e2e8f0] mb-4">
                <h3 className="text-lg font-semibold text-[#1a365d]">
                  {cityNameMap[city] || city}
                </h3>
                <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-[#e0f2fe] text-[#1a56db]">
                  {cityReporters.length} {cityReporters.length === 1 ? 'reportero' : 'reporteros'}
                </span>
              </div>
              
              <ul className="flex-1 mb-4">
                {cityReporters.map(reporter => (
                  <li key={reporter.id} className="py-3 flex items-center gap-3 border-b border-[#f1f5f9] last:border-b-0">
                    <FontAwesomeIcon icon={faUser} className="text-[#64748b]" />
                    {reporter.nombre}
                  </li>
                ))}
              </ul>
              
              <div className="mt-auto">
                <button 
                  onClick={() => selectCityAndTab(city)}
                  className="w-full flex items-center justify-center gap-2 px-3 py-1.5 text-sm bg-white text-[#1a56db] border border-[#bfdbfe] rounded-lg shadow-sm hover:bg-[#e0f2fe] transition-colors"
                >
                  <FontAwesomeIcon icon={faClipboardList} />
                  Registrar Despachos
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default CiudadesTab