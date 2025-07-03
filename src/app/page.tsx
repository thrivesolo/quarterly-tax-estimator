import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Quarterly Tax Estimator
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Calculate your quarterly estimated tax payments with confidence. 
            Know exactly how much to pay each quarter to avoid surprises in April.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link
              href="/auth/signup"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Get Started Free
            </Link>
            <Link
              href="/auth/signin"
              className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Sign In
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-3xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold mb-2">Accurate Calculations</h3>
              <p className="text-gray-600">
                Uses both safe harbor and current year methods to recommend the optimal payment amount.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-3xl mb-4">⏰</div>
              <h3 className="text-xl font-semibold mb-2">Payment Reminders</h3>
              <p className="text-gray-600">
                Never miss a deadline with automated email reminders for quarterly payments.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-3xl mb-4">🔗</div>
              <h3 className="text-xl font-semibold mb-2">Direct IRS Payment</h3>
              <p className="text-gray-600">
                Direct link to IRS Direct Pay for seamless payment processing.
              </p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Who This Is For</h2>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div>
                <h3 className="font-semibold mb-2">Business Types:</h3>
                <ul className="text-gray-600 space-y-1">
                  <li>• Freelancers & Consultants</li>
                  <li>• Sole Proprietorships</li>
                  <li>• LLCs (taxed as sole prop or S-Corp)</li>
                  <li>• S-Corporations</li>
                  <li>• Partnerships</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Perfect For:</h3>
                <ul className="text-gray-600 space-y-1">
                  <li>• Online service businesses</li>
                  <li>• Marketing agencies</li>
                  <li>• Design studios</li>
                  <li>• Gig economy workers</li>
                  <li>• Independent contractors</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <footer className="bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 text-center text-gray-600">
          <p className="text-sm mb-4">
            This is not tax advice. Consult a licensed tax professional for guidance on your specific situation.
          </p>
          <div className="flex justify-center space-x-6 text-sm">
            <Link href="/privacy" className="hover:text-blue-600">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-blue-600">Terms of Service</Link>
            <Link href="/disclaimer" className="hover:text-blue-600">Disclaimer</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
