// Email Testing Utility for Development
// Run this file to test your email configuration

import { sendContactFormEmail, sendAutoReply, sendAdminNotification } from './email-service';
import { verifyEmailConnection } from './verify-email';

// Test data for email testing
const testContactData = {
  name: 'John Smith',
  email: 'john.smith@example.com',
  phone: '+1 (555) 123-4567',
  company: 'Tech Solutions Inc.',
  plan: 'Business',
  message: `Hi CallMint team!

I'm interested in implementing AI call automation for our growing business. We currently handle about 200+ calls per day and are looking to:

1. Automate our inbound customer service
2. Improve our outbound sales efforts  
3. Provide 24/7 support for our clients

The Business plan looks perfect for our needs. Could we schedule a demo to see how your AI agents work?

Looking forward to hearing from you soon!

Best regards,
John Smith
CEO, Tech Solutions Inc.`
};

async function testEmailSystem() {
  console.log('🧪 Starting Email System Tests...\n');

  try {
    // Test 1: Verify Email Connection
    console.log('1️⃣ Testing email connection...');
    const connectionTest = await verifyEmailConnection();
    console.log(`   ✅ Connection test: ${connectionTest ? 'PASSED' : 'FAILED'}\n`);

    if (!connectionTest) {
      console.log('❌ Email connection failed. Please check your configuration.');
      console.log('📝 Make sure you have set up your environment variables in .env.local');
      return;
    }

    // Test 2: Send Admin Notification
    console.log('2️⃣ Testing admin notification email...');
    const adminResult = await sendAdminNotification(testContactData);
    console.log(`   📧 Admin notification: ${adminResult.success ? 'SENT' : 'FAILED'}`);
    if (adminResult.success) {
      console.log(`   📨 Message ID: ${adminResult.messageId}`);
    } else {
      console.log(`   ❌ Error: ${adminResult.error?.message || 'Unknown error'}`);
    }
    console.log('');

    // Test 3: Send Auto-Reply
    console.log('3️⃣ Testing auto-reply email...');
    const autoReplyResult = await sendAutoReply(testContactData.email, testContactData.name);
    console.log(`   📧 Auto-reply: ${autoReplyResult.success ? 'SENT' : 'FAILED'}`);
    if (autoReplyResult.success) {
      console.log(`   📨 Message ID: ${autoReplyResult.messageId}`);
    } else {
      console.log(`   ❌ Error: ${autoReplyResult.error?.message || 'Unknown error'}`);
    }
    console.log('');

    // Summary
    const allPassed = connectionTest && adminResult.success && autoReplyResult.success;
    console.log('📊 Test Summary:');
    console.log(`   Connection Test: ${connectionTest ? '✅' : '❌'}`);
    console.log(`   Admin Email: ${adminResult.success ? '✅' : '❌'}`);
    console.log(`   Auto-Reply Email: ${autoReplyResult.success ? '✅' : '❌'}`);
    console.log(`   Overall Status: ${allPassed ? '🎉 ALL TESTS PASSED!' : '⚠️ Some tests failed'}\n`);

    if (allPassed) {
      console.log('🎉 Congratulations! Your email system is working perfectly!');
      console.log('📧 Check your email inbox for the test messages.');
      console.log('🚀 Your CallMint.tech contact form is ready to receive real inquiries!');
    } else {
      console.log('🔧 Please review the failed tests and check your configuration.');
      console.log('📖 Refer to EMAIL_SETUP.md for troubleshooting tips.');
    }

  } catch (error) {
    console.error('💥 Unexpected error during testing:', error);
  }
}

// Configuration check
function checkConfiguration() {
  console.log('🔍 Checking email configuration...\n');

  const requiredVars = [
    'EMAIL_HOST',
    'EMAIL_PORT', 
    'EMAIL_USER',
    'EMAIL_PASSWORD',
    'EMAIL_FROM',
    'CONTACT_EMAIL'
  ];

  const missingVars = requiredVars.filter(varName => !process.env[varName]);

  if (missingVars.length > 0) {
    console.log('❌ Missing environment variables:');
    missingVars.forEach(varName => {
      console.log(`   - ${varName}`);
    });
    console.log('\n📝 Please set these variables in your .env.local file');
    console.log('📖 Refer to EMAIL_SETUP.md for detailed instructions');
    return false;
  }

  console.log('✅ All required environment variables are set:');
  requiredVars.forEach(varName => {
    const value = process.env[varName];
    const displayValue = varName.includes('PASSWORD') ? '***hidden***' : value;
    console.log(`   ✅ ${varName}: ${displayValue}`);
  });
  console.log('');

  return true;
}

// Main execution
async function main() {
  console.log('🤖 CallMint.tech Email System Tester\n');
  console.log('═'.repeat(50));

  // Check configuration first
  const configOk = checkConfiguration();
  
  if (!configOk) {
    console.log('\n⚠️ Configuration issues found. Please fix them before testing.');
    return;
  }

  // Run tests
  await testEmailSystem();

  console.log('\n═'.repeat(50));
  console.log('Testing complete! 🏁');
}

// Export for use in other files
export { testEmailSystem, checkConfiguration };

// Run if this file is executed directly
if (require.main === module) {
  main().catch(console.error);
}
