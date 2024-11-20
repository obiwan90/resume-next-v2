import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { PrismaClient } from '@prisma/client'
import { Pool } from '@neondatabase/serverless'
import { PrismaNeon } from '@prisma/adapter-neon'
import type { NextRequest } from "next/server";

export const runtime = 'edge'

export async function GET(
    request: NextRequest,
    { params }: { params: { userId: string } }
) {
    const auth = getAuth(request);
    if (!auth.userId || auth.userId !== params.userId) {
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
        const user = await prisma.user.findUnique({
            where: { clerkId: auth.userId },
            include: {
                likes: true
            }
        });

        return NextResponse.json(user?.likes || []);
    } catch (error) {
        console.error('Error fetching user likes:', error);
        return NextResponse.json({ error: 'Failed to fetch likes' }, { status: 500 });
    } finally {
        await Promise.all([
            prisma.$disconnect(),
            pool.end()
        ])
    }
} 