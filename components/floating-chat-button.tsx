"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Bot, X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function FloatingChatButton() {
  const [isVisible, setIsVisible] = useState(true)
  const pathname = usePathname()
  
  // Hide the button if we're already on the chatbot page
  useEffect(() => {
    setIsVisible(pathname !== "/chatbot")
  }, [pathname])
  
  if (!isVisible) return null
  
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Link href="/chatbot">
        <div className="relative w-20 h-20 flex items-center justify-center rounded-xl cursor-pointer transition-all duration-300 hover:scale-105 shadow-lg">
          <div className="w-16 h-16 rounded-lg shadow-md border-2 border-white bg-green-50 flex items-center justify-center">
            <img src="/image-removebg-preview.png" alt="CallMint.tech Logo" className="h-8 w-auto" />
          </div>
        </div>
      </Link>
    </div>
  )
}