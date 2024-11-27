'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Package, ChevronRight, Menu, X, Search } from 'lucide-react'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'

const navigation = [
  // {
  //   section: 'Introduction',
  //   items: [
  //     { title: 'What is DopStick?', href: '/dop-stick/docs/introduction' },
  //     { title: 'Key Features', href: '/dop-stick/docs/features' },
  //     { title: 'Quick Start', href: '/dop-stick/docs/quickstart' },
  //   ],
  // },
  {
    section: 'Core Concepts',
    items: [
      { title: 'Installation', href: '/dop-stick/docs/installation' },
      {
        title: 'Basic Setup',
        href: '/dop-stick/docs/installation?section=setup',
      },
      {
        title: 'Configuration',
        href: '/dop-stick/docs/installation?section=configuration',
      },
    ],
  },
  {
    section: 'Commands',
    items: [
      { title: 'mine', href: '/dop-stick/docs/commands#mine' },
      { title: 'upgrade', href: '/dop-stick/docs/commands#upgrade' },
      { title: 'info', href: '/dop-stick/docs/commands#info' },
    ],
  },
  {
    section: 'Configuration',
    items: [
      {
        title: 'Compiler Settings',
        href: '/dop-stick/docs/configuration#compiler',
      },
      { title: 'Mode & Paths', href: '/dop-stick/docs/configuration#paths' },
      {
        title: 'Security Settings',
        href: '/dop-stick/docs/configuration#security',
      },
      { title: 'Gas & Performance', href: '/dop-stick/docs/configuration#gas' },
      {
        title: 'Retry & Error Handling',
        href: '/dop-stick/docs/configuration#retry',
      },
      {
        title: 'Contract Verification',
        href: '/dop-stick/docs/configuration#verification',
      },
    ],
  },
]

interface SearchResult {
  title: string
  href: string
  section: string
}

function DocSearch() {
  const [results, setResults] = useState<SearchResult[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const searchQuery = e.target.value

    if (!searchQuery || searchQuery.length < 2) {
      setResults([])
      return
    }

    try {
      const searchResults = navigation.reduce<SearchResult[]>(
        (acc, section) => {
          const matches = section.items
            .filter(
              (item) =>
                item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                section.section
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase()),
            )
            .map((item) => ({
              title: item.title,
              href: item.href,
              section: section.section,
            }))
          return [...acc, ...matches]
        },
        [],
      )

      setResults(searchResults)
    } catch (error) {
      console.error('Search error:', error)
      setResults([])
    }
  }, [])

  const clearSearch = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.value = ''
    }
    setResults([])
    setIsSearching(false)
  }, [])

  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
        <Search className="h-4 w-4 text-zinc-400" />
      </div>
      <input
        ref={inputRef}
        type="text"
        onChange={handleSearch}
        onFocus={() => setIsSearching(true)}
        onBlur={() => setTimeout(() => setIsSearching(false), 200)}
        placeholder="Search documentation..."
        className="w-full pl-10 pr-12 py-2.5 text-sm 
                 bg-zinc-50/50 dark:bg-zinc-900/50 
                 border border-zinc-200 dark:border-zinc-800 
                 rounded-xl
                 focus:outline-none focus:ring-[2px] 
                 focus:ring-zinc-900/10 dark:focus:ring-zinc-100/10
                 focus:border-zinc-900 dark:focus:border-zinc-100
                 placeholder:text-zinc-400 dark:placeholder:text-zinc-500
                 transition-all duration-200"
      />

      <AnimatePresence>
        {isSearching && results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-50 left-0 right-0 mt-2 overflow-hidden
                      bg-white dark:bg-zinc-900 
                      border border-zinc-200 dark:border-zinc-800 
                      rounded-lg shadow-lg"
          >
            <ul className="max-h-64 overflow-y-auto py-2">
              {results.map((result, index) => (
                <li key={`${result.href}-${index}`}>
                  <Link
                    href={result.href}
                    onClick={clearSearch}
                    className="flex flex-col px-4 py-2 hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                  >
                    <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                      {result.title}
                    </span>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400">
                      {result.section}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function Sidebar({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}) {
  const pathname = usePathname()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])

  const isActiveLink = (href: string) => {
    try {
      if (!isMounted) return false

      // For links with hash, check exact match including the hash
      if (href.includes('#')) {
        return typeof window !== 'undefined'
          ? window.location.pathname + window.location.hash === href
          : pathname === href.split('#')[0]
      }
      // For regular links, check just the pathname
      return pathname === href
    } catch (error) {
      console.error('Active link check error:', error)
      return false
    }
  }

  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    try {
      if (!isMounted) return

      const [basePath, hash] = href.split('#')
      if (pathname !== basePath) {
        return // Allow normal navigation
      }

      if (hash && typeof window !== 'undefined') {
        e.preventDefault()
        const element = document.getElementById(hash)
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          })
          window.history.pushState({}, '', href)
        }
      }
    } catch (error) {
      console.error('Scroll error:', error)
    }
  }

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 dark:bg-white/10 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={cn(
          'fixed top-0 left-0 z-50 h-screen w-72',
          'flex flex-col',
          'bg-white/80 dark:bg-black/80 backdrop-blur-xl',
          'border-r border-zinc-200 dark:border-zinc-800',
          'lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
        )}
      >
        <div className="flex-none p-4 border-b border-zinc-200 dark:border-zinc-800">
          <Link href="/dop-stick" className="flex items-center gap-2.5">
            <Package className="h-6 w-6" />
            <span className="font-semibold text-lg">DopStick</span>
          </Link>
        </div>

        <div className="flex-none p-4 border-b border-zinc-200 dark:border-zinc-800">
          <DocSearch />
        </div>

        <nav className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-800 scrollbar-track-transparent">
          <motion.div
            className="p-4 space-y-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {navigation.map((section, i) => (
              <motion.div
                key={i}
                className="space-y-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <h2 className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider px-3">
                  {section.section}
                </h2>
                <ul className="space-y-1">
                  {section.items.map((item, j) => (
                    <motion.li
                      key={j}
                      whileHover={{ x: 4 }}
                      transition={{
                        type: 'spring',
                        stiffness: 400,
                        damping: 17,
                      }}
                    >
                      <Link
                        href={item.href}
                        onClick={(e) => scrollToSection(e, item.href)}
                        className={cn(
                          'group flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-all duration-200',
                          isActiveLink(item.href)
                            ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100'
                            : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100',
                        )}
                      >
                        <span className="relative">
                          <span
                            className="absolute inset-0 bg-zinc-900/0 group-hover:bg-zinc-900/5 
                                       dark:group-hover:bg-zinc-100/5
                                       rounded-full blur transition-all duration-300"
                          />
                          <ChevronRight
                            className={cn(
                              'h-3 w-3 transition-transform duration-200',
                              isActiveLink(item.href)
                                ? 'text-zinc-900 dark:text-zinc-100 transform rotate-90'
                                : 'text-zinc-400 dark:text-zinc-600 group-hover:text-zinc-900 dark:group-hover:text-zinc-100',
                            )}
                          />
                        </span>
                        {item.title}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </nav>

        <div className="flex-none p-4 border-t border-zinc-200 dark:border-zinc-800">
          <div className="text-sm text-zinc-500 dark:text-zinc-400">
            Documentation v1.0.0
          </div>
        </div>
      </aside>
    </>
  )
}
