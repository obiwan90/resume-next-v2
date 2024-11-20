import { PrismaClient } from '@prisma/client'
import { Pool } from '@neondatabase/serverless'
import { PrismaNeon } from '@prisma/adapter-neon'
import ws from 'ws'
import { neonConfig } from '@neondatabase/serverless'

// 配置 WebSocket
if (!globalThis.WebSocket) {
    neonConfig.webSocketConstructor = ws
}

// 声明全局变量
declare global {
    // eslint-disable-next-line no-var
    var prisma: PrismaClient | undefined
}

// 创建 Prisma 客户端实例
const prisma = globalThis.prisma || new PrismaClient({
    datasources: {
        db: {
            url: process.env.DATABASE_URL
        }
    }
})

// 在开发环境下保存到全局变量，避免热重载创建多个实例
if (process.env.NODE_ENV !== 'production') {
    globalThis.prisma = prisma
}

export { prisma }