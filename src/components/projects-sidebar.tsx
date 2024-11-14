'use client'

import { useEffect, useState } from 'react'
import { X, Search } from 'lucide-react'
import { ProjectCard } from './project-card'
import { getProjects } from '@/lib/data'
import { Project } from '@/types'

interface ProjectsSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function ProjectsSidebar({ isOpen, onClose }: ProjectsSidebarProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([])
  const allProjects: Project[] = getProjects()
  const [isLoading, setIsLoading] = useState(false)

  // Filter projects based on search query
  useEffect(() => {
    setIsLoading(true)
    const timeoutId = setTimeout(() => {
      const filtered = allProjects.filter(
        (project) =>
          project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      setFilteredProjects(filtered)
      setIsLoading(false)
    }, 300) // Debounce time

    return () => clearTimeout(timeoutId)
  }, [searchQuery, allProjects])

  // Handle ESC key
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [onClose])

  return (
    <div suppressHydrationWarning>
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
          {/* Header */}
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

          {/* Search Bar */}
          <div className="p-4 border-b">
            <div className="relative">
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border-2 border-gray-100 
                         rounded-lg outline-none font-mono text-sm
                         focus:border-black transition-colors
                         placeholder:text-gray-400"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>

          {/* Projects List with Empty State */}
          <div className="flex-1 overflow-y-auto p-6">
            {filteredProjects.length > 0 ? (
              <div className="space-y-4">
                {filteredProjects.map((project: Project) => (
                  <ProjectCard key={project.id} {...project} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="font-mono font-bold mb-2">No projects found</h3>
                <p className="text-sm text-gray-500 font-mono">
                  Try adjusting your search query
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
