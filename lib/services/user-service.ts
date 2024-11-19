import { prisma } from '../prisma'

export const userService = {
    async upsertUser(data: {
        clerkId: string
        email: string
        name: string
        avatarUrl?: string
    }) {
        return prisma.user.upsert({
            where: {
                clerkId: data.clerkId
            },
            create: {
                clerkId: data.clerkId,
                email: data.email,
                name: data.name,
                avatarUrl: data.avatarUrl
            },
            update: {
                email: data.email,
                name: data.name,
                avatarUrl: data.avatarUrl
            }
        })
    },

    async getUser(clerkId: string) {
        return prisma.user.findUnique({
            where: {
                clerkId
            }
        })
    }
} 