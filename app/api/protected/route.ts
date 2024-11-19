import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET() {
    const user = await currentUser();

    if (!user) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    return NextResponse.json({ message: "Hello authenticated user!" });
} 