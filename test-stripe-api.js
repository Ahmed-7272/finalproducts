// Test script for Stripe API endpoint
// Run with: node test-stripe-api.js

const fetch = require('node-fetch');

async function testStripeAPI() {
  const testData = {
    planName: 'Basic',
    amount: 29.99,
    planType: 'Monthly',
    billingPeriod: 'monthly'
  };

  console.log('Testing Stripe API endpoint...');
  console.log('Test data:', testData);

  try {
    const response = await fetch('http://localhost:3001/api/stripe-checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData)
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers));

    const responseText = await response.text();
    console.log('Raw response:', responseText);

    try {
      const responseData = JSON.parse(responseText);
      console.log('Parsed response:', responseData);

      if (responseData.sessionId) {
        console.log('✅ Success! Session ID received:', responseData.sessionId);
      } else if (responseData.error) {
        console.log('❌ Error from API:', responseData.error);
      } else {
        console.log('⚠️ Unexpected response format');
      }
    } catch (parseError) {
      console.log('❌ Failed to parse JSON response:', parseError.message);
    }

  } catch (error) {
    console.log('❌ Network error:', error.message);
  }
}

// Test with invalid data
async function testInvalidData() {
  console.log('\n--- Testing with invalid data ---');
  
  const invalidTests = [
    { name: 'Missing planName', data: { amount: 29.99, planType: 'Monthly' } },
    { name: 'Invalid amount', data: { planName: 'Basic', amount: -10, planType: 'Monthly' } },
    { name: 'Missing planType', data: { planName: 'Basic', amount: 29.99 } },
    { name: 'Amount too high', data: { planName: 'Basic', amount: 15000, planType: 'Monthly' } }
  ];

  for (const test of invalidTests) {
    console.log(`\nTesting: ${test.name}`);
    try {
      const response = await fetch('http://localhost:3001/api/stripe-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(test.data)
      });

      const responseData = await response.json();
      console.log(`Status: ${response.status}, Error: ${responseData.error || 'No error'}`);
    } catch (error) {
      console.log(`Network error: ${error.message}`);
    }
  }
}

// Run tests
async function runAllTests() {
  console.log('🧪 Starting Stripe API tests...\n');
  
  await testStripeAPI();
  await testInvalidData();
  
  console.log('\n✅ Tests completed!');
}

runAllTests().catch(console.error);