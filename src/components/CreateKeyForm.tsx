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
  const [createdKey, setCreatedKey] = useState('')
  const [copyFeedback, setCopyFeedback] = useState(false)

  const handleCreateKey = async (e: any) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setCreatedKey('')

    try {
      const response = await fetch(`/api/create?apiUrl=${encodeURIComponent(apiUrl)}&admin=${encodeURIComponent(adminPassword)}`)
      
      if (response.status === 403) {
        throw new Error('Invalid admin password')
      }
      
      if (!response.ok) {
        throw new Error(`Failed to create key: ${response.status}`)
      }

      const result = await response.text()
      
      let newKey = ''
      if (result.includes('New key:')) {
        newKey = result.replace('New key:', '').trim()
      } else if (result.includes('invalid admin password')) {
        throw new Error('Invalid admin password')
      } else {
        // The key might be returned directly
        newKey = result.trim()
      }
      
      if (newKey && newKey.length > 0) {
        setCreatedKey(newKey)
        onKeyCreated(newKey)
      } else {
        throw new Error('Unexpected response: ' + result)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create key')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCopyKey = async () => {
    try {
      await navigator.clipboard.writeText(createdKey)
      setCopyFeedback(true)
      setTimeout(() => setCopyFeedback(false), 2000)
    } catch (err) {
      console.error('Failed to copy key:', err)
    }
  }

  const handleDownloadKey = () => {
    const blob = new Blob([createdKey], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `license-key-${Date.now()}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleCreateAnother = () => {
    setCreatedKey('')
    setError('')
    setCopyFeedback(false)
  }

  // If key is created, show the key display screen
  if (createdKey) {
    return (
      <div className="max-w-md mx-auto">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Key Created Successfully!
          </h3>
          <p className="text-sm text-gray-600">
            Your new license key has been generated. Copy or download it now.
          </p>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              License Key:
            </label>
            <div className="font-mono text-sm bg-white p-3 rounded border break-all">
              {createdKey}
            </div>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={handleCopyKey}
              className={`flex-1 px-4 py-2 rounded-md transition-colors ${
                copyFeedback
                  ? 'bg-green-100 text-green-700 border border-green-200'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {copyFeedback ? (
                <>
                  <span className="mr-2">✓</span>
                  Copied!
                </>
              ) : (
                <>
                  <span className="mr-2">📋</span>
                  Copy
                </>
              )}
            </button>
            
            <button
              onClick={handleDownloadKey}
              className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              <span className="mr-2">⬇️</span>
              Download .txt
            </button>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <button
              onClick={handleCreateAnother}
              className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
            >
              Create Another Key
            </button>
          </div>
        </div>

        <div className="mt-6 p-4 bg-yellow-50 rounded-md">
          <h4 className="text-sm font-medium text-yellow-800 mb-2">Important:</h4>
          <ul className="text-xs text-yellow-700 space-y-1">
            <li>• Save this key securely - you won't see it again in this format</li>
            <li>• The key is not bound to any HWID until first use</li>
            <li>• You can manage this key from the main dashboard</li>
          </ul>
        </div>
      </div>
    )
  }

  // Show the creation form
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
          <li>• You can copy or download the key after creation</li>
        </ul>
      </div>
    </div>
  )
}
