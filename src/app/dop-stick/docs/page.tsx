'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, BookOpen, Terminal } from 'lucide-react'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export default function DocsPage() {
  return (
    <main className="flex-1 min-w-0">
      <div className="max-w-4xl mx-auto px-4 py-8 lg:px-8 lg:py-12">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-16"
        >
          {/* Hero Section */}
          <motion.section variants={item}>
            <h1 className="text-4xl font-bold tracking-tight mb-4">
              Documentation
            </h1>
            <p className="text-xl text-zinc-600 dark:text-zinc-400">
              Learn how to use DopStick to manage and deploy your diamond
              contracts efficiently.
            </p>
          </motion.section>

          {/* Quick Links */}
          <motion.section variants={item} className="space-y-6">
            <h2 className="text-2xl font-semibold">Quick Access</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  title: 'Getting Started',
                  description: 'Get up and running with DopStick in minutes',
                  href: '/dop-stick/docs/installation',
                  icon: BookOpen,
                },
                {
                  title: 'Commands',
                  description: 'Explore the core commands and their usage',
                  href: '/dop-stick/docs/commands/mine',
                  icon: Terminal,
                },
              ].map((card, i) => (
                <Link
                  key={i}
                  href={card.href}
                  className="group p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 
                           hover:border-zinc-300 dark:hover:border-zinc-700
                           transition-all duration-200"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <card.icon className="h-5 w-5 text-zinc-500" />
                      <h3 className="text-lg font-medium">{card.title}</h3>
                    </div>
                    <ArrowRight
                      className="h-4 w-4 text-zinc-400 group-hover:text-zinc-900 
                                       dark:group-hover:text-zinc-100 transition-colors"
                    />
                  </div>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    {card.description}
                  </p>
                </Link>
              ))}
            </div>
          </motion.section>

          {/* Featured Sections */}
          <motion.section variants={item} className="space-y-6">
            <h2 className="text-2xl font-semibold">Featured Documentation</h2>
            <div className="grid gap-3">
              {[
                {
                  title: 'Basic Setup',
                  description:
                    'Learn how to configure DopStick for your project',
                  href: '/dop-stick/docs/setup',
                },
                {
                  title: 'Configuration',
                  description:
                    'Explore configuration options and customization',
                  href: '/dop-stick/docs/configuration',
                },
                {
                  title: 'Advanced Usage',
                  description: 'Dive into advanced features and optimizations',
                  href: '/dop-stick/docs/advanced/networks',
                },
              ].map((item, i) => (
                <Link
                  key={i}
                  href={item.href}
                  className="group flex items-center justify-between p-4 rounded-lg 
                           border border-zinc-200 dark:border-zinc-800
                           hover:border-zinc-300 dark:hover:border-zinc-700
                           hover:bg-zinc-50 dark:hover:bg-zinc-800/50
                           transition-all duration-200"
                >
                  <div>
                    <h3 className="font-medium">{item.title}</h3>
                    <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                      {item.description}
                    </p>
                  </div>
                  <ArrowRight
                    className="h-4 w-4 text-zinc-400 group-hover:text-zinc-900 
                                     dark:group-hover:text-zinc-100 transition-colors"
                  />
                </Link>
              ))}
            </div>
          </motion.section>
        </motion.div>
      </div>
    </main>
  )
}
