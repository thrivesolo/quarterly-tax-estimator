export default function Terms() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Terms of Service
          </h1>
          
          <div className="prose max-w-none">
            <p className="text-sm text-gray-600 mb-6">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <h2 className="text-xl font-semibold mb-4">Acceptance of Terms</h2>
            <p className="mb-4">
              By accessing or using the Quarterly Tax Estimator service, you agree to be bound by these Terms of Service and our Privacy Policy.
            </p>

            <h2 className="text-xl font-semibold mb-4">Description of Service</h2>
            <p className="mb-4">
              Quarterly Tax Estimator is a web-based tool that helps users calculate estimated quarterly tax payments. The service provides calculations based on user input and current federal tax rates and methods.
            </p>

            <h2 className="text-xl font-semibold mb-4">User Accounts</h2>
            <p className="mb-4">
              To use our service, you must:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Create an account with accurate information</li>
              <li>Be at least 18 years old</li>
              <li>Keep your account credentials secure</li>
              <li>Pay the required one-time fee for access</li>
            </ul>

            <h2 className="text-xl font-semibold mb-4">Payment and Refunds</h2>
            <p className="mb-4">
              Our service requires a one-time payment for lifetime access. We offer a 30-day money-back guarantee. Refund requests must be submitted within 30 days of purchase.
            </p>

            <h2 className="text-xl font-semibold mb-4">Prohibited Uses</h2>
            <p className="mb-4">
              You may not use our service to:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Violate any laws or regulations</li>
              <li>Share your account with others</li>
              <li>Attempt to reverse engineer or copy our software</li>
              <li>Use automated systems to access our service</li>
              <li>Interfere with our service's operation</li>
            </ul>

            <h2 className="text-xl font-semibold mb-4">Intellectual Property</h2>
            <p className="mb-4">
              All content, features, and functionality of our service are owned by us and are protected by copyright, trademark, and other intellectual property laws.
            </p>

            <h2 className="text-xl font-semibold mb-4">Disclaimers</h2>
            <p className="mb-4">
              Our service is provided "as is" without warranties of any kind. We do not guarantee:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Accuracy of tax calculations</li>
              <li>Compliance with current tax laws</li>
              <li>Uninterrupted service availability</li>
              <li>Error-free operation</li>
            </ul>

            <h2 className="text-xl font-semibold mb-4">Limitation of Liability</h2>
            <p className="mb-4">
              We shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to tax penalties, interest, or other financial losses.
            </p>

            <h2 className="text-xl font-semibold mb-4">Indemnification</h2>
            <p className="mb-4">
              You agree to indemnify and hold us harmless from any claims, damages, or expenses arising from your use of our service or violation of these terms.
            </p>

            <h2 className="text-xl font-semibold mb-4">Service Modifications</h2>
            <p className="mb-4">
              We reserve the right to modify, suspend, or discontinue our service at any time. We will provide reasonable notice of significant changes.
            </p>

            <h2 className="text-xl font-semibold mb-4">Account Termination</h2>
            <p className="mb-4">
              We may terminate your account if you violate these terms. You may delete your account at any time through your account settings.
            </p>

            <h2 className="text-xl font-semibold mb-4">Governing Law</h2>
            <p className="mb-4">
              These terms are governed by the laws of the United States and the state in which our business is incorporated.
            </p>

            <h2 className="text-xl font-semibold mb-4">Changes to Terms</h2>
            <p className="mb-4">
              We may update these terms from time to time. Continued use of our service after changes constitutes acceptance of the new terms.
            </p>

            <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
            <p className="mb-4">
              If you have questions about these Terms of Service, please contact us.
            </p>

            <div className="bg-gray-50 border border-gray-200 p-4 mt-8 rounded">
              <p className="font-semibold text-gray-800 mb-2">
                Important Reminder
              </p>
              <p className="text-gray-700">
                This service provides tax calculation tools only. It does not provide tax advice. Always consult with a qualified tax professional for advice specific to your situation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}