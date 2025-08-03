'use client'

import { useState } from 'react'
import LoginForm from '@/components/LoginForm'
import AdminDashboard from '@/components/AdminDashboard'

export default function Home() {
  const [apiConfig, setApiConfig] = useState<{
    url: string
    password: string
  } | null>(null)

  const handleLogin = (url: string, password: string) => {
    setApiConfig({ url, password })
  }

  const handleLogout = () => {
    setApiConfig(null)
  }

  return (
    <div className="px-4">
      {!apiConfig ? (
        <LoginForm onLogin={handleLogin} />
      ) : (
        <AdminDashboard 
          apiUrl={apiConfig.url}
          adminPassword={apiConfig.password}
          onLogout={handleLogout}
        />
      )}
    </div>
  )
}
