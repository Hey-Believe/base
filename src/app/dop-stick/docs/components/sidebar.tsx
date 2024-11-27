'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Package, ChevronRight, Menu, X, Search } from 'lucide-react'
import { cn } from '@/lib/utils'

const navigation = [
  {
    section: 'Introduction',
    items: [
      { title: 'What is DopStick?', href: '/dop-stick/docs/introduction' },
      { title: 'Key Features', href: '/dop-stick/docs/features' },
      { title: 'Quick Start', href: '/dop-stick/docs/quickstart' },
    ],
  },
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
    section: 'Advanced',
    items: [
      { title: 'Custom Networks', href: '/dop-stick/docs/advanced/networks' },
      { title: 'Caching', href: '/dop-stick/docs/advanced/caching' },
      { title: 'Compilation', href: '/dop-stick/docs/advanced/compilation' },
    ],
  },
]

function DocSearch() {
  return (
    <div className="relative group">
      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
        <Search className="h-4 w-4 text-zinc-400 group-focus-within:text-zinc-900 dark:group-focus-within:text-zinc-100 transition-colors duration-200" />
      </div>
      <input
        type="text"
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
      <div className="absolute right-3 top-1/2 -translate-y-1/2">
        <kbd
          className="hidden sm:inline-flex h-5 items-center gap-1 rounded border 
                     bg-zinc-50 px-1.5 font-mono text-[10px] font-medium text-zinc-400
                     border-zinc-200 dark:border-zinc-800 dark:bg-zinc-900"
        >
          ⌘ K
        </kbd>
      </div>
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
          'transform transition-transform duration-300',
          'bg-white/80 dark:bg-black/80 backdrop-blur-xl',
          'border-r border-zinc-200 dark:border-zinc-800',
          'flex flex-col',
          'lg:translate-x-0 lg:relative',
          isOpen ? 'translate-x-0' : '-translate-x-full',
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

        <nav className="flex-1 overflow-y-auto">
          <div className="p-4 space-y-8">
            {navigation.map((section, i) => (
              <div key={i} className="space-y-2">
                <h2 className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider px-3">
                  {section.section}
                </h2>
                <ul className="space-y-1">
                  {section.items.map((item, j) => (
                    <li key={j}>
                      <Link
                        href={item.href}
                        className={cn(
                          'group flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-all duration-200',
                          pathname === item.href
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
                              pathname === item.href
                                ? 'text-zinc-900 dark:text-zinc-100 transform rotate-90'
                                : 'text-zinc-400 dark:text-zinc-600 group-hover:text-zinc-900 dark:group-hover:text-zinc-100',
                            )}
                          />
                        </span>
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
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
