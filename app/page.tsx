import { getRecentProjects } from '@/sanity/lib/api'
import { PortfolioPage } from "@/components/portfolio-page"

export default async function Page() {
  const recentProjects = await getRecentProjects()
  return <PortfolioPage recentProjects={recentProjects} />
}