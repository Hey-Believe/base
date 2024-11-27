'use client'

import { CodeBlock } from '../components/doc-components'
import { Shield, Cog, Zap, RefreshCw, FileJson, Network } from 'lucide-react'
import { motion } from 'framer-motion'

interface ConfigSectionProps {
  id: string
  icon: React.ReactNode
  title: string
  description: string
  children: React.ReactNode
  index: number
}

function ConfigSection({
  id,
  icon,
  title,
  description,
  children,
  index,
}: ConfigSectionProps) {
  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="scroll-mt-20 space-y-6"
    >
      <div className="flex flex-col gap-4 pb-4 border-b border-zinc-200 dark:border-zinc-800">
        <motion.div
          className="flex items-center gap-3"
          whileHover={{ x: 10 }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        >
          <motion.div
            className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {icon}
          </motion.div>
          <div>
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
              {title}
            </h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              {description}
            </p>
          </div>
        </motion.div>
      </div>
      <motion.div
        className="space-y-6 pl-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}

export default function ConfigurationPage() {
  return (
    <motion.div
      className="max-w-4xl mx-auto py-12 px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="space-y-2 mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
          Configuration
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400">
          Complete guide to configuring your Dop-Stick environment
        </p>
      </motion.div>

      <div className="space-y-16">
        <ConfigSection
          index={0}
          id="compiler"
          icon={<Cog className="w-5 h-5 text-zinc-500" />}
          title="Compiler Settings"
          description="Configure the Solidity compiler options and optimization settings"
        >
          <CodeBlock language="typescript">
            {`compiler?: {
    version?: string;              // Solidity version
    name?: string;                 // 'hardhat', 'foundry', 'truffle'
    compileCommand?: string;       // e.g., 'npx hardhat compile'
    skip?: boolean;                // Skip compilation
    optimization?: {
        enabled?: boolean;
        runs?: number;
    }
}`}
          </CodeBlock>
        </ConfigSection>

        <ConfigSection
          index={1}
          id="paths"
          icon={<FileJson className="w-5 h-5 text-zinc-500" />}
          title="Mode & Paths"
          description="Set the operation mode and configure essential file paths"
        >
          <CodeBlock language="typescript">
            {`mode?: 'basic' | 'strict' | 'auto-pilot-beta' | 'copilot-beta'

paths: {
    upgrades: string;      // Required: Path to upgrade definitions
    typechain?: string;    // TypeChain output directory
    contracts?: string;    // Solidity contracts directory
    artifacts?: string;    // Compiled artifacts directory
    cache?: string;        // Cache directory
    reports?: string;      // Reports output directory
}`}
          </CodeBlock>
        </ConfigSection>

        <ConfigSection
          index={2}
          id="security"
          icon={<Shield className="w-5 h-5 text-zinc-500" />}
          title="Security Settings"
          description="Configure security validations and checks"
        >
          <CodeBlock language="typescript">
            {`security?: {
    ownershipValidation?: boolean;
    selectorCollisionCheck?: boolean;
    facetAddressValidation?: boolean;
    estimateGasBeforeUpgrade?: boolean;
    verifyContracts?: boolean;
}`}
          </CodeBlock>
        </ConfigSection>

        <ConfigSection
          index={3}
          id="gas"
          icon={<Zap className="w-5 h-5 text-zinc-500" />}
          title="Gas & Performance"
          description="Optimize gas usage and parallel execution settings"
        >
          <CodeBlock language="typescript">
            {`gas?: {
    maxRetries?: number;
    maxFeePerGas?: string;
    maxPriorityFeePerGas?: string;
}

parallelization?: {
    enabled?: boolean;
    maxConcurrent?: number;
}`}
          </CodeBlock>
        </ConfigSection>

        <ConfigSection
          index={4}
          id="retry"
          icon={<RefreshCw className="w-5 h-5 text-zinc-500" />}
          title="Retry & Error Handling"
          description="Configure retry behavior and error handling strategies"
        >
          <CodeBlock language="typescript">
            {`retry?: {
    enabled?: boolean;
    maxRetries?: number;
    retryDelay?: number;
    exponentialBackoff?: boolean;
    maxDelay?: number;
}`}
          </CodeBlock>
        </ConfigSection>

        <ConfigSection
          index={5}
          id="verification"
          icon={<Network className="w-5 h-5 text-zinc-500" />}
          title="Contract Verification"
          description="Configure contract verification settings for Etherscan and Sourcify"
        >
          <CodeBlock language="typescript">
            {`verification?: {
    enabled?: boolean;
    etherscan?: {
        apiKey: string;
        delay?: number;
    }
    sourcify?: {
        enabled: boolean;
    }
}`}
          </CodeBlock>
        </ConfigSection>
      </div>
    </motion.div>
  )
}
