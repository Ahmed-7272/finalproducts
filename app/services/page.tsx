"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Phone,
  MessageSquare,
  Headphones,
  Play,
  CheckCircle,
  ArrowRight,
  Zap,
  Brain,
  Mic,
  Bot,
  Cpu,
  Code,
  Database,
  Pause,
  Sparkles,
} from "lucide-react"
import Link from "next/link"
// import { MobileNav } from "@/components/mobile-nav"

export default function ServicesPage() {
  const [playingAudio, setPlayingAudio] = useState<string | null>(null)
  const audioRefs = useRef<{ [key: string]: HTMLAudioElement }>({})

  const playAudioDemo = (agentType: string, audioPath: string) => {
    // Stop any currently playing audio
    Object.values(audioRefs.current).forEach((audio) => {
      if (audio && !audio.paused) {
        audio.pause()
        audio.currentTime = 0
      }
    })

    // If clicking the same button that's playing, stop it
    if (playingAudio === agentType) {
      setPlayingAudio(null)
      return
    }

    // Create or get audio element
    if (!audioRefs.current[agentType]) {
      audioRefs.current[agentType] = new Audio(audioPath)
      audioRefs.current[agentType].addEventListener("ended", () => {
        setPlayingAudio(null)
      })
    }

    // Play the audio
    audioRefs.current[agentType].play()
    setPlayingAudio(agentType)
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 clean-grid opacity-10"></div>
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-green-100 rounded-full blur-2xl animate-pulse-neon"></div>
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-pink-100 rounded-full blur-2xl animate-pulse-neon delay-1000"></div>

      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md fixed top-0 w-full z-50 border-b border-gray-200">
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
              <Link href="/services" className="text-green-800 font-bold">
                Services
              </Link>
              <Link href="/pricing" className="text-black hover:text-green-800 transition-colors font-medium">
                Pricing
              </Link>
              <Link href="/chatbot" className="text-black hover:text-green-800 transition-colors font-medium">
                Chatbot
              </Link>
              <Link href="/contact" className="text-black hover:text-green-800 transition-colors font-medium">
                Contact
              </Link>
              <Button className="bg-green-500 hover:bg-green-600 text-white font-semibold green-glow">
                Try Now
              </Button>
            </div>
            {/* <MobileNav currentPage="/services" /> */}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <span className="inline-flex items-center px-6 py-3 rounded-full text-sm font-semibold bg-green-50 text-green-800 border border-green-200 mb-8">
              <Code className="w-4 h-4 mr-2 text-green-800" />
              Advanced AI Architecture
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-black mb-8">
            <span className="text-green-800">
              AI Agents
            </span>
            <br />
            <span className="text-black">Built with</span>
            <br />
            <span className="text-black font-black">Cutting-Edge Tech</span>
          </h1>
          <p className="text-xl text-black mb-8 font-medium">
            Three specialized AI agents powered by <span className="text-green-800 font-bold">n8n automation</span>,{" "}
            <span className="text-green-800 font-bold">VAPI voice AI</span>, and{" "}
            <span className="text-green-800 font-bold">advanced workflows</span> - crafted by our lead developer{" "}
            <span className="text-green-800 font-black">Ahmed</span>.
          </p>
        </div>
      </section>

      {/* Inbound Agent Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-8">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mr-6 green-glow">
                  <Phone className="w-8 h-8 text-green-800" />
                </div>
                <h2 className="text-4xl font-display font-bold text-black">Inbound Agent</h2>
              </div>
              <p className="text-lg text-black mb-8 font-medium leading-relaxed">
                Handle incoming customer queries with{" "}
                <span className="text-green-800 font-bold">intelligent responses</span>, natural conversation flow,
                and seamless call routing powered by{" "}
                <span className="text-green-800 font-bold">n8n workflows</span> and{" "}
                <span className="text-green-800 font-bold">VAPI integration</span>.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                  <CheckCircle className="w-5 h-5 text-green-800 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-black">24/7 availability with n8n automation workflows</span>
                </div>
                <div className="flex items-start bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                  <CheckCircle className="w-5 h-5 text-green-800 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-black">Advanced NLP processing with n8n workflow automation</span>
                </div>
                <div className="flex items-start bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                  <CheckCircle className="w-5 h-5 text-green-800 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-black">Intelligent routing with n8n decision nodes</span>
                </div>
                <div className="flex items-start bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                  <CheckCircle className="w-5 h-5 text-green-800 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-black">CRM integration via n8n connectors and webhooks</span>
                </div>
              </div>

              <Button
                className="bg-green-500 hover:bg-green-600 text-white font-bold green-glow transform hover:scale-105 transition-all duration-300"
                onClick={() => playAudioDemo("inbound", "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ElevenLabs_2025-08-03T12_57_02_Alice_pre_sp100_s50_sb75_se0_b_m2-jWjOVFusJFhMhFhD1PrOeefiDh6CH4.mp3")}
              >
                {playingAudio === "inbound" ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                {playingAudio === "inbound" ? "Stop Demo" : "Try Live Demo"}
              </Button>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-lg">
              <h3 className="text-2xl font-display font-bold text-black mb-6 flex items-center">
                <Cpu className="w-6 h-6 mr-3 text-green-800" />
                Tech Stack & Use Cases
              </h3>
              <div className="space-y-6">
                <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                  <h4 className="font-display font-semibold text-black mb-3 flex items-center">
                    <Code className="w-4 h-4 mr-2 text-green-800" />
                    Customer Support Automation
                  </h4>
                  <p className="text-black text-sm font-medium">
                    Built with n8n automation workflows and VAPI integration for real-time query processing
                  </p>
                </div>
                <div className="bg-gradient-to-r from-pink-50 to-blue-50 rounded-xl p-6 border border-gray-200">
                  <h4 className="font-display font-semibold text-black mb-3 flex items-center">
                    <Database className="w-4 h-4 mr-2 text-green-800" />
                    Lead Qualification Engine
                  </h4>
                  <p className="text-black text-sm font-medium">
                    Advanced algorithms with n8n workflow logic for intelligent lead scoring and routing
                  </p>
                </div>
                <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                  <h4 className="font-display font-semibold text-black mb-3 flex items-center">
                    <Zap className="w-4 h-4 mr-2 text-green-800" />
                    Appointment Scheduling
                  </h4>
                  <p className="text-black text-sm font-medium">
                    Calendar integrations with n8n scheduling nodes and VAPI voice confirmation
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Outbound Agent Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="bg-gray-50 rounded-3xl p-8 border border-gray-200 shadow-lg order-2 lg:order-1">
              <h3 className="text-2xl font-display font-bold text-black mb-6 flex items-center">
                <Brain className="w-6 h-6 mr-3 text-green-800" />
                Advanced Architecture
              </h3>
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-pink-50 to-blue-50 rounded-xl p-6 border border-gray-200">
                  <h4 className="font-display font-semibold text-black mb-3 flex items-center">
                    <Code className="w-4 h-4 mr-2 text-green-800" />
                    Sales Outreach Engine
                  </h4>
                  <p className="text-black text-sm font-medium">
                    Automated cold calling with n8n-powered personalized script generation
                  </p>
                </div>
                <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                  <h4 className="font-display font-semibold text-black mb-3 flex items-center">
                    <Zap className="w-4 h-4 mr-2 text-green-800" />
                    Follow-up Automation
                  </h4>
                  <p className="text-black text-sm font-medium">
                    n8n-powered nurture sequences with VAPI voice engagement
                  </p>
                </div>
                <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                  <h4 className="font-display font-semibold text-black mb-3 flex items-center">
                    <Database className="w-4 h-4 mr-2 text-green-800" />
                    Survey & Analytics
                  </h4>
                  <p className="text-black text-sm font-medium">
                    Real-time feedback collection with n8n data processing and VAPI voice surveys
                  </p>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="flex items-center mb-8">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mr-6 green-glow">
                  <MessageSquare className="w-8 h-8 text-green-800" />
                </div>
                <h2 className="text-4xl font-display font-bold text-black">Outbound Agent</h2>
              </div>
              <p className="text-lg text-black mb-8 font-medium leading-relaxed">
                Automate sales calls and follow-ups with{" "}
                <span className="text-green-800 font-bold">personalized scripts</span>, natural conversations, and
                intelligent lead nurturing powered by{" "}
                <span className="text-green-800 font-bold">n8n automation</span> and{" "}
                <span className="text-green-800 font-bold">VAPI voice technology</span>.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                  <CheckCircle className="w-5 h-5 text-green-800 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-black">Dynamic script generation with n8n workflow logic</span>
                </div>
                <div className="flex items-start bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                  <CheckCircle className="w-5 h-5 text-green-800 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-black">Automated sequences with n8n trigger-based workflows</span>
                </div>
                <div className="flex items-start bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                  <CheckCircle className="w-5 h-5 text-green-800 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-black">Real-time conversation adaptation with n8n conditional logic</span>
                </div>
                <div className="flex items-start bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                  <CheckCircle className="w-5 h-5 text-green-800 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-black">Advanced CRM integration with n8n native connectors</span>
                </div>
              </div>

              <Button
                className="bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600 text-white font-bold green-glow transform hover:scale-105 transition-all duration-300"
                onClick={() => playAudioDemo("outbound", "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ElevenLabs_2025-08-03T12_55_15_Brian_pre_sp101_s50_sb75_se0_b_m2-HA0lquY9vpqzODxrNsuxpa7nt2LbDL.mp3")}
              >
                {playingAudio === "outbound" ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                {playingAudio === "outbound" ? "Stop Demo" : "Try Live Demo"}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Support Agent Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-8">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mr-6 green-glow">
                  <Headphones className="w-8 h-8 text-green-800" />
                </div>
                <h2 className="text-4xl font-display font-bold text-black">Support Agent</h2>
              </div>
              <p className="text-lg text-black mb-8 font-medium leading-relaxed">
                Provide 24/7 customer support with{" "}
                <span className="text-green-800 font-bold">instant problem resolution</span>, knowledge base
                integration, and intelligent escalation powered by{" "}
                <span className="text-green-800 font-bold">n8n workflows</span> and{" "}
                <span className="text-green-800 font-bold">VAPI voice AI</span>.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                  <CheckCircle className="w-5 h-5 text-green-800 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-black">Instant knowledge base access with n8n data retrieval</span>
                </div>
                <div className="flex items-start bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                  <CheckCircle className="w-5 h-5 text-green-800 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-black">Multi-language support with n8n translation workflows</span>
                </div>
                <div className="flex items-start bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                  <CheckCircle className="w-5 h-5 text-green-800 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-black">Sentiment analysis with n8n AI processing nodes</span>
                </div>
                <div className="flex items-start bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                  <CheckCircle className="w-5 h-5 text-green-800 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-black">Advanced ticket management with n8n workflow automation</span>
                </div>
              </div>

              <Button
                className="bg-gradient-to-r from-neon-green to-neon-blue hover:from-neon-green/80 hover:to-neon-blue/80 text-white font-bold neon-glow transform hover:scale-105 transition-all duration-300"
                onClick={() => playAudioDemo("support", "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ElevenLabs_2025-08-03T12_56_07_Callum_pre_sp109_s50_sb75_se0_b_m2-va6y1jztJwTNnBlYFQM7Z6hsm3f17r.mp3")}
              >
                {playingAudio === "support" ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                {playingAudio === "support" ? "Stop Demo" : "Try Live Demo"}
              </Button>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-lg">
              <h3 className="text-2xl font-display font-bold text-black mb-6 flex items-center">
                <Sparkles className="w-6 h-6 mr-3 text-green-800" />
                Enterprise Solutions
              </h3>
              <div className="space-y-6">
                <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                  <h4 className="font-display font-semibold text-black mb-3 flex items-center">
                    <Code className="w-4 h-4 mr-2 text-green-800" />
                    Technical Support Engine
                  </h4>
                  <p className="text-black text-sm font-medium">
                    Advanced troubleshooting with n8n diagnostic workflows and VAPI voice guidance
                  </p>
                </div>
                <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                  <h4 className="font-display font-semibold text-black mb-3 flex items-center">
                    <Database className="w-4 h-4 mr-2 text-green-800" />
                    Account Management
                  </h4>
                  <p className="text-black text-sm font-medium">
                    Billing and subscription management with n8n automation and secure processing
                  </p>
                </div>
                <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                  <h4 className="font-display font-semibold text-black mb-3 flex items-center">
                    <Brain className="w-4 h-4 mr-2 text-green-800" />
                    Product Intelligence
                  </h4>
                  <p className="text-black text-sm font-medium">
                    Detailed product information with n8n data workflows and real-time VAPI updates
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-display font-bold text-black mb-6">
            <span className="text-green-800">
              Powered by
            </span>
            <br />
            <span className="text-black">Next-Gen Technology</span>
          </h2>
          <p className="text-xl text-black mb-16 font-medium">
            Built with the most advanced web technologies for enterprise-grade performance
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="glass-card border-neon-blue/30 hover:border-neon-blue/60 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-neon-blue/20">
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-neon-blue/20 to-neon-blue/40 rounded-2xl flex items-center justify-center mx-auto mb-8 neon-glow">
                  <Mic className="w-10 h-10 text-neon-blue" />
                </div>
                <h3 className="text-2xl font-display font-bold text-black mb-4">VAPI Integration</h3>
                <p className="text-gray-700 font-light leading-relaxed">
                  Advanced voice AI platform integrated with n8n workflows for natural, human-like conversations with
                  ultra-low latency.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card border-neon-purple/30 hover:border-neon-purple/60 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-neon-purple/20">
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-neon-purple/20 to-neon-purple/40 rounded-2xl flex items-center justify-center mx-auto mb-8 neon-glow">
                  <Brain className="w-10 h-10 text-neon-purple" />
                </div>
                <h3 className="text-2xl font-display font-bold text-black mb-4">Relevance AI</h3>
                <p className="text-gray-700 font-light leading-relaxed">
                  Intelligent automation platform powered by n8n workflow orchestration for context-aware responses and
                  decision making.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card border-neon-green/30 hover:border-neon-green/60 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-neon-green/20">
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-neon-green/20 to-neon-green/40 rounded-2xl flex items-center justify-center mx-auto mb-8 neon-glow">
                  <Zap className="w-10 h-10 text-neon-green" />
                </div>
                <h3 className="text-2xl font-display font-bold text-black mb-4">GPT Technology</h3>
                <p className="text-gray-700 font-light leading-relaxed">
                  Latest GPT models integrated with n8n AI nodes for advanced language understanding and generation
                  capabilities.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="glass-card rounded-3xl p-12 neon-glow">
            <h2 className="text-4xl md:text-6xl font-display font-bold text-black mb-8">
              Ready to Deploy
              <span className="bg-gradient-to-r from-green-800 to-green-600 bg-clip-text text-transparent block">
                Your AI Agents?
              </span>
            </h2>
            <p className="text-xl text-gray-700 mb-12 font-light">
              Get started with CallMint.tech today and transform your business communications with cutting-edge
              technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/pricing">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-neon-blue to-neon-purple hover:from-neon-blue/80 hover:to-neon-purple/80 text-white px-12 py-4 text-lg font-bold neon-glow transform hover:scale-105 transition-all duration-300"
                >
                  <Zap className="w-5 h-5 mr-2" />
                  View Pricing
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="glass border-gray-300 text-black hover:bg-gray-100 px-12 py-4 text-lg font-bold transform hover:scale-105 transition-all duration-300 bg-transparent"
                onClick={() => window.open('tel:+18202808433', '_self')}
              >
                <Phone className="w-5 h-5 mr-2" />
                Try AI Agent
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="glass border-t border-white/10 py-16 px-4 sm:px-6 lg:px-8 mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center">
                  <img src="/image-removebg-preview.png" alt="CallMint.tech Logo" className="h-8 w-auto" />
                </div>
                <span className="text-2xl font-display font-bold text-black">
                  CallMint.tech
                </span>
              </div>
              <p className="text-black font-light">
                Next-generation AI call automation built with n8n, VAPI, and advanced workflows by developer Ahmed for
                the future of business.
              </p>
            </div>

            <div>
              <h4 className="font-display font-semibold text-black mb-6">Product</h4>
              <ul className="space-y-3 text-black">
                <li>
                  <Link href="/services" className="hover:text-green-800 transition-colors">
                    AI Services
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="hover:text-green-800 transition-colors">
                    Pricing Plans
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-green-800 transition-colors">
                    Get Started
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-display font-semibold text-black mb-6">Company</h4>
              <ul className="space-y-3 text-black">
                <li>
                  <Link href="/contact" className="hover:text-green-800 transition-colors">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-green-800 transition-colors">
                    Support
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-green-800 transition-colors">
                    Enterprise
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 mt-12 pt-8 text-center text-black">
            <p>&copy; 2025 CallMint.tech. All rights reserved. Built with React, Node.js & Next.js.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
