'use client'

import { useState, useEffect } from 'react'
import {
  Copy,
  CheckCircle2,
  Diamond,
  Code2,
  Activity,
  Sparkles,
  AlertCircle,
  GitFork,
  Package,
} from 'lucide-react'
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
import { Badge } from '@/components/ui/badge'

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
    uniqueFacets: number
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
        statistics: {
          ...data.statistics,
          uniqueFacets: new Set(data.facets.map((facet: any) => facet.name))
            .size,
        },
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

  const handleAnalysisClick = () => {
    // The data is already in sessionStorage, so we can just navigate
    router.push('/dop-stick/visualize/analysis')
  }

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
    <div className="h-screen flex flex-col bg-[#fafafa] dark:bg-[#111111]">
      {/* Fixed Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex-none p-6 bg-white dark:bg-black border-b border-[#eaeaea] dark:border-[#333333]"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2.5">
            <Package className="w-6 h-6" />
            <h1 className="text-xl font-medium tracking-tight">dop-stick</h1>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 max-w-7xl mx-auto w-full p-6 overflow-hidden">
        {error ? (
          <Card className="p-4 text-red-500 bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800">
            {error}
          </Card>
        ) : diamondData ? (
          <div className="h-full flex flex-col">
            {/* Stats Cards - Fixed */}
            <div className="flex-none mb-4">
              <Card className="bg-[#fafafa] dark:bg-[#111111] border-[#eaeaea] dark:border-[#333333]">
                <div className="grid grid-cols-[1fr,auto] gap-6 p-5">
                  {/* Left side - Contract Info */}
                  <div className="px-4 py-3 rounded-lg bg-white dark:bg-black border border-dashed border-[#eaeaea] dark:border-[#333333]">
                    <div className="flex items-center gap-4">
                      {/* Icon Container */}
                      <div className="shrink-0 p-2 rounded-md bg-[#fafafa] dark:bg-[#111111] border border-dashed border-[#eaeaea] dark:border-[#333333]">
                        <Diamond className="h-4.5 w-4.5 text-black dark:text-white" />
                      </div>

                      {/* Contract Info */}
                      <div className="min-w-0 flex-1">
                        {/* Title and Badge */}
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="text-xs font-medium text-black dark:text-white">
                            Diamond Contract
                          </h3>
                          <Badge
                            variant="outline"
                            className="h-[18px] px-1.5 text-[10px] font-medium border-dashed border-[#eaeaea] dark:border-[#333333] text-[#666666] dark:text-[#888888]"
                          >
                            {diamondData.metadata.network}
                          </Badge>
                        </div>

                        {/* Address Container */}
                        <div className="flex items-center gap-2 group">
                          <code className="text-[11px] font-mono text-[#666666] dark:text-[#888888] truncate">
                            {diamondData.metadata.diamondAddress}
                          </code>
                          <button
                            onClick={() =>
                              copyToClipboard(
                                diamondData.metadata.diamondAddress,
                              )
                            }
                            className="text-[#666666] hover:text-black dark:text-[#888888] dark:hover:text-white transition-colors opacity-0 group-hover:opacity-100"
                          >
                            <Copy className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right side - Stats */}
                  <div className="flex items-center gap-8 border-l border-dashed border-[#eaeaea] dark:border-[#333333] pl-8">
                    <div className="grid grid-cols-4 gap-6">
                      {/* Facets */}
                      <div className="flex flex-col justify-between px-4 py-3 h-[80px] rounded-lg bg-white dark:bg-black border border-dashed border-[#eaeaea] dark:border-[#333333]">
                        <p className="text-[10px] font-medium uppercase tracking-wider text-[#666666] dark:text-[#888888]">
                          Facets
                        </p>
                        <p className="text-xl font-semibold text-black dark:text-white tabular-nums">
                          {diamondData.statistics.totalFacets}
                        </p>
                      </div>

                      {/* Total Functions */}
                      <div className="flex flex-col justify-between px-4 py-3 h-[80px] rounded-lg bg-white dark:bg-black border border-dashed border-[#eaeaea] dark:border-[#333333]">
                        <p className="text-[10px] font-medium uppercase tracking-wider text-[#666666] dark:text-[#888888]">
                          Functions
                        </p>
                        <p className="text-xl font-semibold text-black dark:text-white tabular-nums">
                          {diamondData.statistics.totalSelectors}
                        </p>
                      </div>

                      {/* Known Functions */}
                      <div className="flex flex-col justify-between px-4 py-3 h-[80px] rounded-lg bg-white dark:bg-black border border-dashed border-[#eaeaea] dark:border-[#333333]">
                        <div className="flex items-center gap-2">
                          <p className="text-[10px] font-medium uppercase tracking-wider text-[#666666] dark:text-[#888888]">
                            Known
                          </p>
                          <Badge className="bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-dashed border-emerald-200 dark:border-emerald-500/20 text-[10px] h-4 ml-auto">
                            {Math.round(
                              ((diamondData.statistics.totalSelectors -
                                diamondData.statistics.totalUnknownSelectors) /
                                diamondData.statistics.totalSelectors) *
                                100,
                            )}
                            %
                          </Badge>
                        </div>
                        <p className="text-xl font-semibold text-black dark:text-white tabular-nums">
                          {diamondData.statistics.totalSelectors -
                            diamondData.statistics.totalUnknownSelectors}
                        </p>
                      </div>

                      {/* Unknown Functions */}
                      <div className="flex flex-col justify-between px-4 py-3 h-[80px] rounded-lg bg-white dark:bg-black border border-dashed border-[#eaeaea] dark:border-[#333333]">
                        <div className="flex items-center gap-2">
                          <p className="text-[10px] font-medium uppercase tracking-wider text-[#666666] dark:text-[#888888]">
                            Unknown
                          </p>
                          <Badge className="bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border-dashed border-amber-200 dark:border-amber-500/20 text-[10px] h-4 ml-auto">
                            {Math.round(
                              (diamondData.statistics.totalUnknownSelectors /
                                diamondData.statistics.totalSelectors) *
                                100,
                            )}
                            %
                          </Badge>
                        </div>
                        <p className="text-xl font-semibold text-black dark:text-white tabular-nums">
                          {diamondData.statistics.totalUnknownSelectors}
                        </p>
                      </div>
                    </div>

                    {/* Analysis Button */}
                    <Button
                      size="sm"
                      onClick={handleAnalysisClick}
                      className="ml-6 gap-2 bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90 transition-all duration-200"
                    >
                      <Activity className="h-4 w-4" />
                      Analysis
                    </Button>
                  </div>
                </div>
              </Card>
            </div>

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
  description,
  trend,
}: {
  icon: React.ReactNode
  label: string
  value: number
  description?: string
  trend?: {
    value: number
    isPositive: boolean
  }
}) {
  return (
    <Card className="relative overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
            {icon}
          </div>
          {trend && (
            <Badge
              variant={trend.isPositive ? 'success' : 'destructive'}
              className="font-medium"
            >
              {trend.isPositive ? '+' : '-'}
              {trend.value}%
            </Badge>
          )}
        </div>

        <div className="space-y-1">
          <h3 className="text-sm font-medium text-muted-foreground">{label}</h3>
          <div className="flex items-baseline gap-2">
            <p className="text-2xl font-semibold tracking-tight">
              {value.toLocaleString()}
            </p>
            {description && (
              <span className="text-sm text-muted-foreground">
                {description}
              </span>
            )}
          </div>
        </div>
      </div>
    </Card>
  )
}

function StatItem({
  label,
  value,
  description,
}: {
  label: string
  value: number | string
  description?: string
}) {
  return (
    <div className="flex flex-col">
      <p className="text-sm text-muted-foreground">{label}</p>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-semibold">
          {typeof value === 'number' ? value.toLocaleString() : value}
        </span>
        {description && (
          <span className="text-xs text-muted-foreground">{description}</span>
        )}
      </div>
    </div>
  )
}
