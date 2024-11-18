import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface SectionProps {
  title: string
  description: string
  children: ReactNode
}

export function Section({ title, description, children }: SectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 mb-16"
    >
      <div className="space-y-1">
        <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
        <p className="text-[#666666] dark:text-[#888888]">{description}</p>
      </div>
      {children}
    </motion.div>
  )
}
