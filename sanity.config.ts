'use client'

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...tool]]/page.tsx` route
 */

import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { project } from './sanity/schemas/project'
import { experience } from './sanity/schemas/experience'

export default defineConfig({
  name: 'default',
  title: 'Portfolio CMS',
  projectId: '56128s8v',
  dataset: 'production',
  basePath: '/studio',
  plugins: [deskTool(), visionTool()],
  schema: {
    types: [project, experience],
  },
})
