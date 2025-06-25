"use client"

import { useState } from 'react'
import { useAppContext, Despacho } from '../../components/AppContext'
import CitySelector from '../CitySelector'
import ReporterCard from '../ReporterCard'
import AddReporterModal from '../modals/AddReporterModal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faSave } from '@fortawesome/free-solid-svg-icons'

const RegistroTab = () => {
  const { selectedCity, reporteros, saveDespachos } = useAppContext()
  const [showModal, setShowModal] = useState(false)

  // Reporteros de la ciudad seleccionada
  const cityReporters = selectedCity ? reporteros[selectedCity] || [] : []

  // Función para guardar despachos
  const handleSaveDespachos = () => {
    // Recopilar datos de todos los despachos con información
    const despachos: Despacho[] = []
    
    // Aquí iría la lógica para recopilar los datos de los despachos
    
    // Guardar los despachos
    saveDespachos(despachos)
  }

  return (
    <div>
      <CitySelector />
      
      <div>
        {cityReporters.map(reportero => (
          <ReporterCard key={reportero.id} reportero={reportero} />
        ))}
      </div>
      
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <button 
          className="flex items-center justify-center gap-3 px-5 py-2.5 bg-success text-white rounded font-medium text-sm shadow-sm hover:bg-opacity-90 hover:transform hover:-translate-y-0.5 hover:shadow transition-all"
          onClick={() => setShowModal(true)}
        >
          <FontAwesomeIcon icon={faPlus} />
          Agregar Reportero
        </button>
        
        <button 
          className="flex items-center justify-center gap-3 px-5 py-2.5 bg-primary text-white rounded font-medium text-sm shadow-sm hover:bg-primary-dark hover:transform hover:-translate-y-0.5 hover:shadow transition-all"
          onClick={handleSaveDespachos}
        >
          <FontAwesomeIcon icon={faSave} />
          GUARDAR REGISTROS
        </button>
      </div>
      
      <AddReporterModal 
        show={showModal} 
        onClose={() => setShowModal(false)} 
      />
    </div>
  )
}

export default RegistroTab