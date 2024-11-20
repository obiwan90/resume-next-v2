"use client"

import { SignInButton } from "@clerk/nextjs"
import { useUser } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { useEffect } from "react"
import { userService } from "@/lib/services/user-service"

export function LoginButton() {
    const { user, isSignedIn, isLoaded } = useUser()

    // 当用户登录状态改变时保存用户信息
    useEffect(() => {
        const syncUserData = async () => {
            console.log("Checking user status:", { isSignedIn, isLoaded, userId: user?.id })

            if (isSignedIn && user) {
                console.log("Attempting to sync user data for:", user.id)
                try {
                    const result = await userService.upsertUser({
                        clerkId: user.id,
                        email: user.emailAddresses[0]?.emailAddress || '',
                        name: `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'Anonymous',
                        avatarUrl: user.imageUrl
                    })
                    console.log("User data synced successfully:", result)
                } catch (error) {
                    console.error('Error syncing user data:', error)
                }
            }
        }

        syncUserData()
    }, [isSignedIn, user])

    return (
        <SignInButton mode="modal">
            <Button variant="default">
                Sign In
            </Button>
        </SignInButton>
    )
} 