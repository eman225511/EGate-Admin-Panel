"use client"

import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('egate-dark-mode')
    if (stored === 'true') {
      setDarkMode(true)
      document.documentElement.classList.add('dark')
    } else {
      setDarkMode(false)
      document.documentElement.classList.remove('dark')
    }
  }, [])

  const toggle = () => {
    const next = !darkMode
    setDarkMode(next)
    localStorage.setItem('egate-dark-mode', next ? 'true' : 'false')
    if (next) document.documentElement.classList.add('dark')
    else document.documentElement.classList.remove('dark')
  }

  return (
    <button
      onClick={toggle}
      className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 border border-gray-300 dark:border-gray-600 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
      aria-label="Toggle dark mode"
    >
      {darkMode ? '🌙 Dark' : '☀️ Light'}
    </button>
  )
}
