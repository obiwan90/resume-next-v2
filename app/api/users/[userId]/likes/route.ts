import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { commentService } from "@/lib/services/comment-service";
import type { NextRequest } from "next/server";

export const runtime = 'nodejs'

export async function GET(
    request: NextRequest,
    { params }: { params: { userId: string } }
) {
    const auth = getAuth(request);
    if (!auth.userId || auth.userId !== params.userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const likes = await commentService.getUserLikes(params.userId);
        return NextResponse.json(likes);
    } catch (error) {
        console.error('Error fetching user likes:', error);
        return NextResponse.json({ error: 'Failed to fetch likes' }, { status: 500 });
    }
} 