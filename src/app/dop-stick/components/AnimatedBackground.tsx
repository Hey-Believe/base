'use client'

import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export function AnimatedBackground() {
  const { theme } = useTheme()
  const [dots, setDots] = useState<
    Array<{ x: number; y: number; size: number }>
  >([])

  useEffect(() => {
    const generateDots = () => {
      const newDots = []
      for (let i = 0; i < 100; i++) {
        newDots.push({
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 3 + 1,
        })
      }
      setDots(newDots)
    }

    generateDots()
  }, [])

  return (
    <div
      className={`absolute inset-0 ${
        theme === 'dark'
          ? 'bg-gradient-radial from-zinc-800 to-zinc-950'
          : 'bg-gradient-radial from-gray-50 to-gray-100'
      }`}
    >
      {dots.map((dot, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full ${
            theme === 'dark' ? 'bg-white/5' : 'bg-black/5'
          }`}
          style={{
            left: `${dot.x}%`,
            top: `${dot.y}%`,
            width: dot.size,
            height: dot.size,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: Math.random() * 4 + 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}
