"use client"

import { useAppContext } from '../components/AppContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faClipboardList, 
  faCity, 
  faUsers, 
  faChartBar, 
  faCog 
} from '@fortawesome/free-solid-svg-icons'

const Tabs = () => {
  const { activeTab, setActiveTab } = useAppContext()

  const tabs = [
    { id: 'registro', label: 'Registro de Despachos', icon: faClipboardList },
    { id: 'ciudades', label: 'Todas las Ciudades', icon: faCity },
    { id: 'reporteros', label: 'Todos los Reporteros', icon: faUsers },
    { id: 'resumen', label: 'Resumen Semanal', icon: faChartBar },
    { id: 'config', label: 'Configuración', icon: faCog }
  ]

  return (
    <div className="flex border-b border-gray-light bg-white rounded-t-lg overflow-x-auto scrollbar-none">
      {tabs.map(tab => (
        <div 
          key={tab.id}
          className={`
            px-6 py-4 font-medium cursor-pointer transition-all text-gray flex items-center gap-3 whitespace-nowrap
            ${activeTab === tab.id ? 'text-primary border-b-2 border-primary bg-primary-light' : 'hover:text-primary hover:bg-gray-light'}
          `}
          onClick={() => setActiveTab(tab.id)}
        >
          <FontAwesomeIcon icon={tab.icon} />
          {tab.label}
        </div>
      ))}
    </div>
  )
}

export default Tabs