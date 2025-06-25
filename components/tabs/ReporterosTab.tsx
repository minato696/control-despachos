"use client"

import { useState } from 'react'
import { useAppContext } from '../../components/AppContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faUsers, faPlus, faSearch, faEdit, 
  faClipboardList, faTrash, faToggleOn 
} from '@fortawesome/free-solid-svg-icons'

const ReporterosTab = () => {
  const { reporteros } = useAppContext()
  const [searchTerm, setSearchTerm] = useState('')

  // Obtener todos los reporteros de todas las ciudades
  const allReporters = Object.entries(reporteros).reduce((acc, [city, reporters]) => {
    return [...acc, ...reporters.map(reporter => ({ ...reporter, city }))]
  }, [] as Array<{ id: number, nombre: string, city: string }>)

  // Filtrar reporteros según búsqueda
  const filteredReporters = allReporters.filter(reporter => 
    reporter.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reporter.city.toLowerCase().includes(searchTerm.toLowerCase())
  )

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
        <h2 className="text-xl font-semibold text-primary-darker flex items-center gap-3">
          <FontAwesomeIcon icon={faUsers} />
          Todos los Reporteros
        </h2>
        <button className="flex items-center gap-2 px-3 py-1.5 text-sm bg-primary text-white rounded shadow-sm hover:bg-primary-dark transition-colors">
          <FontAwesomeIcon icon={faPlus} />
          Agregar Reportero
        </button>
      </div>

      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
          <FontAwesomeIcon icon={faSearch} className="text-gray" />
        </div>
        <input 
          type="text" 
          className="w-full pl-12 pr-4 py-3 text-sm border border-gray-light rounded shadow-sm transition-all focus:outline-none focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-25"
          placeholder="Buscar reportero por nombre o ciudad..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left py-3.5 px-4 bg-gray-light font-semibold text-gray-dark border-b border-gray-light">Nombre</th>
              <th className="text-left py-3.5 px-4 bg-gray-light font-semibold text-gray-dark border-b border-gray-light">Ciudad</th>
              <th className="text-left py-3.5 px-4 bg-gray-light font-semibold text-gray-dark border-b border-gray-light">Despachos esta semana</th>
              <th className="text-left py-3.5 px-4 bg-gray-light font-semibold text-gray-dark border-b border-gray-light">Último despacho</th>
              <th className="text-left py-3.5 px-4 bg-gray-light font-semibold text-gray-dark border-b border-gray-light">Estado</th>
              <th className="text-left py-3.5 px-4 bg-gray-light font-semibold text-gray-dark border-b border-gray-light">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredReporters.map((reporter) => (
              <tr key={reporter.id} className="hover:bg-gray-light">
                <td className="py-3 px-4 border-b border-gray-light">{reporter.nombre}</td>
                <td className="py-3 px-4 border-b border-gray-light">{cityNameMap[reporter.city] || reporter.city}</td>
                <td className="py-3 px-4 border-b border-gray-light">5</td>
                <td className="py-3 px-4 border-b border-gray-light">Hoy, 10:30</td>
                <td className="py-3 px-4 border-b border-gray-light">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-success-light text-success">
                    Activo
                  </span>
                </td>
                <td className="py-3 px-4 border-b border-gray-light">
                  <div className="flex gap-2">
                    <button className="w-8 h-8 flex items-center justify-center rounded-full text-gray hover:bg-gray-light hover:text-primary transition-colors">
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button className="w-8 h-8 flex items-center justify-center rounded-full text-gray hover:bg-gray-light hover:text-primary transition-colors">
                      <FontAwesomeIcon icon={faClipboardList} />
                    </button>
                    <button className="w-8 h-8 flex items-center justify-center rounded-full text-gray hover:bg-gray-light hover:text-danger transition-colors">
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ReporterosTab