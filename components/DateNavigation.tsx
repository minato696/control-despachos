"use client"

import { useAppContext } from './AppContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarAlt, faChevronLeft, faChevronRight, faCalendarDay } from '@fortawesome/free-solid-svg-icons'

const DateNavigation = () => {
  const { currentDate, setCurrentDate } = useAppContext()

  // Función para formatear la fecha
  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    }
    return date.toLocaleDateString('es-ES', options)
      .replace(/^\w/, c => c.toUpperCase())
  }

  // Manejar el cambio de día
  const goToPreviousDay = () => {
    const newDate = new Date(currentDate)
    newDate.setDate(newDate.getDate() - 1)
    setCurrentDate(newDate)
  }

  const goToNextDay = () => {
    const newDate = new Date(currentDate)
    newDate.setDate(newDate.getDate() + 1)
    setCurrentDate(newDate)
  }

  const goToToday = () => {
    setCurrentDate(new Date())
  }

  return (
    <div className="flex items-center justify-between p-4 bg-white rounded shadow mb-6">
      <div className="flex items-center gap-3 font-medium text-dark">
        <FontAwesomeIcon icon={faCalendarAlt} />
        <span>{formatDate(currentDate)}</span>
      </div>
      <div className="flex gap-3">
        <button 
          onClick={goToPreviousDay}
          className="btn btn-outline"
        >
          <FontAwesomeIcon icon={faChevronLeft} />
          Día anterior
        </button>
        <button 
          onClick={goToToday}
          className="btn btn-primary"
        >
          <FontAwesomeIcon icon={faCalendarDay} />
          Hoy
        </button>
        <button 
          onClick={goToNextDay}
          className="btn btn-outline"
        >
          Día siguiente
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    </div>
  )
}

export default DateNavigation