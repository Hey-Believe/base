'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ProjectsSidebar } from '@/components/projects-sidebar'
import { getContributors } from '@/lib/data'
import { XIcon, GithubIcon } from 'lucide-react'
import { Footer } from '@/components/footer'

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

        <Footer />

        <ProjectsSidebar isOpen={sidebarOpen} onClose={handleSidebarClose} />
      </div>
    </>
  )
}
