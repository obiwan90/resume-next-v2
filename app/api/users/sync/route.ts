import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
    try {
        const { userId, email, name, avatarUrl } = await request.json();

        if (!userId || !email || !name) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // 同步到数据库
        const user = await prisma.user.upsert({
            where: {
                clerkId: userId,
            },
            create: {
                clerkId: userId,
                email,
                name,
                avatarUrl,
            },
            update: {
                email,
                name,
                avatarUrl,
            },
        });

        return NextResponse.json(user);
    } catch (error) {
        console.error('Error syncing user:', error);
        return NextResponse.json(
            { error: 'Failed to sync user' },
            { status: 500 }
        );
    }
} 