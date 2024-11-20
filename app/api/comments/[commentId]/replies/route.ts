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
        const { content } = await request.json();

        const reply = await commentService.createReply(
            params.commentId,
            content,
            userId
        );

        return NextResponse.json(reply);
    } catch (error) {
        console.error('Error adding reply:', error);
        return NextResponse.json({ error: 'Failed to add reply' }, { status: 500 });
    }
} 