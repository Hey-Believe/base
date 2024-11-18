'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Package,
  Shield,
  Boxes,
  Activity,
  Code2,
  AlertTriangle,
  BarChart2,
  Code,
  Radio,
  CheckCircle2,
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  LineChart,
  Line,
  AreaChart,
  Area,
  Treemap,
  CartesianGrid,
} from 'recharts'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  analyzeFunctionComplexity,
  analyzeFunctionTypes,
  analyzeEvents,
  analyzeInterfaces,
  analyzeFacetDistribution,
  analyzeAccessPatterns,
  calculateComplexityScore,
} from './utils'
import CustomizedContent from './components/CustomizedContent'

interface DiamondAnalytics {
  functionDistribution: {
    total: number
    known: number
    unknown: number
    byFacet: { name: string; count: number }[]
  }
  securityMetrics: {
    score: number
    hasUpgradeMechanism: boolean
    hasAccessControl: boolean
    unknownFunctions: number
    riskFactors: string[]
  }
  facetAnalysis: {
    largest: { name: string; count: number }
    smallest: { name: string; count: number }
    averageSize: number
    distribution: { name: string; count: number }[]
  }
  functionComplexity: {
    params: number
    count: number
  }[]
  functionTypes: {
    name: string
    value: number
  }[]
  eventAnalysis: {
    name: string
    events: number
  }[]
  interfaceCompliance: {
    name: string
    compliant: boolean
  }[]
  facetDistribution: {
    name: string
    count: number
  }[]
  accessPatterns: {
    name: string
    value: number
  }[]
  complexityMetrics: {
    averageComplexity: number
    totalFunctions: number
    complexityDistribution: {
      params: number
      count: number
    }[]
  }
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

function transformData(rawData: any): DiamondAnalytics {
  const functionComplexity = analyzeFunctionComplexity(rawData.facets)
  const functionTypes = analyzeFunctionTypes(rawData.facets)
  const eventAnalysis = analyzeEvents(rawData.facets)
  const interfaceCompliance = analyzeInterfaces(rawData.facets)
  const facetDistribution = analyzeFacetDistribution(rawData.facets)
  const accessPatterns = analyzeAccessPatterns(rawData.facets)
  const complexityMetrics = calculateComplexityScore(rawData.facets)

  // Calculate function distribution
  const functionDistribution = {
    total: rawData.statistics.totalSelectors,
    known:
      rawData.statistics.totalSelectors -
      rawData.statistics.totalUnknownSelectors,
    unknown: rawData.statistics.totalUnknownSelectors,
    byFacet: rawData.facets
      .map((facet: any) => ({
        name:
          facet.name.length > 15
            ? facet.name.substring(0, 15) + '...'
            : facet.name,
        count: facet.statistics.totalSelectors,
      }))
      .sort((a: any, b: any) => b.count - a.count),
  }

  // Calculate security metrics with refined criteria
  const hasUpgradeMechanism = rawData.facets.some((facet: any) =>
    facet.name.toLowerCase().includes('upgrade'),
  )

  const riskFactors = []

  // Unknown functions are a security risk
  if (rawData.statistics.totalUnknownSelectors > 0) {
    riskFactors.push(
      `${rawData.statistics.totalUnknownSelectors} unknown function(s) detected`,
    )
  }

  // No upgrade mechanism could be a risk depending on the use case
  if (!hasUpgradeMechanism) {
    riskFactors.push('No upgrade mechanism detected')
  }

  // Check for potential access control
  const hasAccessControl = rawData.facets.some((facet: any) =>
    facet.selectors.found.some(
      (selector: any) =>
        selector.signature?.toLowerCase().includes('onlyowner') ||
        selector.signature?.toLowerCase().includes('onlyadmin') ||
        selector.name?.toLowerCase().includes('admin') ||
        selector.name?.toLowerCase().includes('owner'),
    ),
  )

  if (!hasAccessControl) {
    riskFactors.push('Limited access control detected')
  }

  // Calculate security score (refined version)
  const securityScore = Math.max(
    0,
    100 -
      // Unknown functions have highest impact (-15 points each, max -60)
      (Math.min(60, rawData.statistics.totalUnknownSelectors * 15) +
        // No upgrade mechanism (-20 points)
        (!hasUpgradeMechanism ? 20 : 0) +
        // No access control (-20 points)
        (!hasAccessControl ? 20 : 0)),
  )

  // Calculate facet analysis
  const facetSizes = rawData.facets.map((facet: any) => ({
    name: facet.name,
    count: facet.statistics.totalSelectors,
  }))

  const largest = facetSizes.reduce(
    (max: any, current: any) => (current.count > max.count ? current : max),
    facetSizes[0],
  )

  const smallest = facetSizes.reduce(
    (min: any, current: any) => (current.count < min.count ? current : min),
    facetSizes[0],
  )

  const averageSize = Math.round(
    facetSizes.reduce((sum: number, current: any) => sum + current.count, 0) /
      facetSizes.length,
  )

  return {
    functionDistribution,
    securityMetrics: {
      score: securityScore,
      hasUpgradeMechanism,
      hasAccessControl,
      unknownFunctions: rawData.statistics.totalUnknownSelectors,
      riskFactors,
    },
    facetAnalysis: {
      largest,
      smallest,
      averageSize,
      distribution: facetSizes,
    },
    functionComplexity,
    functionTypes,
    eventAnalysis,
    interfaceCompliance,
    facetDistribution,
    accessPatterns,
    complexityMetrics,
  }
}

export default function AnalysisPage() {
  const router = useRouter()
  const [data, setData] = useState<DiamondAnalytics | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    try {
      const storedData = sessionStorage.getItem('diamondData')
      if (!storedData) {
        // If no data is found, redirect back to the visualize page
        router.push('/dop-stick/visualize')
        return
      }

      const rawData = JSON.parse(storedData)
      const transformedData = transformData(rawData)
      setData(transformedData)
    } catch (error) {
      console.error('Error processing data:', error)
      // On error, redirect back to the visualize page
      router.push('/dop-stick/visualize')
    } finally {
      setLoading(false)
    }
  }, [router])

  // Add a loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fafafa] dark:bg-[#111111]">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black dark:border-white mx-auto"></div>
          <p className="text-sm text-[#666666] dark:text-[#888888]">
            Loading analysis...
          </p>
        </div>
      </div>
    )
  }

  // Add a no data state
  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fafafa] dark:bg-[#111111]">
        <div className="text-center space-y-4">
          <p className="text-lg font-medium">No data available for analysis</p>
          <Button
            onClick={() => router.push('/dop-stick/visualize')}
            variant="outline"
          >
            Return to Upload
          </Button>
        </div>
      </div>
    )
  }

  const functionDistributionData = [
    { name: 'Known', value: data.functionDistribution.known },
    { name: 'Unknown', value: data.functionDistribution.unknown },
  ]

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#111111]">
      {/* Header */}
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
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Hero Section - Inspired by Vercel */}
        <div className="mb-12 space-y-4">
          <h2 className="text-4xl font-bold">Contract Analysis</h2>
          <p className="text-lg text-[#666666] dark:text-[#888888] max-w-2xl">
            Comprehensive insights and metrics for your Diamond contract
            implementation.
          </p>
        </div>

        {/* Analytics Grid - Using Vercel's grid pattern */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {/* Security Score Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="p-8 bg-white dark:bg-black border-dashed h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-500/10">
                  <Shield className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Security Score</h3>
                  <p className="text-sm text-[#666666] dark:text-[#888888]">
                    Overall contract security assessment
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-5xl font-bold tabular-nums">
                    {data.securityMetrics.score}
                  </span>
                  <Badge
                    className={
                      data.securityMetrics.score > 80
                        ? 'h-7 px-3 bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400'
                        : data.securityMetrics.score > 60
                        ? 'h-7 px-3 bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400'
                        : 'h-7 px-3 bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400'
                    }
                  >
                    {data.securityMetrics.score > 80
                      ? 'Secure'
                      : data.securityMetrics.score > 60
                      ? 'Review Recommended'
                      : 'Action Required'}
                  </Badge>
                </div>

                {/* Security Highlights */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-white dark:bg-black">
                      {data.securityMetrics.hasUpgradeMechanism
                        ? 'Upgradeable'
                        : 'Non-upgradeable'}
                    </Badge>
                    <Badge variant="outline" className="bg-white dark:bg-black">
                      {data.securityMetrics.hasAccessControl
                        ? 'Access Control'
                        : 'No Access Control'}
                    </Badge>
                  </div>
                </div>

                {data.securityMetrics.riskFactors.length > 0 && (
                  <div className="space-y-3">
                    <p className="text-sm font-medium text-[#666666] dark:text-[#888888]">
                      Security Considerations
                    </p>
                    <div className="space-y-2">
                      {data.securityMetrics.riskFactors.map((factor, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 text-sm"
                        >
                          <AlertTriangle className="w-4 h-4 text-amber-500" />
                          <span className="text-[#666666] dark:text-[#888888]">
                            {factor}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </motion.div>

          {/* Function Distribution Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-8 bg-white dark:bg-black border-dashed h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-500/10">
                  <Code2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Function Analysis</h3>
                  <p className="text-sm text-[#666666] dark:text-[#888888]">
                    Distribution of contract functions
                  </p>
                </div>
              </div>

              <div className="h-[240px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={functionDistributionData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {functionDistributionData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                          className="stroke-white dark:stroke-black stroke-2"
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        background: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                      }}
                    />
                    <Legend
                      verticalAlign="bottom"
                      height={36}
                      formatter={(value) => (
                        <span className="text-sm text-[#666666] dark:text-[#888888]">
                          {value}
                        </span>
                      )}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </motion.div>

          {/* Facet Analysis Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="p-8 bg-white dark:bg-black border-dashed h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-lg bg-purple-50 dark:bg-purple-500/10">
                  <Boxes className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Facet Analysis</h3>
                  <p className="text-sm text-[#666666] dark:text-[#888888]">
                    Contract facet distribution
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6">
                <StatBox
                  label="Largest"
                  value={data.facetAnalysis.largest.count}
                  description={data.facetAnalysis.largest.name}
                />
                <StatBox
                  label="Smallest"
                  value={data.facetAnalysis.smallest.count}
                  description={data.facetAnalysis.smallest.name}
                />
                <StatBox
                  label="Average"
                  value={data.facetAnalysis.averageSize}
                  description="functions/facet"
                />
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Second Row - New Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Facet Size Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="p-8 bg-white dark:bg-black border-dashed">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-lg bg-indigo-50 dark:bg-indigo-500/10">
                  <BarChart2 className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">
                    Facet Size Distribution
                  </h3>
                  <p className="text-sm text-[#666666] dark:text-[#888888]">
                    Function count per facet
                  </p>
                </div>
              </div>

              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data.facetAnalysis.distribution}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="name"
                      angle={-45}
                      textAnchor="end"
                      height={70}
                      interval={0}
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#818cf8" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </motion.div>

          {/* Function Complexity Analysis */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="p-8 bg-white dark:bg-black border-dashed">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-lg bg-rose-50 dark:bg-rose-500/10">
                  <Activity className="w-6 h-6 text-rose-600 dark:text-rose-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Function Complexity</h3>
                  <p className="text-sm text-[#666666] dark:text-[#888888]">
                    Parameter count distribution
                  </p>
                </div>
              </div>

              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data.functionComplexity}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="params" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="count"
                      fill="#f43f5e"
                      fillOpacity={0.2}
                      stroke="#f43f5e"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Third Row - More Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Function Type Breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="p-8 bg-white dark:bg-black border-dashed">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-500/10">
                  <Code className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Function Types</h3>
                  <p className="text-sm text-[#666666] dark:text-[#888888]">
                    Mutability breakdown
                  </p>
                </div>
              </div>

              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <Treemap
                    data={data.functionTypes}
                    dataKey="value"
                    nameKey="name"
                    content={<CustomizedContent />}
                  >
                    <Tooltip />
                  </Treemap>
                </ResponsiveContainer>
              </div>
            </Card>
          </motion.div>

          {/* Event Analysis */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Card className="p-8 bg-white dark:bg-black border-dashed">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-500/10">
                  <Radio className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Event Coverage</h3>
                  <p className="text-sm text-[#666666] dark:text-[#888888]">
                    Events per facet
                  </p>
                </div>
              </div>

              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data.eventAnalysis}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="events"
                      stroke="#10b981"
                      strokeWidth={2}
                      dot={{ fill: '#10b981' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </motion.div>

          {/* Interface Compliance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Card className="p-8 bg-white dark:bg-black border-dashed">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-lg bg-sky-50 dark:bg-sky-500/10">
                  <CheckCircle2 className="w-6 h-6 text-sky-600 dark:text-sky-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">
                    Interface Compliance
                  </h3>
                  <p className="text-sm text-[#666666] dark:text-[#888888]">
                    Standard interfaces detected
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {data.interfaceCompliance.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <span className="text-sm">{item.name}</span>
                    <Badge
                      variant="outline"
                      className={
                        item.compliant
                          ? 'bg-sky-50 text-sky-600'
                          : 'bg-gray-50 text-gray-600'
                      }
                    >
                      {item.compliant ? 'Compliant' : 'Not Found'}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

function StatBox({
  label,
  value,
  description,
}: {
  label: string
  value: number
  description: string
}) {
  return (
    <div className="space-y-1.5">
      <p className="text-sm text-[#666666] dark:text-[#888888]">{label}</p>
      <p className="text-2xl font-semibold tabular-nums">{value}</p>
      <p
        className="text-xs text-[#666666] dark:text-[#888888] truncate"
        title={description}
      >
        {description}
      </p>
    </div>
  )
}
