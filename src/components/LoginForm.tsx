'use client'

import { useState } from 'react'

interface LoginFormProps {
  onLogin: (url: string, password: string) => void
}

export default function LoginForm({ onLogin }: LoginFormProps) {
  const [apiUrl, setApiUrl] = useState('')
  const [adminPassword, setAdminPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      // Test the ping endpoint first through our proxy
      const response = await fetch(`/api/ping?apiUrl=${encodeURIComponent(apiUrl)}&admin=${encodeURIComponent(adminPassword)}`)
      
      if (!response.ok) {
        throw new Error(`API ping failed: ${response.status}`)
      }

      const pingData = await response.text()
      
      if (!pingData.includes('pong') && !pingData.includes('ok')) {
        throw new Error('API ping returned invalid status')
      }

      // If ping successful, proceed with login
      onLogin(apiUrl, adminPassword)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to connect to API')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-16">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center">
          Connect to EGate API
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="apiUrl" className="block text-sm font-medium text-gray-700 mb-1">
              API URL
            </label>
            <input
              type="url"
              id="apiUrl"
              value={apiUrl}
              onChange={(e) => setApiUrl(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="https://your-api.vercel.app/api"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Your EGate API base URL (without trailing slash)
            </p>
          </div>

          <div>
            <label htmlFor="adminPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Admin Password
            </label>
            <input
              type="password"
              id="adminPassword"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your admin password"
              required
            />
          </div>

          {error && (
            <div className="p-3 text-sm text-red-800 bg-red-100 border border-red-200 rounded-md">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Connecting...' : 'Connect'}
          </button>
        </form>

        <div className="mt-4 p-3 bg-gray-50 rounded-md">
          <p className="text-xs text-gray-600">
            This panel will test the connection using the <code>/ping</code> endpoint
            and then load all keys using the <code>/dump</code> endpoint.
          </p>
        </div>
      </div>
    </div>
  )
}
