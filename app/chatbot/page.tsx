"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Bot,
  Send,
  User,
  ArrowRight,
  Sparkles,
  FileText,
  RefreshCw,
  X,
  MessageSquare
} from "lucide-react"
import Link from "next/link"
// import { MobileNav } from "@/components/mobile-nav"

interface Message {
  role: "user" | "assistant" | "system"
  content: string
  timestamp: Date
}

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I'm the Callmint.Tech assistant. How can I help you today?",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom of chat when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (!input.trim()) return

    // Add user message to chat
    const userMessage: Message = {
      role: "user",
      content: input,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      // Call the OpenAI API endpoint
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(m => ({
            role: m.role,
            content: m.content
          }))
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to get response')
      }

      const data = await response.json()
      const assistantMessage: Message = {
        role: 'assistant',
        content: data.message,
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error("Error getting chatbot response:", error)
      const errorMessage: Message = {
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again later.",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const clearChat = () => {
    setMessages([
      {
        role: "assistant",
        content: "Hello! I'm the Callmint.Tech assistant. How can I help you today?",
        timestamp: new Date(),
      },
    ])
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 clean-grid opacity-10"></div>
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-green-100 rounded-full blur-2xl animate-pulse"></div>
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-green-100 rounded-full blur-2xl animate-pulse delay-1000"></div>
      <div className="fixed inset-0 bg-white/70"></div>

      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md fixed top-0 w-full z-50 border-b border-gray-200 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center">
              <img src="/image-removebg-preview.png" alt="CallMint.tech Logo" className="h-12 w-auto" />
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-black hover:text-green-800 transition-colors font-medium">
                Home
              </Link>
              <Link href="/about" className="text-black hover:text-green-800 transition-colors font-medium">
                About
              </Link>
              <Link href="/services" className="text-black hover:text-green-800 transition-colors font-medium">
                Services
              </Link>
              <Link href="/pricing" className="text-black hover:text-green-800 transition-colors font-medium">
                Pricing
              </Link>
              <Link href="/chatbot" className="text-green-800 font-bold">
                Chatbot
              </Link>
              <Link href="/contact" className="text-black hover:text-green-800 transition-colors font-medium">
                Contact
              </Link>
              <Link href="/pricing">
                <Button className="bg-green-500 hover:bg-green-600 text-white font-semibold green-glow">
                  Try Now
                </Button>
              </Link>
            </div>
            {/* <MobileNav currentPage="/chatbot" /> */}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 sm:pt-32 pb-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6 sm:mb-8">
            <span className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-semibold bg-green-100 text-green-800 border border-green-200 mb-6 sm:mb-8">
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-green-800" />
              AI-Powered Assistant
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-bold mb-6 sm:mb-8 leading-tight">
            <span className="text-black">
              Chat with our
            </span>
            <br />
            <span className="text-green-800">AI Assistant</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-black mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
            Get instant answers about our services, pricing, and how our AI call agents can transform your business communications.
          </p>
        </div>
      </section>

      {/* Chat Interface */}
      <section className="pb-24 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-white border-2 border-gray-200 overflow-hidden shadow-2xl">
            <CardContent className="p-0">
              {/* Chat Header */}
              <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 flex justify-between items-center border-b border-gray-200 shadow-md">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center mr-3 shadow-lg green-glow">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium text-black text-lg">Callmint.Tech Assistant</h3>
                    <p className="text-xs text-black">This AI chatbot is developed by lead AI engineer of CallMint.tech</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-black border-gray-300 hover:text-black hover:bg-gray-50 hover:border-gray-400"
                  onClick={clearChat}
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Clear Chat
                </Button>
              </div>

              {/* Messages Container */}
              <div className="h-[500px] overflow-y-auto p-6 space-y-6 bg-gray-50" style={{ scrollBehavior: 'smooth' }}>
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl p-4 shadow-xl ${message.role === "user"
                        ? "bg-green-500 text-white ml-12 border border-green-300"
                        : "bg-white border border-gray-200 text-black mr-12"
                        }`}
                    >
                      <div className="flex items-start mb-2">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${message.role === "user"
                            ? "bg-green-600"
                            : "bg-blue-500"
                            }`}
                        >
                          {message.role === "user" ? (
                            <User className="w-4 h-4 text-white" />
                          ) : (
                            <div className="w-12 h-10 rounded-lg shadow-md bg-green-50 flex items-center justify-center">
                    <img src="/image-removebg-preview.png" alt="CallMint.tech Logo" className="h-6 w-auto" />
                  </div>
                          )}
                        </div>
                        <div>
                          <p className={`text-xs font-medium ${message.role === "user" ? "text-white/80" : "text-black"}`}>
                            {message.role === "user" ? "You" : "Assistant"}
                          </p>
                          <p className={`text-xs ${message.role === "user" ? "text-white/60" : "text-black"}`}>
                            {message.timestamp.toISOString().slice(11, 19)}
                          </p>
                        </div>
                      </div>
                      <p className="whitespace-pre-wrap">{message.content}</p>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="max-w-[80%] bg-white border border-gray-200 text-black mr-12 p-4 rounded-2xl shadow-xl">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center shadow-md">
                          <Bot className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex space-x-2">
                          <div className="w-3 h-3 rounded-full bg-blue-500 animate-bounce"></div>
                          <div className="w-3 h-3 rounded-full bg-blue-500 animate-bounce delay-150"></div>
                          <div className="w-3 h-3 rounded-full bg-blue-500 animate-bounce delay-300"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="border-t border-gray-200 p-6 bg-white">
                <form onSubmit={handleSendMessage}>
                  <div className="flex items-center space-x-3">
                    <Input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Type your message..."
                      className="flex-1 bg-gray-50 border-gray-300 focus-visible:ring-green-500 text-black py-6 px-4 text-base shadow-inner"
                      disabled={isLoading}
                    />
                    <Button
                      type="submit"
                      size="lg"
                      className="bg-green-500 hover:bg-green-600 text-white shadow-lg py-6 green-glow"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <RefreshCw className="h-5 w-5 animate-spin mr-2" />
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <Send className="h-5 w-5 mr-2" />
                          <span>Send</span>
                        </>
                      )}
                    </Button>
                  </div>
                </form>
                
                <p className="text-sm text-black mt-4 text-center">
                  This AI assistant has knowledge about CallMint.tech services and can answer your questions.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 relative z-10 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-4xl font-display font-bold mb-4">
              <span className="gradient-text">
                Powered by Advanced AI
              </span>
            </h2>
            <p className="text-gray-700 max-w-2xl mx-auto text-lg">
              Our chatbot leverages the latest in AI technology to provide accurate and helpful responses
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-white border-2 border-gray-200 hover:border-green-300 transition-all duration-300 transform hover:-translate-y-2 shadow-xl">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-6 shadow-md">
                  <Bot className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-xl font-display font-bold text-gray-900 mb-3">AI-Powered Responses</h3>
                <p className="text-gray-600">
                  Get instant, accurate answers powered by OpenAI's advanced language models
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-2 border-gray-200 hover:border-green-800 transition-all duration-300 transform hover:-translate-y-2 shadow-xl">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-6 shadow-md">
                  <FileText className="w-8 h-8 text-green-800" />
                </div>
                <h3 className="text-xl font-display font-bold text-gray-900 mb-3">Document Knowledge</h3>
                <p className="text-gray-600">
                  Our AI is trained on our documentation to provide specific information about our services
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-2 border-gray-200 hover:border-blue-300 transition-all duration-300 transform hover:-translate-y-2 shadow-xl">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-6 shadow-md">
                  <Sparkles className="w-8 h-8 text-blue-500" />
                </div>
                <h3 className="text-xl font-display font-bold text-gray-900 mb-3">24/7 Availability</h3>
                <p className="text-gray-600">
                  Get help anytime, day or night, with our always-on AI assistant
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 relative z-10 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="bg-white border-2 border-gray-200 overflow-hidden shadow-2xl">
            <CardContent className="p-8 sm:p-12 bg-gradient-to-b from-white to-gray-50">
              <h2 className="text-2xl sm:text-3xl font-display font-bold mb-6">
                <span className="gradient-text">
                  Ready to transform your business?
                </span>
              </h2>
              <p className="text-gray-700 mb-8 max-w-2xl mx-auto text-lg">
                Talk to a human and learn how our AI call agents can revolutionize your customer communications
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button className="bg-green-500 hover:bg-green-600 text-white px-8 py-6 text-lg font-bold shadow-2xl transform hover:scale-105 transition-all duration-300 w-full sm:w-auto green-glow">
                    Contact Sales
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button variant="outline" className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-6 text-lg font-bold shadow-xl transform hover:scale-105 transition-all duration-300 bg-transparent w-full sm:w-auto">
                    View Pricing
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}