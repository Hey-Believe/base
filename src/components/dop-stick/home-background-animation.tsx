'use client'

import React, { useEffect, useRef } from 'react'
import { useTheme } from 'next-themes'

interface Dot {
  x: number
  y: number
  baseX: number
  baseY: number
  vx: number
  vy: number
}

export function BackgroundAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const dotsRef = useRef<Dot[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const animationFrameRef = useRef<number>()
  const { theme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.scale(dpr, dpr)
      initDots()
    }

    const initDots = () => {
      dotsRef.current = []
      const spacing = 20
      const rows = Math.ceil(window.innerHeight / spacing)
      const cols = Math.ceil(window.innerWidth / spacing)

      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          dotsRef.current.push({
            x: j * spacing,
            y: i * spacing,
            baseX: j * spacing,
            baseY: i * spacing,
            vx: 0,
            vy: 0,
          })
        }
      }
    }

    const drawDots = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle =
        theme === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)'

      dotsRef.current.forEach((dot) => {
        ctx.beginPath()
        ctx.arc(dot.x, dot.y, 1, 0, Math.PI * 2)
        ctx.fill()
      })
    }

    const updateDots = () => {
      const mouseX = mouseRef.current.x
      const mouseY = mouseRef.current.y
      const pushRadius = 100
      const pushStrength = 1
      const returnStrength = 0.1

      dotsRef.current.forEach((dot) => {
        const dx = mouseX - dot.x
        const dy = mouseY - dot.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < pushRadius) {
          const force = (1 - distance / pushRadius) * pushStrength
          dot.vx -= (dx * force) / distance
          dot.vy -= (dy * force) / distance
        }

        dot.vx += (dot.baseX - dot.x) * returnStrength
        dot.vy += (dot.baseY - dot.y) * returnStrength

        dot.x += dot.vx
        dot.y += dot.vy

        dot.vx *= 0.9
        dot.vy *= 0.9
      })
    }

    const animate = () => {
      updateDots()
      drawDots()
      animationFrameRef.current = requestAnimationFrame(animate)
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX
      mouseRef.current.y = e.clientY
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    document.addEventListener('mousemove', handleMouseMove)

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      document.removeEventListener('mousemove', handleMouseMove)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [theme])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{
        width: '100vw',
        height: '100vh',
      }}
    />
  )
}
