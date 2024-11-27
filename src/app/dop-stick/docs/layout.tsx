'use client'

import { Suspense } from 'react'
import { Sidebar } from './components/sidebar'

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen" suppressHydrationWarning>
      <Suspense
        fallback={
          <div className="w-72 bg-zinc-100 dark:bg-zinc-900 fixed inset-y-0" />
        }
      >
        <Sidebar isOpen={false} setIsOpen={() => {}} />
      </Suspense>
      <div className="flex-1 ml-72">
        <main
          className="h-screen overflow-y-auto px-4 py-8 lg:px-8 lg:py-12"
          suppressHydrationWarning
        >
          <div className="max-w-4xl mx-auto">
            <Suspense
              fallback={
                <div className="animate-pulse space-y-4">
                  <div className="h-8 w-64 bg-zinc-200 dark:bg-zinc-800 rounded"></div>
                  <div className="h-4 w-96 bg-zinc-200 dark:bg-zinc-800 rounded"></div>
                </div>
              }
            >
              <div suppressHydrationWarning>{children}</div>
            </Suspense>
          </div>
        </main>
      </div>
    </div>
  )
}
