"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bot, Mail, MapPin, Clock, ArrowRight, CheckCircle, Phone, Zap } from "lucide-react"
import Link from "next/link"
// import { MobileNav } from "@/components/mobile-nav"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    planInterest: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)
    setPreviewUrl(null)
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          plan: formData.planInterest,
          message: formData.message,
        }),
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to send message')
      }
      
      // Check for preview URL (for testing with Ethereal)
      if (data.previewUrl) {
        setPreviewUrl(data.previewUrl)
      }
      
      setIsSubmitted(true)
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false)
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          planInterest: "",
          message: "",
        })
      }, 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred')
      console.error('Error submitting form:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 clean-grid opacity-10 pointer-events-none z-0"></div>
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-green-100 rounded-full blur-2xl animate-pulse pointer-events-none z-0"></div>
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-pink-100 rounded-full blur-2xl animate-pulse delay-1000 pointer-events-none z-0"></div>

      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md fixed top-0 w-full z-50 border-b border-gray-200 relative">
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
              <Link href="/chatbot" className="text-black hover:text-green-800 transition-colors font-medium">
                Chatbot
              </Link>
              <Link href="/contact" className="text-green-800 font-bold">
                Contact
              </Link>
              <Button className="bg-green-500 hover:bg-green-600 text-white font-semibold green-glow">
                Try Now
              </Button>
            </div>
            {/* <MobileNav currentPage="/contact" /> */}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 sm:pt-32 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-display font-black mb-6 sm:mb-8">
            <span className="text-black">
              Get in Touch
            </span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-black mb-6 sm:mb-8 font-medium px-4">
            Ready to revolutionize your business with AI? Let's build the future together.
          </p>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="pb-12 sm:pb-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
            {/* Contact Form */}
            <Card className="bg-white border-2 border-gray-200 shadow-2xl">
              <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 rounded-t-lg border-b border-gray-200">
                <CardTitle className="text-2xl sm:text-3xl font-display font-bold text-black flex items-center">
                  <Zap className="w-6 h-6 sm:w-8 sm:h-8 mr-2 sm:mr-3 text-green-800" />
                  Get Started
                </CardTitle>
                <p className="text-black font-medium text-sm sm:text-base">
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>
              </CardHeader>
              <CardContent className="p-4 sm:p-8">
                {isSubmitted ? (
                  <div className="text-center py-8 sm:py-12">
                    <div className="w-16 h-16 sm:w-24 sm:h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8 green-glow">
                      <CheckCircle className="w-8 h-8 sm:w-12 sm:h-12 text-white" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-display font-bold text-black mb-3 sm:mb-4">Message Sent!</h3>
                    <p className="text-black text-base sm:text-lg font-medium">
                      We've received your message and will get back to you within 24 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                      <div>
                        <Label htmlFor="name" className="text-black font-semibold mb-2 block text-sm sm:text-base">
                          Full Name *
                        </Label>
                        <Input
                          id="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          className="bg-gray-50 border-gray-300 focus-visible:ring-green-500 text-gray-900 placeholder:text-gray-500"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email" className="text-black font-semibold mb-2 block">
                          Email Address *
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          className="bg-gray-50 border-gray-300 focus-visible:ring-green-500 text-gray-900 placeholder:text-gray-500"
                          placeholder="john@company.com"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="phone" className="text-black font-semibold mb-2 block">
                          Phone Number
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          className="bg-gray-50 border-gray-300 focus-visible:ring-green-500 text-gray-900 placeholder:text-gray-500"
                          placeholder="+18202808433"
                        />
                      </div>
                      <div>
                        <Label htmlFor="company" className="text-black font-semibold mb-2 block">
                          Company Name *
                        </Label>
                        <Input
                          id="company"
                          type="text"
                          required
                          value={formData.company}
                          onChange={(e) => handleInputChange("company", e.target.value)}
                          className="bg-gray-50 border-gray-300 focus-visible:ring-green-500 text-gray-900 placeholder:text-gray-500"
                          placeholder="Acme Corp"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="planInterest" className="text-black font-semibold mb-2 block">
                        Plan Interest
                      </Label>
                      <Select
                        value={formData.planInterest}
                        onValueChange={(value) => handleInputChange("planInterest", value)}
                      >
                        <SelectTrigger className="bg-gray-50 border-gray-300 focus-visible:ring-green-500 text-gray-900">
                          <SelectValue placeholder="Select a plan you're interested in" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-gray-200">
                          <SelectItem value="starter">Starter - $49/month</SelectItem>
                          <SelectItem value="business">Business - $99/month</SelectItem>
                          <SelectItem value="enterprise">Enterprise - Custom</SelectItem>
                          <SelectItem value="not-sure">Not sure yet</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="message" className="text-black font-semibold mb-2 block">
                        Message
                      </Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                        className="bg-gray-50 border-gray-300 focus-visible:ring-green-500 text-gray-900 placeholder:text-gray-500"
                        rows={4}
                        placeholder="Tell us about your business needs and how we can help..."
                      />
                    </div>

                    {error && (
                      <div className="p-4 mb-4 bg-red-500/20 border border-red-500/50 rounded-md text-black">
                        <p className="font-medium">{error}</p>
                      </div>
                    )}
                    
                    {previewUrl && (
                      <div className="p-4 mb-4 bg-blue-500/20 border border-blue-500/50 rounded-md text-white">
                        <p className="font-medium">Test Mode:</p>
                        <p>This is a test email. You can view it here:</p>
                        <a 
                          href={previewUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-400 underline"
                        >
                          View Test Email
                        </a>
                      </div>
                    )}
                    
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-green-500 hover:bg-green-600 text-white py-4 text-lg font-bold green-glow transform hover:scale-105 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="animate-pulse">Sending...</span>
                        </>
                      ) : (
                        <>
                          <Zap className="w-5 h-5 mr-2" />
                          Send Message
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              <Card className="bg-white border-2 border-gray-200 shadow-xl">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-display font-bold text-black mb-8">Contact Information</h3>

                  <div className="space-y-8">
                    <div className="flex items-start">
                      <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                        <Mail className="w-6 h-6 text-green-800" />
                      </div>
                      <div>
                        <h4 className="font-display font-semibold text-black mb-2">Email</h4>
                        <p className="text-black">info@callmint.tech</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                        <Phone className="w-6 h-6 text-green-800" />
                      </div>
                      <div>
                        <h4 className="font-display font-semibold text-black mb-2">Phone</h4>
                        <p className="text-black text-lg font-semibold">+18202808433</p>
                <p className="text-sm text-gray-600 mt-2">For any query or customer support issue, please call us at +18202808433.</p>
                        <p className="text-black text-sm">Mon-Fri 9AM-6PM IST</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                        <MapPin className="w-6 h-6 text-green-800" />
                      </div>
                      <div>
                        <h4 className="font-display font-semibold text-black mb-2">Address</h4>
                        <p className="text-black">123 AI Street</p>
                        <p className="text-black">San Francisco, CA 94105</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                        <Clock className="w-6 h-6 text-green-800" />
                      </div>
                      <div>
                        <h4 className="font-display font-semibold text-black mb-2">Business Hours</h4>
                        <p className="text-black">Monday - Friday: 9:00 AM - 6:00 PM IST</p>
                        <p className="text-black">Saturday - Sunday: Closed</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border-2 border-gray-200 shadow-xl">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-display font-bold text-black mb-4">Enterprise Sales</h3>
                  <p className="text-black mb-6 font-medium">
                    Need unlimited AI power for your enterprise? Our specialists are ready to help.
                  </p>
                  <div className="space-y-3 text-sm text-black mb-6">
                    <p className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-800 mr-2" />
                      Custom pricing and packages
                    </p>
                    <p className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-800 mr-2" />
                      Dedicated AI specialist
                    </p>
                    <p className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-800 mr-2" />
                      Priority support and SLA
                    </p>
                    <p className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-800 mr-2" />
                      Custom AI integrations
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-black mb-4">
              <span className="text-green-800">
                Common Questions
              </span>
            </h2>
            <p className="text-black font-medium">Can't find what you're looking for? Contact us directly.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-white p-6 border-2 border-gray-200 rounded-lg shadow-md">
                <h3 className="font-display font-semibold text-black mb-3">How quickly can I get started?</h3>
                <p className="text-black font-light">
                  Most customers have their AI agents running within 24 hours of signing up.
                </p>
              </div>

              <div className="bg-white p-6 border-2 border-gray-200 rounded-lg shadow-md">
                <h3 className="font-display font-semibold text-black mb-3">Do you offer training?</h3>
                <p className="text-black font-medium">
                  Yes! We provide comprehensive AI onboarding and training for all customers.
                </p>
              </div>

              <div className="bg-white p-6 border-2 border-gray-200 rounded-lg shadow-md">
                <h3 className="font-display font-semibold text-black mb-3">Can I integrate with my existing CRM?</h3>
                <p className="text-black font-medium">
                  We support integrations with all major CRM systems including Salesforce, HubSpot, and more.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white p-6 border-2 border-gray-200 rounded-lg shadow-md">
                <h3 className="font-display font-semibold text-black mb-3">What's your uptime guarantee?</h3>
                <p className="text-black font-medium">
                  We maintain 99.9% uptime with quantum-grade infrastructure and real-time monitoring.
                </p>
              </div>

              <div className="bg-white p-6 border-2 border-gray-200 rounded-lg shadow-md">
                <h3 className="font-display font-semibold text-black mb-3">Is my data secure?</h3>
                <p className="text-black font-medium">
                  Yes, we're SOC 2 compliant with military-grade encryption and zero-trust architecture.
                </p>
              </div>

              <div className="bg-white p-6 border-2 border-gray-200 rounded-lg shadow-md">
                <h3 className="font-display font-semibold text-black mb-3">Can I cancel anytime?</h3>
                <p className="text-black font-medium">
                  Yes, you can cancel your subscription at any time with no cancellation fees.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-16 px-4 sm:px-6 lg:px-8 mt-20 relative z-10">
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
              <p className="text-black font-medium">
                Next-generation AI call automation built with React, Node.js, and Next.js for the future of business.
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
