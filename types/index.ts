export interface Project {
    _id: string;
    id: string;
    title: string;
    description: string;
    image: string;
    coverImage?: {
        asset: {
            url: string;
        };
        alt?: string;
    };
    link?: string;
    github?: string;
    githubUrl?: string;
    projectUrl?: string;
    tags: string[];
    featured: boolean;
    slug: string;
    publishedAt: string;
    isRecentUpdate?: boolean;
} 