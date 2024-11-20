import { prisma } from '../prisma'

export const userService = {
    async upsertUser(data: {
        clerkId: string
        email: string
        name: string
        avatarUrl?: string
    }) {
        console.log("Starting user upsert with data:", data)

        try {
            // 使用 Prisma 的 upsert 操作
            const user = await prisma.user.upsert({
                where: {
                    clerkId: data.clerkId,  // 使用 clerkId 作为唯一标识
                },
                update: {
                    name: data.name,
                    avatarUrl: data.avatarUrl,
                    // 不更新 email，因为它可能导致唯一约束冲突
                },
                create: {
                    clerkId: data.clerkId,
                    email: data.email,
                    name: data.name,
                    avatarUrl: data.avatarUrl
                }
            })

            console.log("User upsert successful:", user)
            return user
        } catch (error) {
            console.error("Error in upsertUser:", error)
            throw error
        }
    },

    async getUser(clerkId: string) {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    clerkId
                }
            })
            console.log("Get user result:", user)
            return user
        } catch (error) {
            console.error("Error in getUser:", error)
            throw error
        }
    }
} 