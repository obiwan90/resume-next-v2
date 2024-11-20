import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'

export async function POST(req: Request) {
    try {
        const { userId } = await auth()
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const { content } = await req.json()

        // Get user from database using Clerk ID
        const user = await prisma.user.findUnique({
            where: {
                clerkId: userId
            }
        })

        if (!user) {
            // Create user if not exists
            const newUser = await prisma.user.create({
                data: {
                    clerkId: userId,
                    name: "User", // You might want to get this from Clerk
                    email: "user@example.com", // You might want to get this from Clerk
                }
            })

            // Create comment with new user
            const comment = await prisma.comment.create({
                data: {
                    content,
                    userId: newUser.id,
                },
                include: {
                    user: true,
                    likes: true,
                    replies: {
                        include: {
                            user: true
                        }
                    }
                }
            })

            return NextResponse.json(comment)
        }

        // Create comment with existing user
        const comment = await prisma.comment.create({
            data: {
                content,
                userId: user.id,
            },
            include: {
                user: true,
                likes: true,
                replies: {
                    include: {
                        user: true
                    }
                }
            }
        })

        return NextResponse.json(comment)
    } catch (error) {
        console.error('[COMMENTS_POST]', error)
        return new NextResponse("Internal Error", { status: 500 })
    }
} 