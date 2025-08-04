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
  const [showHelp, setShowHelp] = useState(false)

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
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Connect to EGate API
          </h2>
          <button
            type="button"
            onClick={() => setShowHelp(true)}
            className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
            title="Help"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </div>
        
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

      {/* Help Modal */}
      {showHelp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h3 className="text-lg font-semibold text-gray-900">
                Setting Up EGate API
              </h3>
              <button
                onClick={() => setShowHelp(false)}
                className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">What is EGate API?</h4>
                <p className="text-gray-700 text-sm">
                  EGate is a GitHub-based license key management system that stores and manages license keys 
                  directly in your GitHub repository. This admin panel connects to your EGate API to manage those keys.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">How to Set Up EGate API:</h4>
                <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
                  <li>Visit the EGate repository on GitHub</li>
                  <li>Fork or clone the repository to your own GitHub account</li>
                  <li>Deploy the API to Vercel, Netlify, or your preferred hosting platform</li>
                  <li>Configure your GitHub repository settings and admin password</li>
                  <li>Use your deployed API URL in this admin panel</li>
                </ol>
              </div>

              <div className="bg-blue-50 p-4 rounded-md">
                <h4 className="font-semibold text-blue-900 mb-2">📚 EGate Repository</h4>
                <p className="text-blue-800 text-sm mb-3">
                  Get the complete EGate API source code and setup instructions:
                </p>
                <a
                  href="https://github.com/eman225511/EGate"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
                >
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  View EGate on GitHub
                </a>
              </div>

              <div className="bg-yellow-50 p-4 rounded-md">
                <h4 className="font-semibold text-yellow-900 mb-2">⚡ Quick Start</h4>
                <p className="text-yellow-800 text-sm">
                  Once you have EGate deployed, your API URL will typically look like:
                </p>
                <code className="block mt-2 p-2 bg-yellow-100 text-yellow-900 rounded text-xs">
                  https://your-egate-api.vercel.app/api
                </code>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
