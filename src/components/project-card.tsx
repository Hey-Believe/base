import Image from 'next/image'
import { ExternalLink, GitFork } from 'lucide-react'
import { Project } from '@/types'

type ProjectCardProps = Project

export function ProjectCard({
  title,
  description,
  logo,
  license,
  repoUrl,
}: ProjectCardProps) {
  return (
    <div className="group relative border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-all duration-300">
      <div className="flex items-start gap-4">
        {/* Project Logo */}
        <div className="flex-shrink-0 w-12 h-12 rounded-lg border border-gray-100 overflow-hidden">
          <Image
            src={logo}
            alt={`${title} logo`}
            width={48}
            height={48}
            className="object-cover"
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-mono font-bold text-lg truncate">{title}</h3>
            <span className="flex-shrink-0 px-2 py-1 bg-gray-100 text-xs font-mono rounded">
              {license}
            </span>
          </div>

          <p className="mt-2 text-sm text-gray-600 font-mono line-clamp-2">
            {description}
          </p>

          {/* Links */}
          <div className="mt-4 flex items-center gap-4">
            <a
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-mono text-gray-600 hover:text-black transition-colors"
            >
              <GitFork className="w-4 h-4" />
              View Repository
            </a>
            <a
              href={`${repoUrl}/blob/main/README.md`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-mono text-gray-600 hover:text-black transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              Documentation
            </a>
          </div>
        </div>
      </div>

      {/* Hover Effect */}
      <div className="absolute inset-0 border-2 border-black opacity-0 group-hover:opacity-100 transition-opacity rounded-lg pointer-events-none" />
    </div>
  )
}
