'use client'

import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Code2, Activity, Bell } from 'lucide-react'
import { cn } from '@/lib/utils'

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
  facet: FacetDetailsType
}

export function FacetDetails({ facet }: FacetDetailsProps) {
  if (!facet) return null

  return (
    <Card className="h-full">
      <div className="p-6 border-b">
        <h2 className="text-2xl font-semibold mb-2">{facet.name}</h2>
        <p className="text-sm text-muted-foreground font-mono">
          {facet.address}
        </p>
      </div>

      <Tabs defaultValue="selectors" className="p-6">
        <TabsList>
          <TabsTrigger value="selectors" className="gap-2">
            <Code2 className="h-4 w-4" />
            Selectors
          </TabsTrigger>
          <TabsTrigger value="events" className="gap-2">
            <Bell className="h-4 w-4" />
            Events
          </TabsTrigger>
        </TabsList>

        <TabsContent value="selectors">
          <div className="space-y-6">
            {/* Found Selectors */}
            <div>
              <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                <Activity className="h-5 w-5 text-green-500" />
                Found Selectors
                <Badge variant="secondary">
                  {facet.statistics.foundSelectors}
                </Badge>
              </h3>
              <div className="space-y-3">
                {facet.selectors.found.map((selector, index) => (
                  <motion.div
                    key={selector.selector}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{selector.name}</h4>
                        <Badge
                          variant="outline"
                          className={cn(
                            selector.mutability === 'view' &&
                              'border-blue-500 text-blue-500',
                            selector.mutability === 'nonpayable' &&
                              'border-orange-500 text-orange-500',
                          )}
                        >
                          {selector.mutability}
                        </Badge>
                      </div>
                      <p className="text-sm font-mono text-muted-foreground">
                        {selector.signature}
                      </p>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Unknown Selectors */}
            {facet.selectors.unknown.length > 0 && (
              <div>
                <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                  <Activity className="h-5 w-5 text-red-500" />
                  Unknown Selectors
                  <Badge variant="secondary">
                    {facet.statistics.unknownSelectors}
                  </Badge>
                </h3>
                <div className="space-y-3">
                  {facet.selectors.unknown.map((selector, index) => (
                    <motion.div
                      key={selector.selector}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Card className="p-4">
                        <p className="font-mono text-muted-foreground">
                          {selector.selector}
                        </p>
                        <p className="text-sm text-red-500 mt-1">
                          {selector.reason}
                        </p>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="events">
          <div className="space-y-4">
            {facet.events.length > 0 ? (
              facet.events.map((event, index) => (
                <motion.div
                  key={event.signature}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="p-4">
                    <h4 className="font-medium mb-2">{event.name}</h4>
                    <p className="text-sm font-mono text-muted-foreground">
                      {event.signature}
                    </p>
                  </Card>
                </motion.div>
              ))
            ) : (
              <div className="text-center text-muted-foreground p-4">
                No events found for this facet
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  )
}
