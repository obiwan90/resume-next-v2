export const project = {
    name: 'project',
    title: 'Projects',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Project Name',
            type: 'string',
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'coverImage',
            title: 'Cover Image',
            type: 'image',
            options: {
                hotspot: true,
            },
            fields: [
                {
                    name: 'alt',
                    type: 'string',
                    title: 'Alternative Text',
                }
            ]
        },
        {
            name: 'description',
            title: 'Description',
            type: 'text',
            rows: 3,
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'projectUrl',
            title: 'Project URL',
            type: 'url',
        },
        {
            name: 'githubUrl',
            title: 'GitHub URL',
            type: 'url',
        },
        {
            name: 'tags',
            title: 'Tags',
            type: 'array',
            of: [{ type: 'string' }],
            options: {
                layout: 'tags'
            }
        },
        {
            name: 'publishedAt',
            title: 'Published At',
            type: 'datetime',
        },
        {
            name: 'isRecentUpdate',
            title: 'Recent Update',
            type: 'boolean',
            description: 'Show this project in recent updates section',
            initialValue: false,
        }
    ],
    preview: {
        select: {
            title: 'title',
            media: 'coverImage'
        }
    }
} 