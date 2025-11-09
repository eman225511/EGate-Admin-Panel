import './globals.css'

export const metadata = {
  title: 'EGate Admin Panel',
  description: 'Admin panel for managing EGate API license keys',
}


import ThemeToggle from '../components/ThemeToggle'

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en">
      <body className="font-sans">
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          <header className="bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center py-6">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">🔐 EGate Admin Panel</h1>
                <ThemeToggle />
              </div>
            </div>
          </header>
          <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
