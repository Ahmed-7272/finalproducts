# 🚀 CallMint.tech Email System - Quick Start

## ✅ What I've Set Up For You

Your CallMint.tech project now has a **complete professional email system** ready to receive real emails to your Titan account!

### 📧 Email Features Implemented:

1. **🔥 Admin Notifications** - Get urgent alerts when someone contacts you
2. **🤖 Auto-Reply System** - Professional automatic responses to users  
3. **🎨 Beautiful Email Templates** - Responsive HTML emails with your branding
4. **📊 Lead Scoring** - Automatic quality assessment of leads
5. **⚡ Error Handling** - Robust error management with detailed logging

### 🎯 Email Types:

#### Admin Notification Email
- **Subject**: 🚨 URGENT LEAD: [Name] from [Company]
- **Features**: Action buttons, lead scoring, contact info, urgent styling

#### Auto-Reply Email  
- **Subject**: 🤖 Thank you for contacting CallMint.tech!
- **Features**: Welcome message, company info, CTA buttons, contact details

---

## 🔑 NEXT STEPS (Required)

### 1. Update Your Email Credentials
Edit your `.env.local` file and replace these with your **real** Titan email credentials:

```env
# Replace these with your actual Titan email info:
EMAIL_HOST=smtp.titan.email
EMAIL_PORT=587
EMAIL_USER=your-actual-email@yourdomain.com
EMAIL_PASSWORD=your-app-password-here
EMAIL_FROM=your-actual-email@yourdomain.com
EMAIL_SECURE=false

# Where you want to receive contact form emails:
CONTACT_EMAIL=info@callmint.tech
```

### 2. Generate App Password in Titan
1. Log into your Titan email account
2. Go to **Account Settings** → **Security**  
3. Enable **2-Factor Authentication** (required)
4. Generate an **App Password** for SMTP access
5. Use this app password in the `EMAIL_PASSWORD` field

### 3. Test Your Setup
Run this command to test your email system:
```bash
npm run test-email
```

This will:
- ✅ Test your email connection
- ✅ Send a test admin notification  
- ✅ Send a test auto-reply
- ✅ Show you detailed results

---

## 📱 How to Use

### For Users (Website Visitors):
1. Visit `/contact` page
2. Fill out contact form
3. Submit form
4. **Automatically receive** professional welcome email

### For You (Admin):
1. Get **instant notification** when someone contacts you
2. Email includes lead quality score and action buttons
3. Reply directly or call using the provided buttons
4. Never miss a lead again!

---

## 📂 Files I've Updated:

- ✅ `lib/email-service.ts` - Complete email system with Titan integration
- ✅ `app/api/contact/route.ts` - Updated to send both admin & auto-reply emails  
- ✅ `lib/verify-email.ts` - Email connection verification
- ✅ `.env.local` - Added email configuration variables
- ✅ `lib/test-email.ts` - Email testing utility
- ✅ `EMAIL_SETUP.md` - Detailed setup guide
- ✅ `package.json` - Added test-email script

---

## 🧪 Testing Commands

```bash
# Test your email system
npm run test-email

# Run development server  
npm run dev

# Check contact form at:
http://localhost:3000/contact
```

---

## 🔍 Troubleshooting

### Common Issues:

**Authentication Error?**
- Make sure you're using an **app password**, not your regular password
- Ensure 2FA is enabled on your Titan account

**Connection Timeout?**
- Check your internet connection
- Verify SMTP settings in `.env.local`

**SSL/TLS Error?**
- For port 587: set `EMAIL_SECURE=false`
- For port 465: set `EMAIL_SECURE=true`

---

## 💡 Pro Tips

1. **Test Weekly** - Run `npm run test-email` to ensure everything works
2. **Monitor Spam** - Check if emails go to spam folders  
3. **Response Time** - Set up notifications to respond within 2 hours
4. **Backup Plan** - Keep alternative contact methods ready

---

## 🎉 You're Ready!

Once you've added your real Titan credentials and run the test, your CallMint.tech website will be fully equipped to:

- ✅ **Receive contact form submissions**
- ✅ **Send professional auto-replies** 
- ✅ **Alert you immediately** of new leads
- ✅ **Score and prioritize** leads automatically
- ✅ **Never miss another lead!**

### 📞 Need Help?

If you encounter any issues:
1. Check the console logs for error messages
2. Review `EMAIL_SETUP.md` for detailed instructions
3. Run `npm run test-email` to diagnose problems
4. Verify all environment variables are set correctly

**Your business transformation starts now! 🚀**
