'use client'

import { useRouter } from 'next/navigation'
import { Project } from '@/types'

export function ProjectCard(project: Project) {
  const router = useRouter()

  const handleClick = () => {
    if (project.route) {
      router.push(project.route)
    }
  }

  return (
    <div
      onClick={handleClick}
      className="p-4 border-2 border-gray-100 rounded-lg hover:border-black 
                transition-colors cursor-pointer"
    >
      {/* Rest of your card content */}
    </div>
  )
}
