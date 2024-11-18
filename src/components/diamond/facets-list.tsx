'use client'

import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Search,
  Copy,
  CheckCircle2,
  ChevronRight,
  Code2,
  AlertCircle,
  CheckCircle,
  Blocks,
} from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { FacetDetailsType } from './facet-details'
import { Badge } from '@/components/ui/badge'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

interface FacetsListProps {
  facets: { [address: string]: FacetDetailsType }
  selectedFacet: string | null
  onSelectFacet: (address: string) => void
}

export function FacetsList({
  facets,
  selectedFacet,
  onSelectFacet,
}: FacetsListProps) {
  const [search, setSearch] = useState('')
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null)

  const facetsList = Object.entries(facets)
    .map(([address, facet]) => ({
      address,
      name: facet.name,
      statistics: facet.statistics,
    }))
    .filter(
      (facet) =>
        facet.name.toLowerCase().includes(search.toLowerCase()) ||
        facet.address.toLowerCase().includes(search.toLowerCase()),
    )
    .sort((a, b) => a.name.localeCompare(b.name))

  const handleCopyAddress = (address: string, e: React.MouseEvent) => {
    e.stopPropagation()
    navigator.clipboard.writeText(address)
    setCopiedAddress(address)
    setTimeout(() => setCopiedAddress(null), 2000)
  }

  const shortenAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  return (
    <Card className="h-full flex flex-col bg-white dark:bg-zinc-900">
      <div className="px-4 pt-4 pb-3 border-b border-zinc-200 dark:border-zinc-800">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <Input
            placeholder="Search facets..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={cn(
              'pl-9 h-9 bg-zinc-50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700',
              'placeholder:text-zinc-400 dark:placeholder:text-zinc-500',
              'focus:ring-2 focus:ring-primary/20 focus:border-primary',
            )}
          />
        </div>
        <div className="mt-2 px-1 flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-400">
          <Code2 className="h-3.5 w-3.5" />
          <span>{facetsList.length} facets found</span>
        </div>
      </div>

      <div className="overflow-y-auto flex-grow">
        <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
          {facetsList.map((facet, index) => (
            <motion.div
              key={facet.address}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <button
                onClick={() => onSelectFacet(facet.address)}
                className={cn(
                  'w-full text-left transition-all duration-200 group',
                  'hover:bg-zinc-50 dark:hover:bg-zinc-800/50',
                  selectedFacet === facet.address &&
                    'bg-zinc-50 dark:bg-zinc-800/50',
                )}
              >
                <div className="px-4 py-3">
                  <div className="flex flex-col gap-2">
                    {/* Module Name and Arrow */}
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2 min-w-0">
                        <h3 className="text-[15px] font-semibold text-zinc-800 dark:text-zinc-200 truncate">
                          {facet.name !== 'Unknown Facet'
                            ? facet.name
                            : shortenAddress(facet.address)}
                        </h3>
                        {facet.name === 'Unknown Facet' && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
                            Unknown
                          </span>
                        )}
                      </div>
                      <ChevronRight
                        className={cn(
                          'h-4 w-4 shrink-0 transition-transform duration-200',
                          selectedFacet === facet.address
                            ? 'opacity-100'
                            : 'opacity-0 group-hover:opacity-100',
                          'text-zinc-400 dark:text-zinc-500',
                        )}
                      />
                    </div>

                    {/* Address with Copy */}
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div
                            className="flex items-center gap-1 group/address cursor-pointer w-fit"
                            onClick={(e) => handleCopyAddress(facet.address, e)}
                          >
                            <span className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
                              {shortenAddress(facet.address)}
                            </span>
                            {copiedAddress === facet.address ? (
                              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                            ) : (
                              <Copy className="h-3.5 w-3.5 opacity-0 group-hover/address:opacity-100 transition-opacity text-zinc-400" />
                            )}
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-xs">Click to copy address</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    {/* Statistics */}
                    <div className="flex items-center gap-3 text-xs">
                      <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800">
                        <Code2 className="h-3.5 w-3.5 text-zinc-500 dark:text-zinc-400" />
                        <span className="text-zinc-600 dark:text-zinc-300">
                          {facet.statistics.totalSelectors}
                        </span>
                      </div>

                      {facet.statistics.foundSelectors > 0 && (
                        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-900/30">
                          <CheckCircle className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                          <span className="text-emerald-700 dark:text-emerald-400">
                            {facet.statistics.foundSelectors} Found
                          </span>
                        </div>
                      )}

                      {facet.statistics.unknownSelectors > 0 && (
                        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-900/30">
                          <AlertCircle className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
                          <span className="text-amber-700 dark:text-amber-400">
                            {facet.statistics.unknownSelectors} Unknown
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </Card>
  )
}
