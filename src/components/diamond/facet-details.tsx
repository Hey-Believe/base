'use client'

import { useState } from 'react'
import { Copy, CheckCircle2, Search, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'

export interface FoundSelector {
  selector: string
  name: string
  signature: string
  mutability: string
}

export interface UnknownSelector {
  selector: string
  reason: string
}

export interface FacetDetailsType {
  name: string
  address: string
  statistics: {
    totalSelectors: number
    foundSelectors: number
    unknownSelectors: number
  }
  selectors: {
    found: FoundSelector[]
    unknown: UnknownSelector[]
  }
  events: Array<{
    name: string
    signature: string
  }>
}

interface FacetDetailsProps {
  facet?: FacetDetailsType
}

export function FacetDetails({ facet }: FacetDetailsProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [copied, setCopied] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'functions' | 'events'>(
    'functions',
  )

  if (!facet) {
    return (
      <div className="h-[calc(100vh-16rem)] flex items-center justify-center text-gray-500">
        <div className="text-center">
          <p className="mb-2">Select a facet to view details</p>
          <p className="text-sm">Choose from the list on the left</p>
        </div>
      </div>
    )
  }

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    setCopied(text)
    toast.success(`${type} copied to clipboard`)
    setTimeout(() => setCopied(null), 2000)
  }

  // Type guard to check if a selector is a found selector
  const isFoundSelector = (
    selector: FoundSelector | UnknownSelector,
  ): selector is FoundSelector => {
    return (
      'name' in selector && 'signature' in selector && 'mutability' in selector
    )
  }

  const allSelectors = [...facet.selectors.found, ...facet.selectors.unknown]
  const filteredSelectors = allSelectors.filter((selector) => {
    if (isFoundSelector(selector)) {
      return (
        selector.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        selector.selector.toLowerCase().includes(searchQuery.toLowerCase()) ||
        selector.signature.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }
    return selector.selector.toLowerCase().includes(searchQuery.toLowerCase())
  })

  return (
    <div className="min-h-full">
      {/* Facet Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="pb-6 mb-6 border-b"
      >
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-medium mb-2">{facet.name}</h2>
            <div className="flex items-center gap-3 text-sm">
              <Button
                variant="ghost"
                size="sm"
                className="font-mono text-xs h-auto py-1"
                onClick={() => copyToClipboard(facet.address, 'Address')}
              >
                {copied === facet.address ? (
                  <CheckCircle2 className="w-3 h-3 mr-1.5" />
                ) : (
                  <Copy className="w-3 h-3 mr-1.5" />
                )}
                {facet.address}
              </Button>
              <a
                href={`https://etherscan.io/address/${facet.address}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-gray-500 hover:text-gray-900 flex items-center gap-1 group"
              >
                <ExternalLink className="w-3 h-3" />
                <span className="group-hover:underline">View on Etherscan</span>
              </a>
            </div>
          </div>
          <div className="text-sm text-gray-600 text-right">
            <div className="font-medium">
              {facet.statistics.totalSelectors} total selectors
            </div>
            <div className="mt-1">
              <span className="text-green-600">
                {facet.statistics.foundSelectors} found
              </span>
              {facet.statistics.unknownSelectors > 0 && (
                <>
                  <span className="mx-1.5">•</span>
                  <span className="text-amber-600">
                    {facet.statistics.unknownSelectors} unknown
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="mb-6 border-b">
        <div className="flex gap-6">
          <button
            onClick={() => setActiveTab('functions')}
            className={`pb-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'functions'
                ? 'border-black text-black'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            Functions ({allSelectors.length})
          </button>
          {facet.events.length > 0 && (
            <button
              onClick={() => setActiveTab('events')}
              className={`pb-2 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'events'
                  ? 'border-black text-black'
                  : 'border-transparent text-gray-500 hover:text-gray-900'
              }`}
            >
              Events ({facet.events.length})
            </button>
          )}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'functions' ? (
          <motion.div
            key="functions"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Search */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search functions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm border rounded-md
                  focus:outline-none focus:ring-1 focus:ring-black
                  placeholder:text-gray-400"
              />
            </div>

            {/* Functions List */}
            <div className="space-y-3">
              {filteredSelectors.map((selector) => (
                <motion.div
                  key={selector.selector}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 rounded-md bg-gray-50 font-mono text-sm group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-1.5">
                        {isFoundSelector(selector) ? (
                          <span className="font-medium text-black">
                            {selector.name}
                          </span>
                        ) : (
                          <span className="text-amber-600">
                            Unknown Function
                          </span>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-xs px-2 py-0.5 h-auto opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() =>
                            copyToClipboard(selector.selector, 'Selector')
                          }
                        >
                          {copied === selector.selector ? (
                            <CheckCircle2 className="w-3 h-3 mr-1" />
                          ) : (
                            <Copy className="w-3 h-3 mr-1" />
                          )}
                          {selector.selector}
                        </Button>
                      </div>
                      {isFoundSelector(selector) ? (
                        <div className="text-gray-600">
                          {selector.signature}
                        </div>
                      ) : (
                        <div className="text-amber-600 italic text-xs">
                          {selector.reason}
                        </div>
                      )}
                    </div>
                    {isFoundSelector(selector) && selector.mutability && (
                      <span className="text-xs px-2 py-1 bg-gray-100 rounded text-gray-600">
                        {selector.mutability}
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="events"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-3"
          >
            {facet.events.map((event) => (
              <motion.div
                key={event.signature}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 rounded-md bg-gray-50 font-mono text-sm group"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-black mb-1.5">
                      {event.name}
                    </div>
                    <div className="text-gray-600">{event.signature}</div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() =>
                      copyToClipboard(event.signature, 'Event signature')
                    }
                  >
                    {copied === event.signature ? (
                      <CheckCircle2 className="w-3 h-3" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                  </Button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
