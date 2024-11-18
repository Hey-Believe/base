import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import {
  Code2,
  Activity,
  Bell,
  Copy,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  AlertCircle,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

// Type definitions
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

export interface Event {
  name: string
  signature: string
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
  events: Event[]
}

interface FacetDetailsProps {
  facet: FacetDetailsType | null
}

export function FacetDetails({ facet }: FacetDetailsProps) {
  const [copiedSelector, setCopiedSelector] = useState<string | null>(null)

  const handleCopySelector = (selector: string) => {
    navigator.clipboard.writeText(selector)
    setCopiedSelector(selector)
    setTimeout(() => setCopiedSelector(null), 2000)
  }

  if (!facet) {
    return (
      <Card className="h-full flex items-center justify-center bg-white dark:bg-zinc-900">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center p-8"
        >
          <div className="relative w-[400px] h-[300px] mx-auto mb-6">
            <Image
              src="/sleepingcate.gif"
              alt="Select a facet"
              fill
              className="object-contain"
              priority
            />
          </div>
          <h3 className="text-xl font-medium text-zinc-800 dark:text-zinc-200 mb-2">
            Select a Facet
          </h3>
          <p className="text-zinc-500 dark:text-zinc-400 max-w-sm mx-auto">
            Choose a facet from the list to view its details and explore its
            functions
          </p>
        </motion.div>
      </Card>
    )
  }

  return (
    <Card className="h-full flex flex-col bg-white dark:bg-zinc-900">
      {/* Header */}
      <div className="px-6 py-4 border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-semibold text-zinc-800 dark:text-zinc-200 mb-1">
              {facet.name}
            </h2>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => handleCopySelector(facet.address)}
                    className="flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300"
                  >
                    <span className="font-mono">{facet.address}</span>
                    {copiedSelector === facet.address ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">Click to copy address</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-zinc-100 dark:bg-zinc-800">
              {facet.statistics.totalSelectors} Functions
            </Badge>
          </div>
        </div>
      </div>

      {/* Content */}
      <Tabs defaultValue="selectors" className="flex-grow">
        <div className="px-6 border-b border-zinc-200 dark:border-zinc-800">
          <TabsList className="h-12 p-0 bg-transparent space-x-6">
            <TabsTrigger
              value="selectors"
              className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:ring-0 px-0 font-medium"
            >
              Functions
            </TabsTrigger>
            <TabsTrigger
              value="events"
              className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:ring-0 px-0 font-medium"
            >
              Events
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="selectors" className="flex-grow p-6">
          <div className="space-y-6">
            {/* Found Selectors */}
            {facet.selectors.found.length > 0 && (
              <div className="space-y-3">
                {facet.selectors.found.map((selector, index) => (
                  <motion.div
                    key={selector.selector}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card className="p-4 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors group">
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-medium text-zinc-800 dark:text-zinc-200">
                              {selector.name}
                            </h4>
                            <Badge
                              variant="outline"
                              className={cn(
                                'text-xs',
                                selector.mutability === 'view'
                                  ? 'border-blue-500/30 text-blue-600 dark:border-blue-400/30 dark:text-blue-400'
                                  : 'border-orange-500/30 text-orange-600 dark:border-orange-400/30 dark:text-orange-400',
                              )}
                            >
                              {selector.mutability}
                            </Badge>
                          </div>
                          <p className="text-sm font-mono text-zinc-500 dark:text-zinc-400">
                            {selector.signature}
                          </p>
                        </div>
                        <button
                          onClick={() => handleCopySelector(selector.selector)}
                          className="shrink-0 text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300"
                        >
                          {copiedSelector === selector.selector ? (
                            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Unknown Selectors */}
            {facet.selectors.unknown.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <h3 className="font-medium">Unknown Selectors</h3>
                </div>
                {facet.selectors.unknown.map((selector, index) => (
                  <motion.div
                    key={selector.selector}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card className="p-4 border-amber-200 dark:border-amber-800/50 bg-amber-50/50 dark:bg-amber-900/10">
                      <p className="font-mono text-sm text-zinc-600 dark:text-zinc-300 mb-2">
                        {selector.selector}
                      </p>
                      <p className="text-sm text-amber-600 dark:text-amber-400">
                        {selector.reason}
                      </p>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="events" className="flex-grow p-6">
          <div className="space-y-3">
            {facet.events.length > 0 ? (
              facet.events.map((event, index) => (
                <motion.div
                  key={event.signature}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="p-4 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                    <h4 className="font-medium text-zinc-800 dark:text-zinc-200 mb-2">
                      {event.name}
                    </h4>
                    <p className="text-sm font-mono text-zinc-500 dark:text-zinc-400">
                      {event.signature}
                    </p>
                  </Card>
                </motion.div>
              ))
            ) : (
              <div className="text-center text-zinc-500 dark:text-zinc-400 py-12">
                No events found for this facet
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  )
}
