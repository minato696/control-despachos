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
    <div className="border border-[#e2e8f0] rounded-lg overflow-hidden shadow-sm hover:shadow transition-all">
      <div className="py-3 px-5 bg-[#f8fafc] border-b border-[#e2e8f0] font-semibold text-[#1a365d]">
        <span>Despacho {despachoNum}</span>
      </div>
      <div className="p-5">
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-[#475569]">
            Título del despacho:
          </label>
          <input
            type="text"
            className="w-full px-3.5 py-2.5 text-sm border border-[#e2e8f0] rounded-lg shadow-sm"
            id={`titulo-${reporterId}-${despachoNum}`}
            placeholder="Ingrese el título del despacho"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
        </div>
        <div className="flex gap-5">
          <div className="flex-1">
            <label className="block mb-2 text-sm font-medium text-[#475569]">
              HORA:
            </label>
            <div className="relative">
              <input
                type="time"
                className="w-full px-3.5 py-2.5 pr-10 text-sm border border-[#e2e8f0] rounded-lg shadow-sm"
                id={`hora-${reporterId}-${despachoNum}`}
                value={hora}
                onChange={(e) => setHora(e.target.value)}
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748b] pointer-events-none">
                <FontAwesomeIcon icon={faClock} />
              </div>
            </div>
          </div>
          <div className="flex-1">
            <label className="block mb-2 text-sm font-medium text-[#475569]">
              En vivo:
            </label>
            <div className="relative">
              <input
                type="time"
                className="w-full px-3.5 py-2.5 pr-10 text-sm border border-[#e2e8f0] rounded-lg shadow-sm"
                id={`vivo-${reporterId}-${despachoNum}`}
                value={vivo}
                onChange={(e) => setVivo(e.target.value)}
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748b] pointer-events-none">
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