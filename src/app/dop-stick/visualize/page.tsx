'use client'

import { useState } from 'react'
import {
  Package,
  Upload,
  FileJson,
  AlertCircle,
  ArrowLeft,
  Check,
} from 'lucide-react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useRouter } from 'next/navigation'
import { toast, Toaster } from 'sonner'

const visualizationOptions = [
  {
    id: 'diamond-info',
    title: 'Diamond Info',
    description:
      'Explore your diamond contract structure with detailed insights',
    icon: <Package className="w-6 h-6" />,
  },
  {
    id: 'upgrade-report',
    title: 'Upgrade Report',
    description: 'Track and analyze diamond upgrade operations',
    icon: <Upload className="w-6 h-6" />,
  },
  {
    id: 'deployment-report',
    title: 'Deployment Report',
    description: 'Review deployment configurations and statistics',
    icon: <FileJson className="w-6 h-6" />,
  },
  {
    id: 'others',
    title: 'Other Visualizations',
    description: 'Discover additional visualization options',
    icon: <AlertCircle className="w-6 h-6" />,
  },
]

export default function VisualizePage() {
  const router = useRouter()
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isHovering, setIsHovering] = useState<string | null>(null)
  const [jsonData, setJsonData] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFileUpload(files[0])
    }
  }

  const handleFileUpload = async (file: File) => {
    try {
      // Reset states
      setError(null)
      setJsonData(null)

      // Validate file type
      if (file.type !== 'application/json') {
        toast.error('Please upload a JSON file')
        return
      }

      // Read and parse the file
      const text = await file.text()
      const data = JSON.parse(text)

      // Check if this is a diamond-info file
      if (selectedOption === 'diamond-info') {
        if (!data.infoHash) {
          toast.error('Invalid file: Not a DOP-Stick deployment info file')
          return
        }

        // Store the data and proceed
        setJsonData(data)
        sessionStorage.setItem('diamondData', text)

        // Success message
        toast.success('File loaded successfully')
      } else {
        // Handle other visualization types
        toast.info(
          `Visualization coming soon for ${
            visualizationOptions.find((opt) => opt.id === selectedOption)
              ?.title || selectedOption
          }`,
        )
      }
    } catch (err) {
      toast.error(
        'Error processing file: ' +
          (err instanceof Error ? err.message : 'Unknown error'),
      )
    }
  }

  const handleProceed = () => {
    if (selectedOption === 'diamond-info' && jsonData) {
      router.push('/dop-stick/visualize/info')
    } else {
      toast.info(
        `Visualization coming soon for ${
          visualizationOptions.find((opt) => opt.id === selectedOption)
            ?.title || selectedOption
        }`,
      )
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white font-mono transition-colors duration-300">
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-b border-black/10 dark:border-white/10"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center">
          <Link
            href="/dop-stick"
            className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            <span>Back</span>
          </Link>
        </div>
      </motion.header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto mb-10 sm:mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-3 sm:mb-4">
            Visualize Your Diamond
          </h1>
          <p className="text-center text-muted-foreground text-base sm:text-lg">
            Choose a visualization type and upload your JSON file to begin
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-12">
          {/* Left side: Visualization Options */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-1 space-y-3 sm:space-y-4"
          >
            {visualizationOptions.map((option) => (
              <motion.div
                key={option.id}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <Card
                  className={`p-4 sm:p-6 cursor-pointer transition-all border
                    ${
                      selectedOption === option.id
                        ? 'border-black dark:border-white bg-black/5 dark:bg-white/5'
                        : 'border-black/5 dark:border-white/5 hover:border-black/10 dark:hover:border-white/10'
                    }
                  `}
                  onClick={() => setSelectedOption(option.id)}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`p-3 rounded-lg transition-colors
                      ${
                        selectedOption === option.id
                          ? 'bg-black dark:bg-white text-white dark:text-black'
                          : 'bg-black/5 dark:bg-white/5 text-muted-foreground'
                      }
                    `}
                    >
                      {option.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="font-semibold truncate">
                          {option.title}
                        </h3>
                        {selectedOption === option.id && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                          >
                            <Check className="w-5 h-5" />
                          </motion.div>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {option.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Right side: Upload Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-1"
          >
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{
                  opacity: selectedOption ? 1 : 0.5,
                  scale: 1,
                }}
                transition={{ duration: 0.2 }}
                className={`h-full ${!selectedOption && 'pointer-events-none'}`}
              >
                <div
                  className={`border-2 border-dashed rounded-lg p-8 lg:p-12 text-center transition-all
                    ${
                      isDragging
                        ? 'border-black dark:border-white bg-black/5 dark:bg-white/5'
                        : 'border-black/10 dark:border-white/10'
                    }
                    ${
                      !isDragging &&
                      selectedOption &&
                      'hover:border-black/20 dark:hover:border-white/20'
                    }
                  `}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <div className="max-w-sm mx-auto">
                    <motion.div
                      animate={{
                        scale: isDragging ? 1.1 : 1,
                        rotate: isDragging ? 5 : 0,
                      }}
                      transition={{ type: 'spring' }}
                    >
                      <FileJson className="w-16 h-16 mx-auto mb-6 text-muted-foreground" />
                    </motion.div>
                    <h3 className="text-xl font-semibold mb-3">
                      Upload your JSON file
                    </h3>
                    {error && (
                      <div className="text-red-500 text-sm mb-4">{error}</div>
                    )}
                    <p className="text-sm text-muted-foreground mb-8">
                      {selectedOption
                        ? 'Drag and drop your file here, or click to browse'
                        : 'Please select a visualization type first'}
                    </p>
                    <input
                      type="file"
                      accept="application/json"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files?.[0]) {
                          handleFileUpload(e.target.files[0])
                        }
                      }}
                      id="file-upload"
                    />
                    <div className="flex gap-4 justify-center">
                      <Button
                        variant="outline"
                        className="border-black dark:border-white hover:bg-black hover:text-white 
                                 dark:hover:bg-white dark:hover:text-black transition-colors"
                        onClick={() =>
                          document.getElementById('file-upload')?.click()
                        }
                        disabled={!selectedOption}
                      >
                        Select File
                      </Button>
                      {jsonData && selectedOption === 'diamond-info' && (
                        <Button
                          className="bg-black text-white dark:bg-white dark:text-black 
                                   hover:bg-black/90 dark:hover:bg-white/90"
                          onClick={handleProceed}
                        >
                          Proceed to Visualization
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      <Toaster position="top-center" />
    </div>
  )
}
