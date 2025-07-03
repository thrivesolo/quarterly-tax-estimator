import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { stripe, formatAmountForStripe } from '@/lib/stripe'

const PRODUCT_PRICE = 29.99 // One-time purchase price

export async function POST(request: NextRequest) {
  try {
    if (!stripe) {
      return NextResponse.json(
        { message: 'Payment system not configured' },
        { status: 503 }
      )
    }

    const session = await getServerSession(authOptions)
    
    if (!session?.user || !(session.user as any).id || !session?.user?.email) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Check if user has already paid
    const user = await prisma.user.findUnique({
      where: { id: (session.user as any).id },
      select: { hasPaid: true }
    })

    if (user?.hasPaid) {
      return NextResponse.json(
        { message: 'User has already purchased access' },
        { status: 400 }
      )
    }

    const checkoutSession = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Quarterly Tax Estimator - Lifetime Access',
              description: 'Calculate your quarterly estimated tax payments with confidence',
            },
            unit_amount: formatAmountForStripe(PRODUCT_PRICE),
          },
          quantity: 1,
        },
      ],
      customer_email: session.user.email,
      metadata: {
        userId: (session.user as any).id,
      },
      success_url: `${request.headers.get('origin')}/dashboard?payment=success`,
      cancel_url: `${request.headers.get('origin')}/pricing?payment=cancelled`,
    })

    return NextResponse.json({ url: checkoutSession.url })

  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}