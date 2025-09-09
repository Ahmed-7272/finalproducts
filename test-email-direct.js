// Direct Node.js email test
require('dotenv').config({ path: '.env.local' });
const nodemailer = require('nodemailer');

console.log('🤖 CallMint.tech Email System Test\n');
console.log('═'.repeat(50));

// Check environment variables
console.log('🔍 Checking environment variables...');
console.log(`EMAIL_HOST: ${process.env.EMAIL_HOST}`);
console.log(`EMAIL_PORT: ${process.env.EMAIL_PORT}`);
console.log(`EMAIL_USER: ${process.env.EMAIL_USER}`);
console.log(`EMAIL_PASSWORD: ${process.env.EMAIL_PASSWORD ? '***set***' : 'NOT SET'}`);
console.log(`EMAIL_FROM: ${process.env.EMAIL_FROM}`);
console.log(`CONTACT_EMAIL: ${process.env.CONTACT_EMAIL}`);
console.log('');

// Create transporter
console.log('📧 Creating email transporter...');
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT),
  secure: process.env.EMAIL_SECURE === 'true', // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Test connection
async function testConnection() {
  try {
    console.log('🔗 Testing connection to Gmail SMTP...');
    const verification = await transporter.verify();
    console.log('✅ Connection successful!', verification);
    
    // Send test email
    console.log('\n📨 Sending test email...');
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.CONTACT_EMAIL,
      subject: '🧪 Test Email from CallMint.tech System',
      html: `
        <h2>🎉 Email System Test Successful!</h2>
        <p>Your CallMint.tech email system is working perfectly!</p>
        <p><strong>Test Details:</strong></p>
        <ul>
          <li>From: ${process.env.EMAIL_FROM}</li>
          <li>To: ${process.env.CONTACT_EMAIL}</li>
          <li>Time: ${new Date().toLocaleString()}</li>
          <li>SMTP Host: ${process.env.EMAIL_HOST}</li>
        </ul>
        <p>✅ Your contact form is ready to receive real inquiries!</p>
      `
    });
    
    console.log('✅ Test email sent successfully!');
    console.log(`📨 Message ID: ${info.messageId}`);
    console.log('\n🎉 Email system is working perfectly!');
    console.log('📧 Check your email inbox for the test message.');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    
    if (error.code === 'EAUTH') {
      console.log('\n🔑 Authentication failed. This could mean:');
      console.log('- Your Gmail app password is incorrect');
      console.log('- You need to use the Gmail "App Password" instead of your regular password');
      console.log('- 2FA must be enabled on your Gmail account to use app passwords');
    } else if (error.code === 'ECONNECTION') {
      console.log('\n🌐 Connection failed. Check:');
      console.log('- Your internet connection');
      console.log('- SMTP settings (host, port)');
    }
  }
}

testConnection();
