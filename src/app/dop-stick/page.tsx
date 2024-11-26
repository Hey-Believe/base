'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ThemeToggle } from '@/components/dop-stick/theme-toggle'
import { BackgroundAnimation } from '@/components/dop-stick/home-background-animation'
import { motion } from 'framer-motion'
import { ScrambleText } from '@/components/dop-stick/scramble-text'
import { BlinkingCursor } from '@/components/dop-stick/blinking-cursor'
import { Package } from 'lucide-react'

export default function Page() {
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
                  Upgradable smart contracts should be easy to work with, easy
                  to deploy, upgrade and introspect; hence dop-stick
                </p>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">
                      Installation
                    </p>
                    <code
                      className="block bg-black/5 dark:bg-white/5 px-4 py-3 rounded-lg font-mono 
                                   border border-black/5 dark:border-white/5 
                                   transition-colors duration-200 hover:border-black/10 
                                   dark:hover:border-white/10"
                    >
                      pnpm install dop-stick
                    </code>
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">
                      New diamond deployment
                    </p>
                    <code
                      className="block bg-black/5 dark:bg-white/5 px-4 py-3 rounded-lg font-mono 
                                   border border-black/5 dark:border-white/5 
                                   transition-colors duration-200 hover:border-black/10 
                                   dark:hover:border-white/10"
                    >
                      pnpm dop-stick mine
                    </code>
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">
                      Diamond upgrade
                    </p>
                    <code
                      className="block bg-black/5 dark:bg-white/5 px-4 py-3 rounded-lg font-mono 
                                   border border-black/5 dark:border-white/5 
                                   transition-colors duration-200 hover:border-black/10 
                                   dark:hover:border-white/10"
                    >
                      pnpm dop-stick upgrade
                    </code>
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">
                      Diamond introspection
                    </p>
                    <code
                      className="block bg-black/5 dark:bg-white/5 px-4 py-3 rounded-lg font-mono 
                                   border border-black/5 dark:border-white/5 
                                   transition-colors duration-200 hover:border-black/10 
                                   dark:hover:border-white/10"
                    >
                      pnpm dop-stick info --docs
                    </code>
                  </div>
                </div>

                <Link
                  href="/docs"
                  className="inline-block text-sm hover:underline mt-4 text-muted-foreground 
                           hover:text-foreground transition-colors duration-200"
                >
                  See full documentation →
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
