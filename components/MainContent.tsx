"use client"

import { useAppContext } from './AppContext'
import RegistroTab from './tabs/RegistroTab'
import CiudadesTab from './tabs/CiudadesTab'
import ReporterosTab from './tabs/ReporterosTab'
import ResumenTab from './tabs/ResumenTab'
import ConfigTab from './tabs/ConfigTab'

const MainContent = () => {
  const { activeTab } = useAppContext()

  return (
    <div className="p-6">
      {activeTab === 'registro' && <RegistroTab />}
      {activeTab === 'ciudades' && <CiudadesTab />}
      {activeTab === 'reporteros' && <ReporterosTab />}
      {activeTab === 'resumen' && <ResumenTab />}
      {activeTab === 'config' && <ConfigTab />}
    </div>
  )
}

export default MainContent