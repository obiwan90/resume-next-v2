import { prisma } from '@/lib/prisma'
import { currentUser } from '@clerk/nextjs/server'

class CommentService {
    async getComments() {
        return await prisma.comment.findMany({
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                user: true,
                likes: true,
                replies: {
                    include: {
                        user: true
                    }
                },
                tags: true
            }
        })
    }

    async getUserLikes(userId: string) {
        return await prisma.like.findMany({
            where: {
                userId,
                commentId: { not: null }
            }
        })
    }

    async createComment(content: string, tags: string[]) {
        const user = await currentUser()
        if (!user) throw new Error('User not authenticated')

        const dbUser = await prisma.user.findUnique({
            where: { clerkId: user.id }
        })
        if (!dbUser) throw new Error('User not found in database')

        return await prisma.comment.create({
            data: {
                content,
                userId: dbUser.id,
                tags: {
                    connectOrCreate: tags.map(tag => ({
                        where: { id: tag },
                        create: { name: tag }
                    }))
                }
            },
            include: {
                user: true,
                likes: true,
                replies: {
                    include: {
                        user: true
                    }
                },
                tags: true
            }
        })
    }

    async toggleLike(commentId: string, userId: string) {
        const existingLike = await prisma.like.findFirst({
            where: {
                userId,
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
        }

        await prisma.like.create({
            data: {
                userId,
                commentId
            }
        })
        return true
    }

    async createReply(commentId: string, content: string, userId: string) {
        return await prisma.reply.create({
            data: {
                content,
                userId,
                commentId
            },
            include: {
                user: true,
                likes: true,
                comment: {
                    include: {
                        user: true,
                        likes: true,
                        replies: {
                            include: {
                                user: true,
                                likes: true
                            }
                        }
                    }
                }
            }
        })
    }

    async toggleReplyLike(replyId: string, userId: string) {
        const existingLike = await prisma.like.findFirst({
            where: {
                userId,
                replyId
            }
        })

        if (existingLike) {
            await prisma.like.delete({
                where: {
                    id: existingLike.id
                }
            })
            return false
        }

        await prisma.like.create({
            data: {
                userId,
                replyId
            }
        })
        return true
    }
}

export const commentService = new CommentService() 