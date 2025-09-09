# Email Setup Guide for CallMint.tech - Gmail Integration

## 🚀 Complete Guide to Set Up Real Email Reception

This guide will help you configure your CallMint.tech website to receive real emails through your Gmail account.

## 📋 Prerequisites

1. **Gmail Account** - You need an active Gmail account with 2FA enabled
2. **App Password** - You'll need to generate an app password for SMTP access
3. **Domain Setup** - Optional: You can use a custom domain with Gmail

## 🔧 Step 1: Configure Your Gmail Account

### Generate App Password
1. Log into your Gmail account
2. Go to **Google Account Settings** → **Security**
3. Enable **2-Factor Authentication** (required for app passwords)
4. Go to **App passwords** under Security
5. Generate a new **App Password** for "Mail"
6. Save this password securely - you'll need it for the environment variables

### Verify SMTP Settings
- **Host**: `smtp.gmail.com`
- **Port**: `587` (STARTTLS) or `465` (SSL)
- **Security**: STARTTLS for port 587, SSL for port 465
- **Authentication**: Required

## 🔑 Step 2: Update Environment Variables

Update your `.env.local` file with your actual Gmail credentials:

```env
# Email Configuration for Gmail
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=Mohammed.ayaz@azmaoudperfumes.com
EMAIL_PASSWORD=xczalntpevxexetj
EMAIL_FROM=Mohammed.ayaz@azmaoudperfumes.com
EMAIL_SECURE=false

# Recipient email for contact forms
CONTACT_EMAIL=Mohammed.ayaz@azmaoudperfumes.com
```

**Configuration Details:**
- `Mohammed.ayaz@azmaoudperfumes.com` - Your Gmail address
- `xczalntpevxexetj` - Your Gmail app password (no spaces, already configured)
- Port 587 with STARTTLS (EMAIL_SECURE=false)

## 📧 Step 3: Email Features Implemented

### ✨ Features Included:
1. **Admin Notification** - Urgent alerts when someone contacts you
2. **Auto-Reply** - Professional automatic response to users
3. **HTML Templates** - Beautiful, responsive email templates
4. **Lead Scoring** - Automatic quality scoring for leads
5. **Error Handling** - Robust error handling with specific error messages

### 📊 Email Types:

#### 1. Admin Notification Email
- **Subject**: 🚨 URGENT LEAD: [Name] from [Company]
- **Features**: 
  - Urgent styling with action buttons
  - Lead quality scoring
  - Direct reply and call buttons
  - Complete contact information

#### 2. Auto-Reply Email
- **Subject**: 🤖 Thank you for contacting CallMint.tech!
- **Features**:
  - Professional welcome message
  - Company information and features
  - Call-to-action buttons
  - Contact information

## 🧪 Step 4: Testing Your Setup

### Test Email Connection
```bash
# Navigate to your project directory
cd "C:\Users\92335\Desktop\ayaz 7\ayaz\callmint-website"

# Run the development server
npm run dev
```

### Test Contact Form
1. Go to `http://localhost:3000/contact`
2. Fill out and submit the contact form
3. Check your email for:
   - Admin notification (should arrive at CONTACT_EMAIL)
   - Auto-reply (sent to the form submitter)

## 🔍 Troubleshooting

### Common Issues:

#### Authentication Errors
```
Error: Invalid login: 535 Authentication failed
```
**Solution**: 
- Verify your Gmail address and app password are correct
- Ensure 2FA is enabled on your Google account
- Make sure you're using a Gmail app password, not your regular password
- Check that "Less secure app access" is disabled (use app passwords instead)

#### Connection Errors
```
Error: Connection timeout
```
**Solution**:
- Check your internet connection
- Verify SMTP settings (host, port)
- Try port 465 with SSL instead of 587 with STARTTLS

#### SSL/TLS Errors
```
Error: SSL Error
```
**Solution**:
- For port 587, set `EMAIL_SECURE=false`
- For port 465, set `EMAIL_SECURE=true`

### Enable Debug Mode
Add this to your `.env.local` for detailed logging:
```env
NODE_ENV=development
```

## 📱 Step 5: Production Setup

### For Production Deployment:
1. **Environment Variables**: Set all email variables in your hosting platform
2. **Security**: Never commit real credentials to Git
3. **Monitoring**: Monitor email delivery rates
4. **Backup**: Have a backup email service ready

### Recommended Production Settings:
```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
NODE_ENV=production
```

## 🎯 Step 6: Advanced Features

### Email Templates Customization
- Edit `lib/email-service.ts` to customize email templates
- Modify colors, logos, and content as needed
- Test templates across different email clients

### Lead Management
- The system automatically scores leads based on:
  - Company information provided (+20 points)
  - Phone number provided (+15 points)
  - Specific plan interest (+25 points)
  - Message detail level (+10 points)

### Integration Options
- **CRM Integration**: Connect to your CRM via webhooks
- **Slack Notifications**: Add Slack alerts for urgent leads
- **SMS Alerts**: Add SMS notifications for high-value leads

## 🔄 Step 7: Maintenance

### Regular Checks:
- Monitor email deliverability
- Update app passwords periodically
- Check spam folder settings
- Review email templates for effectiveness

### Performance Monitoring:
- Track email open rates
- Monitor response times
- Analyze lead quality scores

## 💡 Tips for Success

1. **Test Regularly**: Send test emails weekly to ensure everything works
2. **Monitor Spam**: Check if emails are going to spam folders
3. **Professional Setup**: Use a professional email address for FROM field
4. **Response Time**: Set up notifications to respond within 2 hours
5. **Backup Plan**: Have alternative contact methods ready

## 📞 Support

If you encounter issues:
- Check the console logs for specific error messages
- Verify all environment variables are set correctly
- Test the connection using the verify email function
- Check Gmail's security settings and app password configuration
- Refer to Google's SMTP documentation for Gmail-specific issues

---

## 🚀 Ready to Launch!

Once you've completed these steps, your CallMint.tech website will be fully equipped to:
- ✅ Receive contact form submissions
- ✅ Send professional auto-replies
- ✅ Alert you immediately of new leads
- ✅ Score and prioritize leads automatically
- ✅ Provide beautiful, responsive email templates

Your business will never miss another lead! 🎉
