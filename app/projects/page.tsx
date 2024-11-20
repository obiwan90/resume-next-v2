import { getProjects } from '@/sanity/lib/api'
import { ProjectsPageContent } from "@/components/projects-page-content"

export const revalidate = 0

export default async function ProjectsPage() {
    const projects = await getProjects()
    return <ProjectsPageContent projects={projects} />
} 