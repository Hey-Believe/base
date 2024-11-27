'use client'

import React, { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

interface BlinkingCursorProps {
  className?: string
}

export function BlinkingCursor({ className }: { className?: string }) {
  return (
    <div
      className={cn('w-[3px] bg-current', className)}
      style={{
        animation: 'blink 1s steps(1) infinite',
      }}
    >
      <style jsx>{`
        @keyframes blink {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}
