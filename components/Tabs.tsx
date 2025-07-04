"use client"

import { useAppContext } from './AppContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faClipboardList, 
  faCity, 
  faUsers, 
  faChartBar,
  faFileAlt,
  faCog 
} from '@fortawesome/free-solid-svg-icons'

const Tabs = () => {
  const { activeTab, setActiveTab } = useAppContext()

  const tabs = [
    { id: 'registro', label: 'Registro de Despachos', icon: faClipboardList },
    { id: 'ciudades', label: 'Todas las Ciudades', icon: faCity },
    { id: 'reporteros', label: 'Todos los Reporteros', icon: faUsers },
    { id: 'resumen', label: 'Resumen Semanal', icon: faChartBar },
    { id: 'informes', label: 'Informes', icon: faFileAlt },
  ]

  return (
    <div className="tabs">
      {tabs.map(tab => (
        <div 
          key={tab.id}
          className={`tab ${activeTab === tab.id ? 'active' : ''}`}
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