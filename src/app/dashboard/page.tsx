'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface TaxCalculation {
  id: string
  quarter: number
  year: number
  recommendedPayment: number
  calculationMethod: string
  createdAt: string
}

export default function Dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [calculations, setCalculations] = useState<TaxCalculation[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    } else if (status === 'authenticated') {
      fetchCalculations()
    }
  }, [status, router])

  const fetchCalculations = async () => {
    try {
      const response = await fetch('/api/calculations')
      if (response.ok) {
        const data = await response.json()
        setCalculations(data)
      }
    } catch (error) {
      console.error('Failed to fetch calculations:', error)
    } finally {
      setLoading(false)
    }
  }

  if (status === 'loading' || loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  if (status === 'unauthenticated') {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <div className="flex gap-4">
            <Link
              href="/calculator"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              New Calculation
            </Link>
            <button
              onClick={() => router.push('/api/auth/signout')}
              className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Welcome, {session?.user?.name || session?.user?.email}</h2>
          <p className="text-gray-600">
            Track your quarterly tax calculations and stay on top of your payment schedule.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold">Your Calculations</h2>
          </div>
          
          {calculations.length === 0 ? (
            <div className="p-8 text-center">
              <div className="text-gray-500 mb-4">No calculations yet</div>
              <Link
                href="/calculator"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Create Your First Calculation
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Period
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Recommended Payment
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Method
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {calculations.map((calc) => (
                    <tr key={calc.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        Q{calc.quarter} {calc.year}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${calc.recommendedPayment.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {calc.calculationMethod === 'safe_harbor' ? 'Safe Harbor' : 'Current Year'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(calc.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                        <a
                          href="https://www.irs.gov/payments/direct-pay"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-blue-900"
                        >
                          Pay Now
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Upcoming Due Dates</h2>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded">
              <div className="font-semibold">Q1 2024</div>
              <div className="text-sm text-gray-600">April 15, 2024</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded">
              <div className="font-semibold">Q2 2024</div>
              <div className="text-sm text-gray-600">June 17, 2024</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded">
              <div className="font-semibold">Q3 2024</div>
              <div className="text-sm text-gray-600">September 16, 2024</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded">
              <div className="font-semibold">Q4 2024</div>
              <div className="text-sm text-gray-600">January 15, 2025</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}