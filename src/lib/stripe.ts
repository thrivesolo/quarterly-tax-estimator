import Stripe from 'stripe'

const createStripeInstance = () => {
  if (!process.env.STRIPE_SECRET_KEY) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('STRIPE_SECRET_KEY is not set in production')
    }
    return null
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2025-06-30.basil',
  })
}

export const stripe = createStripeInstance()

export const formatAmountForStripe = (amount: number): number => {
  return Math.round(amount * 100)
}

export const formatAmountFromStripe = (amount: number): number => {
  return amount / 100
}