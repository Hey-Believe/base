'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ThemeToggle } from '@/components/dop-stick/theme-toggle'
import { BackgroundAnimation } from '@/components/dop-stick/home-background-animation'
import { motion } from 'framer-motion'
import { ScrambleText } from '@/components/dop-stick/scramble-text'
import { BlinkingCursor } from '@/components/dop-stick/blinking-cursor'
import { Package, Copy } from 'lucide-react'
import { useState } from 'react'

type PackageManager = 'pnpm' | 'npm' | 'yarn'

function CodeBlock({
  command,
  packageManager,
}: {
  command: string
  packageManager: PackageManager
}) {
  const [copied, setCopied] = useState(false)

  const getFormattedCommand = () => {
    if (command.includes('install')) {
      // For installation commands, use 'add' for yarn
      return packageManager === 'yarn'
        ? command.replace('install', 'add').replace('pnpm', packageManager)
        : command.replace('pnpm', packageManager)
    }
    // For other commands, just replace the package manager
    return command.replace('pnpm', packageManager)
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(getFormattedCommand())
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <div className="relative group">
      <code
        className="block w-full bg-black/5 dark:bg-white/5 px-4 py-3 rounded-lg font-mono 
                   border border-black/5 dark:border-white/5 
                   transition-colors duration-200 hover:border-black/10 
                   dark:hover:border-white/10 flex justify-between items-center"
      >
        <span>{getFormattedCommand()}</span>
        <button
          onClick={copyToClipboard}
          className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 
                     hover:text-foreground text-muted-foreground relative ml-4"
          aria-label="Copy to clipboard"
        >
          <Copy className="h-4 w-4" />
          {copied && (
            <span
              className="absolute -top-8 -left-2 bg-black dark:bg-white text-white dark:text-black 
                           text-xs py-1 px-2 rounded opacity-0 transition-opacity duration-200 opacity-100"
            >
              Copied!
            </span>
          )}
        </button>
      </code>
    </div>
  )
}

export default function Page() {
  const [packageManager, setPackageManager] = useState<PackageManager>('pnpm')

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white font-mono transition-colors duration-300 flex items-center justify-center relative">
      <BackgroundAnimation />
      <div className="container mx-auto px-4 py-8 relative z-10">
        <motion.div
          className="max-w-6xl mx-auto border border-black dark:border-white bg-white dark:bg-black"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left Column */}
            <div className="border-b md:border-b-0 md:border-r border-black dark:border-white p-8">
              <div className="space-y-8">
                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <div className="flex justify-between items-start gap-6 mb-6">
                    <h1 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight max-w-[500px]">
                      Now, Everyone Can Make Diamonds
                    </h1>
                    <div className="flex-shrink-0">
                      <ThemeToggle />
                    </div>
                  </div>
                  <div className="space-y-1 mt-4">
                    <p className="text-sm">
                      <span className="text-muted-foreground">latest: </span>
                      <span className="text-foreground">dop-stick0.0.3</span>
                    </p>
                    <p className="text-sm">
                      <span className="text-muted-foreground">released: </span>
                      <span className="text-foreground">
                        Tuesday, 26 November 2024.
                      </span>
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="flex gap-4"
                >
                  <Link
                    href="/dop-stick/explore"
                    className="inline-block border border-black dark:border-white px-6 py-2 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
                  >
                    <ScrambleText text="EXPLORE" scrambleOnHover={true} />
                  </Link>
                  <Link
                    href="/dop-stick/visualize"
                    className="inline-block border border-black dark:border-white px-6 py-2 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
                  >
                    <ScrambleText text="VISUALIZE" scrambleOnHover={true} />
                  </Link>
                </motion.div>

                <motion.div
                  className="space-y-4 pt-8 border-t border-black dark:border-white"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  <p className="text-sm">created by</p>
                  <div className="flex items-center">
                    <span className="text-2xl font-bold tracking-tight font-mono transform hover:scale-105 transition-transform duration-200">
                      Hey Believe!
                    </span>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Right Column */}
            <div className="p-8 space-y-6">
              <motion.div
                className="space-y-6 text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <p className="text-muted-foreground leading-relaxed">
                  Upgradable smart contracts should be simple to work with, easy
                  to deploy, seamless to upgrade, and clear to introspect;
                  hence, <span className="font-bold">Dop-Stick</span>.
                </p>

                <div className="flex items-center gap-2 text-sm">
                  <Package className="h-4 w-4 text-muted-foreground" />
                  <select
                    value={packageManager}
                    onChange={(e) =>
                      setPackageManager(e.target.value as PackageManager)
                    }
                    className="bg-transparent border-none text-muted-foreground hover:text-foreground 
                             transition-colors duration-200 cursor-pointer focus:outline-none"
                  >
                    <option value="pnpm">pnpm</option>
                    <option value="npm">npm</option>
                    <option value="yarn">yarn</option>
                  </select>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">
                      Installation
                    </p>
                    <CodeBlock
                      command="pnpm install dop-stick"
                      packageManager={packageManager}
                    />
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">
                      New diamond deployment
                    </p>
                    <CodeBlock
                      command="pnpm dop-stick mine"
                      packageManager={packageManager}
                    />
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">
                      Diamond upgrade
                    </p>
                    <CodeBlock
                      command="pnpm dop-stick upgrade"
                      packageManager={packageManager}
                    />
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">
                      Diamond introspection
                    </p>
                    <CodeBlock
                      command="pnpm dop-stick info --docs"
                      packageManager={packageManager}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Link
                    href="/dop-stick/docs"
                    className="inline-block text-sm hover:underline text-muted-foreground 
                             hover:text-foreground transition-colors duration-200"
                  >
                    See full documentation →
                  </Link>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    Happy Mining! 💎
                    <BlinkingCursor className="h-4" />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
