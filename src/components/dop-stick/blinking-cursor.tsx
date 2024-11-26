'use client'

import React, { useState, useEffect } from 'react'

interface BlinkingCursorProps {
  text: string
}

export function BlinkingCursor({ text }: BlinkingCursorProps) {
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 530) // Blink every 530ms for a natural feel

    return () => clearInterval(interval)
  }, [])

  return (
    <span>
      {text}
      <span
        className={`${
          showCursor ? 'opacity-100' : 'opacity-0'
        } transition-opacity duration-100`}
      >
        |
      </span>
    </span>
  )
}
