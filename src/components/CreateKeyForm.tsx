'use client'

import { useState } from 'react'

interface CreateKeyFormProps {
  apiUrl: string
  adminPassword: string
  onKeyCreated: (key: string) => void
}

export default function CreateKeyForm({ apiUrl, adminPassword, onKeyCreated }: CreateKeyFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleCreateKey = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setSuccess('')

    try {
      const response = await fetch(`${apiUrl}/make?admin=${encodeURIComponent(adminPassword)}`)
      
      if (response.status === 403) {
        throw new Error('Invalid admin password')
      }
      
      if (!response.ok) {
        throw new Error(`Failed to create key: ${response.status}`)
      }

      const result = await response.text()
      
      if (result.includes('New key:')) {
        const newKey = result.replace('New key:', '').trim()
        setSuccess(`New key created: ${newKey}`)
        onKeyCreated(newKey)
      } else if (result.includes('invalid admin password')) {
        throw new Error('Invalid admin password')
      } else {
        // The key might be returned directly
        const key = result.trim()
        if (key && key.length > 0) {
          setSuccess(`New key created: ${key}`)
          onKeyCreated(key)
        } else {
          throw new Error('Unexpected response: ' + result)
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create key')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-6">
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Create New License Key
        </h3>
        <p className="text-sm text-gray-600">
          Generate a new random license key for your system
        </p>
      </div>

      <form onSubmit={handleCreateKey} className="space-y-4">
        {error && (
          <div className="p-3 text-sm text-red-800 bg-red-100 border border-red-200 rounded-md">
            {error}
          </div>
        )}

        {success && (
          <div className="p-3 text-sm text-green-800 bg-green-100 border border-green-200 rounded-md">
            <div className="flex items-center justify-between">
              <span>{success}</span>
              <button
                type="button"
                onClick={() => {
                  const key = success.split(': ')[1]
                  if (key) {
                    navigator.clipboard.writeText(key)
                  }
                }}
                className="ml-2 px-2 py-1 text-xs bg-green-200 text-green-800 rounded hover:bg-green-300"
              >
                Copy
              </button>
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Creating Key...' : 'Create New Key'}
        </button>
      </form>

      <div className="mt-6 p-4 bg-gray-50 rounded-md">
        <h4 className="text-sm font-medium text-gray-900 mb-2">How it works:</h4>
        <ul className="text-xs text-gray-600 space-y-1">
          <li>• A new random license key will be generated</li>
          <li>• The key will be added to your GitHub repository</li>
          <li>• Keys are not bound to any HWID until first use</li>
          <li>• You can manage the key immediately after creation</li>
        </ul>
      </div>
    </div>
  )
}
