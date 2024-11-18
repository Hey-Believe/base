'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Package,
  Shield,
  Boxes,
  Activity,
  Code2,
  Radio,
  CheckCircle2,
  BarChart2,
  Code,
  ArrowRight,
  Download,
  Share2,
  AlertTriangle,
  BookOpen,
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  Treemap,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  RadialBarChart,
  RadialBar,
} from 'recharts'
import { useRouter } from 'next/navigation'
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
import { Section } from './components/Section'
import Link from 'next/link'

interface DiamondAnalytics {
  securityMetrics: {
    score: number
    hasUpgradeMechanism: boolean
    hasAccessControl: boolean
    unknownFunctions: number
    riskFactors: string[]
  }
  statistics: {
    totalFacets: number
    uniqueFacets: number
    totalSelectors: number
    totalUnknownSelectors: number
  }
  functionDistribution: {
    total: number
    known: number
    unknown: number
    byFacet: Array<{
      name: string
      count: number
    }>
  }
  facetAnalysis: {
    largest: {
      name: string
      count: number
    }
    smallest: {
      name: string
      count: number
    }
    averageSize: number
    distribution: Array<{
      name: string
      count: number
    }>
  }
  functionComplexity: Array<{
    params: number
    count: number
  }>
  functionTypes: Array<{
    name: string
    value: number
  }>
  eventAnalysis: Array<{
    name: string
    events: number
  }>
  interfaceCompliance: Array<{
    name: string
    compliant: boolean
  }>
  accessPatterns: Array<{
    name: string
    value: number
  }>
  complexityMetrics: {
    averageComplexity: number
    totalFunctions: number
    complexityDistribution: Array<{
      params: number
      count: number
    }>
  }
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

interface FacetSize {
  name: string
  count: number
}

interface StatBoxProps {
  label: string
  value: number
  description: string
}

const StatBox = ({ label, value, description }: StatBoxProps) => {
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

  // Calculate facet analysis with proper typing
  const facetSizes: FacetSize[] = rawData.facets.map((facet: any) => ({
    name:
      facet.name.length > 15 ? facet.name.substring(0, 15) + '...' : facet.name,
    count: facet.statistics.totalSelectors,
  }))

  const largest: FacetSize = facetSizes.reduce(
    (max: FacetSize, current: FacetSize) =>
      current.count > max.count ? current : max,
    facetSizes[0],
  )

  const smallest: FacetSize = facetSizes.reduce(
    (min: FacetSize, current: FacetSize) =>
      current.count < min.count ? current : min,
    facetSizes[0],
  )

  const totalFunctions: number = facetSizes.reduce(
    (sum: number, current: FacetSize) => sum + current.count,
    0,
  )

  const averageSize: number = totalFunctions / facetSizes.length

  // Calculate unique facets count
  const uniqueFacets = new Set(rawData.facets.map((facet: any) => facet.name))
    .size

  return {
    functionDistribution,
    statistics: {
      totalFacets: rawData.facets.length,
      uniqueFacets: uniqueFacets,
      totalSelectors: rawData.statistics.totalSelectors,
      totalUnknownSelectors: rawData.statistics.totalUnknownSelectors,
    },
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
      averageSize: Number(averageSize.toFixed(2)),
      distribution: facetSizes.sort((a, b) => b.count - a.count),
    },
    functionComplexity,
    functionTypes,
    eventAnalysis,
    interfaceCompliance,
    accessPatterns,
    complexityMetrics,
  }
}

const TreemapContent = ({
  x = 0,
  y = 0,
  width = 0,
  height = 0,
  index = 0,
  name,
  value,
}: {
  x?: number
  y?: number
  width?: number
  height?: number
  index?: number
  name?: string
  value?: number
}) => {
  const COLORS = ['#84cc16', '#22c55e', '#14b8a6', '#0ea5e9', '#6366f1']

  if (width < 0 || height < 0) return null

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={COLORS[index % COLORS.length]}
        className="transition-opacity duration-200 hover:opacity-80"
      />
      {width > 50 && height > 25 && (
        <>
          <text
            x={x + width / 2}
            y={y + height / 2}
            textAnchor="middle"
            fill="#fff"
            fontSize={14}
            className="font-medium"
          >
            {name}
          </text>
          <text
            x={x + width / 2}
            y={y + height / 2 + 20}
            textAnchor="middle"
            fill="#fff"
            fontSize={12}
          >
            {value}
          </text>
        </>
      )}
    </g>
  )
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

  const functionDistributionData = data
    ? [
        { name: 'Known', value: data.functionDistribution.known },
        { name: 'Unknown', value: data.functionDistribution.unknown },
      ]
    : []

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#111111]">
      <header className="px-6 h-16 flex items-center bg-white dark:bg-black border-b border-[#eaeaea] dark:border-[#333333]">
        <Link href="/" className="flex items-center gap-2.5">
          <Package className="w-6 h-6" />
          <span className="text-xl font-medium tracking-tight">dop-stick</span>
        </Link>
      </header>

      {/* Hero Section */}
      <div className="relative overflow-hidden border-b border-[#eaeaea] dark:border-[#333333] bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Main Title */}
            <div className="space-y-4">
              <h1 className="text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
                Contract Analysis
              </h1>
              <p className="text-xl text-[#666666] dark:text-[#888888] max-w-2xl">
                Comprehensive insights and metrics for your Diamond contract
                implementation.
              </p>
            </div>

            {/* Key Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Security Score */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="relative group"
              >
                <div className="p-6 rounded-lg border border-[#eaeaea] dark:border-[#333333] bg-white dark:bg-black hover:border-[#666666] dark:hover:border-[#666666] transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-500/10">
                      <Shield className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-sm text-[#666666] dark:text-[#888888]">
                        Security Score
                      </p>
                      <p className="text-3xl font-bold tabular-nums">
                        {data?.securityMetrics.score}
                        <span className="text-base font-normal text-[#666666] dark:text-[#888888]">
                          %
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Function Count */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="relative group"
              >
                <div className="p-6 rounded-lg border border-[#eaeaea] dark:border-[#333333] bg-white dark:bg-black hover:border-[#666666] dark:hover:border-[#666666] transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-500/10">
                      <Code2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm text-[#666666] dark:text-[#888888]">
                        Total Functions
                      </p>
                      <p className="text-3xl font-bold tabular-nums">
                        {data?.statistics.totalSelectors}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Facet Count */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="relative group"
              >
                <div className="p-6 rounded-lg border border-[#eaeaea] dark:border-[#333333] bg-white dark:bg-black hover:border-[#666666] dark:hover:border-[#666666] transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-purple-50 dark:bg-purple-500/10">
                      <Boxes className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <p className="text-sm text-[#666666] dark:text-[#888888]">
                        Total Facets
                      </p>
                      <div className="flex items-baseline gap-2">
                        <p className="text-3xl font-bold tabular-nums">
                          {data?.statistics.totalFacets}
                        </p>
                        <span className="text-sm text-[#666666] dark:text-[#888888]">
                          ({data?.statistics.uniqueFacets} unique)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Complexity Score */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="relative group"
              >
                <div className="p-6 rounded-lg border border-[#eaeaea] dark:border-[#333333] bg-white dark:bg-black hover:border-[#666666] dark:hover:border-[#666666] transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-500/10">
                      <Activity className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                    </div>
                    <div>
                      <p className="text-sm text-[#666666] dark:text-[#888888]">
                        Complexity
                      </p>
                      <p className="text-3xl font-bold tabular-nums">
                        {data?.complexityMetrics.averageComplexity.toFixed(1)}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-4 pt-4">
              <Button
                variant="outline"
                className="group hover:border-[#666666] dark:hover:border-[#666666]"
              >
                View Details
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Report Sections */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <Section
          title="Security Analysis"
          description="Comprehensive security assessment of your contract"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="p-8 bg-white dark:bg-black border-dashed">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h3 className="text-lg font-semibold">Security Score</h3>
                    <p className="text-sm text-[#666666] dark:text-[#888888]">
                      Overall security assessment
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-500/10">
                    <Shield className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                  </div>
                </div>

                <div className="relative pt-2">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-5xl font-bold tabular-nums">
                      {data?.securityMetrics.score}
                    </span>
                    <SecurityBadge score={data?.securityMetrics.score || 0} />
                  </div>

                  <div className="space-y-4 mt-8">
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={
                          data?.securityMetrics.hasAccessControl
                            ? 'success'
                            : 'secondary'
                        }
                      >
                        Access Control
                      </Badge>
                      <Badge
                        variant={
                          data?.securityMetrics.hasUpgradeMechanism
                            ? 'success'
                            : 'secondary'
                        }
                      >
                        Upgrade Mechanism
                      </Badge>
                    </div>

                    {data?.securityMetrics.riskFactors.map((factor, index) => (
                      <SecurityInsight
                        key={index}
                        message={factor}
                        severity={
                          index === 0 ? 'high' : index === 1 ? 'medium' : 'low'
                        }
                      />
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-8 bg-white dark:bg-black border-dashed">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h3 className="text-lg font-semibold">Access Patterns</h3>
                    <p className="text-sm text-[#666666] dark:text-[#888888]">
                      Function access control distribution
                    </p>
                  </div>
                </div>

                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadialBarChart
                      cx="50%"
                      cy="50%"
                      innerRadius="20%"
                      outerRadius="90%"
                      barSize={20}
                      data={data?.accessPatterns.map((item, index) => ({
                        name: item.name,
                        value: item.value,
                        fill: COLORS[index % COLORS.length],
                      }))}
                    >
                      <RadialBar
                        label={{
                          position: 'insideStart',
                          fill: '#fff',
                          fontSize: 12,
                        }}
                        background
                        dataKey="value"
                      />
                      <Tooltip
                        formatter={(value, name) => [
                          `${value} functions`,
                          name,
                        ]}
                      />
                      <Legend
                        iconSize={10}
                        layout="vertical"
                        verticalAlign="middle"
                        align="right"
                      />
                    </RadialBarChart>
                  </ResponsiveContainer>
                </div>

                {/* Add summary stats below the chart */}
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-900">
                    <p className="text-sm text-[#666666] dark:text-[#888888]">
                      Protected Functions
                    </p>
                    <p className="text-2xl font-bold">
                      {data?.accessPatterns.find((p) => p.name === 'Protected')
                        ?.value || 0}
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-900">
                    <p className="text-sm text-[#666666] dark:text-[#888888]">
                      Public Functions
                    </p>
                    <p className="text-2xl font-bold">
                      {data?.accessPatterns.find((p) => p.name === 'Public')
                        ?.value || 0}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </Section>

        <Section
          title="Function Analysis"
          description="Detailed breakdown of function distribution and complexity"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="p-8 bg-white dark:bg-black border-dashed">
              {/* Function Distribution */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h3 className="text-lg font-semibold">
                      Function Distribution
                    </h3>
                    <p className="text-sm text-[#666666] dark:text-[#888888]">
                      Breakdown by function type
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-500/10">
                    <Code2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>

                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={data?.functionTypes}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {data?.functionTypes.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </Card>

            <Card className="p-8 bg-white dark:bg-black border-dashed">
              {/* Complexity Analysis */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h3 className="text-lg font-semibold">
                      Complexity Analysis
                    </h3>
                    <p className="text-sm text-[#666666] dark:text-[#888888]">
                      Parameter count distribution
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-purple-50 dark:bg-purple-500/10">
                    <Activity className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                </div>

                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data?.functionComplexity}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="params" />
                      <YAxis />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="count"
                        fill="#818cf8"
                        fillOpacity={0.2}
                        stroke="#818cf8"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </Card>
          </div>
        </Section>

        <Section
          title="Event Analysis"
          description="Event emission patterns and coverage"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Event Distribution Card */}
            <Card className="p-8 bg-white dark:bg-black border-dashed">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h3 className="text-lg font-semibold">
                      Event Distribution
                    </h3>
                    <p className="text-sm text-[#666666] dark:text-[#888888]">
                      Events per facet
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-violet-50 dark:bg-violet-500/10">
                    <Radio className="w-6 h-6 text-violet-600 dark:text-violet-400" />
                  </div>
                </div>

                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data?.eventAnalysis}>
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
                      <Bar
                        dataKey="events"
                        fill="#8b5cf6"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </Card>

            {/* Event Coverage Stats */}
            <Card className="p-8 bg-white dark:bg-black border-dashed">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h3 className="text-lg font-semibold">Event Coverage</h3>
                    <p className="text-sm text-[#666666] dark:text-[#888888]">
                      Event emission statistics
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <StatBox
                    label="Total Events"
                    value={
                      data?.eventAnalysis.reduce(
                        (sum, item) => sum + item.events,
                        0,
                      ) || 0
                    }
                    description="Across all facets"
                  />
                  <StatBox
                    label="Facets with Events"
                    value={data?.eventAnalysis.length || 0}
                    description="Out of total facets"
                  />
                </div>

                <div className="space-y-3">
                  <h4 className="text-sm font-medium">Top Event Emitters</h4>
                  {data?.eventAnalysis
                    .sort((a, b) => b.events - a.events)
                    .slice(0, 3)
                    .map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-900"
                      >
                        <span className="text-sm font-medium">{item.name}</span>
                        <Badge variant="secondary">{item.events} events</Badge>
                      </div>
                    ))}
                </div>
              </div>
            </Card>
          </div>
        </Section>

        {/* Facet Analysis */}
        <Section
          title="Facet Analysis"
          description="Distribution of functions across facets"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Facet Size Distribution */}
            <Card className="p-8 bg-white dark:bg-black border-dashed">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h3 className="text-lg font-semibold">
                      Facet Size Distribution
                    </h3>
                    <p className="text-sm text-[#666666] dark:text-[#888888]">
                      Functions per facet
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-500/10">
                    <Boxes className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-6">
                  <StatBox
                    label="Largest"
                    value={data?.facetAnalysis.largest.count || 0}
                    description={data?.facetAnalysis.largest.name || ''}
                  />
                  <StatBox
                    label="Smallest"
                    value={data?.facetAnalysis.smallest.count || 0}
                    description={data?.facetAnalysis.smallest.name || ''}
                  />
                  <StatBox
                    label="Average"
                    value={data?.facetAnalysis.averageSize || 0}
                    description="functions/facet"
                  />
                </div>

                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data?.facetAnalysis.distribution}>
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
                      <Bar
                        dataKey="count"
                        fill="#3b82f6"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </Card>

            {/* Facet Complexity Map */}
            <Card className="p-8 bg-white dark:bg-black border-dashed">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h3 className="text-lg font-semibold">
                      Facet Complexity Map
                    </h3>
                    <p className="text-sm text-[#666666] dark:text-[#888888]">
                      Size and complexity visualization
                    </p>
                  </div>
                </div>

                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <Treemap
                      data={data?.facetAnalysis.distribution}
                      dataKey="count"
                      nameKey="name"
                      content={<TreemapContent />}
                    >
                      <Tooltip />
                    </Treemap>
                  </ResponsiveContainer>
                </div>
              </div>
            </Card>
          </div>
        </Section>
      </div>
    </div>
  )
}

function KeyMetric({
  label,
  value,
  trend,
  suffix = '',
}: {
  label: string
  value: number | string
  trend?: { value: number; positive: boolean }
  suffix?: string
}) {
  return (
    <div className="space-y-2">
      <p className="text-sm text-[#666666] dark:text-[#888888]">{label}</p>
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-bold tabular-nums">
          {value}
          {suffix}
        </span>
        {trend && (
          <span
            className={`text-sm ${
              trend.positive ? 'text-emerald-500' : 'text-red-500'
            }`}
          >
            {trend.positive ? '+' : '-'}
            {trend.value}%
          </span>
        )}
      </div>
    </div>
  )
}

function SecurityInsight({
  message,
  severity,
}: {
  message: string
  severity: 'high' | 'medium' | 'low'
}) {
  const severityColors = {
    high: 'text-red-500 bg-red-50 dark:bg-red-500/10',
    medium: 'text-amber-500 bg-amber-50 dark:bg-amber-500/10',
    low: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10',
  }

  return (
    <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-900">
      <div className={`p-1 rounded ${severityColors[severity]}`}>
        <AlertTriangle className="w-4 h-4" />
      </div>
      <p className="text-sm">{message}</p>
    </div>
  )
}

function SecurityBadge({ score }: { score: number }) {
  let color = 'emerald'
  let text = 'Excellent'

  if (score < 60) {
    color = 'red'
    text = 'At Risk'
  } else if (score < 80) {
    color = 'amber'
    text = 'Fair'
  }

  return (
    <Badge
      className={`
        h-7 px-3 
        ${
          color === 'emerald'
            ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400'
            : ''
        }
        ${
          color === 'amber'
            ? 'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400'
            : ''
        }
        ${
          color === 'red'
            ? 'bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400'
            : ''
        }
      `}
    >
      {text}
    </Badge>
  )
}
