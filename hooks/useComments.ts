import { useState, useCallback, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';

interface Like {
    userId: string;
    commentId?: string | null;
    replyId?: string | null;
}

interface User {
    name: string;
    avatarUrl: string;
}

interface Reply {
    id: string;
    content: string;
    createdAt: string;
    user: User;
    likes: Like[];
}

interface Comment {
    id: string;
    content: string;
    createdAt: string;
    user: User;
    likes: Like[];
    replies: Reply[];
    tags?: { name: string }[];
}

export function useComments(initialComments: Comment[] = []) {
    const { user } = useUser();
    const [comments, setComments] = useState<Comment[]>(initialComments);
    const [loading, setLoading] = useState(false);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    useEffect(() => {
        if (selectedTags.length > 0) {
            fetchComments();
        }
    }, [selectedTags]);

    const fetchComments = useCallback(async () => {
        setLoading(true);
        try {
            const queryParams = selectedTags.length > 0
                ? `?tags=${selectedTags.join(',')}`
                : '';
            const response = await fetch(`/api/comments${queryParams}`);
            const data = await response.json();
            setComments(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Error fetching comments:', error);
            setComments([]);
        } finally {
            setLoading(false);
        }
    }, [selectedTags]);

    const createComment = useCallback(async (content: string, tags: string[]) => {
        if (!user) return;

        const tempComment = {
            id: `temp-${Date.now()}`,
            content,
            tags: tags.map(tag => ({ name: tag })),
            createdAt: new Date().toISOString(),
            user: {
                name: user.firstName + ' ' + (user.lastName || ''),
                avatarUrl: user.imageUrl,
            },
            likes: [],
            replies: [],
        };

        setComments(prev => [tempComment, ...prev]);

        try {
            const response = await fetch('/api/comments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content, tags })
            });

            if (!response.ok) {
                throw new Error('Failed to create comment');
            }

            const newComment = await response.json();
            setComments(prev =>
                prev.map(comment =>
                    comment.id === tempComment.id ? newComment : comment
                )
            );
        } catch (error) {
            console.error('Error creating comment:', error);
            setComments(prev => prev.filter(comment => comment.id !== tempComment.id));
            throw error;
        }
    }, [user]);

    const toggleLike = useCallback(async (commentId: string) => {
        if (!user) return;

        setComments(prev => prev.map(comment => {
            if (comment.id === commentId) {
                const isLiked = comment.likes.some((like: any) => like.userId === user.id);
                return {
                    ...comment,
                    likes: isLiked
                        ? comment.likes.filter((like: any) => like.userId !== user.id)
                        : [...comment.likes, { userId: user.id }]
                };
            }
            return comment;
        }));

        try {
            await fetch(`/api/comments/${commentId}/like`, {
                method: 'POST'
            });
        } catch (error) {
            console.error('Error toggling like:', error);
            await fetchComments();
        }
    }, [user, fetchComments]);

    const addReply = useCallback(async (commentId: string, content: string) => {
        if (!user) return;

        const tempReply = {
            id: `temp-${Date.now()}`,
            content,
            createdAt: new Date().toISOString(),
            user: {
                name: user.firstName + ' ' + (user.lastName || ''),
                avatarUrl: user.imageUrl,
            },
            likes: []
        };

        setComments(prev => prev.map(comment => {
            if (comment.id === commentId) {
                return {
                    ...comment,
                    replies: [...comment.replies, tempReply]
                };
            }
            return comment;
        }));

        try {
            const response = await fetch(`/api/comments/${commentId}/replies`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content })
            });

            if (!response.ok) {
                throw new Error('Failed to add reply');
            }

            const newReply = await response.json();
            setComments(prev => prev.map(comment => {
                if (comment.id === commentId) {
                    return {
                        ...comment,
                        replies: comment.replies.map((reply: any) =>
                            reply.id === tempReply.id ? newReply : reply
                        )
                    };
                }
                return comment;
            }));
        } catch (error) {
            console.error('Error adding reply:', error);
            await fetchComments();
        }
    }, [user, fetchComments]);

    const toggleReplyLike = useCallback(async (replyId: string) => {
        if (!user) return;

        setComments(prev => prev.map(comment => ({
            ...comment,
            replies: comment.replies.map((reply: Reply) => {
                if (reply.id === replyId) {
                    const isLiked = reply.likes.some((like: Like) => like.userId === user.id);
                    return {
                        ...reply,
                        likes: isLiked
                            ? reply.likes.filter(like => like.userId !== user.id)
                            : [...reply.likes, { userId: user.id }]
                    };
                }
                return reply;
            })
        })));

        try {
            await fetch(`/api/comments/replies/${replyId}/like`, {
                method: 'POST'
            });
        } catch (error) {
            console.error('Error toggling reply like:', error);
            await fetchComments();
        }
    }, [user, fetchComments]);

    return {
        comments,
        loading,
        selectedTags,
        setSelectedTags,
        createComment,
        addReply,
        toggleLike,
        toggleReplyLike,
        setComments,
        fetchComments
    };
} 