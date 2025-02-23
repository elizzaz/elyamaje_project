import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Dashboard | Product Management',
  description: 'Manage your products efficiently',
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <Link 
            href="/dashboard" 
            className="text-lg font-semibold hover:text-muted-foreground transition-colors px-4 md:px-8"
          >
            Product Dashboard
          </Link>
        </div>
      </header>
      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex">
          <nav className="grid items-start gap-2">
            {/* Navigation items will go here */}
          </nav>
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  )
}
