"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Phone,
  MessageSquare,
  Headphones,
  Calendar,
  ArrowRight,
  Zap,
  Shield,
  Bot,
  Sparkles,
  Cpu,
  Pause,
} from "lucide-react"
import Link from "next/link"
import { useState, useRef, useEffect } from "react"
import { MobileNav } from "@/components/mobile-nav"
import { LoginModal } from "@/components/login-modal"
import { FreeConsultationModal } from "@/components/free-consultation-modal"
import { AuthService } from "@/lib/auth"

export default function HomePage() {
  const [playingAudio, setPlayingAudio] = useState<string | null>(null)
  const audioRefs = useRef<{ [key: string]: HTMLAudioElement }>({})

  // Initialize demo users on component mount
  useEffect(() => {
    AuthService.initializeDemoUsers()
  }, [])

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
            <div className="flex items-center">
              <img src="/image-removebg-preview.png" alt="CallMint.tech Logo" className="h-12 sm:h-14 w-auto" />
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-black hover:text-green-800 transition-colors font-bold">
                Home
              </Link>
              <Link href="/about" className="text-black hover:text-green-800 transition-colors font-bold">
                About
              </Link>
              <Link href="/services" className="text-black hover:text-green-800 transition-colors font-bold">
                Services
              </Link>
              <Link href="/pricing" className="text-black hover:text-green-800 transition-colors font-bold">
                Pricing
              </Link>
              <Link href="/chatbot" className="text-black hover:text-green-800 transition-colors font-bold">
                Chatbot
              </Link>
              <Link href="/contact" className="text-black hover:text-green-800 transition-colors font-bold">
                Contact
              </Link>
              <LoginModal>
                <Button variant="outline" className="border-green-500 text-green-500 hover:bg-green-50 font-semibold">
                  Login
                </Button>
              </LoginModal>
              <Link href="/pricing">
                <Button className="bg-green-500 hover:bg-green-600 text-white font-semibold green-glow">
                  Try Now
                </Button>
              </Link>
            </div>
            <div className="flex md:hidden items-center">
              <MobileNav currentPage="/" />
            </div>
          </div>
        </div>
      </nav>

      {/* Dividing Line */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mt-16"></div>



      {/* Hero Section */}
      <section className="relative pt-8 sm:pt-16 pb-12 sm:pb-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="mb-6 sm:mb-8">
            <span className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-semibold bg-green-50 text-green-800 border border-green-200 mb-6 sm:mb-8">
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-green-800" />
              Next-Gen AI Call Automation
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-8xl font-display font-black mb-6 sm:mb-8 leading-tight">
            <span className="text-black">
              Transform Your
            </span>
            <br />
            <span className="text-green-800 font-black">Business</span>
            <br />
            <span className="text-black font-black">with AI Agents</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-black mb-8 sm:mb-12 max-w-4xl mx-auto leading-relaxed font-medium px-4">
            Deploy intelligent AI call agents powered by{" "}
            <span className="text-green-800 font-bold">n8n automation</span>,{" "}
            <span className="text-green-800 font-bold">VAPI voice AI</span>, and{" "}
            <span className="text-green-800 font-bold">advanced workflows</span> - crafted by our lead developer{" "}
            <span className="text-green-800 font-black">Ahmed</span>.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mb-12 sm:mb-20 px-4">
            <FreeConsultationModal>
              <Button
                size="lg"
                className="bg-green-500 hover:bg-green-600 text-white px-6 sm:px-12 py-3 sm:py-4 text-base sm:text-lg font-bold shadow-lg green-glow transform hover:scale-105 transition-all duration-300"
              >
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Free Consultation
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
              </Button>
            </FreeConsultationModal>
            <Link href="/pricing">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-green-800 text-green-800 hover:bg-green-50 px-6 sm:px-12 py-3 sm:py-4 text-base sm:text-lg font-bold shadow-lg transform hover:scale-105 transition-all duration-300 bg-white"
              >
                <Zap className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-green-800" />
                Start 14-Day Pilot
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 text-green-800" />
              </Button>
            </Link>
          </div>

          {/* Floating Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 max-w-5xl mx-auto px-4">
            <div className="glass-card rounded-2xl p-4 sm:p-8 transform hover:scale-105 transition-all duration-300 animate-float">
              <div className="text-2xl sm:text-4xl font-bold text-green-800 mb-2">
                10,000+
              </div>
              <div className="text-black font-medium text-sm sm:text-base">Calls Automated Daily</div>
            </div>
            <div className="glass-card rounded-2xl p-4 sm:p-8 transform hover:scale-105 transition-all duration-300 animate-float delay-200">
              <div className="text-2xl sm:text-4xl font-bold text-green-800 mb-2">
                99.9%
              </div>
              <div className="text-black font-medium text-sm sm:text-base">Uptime Guarantee</div>
            </div>
            <div className="glass-card rounded-2xl p-4 sm:p-8 transform hover:scale-105 transition-all duration-300 animate-float delay-400">
              <div className="text-2xl sm:text-4xl font-bold text-green-800 mb-2">
                24/7
              </div>
              <div className="text-black font-medium text-sm sm:text-base">AI Support Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Agents Section */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-20">
            <h2 className="text-2xl sm:text-4xl md:text-6xl font-display font-bold mb-4 sm:mb-6">
              <span className="text-green-800">
                AI Agents
              </span>
              <span className="text-black"> That Never Sleep</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-black max-w-3xl mx-auto font-light px-4">
              Three specialized AI agents working in perfect harmony to revolutionize your business communications
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Inbound Agent */}
            <Card className="group glass-card border-green-800/30 hover:border-green-800/60 transition-all duration-500 transform hover:-translate-y-2 sm:hover:-translate-y-4 hover:shadow-2xl hover:shadow-green-800/20">
              <CardContent className="p-4 sm:p-8 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-green-800/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-br from-green-800/20 to-green-800/40 rounded-3xl flex items-center justify-center mx-auto mb-4 sm:mb-8 green-glow group-hover:scale-110 transition-transform duration-300">
                    <Phone className="w-8 h-8 sm:w-12 sm:h-12 text-green-800" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-black mb-3 sm:mb-4">Inbound Agent</h3>
                  <p className="text-black mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base">
                    Handle incoming customer queries with superhuman intelligence and seamless call routing.
                  </p>
                  <Button
                    variant="outline"
                    className="glass border-green-800/50 text-green-800 hover:bg-green-800/10 font-semibold bg-transparent text-sm sm:text-base"
                    onClick={() => window.open('tel:+18202808433', '_self')}
                  >
                    <Phone className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                    Try AI Agent
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Outbound Agent */}
            <Card className="group glass-card border-green-800/30 hover:border-green-800/60 transition-all duration-500 transform hover:-translate-y-2 sm:hover:-translate-y-4 hover:shadow-2xl hover:shadow-green-800/20">
              <CardContent className="p-4 sm:p-8 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-green-800/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-br from-green-800/20 to-green-800/40 rounded-3xl flex items-center justify-center mx-auto mb-4 sm:mb-8 green-glow group-hover:scale-110 transition-transform duration-300">
                    <MessageSquare className="w-8 h-8 sm:w-12 sm:h-12 text-green-800" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-black mb-3 sm:mb-4">Outbound Agent</h3>
                  <p className="text-black mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base">
                    Automate sales calls with personalized scripts and natural, persuasive conversations.
                  </p>
                  <Button
                    variant="outline"
                    className="glass border-green-800/50 text-green-800 hover:bg-green-800/10 font-semibold bg-transparent text-sm sm:text-base"
                    onClick={() => window.open('tel:+18202808433', '_self')}
                  >
                    <Phone className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                    Try AI Agent
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Support Agent */}
            <Card className="group glass-card border-green-800/30 hover:border-green-800/60 transition-all duration-500 transform hover:-translate-y-2 sm:hover:-translate-y-4 hover:shadow-2xl hover:shadow-green-800/20">
              <CardContent className="p-4 sm:p-8 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-green-800/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-br from-green-800/20 to-green-800/40 rounded-3xl flex items-center justify-center mx-auto mb-4 sm:mb-8 green-glow group-hover:scale-110 transition-transform duration-300">
                    <Headphones className="w-8 h-8 sm:w-12 sm:h-12 text-green-800" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-black mb-3 sm:mb-4">Support Agent</h3>
                  <p className="text-black mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base">
                    Provide instant 24/7 support with advanced problem-solving and escalation intelligence.
                  </p>
                  <Button
                    variant="outline"
                    className="glass border-green-800/50 text-green-800 hover:bg-green-800/10 font-semibold bg-transparent text-sm sm:text-base"
                    onClick={() => window.open('tel:+18202808433', '_self')}
                  >
                    <Phone className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                    Try AI Agent
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-20">
            <h2 className="text-2xl sm:text-4xl md:text-6xl font-display font-bold mb-4 sm:mb-6">
              <span className="text-black">Why Choose </span>
              <span className="text-green-800">
                CallMint.tech?
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-8 group-hover:scale-110 transition-transform duration-300">
                <Zap className="w-8 h-8 sm:w-10 sm:h-10 text-green-800" />
              </div>
              <h3 className="text-xl sm:text-2xl font-display font-bold text-black mb-3 sm:mb-4">Lightning Fast</h3>
              <p className="text-black leading-relaxed text-sm sm:text-base">
                Deploy AI agents in minutes, not months. Revolutionary speed meets enterprise reliability.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-8 group-hover:scale-110 transition-transform duration-300">
                <Cpu className="w-8 h-8 sm:w-10 sm:h-10 text-green-800" />
              </div>
              <h3 className="text-xl sm:text-2xl font-display font-bold text-black mb-3 sm:mb-4">Infinitely Scalable</h3>
              <p className="text-black leading-relaxed text-sm sm:text-base">
                Handle millions of calls simultaneously with quantum-grade infrastructure.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-8 group-hover:scale-110 transition-transform duration-300">
                <Shield className="w-8 h-8 sm:w-10 sm:h-10 text-green-800" />
              </div>
              <h3 className="text-xl sm:text-2xl font-display font-bold text-black mb-3 sm:mb-4">Military-Grade Security</h3>
              <p className="text-black leading-relaxed text-sm sm:text-base">
                Enterprise security with quantum encryption and zero-trust architecture.
              </p>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mt-12 sm:mt-16">
            <div className="flex items-center space-x-3 bg-green-50 px-4 sm:px-6 py-2 sm:py-3 rounded-full border border-green-200">
              <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-green-800" />
              <span className="text-green-800 font-semibold text-sm sm:text-base">HIPAA-Ready</span>
            </div>
            <div className="flex items-center space-x-3 bg-green-50 px-4 sm:px-6 py-2 sm:py-3 rounded-full border border-green-200">
              <img src="/callmint-logo.svg" alt="CallMint.tech Logo" className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-green-800 font-semibold text-sm sm:text-base">Powered by GPT-5</span>
            </div>
          </div>

          {/* Testimonials */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mt-12 sm:mt-16">
            <div className="glass-card rounded-2xl p-4 sm:p-8 border border-gray-200">
              <div className="flex items-center mb-3 sm:mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-800 rounded-full flex items-center justify-center mr-3 sm:mr-4">
                  <span className="text-white font-bold text-sm sm:text-lg">JD</span>
                </div>
                <div>
                  <h4 className="text-black font-semibold text-sm sm:text-base">Dr. John Davis</h4>
                  <p className="text-black text-xs sm:text-sm">Medical Director, HealthFirst Clinic</p>
                </div>
              </div>
              <p className="text-black italic text-sm sm:text-base">"CallMint.tech transformed our patient scheduling. The AI handles 200+ calls daily with 99% accuracy. Game changer!"</p>
            </div>
            <div className="glass-card rounded-2xl p-4 sm:p-8 border border-gray-200">
              <div className="flex items-center mb-3 sm:mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-800 rounded-full flex items-center justify-center mr-3 sm:mr-4">
                  <span className="text-white font-bold text-sm sm:text-lg">SM</span>
                </div>
                <div>
                  <h4 className="text-black font-semibold text-sm sm:text-base">Sarah Martinez</h4>
                  <p className="text-black text-xs sm:text-sm">CEO, TechFlow Solutions</p>
                </div>
              </div>
              <p className="text-black italic text-sm sm:text-base">"Our sales team productivity increased 300% with CallMint's AI agents. ROI in the first month!"</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-4xl mx-auto text-center">
          <div className="glass-card rounded-3xl p-6 sm:p-12 border border-gray-200">
            <h2 className="text-2xl sm:text-4xl md:text-6xl font-display font-bold text-black mb-6 sm:mb-8">
              Ready to Enter the
              <span className="text-green-800 block">
                Future?
              </span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-black mb-8 sm:mb-12 font-light">
              Join the AI revolution. Transform your business with intelligent automation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
              <FreeConsultationModal>
                <Button
                  size="lg"
                  className="bg-green-500 hover:bg-green-600 text-white px-6 sm:px-12 py-3 sm:py-4 text-base sm:text-lg font-bold transform hover:scale-105 transition-all duration-300"
                >
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Free Consultation
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                </Button>
              </FreeConsultationModal>
              <Link href="/pricing">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-green-800 text-green-800 hover:bg-green-50 px-6 sm:px-12 py-3 sm:py-4 text-base sm:text-lg font-bold transform hover:scale-105 transition-all duration-300 bg-white"
                >
                  <Zap className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-green-800" />
                  Start 14-Day Pilot
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 text-green-800" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12 sm:py-16 px-4 sm:px-6 lg:px-8 mt-12 sm:mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            <div className="sm:col-span-2 md:col-span-1">
              <Link href="/" className="flex items-center space-x-2 sm:space-x-3 mb-4 sm:mb-6">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center">
                  <img src="/image-removebg-preview.png" alt="CallMint.tech Logo" className="w-16 h-12 sm:w-20 sm:h-14" />
                </div>
                <span className="text-lg sm:text-2xl font-display font-bold text-black">
                  CallMint.tech
                </span>
              </Link>
              <p className="text-black font-light text-sm sm:text-base">
                Next-generation AI call automation built with n8n, VAPI, and advanced workflows by developer Ahmed for
                the future of business.
              </p>
            </div>

            <div>
              <h4 className="font-display font-semibold text-black mb-4 sm:mb-6 text-sm sm:text-base">Product</h4>
              <ul className="space-y-2 sm:space-y-3 text-black text-sm sm:text-base">
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
              <h4 className="font-display font-semibold text-black mb-4 sm:mb-6 text-sm sm:text-base">Company</h4>
              <ul className="space-y-2 sm:space-y-3 text-black text-sm sm:text-base">
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

            <div>
              <h4 className="font-display font-semibold text-black mb-4 sm:mb-6 text-sm sm:text-base">Contact</h4>
              <ul className="space-y-2 sm:space-y-3 text-black text-sm sm:text-base">
                <li className="flex items-center space-x-2">
                  <span className="text-green-800">📞</span>
                  <span>+1 833 722 1177 (Toll-free)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-green-800">📱</span>
                  <span>+1 323 649 8803 (LA Local)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-green-800">📍</span>
                  <span>1111 B S Governors Ave STE ###, Dover DE</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 mt-8 sm:mt-12 pt-6 sm:pt-8 text-center text-black">
            <p className="text-xs sm:text-sm">&copy; 2025 CallMint.tech. All rights reserved. Built with n8n, VAPI & advanced workflows by Ahmed.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
