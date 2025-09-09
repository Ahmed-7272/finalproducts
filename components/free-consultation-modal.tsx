"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Calendar, Clock, User, Mail, Phone, CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface FormData {
  fullName: string
  email: string
  phone: string
  preferredDate: string
  preferredTime: string
}

interface FormErrors {
  fullName?: string
  email?: string
  phone?: string
  preferredDate?: string
  preferredTime?: string
}

interface FreeConsultationModalProps {
  children: React.ReactNode
}

export function FreeConsultationModal({ children }: FreeConsultationModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isError, setIsError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    preferredDate: "",
    preferredTime: ""
  })
  
  const [errors, setErrors] = useState<FormErrors>({})

  // Get today's date in YYYY-MM-DD format for minimum date validation
  const today = new Date().toISOString().split('T')[0]

  // Business hours validation (9 AM to 6 PM)
  const isBusinessHours = (time: string): boolean => {
    const [hours, minutes] = time.split(':').map(Number)
    const timeInMinutes = hours * 60 + minutes
    const startTime = 9 * 60 // 9:00 AM
    const endTime = 18 * 60 // 6:00 PM
    return timeInMinutes >= startTime && timeInMinutes <= endTime
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    // Full Name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required"
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = "Full name must be at least 2 characters"
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    // Phone validation
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required"
    } else if (!phoneRegex.test(formData.phone.replace(/[\s\-\(\)]/g, ''))) {
      newErrors.phone = "Please enter a valid phone number"
    }

    // Date validation
    if (!formData.preferredDate) {
      newErrors.preferredDate = "Preferred date is required"
    } else if (formData.preferredDate < today) {
      newErrors.preferredDate = "Date cannot be in the past"
    }

    // Time validation
    if (!formData.preferredTime) {
      newErrors.preferredTime = "Preferred time is required"
    } else if (!isBusinessHours(formData.preferredTime)) {
      newErrors.preferredTime = "Please select a time between 9:00 AM and 6:00 PM"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    setIsError(false)
    setErrorMessage("")

    try {
      const response = await fetch('/api/consultation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          preferredDate: formData.preferredDate,
          preferredTime: formData.preferredTime,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setIsSuccess(true)
        
        // Show warning about email issues but still success
        if (result.warning) {
          console.log('Warning:', result.message);
        }
        
        // Auto-close modal after 3 seconds to give user time to read message
        setTimeout(() => {
          setIsOpen(false)
          resetForm()
        }, 3000)
      } else {
        throw new Error(result.error || 'Failed to submit consultation request')
      }
    } catch (error) {
      setIsError(true)
      setErrorMessage(error instanceof Error ? error.message : 'An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      preferredDate: "",
      preferredTime: ""
    })
    setErrors({})
    setIsSuccess(false)
    setIsError(false)
    setErrorMessage("")
  }

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open)
    if (!open) {
      resetForm()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-green-800 flex items-center">
            <Calendar className="w-6 h-6 mr-2" />
            Free Consultation
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            Book a free consultation with our experts. We'll help you understand how our AI solutions can transform your business.
          </DialogDescription>
        </DialogHeader>

        {isSuccess ? (
          <div className="text-center py-8">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-green-800 mb-2">Consultation Booked!</h3>
            <p className="text-gray-600 mb-4">
              Thank you for booking a consultation. We'll contact you shortly to confirm your appointment.
            </p>
            <p className="text-sm text-gray-500">
              This window will close automatically in a few seconds.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-sm font-medium text-gray-700 flex items-center">
                <User className="w-4 h-4 mr-2" />
                Full Name *
              </Label>
              <Input
                id="fullName"
                type="text"
                value={formData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                className={cn(
                  "transition-colors",
                  errors.fullName ? "border-red-500 focus-visible:ring-red-500" : "focus-visible:ring-green-500"
                )}
                placeholder="Enter your full name"
                aria-describedby={errors.fullName ? "fullName-error" : undefined}
                aria-invalid={!!errors.fullName}
              />
              {errors.fullName && (
                <p id="fullName-error" className="text-sm text-red-600 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.fullName}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700 flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                Email Address *
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={cn(
                  "transition-colors",
                  errors.email ? "border-red-500 focus-visible:ring-red-500" : "focus-visible:ring-green-500"
                )}
                placeholder="Enter your email address"
                aria-describedby={errors.email ? "email-error" : undefined}
                aria-invalid={!!errors.email}
              />
              {errors.email && (
                <p id="email-error" className="text-sm text-red-600 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.email}
                </p>
              )}
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-medium text-gray-700 flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                Phone Number *
              </Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className={cn(
                  "transition-colors",
                  errors.phone ? "border-red-500 focus-visible:ring-red-500" : "focus-visible:ring-green-500"
                )}
                placeholder="Enter your phone number"
                aria-describedby={errors.phone ? "phone-error" : undefined}
                aria-invalid={!!errors.phone}
              />
              {errors.phone && (
                <p id="phone-error" className="text-sm text-red-600 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.phone}
                </p>
              )}
            </div>

            {/* Preferred Date */}
            <div className="space-y-2">
              <Label htmlFor="preferredDate" className="text-sm font-medium text-gray-700 flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                Preferred Date *
              </Label>
              <Input
                id="preferredDate"
                type="date"
                value={formData.preferredDate}
                onChange={(e) => handleInputChange('preferredDate', e.target.value)}
                min={today}
                className={cn(
                  "transition-colors",
                  errors.preferredDate ? "border-red-500 focus-visible:ring-red-500" : "focus-visible:ring-green-500"
                )}
                aria-describedby={errors.preferredDate ? "preferredDate-error" : undefined}
                aria-invalid={!!errors.preferredDate}
              />
              {errors.preferredDate && (
                <p id="preferredDate-error" className="text-sm text-red-600 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.preferredDate}
                </p>
              )}
            </div>

            {/* Preferred Time */}
            <div className="space-y-2">
              <Label htmlFor="preferredTime" className="text-sm font-medium text-gray-700 flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                Preferred Time *
              </Label>
              <Input
                id="preferredTime"
                type="time"
                value={formData.preferredTime}
                onChange={(e) => handleInputChange('preferredTime', e.target.value)}
                className={cn(
                  "transition-colors",
                  errors.preferredTime ? "border-red-500 focus-visible:ring-red-500" : "focus-visible:ring-green-500"
                )}
                aria-describedby={errors.preferredTime ? "preferredTime-error" : "preferredTime-help"}
                aria-invalid={!!errors.preferredTime}
              />
              {errors.preferredTime ? (
                <p id="preferredTime-error" className="text-sm text-red-600 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.preferredTime}
                </p>
              ) : (
                <p id="preferredTime-help" className="text-sm text-gray-500">
                  Business hours: 9:00 AM - 6:00 PM
                </p>
              )}
            </div>

            {/* Error Message */}
            {isError && (
              <div className="bg-red-50 border border-red-200 rounded-md p-4">
                <div className="flex items-center">
                  <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
                  <p className="text-sm text-red-700">
                    {errorMessage || "Failed to submit consultation request. Please try again."}
                  </p>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:transform-none disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Booking Consultation...
                </>
              ) : (
                <>
                  <Calendar className="w-4 h-4 mr-2" />
                  Book Appointment
                </>
              )}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}