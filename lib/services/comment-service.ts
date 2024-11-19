import { prisma } from '../prisma'

export const commentService = {
    // 创建评论
    async createComment(data: {
        content: string
        clerkUserId: string
        tags: string[]
    }) {
        // 获取数据库中的用户
        const user = await prisma.user.findUnique({
            where: { clerkId: data.clerkUserId }
        });

        if (!user) {
            throw new Error('User not found');
        }

        return prisma.comment.create({
            data: {
                content: data.content,
                userId: user.id,
                tags: {
                    connectOrCreate: data.tags.map(tag => ({
                        where: { name: tag },
                        create: { name: tag }
                    }))
                }
            },
            include: {
                user: true,
                tags: true,
                likes: true,
                replies: {
                    include: {
                        user: true
                    }
                }
            }
        })
    },

    // 获取评论列表
    async getComments(filter?: { tags?: string[] }) {
        return prisma.comment.findMany({
            where: filter?.tags ? {
                tags: {
                    some: {
                        name: {
                            in: filter.tags
                        }
                    }
                }
            } : undefined,
            include: {
                user: true,
                tags: true,
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
    },

    // 添加回复
    async addReply(data: {
        content: string
        clerkUserId: string
        commentId: string
    }) {
        // 首先获取数据库中的用户
        const user = await prisma.user.findUnique({
            where: { clerkId: data.clerkUserId }
        });

        if (!user) {
            throw new Error('User not found');
        }

        return prisma.reply.create({
            data: {
                content: data.content,
                userId: user.id,
                commentId: data.commentId
            },
            include: {
                user: true
            }
        })
    },

    // 点赞/取消点赞
    async toggleLike(clerkUserId: string, commentId: string) {
        // 首先获取数据库中的用户
        const user = await prisma.user.findUnique({
            where: { clerkId: clerkUserId }
        });

        if (!user) {
            throw new Error('User not found');
        }

        const existingLike = await prisma.like.findUnique({
            where: {
                userId_commentId: {
                    userId: user.id,  // 使用数据库中的用户ID
                    commentId
                }
            }
        });

        if (existingLike) {
            return prisma.like.delete({
                where: {
                    id: existingLike.id
                }
            });
        }

        return prisma.like.create({
            data: {
                userId: user.id,  // 使用数据库中的用户ID
                commentId
            }
        });
    }
} 