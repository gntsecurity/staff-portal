import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'GNT Staff Portal',
  description: 'Internal staff operations portal',
  icons: {
    icon: '/favicon.ico'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen flex">

          <aside className="w-64 bg-gray-900 text-white p-6">
            <div className="flex items-center gap-3 mb-8">
              <img src="/logo.png" className="h-10 w-auto" />
              <span className="font-semibold text-lg">
                GNT Security
              </span>
            </div>

            <nav className="space-y-3">
              <a href="/dashboard" className="block hover:text-blue-400">
                Dashboard
              </a>

              <a href="/alerts" className="block hover:text-blue-400">
                Alerts
              </a>

              <a href="/devices" className="block hover:text-blue-400">
                Devices
              </a>
            </nav>
          </aside>

          <main className="flex-1 bg-gray-50">
            {children}
          </main>

        </div>
      </body>
    </html>
  )
}