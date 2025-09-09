import { Suspense } from "react"
import CreateAccountClient from "./CreateAccountClient"

export default function CreateAccountPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="animate-pulse">
            <div className="bg-white rounded-lg shadow-2xl border-blue-200 p-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-200 rounded-full mx-auto mb-4"></div>
                <div className="h-6 bg-blue-200 rounded mb-2"></div>
                <div className="h-4 bg-blue-100 rounded mb-6"></div>
              </div>
              <div className="space-y-4">
                <div className="h-10 bg-gray-200 rounded"></div>
                <div className="h-10 bg-gray-200 rounded"></div>
                <div className="h-10 bg-gray-200 rounded"></div>
                <div className="h-12 bg-blue-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    }>
      <CreateAccountClient />
    </Suspense>
  )
}