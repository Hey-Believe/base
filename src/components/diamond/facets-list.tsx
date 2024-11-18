'use client'

import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Search, Diamond } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { FacetDetailsType } from './facet-details'

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

  return (
    <Card className="h-full">
      <div className="p-4 border-b">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search facets..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>
      <div className="divide-y divide-border overflow-auto max-h-[calc(100vh-16rem)]">
        {facetsList.map((facet, index) => (
          <motion.div
            key={facet.address}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <button
              onClick={() => onSelectFacet(facet.address)}
              className={cn(
                'w-full text-left p-4 hover:bg-muted/50 transition-colors',
                selectedFacet === facet.address && 'bg-muted',
              )}
            >
              <div className="flex items-center gap-3">
                <Diamond className="h-4 w-4 text-primary" />
                <div>
                  <h3 className="font-medium truncate">{facet.name}</h3>
                  <p className="text-sm text-muted-foreground truncate">
                    {facet.address}
                  </p>
                </div>
              </div>
              <div className="mt-2 flex gap-4 text-sm text-muted-foreground">
                <span>{facet.statistics.totalSelectors} selectors</span>
                <span>•</span>
                <span>{facet.statistics.foundSelectors} found</span>
                <span>•</span>
                <span>{facet.statistics.unknownSelectors} unknown</span>
              </div>
            </button>
          </motion.div>
        ))}
      </div>
    </Card>
  )
}
