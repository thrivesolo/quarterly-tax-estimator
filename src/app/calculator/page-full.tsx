'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { BusinessStructure } from '@prisma/client'
import { getCurrentQuarter } from '@/lib/taxCalculator'

interface CalculationResult {
  recommendedPayment: number
  calculationMethod: 'safe_harbor' | 'current_year'
  breakdown: {
    incomeTax: number
    selfEmploymentTax: number
    total: number
  }
  safeHarborAmount: number
  currentYearAmount: number
  nextDueDate: string
}

export default function Calculator() {
  const { status } = useSession()
  const router = useRouter()
  
  const [formData, setFormData] = useState({
    businessStructure: BusinessStructure.SOLE_PROPRIETORSHIP,
    currentYearIncome: '',
    businessExpenses: '',
    priorYearTaxOwed: '',
    selfEmploymentTax: true,
    quarter: 1, // Will be set by useEffect
    year: 2024 // Will be set by useEffect
  })

  // Set quarter and year after component mounts to avoid SSR issues
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      quarter: getCurrentQuarter(),
      year: new Date().getFullYear()
    }))
  }, [])
  
  const [result, setResult] = useState<CalculationResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Redirect to login if not authenticated
  if (status === 'loading') {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }
  
  if (status === 'unauthenticated') {
    router.push('/auth/signin')
    return null
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/calculate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Calculation failed')
      }

      const calculationResult = await response.json()
      setResult(calculationResult)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Quarterly Tax Calculator
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Business Structure */}
              <div>
                <label htmlFor="businessStructure" className="block text-sm font-medium text-gray-700 mb-2">
                  Business Structure
                </label>
                <select
                  id="businessStructure"
                  name="businessStructure"
                  value={formData.businessStructure}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value={BusinessStructure.SOLE_PROPRIETORSHIP}>Sole Proprietorship</option>
                  <option value={BusinessStructure.PARTNERSHIP}>Partnership</option>
                  <option value={BusinessStructure.LLC_SOLE_PROP}>LLC (taxed as Sole Prop)</option>
                  <option value={BusinessStructure.LLC_S_CORP}>LLC (taxed as S-Corp)</option>
                  <option value={BusinessStructure.S_CORP}>S-Corporation</option>
                </select>
              </div>

              {/* Quarter */}
              <div>
                <label htmlFor="quarter" className="block text-sm font-medium text-gray-700 mb-2">
                  Quarter
                </label>
                <select
                  id="quarter"
                  name="quarter"
                  value={formData.quarter}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value={1}>Q1 (Jan-Mar)</option>
                  <option value={2}>Q2 (Apr-Jun)</option>
                  <option value={3}>Q3 (Jul-Sep)</option>
                  <option value={4}>Q4 (Oct-Dec)</option>
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Current Year Income */}
              <div>
                <label htmlFor="currentYearIncome" className="block text-sm font-medium text-gray-700 mb-2">
                  Projected Annual Income ($)
                </label>
                <input
                  type="number"
                  id="currentYearIncome"
                  name="currentYearIncome"
                  value={formData.currentYearIncome}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="100000"
                  required
                  min="0"
                  step="1"
                />
              </div>

              {/* Business Expenses */}
              <div>
                <label htmlFor="businessExpenses" className="block text-sm font-medium text-gray-700 mb-2">
                  Business Expenses ($)
                </label>
                <input
                  type="number"
                  id="businessExpenses"
                  name="businessExpenses"
                  value={formData.businessExpenses}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="20000"
                  required
                  min="0"
                  step="1"
                />
              </div>
            </div>

            {/* Prior Year Tax Owed */}
            <div>
              <label htmlFor="priorYearTaxOwed" className="block text-sm font-medium text-gray-700 mb-2">
                Prior Year Total Tax Owed ($)
              </label>
              <input
                type="number"
                id="priorYearTaxOwed"
                name="priorYearTaxOwed"
                value={formData.priorYearTaxOwed}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="15000"
                required
                min="0"
                step="1"
              />
              <p className="text-xs text-gray-500 mt-1">
                From your prior year tax return (total tax liability)
              </p>
            </div>

            {/* Self Employment Tax */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="selfEmploymentTax"
                name="selfEmploymentTax"
                checked={formData.selfEmploymentTax}
                onChange={handleInputChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="selfEmploymentTax" className="ml-2 block text-sm text-gray-900">
                Subject to self-employment tax
              </label>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {loading ? 'Calculating...' : 'Calculate Payment'}
            </button>
          </form>

          {result && (
            <div className="mt-8 p-6 bg-blue-50 rounded-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Your Quarterly Payment
              </h2>
              
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  ${result.recommendedPayment.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">
                  Recommended payment for Q{formData.quarter} {formData.year}
                </div>
                <div className="text-sm text-gray-600">
                  Due: {new Date(result.nextDueDate).toLocaleDateString()}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="bg-white p-4 rounded">
                  <h3 className="font-semibold mb-2">Safe Harbor Method</h3>
                  <div className="text-lg">${result.safeHarborAmount.toLocaleString()}</div>
                </div>
                <div className="bg-white p-4 rounded">
                  <h3 className="font-semibold mb-2">Current Year Method</h3>
                  <div className="text-lg">${result.currentYearAmount.toLocaleString()}</div>
                </div>
              </div>

              <div className="text-sm text-gray-600 mb-4">
                Using: <span className="font-semibold">
                  {result.calculationMethod === 'safe_harbor' ? 'Safe Harbor Method' : 'Current Year Method'}
                </span>
              </div>

              <div className="text-center">
                <a
                  href="https://www.irs.gov/payments/direct-pay"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors inline-block"
                >
                  Pay with IRS Direct Pay →
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}