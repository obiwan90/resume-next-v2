"use client"

import { useState } from "react"
import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from "next/navigation"
import { toast } from "react-hot-toast"
import { EmojiPicker } from "@/components/ui/emoji-picker"
import Image from 'next/image'

interface CommentInputProps {
    user: {
        id: string
        imageUrl: string
        firstName: string
    }
    onCommentAdded?: () => void
}

export function CommentInput({ user, onCommentAdded }: CommentInputProps) {
    const [content, setContent] = useState("")
    const [selectedTags, setSelectedTags] = useState<string[]>([])
    const [isSubmitting, setIsSubmitting] = useState(false)
    const router = useRouter()

    const handleEmojiSelect = (emoji: string) => {
        setContent(prev => prev + emoji)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!content.trim() || isSubmitting) return

        setIsSubmitting(true)
        try {
            const response = await fetch('/api/comments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ content, tags: selectedTags }),
            })

            if (!response.ok) {
                throw new Error('Failed to post comment')
            }

            setContent('')
            setSelectedTags([])
            onCommentAdded?.()
            toast.success('Comment posted!')
        } catch (error) {
            console.error('Error posting comment:', error)
            toast.error('Failed to post comment. Please try again.')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-4">
                <Avatar className="w-10 h-10 ring-2 ring-primary/10 ring-offset-2 ring-offset-background">
                    <div className="relative w-full h-full">
                        <Image
                            src={user.imageUrl}
                            alt={user.firstName}
                            fill
                            className="object-cover"
                        />
                    </div>
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