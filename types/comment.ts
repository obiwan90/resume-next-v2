export interface User {
    id: string;
    name: string;
    email: string;
    avatarUrl: string | null;
    clerkId: string;
    createdAt: string;
    updatedAt: string;
}

export interface Like {
    id: string;
    userId: string;
    commentId: string | null;
    replyId: string | null;
    createdAt: string;
}

export interface Reply {
    id: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    userId: string;
    commentId: string;
    user: User;
    likes: Like[];
}

export interface Comment {
    id: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    userId: string;
    user: User;
    likes: Like[];
    replies: Reply[];
    tags?: { id: string; name: string }[];
} 