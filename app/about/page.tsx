"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Bot,
  Users,
  Target,
  Eye,
  Linkedin,
  ExternalLink,
  ArrowRight,
  Sparkles,
  Zap,
  Shield,
  Globe
} from "lucide-react"
import Link from "next/link"
// import { MobileNav } from "@/components/mobile-nav"
import { LoginModal } from "@/components/login-modal"
import { FreeConsultationModal } from "@/components/free-consultation-modal"

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Mohammed Ayaz",
      role: "Founder & CEO",
      experience: "15+ years in tech and business strategy",
      description: "Drives our vision for AI-powered industry transformation",
      image: "/CEO.jpg",
      linkedin: null,
      portfolio: null
    },
    {
      name: "Imran Rayeen",
      role: "Co-Founder & Head of Growth",
      experience: "10+ years in growth and digital strategy",
      description: "Specializes in data-driven business optimization",
      image: "/Co-Founder.jpg",
      linkedin: null,
      portfolio: null
    },
    {
      name: "Ahmed Ur Rehman",
      role: "CTO",
      experience: "12+ years in software engineering and AI",
      description: "Leading our technical innovation and AI development",
      image: "/CTO.jpg",
      linkedin: "https://www.linkedin.com/in/ahmed-ur-rehman-02325b361",
      portfolio: "http://ahmed-tech.lovable.app"
    },
    {
      name: "Abdul Azeez",
      role: "Director of AI & Data Engineering",
      experience: "8+ years in machine learning and analytics",
      description: "Focuses on data-driven decision making",
      image: null,
      linkedin: null,
      portfolio: null
    },
    {
      name: "Richard Anthony Partridge",
      role: "Senior Advisor",
      experience: "20+ years in global product strategy",
      description: "Oversees international market expansion",
      image: null,
      linkedin: null,
      portfolio: null
    }
  ]

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
              <Link href="/">
                <img src="/image-removebg-preview.png" alt="CallMint.tech Logo" className="h-14 w-auto" />
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-black hover:text-green-800 transition-colors font-bold">
                Home
              </Link>
              <Link href="/about" className="text-green-800 font-bold border-b-2 border-green-800">
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
            {/* <MobileNav currentPage="/about" /> */}
          </div>
        </div>
      </nav>

      {/* Dividing Line */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mt-16"></div>

      {/* Hero Section */}
      <section className="relative pt-16 sm:pt-24 pb-20 sm:pb-32 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="mb-12 sm:mb-16">
            <span className="inline-flex items-center px-8 sm:px-12 py-4 sm:py-6 rounded-full text-lg sm:text-xl font-semibold bg-green-50 text-green-800 border border-green-200 mb-12 sm:mb-16">
              <Users className="w-6 h-6 sm:w-8 sm:h-8 mr-4 text-green-800" />
              Meet Our Team
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 sm:mb-8 leading-tight">
            About <span className="text-green-600">CallMint.tech</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-12 sm:mb-16 max-w-5xl mx-auto leading-relaxed">
            Transforming businesses through innovative AI solutions and cutting-edge technology that revolutionizes how companies operate in the digital age
          </p>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-gray-50 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 sm:mb-28">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8">
              Our <span className="text-green-600">Vision & Mission</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Driving the future of business automation through intelligent AI solutions that empower organizations to achieve unprecedented growth and operational excellence
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 sm:gap-12">
            {/* Vision Card */}
            <Card className="bg-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <CardContent className="p-8 sm:p-12">
                <div className="flex items-center mb-10">
                  <div className="w-20 h-20 bg-green-100 rounded-lg flex items-center justify-center mr-6">
                    <Eye className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">Our Vision</h3>
                </div>
                <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-8">
                  To be the global leader in AI-powered business transformation, enabling organizations of all sizes to harness the full potential of artificial intelligence for unprecedented growth and efficiency. We envision a world where every business, regardless of size or industry, can leverage cutting-edge AI technology to optimize operations, enhance customer experiences, and drive sustainable innovation.
                </p>
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                  <div className="flex items-center">
                    <Globe className="w-6 h-6 text-green-600 mr-2" />
                    <span className="text-sm sm:text-base font-semibold text-gray-700">Global Impact</span>
                  </div>
                  <div className="flex items-center">
                    <Zap className="w-6 h-6 text-green-600 mr-2" />
                    <span className="text-sm sm:text-base font-semibold text-gray-700">Innovation</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Mission Card */}
            <Card className="bg-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <CardContent className="p-12 sm:p-16">
                <div className="flex items-center mb-10">
                  <div className="w-20 h-20 bg-blue-100 rounded-lg flex items-center justify-center mr-6">
                    <Target className="w-10 h-10 text-blue-600" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">Our Mission</h3>
                </div>
                <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-8">
                  To democratize AI technology by providing accessible, intelligent automation solutions that streamline business operations, enhance customer experiences, and drive sustainable growth across industries. We are committed to breaking down barriers to AI adoption, making advanced technology simple, affordable, and effective for businesses worldwide.
                </p>
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                  <div className="flex items-center">
                    <Shield className="w-6 h-6 text-blue-600 mr-2" />
                    <span className="text-sm sm:text-base font-semibold text-gray-700">Reliability</span>
                  </div>
                  <div className="flex items-center">
                    <Bot className="w-6 h-6 text-blue-600 mr-2" />
                    <span className="text-sm sm:text-base font-semibold text-gray-700">AI Excellence</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Leadership Team Section */}
      <section className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-white relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 sm:mb-28">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8">
              Our <span className="text-green-600">Leadership Team</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Meet the visionaries and experts driving our mission forward with decades of combined experience in technology, business strategy, and innovation
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
            {teamMembers.map((member, index) => (
              <Card key={index} className="bg-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <CardContent className="p-6 sm:p-8 text-center">
                  {/* Profile Image */}
                  <div className="mb-6">
                    {member.image ? (
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-32 h-32 sm:w-40 sm:h-40 rounded-full mx-auto object-cover border-4 border-green-100"
                      />
                    ) : (
                      <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full mx-auto bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center border-4 border-green-100">
                        <span className="text-white text-2xl sm:text-3xl font-bold">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Member Info */}
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">{member.name}</h3>
                  <p className="text-green-600 font-semibold mb-4 text-base sm:text-lg">{member.role}</p>
                  <p className="text-sm text-gray-500 mb-4 font-medium">{member.experience}</p>
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6">
                    {member.description}
                  </p>

                  {/* Social Links */}
                  {(member.linkedin || member.portfolio) && (
                    <div className="flex justify-center space-x-4">
                      {member.linkedin && (
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-semibold"
                        >
                          <Linkedin className="w-4 h-4 mr-2" />
                          LinkedIn
                        </a>
                      )}
                      {member.portfolio && (
                        <a
                          href={member.portfolio}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center px-4 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors text-sm font-semibold"
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Portfolio
                        </a>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-50 to-blue-50 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8">
            Ready to Transform Your Business?
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 mb-12 sm:mb-16 leading-relaxed">
            Join thousands of businesses already leveraging our AI solutions for unprecedented growth and operational excellence in the digital age
          </p>
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 justify-center">
            <FreeConsultationModal>
              <Button
                size="lg"
                className="bg-green-500 hover:bg-green-600 text-white px-8 sm:px-12 py-4 sm:py-6 text-lg sm:text-xl font-bold green-glow transform hover:scale-105 transition-all duration-300"
              >
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 mr-3" />
                Free Consultation
                <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 ml-3" />
              </Button>
            </FreeConsultationModal>
            <Link href="/pricing">
              <Button
                size="lg"
                variant="outline"
                className="border-green-500 text-green-500 hover:bg-green-50 px-8 sm:px-12 py-4 sm:py-6 text-lg sm:text-xl font-bold transform hover:scale-105 transition-all duration-300"
              >
                View Pricing
                <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 ml-3" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 sm:py-12 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center mb-6">
            <img src="/image-removebg-preview.png" alt="CallMint.tech Logo" className="h-12 w-auto" />
          </div>
          <p className="text-gray-400 mb-4">
            © 2024 CallMint.tech. All rights reserved.
          </p>
          <div className="flex justify-center space-x-6">
            <Link href="/" className="text-gray-400 hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
              About
            </Link>
            <Link href="/services" className="text-gray-400 hover:text-white transition-colors">
              Services
            </Link>
            <Link href="/pricing" className="text-gray-400 hover:text-white transition-colors">
              Pricing
            </Link>
            <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}