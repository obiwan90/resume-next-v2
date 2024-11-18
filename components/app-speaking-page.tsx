"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MessageSquare, Send, Trash2 } from 'lucide-react'

// In a real application, this would be fetched from a database
const initialMessages = [
  { id: 1, author: "Alice", content: "Your portfolio is amazing! Love the projects.", color: "#FFB3BA" },
  { id: 2, author: "Bob", content: "Would love to collaborate on a blockchain project!", color: "#BAFFC9" },
  { id: 3, author: "Charlie", content: "Your AR shopping app is revolutionary. Great job!", color: "#BAE1FF" },
]

export function AppSpeakingPage() {
  const [messages, setMessages] = useState(initialMessages)
  const [newMessage, setNewMessage] = useState({ author: "", content: "" })
  const [isTyping, setIsTyping] = useState(false)

  const addMessage = () => {
    if (newMessage.author && newMessage.content) {
      const color = `hsl(${Math.random() * 360}, 100%, 80%)`
      setMessages([...messages, { ...newMessage, id: Date.now(), color }])
      setNewMessage({ author: "", content: "" })
    }
  }

  const removeMessage = (id: number) => {
    setMessages(messages.filter(message => message.id !== id))
  }

  useEffect(() => {
    let timeout: NodeJS.Timeout
    if (newMessage.content) {
      setIsTyping(true)
      timeout = setTimeout(() => setIsTyping(false), 1000)
    } else {
      setIsTyping(false)
    }
    return () => clearTimeout(timeout)
  }, [newMessage.content])

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold mb-8">Speaking</h1>
        <div className="max-w-2xl mx-auto mb-8">
          <Card className="p-4">
            <div className="mb-4">
              <Input
                placeholder="Your Name"
                value={newMessage.author}
                onChange={(e) => setNewMessage({ ...newMessage, author: e.target.value })}
                className="mb-2"
              />
              <Textarea
                placeholder="Your Message"
                value={newMessage.content}
                onChange={(e) => setNewMessage({ ...newMessage, content: e.target.value })}
                className="mb-2"
              />
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  {isTyping ? "Typing..." : ""}
                </span>
                <Button onClick={addMessage}>
                  <Send className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              </div>
            </div>
          </Card>
        </div>
        <motion.div
          className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.1 } }
          }}
        >
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                whileHover={{ scale: 1.05 }}
                style={{ backgroundColor: message.color }}
                className="p-4 rounded-lg shadow-lg relative overflow-hidden"
              >
                <h3 className="font-semibold mb-2">{message.author}</h3>
                <p className="text-sm">{message.content}</p>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2"
                  onClick={() => removeMessage(message.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
                <MessageSquare className="absolute bottom-2 right-2 opacity-10 h-12 w-12" />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </>
  )
}