"use client"

import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, faVideo } from '@fortawesome/free-solid-svg-icons'

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
    <div className="despacho-card">
      <div className="despacho-header">
        <span>Despacho {despachoNum}</span>
      </div>
      <div className="despacho-body">
        <div className="mb-5">
          <label className="form-label">
            Título del despacho:
          </label>
          <input
            type="text"
            className="form-control"
            id={`titulo-${reporterId}-${despachoNum}`}
            placeholder="Ingrese el título del despacho"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
        </div>
        <div className="flex gap-5">
          <div className="flex-1">
            <label className="form-label">
              HORA:
            </label>
            <div className="relative">
              <input
                type="time"
                className="form-control pr-10"
                id={`hora-${reporterId}-${despachoNum}`}
                value={hora}
                onChange={(e) => setHora(e.target.value)}
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray pointer-events-none">
                <FontAwesomeIcon icon={faClock} />
              </div>
            </div>
          </div>
          <div className="flex-1">
            <label className="form-label">
              En vivo:
            </label>
            <div className="relative">
              <input
                type="time"
                className="form-control pr-10"
                id={`vivo-${reporterId}-${despachoNum}`}
                value={vivo}
                onChange={(e) => setVivo(e.target.value)}
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray pointer-events-none">
                <FontAwesomeIcon icon={faVideo} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DespachoCard