import type React from "react"
import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import "./globals.css"
import { ScrollToTop } from "@/components/scroll-to-top"
import { FloatingChatButton } from "@/components/floating-chat-button"
import Script from "next/script"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
})

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
})

export const metadata: Metadata = {
  title: "Callmint.tech - AI Agents & Custom AI Systems",
  description:
    "Transform your business with super-smart AI agents and custom AI systems that handle business communications like a pro. Pricing starts at just $299.",
  keywords: "AI call automation, voice AI, call center automation, AI agents, business automation, inbound agent, outbound agent, support agent",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        <Script src="/vite-client-fix.js" strategy="beforeInteractive" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <ScrollToTop />
        <FloatingChatButton />
        {children}
      </body>
    </html>
  )
}
