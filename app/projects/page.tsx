import { getProjects } from '@/sanity/lib/api'
import { AppProjectsPage } from '@/components/app-projects-page'

export default async function ProjectsPage() {
    const projects = await getProjects()
    console.log('Fetched projects:', projects)

    return <AppProjectsPage projects={projects} />
} 