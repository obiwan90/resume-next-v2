import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { commentService } from "@/lib/services/comment-service";
import type { NextRequest } from "next/server";

export const runtime = 'nodejs'

export async function POST(
    request: NextRequest,
    { params }: { params: { replyId: string } }
) {
    const auth = getAuth(request);
    const userId = auth.userId;

    if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const result = await commentService.toggleReplyLike(
            params.replyId,
            userId
        );

        return NextResponse.json({ liked: result });
    } catch (error) {
        console.error('Error toggling reply like:', error);
        return NextResponse.json({ error: 'Failed to toggle reply like' }, { status: 500 });
    }
} 