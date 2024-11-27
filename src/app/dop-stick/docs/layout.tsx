'use client'

import { Suspense } from 'react'
import { Sidebar } from './components/sidebar'

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen">
      <Suspense
        fallback={<div className="w-72 bg-zinc-100 dark:bg-zinc-900" />}
      >
        <Sidebar isOpen={false} setIsOpen={() => {}} />
      </Suspense>
      <main className="flex-1 px-4 py-8 lg:px-8 lg:py-12">
        <Suspense
          fallback={
            <div className="max-w-4xl mx-auto animate-pulse space-y-4">
              <div className="h-8 w-64 bg-zinc-200 dark:bg-zinc-800 rounded"></div>
              <div className="h-4 w-96 bg-zinc-200 dark:bg-zinc-800 rounded"></div>
            </div>
          }
        >
          {children}
        </Suspense>
      </main>
    </div>
  )
}
