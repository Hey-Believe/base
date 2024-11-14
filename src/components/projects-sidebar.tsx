'use client'

import { useEffect } from 'react'
import { X } from 'lucide-react'
import { ProjectCard } from './project-card'
import { getProjects } from '@/lib/data'
import { Project } from '@/types'

interface ProjectsSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function ProjectsSidebar({ isOpen, onClose }: ProjectsSidebarProps) {
  const projects: Project[] = getProjects()

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [onClose])

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed right-0 top-0 h-full w-[480px] max-w-[100vw] bg-white z-50 
                      transform transition-transform duration-300 ease-in-out
                      ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-xl font-mono font-bold">
              Open Source Projects
            </h2>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {projects.map((project: Project) => (
              <ProjectCard key={project.id} {...project} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
