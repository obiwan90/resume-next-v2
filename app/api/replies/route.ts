import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'

export async function POST(req: Request) {
    try {
        const { userId } = await auth()
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const { content, commentId } = await req.json()

        // Get user from database using Clerk ID
        const user = await prisma.user.findUnique({
            where: {
                clerkId: userId
            }
        })

        if (!user) {
            return new NextResponse("User not found", { status: 404 })
        }

        // Create reply
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

        return NextResponse.json(reply)
    } catch (error) {
        console.error('[REPLIES_POST]', error)
        return new NextResponse("Internal Error", { status: 500 })
    }
} 