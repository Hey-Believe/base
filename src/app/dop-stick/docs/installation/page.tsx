'use client'

import { Suspense, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { CodeBlock } from '../components/doc-components'
import { BookOpen, Settings, Box } from 'lucide-react'
import { cn } from '@/lib/utils'

type PackageManager = 'npm' | 'yarn' | 'pnpm'

function InstallationContent() {
  const searchParams = useSearchParams()
  const section = searchParams.get('section')
  const [packageManager, setPackageManager] = useState<PackageManager>('npm')

  const getInstallCommand = (pm: PackageManager) => {
    switch (pm) {
      case 'yarn':
        return 'yarn add dop-stick'
      case 'pnpm':
        return 'pnpm install dop-stick'
      default:
        return 'npm install dop-stick'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-12"
    >
      {/* Hero Section */}
      <div className="space-y-3 pb-6 border-b border-zinc-200 dark:border-zinc-800">
        <h1 className="text-3xl font-semibold tracking-tight">
          Quickstart & Installation
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400">
          Get started with DopStick in minutes. Follow this guide to install and
          configure your environment.
        </p>
      </div>

      {/* Installation Section */}
      <section id="installation" className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight group flex items-center gap-3">
          <Box className="h-5 w-5 text-zinc-400" />
          Installation
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400">
          Install DopStick using your preferred package manager:
        </p>
        <div className="not-prose space-y-4">
          <div className="flex space-x-1 bg-zinc-100 dark:bg-zinc-800/50 rounded-lg p-1 w-fit">
            {(['npm', 'yarn', 'pnpm'] as const).map((pm) => (
              <button
                key={pm}
                onClick={() => setPackageManager(pm)}
                className={cn(
                  'px-3 py-1 text-sm font-medium rounded-md transition-colors duration-200',
                  packageManager === pm
                    ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-sm'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100',
                )}
              >
                {pm}
              </button>
            ))}
          </div>
          <CodeBlock filename="Terminal">
            {getInstallCommand(packageManager)}
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
              Create a dopstick.config.json file in your project root
            </p>
          </li>
          <li className="relative pl-7">
            <div className="absolute left-0 top-1.5 w-5 h-5 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
              <span className="text-sm text-zinc-600 dark:text-zinc-400">
                2
              </span>
            </div>
            <p className="text-zinc-600 dark:text-zinc-400 mb-2">
              Set up required environment variables in .env:
            </p>
            <div className="mt-4 p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
              <ul className="space-y-1.5 text-sm text-zinc-600 dark:text-zinc-400">
                <li className="flex items-start gap-2">
                  <span className="text-zinc-400">•</span>
                  <code className="text-pink-500 dark:text-pink-400">
                    DIAMOND_ADDRESS
                  </code>
                  : Your diamond contract address
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-zinc-400">•</span>
                  <code className="text-pink-500 dark:text-pink-400">
                    PRIVATE_KEY
                  </code>
                  : Your wallet private key
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-zinc-400">•</span>
                  <code className="text-pink-500 dark:text-pink-400">
                    RPC_URL
                  </code>
                  : Network RPC endpoint
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-zinc-400">•</span>
                  <code className="text-pink-500 dark:text-pink-400">
                    NETWORK
                  </code>
                  : Target network name
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-zinc-400">•</span>
                  <code className="text-pink-500 dark:text-pink-400">
                    DIAMOND_OWNER
                  </code>
                  : Diamond contract owner address
                </li>
              </ul>
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
          <CodeBlock language="json" filename="dopstick.config.json">
            {`{
  "compiler": {
    "name": "hardhat"
  },
  "mode": "copilot-beta",
  "paths": {
    "upgrades": "./upgrade.json",
    "typechain": "./typechain-types"
  }
}`}
          </CodeBlock>
        </div>
        <div className="mt-4 p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
          <h3 className="text-sm font-medium mb-2">
            This configuration sets up:
          </h3>
          <ul className="space-y-1.5 text-sm text-zinc-600 dark:text-zinc-400">
            <li className="flex items-start gap-2">
              <span className="text-zinc-400">•</span>
              Hardhat as the default compiler
            </li>
            <li className="flex items-start gap-2">
              <span className="text-zinc-400">•</span>
              Copilot beta mode for enhanced features
            </li>
            <li className="flex items-start gap-2">
              <span className="text-zinc-400">•</span>
              Custom paths for upgrades and TypeChain types
            </li>
          </ul>
        </div>
      </section>
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
