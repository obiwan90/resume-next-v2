import { prisma } from '../prisma'

export const commentService = {
    // Get comments list
    async getComments() {
        try {
            const comments = await prisma.comment.findMany({
                include: {
                    user: true,
                    likes: true,
                    replies: {
                        include: {
                            user: true
                        }
                    }
                },
                orderBy: {
                    createdAt: 'desc'
                }
            })
            return comments
        } catch (error) {
            console.error('Error fetching comments:', error)
            throw error
        }
    },

    // Get user likes
    async getUserLikes(userId: string) {
        try {
            const likes = await prisma.like.findMany({
                where: {
                    userId: userId
                },
                select: {
                    commentId: true
                }
            })
            return likes.map(like => like.commentId)
        } catch (error) {
            console.error('Error fetching user likes:', error)
            throw error
        }
    },

    // Add comment
    async addComment({ content, userId }: { content: string; userId: string }) {
        try {
            // First, get or create user in our database using Clerk ID
            const user = await prisma.user.findUnique({
                where: {
                    clerkId: userId
                }
            })

            if (!user) {
                throw new Error('User not found')
            }

            // Create the comment
            const comment = await prisma.comment.create({
                data: {
                    content,
                    userId: user.id,
                },
                include: {
                    user: true,
                    likes: true,
                    replies: {
                        include: {
                            user: true
                        }
                    }
                }
            })

            return comment
        } catch (error) {
            console.error('Error adding comment:', error)
            throw error
        }
    },

    // Add reply
    async addReply({ content, userId, commentId }: { content: string; userId: string; commentId: string }) {
        try {
            // First, get or create user in our database using Clerk ID
            const user = await prisma.user.findUnique({
                where: {
                    clerkId: userId
                }
            })

            if (!user) {
                throw new Error('User not found')
            }

            // Create the reply
            const reply = await prisma.reply.create({
                data: {
                    content,
                    userId: user.id,
                    commentId
                },
                include: {
                    user: true
                }
            })

            return reply
        } catch (error) {
            console.error('Error adding reply:', error)
            throw error
        }
    },

    // Toggle like
    async toggleLike({ userId, commentId }: { userId: string; commentId: string }) {
        try {
            // First, get or create user in our database using Clerk ID
            const user = await prisma.user.findUnique({
                where: {
                    clerkId: userId
                }
            })

            if (!user) {
                throw new Error('User not found')
            }

            const existingLike = await prisma.like.findFirst({
                where: {
                    userId: user.id,
                    commentId
                }
            })

            if (existingLike) {
                await prisma.like.delete({
                    where: {
                        id: existingLike.id
                    }
                })
                return false
            } else {
                await prisma.like.create({
                    data: {
                        userId: user.id,
                        commentId
                    }
                })
                return true
            }
        } catch (error) {
            console.error('Error toggling like:', error)
            throw error
        }
    }
} 