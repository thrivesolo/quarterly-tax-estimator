'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Pricing() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handlePurchase = async () => {
    if (status !== 'authenticated') {
      router.push('/auth/signin')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        const { url } = await response.json()
        window.location.href = url
      } else {
        const error = await response.json()
        alert(error.message || 'Something went wrong')
      }
    } catch (error) {
      console.error('Purchase error:', error)
      alert('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-600">
            One-time payment for lifetime access to the Quarterly Tax Estimator
          </p>
        </div>

        <div className="max-w-lg mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Lifetime Access
              </h2>
              <div className="text-5xl font-bold text-blue-600 mb-2">
                $29.99
              </div>
              <div className="text-gray-500">One-time payment</div>
            </div>

            <div className="text-left mb-8">
              <h3 className="font-semibold text-lg mb-4">What's included:</h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  Unlimited quarterly tax calculations
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  Support for all business structures
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  Safe harbor and current year methods
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  Payment reminders and due dates
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  Direct IRS payment integration
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  Calculation history and dashboard
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  Lifetime updates and support
                </li>
              </ul>
            </div>

            {status === 'authenticated' ? (
              (session?.user as any)?.hasPaid ? (
                <div className="text-center">
                  <div className="text-green-600 font-semibold mb-4">
                    ✓ You already have access!
                  </div>
                  <Link
                    href="/calculator"
                    className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Go to Calculator
                  </Link>
                </div>
              ) : (
                <button
                  onClick={handlePurchase}
                  disabled={loading}
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {loading ? 'Processing...' : 'Get Lifetime Access'}
                </button>
              )
            ) : (
              <div className="space-y-4">
                <div className="text-sm text-gray-600">
                  Sign in or create an account to purchase
                </div>
                <div className="flex gap-4">
                  <Link
                    href="/auth/signin"
                    className="flex-1 border border-blue-600 text-blue-600 py-3 px-6 rounded-lg font-semibold hover:bg-blue-50 transition-colors text-center"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/auth/signup"
                    className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-center"
                  >
                    Sign Up
                  </Link>
                </div>
              </div>
            )}

            <div className="mt-8 text-sm text-gray-500">
              <p>30-day money-back guarantee</p>
              <p className="mt-2">Secure payment processing by Stripe</p>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Frequently Asked Questions
          </h2>
          
          <div className="max-w-2xl mx-auto text-left space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-semibold mb-2">Is this really a one-time payment?</h3>
              <p className="text-gray-600">
                Yes! Pay once and use the calculator for as long as you need it. No monthly or annual fees.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-semibold mb-2">What business structures are supported?</h3>
              <p className="text-gray-600">
                Sole proprietorships, partnerships, LLCs (taxed as sole prop or S-Corp), and S-Corporations.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-semibold mb-2">How accurate are the calculations?</h3>
              <p className="text-gray-600">
                Our calculator uses current federal tax brackets and rates, implementing both safe harbor and current year estimation methods as recommended by the IRS.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-semibold mb-2">Do you offer refunds?</h3>
              <p className="text-gray-600">
                Yes, we offer a 30-day money-back guarantee. If you're not satisfied, contact us for a full refund.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}