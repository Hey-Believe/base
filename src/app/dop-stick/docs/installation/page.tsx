'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { CodeBlock } from '../components/doc-components'

function InstallationContent() {
  const searchParams = useSearchParams()
  const section = searchParams.get('section')

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-12"
    >
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
          Installation
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400">
          Get started with Dop-Stick in your project
        </p>
      </div>

      {/* Installation content */}
      <div id="installation" className="space-y-6">
        {/* ... your installation content ... */}
      </div>

      {/* Setup content */}
      <div id="setup" className="space-y-6">
        {/* ... your setup content ... */}
      </div>

      {/* Configuration content */}
      <div id="configuration" className="space-y-6">
        {/* ... your configuration content ... */}
      </div>
    </motion.div>
  )
}

export default function InstallationPage() {
  return (
    <Suspense
      fallback={
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-64 bg-zinc-200 dark:bg-zinc-800 rounded"></div>
          <div className="h-4 w-96 bg-zinc-200 dark:bg-zinc-800 rounded"></div>
          <div className="space-y-2">
            <div className="h-4 w-full bg-zinc-200 dark:bg-zinc-800 rounded"></div>
            <div className="h-4 w-3/4 bg-zinc-200 dark:bg-zinc-800 rounded"></div>
          </div>
        </div>
      }
    >
      <InstallationContent />
    </Suspense>
  )
}
