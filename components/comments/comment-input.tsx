"use client"

import { useState } from "react"
import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from "next/navigation"
import { toast } from "react-hot-toast"
import { EmojiPicker } from "@/components/ui/emoji-picker"

interface CommentInputProps {
    user: {
        id: string
        imageUrl: string
        firstName: string
    }
}

export function CommentInput({ user }: CommentInputProps) {
    const [content, setContent] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const router = useRouter()

    const handleEmojiSelect = (emoji: string) => {
        setContent(prev => prev + emoji)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!content.trim() || isSubmitting) return

        try {
            setIsSubmitting(true)

            const promise = fetch('/api/comments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    content: content.trim(),
                }),
            }).then(async (res) => {
                if (!res.ok) {
                    const error = await res.text()
                    throw new Error(error)
                }
                setContent("")
                router.refresh()
            })

            await toast.promise(
                promise,
                {
                    loading: 'Posting comment...',
                    success: 'Comment posted successfully!',
                    error: (err) => {
                        console.error('Comment post error:', err)
                        return err?.message || 'Failed to post comment. Please try again.'
                    }
                }
            )
        } catch (error) {
            console.error('Error adding comment:', error)
            toast.error('Failed to post comment. Please try again.')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-4">
                <Avatar className="w-10 h-10 ring-2 ring-primary/10 ring-offset-2 ring-offset-background">
                    <img
                        src={user.imageUrl}
                        alt={user.firstName}
                        className="object-cover"
                    />
                </Avatar>
                <div className="flex-1">
                    <div className="relative">
                        <Textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Share your thoughts..."
                            className="min-h-[100px] resize-none bg-background/50 backdrop-blur-sm border-border/50 focus:border-primary/50 pr-10"
                        />
                        <div className="absolute bottom-2 right-2">
                            <EmojiPicker onChange={handleEmojiSelect} />
                        </div>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                        <p className="text-xs text-muted-foreground">
                            {content.length}/500 characters
                        </p>
                        <Button
                            type="submit"
                            disabled={!content.trim() || isSubmitting || content.length > 500}
                            className="bg-primary/90 hover:bg-primary"
                        >
                            {isSubmitting ? (
                                <span className="flex items-center gap-2">
                                    <span className="animate-spin">⏳</span>
                                    Posting...
                                </span>
                            ) : (
                                'Post Comment'
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        </form>
    )
} 