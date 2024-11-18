import { getProjects } from '@/sanity/lib/api'
import { ProjectsGrid } from '@/components/projects-grid'
import { Navbar } from '@/components/layout/navbar'

export default async function ProjectsPage() {
    const projects = await getProjects()
    console.log('Fetched projects:', projects)

    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <main className="container py-12">
                <h1 className="text-4xl font-bold mb-8">Projects</h1>
                {projects && projects.length > 0 ? (
                    <ProjectsGrid projects={projects} />
                ) : (
                    <p className="text-muted-foreground">No projects found.</p>
                )}
            </main>
        </div>
    )
} 