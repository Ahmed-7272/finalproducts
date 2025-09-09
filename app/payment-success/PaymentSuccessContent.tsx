"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, ArrowRight, Phone } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function PaymentSuccessContent() {
  const searchParams = useSearchParams()
  const plan = searchParams.get('plan')
  const [countdown, setCountdown] = useState(5)

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          window.location.href = '/create-account?plan=' + (plan || 'starter')
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [plan])

  return (
    <div className="min-h-screen bg-gradient-to-br from-mint-50 to-white flex items-center justify-center px-4">
      <Card className="max-w-2xl w-full shadow-2xl border-mint-200">
        <CardContent className="p-12 text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-mint-400 to-mint-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-4">Payment Successful!</h1>
          <p className="text-xl text-gray-600 mb-8">
            Thank you for choosing CallMint.tech. Your {plan || 'subscription'} plan has been activated successfully.
          </p>

          <div className="bg-mint-50 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Create Your Account</h3>
            <p className="text-gray-700 mb-4">
              You'll be redirected to create your account in <strong>{countdown}</strong> seconds.
            </p>
            <ul className="text-left space-y-3 text-gray-700">
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-mint-500 mt-0.5 mr-3 flex-shrink-0" />
                <span>Create your account with Gmail and password</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-mint-500 mt-0.5 mr-3 flex-shrink-0" />
                <span>Access your personal dashboard</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-mint-500 mt-0.5 mr-3 flex-shrink-0" />
                <span>Start using your AI agents immediately</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`/create-account?plan=${plan || 'starter'}`}>
              <Button className="bg-gradient-to-r from-mint-500 to-mint-600 hover:from-mint-600 hover:to-mint-700 text-white px-8 py-3">
                <ArrowRight className="w-4 h-4 mr-2" />
                Create Account Now
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                variant="outline"
                className="border-mint-300 text-mint-700 hover:bg-mint-50 px-8 py-3 bg-transparent"
              >
                <Phone className="w-4 h-4 mr-2" />
                Contact Support
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}