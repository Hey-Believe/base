'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { CodeBlock } from '../components/doc-components'
import { useSearchParams } from 'next/navigation'
import { BookOpen, Settings, Box } from 'lucide-react'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export default function InstallationPage() {
  const searchParams = useSearchParams()
  const section = searchParams.get('section')

  useEffect(() => {
    if (section) {
      const element = document.getElementById(section)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }, [section])

  return (
    <main className="flex-1 min-w-0">
      <div className="max-w-4xl mx-auto px-4 py-6 lg:px-8 lg:py-8">
        <motion.article
          variants={container}
          initial="hidden"
          animate="show"
          className="prose dark:prose-invert max-w-none"
        >
          <motion.div variants={item} className="space-y-12">
            {/* Hero Section */}
            <div className="space-y-3 pb-6 border-b border-zinc-200 dark:border-zinc-800">
              <h1 className="text-3xl font-semibold tracking-tight">
                Quickstart & Installation
              </h1>
              <p className="text-lg text-zinc-600 dark:text-zinc-400">
                Get started with DopStick in minutes. Follow this guide to
                install and configure your environment.
              </p>
            </div>

            {/* Installation Section */}
            <section id="installation" className="space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight group flex items-center gap-3">
                <Box className="h-5 w-5 text-zinc-400" />
                Installation
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400">
                Install DopStick using npm:
              </p>
              <div className="not-prose">
                <CodeBlock filename="Terminal">
                  npm install @dopstick/core
                </CodeBlock>
              </div>
            </section>

            {/* Basic Setup Section */}
            <section id="setup" className="space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight group flex items-center gap-3">
                <BookOpen className="h-5 w-5 text-zinc-400" />
                Basic Setup
              </h2>
              <ol className="space-y-6 list-none pl-0">
                <li className="relative pl-7">
                  <div className="absolute left-0 top-1.5 w-5 h-5 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                    <span className="text-sm text-zinc-600 dark:text-zinc-400">
                      1
                    </span>
                  </div>
                  <p className="text-zinc-600 dark:text-zinc-400 mb-2">
                    Create a dopstick.config.ts file in your project root
                  </p>
                </li>
                <li className="relative pl-7">
                  <div className="absolute left-0 top-1.5 w-5 h-5 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                    <span className="text-sm text-zinc-600 dark:text-zinc-400">
                      2
                    </span>
                  </div>
                  <p className="text-zinc-600 dark:text-zinc-400 mb-2">
                    Set up environment variables in .env:
                  </p>
                  <div className="not-prose">
                    <CodeBlock filename=".env">
                      DIAMOND_ADDRESS=your_diamond_address
                      RPC_URL=your_network_rpc_url NETWORK=network_name
                    </CodeBlock>
                  </div>
                </li>
              </ol>
            </section>

            {/* Configuration Section */}
            <section id="configuration" className="space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight group flex items-center gap-3">
                <Settings className="h-5 w-5 text-zinc-400" />
                Minimal Configuration
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400">
                Create a basic configuration file with the following structure:
              </p>
              <div className="not-prose">
                <CodeBlock language="typescript" filename="dopstick.config.ts">
                  {`export default {
  paths: {
    upgrades: './upgrades',
    contracts: './contracts',
    artifacts: './artifacts'
  },
  compiler: {
    name: 'hardhat'
  }
};`}
                </CodeBlock>
              </div>
              <div className="mt-4 p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                <h3 className="text-sm font-medium mb-2">
                  This configuration sets up:
                </h3>
                <ul className="space-y-1.5 text-sm text-zinc-600 dark:text-zinc-400">
                  <li className="flex items-start gap-2">
                    <span className="text-zinc-400">•</span>
                    Standard directory paths for your project files
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-zinc-400">•</span>
                    Hardhat as the default compiler
                  </li>
                </ul>
              </div>
            </section>
          </motion.div>
        </motion.article>
      </div>
    </main>
  )
}
