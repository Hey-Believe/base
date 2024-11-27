'use client'

import { CodeBlock } from '../components/doc-components'
import { ArrowRight } from 'lucide-react'

interface CommandOption {
  flag: string
  description: string
}

interface CommandProps {
  id: string
  name: string
  description: string
  usage: string
  options: CommandOption[]
}

function CommandSection({
  id,
  name,
  description,
  usage,
  options,
}: CommandProps) {
  return (
    <div id={id} className="scroll-mt-20 space-y-6">
      <div className="flex flex-col gap-4 pb-4 border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <ArrowRight className="h-4 w-4 text-zinc-400" />
            <code className="px-2 py-1 text-sm font-medium bg-sky-50 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400 rounded-md">
              {name}
            </code>
          </div>
          <span className="text-base text-zinc-600 dark:text-zinc-400">
            {description}
          </span>
        </div>
      </div>

      <div className="space-y-6 pl-6">
        <div className="space-y-3">
          <div className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
            Usage
          </div>
          <CodeBlock language="bash">{usage}</CodeBlock>
        </div>

        {options.length > 0 && (
          <div className="space-y-3">
            <div className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
              Options
            </div>
            <div className="grid gap-2.5">
              {options.map((option, index) => (
                <div key={index} className="flex items-start gap-3 group">
                  <code
                    className="flex-none px-2 py-0.5 font-mono text-xs 
                                 bg-zinc-100 dark:bg-zinc-800 
                                 text-zinc-700 dark:text-zinc-300
                                 rounded-md transition-colors
                                 group-hover:bg-zinc-200 dark:group-hover:bg-zinc-700"
                  >
                    {option.flag}
                  </code>
                  <span className="text-sm text-zinc-600 dark:text-zinc-400 pt-0.5">
                    {option.description}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function CommandsPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <div className="space-y-2 mb-12">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
          Commands
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400">
          Explore the complete list of DopStick CLI commands and their options
        </p>
      </div>

      <div className="space-y-16">
        <CommandSection
          id="mine"
          name="mine"
          description="Deploy New Diamond"
          usage="dop-stick mine [options]"
          options={[
            {
              flag: '--no-cache',
              description: 'Disable caching during deployment',
            },
            { flag: '--no-compile', description: 'Skip contract compilation' },
          ]}
        />

        <CommandSection
          id="upgrade"
          name="upgrade"
          description="Upgrade Existing Diamond"
          usage="dop-stick upgrade [options]"
          options={[
            { flag: '--no-compile', description: 'Skip contract compilation' },
          ]}
        />

        <CommandSection
          id="info"
          name="info"
          description="Diamond Information"
          usage="dop-stick info [diamondAddress] [rpcUrl] [options]"
          options={[
            { flag: '--json', description: 'Output only JSON format' },
            {
              flag: '--report',
              description: 'Output only human-readable report',
            },
            { flag: '--docs', description: 'Generate detailed documentation' },
            { flag: '--no-cache', description: 'Disable caching' },
            { flag: '--no-compile', description: 'Skip contract compilation' },
          ]}
        />
      </div>
    </div>
  )
}
