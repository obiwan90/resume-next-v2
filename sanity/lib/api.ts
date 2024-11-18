import { client } from './client'
import { experiencesQuery, projectsQuery, recentProjectsQuery, currentExperienceQuery } from './queries'

export async function getExperiences() {
    const options = {
        cache: 'no-store' as const,
        next: { revalidate: 0 }
    }

    return client.fetch(experiencesQuery, {}, options)
}

export async function getProjects() {
    const options = {
        cache: 'no-store' as const,
        next: { revalidate: 0 }
    }

    return client.fetch(projectsQuery, {}, options)
}

export async function getRecentProjects() {
    const options = {
        cache: 'no-store' as const,
        next: { revalidate: 0 }
    }

    return client.fetch(recentProjectsQuery, {}, options)
}

export async function getCurrentExperience() {
    const options = {
        cache: 'no-store' as const,
        next: { revalidate: 0 }
    }

    return client.fetch(currentExperienceQuery, {}, options)
} 