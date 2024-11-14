'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"

const contributors = [
  { name: 'Alice', image: '/placeholder.svg?height=60&width=60' },
  { name: 'Bob', image: '/placeholder.svg?height=60&width=60' },
  { name: 'Charlie', image: '/placeholder.svg?height=60&width=60' },
  { name: 'Diana', image: '/placeholder.svg?height=60&width=60' },
  { name: 'Ethan', image: '/placeholder.svg?height=60&width=60' },
  { name: 'Fiona', image: '/placeholder.svg?height=60&width=60' },
]

export default function LandingPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-white text-black flex flex-col items-center justify-between p-4">
      <div className="flex-grow flex flex-col items-center justify-center w-full overflow-hidden">
        <h1 className="text-[12vw] sm:text-[10vw] md:text-[8vw] lg:text-[6vw] font-bold text-center relative leading-tight mb-4">
          Hey Believe!
        </h1>
        <p className="text-[2.5vw] sm:text-[2vw] md:text-[1.6vw] lg:text-[1.2vw] font-mono max-w-[80%] text-center px-4">
          <span className="text-green-600">{'>'}</span> we are a group of mavericks open sourcing the future of decentralized intelligent systems
        </p>
      </div>
      
      <div className="w-full max-w-3xl mx-auto flex flex-col items-center space-y-12 mb-8">
        <Button variant="outline" size="lg" className="text-black border-black hover:bg-black hover:text-white transition-colors">
          See Open Source Projects
        </Button>
        
        <section className="w-full">
          <h2 className="text-xl font-bold mb-4 text-center">Contributors</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {contributors.map((contributor, index) => (
              <div key={index} className="flex flex-col items-center">
                <Image
                  src={contributor.image}
                  alt={contributor.name}
                  width={48}
                  height={48}
                  className="rounded-full mb-1"
                />
                <span className="text-xs">{contributor.name}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      <footer className="w-full max-w-3xl mx-auto flex justify-between items-center border-t pt-4 mt-8">
        <div className="text-sm text-gray-600">© {new Date().getFullYear()} Believe</div>
        <div className="flex items-center space-x-4">
          <a href="#" className="text-sm text-black hover:text-gray-600 transition-colors">Join Us</a>
          <a href="https://x.com/BelieveProject" target="_blank" rel="noopener noreferrer" className="text-black hover:text-gray-600 transition-colors">
            <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5 fill-current"><g><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></g></svg>
            <span className="sr-only">X (formerly Twitter)</span>
          </a>
        </div>
      </footer>
    </div>
  )
}