'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronUp, ChevronDown, Globe, BookOpen, Package } from 'lucide-react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Footer } from '@/components/footer'
import '@/styles/blinking-cat.css'

const networks = [
  {
    id: 'select',
    name: 'Network',
    icon: <Globe className="w-5 h-5 text-gray-600" />,
    isIcon: true,
  },
  {
    id: 'custom',
    name: 'Custom Network',
    image: '/networks/custom.svg',
    className: 'bg-gray-100',
  },
  {
    id: 'ethereum',
    name: 'Ethereum',
    image: '/networks/ethereum.svg',
  },
  {
    id: 'polygon',
    name: 'Polygon',
    image: '/networks/polygon.svg',
  },
  {
    id: 'arbitrum',
    name: 'Arbitrum',
    image: '/networks/arbitrum.svg',
  },
  {
    id: 'optimism',
    name: 'Optimism',
    image: '/networks/optimism.svg',
  },
  {
    id: 'avalanche',
    name: 'Avalanche',
    image: '/networks/avalanche.svg',
  },
  {
    id: 'bnb',
    name: 'BNB Chain',
    image: '/networks/bnb.svg',
  },
  {
    id: 'base',
    name: 'Base',
    image: '/networks/base.svg',
  },
]

export default function Component() {
  const [inputValue, setInputValue] = useState('')
  const [selectedNetwork, setSelectedNetwork] = useState(networks[0])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const headerVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 20,
        mass: 1,
      },
    },
  }

  const titleVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 20,
        mass: 0.8,
        duration: 0.8,
      },
    },
  }

  const searchBoxVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 20,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 25,
        mass: 0.5,
        duration: 0.5,
      },
    },
    hover: {
      scale: 1.02,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 25,
      },
    },
  }

  const linksContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.8,
      },
    },
  }

  const linkVariants = {
    hidden: {
      opacity: 0,
      x: -20,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 20,
      },
    },
    hover: {
      x: 10,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 10,
      },
    },
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen flex flex-col bg-[#fafafa] dark:bg-[#111111]"
    >
      <motion.header
        variants={headerVariants}
        className="px-6 h-16 flex items-center bg-white dark:bg-black border-b border-[#eaeaea] dark:border-[#333333]"
      >
        <Link href="/" className="flex items-center gap-2.5">
          <Package className="w-6 h-6" />
          <span className="text-xl font-medium tracking-tight">dop-stick</span>
        </Link>

        <div className="ml-auto flex items-center gap-6">
          <Link
            href="/docs"
            className="flex items-center gap-2 text-sm text-[#666666] hover:text-[#000000] dark:text-[#888888] dark:hover:text-[#ffffff] transition-colors"
          >
            <BookOpen className="w-4 h-4" />
            <span>see docs</span>
          </Link>

          <Link
            href="/dop-stick/visualize"
            className="flex items-center gap-2 text-sm text-[#666666] hover:text-[#000000] dark:text-[#888888] dark:hover:text-[#ffffff] transition-colors"
          >
            <span>Visualize</span>
            <span className="blinking-cat"></span>
          </Link>
        </div>
      </motion.header>

      <main className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-2xl space-y-8">
          <motion.div
            variants={titleVariants}
            className="space-y-4 text-center"
          >
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
              Which diamond can I help you explore?
            </h1>
          </motion.div>

          <motion.div
            variants={searchBoxVariants}
            whileHover="hover"
            className="w-full bg-white dark:bg-black rounded-lg border border-[#eaeaea] dark:border-[#333333] shadow-sm"
          >
            <div className="flex flex-col">
              <input
                type="text"
                className="w-full h-12 px-4 bg-transparent outline-none text-base text-[#000000] dark:text-[#ffffff] placeholder:text-[#999999] dark:placeholder:text-[#444444]"
                placeholder="search any verified diamond address on any chain..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />

              <div className="px-3 py-2 flex items-center justify-between">
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 px-3 gap-2 text-muted-foreground hover:text-foreground 
                               transition-colors hover:bg-transparent focus:outline-none focus:ring-0"
                    >
                      <div className="w-5 h-5 flex items-center justify-center">
                        {selectedNetwork.isIcon ? (
                          selectedNetwork.icon
                        ) : (
                          <Image
                            src={
                              selectedNetwork.image ||
                              '/path/to/default-image.svg'
                            }
                            alt={selectedNetwork.name}
                            width={20}
                            height={20}
                            className="object-contain"
                          />
                        )}
                      </div>
                      <span className="text-sm font-normal">
                        {selectedNetwork.name}
                      </span>
                      <ChevronDown className="w-4 h-4 opacity-50" />
                    </Button>
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Portal>
                    <DropdownMenu.Content
                      className="w-64 bg-white rounded-lg shadow-lg border animate-in fade-in-0 zoom-in-95 focus:outline-none"
                      align="start"
                      sideOffset={5}
                    >
                      <div className="py-2">
                        {networks.map((network) => (
                          <DropdownMenu.Item
                            key={network.id}
                            className="px-3 py-2.5 text-sm cursor-default flex items-center gap-3 
                                     hover:bg-gray-50 focus:bg-gray-50 focus:outline-none
                                     text-gray-700 font-normal"
                            onSelect={() => setSelectedNetwork(network)}
                          >
                            <div className="w-6 h-6 flex items-center justify-center">
                              {network.isIcon ? (
                                network.icon
                              ) : (
                                <Image
                                  src={
                                    network.image ||
                                    '/path/to/default-image.svg'
                                  }
                                  alt={network.name}
                                  width={24}
                                  height={24}
                                  className="object-contain"
                                />
                              )}
                            </div>
                            <span className="flex-1">{network.name}</span>
                            {network.id === selectedNetwork.id && (
                              <span className="text-blue-600">✓</span>
                            )}
                          </DropdownMenu.Item>
                        ))}
                      </div>
                    </DropdownMenu.Content>
                  </DropdownMenu.Portal>
                </DropdownMenu.Root>

                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 bg-[#000000] dark:bg-[#ffffff] hover:bg-[#333333] dark:hover:bg-[#888888] text-white dark:text-black rounded-full flex items-center justify-center transition-colors shadow-sm hover:shadow"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                  >
                    <path
                      d="M8 3v10M8 3l-3 3M8 3l3 3"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="sr-only">Submit</span>
                </Button>
              </div>
            </div>
          </motion.div>

          <AnimatePresence>
            {!inputValue && (
              <motion.div
                variants={linksContainerVariants}
                className="flex flex-wrap justify-center gap-4 text-sm"
              >
                {[
                  'What is dop-stick and what can i do with it? →',
                  'How can i set my dop-stick up? →',
                  'Can Dop-stick be used with custom networks? →',
                ].map((text, i) => (
                  <motion.div
                    key={i}
                    variants={linkVariants}
                    whileHover="hover"
                  >
                    <Button
                      variant="link"
                      className="h-auto p-0 text-[#666666] hover:text-[#000000] dark:text-[#888888] dark:hover:text-[#ffffff]"
                    >
                      {text}
                    </Button>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <Footer />
      </motion.footer>
    </motion.div>
  )
}
