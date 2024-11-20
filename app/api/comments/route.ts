import { NextResponse } from 'next/server'
import { getAuth } from "@clerk/nextjs/server";
import { PrismaClient } from '@prisma/client'
import { Pool } from '@neondatabase/serverless'
import { PrismaNeon } from '@prisma/adapter-neon'
import type { NextRequest } from "next/server";

export const runtime = 'edge'

export async function GET() {
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
        const comments = await prisma.comment.findMany({
            include: {
                user: true,
                likes: true,
                replies: {
                    include: {
                        user: true,
                        likes: true
                    }
                },
                tags: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
        return NextResponse.json(comments);
    } catch (error) {
        console.error('Error fetching comments:', error);
        return NextResponse.json({ error: 'Failed to fetch comments' }, { status: 500 });
    } finally {
        await Promise.all([
            prisma.$disconnect(),
            pool.end()
        ])
    }
}

export async function POST(request: NextRequest) {
    const auth = getAuth(request);
    const userId = auth.userId;

    if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

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
        const { content, tags } = await request.json();
        const user = await prisma.user.findUnique({
            where: { clerkId: userId }
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        const comment = await prisma.comment.create({
            data: {
                content,
                userId: user.id,
                tags: {
                    connectOrCreate: tags.map((tag: string) => ({
                        where: { name: tag },
                        create: { name: tag }
                    }))
                }
            },
            include: {
                user: true,
                likes: true,
                replies: true,
                tags: true
            }
        });

        return NextResponse.json(comment);
    } catch (error) {
        console.error('Error creating comment:', error);
        return NextResponse.json({ error: 'Failed to create comment' }, { status: 500 });
    } finally {
        await Promise.all([
            prisma.$disconnect(),
            pool.end()
        ])
    }
} 