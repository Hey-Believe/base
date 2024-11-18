'use client'

import { useState, useEffect } from 'react'
import { Copy, CheckCircle2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { FacetsList } from '@/components/diamond/facets-list'
import {
  FacetDetails as FacetDetailsComponent,
  FacetDetailsType,
  FoundSelector,
  UnknownSelector,
} from '@/components/diamond/facet-details'
import { useRouter } from 'next/navigation'

// Types
interface DiamondInfo {
  infoHash: string
  metadata: {
    version: string
    timestamp: string
    network: string
    diamondAddress: string
  }
  statistics: {
    totalFacets: number
    totalSelectors: number
    totalUnknownSelectors: number
    uniqueAddresses: number
  }
  facets: {
    [address: string]: FacetDetailsType
  }
}

type TransformedSelector = FoundSelector | UnknownSelector

export default function DiamondInfoPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<
    'overview' | 'facets' | 'analysis'
  >('facets')
  const [selectedFacet, setSelectedFacet] = useState<string>()
  const [copied, setCopied] = useState(false)
  const [diamondData, setDiamondData] = useState<DiamondInfo | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    try {
      const storedData = sessionStorage.getItem('diamondData')
      if (!storedData) {
        router.push('/dop-stick/visualize')
        return
      }

      const data = JSON.parse(storedData)

      if (!data.infoHash || !data.metadata || !data.blockchainData) {
        setError('Invalid diamond info format')
        return
      }

      // Transform the data
      const transformedData: DiamondInfo = {
        infoHash: data.infoHash,
        metadata: data.metadata,
        statistics: data.statistics,
        facets: {},
      }

      // Map facets using the facets array which contains the full information
      data.facets.forEach((facetInfo: any) => {
        transformedData.facets[facetInfo.address] = {
          name: facetInfo.name,
          address: facetInfo.address,
          statistics: facetInfo.statistics,
          selectors: {
            found: facetInfo.selectors.found,
            unknown: facetInfo.selectors.unknown,
          },
          events: facetInfo.events || [],
        }
      })

      setDiamondData(transformedData)
    } catch (err) {
      setError('Error loading diamond data')
      console.error(err)
    }
  }, [router])

  useEffect(() => {
    if (selectedFacet && diamondData) {
      console.log('Selected Facet:', selectedFacet)
      console.log('Available Facets:', Object.keys(diamondData.facets))
      console.log('Selected Facet Data:', diamondData.facets[selectedFacet])
    }
  }, [selectedFacet, diamondData])

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Error Loading Data</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={() => router.push('/dop-stick/visualize')}>
            Return to Upload
          </Button>
        </div>
      </div>
    )
  }

  if (!diamondData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl">Loading...</div>
        </div>
      </div>
    )
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Convert facets object to array for FacetsList
  const facetsList = Object.values(diamondData.facets).map((facet) => ({
    name: facet.name,
    address: facet.address,
    statistics: facet.statistics,
  }))

  return (
    <div className="min-h-screen bg-background">
      {/* Top Section */}
      <div className="border-b">
        <div className="max-w-[1200px] mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-xl font-mono font-medium">
                Diamond Info
                <span className="ml-2 text-gray-500 font-normal">MTczMTg3</span>
              </h1>
              <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
                <span>testnet</span>
                <span>•</span>
                <span>Updated 2024-11-17</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                className="font-mono text-sm"
                onClick={() =>
                  copyToClipboard('0x535d3BC47ef036336e05f2B33ECA4222F13a344a')
                }
              >
                {copied ? (
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                ) : (
                  <Copy className="w-4 h-4 mr-2" />
                )}
                0x535d...344a
              </Button>
            </div>
          </div>

          {/* Statistics */}
          <div className="flex gap-6 text-sm">
            <div>
              <span className="text-gray-600">Total Facets</span>
              <span className="ml-2 font-medium">35</span>
            </div>
            <div>
              <span className="text-gray-600">Total Selectors</span>
              <span className="ml-2 font-medium">151</span>
            </div>
            <div>
              <span className="text-gray-600">Unknown Selectors</span>
              <span className="ml-2 font-medium">6</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b">
        <div className="max-w-[1200px] mx-auto px-4">
          <nav className="flex -mb-px">
            {(['overview', 'facets', 'analysis'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-3 font-medium text-sm border-b-2 transition-colors
                  ${
                    activeTab === tab
                      ? 'border-black text-black'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content Area */}
      <main className="max-w-[1200px] mx-auto px-4 py-6">
        {activeTab === 'facets' && (
          <div className="flex gap-6">
            {/* Facets List */}
            <div className="w-80 border-r pr-6">
              <FacetsList
                facets={facetsList}
                selectedFacet={selectedFacet}
                onSelectFacet={setSelectedFacet}
              />
            </div>

            {/* Facet Details */}
            <div className="flex-1">
              <FacetDetailsComponent
                facet={
                  selectedFacet ? diamondData?.facets[selectedFacet] : undefined
                }
              />
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
