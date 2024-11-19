import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { commentService } from "@/lib/services/comment-service";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const tags = searchParams.get('tags')?.split(',');

    try {
        const comments = await commentService.getComments(
            tags ? { tags } : undefined
        );
        return NextResponse.json(comments);
    } catch (error) {
        console.error('Error fetching comments:', error);
        return NextResponse.json({ error: 'Failed to fetch comments' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    const auth = getAuth(request);
    const userId = auth.userId;

    if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { content, tags } = await request.json();
        const comment = await commentService.createComment({
            content,
            clerkUserId: userId,
            tags: tags || []
        });

        return NextResponse.json(comment);
    } catch (error) {
        console.error('Error creating comment:', error);
        return NextResponse.json(
            { error: 'Failed to create comment' },
            { status: 500 }
        );
    }
} 