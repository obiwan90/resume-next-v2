import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { PrismaClient } from '@prisma/client'
import { Pool } from '@neondatabase/serverless'
import { PrismaNeon } from '@prisma/adapter-neon'
import type { NextRequest } from "next/server";

export const runtime = 'edge'

export async function POST(
    request: NextRequest,
    { params }: { params: { commentId: string } }
) {
    const auth = getAuth(request);
    const userId = auth.userId;

    if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 创建连接池和客户端
    const pool = new Pool({ connectionString: process.env.DATABASE_URL! })
    const prisma = new PrismaClient().$extends((client) => {
        return client.$extends({
            query: {
                $allModels: {
                    async $allOperations({ args, query }) {
                        const result = await query(args)
                        return result
                    },
                },
            },
        })
    })

    try {
        // 先获取用户的数据库 ID
        const user = await prisma.user.findUnique({
            where: { clerkId: userId }
        })

        if (!user) {
            throw new Error('User not found in database')
        }

        // 检查是否已经点赞
        const existingLike = await prisma.like.findFirst({
            where: {
                userId: user.id,
                commentId: params.commentId
            }
        })

        if (existingLike) {
            // 如果已经点赞，则取消点赞
            await prisma.like.delete({
                where: {
                    id: existingLike.id
                }
            })
            return NextResponse.json({ liked: false });
        }

        // 如果未点赞，则添加点赞
        await prisma.like.create({
            data: {
                userId: user.id,
                commentId: params.commentId
            }
        })
        return NextResponse.json({ liked: true });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    } finally {
        // 关闭连接
        await Promise.all([
            prisma.$disconnect(),
            pool.end()
        ])
    }
} 