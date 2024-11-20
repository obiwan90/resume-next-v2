"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { MessageSquare, Heart, Reply, Smile } from "lucide-react"
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { User } from "@clerk/nextjs/server"

interface CommentSectionProps {
    user: User
}

export function CommentSection({ user }: CommentSectionProps) {
    const [comment, setComment] = useState("")
    const [showEmojiPicker, setShowEmojiPicker] = useState(false)

    const onEmojiSelect = (emoji: any) => {
        setComment(prev => prev + emoji.native)
    }

    const handleSubmit = () => {
        // 这里添加提交评论的逻辑
        console.log("Submitting comment:", comment)
        setComment("")
        setShowEmojiPicker(false)
    }

    return (
        <div className="space-y-8">
            {/* 评论输入框 */}
            <Card className="p-6 space-y-4">
                <div className="flex items-start gap-4">
                    <Avatar>
                        <AvatarImage src={user.imageUrl} alt={user.firstName || ""} />
                        <AvatarFallback>{user.firstName?.[0] || "U"}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-4">
                        <Textarea
                            placeholder="Share your thoughts..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="min-h-[100px] resize-none"
                        />
                        <div className="flex justify-between items-center">
                            <Button
                                variant="ghost"
                                size="sm"
                                className="gap-2"
                                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                            >
                                <Smile className="h-4 w-4" />
                                <span>Emoji</span>
                            </Button>
                            <Button
                                onClick={handleSubmit}
                                className="gap-2"
                                disabled={!comment.trim()}
                            >
                                <MessageSquare className="h-4 w-4" />
                                <span>Comment</span>
                            </Button>
                        </div>
                        <AnimatePresence>
                            {showEmojiPicker && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    className="absolute z-50"
                                >
                                    <Picker
                                        data={data}
                                        onEmojiSelect={onEmojiSelect}
                                        theme="light"
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </Card>

            {/* 评论列表将在这里实现 */}
        </div>
    )
} 