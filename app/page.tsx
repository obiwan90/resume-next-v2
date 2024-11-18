import { getRecentProjects, getCurrentExperience } from '@/sanity/lib/api'
import { PortfolioPage } from "@/components/portfolio-page"

export default async function Page() {
  const [recentProjects, currentExperience] = await Promise.all([
    getRecentProjects(),
    getCurrentExperience()
  ])

  return <PortfolioPage
    recentProjects={recentProjects}
    currentExperience={currentExperience}
  />
}