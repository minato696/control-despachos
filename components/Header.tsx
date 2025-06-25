"use client"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBroadcastTower } from '@fortawesome/free-solid-svg-icons'

const Header = () => {
  return (
    <header className="bg-primary text-white py-3 shadow sticky top-0 z-10">
      <div className="container">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FontAwesomeIcon icon={faBroadcastTower} className="text-xl" />
            <h1 className="font-semibold text-xl m-0">Sistema de Control de Despachos</h1>
          </div>
          <div className="flex items-center gap-3 px-4 py-2 bg-white bg-opacity-10 rounded-full cursor-pointer transition-all hover:bg-opacity-20">
            <div className="w-9 h-9 rounded-full bg-[#4d8dd9] text-white flex items-center justify-center font-bold border-2 border-white border-opacity-50">
              A
            </div>
            <div>Admin</div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header