import contributorsData from '@/data/contributors.json'
import projectsData from '@/data/projects.json'
import { Contributor, Project } from '@/types'

// Define interfaces for the JSON structure
interface ContributorsData {
    contributors: Contributor[]
}

interface ProjectsData {
    projects: Project[]
}

// Assert the types when importing
const typedContributorsData = contributorsData as ContributorsData
const typedProjectsData = projectsData as ProjectsData

export function getContributors(): Contributor[] {
    return typedContributorsData.contributors
}

export function getProjects(): Project[] {
    return typedProjectsData.projects
} 