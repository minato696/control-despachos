import { useState } from 'react'
import { useAppContext, Despacho } from '../AppContext'
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

  // Función para recopilar y guardar despachos
  const handleSaveDespachos = () => {
    if (!selectedCity) {
      // Mostrar notificación (en un sistema real)
      return
    }

    // Recopilar datos de todos los despachos con información
    const despachos: Despacho[] = []
    
    cityReporters.forEach(reporter => {
      for (let i = 1; i <= 3; i++) {
        const titulo = (document.getElementById(`titulo-${reporter.id}-${i}`) as HTMLInputElement)?.value || '';
        const hora = (document.getElementById(`hora-${reporter.id}-${i}`) as HTMLInputElement)?.value || '';
        const vivo = (document.getElementById(`vivo-${reporter.id}-${i}`) as HTMLInputElement)?.value || '';
        
        if (titulo || hora || vivo) {
          despachos.push({
            reportero_id: reporter.id,
            reportero_nombre: reporter.nombre,
            despacho_num: i,
            titulo,
            hora_despacho: hora,
            hora_en_vivo: vivo,
            fecha: new Date().toISOString().split('T')[0],
            ciudad: selectedCity
          });
        }
      }
    });
    
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

        {cityReporters.length === 0 && selectedCity && (
          <div className="text-center p-8 bg-[#f8fafc] rounded-lg border border-[#e2e8f0] text-[#64748b]">
            <p>No hay reporteros disponibles para esta ciudad.</p>
            <button 
              className="mt-4 px-4 py-2 bg-[#1a56db] text-white rounded-lg hover:bg-[#1e429f] transition-colors"
              onClick={() => setShowModal(true)}
            >
              <FontAwesomeIcon icon={faPlus} className="mr-2" />
              Agregar Reportero
            </button>
          </div>
        )}
      </div>
      
      <div className="flex flex-col md:flex-row justify-between gap-4 mt-6">
        <button 
          className="flex items-center justify-center gap-2 px-5 py-2.5 bg-[#10b981] text-white rounded-lg hover:bg-[#0d9668] transition-colors"
          onClick={() => setShowModal(true)}
        >
          <FontAwesomeIcon icon={faPlus} />
          Agregar Reportero
        </button>
        
        <button 
          className="flex items-center justify-center gap-2 px-5 py-2.5 bg-[#1a56db] text-white rounded-lg hover:bg-[#1e429f] transition-colors"
          onClick={handleSaveDespachos}
          disabled={!selectedCity || cityReporters.length === 0}
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