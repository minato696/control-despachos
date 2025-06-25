import { Reportero } from './AppContext'
import DespachoCard from './DespachoCard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

interface ReporterCardProps {
  reportero: Reportero
}

const ReporterCard: React.FC<ReporterCardProps> = ({ reportero }) => {
  return (
    <div className="border border-[#e2e8f0] rounded-lg mb-6 overflow-hidden bg-white shadow hover:shadow-md transition-all">
      <div className="p-4 bg-[#e0f2fe] border-b border-[#bfdbfe] font-semibold flex items-center justify-between">
        <div className="flex items-center gap-3 text-[#1a365d]">
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