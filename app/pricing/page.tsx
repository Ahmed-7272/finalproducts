"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bot, CheckCircle, ArrowRight, Star, Zap, Users, Shield, Headphones, CreditCard, Calendar } from "lucide-react"
import Link from "next/link"
// import { MobileNav } from "@/components/mobile-nav"
import { FreeConsultationModal } from "@/components/free-consultation-modal"

import { StripeButton } from "@/components/stripe-button"

export default function PricingPage() {
  const [selectedTab, setSelectedTab] = useState('monthly')

  const plans = [
    {
      name: "Starter",
      description: "Perfect for small businesses entering the AI revolution",
      monthlyPrice: 299,
      sixMonthPrice: 1614.60,
      sixMonthSavings: 179.40,
      twelveMonthPrice: 2870.40,
      twelveMonthSavings: 717.60,
      features: [
        "1 AI Agent (Inbound or Outbound)",
        "1,000 call minutes per month",
        "Basic AI analytics",
        "Email support",
        "Standard voice quality",
        "CRM integration (basic)",
        "Call recording",
        "Business hours support",
      ],
      popular: false,
      gradient: "from-green-50 to-white",
      borderColor: "border-green-200",
      hoverBorder: "hover:border-green-400",
    },
    {
      name: "Business",
      description: "For growing companies ready to scale with AI",
      monthlyPrice: 499,
      sixMonthPrice: 2694.60,
      sixMonthSavings: 299.40,
      twelveMonthPrice: 4790.40,
      twelveMonthSavings: 1197.60,
      features: [
        "3 AI Agents (All types included)",
        "3,000 call minutes per month",
        "Advanced AI analytics & insights",
        "Priority chat & email support",
        "Premium voice quality",
        "Full CRM integration",
        "Call recording & transcription",
        "Custom AI scripts",
        "24/7 support",
        "API access",
        "Webhook integrations",
      ],
      popular: true,
      gradient: "from-pink-50 to-blue-50",
      borderColor: "border-pink-300",
      hoverBorder: "hover:border-pink-500",
    },
    {
      name: "Enterprise",
      description: "Unlimited AI power for enterprise domination",
      monthlyPrice: "Custom",
      sixMonthPrice: "Custom (volume-based)",
      sixMonthSavings: "Negotiable",
      twelveMonthPrice: "Custom (volume-based)",
      twelveMonthSavings: "Negotiable",
      features: [
        "Unlimited AI Agents",
        "Unlimited call minutes",
        "Custom AI dashboard",
        "Dedicated AI specialist",
        "Ultra-premium voice quality",
        "Custom integrations",
        "Military-grade security",
        "Custom AI training",
        "SLA guarantee",
        "White-label options",
        "On-premise deployment",
        "Custom AI models",
      ],
      popular: false,
      gradient: "from-green-50 to-white",
      borderColor: "border-green-200",
      hoverBorder: "hover:border-green-400",
    },
  ]

  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 clean-grid opacity-10"></div>
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-green-100 rounded-full blur-2xl animate-pulse"></div>
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-pink-100 rounded-full blur-2xl animate-pulse delay-1000"></div>

      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md fixed top-0 w-full z-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center">
              <img src="/image-removebg-preview.png" alt="CallMint.tech Logo" className="h-14 w-auto" />
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
              <Link href="/pricing" className="text-green-800 font-bold">
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
            {/* <MobileNav currentPage="/pricing" /> */}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 sm:pt-32 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-display font-black mb-6 sm:mb-8">
            <span className="text-green-800">
              Pricing
            </span>
            <span className="text-black"> That Scales</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-black mb-8 sm:mb-12 font-medium px-4">
            Choose your AI revolution plan. Start free, scale infinitely.
          </p>

          {/* Pricing Tabs */}
          <div className="flex items-center justify-center mb-12 sm:mb-16">
            <div className="bg-white rounded-full p-1 shadow-lg border border-gray-200" role="tablist" aria-label="Pricing plans">
              <button
                type="button"
                tabIndex={0}
                role="tab"
                aria-selected={selectedTab === 'monthly'}
                aria-controls="pricing-content"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setSelectedTab('monthly');
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedTab('monthly');
                  }
                }}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ease-in-out transform cursor-pointer pointer-events-auto focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 hover:scale-105 active:scale-95 ${
                  selectedTab === 'monthly'
                    ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg border-2 border-green-400'
                    : 'text-gray-600 hover:text-green-600 hover:bg-green-50 border-2 border-transparent hover:border-green-300 shadow-sm'
                }`}
              >
                Monthly
              </button>
              <button
                type="button"
                tabIndex={0}
                role="tab"
                aria-selected={selectedTab === 'halfyear'}
                aria-controls="pricing-content"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setSelectedTab('halfyear');
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedTab('halfyear');
                  }
                }}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ease-in-out transform cursor-pointer pointer-events-auto focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 hover:scale-105 active:scale-95 ${
                  selectedTab === 'halfyear'
                    ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg border-2 border-green-400'
                    : 'text-gray-600 hover:text-green-600 hover:bg-green-50 border-2 border-transparent hover:border-green-300 shadow-sm'
                }`}
              >
                Half-Year
              </button>
              <button
                type="button"
                tabIndex={0}
                role="tab"
                aria-selected={selectedTab === 'yearly'}
                aria-controls="pricing-content"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setSelectedTab('yearly');
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedTab('yearly');
                  }
                }}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ease-in-out transform cursor-pointer pointer-events-auto focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 hover:scale-105 active:scale-95 ${
                  selectedTab === 'yearly'
                    ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg border-2 border-green-400'
                    : 'text-gray-600 hover:text-green-600 hover:bg-green-50 border-2 border-transparent hover:border-green-300 shadow-sm'
                }`}
              >
                Yearly
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-12 sm:pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div id="pricing-content" role="tabpanel" className="grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-500 ease-in-out animate-fadeIn">
            {plans.map((plan, index) => {
              let currentPrice, currentPeriod, savings
              
              if (selectedTab === 'monthly') {
                currentPrice = plan.monthlyPrice
                currentPeriod = '/month'
                savings = null
              } else if (selectedTab === 'halfyear') {
                currentPrice = plan.sixMonthPrice
                currentPeriod = '/6 months'
                savings = plan.sixMonthSavings
              } else {
                currentPrice = plan.twelveMonthPrice
                currentPeriod = '/year'
                savings = plan.twelveMonthSavings
              }
              
              return (
                 <Card key={plan.name} className={`relative bg-white border-2 ${plan.borderColor} ${plan.hoverBorder} hover:shadow-xl transition-all duration-500 transform hover:scale-105 bg-gradient-to-br ${plan.gradient} ${plan.popular ? 'ring-2 ring-pink-500 ring-opacity-50' : ''}`}>
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-gradient-to-r from-pink-500 to-blue-500 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center">
                        <Star className="w-4 h-4 mr-1" />
                        Most Popular
                      </span>
                    </div>
                  )}
                  
                  <CardHeader className="text-center pb-4">
                    <CardTitle className="text-2xl font-display font-bold text-black">{plan.name}</CardTitle>
                    <p className="text-gray-600 mt-2">{plan.description}</p>
                    
                    <div className="mt-6">
                      <div className="text-4xl font-display font-bold text-black">
                        {typeof currentPrice === 'number' ? `$${currentPrice.toLocaleString()}` : currentPrice}
                      </div>
                      {typeof currentPrice === 'number' && (
                        <div className="text-gray-600 mt-1">{currentPeriod}</div>
                      )}
                      {savings && (
                         <div className="text-green-600 mt-2">
                           <span className="font-bold">
                             {typeof savings === 'number' ? `$${savings.toLocaleString()} saved` : savings}
                           </span>
                         </div>
                       )}
                    </div>
                  </CardHeader>
                  
                  <CardContent className="px-6 pb-6">
                    <div className="mb-6">
                      {typeof currentPrice === 'number' ? (
                        <StripeButton 
                          plan={{
                            ...plan,
                            currentPrice,
                            billingPeriod: selectedTab
                          }} 
                        />
                      ) : (
                        <Button
                          className="w-full bg-green-500 hover:bg-green-600 text-white shadow-xl green-glow transform hover:scale-105 transition-all duration-300 font-bold"
                          onClick={() => {
                            window.location.href = "/contact"
                          }}
                        >
                          Contact Sales
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      )}
                    </div>
                    
                    <ul className="space-y-3">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-800 mt-1 mr-3 flex-shrink-0" />
                          <span className="text-black text-sm leading-relaxed">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )
            })}
          </div>
          
          {/* Pricing Info */}
          <div className="text-center mt-8">
            <p className="text-gray-600 text-sm">
              {selectedTab === 'halfyear' && 'Prepay 6 months and save 10%'}
              {selectedTab === 'yearly' && 'Prepay 12 months and save 20%'}
              {selectedTab === 'monthly' && 'Pay-per-minute pricing with monthly billing'}
            </p>
          </div>

        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-4xl md:text-6xl font-display font-bold mb-4 sm:mb-6">
              <span className="text-black">Why Choose </span>
              <span className="text-green-800">
                CallMint.tech?
              </span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-black font-medium">All plans include these revolutionary features</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="text-center group">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 green-glow group-hover:scale-110 transition-transform duration-300">
                <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-green-800" />
              </div>
              <h3 className="text-base sm:text-lg font-display font-bold text-black mb-2 sm:mb-3">Lightning Setup</h3>
              <p className="text-black text-xs sm:text-sm">AI agents ready in 24 hours</p>
            </div>

            <div className="text-center group">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 green-glow group-hover:scale-110 transition-transform duration-300">
                <Users className="w-6 h-6 sm:w-8 sm:h-8 text-green-800" />
              </div>
              <h3 className="text-base sm:text-lg font-display font-bold text-black mb-2 sm:mb-3">Infinite Scale</h3>
              <p className="text-black text-xs sm:text-sm">Handle millions of calls</p>
            </div>

            <div className="text-center group">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 green-glow group-hover:scale-110 transition-transform duration-300">
                <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-green-800" />
              </div>
              <h3 className="text-base sm:text-lg font-display font-bold text-black mb-2 sm:mb-3">Quantum Security</h3>
              <p className="text-black text-xs sm:text-sm">Military-grade protection</p>
            </div>

            <div className="text-center group">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 green-glow group-hover:scale-110 transition-transform duration-300">
                <Headphones className="w-6 h-6 sm:w-8 sm:h-8 text-green-800" />
              </div>
              <h3 className="text-base sm:text-lg font-display font-bold text-black mb-2 sm:mb-3">24/7 AI Support</h3>
              <p className="text-black text-xs sm:text-sm">Always-on assistance</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white border-2 border-gray-200 rounded-3xl p-6 sm:p-12 shadow-xl">
            <h2 className="text-2xl sm:text-4xl md:text-6xl font-display font-bold text-black mb-6 sm:mb-8">
              Ready to Dominate
              <span className="text-green-800 block">
                Your Industry?
              </span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-black mb-8 sm:mb-12 font-medium">
              Join the AI revolution. Your competitors won't know what hit them.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
              <FreeConsultationModal>
                <Button
                  size="lg"
                  className="bg-green-500 hover:bg-green-600 text-white px-6 sm:px-12 py-3 sm:py-4 text-base sm:text-lg font-bold green-glow transform hover:scale-105 transition-all duration-300"
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
                  className="border-2 border-gray-300 text-black hover:bg-gray-50 px-6 sm:px-12 py-3 sm:py-4 text-base sm:text-lg font-bold transform hover:scale-105 transition-all duration-300 bg-transparent"
                >
                  <Zap className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Start 14-Day Pilot
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="glass border-t border-white/10 py-12 sm:py-16 px-4 sm:px-6 lg:px-8 mt-12 sm:mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            <div className="sm:col-span-2 md:col-span-1">
              <div className="flex items-center space-x-2 sm:space-x-3 mb-4 sm:mb-6">
              <img src="/image-removebg-preview.png" alt="CallMint.tech Logo" className="h-10 w-auto" />
                <span className="text-2xl font-display font-bold text-black">
                  CallMint.tech
                </span>
              </div>
              <p className="text-black font-light">
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

            <div>
              <h4 className="font-display font-semibold text-black mb-6">Contact</h4>
              <ul className="space-y-3 text-black">
                <li className="flex items-center space-x-2">
                  <span className="text-neon-blue">📞</span>
                  <span>+1 833 722 1177 (Toll-free)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-neon-blue">📱</span>
                  <span>+1 323 649 8803 (LA Local)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-neon-blue">📍</span>
                  <span>1111 B S Governors Ave STE ###, Dover DE</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 mt-12 pt-8 text-center text-black">
            <p className="text-black">&copy; 2025 CallMint.tech. All rights reserved. Built with React, Node.js & Next.js.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
