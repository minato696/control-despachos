"use client"

import { useState } from 'react'
import Header from '../components/Header'
import DateNavigation from '../components/DateNavigation'
import Tabs from '../components/Tabs'
import MainContent from '../components/MainContent'
import Notification from '../components/Notification'
import { AppProvider, useAppContext } from '../components/AppContext'

// Componente interno que usa el contexto
const AppContent = () => {
  const { notification, setNotification } = useAppContext()

  return (
    <div className="min-h-screen bg-gray-light text-dark">
      <Header />
      
      <main className="py-6">
        <div className="container mx-auto px-4">
          <DateNavigation />
          
          <div className="bg-white rounded shadow hover:shadow-md transition-all overflow-hidden">
            <Tabs />
            <MainContent />
          </div>
        </div>
      </main>
      
      <Notification 
        show={notification.show}
        type={notification.type}
        title={notification.title}
        message={notification.message}
        onClose={() => setNotification({...notification, show: false})}
      />
    </div>
  )
}

// Componente principal que provee el contexto
export default function Home() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  )
}