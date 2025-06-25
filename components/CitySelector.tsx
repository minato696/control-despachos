"use client"

import { useAppContext } from '../components/AppContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers } from '@fortawesome/free-solid-svg-icons'

const CitySelector = () => {
  const { selectedCity, setSelectedCity, reporteros } = useAppContext()

  const cities = [
    { value: "", label: "-- Seleccione Ciudad --" },
    { value: "arequipa", label: "Arequipa" },
    { value: "lima", label: "Lima" },
    { value: "cusco", label: "Cusco" },
    { value: "trujillo", label: "Trujillo" },
    { value: "huancayo", label: "Huancayo" },
    { value: "piura", label: "Piura" },
    { value: "chiclayo", label: "Chiclayo" },
    { value: "tacna", label: "Tacna" },
    { value: "ica", label: "Ica" },
    { value: "pucallpa", label: "Pucallpa" }
  ]

  // Contar reporteros disponibles para la ciudad seleccionada
  const reporterCount = selectedCity ? (reporteros[selectedCity]?.length || 0) : 0

  return (
    <div className="flex flex-wrap gap-6 items-center mb-6">
      <div className="w-[250px]">
        <label htmlFor="city-select" className="block mb-2 text-sm font-medium text-gray-dark">
          Seleccionar Ciudad:
        </label>
        <select
          id="city-select"
          className="w-full px-3.5 py-2.5 text-sm border border-gray-light rounded shadow-sm transition-all focus:outline-none focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-25"
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
        >
          {cities.map((city) => (
            <option key={city.value} value={city.value}>
              {city.label}
            </option>
          ))}
        </select>
      </div>
      
      {selectedCity && (
        <div className="flex items-center gap-3 text-sm text-primary bg-primary-light px-4 py-2 rounded-full shadow-sm">
          <FontAwesomeIcon icon={faUsers} className="text-primary" />
          Reporteros disponibles: <span className="font-semibold">{reporterCount}</span>
        </div>
      )}
    </div>
  )
}

export default CitySelector