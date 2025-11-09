'use client'

import { useState } from 'react'

interface BulkKeyFormProps {
  apiUrl: string
  adminPassword: string
  onKeysCreated: (keys: string[]) => void
}

export default function BulkKeyForm({ apiUrl, adminPassword, onKeysCreated }: BulkKeyFormProps) {
  const [amount, setAmount] = useState<number>(1)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [generatedKeys, setGeneratedKeys] = useState<string[]>([])
  const [showResults, setShowResults] = useState(false)

  const handleGenerate = async (e: any) => {
    e.preventDefault()
    
    if (amount < 1 || amount > 100) {
      setError('Please enter a number between 1 and 100')
      return
    }

    setIsLoading(true)
    setError('')
    setGeneratedKeys([])
    const newKeys: string[] = []

    try {
      // Generate keys one by one
      for (let i = 0; i < amount; i++) {
        const response = await fetch(`/api/create?apiUrl=${encodeURIComponent(apiUrl)}&admin=${encodeURIComponent(adminPassword)}`)
        
        if (response.status === 403) {
          throw new Error('Invalid admin password')
        }
        
        if (!response.ok) {
          throw new Error(`Failed to create key ${i + 1}: ${response.status}`)
        }

        const result = await response.text()
        
        let newKey = ''
        if (result.includes('New key:')) {
          newKey = result.replace('New key:', '').trim()
        } else {
          newKey = result.trim()
        }
        
        if (newKey && newKey.length > 0) {
          newKeys.push(newKey)
          // Update incremental progress so UI shows count while generating
          setGeneratedKeys((prev) => [...prev, newKey])
        } else {
          throw new Error(`Invalid response for key ${i + 1}: ${result}`)
        }
      }
      // ensure state is consistent (in case of rapid finishes)
      setGeneratedKeys(newKeys)
      setShowResults(true)
      onKeysCreated(newKeys)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate keys')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDownloadKeys = () => {
    const content = generatedKeys.join('\n')
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `bulk-license-keys-${amount}-${Date.now()}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleCopyAll = async () => {
    try {
      await navigator.clipboard.writeText(generatedKeys.join('\n'))
      alert('All keys copied to clipboard!')
    } catch (err) {
      console.error('Failed to copy keys:', err)
      alert('Failed to copy keys to clipboard')
    }
  }

  const handleGenerateMore = () => {
    setShowResults(false)
    setGeneratedKeys([])
    setError('')
    setAmount(1)
  }

  if (showResults && generatedKeys.length > 0) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
            {generatedKeys.length} Keys Generated Successfully!
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Your bulk license keys have been generated. Download or copy them now.
          </p>
        </div>

        <div className="space-y-6">
          {/* Action Buttons */}
          <div className="flex justify-center space-x-4">
            <button
              onClick={handleDownloadKeys}
              className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              <span className="mr-2">⬇️</span>
              Download as .txt
            </button>
            
            <button
              onClick={handleCopyAll}
              className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <span className="mr-2">📋</span>
              Copy All Keys
            </button>
          </div>

          {/* Keys Display */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-3">Generated Keys:</h4>
            <div className="bg-white dark:bg-gray-700 rounded border dark:border-gray-700 p-4 max-h-96 overflow-y-auto">
              <div className="font-mono text-sm space-y-2">
                {generatedKeys.map((key, index) => (
                  <div key={index} className="flex items-center justify-between py-1 border-b border-gray-100 dark:border-gray-700 last:border-b-0">
                    <span className="text-gray-700 dark:text-gray-300">{index + 1}. {key}</span>
                    <button
                      onClick={() => navigator.clipboard.writeText(key)}
                      className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-200 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
                      title="Copy this key"
                    >
                      📋
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Generate More Button */}
          <div className="text-center pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={handleGenerateMore}
              className="px-6 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-100 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              Generate More Keys
            </button>
          </div>
        </div>

        <div className="mt-6 p-4 bg-yellow-50 rounded-md">
          <h4 className="text-sm font-medium text-yellow-800 mb-2">Important:</h4>
          <ul className="text-xs text-yellow-700 space-y-1">
            <li>• Save these keys securely - they won&apos;t be shown again in this format</li>
            <li>• Each key is independent and not bound to any HWID until first use</li>
            <li>• You can manage all these keys from the main dashboard</li>
            <li>• Consider organizing keys with a naming convention if needed</li>
          </ul>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
          Bulk Key Generation
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Generate multiple license keys at once for efficient distribution
        </p>
      </div>

      <form onSubmit={handleGenerate} className="space-y-4">
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
            Number of Keys to Generate
          </label>
          <input
            type="number"
            id="amount"
            min="1"
            max="100"
            value={amount}
            onChange={(e) => setAmount(parseInt(e.target.value) || 1)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Enter a number between 1 and 100
          </p>
        </div>

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
          {isLoading ? (
            <>
              <span className="mr-2">⏳</span>
              Generating Keys... ({generatedKeys.length}/{amount})
            </>
          ) : (
            <>
              <span className="mr-2">🔑</span>
              Generate {amount} Key{amount !== 1 ? 's' : ''}
            </>
          )}
        </button>
      </form>

      <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-md">
        <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">How it works:</h4>
        <ul className="text-xs text-gray-600 dark:text-gray-300 space-y-1">
          <li>• Keys are generated one by one to ensure uniqueness</li>
          <li>• All keys will be added to your GitHub repository</li>
          <li>• You can download all keys as a single .txt file</li>
          <li>• Each key is independent and ready for distribution</li>
        </ul>
      </div>
    </div>
  )
}
