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

export async function getSpeakingEngagements() {
    const query = `*[_type == "speaking"] | order(date desc) {
        _id,
        title,
        description,
        date,
        location,
        eventName,
        eventUrl,
        recordingUrl,
        coverImage {
            asset-> {
                url
            },
            alt
        },
        slides,
        attendees,
        type,
        tags
    }`

    const talks = await client.fetch(query)
    return talks
} 