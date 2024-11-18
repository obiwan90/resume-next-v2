export const experience = {
    name: 'experience',
    title: 'Experience',
    type: 'document',
    fields: [
        {
            name: 'company',
            title: 'Company Name',
            type: 'string',
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'position',
            title: 'Position',
            type: 'string',
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'startDate',
            title: 'Start Date',
            type: 'date',
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'endDate',
            title: 'End Date',
            type: 'date',
            description: 'Leave empty if this is your current position',
        },
        {
            name: 'isCurrentRole',
            title: 'Is Current Role',
            type: 'boolean',
            initialValue: false,
        },
        {
            name: 'description',
            title: 'Job Description',
            type: 'text',
            rows: 3,
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'projects',
            title: 'Projects',
            type: 'array',
            of: [{
                type: 'object',
                fields: [
                    {
                        name: 'name',
                        title: 'Project Name',
                        type: 'string',
                    },
                    {
                        name: 'description',
                        title: 'Project Description',
                        type: 'text',
                    },
                    {
                        name: 'background',
                        title: 'Project Background',
                        type: 'object',
                        fields: [
                            {
                                name: 'problem',
                                title: 'Problem',
                                type: 'text',
                            },
                            {
                                name: 'solution',
                                title: 'Solution',
                                type: 'text',
                            },
                            {
                                name: 'impact',
                                title: 'Impact',
                                type: 'text',
                            }
                        ]
                    },
                    {
                        name: 'responsibilities',
                        title: 'Key Responsibilities',
                        type: 'array',
                        of: [{ type: 'string' }]
                    },
                    {
                        name: 'techStack',
                        title: 'Tech Stack',
                        type: 'array',
                        of: [{ type: 'string' }]
                    }
                ]
            }]
        },
        {
            name: 'skills',
            title: 'Skills Used',
            type: 'array',
            of: [{ type: 'string' }],
            options: {
                layout: 'tags'
            }
        },
        {
            name: 'achievements',
            title: 'Key Achievements',
            type: 'array',
            of: [{ type: 'string' }],
        },
        {
            name: 'order',
            title: 'Display Order',
            type: 'number',
            description: 'Lower numbers will be displayed first',
        }
    ]
} 