"use client"

import { useState, useCallback, memo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import {
  MessageCircle,
  Heart,
  Send,
  Clock,
  Code2,
  // Image as ImageIcon,
  Smile,
  Hash,
  Sparkles
} from "lucide-react"
import { cn } from "@/lib/utils"

// 定义主题类型
type TopicType = 'Tech' | 'Career' | 'Life' | 'Other'

interface Comment {
  id: string
  user: {
    name: string
    avatar: string
  }
  content: string
  timestamp: string
  likes: number
  replies: Comment[]
  tags: string[]
  topic: TopicType
  reactions: {
    '👍': number
    '❤️': number
    '🎉': number
    '🤔': number
  }
  hasCode?: boolean
  codeBlock?: string
  language?: string
}

const topics: { type: TopicType; icon: JSX.Element; color: string }[] = [
  { type: 'Tech', icon: <Code2 className="h-4 w-4" />, color: 'bg-blue-500' },
  { type: 'Career', icon: <Sparkles className="h-4 w-4" />, color: 'bg-green-500' },
  { type: 'Life', icon: <Heart className="h-4 w-4" />, color: 'bg-pink-500' },
  { type: 'Other', icon: <Hash className="h-4 w-4" />, color: 'bg-purple-500' }
]

// 示例数据
const comments: Comment[] = [
  {
    id: "1",
    user: {
      name: "Alex Chen",
      avatar: "https://github.com/shadcn.png"
    },
    content: "很喜欢你的项目！特别是那个 AI 驱动的分析仪表板，能详细说说是如何实现的吗？",
    timestamp: "2024-01-15T10:30:00",
    likes: 12,
    tags: ["AI", "Dashboard", "React"],
    replies: [
      {
        id: "1-1",
        user: {
          name: "You",
          avatar: "https://github.com/yourusername.png"
        },
        content: "谢谢关注！这个项目主要使用了 TensorFlow.js 进行前端 AI 计算，结合 React 的并发特性实现了实时数据处理。",
        timestamp: "2024-01-15T11:00:00",
        likes: 8,
        tags: ["TensorFlow.js", "React"],
        replies: [],
        topic: 'Tech',
        reactions: {
          '👍': 5,
          '❤️': 2,
          '🎉': 1,
          '🤔': 0
        }
      }
    ],
    topic: 'Tech',
    reactions: {
      '👍': 10,
      '❤️': 5,
      '🎉': 2,
      '🤔': 1
    },
    hasCode: true,
    codeBlock: "const a = 1;",
    language: "JavaScript"
  },
  // 可以添加更多评论
]

// 将 CommentCard 组件提取出来并使用 memo
const CommentCard = memo(({ comment, isReply = false, onExpand }: {
  comment: Comment
  isReply?: boolean
  onExpand: (id: string) => void
}) => {
  const [showReactions, setShowReactions] = useState(false)

  const formatDate = useCallback((dateString: string) => {
    return new Date(dateString).toLocaleString()
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      layout
    >
      <Card className={cn(
        "p-4 hover:shadow-md transition-all duration-300",
        isReply ? "ml-8 mt-4" : "mb-4",
        "border-l-4",
        comment.topic === 'Tech' && "border-l-blue-500",
        comment.topic === 'Career' && "border-l-green-500",
        comment.topic === 'Life' && "border-l-pink-500",
        comment.topic === 'Other' && "border-l-purple-500"
      )}>
        <div className="flex gap-4">
          <Avatar>
            <AvatarImage src={comment.user.avatar} alt={comment.user.name} />
            <AvatarFallback>{comment.user.name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="font-semibold">{comment.user.name}</span>
                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {formatDate(comment.timestamp)}
                </span>
              </div>
              <Button variant="ghost" size="sm" className="flex items-center gap-1">
                <Heart className="h-4 w-4" />
                <span>{comment.likes}</span>
              </Button>
            </div>
            <p className="text-muted-foreground mb-2">{comment.content}</p>
            <div className="flex flex-wrap gap-2 mb-2">
              {comment.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
            {!isReply && (
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground"
                onClick={() => onExpand(comment.id)}
              >
                <MessageCircle className="h-4 w-4 mr-1" />
                {comment.replies.length > 0 ? `${comment.replies.length} replies` : "Reply"}
              </Button>
            )}

            {/* 添加代码块支持 */}
            {comment.hasCode && (
              <div className="my-4 bg-muted p-4 rounded-md">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline">{comment.language}</Badge>
                  <Button variant="ghost" size="sm">Copy</Button>
                </div>
                <pre className="text-sm overflow-x-auto">
                  <code>{comment.codeBlock}</code>
                </pre>
              </div>
            )}

            {/* 添加表情回应 */}
            <div className="mt-4 flex items-center gap-2">
              <div className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowReactions(!showReactions)}
                >
                  <Smile className="h-4 w-4 mr-1" />
                  React
                </Button>
                <AnimatePresence>
                  {showReactions && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="absolute bottom-full left-0 mb-2 p-2 bg-background border rounded-lg shadow-lg flex gap-2"
                    >
                      {Object.entries(comment.reactions).map(([emoji, count]) => (
                        <Button
                          key={emoji}
                          variant="ghost"
                          size="sm"
                          className="hover:bg-muted"
                        >
                          <span className="mr-1">{emoji}</span>
                          <span className="text-xs">{count}</span>
                        </Button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  )
})
CommentCard.displayName = 'CommentCard'

// 将回复输入框提取为单独的组件
const ReplyInput = memo(({ value, onChange, onSubmit }: {
  value: string
  onChange: (value: string) => void
  onSubmit: () => void
}) => (
  <div className="mt-4 flex gap-2">
    <Textarea
      placeholder="Write a reply..."
      className="min-h-[80px]"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
    <Button size="icon" className="self-end" onClick={onSubmit}>
      <Send className="h-4 w-4" />
    </Button>
  </div>
))
ReplyInput.displayName = 'ReplyInput'

export function AppSpeakingPage() {
  const [newComment, setNewComment] = useState("")
  const [expandedComment, setExpandedComment] = useState<string | null>(null)
  const [replyText, setReplyText] = useState("")
  const [selectedTopic, setSelectedTopic] = useState<TopicType | null>(null)

  const handleExpandComment = useCallback((id: string) => {
    setExpandedComment(prev => prev === id ? null : id)
  }, [])

  const handleSubmitReply = useCallback(() => {
    // 处理回复提交逻辑
    setReplyText("")
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* 动态背景 */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-background to-muted opacity-50" />
      <div className="fixed inset-0 -z-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      {/* 主题选择器 */}
      <div className="flex gap-4 overflow-x-auto pb-2">
        {topics.map(({ type, icon, color }) => (
          <Button
            key={type}
            variant={selectedTopic === type ? "default" : "outline"}
            className="flex items-center gap-2"
            onClick={() => setSelectedTopic(type === selectedTopic ? null : type)}
          >
            <span className={cn("w-2 h-2 rounded-full", color)} />
            {icon}
            {type}
          </Button>
        ))}
      </div>

      {/* 页面标题 */}
      <div className="space-y-2">
        <motion.h1
          className="text-4xl font-bold"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          Let's Talk
        </motion.h1>
        <motion.p
          className="text-xl text-muted-foreground italic"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Share Your Thoughts & Questions
        </motion.p>
      </div>

      {/* 新评论输入框 */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Start a Discussion</h2>
        <div className="space-y-4">
          <Textarea
            placeholder="What's on your mind?"
            className="min-h-[120px]"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <div className="flex justify-end">
            <Button className="flex items-center gap-2">
              <Send className="h-4 w-4" />
              Post Comment
            </Button>
          </div>
        </div>
      </Card>

      {/* 评论列表 */}
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id}>
            <CommentCard
              comment={comment}
              onExpand={handleExpandComment}
            />
            <AnimatePresence>
              {expandedComment === comment.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {comment.replies.map((reply) => (
                    <CommentCard
                      key={reply.id}
                      comment={reply}
                      isReply
                      onExpand={handleExpandComment}
                    />
                  ))}
                  <ReplyInput
                    value={replyText}
                    onChange={setReplyText}
                    onSubmit={handleSubmitReply}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </motion.div>
  )
}