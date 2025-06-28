// components/tabs/CiudadesTab.tsx
import { useState, useEffect } from 'react'
import { useAppContext } from '../AppContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCity, faPlus, faSearch, faUser, faClipboardList, faSpinner, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import { formatCityName } from '../../utils/cityUtils'
import AddCiudadModal from '../modals/AddCiudadModal'

interface Ciudad {
  id: number
  codigo: string
  nombre: string
  activo: boolean
  reporteros: Array<{
    id: number
    nombre: string
    estado: string
  }>
}

const CiudadesTab = () => {
  const { setActiveTab, setSelectedCity, setNotification } = useAppContext()
  const [searchTerm, setSearchTerm] = useState('')
  const [ciudades, setCiudades] = useState<Ciudad[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)

  // Cargar ciudades desde la API
  useEffect(() => {
    const fetchCiudades = async () => {
      setLoading(true)
      try {
        const response = await fetch('/api/ciudades?include=reporteros')
        if (!response.ok) {
          throw new Error('Error al obtener ciudades')
        }
        const data = await response.json()
        setCiudades(data)
      } catch (error) {
        console.error('Error al cargar ciudades:', error)
        setNotification({
          show: true,
          type: 'error',
          title: 'Error',
          message: 'No se pudieron cargar las ciudades'
        })
      } finally {
        setLoading(false)
      }
    }
    
    fetchCiudades()
  }, [setNotification])

  // Filtrar ciudades según búsqueda
  const filteredCities = ciudades.filter(ciudad => 
    ciudad.codigo.includes(searchTerm.toLowerCase()) || 
    ciudad.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Función para seleccionar ciudad y cambiar a pestaña de registro
  const selectCityAndTab = (cityCode: string) => {
    setSelectedCity(cityCode)
    setActiveTab('registro')
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center p-10">
        <FontAwesomeIcon icon={faSpinner} spin className="text-3xl text-primary mr-3" />
        <span className="text-lg">Cargando ciudades...</span>
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-[#1a365d] flex items-center gap-3">
          <FontAwesomeIcon icon={faCity} />
          Todas las Ciudades <span className="ml-2 text-sm bg-[#e0f2fe] text-[#1a56db] px-2 py-1 rounded-full">
            {ciudades.length} ciudades
          </span>
        </h2>
        <button 
          className="flex items-center gap-2 px-3 py-1.5 text-sm bg-[#1a56db] text-white rounded-lg shadow-sm hover:bg-[#1e429f] transition-colors"
          onClick={() => setShowModal(true)}
        >
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
        {filteredCities.map((ciudad) => (
          <div 
            key={ciudad.id}
            className="border border-[#e2e8f0] rounded-lg shadow p-6 hover:shadow-md hover:-translate-y-[3px] transition-all cursor-pointer h-full flex flex-col"
          >
            <div className="flex justify-between items-center pb-4 border-b border-[#e2e8f0] mb-4">
              <h3 className="text-lg font-semibold text-[#1a365d] flex items-center">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2 text-[#1a56db]" />
                {ciudad.nombre}
              </h3>
              <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-[#e0f2fe] text-[#1a56db]">
                {ciudad.reporteros.length} {ciudad.reporteros.length === 1 ? 'reportero' : 'reporteros'}
              </span>
            </div>
            
            {/* Lista de reporteros */}
            <div className="flex-1 mb-4">
              {ciudad.reporteros.length > 0 ? (
                <ul className="text-sm">
                  {ciudad.reporteros.map(reportero => (
                    <li key={reportero.id} className="py-2 border-b border-[#f1f5f9] last:border-b-0 flex items-center">
                      <FontAwesomeIcon icon={faUser} className="text-[#64748b] mr-2" />
                      {reportero.nombre}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-[#64748b] italic">No hay reporteros asignados</p>
              )}
            </div>
            
            <div className="mt-auto">
              <button 
                onClick={() => selectCityAndTab(ciudad.codigo)}
                className="w-full flex items-center justify-center gap-2 px-3 py-1.5 text-sm bg-white text-[#1a56db] border border-[#bfdbfe] rounded-lg shadow-sm hover:bg-[#e0f2fe] transition-colors"
              >
                <FontAwesomeIcon icon={faClipboardList} />
                Registrar Despachos
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {filteredCities.length === 0 && (
        <div className="text-center p-8 bg-[#f8fafc] rounded-lg border border-[#e2e8f0] text-[#64748b]">
          <p>No se encontraron ciudades con ese término de búsqueda.</p>
        </div>
      )}
      
      {/* Modal para agregar ciudad y reporteros */}
      <AddCiudadModal 
        show={showModal} 
        onClose={() => setShowModal(false)} 
        onSuccess={() => {
          // Recargar ciudades después de agregar una nueva
          fetch('/api/ciudades?include=reporteros')
            .then(res => res.json())
            .then(data => setCiudades(data))
            .catch(error => console.error('Error al actualizar ciudades:', error));
        }}
      />
    </div>
  )
}

export default CiudadesTab