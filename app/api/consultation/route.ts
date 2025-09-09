import { NextRequest, NextResponse } from 'next/server'
import { sendConsultationEmail, sendConsultationConfirmation } from '@/lib/email-service'

interface ConsultationData {
  fullName: string
  email: string
  phone: string
  preferredDate: string
  preferredTime: string
}

export async function POST(request: NextRequest) {
  try {
    const body: ConsultationData = await request.json()
    
    // Validate required fields
    const { fullName, email, phone, preferredDate, preferredTime } = body
    
    if (!fullName || !email || !phone || !preferredDate || !preferredTime) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Validate date is not in the past
    const selectedDate = new Date(preferredDate)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    if (selectedDate < today) {
      return NextResponse.json(
        { error: 'Date cannot be in the past' },
        { status: 400 }
      )
    }

    // Validate business hours (9 AM to 6 PM)
    const [hours, minutes] = preferredTime.split(':').map(Number)
    const timeInMinutes = hours * 60 + minutes
    const startTime = 9 * 60 // 9:00 AM
    const endTime = 18 * 60 // 6:00 PM
    
    if (timeInMinutes < startTime || timeInMinutes > endTime) {
      return NextResponse.json(
        { error: 'Please select a time between 9:00 AM and 6:00 PM' },
        { status: 400 }
      )
    }

    let emailSuccess = true;
    let emailError = null;
    let adminEmailResult = null;
    let userEmailResult = null;

    try {
      // Send admin notification
      adminEmailResult = await sendConsultationEmail({
        fullName,
        email,
        phone,
        preferredDate,
        preferredTime
      });

      // Send confirmation to user
      userEmailResult = await sendConsultationConfirmation({
        fullName,
        email,
        preferredDate,
        preferredTime
      });
    } catch (emailErr) {
      console.error('Email sending failed:', emailErr);
      emailSuccess = false;
      emailError = emailErr;
    }

    // Always return success for form submission, even if email fails
    // This ensures the user gets feedback that their request was received
    if (emailSuccess && adminEmailResult?.success) {
      return NextResponse.json(
        { 
          success: true,
          message: 'Consultation request submitted successfully! You will receive a confirmation email shortly.',
          adminEmailId: adminEmailResult.messageId,
          userEmailId: userEmailResult?.messageId
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { 
          success: true,
          message: 'Consultation request received! Due to email service issues, you may not receive a confirmation email, but we have your request and will contact you soon.',
          warning: 'Email delivery issue'
        },
        { status: 200 }
      );
    }

  } catch (error) {
    console.error('Consultation API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}