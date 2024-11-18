import { groq } from 'next-sanity'

export const projectsQuery = groq`*[_type == "project"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  description,
  coverImage {
    asset->{
      _id,
      url
    },
    alt
  },
  projectUrl,
  githubUrl,
  tags,
  publishedAt
}`

export const experiencesQuery = groq`*[_type == "experience"] | order(order asc) {
  _id,
  company,
  position,
  startDate,
  endDate,
  isCurrentRole,
  description,
  "projects": projects[]{
    name,
    description,
    "background": background{
      problem,
      solution,
      impact
    },
    "responsibilities": responsibilities[],
    "techStack": techStack[]
  },
  "skills": skills[],
  "achievements": achievements[],
  order
}`

export const recentProjectsQuery = groq`*[_type == "project" && isRecentUpdate == true] | order(publishedAt desc) {
  _id,
  title,
  slug,
  description,
  coverImage {
    asset->{
      url
    },
    alt
  },
  projectUrl,
  githubUrl,
  tags,
  publishedAt,
  isRecentUpdate
}` 