import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { commentService } from "@/lib/services/comment-service";
import type { NextRequest } from "next/server";

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
        const reply = await commentService.addReply({
            content,
            clerkUserId: userId,
            commentId: params.commentId
        });
        return NextResponse.json(reply);
    } catch (error) {
        console.error('Error creating reply:', error);
        return NextResponse.json({ error: 'Failed to create reply' }, { status: 500 });
    }
} 