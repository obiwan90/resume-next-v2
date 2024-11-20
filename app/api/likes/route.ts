import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'

export async function POST(req: Request) {
    try {
        const { userId } = await auth()
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const { commentId } = await req.json()

        // Get user from database using Clerk ID
        const user = await prisma.user.findUnique({
            where: {
                clerkId: userId
            }
        })

        if (!user) {
            return new NextResponse("User not found", { status: 404 })
        }

        // Check if like already exists
        const existingLike = await prisma.like.findFirst({
            where: {
                userId: user.id,
                commentId
            }
        })

        if (existingLike) {
            // Unlike
            await prisma.like.delete({
                where: {
                    id: existingLike.id
                }
            })
            return NextResponse.json({ liked: false })
        } else {
            // Like
            await prisma.like.create({
                data: {
                    userId: user.id,
                    commentId
                }
            })
            return NextResponse.json({ liked: true })
        }
    } catch (error) {
        console.error('[LIKES_POST]', error)
        return new NextResponse("Internal Error", { status: 500 })
    }
} 