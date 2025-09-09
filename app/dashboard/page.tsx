"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  LogOut, 
  Crown, 
  Bot,
  Upload,
  Send
} from "lucide-react"
import { useState, useEffect } from "react"
import { AuthService, User as UserType } from "@/lib/auth"

interface AgentFormData {
  agentType: string
  voicePreference: string
  knowledgeBase: string
  knowledgeFiles: File[]
  crmTechStack: string
  userName: string
  fullName: string
  email: string
  whatsappNumber: string
  additionalInfo: string
}

export default function DashboardPage() {
  const [user, setUser] = useState<UserType | null>(null)
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState<AgentFormData[]>([])
  const [submitting, setSubmitting] = useState<number | null>(null)

  useEffect(() => {
    const checkAuth = () => {
      const currentUser = AuthService.getCurrentUser()
      if (!currentUser) {
        window.location.href = '/'
        return
      }
      setUser(currentUser)
      setLoading(false)
      
      // Initialize form data based on subscription plan
      const planLower = currentUser.subscriptionPlan?.toLowerCase()
      const formCount = planLower === 'business' ? 3 : 1
      const initialForms = Array(formCount).fill(null).map(() => ({
        agentType: '',
        voicePreference: '',
        knowledgeBase: '',
        knowledgeFiles: [],
        crmTechStack: '',
        userName: '',
        fullName: '',
        email: '',
        whatsappNumber: '',
        additionalInfo: ''
      }))
      setFormData(initialForms)
    }
    
    const timer = setTimeout(checkAuth, 100)
    return () => clearTimeout(timer)
  }, [])

  const handleSignOut = () => {
    AuthService.logout()
    window.location.href = '/'
  }

  const getPlanColor = (plan: string) => {
    switch (plan?.toLowerCase()) {
      case 'starter':
        return 'bg-green-100 text-green-800'
      case 'business':
        return 'bg-blue-100 text-blue-800'
      case 'enterprise':
        return 'bg-purple-100 text-purple-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const handleFormChange = (formIndex: number, field: keyof AgentFormData, value: string | File[]) => {
    setFormData(prev => prev.map((form, index) => 
      index === formIndex ? { ...form, [field]: value } : form
    ))
  }

  const handleFileUpload = (formIndex: number, files: FileList | null) => {
    if (files) {
      const fileArray = Array.from(files)
      handleFormChange(formIndex, 'knowledgeFiles', fileArray)
    }
  }

  const handleSubmit = async (formIndex: number) => {
    const form = formData[formIndex]
    
    // Validate required fields
    if (!form.agentType || !form.voicePreference || !form.fullName || !form.email || !form.whatsappNumber) {
      alert('Please fill in all required fields')
      return
    }

    setSubmitting(formIndex)
    
    try {
      // Send form data to API endpoint
      const response = await fetch('/api/dashboard', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          agentType: form.agentType,
          voicePreference: form.voicePreference,
          knowledgeBase: form.knowledgeBase,
          knowledgeFiles: form.knowledgeFiles,
          crmTechStack: form.crmTechStack,
          userName: form.userName,
          fullName: form.fullName,
          email: form.email,
          whatsappNumber: form.whatsappNumber,
          additionalInfo: form.additionalInfo,
          subscriptionPlan: user?.subscriptionPlan
        })
      })
      
      const result = await response.json()
      
      if (result.success) {
        alert(result.message)
        
        // Reset form
        handleFormChange(formIndex, 'agentType', '')
        handleFormChange(formIndex, 'voicePreference', '')
        handleFormChange(formIndex, 'knowledgeBase', '')
        handleFormChange(formIndex, 'crmTechStack', '')
        handleFormChange(formIndex, 'userName', '')
        handleFormChange(formIndex, 'fullName', '')
        handleFormChange(formIndex, 'email', '')
        handleFormChange(formIndex, 'whatsappNumber', '')
        handleFormChange(formIndex, 'additionalInfo', '')
      } else {
        alert(result.message || 'Failed to submit. Please try again.')
      }
      
    } catch (error) {
      console.error('Submission error:', error)
      alert('Failed to submit. Please check your connection and try again.')
    } finally {
      setSubmitting(null)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const renderAgentForm = (formIndex: number) => {
    const form = formData[formIndex]
    if (!form) return null

    return (
      <Card key={formIndex} className="w-full bg-white shadow-xl border border-green-100 rounded-xl sm:rounded-2xl overflow-hidden">
        <CardHeader className="pb-4 sm:pb-6 bg-gradient-to-r from-green-50 to-green-100 border-b border-green-200 p-4 sm:p-6">
          <CardTitle className="flex items-center text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
            <Bot className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 mr-2 sm:mr-3 md:mr-4 text-green-600 flex-shrink-0" />
            <span className="truncate">AI Agent Submission Form {formData.length > 1 ? `#${formIndex + 1}` : ''}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 sm:space-y-8 p-4 sm:p-6 md:p-8">
          {/* User Name */}
          <div className="space-y-2 sm:space-y-3">
            <Label htmlFor={`userName-${formIndex}`} className="text-base sm:text-lg font-semibold text-gray-800">
              Your Name *
            </Label>
            <Input
              id={`userName-${formIndex}`}
              type="text"
              placeholder="Enter your full name"
              value={form.userName}
              onChange={(e) => handleFormChange(formIndex, 'userName', e.target.value)}
              className="h-12 sm:h-14 text-base sm:text-lg border-2 border-gray-200 focus:border-green-500 rounded-lg sm:rounded-xl"
            />
          </div>

          {/* Agent Type */}
          <div className="space-y-2 sm:space-y-3">
            <Label htmlFor={`agentType-${formIndex}`} className="text-base sm:text-lg font-semibold text-gray-800">
              AI Agent Type *
            </Label>
            <Select value={form.agentType} onValueChange={(value) => handleFormChange(formIndex, 'agentType', value)}>
              <SelectTrigger className="w-full h-12 sm:h-14 text-base sm:text-lg border-2 border-gray-200 focus:border-green-500 rounded-lg sm:rounded-xl">
                <SelectValue placeholder="Select agent type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="inbound">Inbound Agent</SelectItem>
                <SelectItem value="outbound">Outbound Agent</SelectItem>
                <SelectItem value="customer-support">Customer Support Agent</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Voice Preference */}
          <div className="space-y-2 sm:space-y-3">
            <Label htmlFor={`voice-${formIndex}`} className="text-base sm:text-lg font-semibold text-gray-800">
              Voice Preference *
            </Label>
            <Select value={form.voicePreference} onValueChange={(value) => handleFormChange(formIndex, 'voicePreference', value)}>
              <SelectTrigger className="w-full h-12 sm:h-14 text-base sm:text-lg border-2 border-gray-200 focus:border-green-500 rounded-lg sm:rounded-xl">
                <SelectValue placeholder="Select voice preference" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male-professional">Male - Professional</SelectItem>
                <SelectItem value="female-professional">Female - Professional</SelectItem>
                <SelectItem value="male-friendly">Male - Friendly</SelectItem>
                <SelectItem value="female-friendly">Female - Friendly</SelectItem>
                <SelectItem value="neutral">Neutral/AI Voice</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Knowledge Base */}
          <div className="space-y-3 sm:space-y-4">
            <Label className="text-base sm:text-lg font-semibold text-gray-800">
              Knowledge Base & Training Data
            </Label>
            <div className="bg-green-50 border-2 border-green-200 rounded-lg sm:rounded-xl p-4 sm:p-6 space-y-3 sm:space-y-4">
              {/* File Upload Section */}
              <div className="space-y-2 sm:space-y-3">
                <Label htmlFor={`files-${formIndex}`} className="text-sm sm:text-base font-medium text-gray-700 flex items-center">
                  <Upload className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2 text-green-600" />
                  <span className="hidden sm:inline">Upload Training Files</span>
                  <span className="sm:hidden">Upload Files</span>
                </Label>
                <div className="relative">
                  <Input
                    id={`files-${formIndex}`}
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.txt,.csv,.xlsx,.json"
                    onChange={(e) => handleFileUpload(formIndex, e.target.files)}
                    className="h-12 sm:h-14 text-sm sm:text-lg border-2 border-gray-200 focus:border-green-500 rounded-lg sm:rounded-xl file:mr-2 sm:file:mr-4 file:py-1 sm:file:py-2 file:px-2 sm:file:px-4 file:rounded-md sm:file:rounded-lg file:border-0 file:text-xs sm:file:text-sm file:font-semibold file:bg-green-100 file:text-green-700 hover:file:bg-green-200"
                  />
                </div>
                {form.knowledgeFiles.length > 0 && (
                  <div className="mt-2 sm:mt-3">
                    <p className="text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Selected Files:</p>
                    <div className="space-y-1 max-h-32 overflow-y-auto">
                      {form.knowledgeFiles.map((file, idx) => (
                        <div key={idx} className="flex items-center text-xs sm:text-sm text-gray-600 bg-white px-2 sm:px-3 py-1 sm:py-2 rounded-md sm:rounded-lg border">
                          <Upload className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-green-500 flex-shrink-0" />
                          <span className="truncate flex-1">{file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              {/* Text Input Section */}
              <div className="space-y-2 sm:space-y-3">
                <Label htmlFor={`knowledge-${formIndex}`} className="text-sm sm:text-base font-medium text-gray-700">
                  Additional Knowledge Base Information
                </Label>
                <Textarea
                  id={`knowledge-${formIndex}`}
                  placeholder="Provide URLs, describe your business processes, add specific instructions, or any other relevant information for training your AI agent..."
                  value={form.knowledgeBase}
                  onChange={(e) => handleFormChange(formIndex, 'knowledgeBase', e.target.value)}
                  className="min-h-[100px] sm:min-h-[120px] text-sm sm:text-lg border-2 border-gray-200 focus:border-green-500 rounded-lg sm:rounded-xl resize-none"
                />
              </div>
            </div>
          </div>

          {/* CRM/Tech Stack */}
          <div className="space-y-2 sm:space-y-3">
            <Label htmlFor={`crm-${formIndex}`} className="text-base sm:text-lg font-semibold text-gray-800">
              CRM or Tech Stack Integration
            </Label>
            <Input
              id={`crm-${formIndex}`}
              placeholder="Specify your preferred CRM/tools (e.g., Salesforce, HubSpot, Zapier) or leave blank for our recommendation"
              value={form.crmTechStack}
              onChange={(e) => handleFormChange(formIndex, 'crmTechStack', e.target.value)}
              className="h-12 sm:h-14 text-base sm:text-lg border-2 border-gray-200 focus:border-green-500 rounded-lg sm:rounded-xl"
            />
          </div>

          {/* User Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-2 sm:space-y-3">
              <Label htmlFor={`fullName-${formIndex}`} className="text-base sm:text-lg font-semibold text-gray-800">
                Full Name *
              </Label>
              <Input
                id={`fullName-${formIndex}`}
                placeholder="Enter your full name"
                value={form.fullName}
                onChange={(e) => handleFormChange(formIndex, 'fullName', e.target.value)}
                className="h-12 sm:h-14 text-base sm:text-lg border-2 border-gray-200 focus:border-green-500 rounded-lg sm:rounded-xl"
              />
            </div>
            <div className="space-y-2 sm:space-y-3">
              <Label htmlFor={`email-${formIndex}`} className="text-base sm:text-lg font-semibold text-gray-800">
                Email Address *
              </Label>
              <Input
                id={`email-${formIndex}`}
                type="email"
                placeholder="Enter your email address"
                value={form.email}
                onChange={(e) => handleFormChange(formIndex, 'email', e.target.value)}
                className="h-12 sm:h-14 text-base sm:text-lg border-2 border-gray-200 focus:border-green-500 rounded-lg sm:rounded-xl"
              />
            </div>
          </div>

          <div className="space-y-2 sm:space-y-3">
            <Label htmlFor={`whatsapp-${formIndex}`} className="text-base sm:text-lg font-semibold text-gray-800">
              WhatsApp Number *
            </Label>
            <Input
              id={`whatsapp-${formIndex}`}
              placeholder="Enter your WhatsApp number with country code (e.g., +1234567890)"
              value={form.whatsappNumber}
              onChange={(e) => handleFormChange(formIndex, 'whatsappNumber', e.target.value)}
              className="h-12 sm:h-14 text-base sm:text-lg border-2 border-gray-200 focus:border-green-500 rounded-lg sm:rounded-xl"
            />
          </div>

          {/* Additional Information */}
          <div className="space-y-2 sm:space-y-3">
            <Label htmlFor={`additional-${formIndex}`} className="text-base sm:text-lg font-semibold text-gray-800">
              Additional Requirements & Instructions
            </Label>
            <Textarea
              id={`additional-${formIndex}`}
              placeholder="Describe any specific requirements, special instructions, business rules, or unique features you want your AI agent to have..."
              value={form.additionalInfo}
              onChange={(e) => handleFormChange(formIndex, 'additionalInfo', e.target.value)}
              className="min-h-[100px] sm:min-h-[120px] text-sm sm:text-lg border-2 border-gray-200 focus:border-green-500 rounded-lg sm:rounded-xl resize-none"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4 sm:pt-6 border-t border-green-200">
            <Button
              onClick={() => handleSubmit(formIndex)}
              disabled={submitting === formIndex}
              className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-3 sm:py-4 h-12 sm:h-14 md:h-16 text-base sm:text-lg md:text-xl font-semibold rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]"
            >
              {submitting === formIndex ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 border-b-2 border-white mr-2 sm:mr-3"></div>
                  <span className="text-sm sm:text-base md:text-lg hidden sm:inline">Submitting Your Request...</span>
                  <span className="text-sm sm:hidden">Submitting...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <Send className="w-4 h-4 sm:w-5 sm:w-5 md:w-6 md:h-6 mr-2 sm:mr-3" />
                  <span className="text-sm sm:text-base md:text-lg hidden sm:inline">Submit AI Agent Request</span>
                  <span className="text-sm sm:hidden">Submit Request</span>
                </div>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-lg border-b-2 border-green-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-18 md:h-20">
            <div className="flex items-center min-w-0 flex-1">
              <div className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 rounded-xl bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center shadow-md flex-shrink-0">
                <img src="/image-removebg-preview.png" alt="CallMint.tech Logo" className="h-5 sm:h-6 md:h-8 w-auto" />
              </div>
              <h1 className="ml-2 sm:ml-3 text-sm sm:text-lg md:text-xl font-bold text-gray-900 truncate">AI Agent Dashboard</h1>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <span className="hidden sm:block text-gray-700 font-medium text-sm md:text-base truncate max-w-32 md:max-w-none">{user?.email}</span>
              <Badge className={getPlanColor(user.subscriptionPlan || '')}>
                <Crown className="w-3 h-3 mr-1" />
                {user.subscriptionPlan || 'No Plan'}
              </Badge>
              <Button
                onClick={handleSignOut}
                variant="outline"
                size="sm"
                className="flex items-center text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2 text-gray-600 hover:text-gray-900"
              >
                <LogOut className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Sign Out</span>
                <span className="sm:hidden">Out</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-4 sm:py-6 md:py-8 px-3 sm:px-4 md:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="mb-6 sm:mb-8 md:mb-12 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-700 to-green-900 bg-clip-text text-transparent mb-4 sm:mb-6">
            Create Your AI Agents
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-xs sm:max-w-2xl md:max-w-3xl mx-auto leading-relaxed px-2 sm:px-0">
            Submit detailed information for your AI agents. Our team will create and configure them according to your specifications with advanced file processing capabilities.
          </p>
          <div className="mt-4 sm:mt-6">
            <Badge variant="outline" className="px-3 sm:px-6 py-2 sm:py-3 text-sm sm:text-lg font-semibold border-2 border-green-300 text-green-800 bg-green-50">
              <Crown className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-green-600" />
              <span className="hidden sm:inline">{user.subscriptionPlan} Plan - {formData.length} Agent{formData.length > 1 ? 's' : ''} Available</span>
              <span className="sm:hidden">{user.subscriptionPlan}</span>
            </Badge>
          </div>
        </div>

        {/* Agent Forms */}
        <div className="space-y-8">
          {formData.length > 0 && formData.map((_, index) => renderAgentForm(index))}
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center">
          <div className="bg-blue-50 rounded-lg p-6 max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">
              Professional AI Agent Setup
            </h3>
            <p className="text-blue-800 text-sm">
              Our expert team will review your submissions and create custom AI agents tailored to your business needs. 
              You'll receive a confirmation email and setup details within 24 hours.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}