"use client"

import { useState, useEffect } from "react"
import * as React from "react"
import { Button } from "@/components/ui/button"
import { 
  Bot, 
  Menu, 
  X, 
  Home,
  Users,
  Settings,
  DollarSign,
  MessageCircle,
  Mail,
  LogIn,
  Sparkles,
  ChevronRight
} from "lucide-react"
import Link from "next/link"

interface MobileNavProps {
  currentPage?: string
}

export function MobileNav({ currentPage }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  const toggleMenu = () => {
    console.log('Toggle menu clicked, current isOpen:', isOpen)
    if (isAnimating) return
    setIsAnimating(true)
    setIsOpen(!isOpen)
    
    // Reset animation state after transition
    setTimeout(() => setIsAnimating(false), 300)
  }

  // Prevent body scroll when menu is open and handle keyboard events
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      
      // Handle escape key
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setIsOpen(false)
        }
      }
      
      document.addEventListener('keydown', handleEscape)
      
      return () => {
        document.body.style.overflow = 'unset'
        document.removeEventListener('keydown', handleEscape)
      }
    } else {
      document.body.style.overflow = 'unset'
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/about", label: "About", icon: Users },
    { href: "/services", label: "Services", icon: Settings },
    { href: "/pricing", label: "Pricing", icon: DollarSign },
    { href: "/chatbot", label: "Chatbot", icon: Bot },
    { href: "/contact", label: "Contact", icon: Mail },
    { href: "/login", label: "Login", icon: LogIn },
    { href: "/dashboard", label: "Dashboard", icon: Settings },
  ]

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleMenu}
        className="md:hidden relative p-2 sm:p-3 rounded-xl bg-white border border-gray-200 hover:border-green-500 hover:shadow-lg transition-all duration-300 shadow-md group z-50"
        aria-label={isOpen ? 'Close mobile menu' : 'Open mobile menu'}
        style={{ display: 'block' }}
      >
        <div className="relative w-6 h-6">
          <span className={`absolute inset-0 transition-all duration-500 ease-out ${isOpen ? 'rotate-180 opacity-0 scale-50' : 'rotate-0 opacity-100 scale-100'}`}>
            <Menu className="w-6 h-6 text-gray-700 group-hover:text-green-600 transition-colors duration-300" />
          </span>
          <span className={`absolute inset-0 transition-all duration-500 ease-out ${isOpen ? 'rotate-0 opacity-100 scale-100' : 'rotate-180 opacity-0 scale-50'}`}>
            <X className="w-6 h-6 text-gray-700 group-hover:text-red-500 transition-colors duration-300" />
          </span>
        </div>
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-green-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </button>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu-overlay fixed inset-0 z-[9999] md:hidden transition-all duration-300 ease-out ${
        isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
      }`}>
        {/* Backdrop */}
        <div 
          className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
            isOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={toggleMenu}
        />
        
        {/* Menu Panel - Side Drawer */}
         <div className={`mobile-menu-panel fixed top-0 right-0 h-full w-[85vw] max-w-sm bg-white shadow-2xl transform transition-transform duration-300 ease-out z-[10000] ${
           isOpen ? 'translate-x-0' : 'translate-x-full'
         }`}>
          <div className="flex flex-col h-full relative overflow-hidden">
            {/* Enhanced Decorative Elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-green-200 via-green-100 to-transparent rounded-full blur-2xl opacity-40 -translate-y-16 translate-x-16 animate-pulse"></div>
            <div className="absolute top-20 left-4 w-20 h-20 bg-gradient-to-br from-blue-200 via-blue-100 to-transparent rounded-full blur-xl opacity-30 animate-pulse" style={{animationDelay: '1s'}}></div>
            <div className="absolute bottom-0 left-0 w-28 h-28 bg-gradient-to-tr from-purple-200 via-pink-100 to-transparent rounded-full blur-2xl opacity-25 translate-y-14 -translate-x-14 animate-pulse" style={{animationDelay: '2s'}}></div>
            <div className="absolute bottom-40 right-8 w-16 h-16 bg-gradient-to-bl from-yellow-200 via-orange-100 to-transparent rounded-full blur-xl opacity-20 animate-pulse" style={{animationDelay: '3s'}}></div>
            
            {/* Header */}
             <div className="flex items-center justify-between p-6 border-b border-gray-200/80 bg-gradient-to-r from-white via-gray-50/30 to-white backdrop-blur-sm relative z-10">
              <Link href="/" className="flex items-center group" onClick={toggleMenu}>
                <div className="relative">
                  <img src="/image-removebg-preview.png" alt="CallMint.tech Logo" className="h-10 w-auto transition-all duration-300 group-hover:scale-110 group-hover:rotate-1" />
                  <div className="absolute -inset-3 bg-gradient-to-br from-green-100/50 via-blue-100/30 to-purple-100/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 blur-sm"></div>
                </div>
              </Link>
              <button
                onClick={toggleMenu}
                disabled={isAnimating}
                className="p-3 rounded-2xl hover:bg-gradient-to-br hover:from-red-50 hover:to-red-100 transition-all duration-300 group active:scale-95 border border-transparent hover:border-red-200"
                aria-label="Close menu"
              >
                <X className="w-6 h-6 text-gray-600 group-hover:text-red-500 transition-colors duration-300" />
              </button>
            </div>

            {/* Main Content Area */}
            <div className="mobile-menu-content mobile-nav-safe flex-1 overflow-y-auto p-6 relative z-[10001] bg-white">
              {/* Welcome Message */}
              <div className="mb-8 text-center relative z-[10002]">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-50 border border-green-200 mb-3">
                  <Sparkles className="w-4 h-4 text-green-600 mr-2" />
                  <span className="text-base font-bold text-gray-900" style={{color: '#111827 !important'}}>Welcome to CallMint</span>
                </div>
              </div>

              {/* Navigation Links */}
              <nav className="space-y-3 mb-8">
                {navItems.map((item, index) => {
                  const IconComponent = item.icon
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={toggleMenu}
                      className={`group flex items-center px-5 py-5 rounded-xl font-medium transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] border ${
                         currentPage === item.href
                           ? "bg-green-100 text-gray-900 border-green-300 shadow-md"
                           : "text-gray-900 hover:text-gray-900 hover:bg-green-50 hover:shadow-md border-gray-200 hover:border-green-200"
                       }`}
                    >
                      <div className={`p-3 rounded-lg mr-4 transition-all duration-300 ${
                        currentPage === item.href
                          ? "bg-green-200 text-green-700"
                          : "bg-gray-100 text-gray-600 group-hover:bg-green-100 group-hover:text-green-600"
                      }`}>
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <span className="flex-1 font-bold text-lg text-gray-900 relative z-[10003]" style={{color: '#111827 !important', fontWeight: 'bold !important'}}>{item.label}</span>
                      <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        currentPage === item.href
                          ? "bg-green-500"
                          : "bg-transparent group-hover:bg-green-300"
                      }`}></div>
                    </Link>
                  )
                })}
              </nav>

              {/* Action Buttons */}
              <div className="space-y-3 mb-6">
                <Link href="/pricing" onClick={toggleMenu}>
                  <Button className="w-full h-11 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-xl">
                    <Sparkles className="w-5 h-5 mr-2" />
                    Try Now
                  </Button>
                </Link>
              </div>
            </div>

            {/* Footer Contact Info */}
             <div className="p-4 border-t border-gray-200 bg-gray-50 relative z-10">
              <div className="space-y-3">
                <div className="text-center mb-4">
                  <p className="text-base font-bold text-gray-900" style={{color: '#111827 !important', fontWeight: 'bold !important'}}>Get in touch</p>
                </div>
                <div className="space-y-3 text-sm">
                  <a href="tel:+18202808433" className="flex items-center p-3 rounded-lg bg-white hover:bg-gray-50 transition-all duration-200 group border border-gray-100">
                     <div className="p-2 rounded-lg bg-green-100 text-green-600 mr-3 group-hover:bg-green-200 transition-colors">
                       📞
                     </div>
                     <span className="text-gray-900 group-hover:text-gray-900 font-bold text-base" style={{color: '#111827 !important', fontWeight: 'bold !important'}}>+18202808433</span>
                   </a>
                   <a href="mailto:info@callmint.tech" className="flex items-center p-3 rounded-lg bg-white hover:bg-gray-50 transition-all duration-200 group border border-gray-100">
                     <div className="p-2 rounded-lg bg-blue-100 text-blue-600 mr-3 group-hover:bg-blue-200 transition-colors">
                       📧
                     </div>
                     <span className="text-gray-900 group-hover:text-gray-900 font-bold text-base" style={{color: '#111827 !important', fontWeight: 'bold !important'}}>info@callmint.tech</span>
                   </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
