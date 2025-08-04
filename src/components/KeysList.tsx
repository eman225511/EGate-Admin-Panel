'use client'

import { useState } from 'react'

interface LicenseKey {
  key: string
  hwid?: string
  created?: string
  lastReset?: string
}

interface KeysListProps {
  keys: LicenseKey[]
  apiUrl: string
  adminPassword: string
  isLoading: boolean
  onRefresh: () => void
  onKeyDeleted: (key: string) => void
  onKeyReset: (key: string) => void
}

export default function KeysList({ 
  keys, 
  apiUrl, 
  adminPassword, 
  isLoading, 
  onRefresh, 
  onKeyDeleted,
  onKeyReset
}: KeysListProps) {
  const [selectedKey, setSelectedKey] = useState<string | null>(null)
  const [keyInfo, setKeyInfo] = useState<any>(null)
  const [actionLoading, setActionLoading] = useState<string | null>(null)
  const [actionError, setActionError] = useState('')
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null)

  const handleCopyKey = async (key: string, event: any) => {
    event.stopPropagation() // Prevent triggering the key info click
    try {
      await navigator.clipboard.writeText(key)
      setCopyFeedback(key)
      setTimeout(() => setCopyFeedback(null), 2000)
    } catch (err) {
      console.error('Failed to copy key:', err)
    }
  }

  const handleGetKeyInfo = async (key: string) => {
    setActionLoading(`info-${key}`)
    setActionError('')

    try {
      const response = await fetch(`/api/info?apiUrl=${encodeURIComponent(apiUrl)}&key=${encodeURIComponent(key)}&admin=${encodeURIComponent(adminPassword)}`)
      
      if (!response.ok) {
        throw new Error(`Failed to get key info: ${response.status}`)
      }

      const text = await response.text()
      
      try {
        const data = JSON.parse(text)
        setKeyInfo({ key, ...data })
        setSelectedKey(key)
      } catch {
        setKeyInfo({ key, info: text })
        setSelectedKey(key)
      }
    } catch (err) {
      setActionError(err instanceof Error ? err.message : 'Failed to get key info')
    } finally {
      setActionLoading(null)
    }
  }

  const handleDeleteKey = async (key: string) => {
    if (!confirm(`Are you sure you want to delete the key: ${key}?`)) {
      return
    }

    setActionLoading(`delete-${key}`)
    setActionError('')

    try {
      const response = await fetch(`/api/delete?apiUrl=${encodeURIComponent(apiUrl)}&key=${encodeURIComponent(key)}&admin=${encodeURIComponent(adminPassword)}`)
      
      if (!response.ok) {
        throw new Error(`Failed to delete key: ${response.status}`)
      }

      const result = await response.text()
      
      if (result.includes('Key deleted')) {
        onKeyDeleted(key)
        if (selectedKey === key) {
          setSelectedKey(null)
          setKeyInfo(null)
        }
      } else {
        throw new Error(result)
      }
    } catch (err) {
      setActionError(err instanceof Error ? err.message : 'Failed to delete key')
    } finally {
      setActionLoading(null)
    }
  }

  const handleResetKey = async (key: string) => {
    if (!confirm(`Are you sure you want to reset the HWID for key: ${key}?`)) {
      return
    }

    setActionLoading(`reset-${key}`)
    setActionError('')

    try {
      const response = await fetch(`/api/reset?apiUrl=${encodeURIComponent(apiUrl)}&key=${encodeURIComponent(key)}&admin=${encodeURIComponent(adminPassword)}`)
      
      if (!response.ok) {
        throw new Error(`Failed to reset key: ${response.status}`)
      }

      const result = await response.text()
      
      if (result.includes('admin hwid reset successful')) {
        onKeyReset(key)
        if (selectedKey === key) {
          setKeyInfo(null)
          handleGetKeyInfo(key) // Refresh the key info
        }
      } else {
        throw new Error(result)
      }
    } catch (err) {
      setActionError(err instanceof Error ? err.message : 'Failed to reset key')
    } finally {
      setActionLoading(null)
    }
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Never'
    try {
      return new Date(dateString).toLocaleString()
    } catch {
      return dateString
    }
  }

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-2 text-gray-600">Loading keys...</p>
      </div>
    )
  }

  if (keys.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600 mb-4">No license keys found</p>
        <button
          onClick={onRefresh}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Refresh
        </button>
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-900">
          License Keys ({keys.length})
        </h3>
        <button
          onClick={onRefresh}
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          Refresh
        </button>
      </div>

      {actionError && (
        <div className="mb-4 p-3 text-sm text-red-800 bg-red-100 border border-red-200 rounded-md">
          {actionError}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Keys List */}
        <div className="space-y-3">
          {keys.map((keyObj) => (
            <div
              key={keyObj.key}
              className={`p-4 border rounded-lg cursor-pointer hover:border-gray-300 transition-colors ${
                selectedKey === keyObj.key ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
              }`}
              onClick={() => handleGetKeyInfo(keyObj.key)}
            >
              <div className="mb-2 flex justify-between items-start">
                <h4 className="font-mono text-sm font-medium text-gray-900 break-all flex-1 pr-2">
                  {keyObj.key}
                </h4>
                <button
                  onClick={(e) => handleCopyKey(keyObj.key, e)}
                  className={`px-2 py-1 text-xs rounded transition-colors flex-shrink-0 ${
                    copyFeedback === keyObj.key 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  title="Copy key to clipboard"
                >
                  {copyFeedback === keyObj.key ? '✓' : '📋'}
                </button>
              </div>
              
              <div className="text-xs text-gray-600 space-y-1">
                <div>HWID: {keyObj.hwid || 'Not bound'}</div>
                <div>Created: {formatDate(keyObj.created)}</div>
                {keyObj.lastReset && (
                  <div>Last Reset: {formatDate(keyObj.lastReset)}</div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Key Details */}
        <div className="lg:sticky lg:top-4">
          {selectedKey && keyInfo ? (
            <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-medium text-gray-900">Key Details</h4>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleResetKey(selectedKey)}
                    disabled={actionLoading === `reset-${selectedKey}`}
                    className="px-3 py-1 text-xs bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200 disabled:opacity-50"
                  >
                    {actionLoading === `reset-${selectedKey}` ? '...' : 'Reset'}
                  </button>
                  <button
                    onClick={() => handleDeleteKey(selectedKey)}
                    disabled={actionLoading === `delete-${selectedKey}`}
                    className="px-3 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200 disabled:opacity-50"
                  >
                    {actionLoading === `delete-${selectedKey}` ? '...' : 'Delete'}
                  </button>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Key:</span>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className="font-mono bg-white p-2 rounded border text-xs break-all flex-1">
                      {keyInfo.key}
                    </div>
                    <button
                      onClick={() => handleCopyKey(keyInfo.key, { stopPropagation: () => {} })}
                      className={`px-2 py-1 text-xs rounded transition-colors flex-shrink-0 ${
                        copyFeedback === keyInfo.key 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                      title="Copy key to clipboard"
                    >
                      {copyFeedback === keyInfo.key ? '✓' : '📋'}
                    </button>
                  </div>
                </div>
                
                {keyInfo.hwid && (
                  <div>
                    <span className="font-medium text-gray-700">HWID:</span>
                    <div className="font-mono bg-white p-2 rounded border text-xs break-all mt-1">
                      {keyInfo.hwid}
                    </div>
                  </div>
                )}
                
                {keyInfo.created && (
                  <div>
                    <span className="font-medium text-gray-700">Created:</span>
                    <div className="text-gray-600 mt-1">{formatDate(keyInfo.created)}</div>
                  </div>
                )}
                
                {keyInfo.lastReset && (
                  <div>
                    <span className="font-medium text-gray-700">Last Reset:</span>
                    <div className="text-gray-600 mt-1">{formatDate(keyInfo.lastReset)}</div>
                  </div>
                )}
                
                {keyInfo.info && typeof keyInfo.info === 'string' && (
                  <div>
                    <span className="font-medium text-gray-700">Raw Response:</span>
                    <div className="bg-white p-2 rounded border text-xs mt-1">
                      {keyInfo.info}
                    </div>
                  </div>
                )}
              </div>
              
              <button
                onClick={() => {
                  setSelectedKey(null)
                  setKeyInfo(null)
                }}
                className="mt-3 text-sm text-gray-500 hover:text-gray-700"
              >
                Close Details
              </button>
            </div>
          ) : (
            <div className="p-4 border border-gray-200 rounded-lg bg-gray-50 text-center text-gray-500">
              Click on a key to view details and actions
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
