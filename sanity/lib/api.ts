import { client } from './client'
import { projectsQuery, experiencesQuery } from './queries'

export async function getProjects() {
    return client.fetch(projectsQuery)
}

export async function getExperiences() {
    return client.fetch(experiencesQuery)
} 