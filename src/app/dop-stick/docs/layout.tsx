'use client'

import { useState } from 'react'
import { Package, Menu } from 'lucide-react'
import Link from 'next/link'
import { Sidebar } from './components/sidebar'

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Mobile header */}
      <header
        className="lg:hidden fixed top-0 left-0 right-0 z-40 
                        bg-white/80 dark:bg-black/80 backdrop-blur-xl
                        border-b border-zinc-200 dark:border-zinc-800"
      >
        <div className="flex items-center justify-between p-4">
          <Link href="/dop-stick" className="flex items-center gap-2">
            <Package className="h-6 w-6" />
            <span className="font-semibold text-lg">DopStick</span>
          </Link>
          <button
            onClick={() => setIsOpen(true)}
            className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </header>

      <div className="flex h-screen lg:h-screen pt-[73px] lg:pt-0">
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

        <div className="flex-1 min-w-0 h-full overflow-y-auto">{children}</div>
      </div>
    </div>
  )
}
