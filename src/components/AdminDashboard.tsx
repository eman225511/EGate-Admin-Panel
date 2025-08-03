'use client'

import { useState, useEffect, useCallback } from 'react'
import KeysList from './KeysList'
import CreateKeyForm from './CreateKeyForm'

interface AdminDashboardProps {
  apiUrl: string
  adminPassword: string
  onLogout: () => void
}

interface LicenseKey {
  key: string
  hwid?: string
  created?: string
  lastReset?: string
}

export default function AdminDashboard({ apiUrl, adminPassword, onLogout }: AdminDashboardProps) {
  const [keys, setKeys] = useState<LicenseKey[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState<'keys' | 'create'>('keys')

  const loadKeys = useCallback(async () => {
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch(`/api/dump?apiUrl=${encodeURIComponent(apiUrl)}&admin=${encodeURIComponent(adminPassword)}`)
      
      if (response.status === 403) {
        throw new Error('Invalid admin password')
      }
      
      if (!response.ok) {
        throw new Error(`Failed to load keys: ${response.status}`)
      }

      const data = await response.json()
      
      // Convert the keys object to an array
      const keysArray = Object.entries(data.keys || data || {}).map(([key, info]: [string, any]) => ({
        key,
        hwid: info.hwid,
        created: info.created,
        lastReset: info.lastReset || info.last_reset
      }))

      setKeys(keysArray)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load keys')
    } finally {
      setIsLoading(false)
    }
  }, [apiUrl, adminPassword])

  useEffect(() => {
    loadKeys()
  }, [loadKeys])

  const handleKeyDeleted = (deletedKey: string) => {
    setKeys(keys.filter(k => k.key !== deletedKey))
  }

  const handleKeyCreated = (newKey: string) => {
    setKeys([...keys, { key: newKey, created: new Date().toISOString() }])
    setActiveTab('keys')
  }

  const handleKeyReset = (resetKey: string) => {
    setKeys(keys.map(k => 
      k.key === resetKey 
        ? { ...k, hwid: undefined, lastReset: new Date().toISOString() }
        : k
    ))
  }

  return (
    <div>
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              EGate Admin Dashboard
            </h2>
            <p className="text-sm text-gray-600">
              Connected to: {apiUrl}
            </p>
          </div>
          <button
            onClick={onLogout}
            className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Disconnect
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-lg shadow-sm border mb-6">
        <div className="border-b">
          <nav className="flex">
            <button
              onClick={() => setActiveTab('keys')}
              className={`px-6 py-3 text-sm font-medium border-b-2 ${
                activeTab === 'keys'
                  ? 'text-blue-600 border-blue-600'
                  : 'text-gray-500 border-transparent hover:text-gray-700'
              }`}
            >
              License Keys ({keys.length})
            </button>
            <button
              onClick={() => setActiveTab('create')}
              className={`px-6 py-3 text-sm font-medium border-b-2 ${
                activeTab === 'create'
                  ? 'text-blue-600 border-blue-600'
                  : 'text-gray-500 border-transparent hover:text-gray-700'
              }`}
            >
              Create New Key
            </button>
          </nav>
        </div>

        <div className="p-6">
          {error && (
            <div className="mb-4 p-3 text-sm text-red-800 bg-red-100 border border-red-200 rounded-md">
              {error}
            </div>
          )}

          {activeTab === 'keys' && (
            <KeysList
              keys={keys}
              apiUrl={apiUrl}
              adminPassword={adminPassword}
              isLoading={isLoading}
              onRefresh={loadKeys}
              onKeyDeleted={handleKeyDeleted}
              onKeyReset={handleKeyReset}
            />
          )}

          {activeTab === 'create' && (
            <CreateKeyForm
              apiUrl={apiUrl}
              adminPassword={adminPassword}
              onKeyCreated={handleKeyCreated}
            />
          )}
        </div>
      </div>
    </div>
  )
}
