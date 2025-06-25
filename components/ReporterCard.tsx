"use client"

import { Reportero } from './AppContext'
import DespachoCard from './DespachoCard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

interface ReporterCardProps {
  reportero: Reportero
}

const ReporterCard: React.FC<ReporterCardProps> = ({ reportero }) => {
  return (
    <div className="reporter-card">
      <div className="reporter-header">
        <div className="reporter-name">
          <FontAwesomeIcon icon={faUser} />
          {reportero.nombre}
        </div>
      </div>
      <div className="reporter-body">
        <div className="despacho-grid">
          <DespachoCard reporterId={reportero.id} despachoNum={1} />
          <DespachoCard reporterId={reportero.id} despachoNum={2} />
          <DespachoCard reporterId={reportero.id} despachoNum={3} />
        </div>
      </div>
    </div>
  )
}

export default ReporterCard