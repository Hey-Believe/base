'use client'

import { useState, useEffect } from 'react'
import { Copy, CheckCircle2, Diamond, Code2, Activity } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { FacetsList } from '@/components/diamond/facets-list'
import {
  FacetDetails,
  FacetDetailsType,
  FoundSelector,
  UnknownSelector,
} from '@/components/diamond/facet-details'
import { useRouter } from 'next/navigation'

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
  const [selectedFacet, setSelectedFacet] = useState<string | null>(null)
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
    <div className="h-screen flex flex-col bg-gradient-to-b from-background to-muted/20">
      {/* Fixed Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex-none p-6 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Diamond className="h-6 w-6 text-primary" />
              <h1 className="text-2xl font-semibold tracking-tight">
                Diamond Inspector
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="gap-2"
                onClick={() => {
                  navigator.clipboard.writeText(
                    diamondData?.metadata.diamondAddress || '',
                  )
                  setCopied(true)
                  setTimeout(() => setCopied(false), 2000)
                }}
              >
                {copied ? (
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
                {diamondData?.metadata.diamondAddress.slice(0, 6)}...
                {diamondData?.metadata.diamondAddress.slice(-4)}
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 max-w-7xl mx-auto p-6 overflow-hidden">
        {error ? (
          <Card className="p-4 text-red-500 bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800">
            {error}
          </Card>
        ) : diamondData ? (
          <div className="h-full flex flex-col">
            {/* Stats Cards - Fixed */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex-none grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
            >
              <StatCard
                icon={<Diamond className="h-5 w-5" />}
                label="Total Facets"
                value={diamondData.statistics.totalFacets}
              />
              <StatCard
                icon={<Code2 className="h-5 w-5" />}
                label="Total Selectors"
                value={diamondData.statistics.totalSelectors}
              />
              <StatCard
                icon={<Activity className="h-5 w-5" />}
                label="Known Selectors"
                value={
                  diamondData.statistics.totalSelectors -
                  diamondData.statistics.totalUnknownSelectors
                }
              />
              <StatCard
                icon={<Code2 className="h-5 w-5" />}
                label="Unknown Selectors"
                value={diamondData.statistics.totalUnknownSelectors}
              />
            </motion.div>

            {/* Scrollable Content Area */}
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-0">
              {/* Facets List */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="lg:col-span-4 xl:col-span-3 overflow-hidden"
              >
                <FacetsList
                  facets={diamondData.facets}
                  selectedFacet={selectedFacet}
                  onSelectFacet={setSelectedFacet}
                />
              </motion.div>

              {/* Facet Details */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="lg:col-span-8 xl:col-span-9 overflow-hidden"
              >
                {selectedFacet && diamondData ? (
                  <FacetDetails facet={diamondData.facets[selectedFacet]} />
                ) : (
                  <FacetDetails facet={null} />
                )}
              </motion.div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="animate-pulse">Loading...</div>
          </div>
        )}
      </div>
    </div>
  )
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: number
}) {
  return (
    <Card className="p-4">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-primary/10 rounded-lg text-primary">{icon}</div>
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="text-2xl font-semibold">{value}</p>
        </div>
      </div>
    </Card>
  )
}
