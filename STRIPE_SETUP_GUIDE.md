# Stripe Payment Setup Guide

## Current Issue
The payment system is failing because you're using live Stripe keys in development mode. This guide will help you set up Stripe properly.

## Quick Fix Steps

### 1. Get Your Stripe Test Keys
1. Go to [Stripe Dashboard](https://dashboard.stripe.com/)
2. Make sure you're in **Test mode** (toggle in the top left)
3. Go to **Developers** → **API keys**
4. Copy your **Publishable key** (starts with `pk_test_`)
5. Copy your **Secret key** (starts with `sk_test_`)

### 2. Update Environment Variables
Replace the placeholder keys in your `.env.local` file:

```env
# Replace these with your actual test keys
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_ACTUAL_TEST_KEY_HERE
STRIPE_SECRET_KEY=sk_test_YOUR_ACTUAL_TEST_SECRET_KEY_HERE
```

### 3. Restart Your Development Server
```bash
npm run dev
```

## Testing the Fix

### Option 1: Use the Test Script
```bash
node test-stripe-api.js
```

### Option 2: Test in Browser
1. Go to your pricing page
2. Click "Pay with Stripe" on any plan
3. Check the browser console for detailed error messages
4. Use Stripe test card numbers:
   - **Success**: `4242 4242 4242 4242`
   - **Decline**: `4000 0000 0000 0002`
   - Use any future date for expiry and any 3-digit CVC

## Common Error Messages and Solutions

### "Stripe publishable key is not configured"
- **Cause**: Missing or invalid `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- **Solution**: Add your test publishable key to `.env.local`

### "Stripe API key configuration error"
- **Cause**: Missing or invalid `STRIPE_SECRET_KEY`
- **Solution**: Add your test secret key to `.env.local`

### "Invalid API Key provided"
- **Cause**: Using live keys in test mode or vice versa
- **Solution**: Ensure you're using test keys (`pk_test_` and `sk_test_`)

### "No such customer" or "No such payment_method"
- **Cause**: Mixing test and live data
- **Solution**: Use test keys and test card numbers

## Enhanced Error Handling

The payment system now includes:
- ✅ Detailed error logging in browser console
- ✅ Validation of required fields
- ✅ Amount validation (must be between $1-$10,000)
- ✅ Better error messages for users
- ✅ Configuration checks for Stripe keys

## Production Deployment

When ready for production:
1. Get your live Stripe keys from the dashboard (in live mode)
2. Update your production environment variables:
   ```env
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_YOUR_LIVE_KEY
   STRIPE_SECRET_KEY=sk_live_YOUR_LIVE_SECRET_KEY
   ```
3. Test thoroughly with small amounts first

## Troubleshooting Checklist

- [ ] Stripe keys are configured in `.env.local`
- [ ] Using test keys (`pk_test_` and `sk_test_`) for development
- [ ] Development server restarted after updating environment variables
- [ ] Browser console shows detailed error messages
- [ ] Network tab shows API requests to `/api/stripe-checkout`
- [ ] Test with valid Stripe test card numbers

## Need Help?

If you're still experiencing issues:
1. Check the browser console for detailed error messages
2. Check the terminal/server logs for API errors
3. Run the test script: `node test-stripe-api.js`
4. Verify your Stripe dashboard is in test mode

## Files Modified

- `components/stripe-button.tsx` - Enhanced error handling and validation
- `app/api/stripe-checkout/route.ts` - Improved API error handling
- `.env.local` - Updated with proper key structure
- `test-stripe-api.js` - Test script for API validation