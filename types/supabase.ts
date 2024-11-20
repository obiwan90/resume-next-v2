export interface Comment {
    id: string
    content: string
    created_at: string
    user: {
        id: string
        name: string
        avatar_url: string
    }
    likes: { count: number }[]
    tags: { tag_name: string }[]
    replies: Reply[]
}

export interface Reply {
    id: string
    content: string
    created_at: string
    user: {
        id: string
        name: string
        avatar_url: string
    }
}

export interface Database {
    public: {
        Tables: {
            comments: {
                Row: {
                    id: string
                    content: string
                    user_id: string
                    created_at: string
                }
                Insert: {
                    content: string
                    user_id: string
                }
            }
            replies: {
                Row: {
                    id: string
                    content: string
                    user_id: string
                    comment_id: string
                    created_at: string
                }
                Insert: {
                    content: string
                    user_id: string
                    comment_id: string
                }
            }
            likes: {
                Row: {
                    user_id: string
                    comment_id: string
                }
                Insert: {
                    user_id: string
                    comment_id: string
                }
            }
            comment_tags: {
                Row: {
                    comment_id: string
                    tag_name: string
                }
                Insert: {
                    comment_id: string
                    tag_name: string
                }
            }
        }
    }
} 