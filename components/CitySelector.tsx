"use client"

import { useAppContext } from './AppContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers } from '@fortawesome/free-solid-svg-icons'

const CitySelector = () => {
  const { selectedCity, setSelectedCity, reporteros } = useAppContext()

  const cities = [
    { value: "", label: "-- Seleccione Ciudad --" },
    { value: "arequipa", label: "Arequipa" },
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
    <div className="city-selector">
      <div className="w-[250px]">
        <label htmlFor="city-select" className="form-label">
          Seleccionar Ciudad:
        </label>
        <select
          id="city-select"
          className="form-select"
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
        <div className="reporter-count">
          <FontAwesomeIcon icon={faUsers} className="text-primary" />
          Reporteros disponibles: <span className="font-semibold">{reporterCount}</span>
        </div>
      )}
    </div>
  )
}

export default CitySelector