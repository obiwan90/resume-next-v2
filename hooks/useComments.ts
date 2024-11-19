import { useState, useCallback } from 'react';
import { useUser } from '@clerk/nextjs';

export function useComments() {
    const { user } = useUser();
    const [comments, setComments] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

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
        try {
            await fetch('/api/comments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content, tags })
            });
        } catch (error) {
            console.error('Error creating comment:', error);
            throw error;
        }
    }, [user]);

    const addReply = useCallback(async (commentId: string, content: string) => {
        if (!user) return;
        try {
            await fetch(`/api/comments/${commentId}/replies`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content })
            });
        } catch (error) {
            console.error('Error adding reply:', error);
            throw error;
        }
    }, [user]);

    const toggleLike = useCallback(async (commentId: string) => {
        if (!user) return;
        try {
            await fetch(`/api/comments/${commentId}/like`, {
                method: 'POST'
            });
            await fetchComments(); // 刷新评论列表以更新点赞状态
        } catch (error) {
            console.error('Error toggling like:', error);
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
        fetchComments
    };
} 