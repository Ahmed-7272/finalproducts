"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { User, Mail, Lock, Crown } from "lucide-react"
import Link from "next/link"

export default function TestLoginPage() {
  const demoAccounts = [
    {
      email: "demo@gmail.com",
      password: "demo123",
      plan: "Starter",
      color: "bg-green-100 text-green-800"
    },
    {
      email: "test@gmail.com",
      password: "test123",
      plan: "Business",
      color: "bg-blue-100 text-blue-800"
    },
    {
      email: "admin@gmail.com",
      password: "admin123",
      plan: "Enterprise",
      color: "bg-purple-100 text-purple-800"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🔐 Login System Test
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Test the secure login popup system with these demo accounts
          </p>
          <Link 
            href="/" 
            className="inline-flex items-center px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-semibold"
          >
            ← Back to Homepage
          </Link>
        </div>

        {/* Demo Accounts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {demoAccounts.map((account, index) => (
            <Card key={index} className="border-2 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-8 h-8 text-gray-600" />
                </div>
                <CardTitle className="text-xl">
                  Demo Account {index + 1}
                </CardTitle>
                <Badge className={account.color}>
                  <Crown className="w-3 h-3 mr-1" />
                  {account.plan}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <span className="font-mono text-sm">{account.email}</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Lock className="w-4 h-4 text-gray-500" />
                  <span className="font-mono text-sm">{account.password}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Instructions */}
        <Card className="bg-green-50 border-green-200">
          <CardHeader>
            <CardTitle className="text-green-800 flex items-center">
              <span className="mr-2">📋</span>
              How to Test the Login System
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-green-700">
            <div className="space-y-2">
              <p className="font-semibold">Step 1: Go to Homepage</p>
              <p>Click the "Back to Homepage" button above to return to the main page.</p>
            </div>
            <div className="space-y-2">
              <p className="font-semibold">Step 2: Click Login Button</p>
              <p>Find the "Login" button in the navigation bar (before the "Try Now" button).</p>
            </div>
            <div className="space-y-2">
              <p className="font-semibold">Step 3: Use Demo Credentials</p>
              <p>Use any of the email/password combinations shown above in the login popup.</p>
            </div>
            <div className="space-y-2">
              <p className="font-semibold">Step 4: Access Dashboard</p>
              <p>After successful login, you'll be redirected to your personalized dashboard.</p>
            </div>
          </CardContent>
        </Card>

        {/* Security Features */}
        <Card className="mt-6 bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-800 flex items-center">
              <span className="mr-2">🔒</span>
              Security Features Implemented
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 text-blue-700">
            <div>
              <p className="font-semibold mb-2">✅ Gmail Validation</p>
              <p className="text-sm">Only accepts valid @gmail.com email addresses</p>
            </div>
            <div>
              <p className="font-semibold mb-2">✅ Input Sanitization</p>
              <p className="text-sm">All inputs are validated and sanitized</p>
            </div>
            <div>
              <p className="font-semibold mb-2">✅ Error Handling</p>
              <p className="text-sm">Secure error messages prevent information leakage</p>
            </div>
            <div>
              <p className="font-semibold mb-2">✅ Session Management</p>
              <p className="text-sm">Secure user session handling with logout functionality</p>
            </div>
            <div>
              <p className="font-semibold mb-2">✅ Password Protection</p>
              <p className="text-sm">Password visibility toggle for better UX</p>
            </div>
            <div>
              <p className="font-semibold mb-2">✅ Route Protection</p>
              <p className="text-sm">Dashboard requires authentication to access</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}