import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email-service';
import { verifyEmailConnection } from '@/lib/verify-email';

// Email validation regex
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// In-memory storage for form submissions (in production, use a database)
const submissionTracker = new Map<string, { count: number; lastSubmission: Date }>();

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();
    
    // Validate required fields
    const { agentType, voicePreference, fullName, email, whatsappNumber, subscriptionPlan } = body;
    
    // Check form submission restrictions for starter plan users
    if (subscriptionPlan && subscriptionPlan.toLowerCase() === 'starter') {
      const userKey = email.toLowerCase();
      const userSubmissions = submissionTracker.get(userKey);
      
      if (userSubmissions && userSubmissions.count >= 1) {
        return NextResponse.json(
          { 
            success: false, 
            message: 'Starter plan users can only submit one form. Please upgrade to Business plan for multiple agent submissions.' 
          },
          { status: 403 }
        );
      }
    }
    
    // Check for missing required fields
    const missingFields = [];
    if (!agentType) missingFields.push('Agent Type');
    if (!voicePreference) missingFields.push('Voice Preference');
    if (!fullName) missingFields.push('Full Name');
    if (!email) missingFields.push('Email');
    if (!whatsappNumber) missingFields.push('WhatsApp Number');
    
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
    
    // Verify email connection before sending
    const isConnected = await verifyEmailConnection();
    if (!isConnected) {
      console.error('Email server connection failed');
      return NextResponse.json(
        { success: false, message: 'Email service is currently unavailable. Please try again later.' },
        { status: 503 }
      );
    }
    
    // Create HTML content for the email
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
          <meta charset="utf-8">
          <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .header { background: linear-gradient(135deg, #16a34a, #15803d); color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
              .content { background: #f9f9f9; padding: 20px; border-radius: 8px; }
              .field { margin: 10px 0; }
              .label { font-weight: bold; color: #16a34a; }
              .section { background: white; padding: 15px; border-left: 4px solid #16a34a; margin: 15px 0; border-radius: 4px; }
          </style>
      </head>
      <body>
          <div class="header">
              <h2>🤖 New AI Agent Submission - CallMint.tech</h2>
          </div>
          <div class="content">
              <div class="section">
                  <h3>🎯 Agent Configuration</h3>
                  <div class="field"><span class="label">Agent Type:</span> ${agentType}</div>
                  <div class="field"><span class="label">Voice Preference:</span> ${voicePreference}</div>
                  <div class="field"><span class="label">Knowledge Base:</span> ${body.knowledgeBase || 'Not specified'}</div>
                  <div class="field"><span class="label">CRM/Tech Stack:</span> ${body.crmTechStack || 'Not specified'}</div>
              </div>
              
              <div class="section">
                  <h3>👤 Customer Information</h3>
                  <div class="field"><span class="label">Full Name:</span> ${fullName}</div>
                  <div class="field"><span class="label">Email:</span> ${email}</div>
                  <div class="field"><span class="label">WhatsApp Number:</span> ${whatsappNumber}</div>
                  <div class="field"><span class="label">Subscription Plan:</span> ${subscriptionPlan || 'Not specified'}</div>
              </div>
              
              ${body.additionalInfo ? `
              <div class="section">
                  <h3>📝 Additional Information</h3>
                  <p>${body.additionalInfo}</p>
              </div>
              ` : ''}
              
              <div class="section">
                  <h3>📅 Submission Details</h3>
                  <div class="field"><span class="label">Submission Date:</span> ${new Date().toLocaleString()}</div>
                  <div class="field"><span class="label">User Name:</span> ${body.userName || 'Not specified'}</div>
              </div>
          </div>
      </body>
      </html>
    `;
    
    // Create plain text content as fallback
    const textContent = `
🤖 New AI Agent Submission - CallMint.tech

🎯 Agent Configuration:
Agent Type: ${agentType}
Voice Preference: ${voicePreference}
Knowledge Base: ${body.knowledgeBase || 'Not specified'}
CRM/Tech Stack: ${body.crmTechStack || 'Not specified'}

👤 Customer Information:
Full Name: ${fullName}
Email: ${email}
WhatsApp Number: ${whatsappNumber}
Subscription Plan: ${subscriptionPlan || 'Not specified'}

${body.additionalInfo ? `📝 Additional Information:\n${body.additionalInfo}\n\n` : ''}
📅 Submission Details:
Submission Date: ${new Date().toLocaleString()}
User Name: ${body.userName || 'Not specified'}

---
This email was sent from the CallMint.tech dashboard form.
    `;
    
    // Send email to company email
    const emailResult = await sendEmail({
      to: process.env.CONTACT_EMAIL || 'support@callmint.tech',
      subject: `🤖 New AI Agent Request: ${agentType} - ${fullName}`,
      text: textContent,
      html: htmlContent,
      replyTo: email // Set reply-to as the customer's email
    });
    
    if (!emailResult.success) {
      console.error('Failed to send dashboard form email:', emailResult.error);
      
      let errorMessage = 'Failed to submit your request';
      
      if (emailResult.error && emailResult.error.code === 'EAUTH') {
        errorMessage = 'Authentication with email server failed. Please contact support.';
      } else if (emailResult.error && emailResult.error.code === 'ESOCKET') {
        errorMessage = 'Connection to email server failed. Please try again later.';
      }
      
      return NextResponse.json(
        { success: false, message: errorMessage },
        { status: 500 }
      );
    }
    
    // Send auto-reply to customer
    const autoReplyHtml = `
      <!DOCTYPE html>
      <html>
      <head>
          <meta charset="utf-8">
          <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .header { background: linear-gradient(135deg, #16a34a, #15803d); color: white; padding: 30px; text-align: center; border-radius: 8px; margin-bottom: 30px; }
              .content { background: #f9f9f9; padding: 30px; border-radius: 8px; }
              .logo { font-size: 28px; font-weight: bold; }
              .footer { background: #333; color: white; padding: 20px; text-align: center; margin-top: 30px; border-radius: 8px; }
          </style>
      </head>
      <body>
          <div class="header">
              <div class="logo">🤖 CallMint.tech</div>
              <p>AI Agent Request Confirmation</p>
          </div>
          <div class="content">
              <h2>Hi ${fullName}! 👋</h2>
              <p>Thank you for submitting your AI agent request! We've received your ${agentType} agent configuration and are excited to help transform your business with AI-powered automation.</p>
              
              <h3>What happens next?</h3>
              <ul>
                  <li>✅ Our AI specialist will review your requirements within a few hours</li>
                  <li>📞 We'll contact you via WhatsApp (${whatsappNumber}) or email to discuss details</li>
                  <li>🚀 We'll begin building your custom AI agent based on your specifications</li>
              </ul>
              
              <p><strong>Your Request Summary:</strong></p>
              <ul>
                  <li>Agent Type: ${agentType}</li>
                  <li>Voice Preference: ${voicePreference}</li>
                  <li>Subscription Plan: ${subscriptionPlan || 'To be determined'}</li>
              </ul>
              
              <p>Questions? Simply reply to this email or contact us:</p>
              <p>📞 +1 833 722 1177 (Toll-free)<br>
              📱 +1 323 649 8803 (LA Local)</p>
          </div>
          <div class="footer">
              <p>CallMint.tech - Transform Your Business with AI Agents</p>
              <p>© 2025 CallMint.tech. All rights reserved.</p>
          </div>
      </body>
      </html>
    `;
    
    const autoReplyText = `
Hi ${fullName}! 👋

Thank you for submitting your AI agent request! We've received your ${agentType} agent configuration and are excited to help transform your business with AI-powered automation.

What happens next?
✅ Our AI specialist will review your requirements within a few hours
📞 We'll contact you via WhatsApp (${whatsappNumber}) or email to discuss details
🚀 We'll begin building your custom AI agent based on your specifications

Your Request Summary:
- Agent Type: ${agentType}
- Voice Preference: ${voicePreference}
- Subscription Plan: ${subscriptionPlan || 'To be determined'}

Questions? Simply reply to this email or contact us:
📞 +1 833 722 1177 (Toll-free)
📱 +1 323 649 8803 (LA Local)

---
CallMint.tech - Transform Your Business with AI Agents
© 2025 CallMint.tech. All rights reserved.
    `;
    
    // Send auto-reply (don't fail if this fails)
    await sendEmail({
      to: email,
      subject: `🤖 AI Agent Request Received - CallMint.tech`,
      text: autoReplyText,
      html: autoReplyHtml
    }).catch(error => {
      console.error('Failed to send auto-reply:', error);
    });
    
    // Track successful submission for starter plan users
    if (subscriptionPlan && subscriptionPlan.toLowerCase() === 'starter') {
      const userKey = email.toLowerCase();
      const currentSubmissions = submissionTracker.get(userKey) || { count: 0, lastSubmission: new Date() };
      submissionTracker.set(userKey, {
        count: currentSubmissions.count + 1,
        lastSubmission: new Date()
      });
    }
    
    // Return success response
    return NextResponse.json({ 
      success: true, 
      message: 'Your form has been submitted successfully. We will respond to you within a few hours.'
    });
  } catch (error) {
    console.error('Error in dashboard form API route:', error);
    return NextResponse.json(
      { success: false, message: 'An error occurred while processing your request' },
      { status: 500 }
    );
  }
}