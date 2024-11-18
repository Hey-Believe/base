'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { GithubIcon } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
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
                transition-colors cursor-pointer group"
    >
      <div className="flex items-start gap-4">
        {/* Project Logo */}
        <div className="w-12 h-12 relative flex-shrink-0">
          <Image
            src={project.logo}
            alt={project.title}
            width={48}
            height={48}
            className="rounded-lg"
          />
        </div>

        {/* Project Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-mono font-bold truncate">{project.title}</h3>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="font-mono">
                {project.license}
              </Badge>
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-gray-400 hover:text-black transition-colors"
              >
                <GithubIcon className="w-5 h-5" />
              </a>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-1 line-clamp-2 font-mono">
            {project.description}
          </p>
        </div>
      </div>
    </div>
  )
}
