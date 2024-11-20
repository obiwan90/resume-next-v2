export interface Project {
    _id: string;
    title: string;
    slug: {
        current: string;
    };
    description: string;
    coverImage: {
        asset: {
            url: string;
        };
        alt: string;
    };
    projectUrl?: string;
    githubUrl?: string;
    tags: string[];
    publishedAt: string;
    isRecentUpdate: boolean;
} 