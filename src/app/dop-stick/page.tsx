'use client'

import {
  ArrowRight,
  Book,
  Github,
  Package,
  Zap,
  Shield,
  RefreshCw,
  ArrowUpCircle,
  Terminal,
  Code,
  Cpu,
  GitBranch,
} from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

// Mock DopStick class (replace this with actual import when available)
class DopStick {
  async upgrade(contractName: string) {
    console.log(`Upgrading ${contractName}...`)
    // Actual upgrade logic would go here
  }
}

const commands = [
  'npm install dop-stick',
  "import { DopStick } from 'dop-stick'",
  'const dopStick = new DopStick()',
  "await dopStick.upgrade('MyContract')",
]

const quickstartCode = `import { DopStick } from 'dop-stick';

const dopStick = new DopStick();

async function upgradeContract() {
  try {
    await dopStick.upgrade('MyContract');
    console.log('Upgrade successful!');
  } catch (error) {
    console.error('Upgrade failed:', error);
  }
}

upgradeContract();`

export default function Component() {
  const [commandIndex, setCommandIndex] = useState(0)
  const [typedCommand, setTypedCommand] = useState('')
  const [typedQuickstart, setTypedQuickstart] = useState('')

  useEffect(() => {
    const typeCommand = () => {
      const currentCommand = commands[commandIndex]
      if (typedCommand.length < currentCommand.length) {
        setTypedCommand(currentCommand.slice(0, typedCommand.length + 1))
      } else {
        setTimeout(() => {
          setTypedCommand('')
          setCommandIndex((prevIndex) => (prevIndex + 1) % commands.length)
        }, 1000)
      }
    }

    const timer = setTimeout(typeCommand, 100)
    return () => clearTimeout(timer)
  }, [commandIndex, typedCommand])

  useEffect(() => {
    if (typedQuickstart.length < quickstartCode.length) {
      const timer = setTimeout(() => {
        setTypedQuickstart(quickstartCode.slice(0, typedQuickstart.length + 1))
      }, 30)
      return () => clearTimeout(timer)
    }
  }, [typedQuickstart])

  return (
    <div className="flex flex-col min-h-screen bg-black text-white font-['Fira_Code',_monospace]">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;500;600;700&display=swap');
      `}</style>
      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/95 backdrop-blur">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <Link className="flex items-center justify-center" href="#">
              <Package className="h-6 w-6 mr-2" />
              <span className="font-bold text-lg">dop-stick</span>
            </Link>
            <nav className="hidden md:flex items-center space-x-6 text-sm">
              <Link className="hover:text-gray-300" href="#features">
                Features
              </Link>
              <Link className="hover:text-gray-300" href="#quickstart">
                Quick Start
              </Link>
              <Link className="hover:text-gray-300" href="#faq">
                FAQ
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                className="border-white text-white hover:bg-white hover:text-black"
              >
                Login
              </Button>
              <Button
                size="sm"
                className="bg-white text-black hover:bg-gray-200"
              >
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="relative py-20 md:py-32 overflow-hidden bg-black">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#333_1px,transparent_1px),linear-gradient(to_bottom,#333_1px,transparent_1px)] bg-[size:20px_20px]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_-40%,#1b1b1b,transparent)]" />
          </div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">dop-stick</h1>
            <p className="text-xl mb-8 text-gray-300">
              Simplify your diamond contract upgrades with ease and precision.
            </p>
            <div className="mb-8 max-w-lg mx-auto">
              <div className="rounded-md border border-white/20 bg-black/50 backdrop-blur-sm p-2">
                <SyntaxHighlighter
                  language="javascript"
                  style={tomorrow}
                  customStyle={{
                    background: 'transparent',
                    padding: '0.5rem',
                    margin: 0,
                    height: '2.5em',
                    display: 'flex',
                    alignItems: 'center',
                    fontFamily: "'Fira Code', monospace",
                  }}
                >
                  {typedCommand}
                </SyntaxHighlighter>
              </div>
            </div>
            <div className="flex justify-center space-x-4">
              <Button
                size="lg"
                className="bg-white text-black hover:bg-gray-200"
              >
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-black"
              >
                View on GitHub
                <Github className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>
        <section id="features" className="py-16 bg-white text-black">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Features</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="bg-gray-50 border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                <CardContent className="p-6">
                  <Zap className="h-8 w-8 mb-4 text-black" />
                  <h3 className="text-xl font-semibold mb-2">
                    Easy Integration
                  </h3>
                  <p className="text-gray-600">
                    Seamlessly integrate with your existing infrastructure
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-gray-50 border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                <CardContent className="p-6">
                  <Shield className="h-8 w-8 mb-4 text-black" />
                  <h3 className="text-xl font-semibold mb-2">Security First</h3>
                  <p className="text-gray-600">
                    Implement a robust approach for reliable upgrades
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-gray-50 border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                <CardContent className="p-6">
                  <RefreshCw className="h-8 w-8 mb-4 text-black" />
                  <h3 className="text-xl font-semibold mb-2">
                    Efficient Management
                  </h3>
                  <p className="text-gray-600">
                    Track and manage upgrades with ease
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-gray-50 border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                <CardContent className="p-6">
                  <ArrowUpCircle className="h-8 w-8 mb-4 text-black" />
                  <h3 className="text-xl font-semibold mb-2">
                    Seamless Rollback
                  </h3>
                  <p className="text-gray-600">
                    Revert changes quickly if needed
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section id="quickstart" className="py-16 bg-black">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">
              Quick Start
            </h2>
            <div className="grid md:grid-cols-2 gap-8 items-start">
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="bg-gray-700 p-2 rounded-full">
                    <Terminal className="h-6 w-6 text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Install dop-stick
                    </h3>
                    <code className="bg-gray-700 px-2 py-1 rounded text-sm">
                      npm install dop-stick
                    </code>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-gray-700 p-2 rounded-full">
                    <Code className="h-6 w-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Import and initialize
                    </h3>
                    <code className="bg-gray-700 px-2 py-1 rounded text-sm">
                      import {'{ DopStick }'} from 'dop-stick'
                    </code>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-gray-700 p-2 rounded-full">
                    <Cpu className="h-6 w-6 text-yellow-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Create an instance
                    </h3>
                    <code className="bg-gray-700 px-2 py-1 rounded text-sm">
                      const dopStick = new DopStick()
                    </code>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-gray-700 p-2 rounded-full">
                    <GitBranch className="h-6 w-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Upgrade your contract
                    </h3>
                    <code className="bg-gray-700 px-2 py-1 rounded text-sm">
                      await dopStick.upgrade('MyContract')
                    </code>
                  </div>
                </div>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg">
                <SyntaxHighlighter
                  language="javascript"
                  style={tomorrow}
                  customStyle={{
                    background: 'transparent',
                    padding: '1rem',
                    borderRadius: '0.5rem',
                    minHeight: '200px',
                  }}
                >
                  {typedQuickstart}
                </SyntaxHighlighter>
              </div>
            </div>
          </div>
        </section>
        <section id="faq" className="py-16 bg-gray-50 text-black">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">FAQ</h2>
            <div className="space-y-8 max-w-3xl mx-auto">
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  What is a diamond contract?
                </h3>
                <p className="text-gray-600">
                  A diamond contract is a smart contract architecture that
                  allows for modular and upgradeable contracts, separating logic
                  into multiple facets for easier maintenance.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  How does dop-stick ensure upgrade safety?
                </h3>
                <p className="text-gray-600">
                  Dop-stick implements various safety checks, including
                  signature verification, gas estimation, and dry runs before
                  applying upgrades, with rollback functionality for unexpected
                  issues.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Can I use dop-stick with existing diamond contracts?
                </h3>
                <p className="text-gray-600">
                  Yes, dop-stick is designed to work with both new and existing
                  diamond contracts, analyzing your current structure for a
                  seamless upgrade path.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="py-16 bg-white text-black">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">
              Ready to simplify your diamond contract upgrades?
            </h2>
            <p className="mb-8 text-lg">
              Join thousands of developers who trust dop-stick for their smart
              contract management.
            </p>
            <Button size="lg" className="bg-black text-white hover:bg-gray-800">
              Get Started Now
            </Button>
          </div>
        </section>
      </main>
      <footer className="border-t border-white/10 bg-black">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <Package className="h-6 w-6 mr-2" />
              <span className="font-bold text-lg">dop-stick</span>
            </div>
            <nav className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
              <Link className="hover:text-white" href="#">
                Documentation
              </Link>
              <Link className="hover:text-white" href="#">
                GitHub
              </Link>
              <Link className="hover:text-white" href="#">
                npm Package
              </Link>
              <Link className="hover:text-white" href="#">
                Terms of Service
              </Link>
              <Link className="hover:text-white" href="#">
                Privacy Policy
              </Link>
            </nav>
          </div>
          <div className="mt-8 text-center text-sm text-gray-400">
            © 2024 dop-stick. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
