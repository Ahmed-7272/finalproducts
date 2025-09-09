import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
})

export async function POST(request: NextRequest) {
  try {
    // Check if Stripe secret key is configured
    if (!process.env.STRIPE_SECRET_KEY) {
      console.error('Stripe secret key is not configured')
      return NextResponse.json({ error: 'Stripe configuration error: Secret key missing' }, { status: 500 })
    }

    const body = await request.json()
    const { planName, amount, planType } = body

    console.log('Received checkout request:', { planName, amount, planType })

    // Validate required fields
    if (!planName || !amount || !planType) {
      console.error('Missing required fields:', { planName, amount, planType })
      return NextResponse.json({ error: 'Missing required fields: planName, amount, or planType' }, { status: 400 })
    }

    // Validate amount
    if (typeof amount !== 'number' || amount <= 0) {
      console.error('Invalid amount:', amount)
      return NextResponse.json({ error: 'Invalid amount: must be a positive number' }, { status: 400 })
    }

    // Check if amount is reasonable (between $1 and $10,000)
    if (amount < 1 || amount > 10000) {
      console.error('Amount out of range:', amount)
      return NextResponse.json({ error: 'Amount must be between $1 and $10,000' }, { status: 400 })
    }

    console.log('Creating Stripe checkout session...')

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `CallMint.tech ${planName} Plan - ${planType}`,
              description: `AI-powered call automation - ${planName} plan`,
            },
            unit_amount: Math.round(amount * 100), // Ensure it's an integer
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${request.nextUrl.origin}/payment-success?plan=${encodeURIComponent(planName)}`,
      cancel_url: `${request.nextUrl.origin}/pricing`,
    })

    console.log('Stripe session created successfully:', session.id)
    return NextResponse.json({ sessionId: session.id })
  } catch (error) {
    console.error('Stripe checkout error:', {
      error,
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      stripeKeyConfigured: !!process.env.STRIPE_SECRET_KEY
    })
    
    // Provide more specific error messages
    let errorMessage = 'Payment processing failed'
    
    if (error instanceof Error) {
      if (error.message.includes('Invalid API Key')) {
        errorMessage = 'Stripe API key configuration error'
      } else if (error.message.includes('testmode')) {
        errorMessage = 'Stripe test mode configuration issue'
      } else if (error.message.includes('amount')) {
        errorMessage = 'Invalid payment amount'
      } else {
        errorMessage = `Stripe error: ${error.message}`
      }
    }
    
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}
