"use client"

import React, { createContext, useContext, useState, ReactNode } from 'react'

// Definir tipos para reporteros y despachos
export interface Reportero {
  id: number
  nombre: string
}

export interface Despacho {
  reportero_id: number
  reportero_nombre: string
  despacho_num: number
  titulo: string
  hora_despacho: string
  hora_en_vivo: string
  fecha: string
  ciudad: string
}

interface ReporterosMap {
  [ciudad: string]: Reportero[]
}

interface AppContextType {
  currentDate: Date
  setCurrentDate: (date: Date) => void
  selectedCity: string
  setSelectedCity: (city: string) => void
  reporteros: ReporterosMap
  setReporteros: (reporteros: ReporterosMap) => void
  despachos: Despacho[]
  setDespachos: (despachos: Despacho[]) => void
  activeTab: string
  setActiveTab: (tab: string) => void
  notification: {
    show: boolean
    type: string
    title: string
    message: string
  }
  setNotification: (notification: {
    show: boolean
    type: string
    title: string
    message: string
  }) => void
  addReportero: (nombre: string, ciudad: string) => void
  saveDespachos: (nuevosDespachos: Despacho[]) => void
}

// Datos actualizados de reporteros basados en el archivo Excel
const initialReporteros: ReporterosMap = {
  abancay: [
    { id: 1, nombre: 'Genaro Nuñez' }
  ],
  arequipa: [
    { id: 2, nombre: 'Richard Calcina' },
    { id: 3, nombre: 'Carlos Nina' },
    { id: 4, nombre: 'Diego Condori' }
  ],
  ayacucho: [
    { id: 5, nombre: 'Leonardo Ripas' }
  ],
  barranca: [
    { id: 6, nombre: 'Sally Chaquilano' }
  ],
  cajamarca: [
    { id: 7, nombre: 'Alvaro Franco' }
  ],
  chiclayo: [
    { id: 8, nombre: 'Noeli Bracamonte' }
  ],
  chincha: [
    { id: 9, nombre: 'Christian Auris' }
  ],
  cusco: [
    { id: 10, nombre: 'Percy Pillca' }
  ],
  huancayo: [
    { id: 11, nombre: 'Christian Canchapoma' }
  ],
  huaral: [
    { id: 12, nombre: 'Carlos Mesias' }
  ],
  huaraz: [
    { id: 13, nombre: 'Milagros Herrera' }
  ],
  huacho: [
    { id: 14, nombre: 'Erick Aldabe' }
  ],
  ica: [
    { id: 15, nombre: 'Rogger Espino' }
  ],
  iquitos: [
    { id: 16, nombre: 'Omar Rios' }
  ],
  juliaca: [
    { id: 17, nombre: 'Jose Luis Yupanqui' }
  ],
  mollendo: [
    { id: 18, nombre: 'Gabriel Castro' }
  ],
  piura: [
    { id: 19, nombre: 'Percy Bereche' }
  ],
  pisco: [
    { id: 20, nombre: 'Giusepi Mozo' }
  ],
  puerto_maldonado: [
    { id: 21, nombre: 'Gilbert Galindo' }
  ],
  tacna: [
    { id: 22, nombre: 'Elizabeth Ticona' }
  ],
  tarapoto: [
    { id: 23, nombre: 'Armando Murriera' }
  ],
  trujillo: [
    { id: 24, nombre: 'Roxana Gamboa' },
    { id: 25, nombre: 'Anabel Santos' },
    { id: 26, nombre: 'Pedro Concepción' }
  ],
  tumbes: [
    { id: 27, nombre: 'Carlos Esteves' }
  ],
  yurimaguas: [
    { id: 28, nombre: 'Luis Canevaro' }
  ]
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: ReactNode }) {
  // Estados
  const [currentDate, setCurrentDate] = useState<Date>(new Date())
  const [selectedCity, setSelectedCity] = useState<string>('arequipa')
  const [reporteros, setReporteros] = useState<ReporterosMap>(initialReporteros)
  const [despachos, setDespachos] = useState<Despacho[]>([])
  const [activeTab, setActiveTab] = useState<string>('registro')
  const [notification, setNotification] = useState({
    show: false,
    type: 'success',
    title: '',
    message: ''
  })

  // Función para agregar un nuevo reportero
  const addReportero = (nombre: string, ciudad: string) => {
    // Generar un nuevo ID (en un sistema real vendría del backend)
    const allReporteros = Object.values(reporteros).flat()
    const newId = Math.max(...allReporteros.map(r => r.id), 0) + 1

    setReporteros(prev => {
      // Crear una copia profunda del objeto
      const newReporteros = JSON.parse(JSON.stringify(prev)) as ReporterosMap

      // Asegurarse de que existe la ciudad
      if (!newReporteros[ciudad]) {
        newReporteros[ciudad] = []
      }

      // Añadir el nuevo reportero
      newReporteros[ciudad].push({
        id: newId,
        nombre: nombre
      })

      return newReporteros
    })

    // Mostrar notificación
    setNotification({
      show: true,
      type: 'success',
      title: '¡Reportero agregado!',
      message: `${nombre} ha sido agregado a ${ciudad}.`
    })

    // Si la ciudad seleccionada es la misma a la que se agrega el reportero,
    // seguimos en la misma pestaña
    if (ciudad === selectedCity) {
      setActiveTab('registro')
    }
  }

  // Función para guardar despachos
  const saveDespachos = (nuevosDespachos: Despacho[]) => {
    // En un sistema real, aquí enviaríamos los datos al servidor
    setDespachos(prev => [...prev, ...nuevosDespachos])
    
    // Mostrar notificación
    setNotification({
      show: true,
      type: 'success',
      title: '¡Operación exitosa!',
      message: 'Los despachos han sido guardados correctamente.'
    })
  }

  // Valores que expondremos en el contexto
  const contextValue: AppContextType = {
    currentDate,
    setCurrentDate,
    selectedCity,
    setSelectedCity,
    reporteros,
    setReporteros,
    despachos,
    setDespachos,
    activeTab,
    setActiveTab,
    notification,
    setNotification,
    addReportero,
    saveDespachos
  }

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  )
}

// Hook personalizado para usar el contexto
export function useAppContext() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useAppContext debe ser usado dentro de un AppProvider')
  }
  return context
}