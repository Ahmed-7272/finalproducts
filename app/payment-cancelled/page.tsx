"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { XCircle, ArrowRight, Phone } from "lucide-react"
import Link from "next/link"

export default function PaymentCancelledPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-white flex items-center justify-center px-4">
      <Card className="max-w-2xl w-full shadow-2xl border-red-200">
        <CardContent className="p-12 text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
            <XCircle className="w-12 h-12 text-white" />
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-4">Payment Cancelled</h1>
          <p className="text-xl text-gray-600 mb-8">
            Your payment was cancelled. No charges have been made to your account.
          </p>

          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Need Help?</h3>
            <p className="text-gray-700 mb-4">
              If you experienced any issues during checkout or have questions about our plans, we're here to help.
            </p>
            <p className="text-gray-700">
              Contact us at <strong>+91 82176 87679</strong> or send us a message.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/pricing">
              <Button className="bg-gradient-to-r from-mint-500 to-mint-600 hover:from-mint-600 hover:to-mint-700 text-white px-8 py-3">
                Try Again
                <ArrowRight className="w-4 h-4 ml-2" />
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
