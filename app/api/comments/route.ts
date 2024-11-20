import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'
import { commentService } from "@/lib/services/comment-service";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const comments = await commentService.getComments();
        return NextResponse.json(comments);
    } catch (error) {
        console.error('Error fetching comments:', error);
        return NextResponse.json({ error: 'Failed to fetch comments' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const { content, tags } = await request.json();
        const comment = await commentService.createComment(content, tags || []);
        return NextResponse.json(comment);
    } catch (error) {
        console.error('Error creating comment:', error);
        return NextResponse.json({ error: 'Failed to create comment' }, { status: 500 });
    }
} 