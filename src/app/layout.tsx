import './globals.css'

export const metadata = {
  title: 'EGate Admin Panel',
  description: 'Admin panel for managing EGate API license keys',
}


import { useEffect, useState } from 'react';

export default function RootLayout({ children }: { children: any }) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // On mount, check localStorage
    const stored = localStorage.getItem('egate-dark-mode');
    if (stored === 'true') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const next = !prev;
      localStorage.setItem('egate-dark-mode', next ? 'true' : 'false');
      if (next) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return next;
    });
  };

  return (
    <html lang="en">
      <body className="font-sans">
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          <header className="bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center py-6">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">🔐 EGate Admin Panel</h1>
                <button
                  onClick={toggleDarkMode}
                  className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 border border-gray-300 dark:border-gray-600 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                  aria-label="Toggle dark mode"
                >
                  {darkMode ? '🌙 Dark' : '☀️ Light'}
                </button>
              </div>
            </div>
          </header>
          <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
