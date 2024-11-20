import { getExperiences } from '@/sanity/lib/api'
import { ExperiencePageContent } from "@/components/experience-page-content"

export const revalidate = 0

export default async function ExperiencePage() {
    const experiences = await getExperiences()
    return <ExperiencePageContent experiences={experiences} />
} 