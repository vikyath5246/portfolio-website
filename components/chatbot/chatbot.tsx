"use client"

import { useState, useRef, useEffect } from "react"
import { MessageCircle, X, Send, Bot, User, Loader2 } from "lucide-react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { cn } from "../../lib/utils"

interface Message {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
}

interface ChatbotProps {
  className?: string
}

export function Chatbot({ className }: ChatbotProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hey there! I'm VIKI, your witty guide to all things Vikyath. What would you like to know about this tech wizard? 🚀",
      role: "assistant",
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue.trim(),
      role: "user",
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage.content,
          conversationHistory: messages.map(m => ({ role: m.role, content: m.content }))
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to get response")
      }

      const data = await response.json()
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response,
        role: "assistant",
        timestamp: new Date()
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error("Error sending message:", error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I apologize, but I'm having trouble connecting right now. Please try again in a moment.",
        role: "assistant",
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <>
      {/* Chat Toggle Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-6 right-6 z-50 h-12 w-12 md:h-14 md:w-14 rounded-full bg-teal-500 hover:bg-teal-600 shadow-lg transition-all duration-300 hover:scale-110 chatbot-button",
          isOpen && "scale-90 opacity-0 pointer-events-none",
          className
        )}
        aria-label="Toggle chatbot"
      >
        <MessageCircle className="h-5 w-5 md:h-6 md:w-6" />
      </Button>

              {/* Chat Interface */}
        <div
          className={cn(
            "fixed bottom-6 right-6 z-50 w-[calc(100vw-3rem)] max-w-96 max-h-[600px] bg-slate-800/95 backdrop-blur-sm border border-slate-700 rounded-2xl shadow-2xl transition-all duration-500 ease-out chat-interface",
            isOpen 
              ? "opacity-100 scale-100 translate-y-0" 
              : "opacity-0 scale-95 translate-y-4 pointer-events-none"
          )}
        >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-700">
                <div className="flex items-center space-x-3">
        <div className="h-8 w-8 rounded-full bg-teal-500 flex items-center justify-center">
          <Bot className="h-4 w-4 text-white" />
        </div>
        <div>
          <h3 className="font-semibold text-slate-200">Ask VIKI</h3>
          <p className="text-xs text-slate-400">Your witty guide to Vikyath's world</p>
        </div>
      </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(false)}
            className="h-8 w-8 p-0 hover:bg-slate-700"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[400px]">
          {messages.map((message, index) => (
            <div
              key={message.id}
              className={cn(
                "flex items-start space-x-3 message-enter",
                message.role === "user" ? "justify-end" : "justify-start"
              )}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {message.role === "assistant" && (
                <div className="h-6 w-6 rounded-full bg-teal-500 flex items-center justify-center flex-shrink-0">
                  <Bot className="h-3 w-3 text-white" />
                </div>
              )}
              <div
                className={cn(
                  "max-w-[80%] rounded-2xl px-4 py-2 text-sm",
                  message.role === "user"
                    ? "bg-teal-500 text-white ml-auto"
                    : "bg-slate-700 text-slate-200"
                )}
              >
                {message.content}
              </div>
              {message.role === "user" && (
                <div className="h-6 w-6 rounded-full bg-slate-600 flex items-center justify-center flex-shrink-0">
                  <User className="h-3 w-3 text-slate-300" />
                </div>
              )}
            </div>
          ))}
          
          {isLoading && (
            <div className="flex items-start space-x-3">
              <div className="h-6 w-6 rounded-full bg-teal-500 flex items-center justify-center flex-shrink-0">
                <Bot className="h-3 w-3 text-white" />
              </div>
              <div className="bg-slate-700 rounded-2xl px-4 py-2">
                <div className="loading-dots">
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-slate-700">
          <div className="flex space-x-2">
            <Input
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask VIKI anything about Vikyath..."
              className="flex-1 bg-slate-700 border-slate-600 text-slate-200 placeholder:text-slate-400 focus:border-teal-500 focus:ring-teal-500"
              disabled={isLoading}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isLoading}
              className="bg-teal-500 hover:bg-teal-600 disabled:opacity-50 disabled:cursor-not-allowed"
              size="sm"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
