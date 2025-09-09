import nodemailer from 'nodemailer';

interface EmailData {
  to?: string;
  from?: string;
  subject: string;
  text?: string;
  html?: string;
  replyTo?: string;
}

// Email configuration from environment variables
const emailConfig = {
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: process.env.EMAIL_SECURE === 'true', // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
  logger: process.env.NODE_ENV === 'development',
  debug: process.env.NODE_ENV === 'development',
  connectionTimeout: 60000, // 60 seconds
  greetingTimeout: 30000, // 30 seconds
  socketTimeout: 60000, // 60 seconds
  tls: {
    rejectUnauthorized: false,
    ciphers: 'SSLv3'
  }
};

// Create transporter with Gmail configuration
export let transporter: nodemailer.Transporter;

// Initialize the transporter
export function initializeTransporter() {
  try {
    // Validate required environment variables
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      throw new Error('Email credentials not found in environment variables');
    }

    transporter = nodemailer.createTransport(emailConfig);
    console.log('Email transporter initialized with Gmail configuration');
    return true;
  } catch (error) {
    console.error('Failed to initialize email transporter:', error);
    return false;
  }
}

// Initialize on module load
initializeTransporter();
// Send email function
export async function sendEmail(data: EmailData): Promise<{ success: boolean; error?: any; messageId?: string }> {
  try {
    // Ensure transporter is initialized
    if (!transporter) {
      const initialized = initializeTransporter();
      if (!initialized) {
        throw new Error('Failed to initialize email transporter');
      }
    }
    
    // Set default from address if not provided
    const mailOptions = {
      from: data.from || process.env.EMAIL_FROM || '"CallMint.tech" <Mohammed.ayaz@azmaoudperfumes.com>',
      to: data.to || process.env.CONTACT_EMAIL || 'Mohammed.ayaz@azmaoudperfumes.com',
      subject: data.subject,
      text: data.text,
      html: data.html,
      replyTo: data.replyTo,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error };
  }
}

// Function to send contact form submission
export async function sendContactFormEmail(formData: {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  plan?: string;
  message: string;
}): Promise<{ success: boolean; error?: any; messageId?: string }> {
  const { name, email, phone, company, plan, message } = formData;
  
  // Create HTML content for the email
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .header { background: linear-gradient(135deg, #0ea5e9, #8b5cf6); color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
            .content { background: #f9f9f9; padding: 20px; border-radius: 8px; }
            .field { margin: 10px 0; }
            .label { font-weight: bold; color: #0ea5e9; }
            .message-box { background: white; padding: 15px; border-left: 4px solid #0ea5e9; margin: 15px 0; }
        </style>
    </head>
    <body>
        <div class="header">
            <h2>🚀 New Contact Form Submission - CallMint.tech</h2>
        </div>
        <div class="content">
            <div class="field"><span class="label">👤 Name:</span> ${name}</div>
            <div class="field"><span class="label">📧 Email:</span> ${email}</div>
            ${phone ? `<div class="field"><span class="label">📱 Phone:</span> ${phone}</div>` : ''}
            ${company ? `<div class="field"><span class="label">🏢 Company:</span> ${company}</div>` : ''}
            ${plan ? `<div class="field"><span class="label">📋 Interested Plan:</span> ${plan}</div>` : ''}
            <div class="field"><span class="label">📅 Date:</span> ${new Date().toLocaleString()}</div>
            <div class="message-box">
                <h3>💬 Message:</h3>
                <p>${message.replace(/\n/g, '<br>')}</p>
            </div>
        </div>
    </body>
    </html>
  `;

  // Create plain text content as fallback
  const textContent = `
🚀 New Contact Form Submission - CallMint.tech

👤 Name: ${name}
📧 Email: ${email}
${phone ? `📱 Phone: ${phone}\n` : ''}
${company ? `🏢 Company: ${company}\n` : ''}
${plan ? `📋 Interested Plan: ${plan}\n` : ''}
📅 Date: ${new Date().toLocaleString()}

💬 Message:
${message}

---
This email was sent from the CallMint.tech contact form.
  `;

  // Send email to your Gmail account
  return sendEmail({
    to: process.env.CONTACT_EMAIL || 'Mohammed.ayaz@azmaoudperfumes.com',
    subject: `🚀 New Lead: ${name} from ${company || 'Unknown Company'} - CallMint.tech`,
    text: textContent,
    html: htmlContent,
    replyTo: email // Set reply-to as the sender's email
  });
}

// Function to send auto-reply to the contact form submitter
export async function sendAutoReply(userEmail: string, userName: string): Promise<{ success: boolean; error?: any; messageId?: string }> {
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .header { background: linear-gradient(135deg, #0ea5e9, #8b5cf6); color: white; padding: 30px; text-align: center; border-radius: 8px; margin-bottom: 30px; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 8px; }
            .logo { font-size: 28px; font-weight: bold; }
            .cta-button { display: inline-block; background: linear-gradient(135deg, #0ea5e9, #8b5cf6); color: white; padding: 15px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; font-weight: bold; }
            .footer { background: #333; color: white; padding: 20px; text-align: center; margin-top: 30px; border-radius: 8px; }
        </style>
    </head>
    <body>
        <div class="header">
            <div class="logo">🤖 CallMint.tech</div>
            <p>AI Agents & Custom AI Systems</p>
        </div>
        <div class="content">
            <h2>Hi ${userName}! 👋</h2>
            <p>Thank you for reaching out to CallMint.tech! We've received your message and are excited to help transform your business with AI-powered call automation.</p>
            
            <h3>What happens next?</h3>
            <ul>
                <li>✅ Our AI specialist will review your inquiry within 2 hours</li>
                <li>📞 We'll schedule a personalized demo tailored to your needs</li>
                <li>🚀 You'll see how our AI agents can revolutionize your business communications</li>
            </ul>
            
            <p>While you wait, feel free to:</p>
            <a href="https://callmint.tech/pricing" class="cta-button">View Our Pricing Plans</a>
            <br>
            <a href="https://calendly.com/your-calendly-link" class="cta-button">Book a Live Demo</a>
            
            <p><strong>Quick Facts about CallMint.tech:</strong></p>
            <ul>
                <li>🎯 3 specialized AI agents: Inbound, Outbound, and Support</li>
                <li>⚡ Lightning-fast deployment in minutes</li>
                <li>🔧 Built with n8n automation, VAPI voice AI, and advanced workflows</li>
                <li>📈 Handle 10,000+ calls daily with 99.9% uptime</li>
                <li>🛡️ Military-grade security and HIPAA-ready</li>
            </ul>
            
            <p>Questions? Simply reply to this email or call us:</p>
            <p>📞 +1 833 722 1177 (Toll-free)<br>
            📱 +1 323 649 8803 (LA Local)</p>
        </div>
        <div class="footer">
            <p><strong>CallMint.tech</strong> - Transform Your Business with AI Agents</p>
            <p>1111 B S Governors Ave STE ###, Dover DE</p>
            <p>© 2025 CallMint.tech. All rights reserved.</p>
        </div>
    </body>
    </html>
  `;

  const textContent = `
Hi ${userName}! 👋

Thank you for reaching out to CallMint.tech! We've received your message and are excited to help transform your business with AI-powered call automation.

What happens next?
✅ Our AI specialist will review your inquiry within 2 hours
📞 We'll schedule a personalized demo tailored to your needs
🚀 You'll see how our AI agents can revolutionize your business communications

While you wait, feel free to:
- View our pricing plans: https://callmint.tech/pricing
- Book a live demo: https://calendly.com/your-calendly-link

Quick Facts about CallMint.tech:
🎯 3 specialized AI agents: Inbound, Outbound, and Support
⚡ Lightning-fast deployment in minutes
🔧 Built with n8n automation, VAPI voice AI, and advanced workflows
📈 Handle 10,000+ calls daily with 99.9% uptime
🛡️ Military-grade security and HIPAA-ready

Questions? Simply reply to this email or call us:
📞 +1 833 722 1177 (Toll-free)
📱 +1 323 649 8803 (LA Local)

---
CallMint.tech - Transform Your Business with AI Agents
1111 B S Governors Ave STE ###, Dover DE
© 2025 CallMint.tech. All rights reserved.
  `;

  return sendEmail({
    to: userEmail,
    subject: `🤖 Thank you for contacting CallMint.tech! Your AI transformation starts here`,
    text: textContent,
    html: htmlContent
  });
}

// Function to send notification email to admin about new contact
export async function sendAdminNotification(formData: {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  plan?: string;
  message: string;
}): Promise<{ success: boolean; error?: any; messageId?: string }> {
  const { name, email, phone, company, plan, message } = formData;
  
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .header { background: linear-gradient(135deg, #ff6b6b, #ffa726); color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; text-align: center; }
            .content { background: #f9f9f9; padding: 20px; border-radius: 8px; }
            .urgent { background: #ffebee; border-left: 4px solid #f44336; padding: 15px; margin: 15px 0; }
            .field { margin: 10px 0; padding: 8px; background: white; border-radius: 4px; }
            .label { font-weight: bold; color: #0ea5e9; }
            .cta-button { display: inline-block; background: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; margin: 10px 5px; }
        </style>
    </head>
    <body>
        <div class="header">
            <h2>🚨 URGENT: New Lead Alert!</h2>
            <p>Someone just contacted CallMint.tech</p>
        </div>
        <div class="content">
            <div class="urgent">
                <h3>⚡ ACTION REQUIRED: Respond within 2 hours!</h3>
            </div>
            
            <div class="field"><span class="label">👤 Name:</span> <strong>${name}</strong></div>
            <div class="field"><span class="label">📧 Email:</span> <strong>${email}</strong></div>
            ${phone ? `<div class="field"><span class="label">📱 Phone:</span> <strong>${phone}</strong></div>` : ''}
            ${company ? `<div class="field"><span class="label">🏢 Company:</span> <strong>${company}</strong></div>` : ''}
            ${plan ? `<div class="field"><span class="label">💰 Interested Plan:</span> <strong>${plan}</strong> ($${plan === 'Starter' ? '299' : plan === 'Business' ? '499' : 'Custom'}/month)</div>` : ''}
            <div class="field"><span class="label">📅 Received:</span> <strong>${new Date().toLocaleString()}</strong></div>
            
            <div style="background: white; padding: 15px; border-left: 4px solid #0ea5e9; margin: 15px 0;">
                <h3>💬 Message:</h3>
                <p style="font-style: italic;">${message.replace(/\n/g, '<br>')}</p>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
                <a href="mailto:${email}" class="cta-button">📧 Reply Now</a>
                ${phone ? `<a href="tel:${phone}" class="cta-button">📞 Call Now</a>` : ''}
                <a href="https://calendly.com/your-calendly-link" class="cta-button">📅 Schedule Demo</a>
            </div>
            
            <div style="background: #e8f5e8; padding: 15px; border-radius: 6px; margin: 20px 0;">
                <h4>📊 Lead Quality Score:</h4>
                <ul>
                    <li>Company provided: ${company ? '✅ Yes (+20 points)' : '❌ No'}</li>
                    <li>Phone provided: ${phone ? '✅ Yes (+15 points)' : '❌ No'}</li>
                    <li>Plan interested: ${plan ? `✅ ${plan} (+25 points)` : '❌ No specific plan'}</li>
                    <li>Message length: ${message.length > 100 ? '✅ Detailed (+10 points)' : message.length > 50 ? '⚠️ Medium' : '❌ Brief'}</li>
                </ul>
            </div>
        </div>
    </body>
    </html>
  `;

  return sendEmail({
    to: process.env.CONTACT_EMAIL || 'Mohammed.ayaz@azmaoudperfumes.com',
    subject: `🚨 URGENT LEAD: ${name} from ${company || 'Unknown'} interested in ${plan || 'AI services'}`,
    html: htmlContent
  });
}

// Send consultation booking notification to admin
export async function sendConsultationEmail(consultationData: {
  fullName: string;
  email: string;
  phone: string;
  preferredDate: string;
  preferredTime: string;
}): Promise<{ success: boolean; error?: any; messageId?: string }> {
  const { fullName, email, phone, preferredDate, preferredTime } = consultationData;
  
  // Format date and time for display
  const formattedDate = new Date(preferredDate).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  const formattedTime = new Date(`2000-01-01T${preferredTime}`).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Free Consultation Request</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px; background-color: #f4f4f4; }
        .container { max-width: 600px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; box-shadow: 0 0 20px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 20px; border-radius: 8px; text-align: center; margin-bottom: 30px; }
        .header h1 { margin: 0; font-size: 24px; }
        .consultation-details { background: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #10b981; margin: 20px 0; }
        .detail-row { display: flex; margin-bottom: 15px; }
        .detail-label { font-weight: bold; min-width: 140px; color: #374151; }
        .detail-value { color: #1f2937; }
        .priority-notice { background: #fef3c7; border: 1px solid #f59e0b; padding: 15px; border-radius: 8px; margin: 20px 0; }
        .priority-notice h3 { color: #92400e; margin: 0 0 10px 0; }
        .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; }
        .calendar-icon { display: inline-block; margin-right: 8px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>📅 New Free Consultation Request</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">A potential client has requested a consultation</p>
        </div>
        
        <div class="priority-notice">
          <h3>⚡ Action Required</h3>
          <p style="margin: 0;">Please contact this lead within 24 hours to confirm the consultation appointment.</p>
        </div>
        
        <div class="consultation-details">
          <h2 style="color: #10b981; margin-top: 0;">📋 Consultation Details</h2>
          
          <div class="detail-row">
            <span class="detail-label">👤 Full Name:</span>
            <span class="detail-value">${fullName}</span>
          </div>
          
          <div class="detail-row">
            <span class="detail-label">📧 Email:</span>
            <span class="detail-value"><a href="mailto:${email}" style="color: #10b981; text-decoration: none;">${email}</a></span>
          </div>
          
          <div class="detail-row">
            <span class="detail-label">📱 Phone:</span>
            <span class="detail-value"><a href="tel:${phone}" style="color: #10b981; text-decoration: none;">${phone}</a></span>
          </div>
          
          <div class="detail-row">
            <span class="detail-label">📅 Preferred Date:</span>
            <span class="detail-value">${formattedDate}</span>
          </div>
          
          <div class="detail-row">
            <span class="detail-label">🕐 Preferred Time:</span>
            <span class="detail-value">${formattedTime}</span>
          </div>
        </div>
        
        <div style="background: #ecfdf5; padding: 20px; border-radius: 8px; border: 1px solid #10b981; margin: 20px 0;">
          <h3 style="color: #065f46; margin: 0 0 10px 0;">💡 Next Steps</h3>
          <ul style="margin: 0; padding-left: 20px; color: #374151;">
            <li>Contact the client within 24 hours</li>
            <li>Confirm the consultation date and time</li>
            <li>Send calendar invitation</li>
            <li>Prepare consultation materials</li>
          </ul>
        </div>
        
        <div class="footer">
          <p>This email was automatically generated from your website's consultation booking system.</p>
          <p style="font-size: 12px; margin: 5px 0 0 0;">Received on ${new Date().toLocaleString()}</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return sendEmail({
    to: process.env.EMAIL_USER,
    subject: `🚨 NEW CONSULTATION REQUEST: ${fullName} - ${formattedDate} at ${formattedTime}`,
    html: htmlContent,
    replyTo: email
  });
}

// Send consultation confirmation to user
export async function sendConsultationConfirmation(consultationData: {
  fullName: string;
  email: string;
  preferredDate: string;
  preferredTime: string;
}): Promise<{ success: boolean; error?: any; messageId?: string }> {
  const { fullName, email, preferredDate, preferredTime } = consultationData;
  
  // Format date and time for display
  const formattedDate = new Date(preferredDate).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  const formattedTime = new Date(`2000-01-01T${preferredTime}`).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Consultation Request Confirmed</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px; background-color: #f4f4f4; }
        .container { max-width: 600px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; box-shadow: 0 0 20px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 20px; border-radius: 8px; text-align: center; margin-bottom: 30px; }
        .header h1 { margin: 0; font-size: 24px; }
        .confirmation-details { background: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #10b981; margin: 20px 0; }
        .detail-row { display: flex; margin-bottom: 15px; }
        .detail-label { font-weight: bold; min-width: 120px; color: #374151; }
        .detail-value { color: #1f2937; }
        .next-steps { background: #ecfdf5; padding: 20px; border-radius: 8px; border: 1px solid #10b981; margin: 20px 0; }
        .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>✅ Consultation Request Received!</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">Thank you for your interest in our AI solutions</p>
        </div>
        
        <p>Dear ${fullName},</p>
        
        <p>Thank you for requesting a free consultation with our team! We're excited to learn about your business needs and show you how our AI solutions can help transform your operations.</p>
        
        <div class="confirmation-details">
          <h2 style="color: #10b981; margin-top: 0;">📋 Your Consultation Request</h2>
          
          <div class="detail-row">
            <span class="detail-label">📅 Date:</span>
            <span class="detail-value">${formattedDate}</span>
          </div>
          
          <div class="detail-row">
            <span class="detail-label">🕐 Time:</span>
            <span class="detail-value">${formattedTime}</span>
          </div>
          
          <div class="detail-row">
            <span class="detail-label">📧 Contact Email:</span>
            <span class="detail-value">${email}</span>
          </div>
        </div>
        
        <div class="next-steps">
          <h3 style="color: #065f46; margin: 0 0 15px 0;">🚀 What Happens Next?</h3>
          <ul style="margin: 0; padding-left: 20px; color: #374151;">
            <li><strong>Confirmation Call:</strong> Our team will contact you within 24 hours to confirm your consultation</li>
            <li><strong>Calendar Invitation:</strong> You'll receive a calendar invite with meeting details</li>
            <li><strong>Preparation:</strong> We'll prepare customized insights based on your industry</li>
            <li><strong>Consultation:</strong> During our 30-45 minute session, we'll discuss your specific needs and demonstrate relevant solutions</li>
          </ul>
        </div>
        
        <div style="background: #fef3c7; padding: 20px; border-radius: 8px; border: 1px solid #f59e0b; margin: 20px 0;">
          <h3 style="color: #92400e; margin: 0 0 10px 0;">📞 Need to Make Changes?</h3>
          <p style="margin: 0; color: #374151;">If you need to reschedule or have any questions, please reply to this email or call us directly. We're here to accommodate your schedule!</p>
        </div>
        
        <p>We look forward to speaking with you soon and helping you discover the potential of AI for your business.</p>
        
        <p>Best regards,<br>
        <strong>The AI Solutions Team</strong></p>
        
        <div class="footer">
          <p>This is an automated confirmation email. Please save this for your records.</p>
          <p style="font-size: 12px; margin: 5px 0 0 0;">If you didn't request this consultation, please ignore this email.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return sendEmail({
    to: email,
    subject: `✅ Consultation Request Confirmed - ${formattedDate} at ${formattedTime}`,
    html: htmlContent
  });
}
