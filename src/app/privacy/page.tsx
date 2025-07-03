export default function Privacy() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Privacy Policy
          </h1>
          
          <div className="prose max-w-none">
            <p className="text-sm text-gray-600 mb-6">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <h2 className="text-xl font-semibold mb-4">Introduction</h2>
            <p className="mb-4">
              This Privacy Policy describes how Quarterly Tax Estimator ("we," "our," or "us") collects, uses, and protects your personal information when you use our service.
            </p>

            <h2 className="text-xl font-semibold mb-4">Information We Collect</h2>
            
            <h3 className="text-lg font-semibold mb-2">Personal Information</h3>
            <p className="mb-4">
              When you create an account, we collect:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Name</li>
              <li>Email address</li>
              <li>Encrypted password</li>
            </ul>

            <h3 className="text-lg font-semibold mb-2">Financial Information</h3>
            <p className="mb-4">
              When you use our tax calculator, we collect:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Business structure information</li>
              <li>Income and expense data</li>
              <li>Prior year tax information</li>
              <li>Tax calculation results</li>
            </ul>

            <h3 className="text-lg font-semibold mb-2">Payment Information</h3>
            <p className="mb-4">
              Payment processing is handled by Stripe. We do not store your credit card information. Stripe may share limited transaction data with us for order fulfillment.
            </p>

            <h3 className="text-lg font-semibold mb-2">Usage Information</h3>
            <p className="mb-4">
              We may collect information about how you use our service, including access times and frequency of use.
            </p>

            <h2 className="text-xl font-semibold mb-4">How We Use Your Information</h2>
            <p className="mb-4">
              We use your information to:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Provide and maintain our service</li>
              <li>Process your payments</li>
              <li>Send you tax payment reminders (if requested)</li>
              <li>Improve our service</li>
              <li>Communicate with you about your account</li>
              <li>Comply with legal obligations</li>
            </ul>

            <h2 className="text-xl font-semibold mb-4">Data Security</h2>
            <p className="mb-4">
              We implement appropriate security measures to protect your personal information:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>All data is encrypted in transit using HTTPS</li>
              <li>Passwords are hashed and salted</li>
              <li>Database access is restricted and monitored</li>
              <li>Regular security updates and patches</li>
            </ul>

            <h2 className="text-xl font-semibold mb-4">Data Sharing</h2>
            <p className="mb-4">
              We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>With Stripe for payment processing</li>
              <li>When required by law or legal process</li>
              <li>To protect our rights or the safety of others</li>
              <li>In connection with a business transfer or acquisition</li>
            </ul>

            <h2 className="text-xl font-semibold mb-4">Data Retention</h2>
            <p className="mb-4">
              We retain your personal information for as long as your account is active or as needed to provide you services. You may request deletion of your account and associated data at any time.
            </p>

            <h2 className="text-xl font-semibold mb-4">Your Rights</h2>
            <p className="mb-4">
              You have the right to:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Delete your account and data</li>
              <li>Export your data</li>
              <li>Opt out of email communications</li>
            </ul>

            <h2 className="text-xl font-semibold mb-4">Cookies and Tracking</h2>
            <p className="mb-4">
              We use essential cookies for authentication and service functionality. We do not use tracking cookies or third-party analytics that identify individual users.
            </p>

            <h2 className="text-xl font-semibold mb-4">Third-Party Services</h2>
            
            <h3 className="text-lg font-semibold mb-2">Stripe</h3>
            <p className="mb-4">
              Payment processing is handled by Stripe, Inc. Their privacy policy can be found at stripe.com/privacy.
            </p>

            <h2 className="text-xl font-semibold mb-4">Children's Privacy</h2>
            <p className="mb-4">
              Our service is not intended for children under 18. We do not knowingly collect personal information from children under 18.
            </p>

            <h2 className="text-xl font-semibold mb-4">Changes to This Policy</h2>
            <p className="mb-4">
              We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date.
            </p>

            <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
            <p className="mb-4">
              If you have any questions about this Privacy Policy or wish to exercise your rights regarding your personal information, please contact us.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mt-8">
              <p className="font-semibold text-blue-800 mb-2">
                Data Protection Commitment
              </p>
              <p className="text-blue-700">
                We are committed to protecting your financial and personal information with the highest standards of security and privacy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}