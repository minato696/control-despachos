"use client"

import { Reportero } from '../components/AppContext'
import DespachoCard from './DespachoCard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

interface ReporterCardProps {
  reportero: Reportero
}

const ReporterCard: React.FC<ReporterCardProps> = ({ reportero }) => {
  return (
    <div className="border border-gray-light rounded shadow hover:shadow-md transition-all mb-6">
      <div className="p-4 bg-primary-light border-b border-primary-border flex items-center justify-between">
        <div className="flex items-center gap-3 text-primary-darker font-semibold">
          <FontAwesomeIcon icon={faUser} />
          {reportero.nombre}
        </div>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <DespachoCard reporterId={reportero.id} despachoNum={1} />
          <DespachoCard reporterId={reportero.id} despachoNum={2} />
          <DespachoCard reporterId={reportero.id} despachoNum={3} />
        </div>
      </div>
    </div>
  )
}

export default ReporterCard