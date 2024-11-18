import { getExperiences } from '@/sanity/lib/api'
import { AppExperiencePage } from "@/components/app-experience-page"

export default async function ExperiencePage() {
    const experiences = await getExperiences()
    console.log('Experience data:', JSON.stringify(experiences, null, 2))

    // 检查每个经历的项目数量
    experiences.forEach(exp => {
        console.log(`Experience ${exp.company} has ${exp.projects?.length || 0} projects`)
    })

    return <AppExperiencePage experiences={experiences} />
} 