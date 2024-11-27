'use client'

import { useState } from 'react'
import { Check, Copy, Terminal } from 'lucide-react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vs } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { cn } from '@/lib/utils'

interface CodeBlockProps {
  children: string
  language?: string
  filename?: string
}

export function CodeBlock({
  children,
  language = 'bash',
  filename,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(children)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const modernStyle = {
    ...vs,
    'pre[class*="language-"]': {
      ...vs['pre[class*="language-"]'],
      margin: 0,
      padding: '1rem',
      background: 'transparent',
      border: 'none',
      color: 'var(--token-primary)',
    },
    'code[class*="language-"]': {
      ...vs['code[class*="language-"]'],
      fontSize: '0.9rem',
      lineHeight: '1.7',
      fontFamily:
        'JetBrains Mono, Fira Code, Menlo, Monaco, Consolas, monospace',
      fontWeight: '500',
      color: 'inherit',
      background: 'transparent',
      textShadow: 'none',
      border: 'none',
    },
    token: {
      color: 'inherit',
      textShadow: 'none',
    },
    'token.plain-text': { color: 'var(--token-primary)' },
    'token.comment': { color: 'var(--token-comment)' },
    'token.string': { color: 'var(--token-string-literal)' },
    'token.number': { color: 'var(--token-numeric)' },
    'token.builtin': { color: 'var(--token-keyword)' },
    'token.keyword': { color: 'var(--token-keyword)' },
    'token.function': { color: 'var(--token-function)' },
    'token.operator': { color: 'var(--token-operator)' },
    'token.punctuation': { color: 'var(--token-punctuation)' },
    'token.class-name': { color: 'var(--token-class-name)' },
    'token.property': { color: 'var(--token-property)' },
    'token.constant': { color: 'var(--token-constant)' },
    'token.variable': { color: 'var(--token-variable)' },
    'token.plain': { color: 'var(--token-primary)' },
  }

  return (
    <div className="relative group overflow-hidden rounded-lg bg-zinc-50 dark:bg-zinc-900">
      {filename && (
        <div className="flex items-center justify-between px-4 py-2 bg-zinc-100/50 dark:bg-zinc-900/50">
          <div className="flex items-center space-x-2">
            <Terminal className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
            <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              {filename}
            </span>
          </div>
          {language && (
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              {language}
            </span>
          )}
        </div>
      )}
      <div className="relative">
        <div
          className="overflow-x-auto 
          [--token-primary:theme(colors.zinc.600)] 
          dark:[--token-primary:theme(colors.zinc.200)] 
          [--token-comment:theme(colors.zinc.500)] 
          dark:[--token-comment:theme(colors.zinc.400)]
          [--token-keyword:theme(colors.sky.600)]
          dark:[--token-keyword:theme(colors.sky.400)]
          [--token-string-literal:theme(colors.rose.600)]
          dark:[--token-string-literal:theme(colors.rose.400)]
          [--token-function:theme(colors.violet.600)]
          dark:[--token-function:theme(colors.violet.400)]
          [--token-numeric:theme(colors.orange.600)]
          dark:[--token-numeric:theme(colors.orange.400)]
          [--token-constant:theme(colors.orange.600)]
          dark:[--token-constant:theme(colors.orange.400)]
          [--token-punctuation:theme(colors.zinc.500)]
          dark:[--token-punctuation:theme(colors.zinc.300)]
          [--token-property:theme(colors.sky.600)]
          dark:[--token-property:theme(colors.sky.400)]
          [--token-operator:theme(colors.zinc.500)]
          dark:[--token-operator:theme(colors.zinc.300)]
          [--token-variable:theme(colors.rose.600)]
          dark:[--token-variable:theme(colors.rose.400)]
          [--token-class-name:theme(colors.sky.600)]
          dark:[--token-class-name:theme(colors.sky.400)]"
        >
          <SyntaxHighlighter
            language={language}
            style={modernStyle}
            showLineNumbers={false}
            wrapLines={true}
            wrapLongLines={true}
            PreTag="div"
            useInlineStyles={true}
            className="!text-[--token-primary]"
          >
            {children.trim()}
          </SyntaxHighlighter>
        </div>
        <button
          onClick={copyToClipboard}
          className="absolute right-2 top-2 p-2 rounded-md
                     bg-zinc-100 dark:bg-zinc-800
                     hover:bg-zinc-200 dark:hover:bg-zinc-700
                     transition-colors duration-200"
          aria-label="Copy code"
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-500" />
          ) : (
            <Copy className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
          )}
        </button>
      </div>
    </div>
  )
}

export function CommandSection({
  command,
  usage,
  options,
}: {
  command: string
  usage: string
  options: { flag: string; description: string }[]
}) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold tracking-tight">{command}</h3>
      <div className="space-y-2">
        <div className="text-sm text-zinc-600 dark:text-zinc-400">Usage:</div>
        <CodeBlock>{usage}</CodeBlock>
      </div>
      {options.length > 0 && (
        <div className="space-y-2">
          <div className="text-sm text-zinc-600 dark:text-zinc-400">
            Options:
          </div>
          <div className="grid gap-2">
            {options.map((option, index) => (
              <div key={index} className="flex items-start gap-4 text-sm">
                <code className="flex-none px-2 py-1 font-mono text-xs bg-zinc-100 dark:bg-zinc-800 rounded">
                  {option.flag}
                </code>
                <span className="text-zinc-600 dark:text-zinc-400 pt-1">
                  {option.description}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
