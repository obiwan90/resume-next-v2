import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { userService } from "@/lib/services/user-service";
import type { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    const auth = getAuth(request);
    const userId = auth.userId;

    if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { email, name, avatarUrl } = await request.json();

        const user = await userService.upsertUser({
            clerkId: userId,
            email,
            name,
            avatarUrl
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