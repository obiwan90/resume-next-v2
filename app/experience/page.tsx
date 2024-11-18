import { getExperiences } from '@/sanity/lib/api'
import { AppExperiencePage } from "@/components/app-experience-page"

interface Experience {
    _id: string
    company: string
    position: string
    startDate: string
    endDate: string | null
    isCurrentRole: boolean
    description: string
    projects: Array<{
        name: string
        description: string
        background: {
            problem: string
            solution: string
            impact: string
        }
        responsibilities: string[]
        techStack: string[]
    }>
    skills: string[]
    achievements: string[]
    order: number
}

export const revalidate = 0

export default async function ExperiencePage() {
    const experiences = await getExperiences()

    // 详细的数据检查
    console.log('Total experiences:', experiences.length)
    console.log('Full experience data:', JSON.stringify(experiences, null, 2))

    // 检查每个经历的项目数量
    experiences.forEach((exp: Experience) => {
        console.log(`Experience at ${exp.company}:`)
        console.log(`- Position: ${exp.position}`)
        console.log(`- Projects count: ${exp.projects?.length || 0}`)
        console.log(`- Projects:`, exp.projects.map(p => p.name))
    })

    return <AppExperiencePage experiences={experiences} />
} 