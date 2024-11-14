'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ProjectsSidebar } from '@/components/projects-sidebar'
import { getContributors } from '@/lib/data'
import { XIcon, GithubIcon } from 'lucide-react'

// Animation duration variable (in seconds)
const ANIMATION_DURATION = 3

// Define all keyframes
const inkDropKeyframes = `
:root {
  --animation-duration: ${ANIMATION_DURATION}s;
}

@keyframes inkDrop {
  0% { 
    clip-path: circle(0% at 50% 0%);
    opacity: 0;
    transform: translateY(-20px);
  }
  10% {
    opacity: 1;
    transform: translateY(0);
    clip-path: circle(2% at 50% 0%);
  }
  15% {
    clip-path: circle(2% at 50% 10%);
  }
  20% {
    clip-path: ellipse(15% 8% at 50% 20%);
  }
  25% {
    clip-path: ellipse(25% 15% at 50% 30%);
  }
  30% {
    clip-path: ellipse(35% 25% at 50% 40%);
  }
  35% {
    clip-path: ellipse(45% 35% at 50% 50%);
  }
  40% {
    clip-path: ellipse(55% 45% at 50% 60%);
  }
  45% {
    clip-path: ellipse(65% 60% at 50% 70%);
  }
  50% {
    clip-path: ellipse(75% 75% at 50% 80%);
  }
  60% {
    clip-path: ellipse(85% 90% at 50% 90%);
  }
  70%, 100% {
    clip-path: ellipse(100% 100% at 50% 100%);
  }
}

@keyframes inkSplash {
  0%, 15% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0);
  }
  20% {
    opacity: 0.3;
    transform: translate(-50%, -50%) scale(1.2);
  }
  35% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(2);
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(2);
  }
}

@keyframes inkRipple {
  0%, 20% {
    opacity: 0;
    transform: scale(1);
  }
  25% {
    opacity: 0.5;
  }
  50% {
    opacity: 0;
    transform: scale(1.5);
  }
  100% {
    opacity: 0;
    transform: scale(1.5);
  }
}
`

const electricKeyframes = `
@keyframes electricGlow {
  0% { 
    opacity: 0;
    text-shadow: none;
  }
  10%, 15% { 
    opacity: 1;
    text-shadow: 
      0 0 4px #fff,
      0 0 15px #fff,
      0 0 30px #0ff,
      0 0 60px #0ff,
      0 0 80px #0ff;
  }
  20%, 25% {
    opacity: 0.7;
    text-shadow: none;
  }
  30%, 35% {
    opacity: 1;
    text-shadow: 
      0 0 4px #fff,
      0 0 15px #fff,
      0 0 30px #0ff,
      0 0 60px #0ff;
  }
  40%, 100% { 
    opacity: 1;
    text-shadow: none;
  }
}
`

// Combine all keyframes into a single template literal
const combinedKeyframes = `
${inkDropKeyframes}
${electricKeyframes}
`

export default function LandingPage() {
  const [mounted, setMounted] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleProjectsClick = () => {
    setSidebarOpen(true)
  }

  const handleSidebarClose = () => {
    setSidebarOpen(false)
  }

  const contributors = getContributors()

  if (!mounted) return null

  return (
    <>
      <style jsx global>
        {combinedKeyframes}
      </style>
      <div className="min-h-screen bg-white text-black flex flex-col items-center justify-between p-0">
        <div className="flex-grow flex flex-col items-center justify-center w-full px-4 py-12">
          <h1 className="text-[15vw] sm:text-[13vw] md:text-[11vw] lg:text-[9vw] font-bold text-center relative leading-none mb-6">
            <span>He</span>
            <span className="relative inline-block">
              <span className="absolute left-1/2 top-1/2 w-12 h-12 bg-black/10 rounded-full animate-[inkSplash_var(--animation-duration)_ease-out_forwards]" />
              <span className="absolute inset-0 animate-[inkRipple_var(--animation-duration)_ease-out_forwards] border-2 border-black/20 rounded-full" />
              <span className="inline-block animate-[inkDrop_var(--animation-duration)_cubic-bezier(0.4,0,0.2,1)_forwards]">
                y
              </span>
            </span>

            <span> Bel</span>

            <span className="relative inline-block">
              <span className="absolute left-1/2 top-1/2 w-12 h-12 bg-black/10 rounded-full animate-[inkSplash_var(--animation-duration)_ease-out_forwards]" />
              <span className="absolute inset-0 animate-[inkRipple_var(--animation-duration)_ease-out_forwards] border-2 border-black/20 rounded-full" />
              <span className="inline-block animate-[inkDrop_var(--animation-duration)_cubic-bezier(0.4,0,0.2,1)_forwards]">
                i
              </span>
            </span>

            <span>eve</span>

            <span className="relative inline-block">
              <span className="absolute left-1/2 top-1/2 w-12 h-12 bg-black/10 rounded-full animate-[inkSplash_var(--animation-duration)_ease-out_forwards]" />
              <span className="absolute inset-0 animate-[inkRipple_var(--animation-duration)_ease-out_forwards] border-2 border-black/20 rounded-full" />
              <span className="inline-block animate-[inkDrop_var(--animation-duration)_cubic-bezier(0.4,0,0.2,1)_forwards]">
                !
              </span>
            </span>
          </h1>

          <p className="text-[3vw] sm:text-[2.5vw] md:text-[2vw] lg:text-[1.5vw] font-mono max-w-[70%] text-center mb-12">
            <span className="text-green-600">{'>'}</span> we are a group of
            mavericks open sourcing the future of decentralized intelligent
            systems
          </p>

          <Button
            variant={sidebarOpen ? 'default' : 'outline'}
            size="lg"
            onClick={handleProjectsClick}
            className={`border ${
              sidebarOpen ? 'bg-black text-white' : 'border-black text-black'
            } transition-colors w-full sm:w-auto text-lg sm:text-xl py-4 px-6 
            rounded-none font-mono hover:scale-[1.02] transform transition-transform`}
          >
            {sidebarOpen
              ? 'Thanks for checking our projects!'
              : 'See Open Source Projects'}
          </Button>

          <section className="w-full max-w-2xl mx-auto mt-16">
            <h2 className="text-lg font-bold mb-6 text-center font-mono">
              Contributors
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              {contributors.map((contributor, index) => (
                <div key={index} className="flex flex-col items-center">
                  <Image
                    src={contributor.image}
                    alt={contributor.name}
                    width={40}
                    height={40}
                    className="rounded-full hover:scale-110 transition-transform"
                  />
                  <span className="text-xs mt-1 font-mono">
                    {contributor.name}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>

        <footer className="w-full border-t border-gray-200 py-6 px-4">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <div className="text-sm font-mono">
              © {new Date().getFullYear()} Believe
            </div>
            <div className="flex items-center gap-4">
              <a href="#" className="text-sm hover:underline font-mono">
                Join Us
              </a>
              <a
                href="https://github.com/BelieveProject"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
              >
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="w-5 h-5 fill-current"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                <span className="sr-only">GitHub</span>
              </a>
              <a
                href="https://x.com/BelieveProject"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
              >
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="w-5 h-5 fill-current"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                <span className="sr-only">X (formerly Twitter)</span>
              </a>
            </div>
          </div>
        </footer>

        <ProjectsSidebar isOpen={sidebarOpen} onClose={handleSidebarClose} />
      </div>
    </>
  )
}
