"use client"

import { useState } from 'react'

interface DespachoCardProps {
  reporterId: number
  despachoNum: number
  initialValues?: {
    titulo: string
    hora: string
    vivo: string
  }
}

const DespachoCard: React.FC<DespachoCardProps> = ({ 
  reporterId, 
  despachoNum, 
  initialValues = { titulo: '', hora: '', vivo: '' } 
}) => {
  const [titulo, setTitulo] = useState(initialValues.titulo)
  const [hora, setHora] = useState(initialValues.hora)
  const [vivo, setVivo] = useState(initialValues.vivo)

  return (
    <div className="border border-gray-light rounded shadow-sm hover:shadow transition-all">
      <div className="p-3 bg-light border-b border-gray-light font-semibold text-primary-darker">
        <span>Despacho {despachoNum}</span>
      </div>
      <div className="p-5">
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-dark">
            Título del despacho:
          </label>
          <input
            type="text"
            className="w-full px-3.5 py-2.5 text-sm border border-gray-light rounded shadow-sm transition-all focus:outline-none focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-25"
            id={`titulo-${reporterId}-${despachoNum}`}
            placeholder="Ingrese el título del despacho"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
        </div>
        <div className="flex gap-5">
          <div className="flex-1">
            <label className="block mb-2 text-sm font-medium text-gray-dark">
              HORA:
            </label>
            <div className="relative">
              <input
                type="time"
                className="w-full pl-3.5 pr-10 py-2.5 text-sm border border-gray-light rounded shadow-sm transition-all focus:outline-none focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-25"
                id={`hora-${reporterId}-${despachoNum}`}
                value={hora}
                onChange={(e) => setHora(e.target.value)}
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray pointer-events-none">
                <i className="far fa-clock"></i>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <label className="block mb-2 text-sm font-medium text-gray-dark">
              En vivo:
            </label>
            <div className="relative">
              <input
                type="time"
                className="w-full pl-3.5 pr-10 py-2.5 text-sm border border-gray-light rounded shadow-sm transition-all focus:outline-none focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-25"
                id={`vivo-${reporterId}-${despachoNum}`}
                value={vivo}
                onChange={(e) => setVivo(e.target.value)}
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray pointer-events-none">
                <i className="fas fa-video"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DespachoCard