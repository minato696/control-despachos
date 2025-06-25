"use client"

import { useState } from 'react'
import { useAppContext } from '../../components/AppContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

interface AddReporterModalProps {
  show: boolean
  onClose: () => void
}

const AddReporterModal: React.FC<AddReporterModalProps> = ({ show, onClose }) => {
  const { addReportero } = useAppContext()
  const [nombre, setNombre] = useState('')
  const [ciudad, setCiudad] = useState('')

  const handleSubmit = () => {
    if (nombre.trim() === '') {
      // Mostrar error
      return
    }
    
    if (ciudad === '') {
      // Mostrar error
      return
    }
    
    addReportero(nombre, ciudad)
    setNombre('')
    setCiudad('')
    onClose()
  }

  if (!show) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded shadow-lg w-full max-w-md max-h-[90vh] overflow-auto transform transition-transform duration-300">
        <div className="flex justify-between items-center p-5 border-b border-gray-light">
          <h3 className="text-lg font-semibold text-primary-darker">Agregar Reportero</h3>
          <button 
            className="text-gray hover:text-danger transition-colors text-xl"
            onClick={onClose}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        <div className="p-6">
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-dark">
              Nombre del Reportero:
            </label>
            <input
              type="text"
              className="w-full px-3.5 py-2.5 text-sm border border-gray-light rounded shadow-sm transition-all focus:outline-none focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-25"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-dark">
              Ciudad:
            </label>
            <select
              className="w-full px-3.5 py-2.5 text-sm border border-gray-light rounded shadow-sm transition-all focus:outline-none focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-25"
              value={ciudad}
              onChange={(e) => setCiudad(e.target.value)}
            >
              <option value="">-- Seleccione Ciudad --</option>
              <option value="arequipa">Arequipa</option>
              <option value="lima">Lima</option>
              <option value="cusco">Cusco</option>
              <option value="trujillo">Trujillo</option>
              <option value="huancayo">Huancayo</option>
              <option value="piura">Piura</option>
              <option value="chiclayo">Chiclayo</option>
              <option value="tacna">Tacna</option>
              <option value="ica">Ica</option>
              <option value="pucallpa">Pucallpa</option>
            </select>
          </div>
        </div>
        <div className="flex justify-end p-5 gap-3 border-t border-gray-light">
          <button
            className="px-4 py-2 bg-white text-gray-dark border border-gray-light rounded hover:bg-gray-light transition-colors"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition-colors"
            onClick={handleSubmit}
          >
            Agregar
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddReporterModal