"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, CreditCard, Loader2 } from "lucide-react"
import { loadStripe } from "@stripe/stripe-js"
import { useState } from "react"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

interface StripeButtonProps {
  plan: {
    name: string
    monthlyPrice: number
    sixMonthPrice?: number
    twelveMonthPrice?: number
    currentPrice?: number
    billingPeriod?: string
  }
}

export function StripeButton({ plan }: StripeButtonProps) {
  const [loading, setLoading] = useState(false)

  const handleStripePayment = async () => {
    setLoading(true)
    
    try {
      // Check if Stripe publishable key is configured
      if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
        throw new Error("Stripe publishable key is not configured. Please check your environment variables.")
      }

      const stripe = await stripePromise
      if (!stripe) {
        throw new Error("Stripe failed to load. Please check your internet connection and try again.")
      }

      const amount = plan.currentPrice || plan.monthlyPrice
      const billingPeriod = plan.billingPeriod || 'monthly'
      
      // Validate amount
      if (!amount || amount <= 0) {
        throw new Error("Invalid payment amount. Please contact support.")
      }
      
      let planType = 'Monthly'
      if (billingPeriod === 'halfyear') {
        planType = '6-Month'
      } else if (billingPeriod === 'yearly') {
        planType = 'Annual'
      }

      console.log('Creating checkout session with:', {
        planName: plan.name,
        amount: amount,
        planType: planType,
        billingPeriod: billingPeriod,
      })

      // Create checkout session
      const response = await fetch("/api/stripe-checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          planName: plan.name,
          amount: amount,
          planType: planType,
          billingPeriod: billingPeriod,
        }),
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error('API response error:', response.status, errorText)
        throw new Error(`Server error (${response.status}): ${errorText || 'Failed to create checkout session'}`)
      }

      const responseData = await response.json()
      console.log('API response:', responseData)

      const { sessionId, error } = responseData

      if (error) {
        console.error('Stripe API error:', error)
        throw new Error(`Stripe error: ${error}`)
      }

      if (!sessionId) {
        throw new Error("No session ID received from server")
      }

      console.log('Redirecting to Stripe checkout with session ID:', sessionId)

      // Redirect to Stripe Checkout
      const result = await stripe.redirectToCheckout({ sessionId })

      if (result.error) {
        console.error('Stripe redirect error:', result.error)
        throw new Error(`Stripe redirect failed: ${result.error.message}`)
      }
    } catch (error) {
      console.error("Payment error details:", {
        error,
        message: error instanceof Error ? error.message : "Unknown error",
        stack: error instanceof Error ? error.stack : undefined,
        plan: plan,
        stripeKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ? 'configured' : 'missing'
      })
      
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred"
      alert(`Payment failed: ${errorMessage}\n\nPlease check the console for more details or contact support if the issue persists.`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      className="w-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:from-blue-600 hover:via-blue-700 hover:to-blue-800 text-white shadow-2xl neon-glow transform hover:scale-105 transition-all duration-300 font-bold disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
      onClick={handleStripePayment}
      disabled={loading || !process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}
    >
      {loading ? (
        <>
          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
          Processing...
        </>
      ) : (
        <>
          <CreditCard className="w-5 h-5 mr-2" />
          Pay with Stripe
          <ArrowRight className="w-4 h-4 ml-2" />
        </>
      )}
    </Button>
  )
}
