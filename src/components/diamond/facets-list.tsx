'use client'

import { useState } from 'react'
import { Search, CheckCircle } from 'lucide-react'

interface Facet {
  name: string
  address: string
  statistics: {
    totalSelectors: number
    foundSelectors: number
    unknownSelectors: number
  }
}

interface FacetsListProps {
  facets: Facet[]
  selectedFacet?: string
  onSelectFacet: (address: string) => void
}

export function FacetsList({
  facets,
  selectedFacet,
  onSelectFacet,
}: FacetsListProps) {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredFacets = facets.filter(
    (facet) =>
      facet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      facet.address.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div>
      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search facets..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-4 py-2 text-sm border rounded-md 
            focus:outline-none focus:ring-1 focus:ring-black
            placeholder:text-gray-400"
        />
      </div>

      {/* Facets List */}
      <div className="space-y-1">
        {filteredFacets.map((facet) => (
          <button
            key={facet.address}
            onClick={() => onSelectFacet(facet.address)}
            className={`w-full text-left px-3 py-2 rounded-md transition-colors
              ${
                selectedFacet === facet.address
                  ? 'bg-gray-100'
                  : 'hover:bg-gray-50'
              }`}
          >
            <div className="flex items-center justify-between">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-medium truncate">
                    {facet.name.startsWith('Unknown')
                      ? 'Unknown Facet'
                      : facet.name}
                  </span>
                  {!facet.name.startsWith('Unknown') && (
                    <CheckCircle className="w-3 h-3 text-green-500" />
                  )}
                </div>
                <div className="text-xs font-mono text-gray-500 truncate">
                  {facet.address}
                </div>
              </div>
              <div className="text-xs text-gray-500">
                {facet.statistics.totalSelectors}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="mt-1 flex items-center gap-3 text-xs text-gray-500">
              <span>{facet.statistics.foundSelectors} found</span>
              {facet.statistics.unknownSelectors > 0 && (
                <>
                  <span>•</span>
                  <span>{facet.statistics.unknownSelectors} unknown</span>
                </>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
