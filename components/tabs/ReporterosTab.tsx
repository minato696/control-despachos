import { useState } from 'react'
import { useAppContext } from '../AppContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faUsers, faPlus, faSearch, faEdit, 
  faClipboardList, faTrash
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

  // Mapeo de ciudades a nombres en español con primera letra mayúscula
  const cityNameMap: {[key: string]: string} = {
    'abancay': 'Abancay',
    'arequipa': 'Arequipa',
    'ayacucho': 'Ayacucho',
    'barranca': 'Barranca',
    'cajamarca': 'Cajamarca',
    'chiclayo': 'Chiclayo',
    'chincha': 'Chincha',
    'cusco': 'Cusco',
    'huancayo': 'Huancayo',
    'huaral': 'Huaral',
    'huaraz': 'Huaraz',
    'huacho': 'Huacho',
    'ica': 'Ica',
    'iquitos': 'Iquitos',
    'juliaca': 'Juliaca',
    'mollendo': 'Mollendo',
    'piura': 'Piura',
    'pisco': 'Pisco',
    'puerto_maldonado': 'Puerto Maldonado',
    'tacna': 'Tacna',
    'tarapoto': 'Tarapoto',
    'trujillo': 'Trujillo',
    'tumbes': 'Tumbes',
    'yurimaguas': 'Yurimaguas'
  }

  // Datos de ejemplo para completar la tabla
  const reporterData = [
    { id: 2, nombre: 'Richard Calcina', ciudad: 'Arequipa', despachos: 7, ultimoDespacho: 'Hoy, 10:30', estado: 'Activo' },
    { id: 3, nombre: 'Carlos Nina', ciudad: 'Arequipa', despachos: 5, ultimoDespacho: 'Hoy, 11:45', estado: 'Activo' },
    { id: 4, nombre: 'Diego Condori', ciudad: 'Arequipa', despachos: 4, ultimoDespacho: 'Ayer, 15:20', estado: 'Activo' },
    { id: 10, nombre: 'Percy Pillca', ciudad: 'Cusco', despachos: 6, ultimoDespacho: 'Ayer, 14:10', estado: 'Activo' },
    { id: 24, nombre: 'Roxana Gamboa', ciudad: 'Trujillo', despachos: 5, ultimoDespacho: 'Ayer, 16:30', estado: 'Activo' },
    { id: 11, nombre: 'Christian Canchapoma', ciudad: 'Huancayo', despachos: 3, ultimoDespacho: '20/06/2025, 09:15', estado: 'Ausente' },
    { id: 19, nombre: 'Percy Bereche', ciudad: 'Piura', despachos: 2, ultimoDespacho: '19/06/2025, 11:30', estado: 'Inactivo' }
  ]

  // Función para obtener la clase de estado
  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Activo':
        return 'bg-[#ecfdf5] text-[#10b981]';
      case 'Ausente':
        return 'bg-[#fffbeb] text-[#f59e0b]';
      case 'Inactivo':
        return 'bg-[#fee2e2] text-[#ef4444]';
      default:
        return 'bg-[#eff6ff] text-[#3b82f6]';
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-[#1a365d] flex items-center gap-3">
          <FontAwesomeIcon icon={faUsers} />
          Todos los Reporteros
        </h2>
        <button className="flex items-center gap-2 px-3 py-1.5 text-sm bg-[#1a56db] text-white rounded-lg shadow-sm hover:bg-[#1e429f] transition-colors">
          <FontAwesomeIcon icon={faPlus} />
          Agregar Reportero
        </button>
      </div>

      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
          <FontAwesomeIcon icon={faSearch} className="text-[#64748b]" />
        </div>
        <input 
          type="text" 
          className="w-full pl-12 pr-4 py-3 text-sm border border-[#e2e8f0] rounded-lg shadow-sm transition-all focus:outline-none focus:border-[#1a56db] focus:ring focus:ring-[#1a56db] focus:ring-opacity-25"
          placeholder="Buscar reportero por nombre o ciudad..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left py-3.5 px-4 bg-[#f1f5f9] font-semibold text-[#475569] border-b border-[#e2e8f0]">Nombre</th>
              <th className="text-left py-3.5 px-4 bg-[#f1f5f9] font-semibold text-[#475569] border-b border-[#e2e8f0]">Ciudad</th>
              <th className="text-left py-3.5 px-4 bg-[#f1f5f9] font-semibold text-[#475569] border-b border-[#e2e8f0]">Despachos esta semana</th>
              <th className="text-left py-3.5 px-4 bg-[#f1f5f9] font-semibold text-[#475569] border-b border-[#e2e8f0]">Último despacho</th>
              <th className="text-left py-3.5 px-4 bg-[#f1f5f9] font-semibold text-[#475569] border-b border-[#e2e8f0]">Estado</th>
              <th className="text-left py-3.5 px-4 bg-[#f1f5f9] font-semibold text-[#475569] border-b border-[#e2e8f0]">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {reporterData.filter(reporter => 
              reporter.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
              reporter.ciudad.toLowerCase().includes(searchTerm.toLowerCase())
            ).map(reporter => (
              <tr key={reporter.id} className="hover:bg-[#f1f5f9]">
                <td className="py-3 px-4 border-b border-[#e2e8f0] text-[#1e293b]">{reporter.nombre}</td>
                <td className="py-3 px-4 border-b border-[#e2e8f0] text-[#1e293b]">{reporter.ciudad}</td>
                <td className="py-3 px-4 border-b border-[#e2e8f0] text-[#1e293b]">{reporter.despachos}</td>
                <td className="py-3 px-4 border-b border-[#e2e8f0] text-[#1e293b]">{reporter.ultimoDespacho}</td>
                <td className="py-3 px-4 border-b border-[#e2e8f0]">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusClass(reporter.estado)}`}>
                    {reporter.estado}
                  </span>
                </td>
                <td className="py-3 px-4 border-b border-[#e2e8f0]">
                  <div className="flex gap-2">
                    <button className="w-8 h-8 flex items-center justify-center rounded-full text-[#64748b] hover:bg-[#f1f5f9] hover:text-[#1a56db] transition-colors">
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button className="w-8 h-8 flex items-center justify-center rounded-full text-[#64748b] hover:bg-[#f1f5f9] hover:text-[#1a56db] transition-colors">
                      <FontAwesomeIcon icon={faClipboardList} />
                    </button>
                    <button className="w-8 h-8 flex items-center justify-center rounded-full text-[#64748b] hover:bg-[#f1f5f9] hover:text-[#ef4444] transition-colors">
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