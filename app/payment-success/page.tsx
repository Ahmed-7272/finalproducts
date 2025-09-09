import { Suspense } from "react"
import PaymentSuccessContent from "./PaymentSuccessContent"

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gradient-to-br from-mint-50 to-white flex items-center justify-center px-4"><div className="text-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-mint-500 mx-auto mb-4"></div><p className="text-gray-600">Loading...</p></div></div>}>
      <PaymentSuccessContent />
    </Suspense>
  )
}
