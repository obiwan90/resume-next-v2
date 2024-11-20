"use client"

import { SignIn } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";

export default function SignInPage() {
    const searchParams = useSearchParams();
    const redirectUrl = searchParams?.get('redirect_url') || '/';

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
            <SignIn
                appearance={{
                    elements: {
                        rootBox: "mx-auto",
                    },
                }}
                afterSignInUrl={redirectUrl}
                redirectUrl={redirectUrl}
                signUpUrl={`/sign-up?redirect_url=${redirectUrl}`}
            />
        </div>
    );
} 