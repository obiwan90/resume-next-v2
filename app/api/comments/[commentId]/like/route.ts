import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { commentService } from "@/lib/services/comment-service";
import type { NextRequest } from "next/server";

export const runtime = 'nodejs'

export async function POST(
    request: NextRequest,
    { params }: { params: { commentId: string } }
) {
    const auth = getAuth(request);
    const userId = auth.userId;

    if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const result = await commentService.toggleLike(params.commentId, userId);
        return NextResponse.json({ liked: result });
    } catch (error) {
        console.error('Error toggling like:', error);
        if (error instanceof Error && error.message === 'User not found in database') {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }
        return NextResponse.json({ error: 'Failed to toggle like' }, { status: 500 });
    }
} 