'use client'

import React, { useState, useEffect } from 'react'

interface ScrambleTextProps {
  text: string
  scrambleOnHover?: boolean
}

const characters =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+'

export function ScrambleText({
  text,
  scrambleOnHover = false,
}: ScrambleTextProps) {
  const [scrambledText, setScrambledText] = useState(text)
  const [isScrambling, setIsScrambling] = useState(false)

  useEffect(() => {
    if (!isScrambling) {
      setScrambledText(text)
      return
    }

    let iteration = 0
    const maxIterations = 10

    const interval = setInterval(() => {
      setScrambledText((prevText) =>
        prevText
          .split('')
          .map((char, index) => {
            if (index < iteration) {
              return text[index]
            }
            return characters[Math.floor(Math.random() * characters.length)]
          })
          .join(''),
      )

      iteration += 1

      if (iteration >= maxIterations) {
        clearInterval(interval)
        setScrambledText(text)
        setIsScrambling(false)
      }
    }, 50)

    return () => clearInterval(interval)
  }, [text, isScrambling])

  const handleMouseEnter = () => {
    if (scrambleOnHover) {
      setIsScrambling(true)
    }
  }

  return <span onMouseEnter={handleMouseEnter}>{scrambledText}</span>
}
