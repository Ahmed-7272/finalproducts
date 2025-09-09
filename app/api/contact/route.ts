import { NextRequest, NextResponse } from 'next/server';
import { sendContactFormEmail, sendAutoReply, sendAdminNotification } from '@/lib/email-service';
import { verifyEmailConnection } from '@/lib/verify-email';

// Email validation regex
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();
    
    // Validate required fields
    const { name, email, message, company } = body;
    
    // Check for missing required fields
    const missingFields = [];
    if (!name) missingFields.push('Name');
    if (!email) missingFields.push('Email');
    if (!message) missingFields.push('Message');
    if (!company) missingFields.push('Company');
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { 
          success: false, 
          message: `The following fields are required: ${missingFields.join(', ')}` 
        },
        { status: 400 }
      );
    }
    
    // Validate email format
    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Please enter a valid email address' },
        { status: 400 }
      );
    }
    
    // Validate message length
    if (message.length < 10) {
      return NextResponse.json(
        { success: false, message: 'Message must be at least 10 characters long' },
        { status: 400 }
      );
    }
    
    // Verify email connection before sending
    const isConnected = await verifyEmailConnection();
    if (!isConnected) {
      console.error('Email server connection failed');
      return NextResponse.json(
        { success: false, message: 'Email service is currently unavailable. Please try again later.' },
        { status: 503 }
      );
    }
    
    // Send multiple emails in parallel
    const [adminResult, autoReplyResult] = await Promise.allSettled([
      sendAdminNotification(body),
      sendAutoReply(body.email, body.name)
    ]);
    
    // Check results
    const adminSuccess = adminResult.status === 'fulfilled' && adminResult.value.success;
    const autoReplySuccess = autoReplyResult.status === 'fulfilled' && autoReplyResult.value.success;
    
    // Log any errors but don't fail the entire request if auto-reply fails
    if (!adminSuccess) {
      console.error('Failed to send admin notification:', 
        adminResult.status === 'rejected' ? adminResult.reason : adminResult.value.error
      );
    }
    
    if (!autoReplySuccess) {
      console.error('Failed to send auto-reply:', 
        autoReplyResult.status === 'rejected' ? autoReplyResult.reason : autoReplyResult.value.error
      );
    }
    
    // If admin notification failed, this is critical
    if (!adminSuccess) {
      const error = adminResult.status === 'rejected' ? adminResult.reason : adminResult.value.error;
      let errorMessage = 'Failed to send notification email';
      
      if (error && error.code === 'EAUTH') {
        errorMessage = 'Authentication with email server failed. Please contact support.';
      } else if (error && error.code === 'ESOCKET') {
        errorMessage = 'Connection to email server failed. Please try again later.';
      }
      
      return NextResponse.json(
        { success: false, message: errorMessage },
        { status: 500 }
      );
    }
    
    // Return success response
    return NextResponse.json({ 
      success: true, 
      message: 'Thank you for your message! We\'ve received your inquiry and will respond within 2 hours.',
      details: {
        adminNotificationSent: adminSuccess,
        autoReplySent: autoReplySuccess
      }
    });
  } catch (error) {
    console.error('Error in contact form API route:', error);
    return NextResponse.json(
      { success: false, message: 'An error occurred while processing your request' },
      { status: 500 }
    );
  }
}