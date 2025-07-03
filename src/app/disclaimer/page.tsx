export default function Disclaimer() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Legal Disclaimer
          </h1>
          
          <div className="prose max-w-none">
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
              <p className="font-semibold text-yellow-800">
                Important: This is not tax advice.
              </p>
            </div>

            <h2 className="text-xl font-semibold mb-4">Tax Advice Disclaimer</h2>
            <p className="mb-4">
              The Quarterly Tax Estimator (&quot;Service&quot;) is a software tool designed to help users estimate their quarterly tax payments. This Service does not provide tax advice, accounting advice, or legal advice. The calculations and recommendations provided by this Service are for informational purposes only and should not be considered as professional tax advice.
            </p>

            <h2 className="text-xl font-semibold mb-4">Professional Consultation Required</h2>
            <p className="mb-4">
              You should consult a licensed tax professional, certified public accountant (CPA), enrolled agent (EA), or tax attorney for guidance on your specific tax situation. Tax laws are complex and change frequently, and individual circumstances can significantly affect tax obligations.
            </p>

            <h2 className="text-xl font-semibold mb-4">Accuracy and Reliability</h2>
            <p className="mb-4">
              While we strive to provide accurate calculations based on current federal tax rates and methods, we make no guarantees about the accuracy, completeness, or reliability of the information provided. Tax calculations can be affected by numerous factors including:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Changes in tax laws and regulations</li>
              <li>Individual circumstances and deductions</li>
              <li>State and local tax obligations</li>
              <li>Special tax situations or credits</li>
              <li>Timing of income and expenses</li>
            </ul>

            <h2 className="text-xl font-semibold mb-4">Limitation of Liability</h2>
            <p className="mb-4">
              The creators and operators of this Service shall not be liable for any damages, penalties, interest, or other consequences arising from:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Use of this Service or reliance on its calculations</li>
              <li>Underpayment or overpayment of taxes</li>
              <li>Missed deadlines or payment dates</li>
              <li>Errors or omissions in the Service</li>
              <li>Any tax-related issues or disputes with tax authorities</li>
            </ul>

            <h2 className="text-xl font-semibold mb-4">User Responsibility</h2>
            <p className="mb-4">
              Users are solely responsible for:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Verifying the accuracy of all input data</li>
              <li>Understanding their tax obligations</li>
              <li>Making timely tax payments</li>
              <li>Complying with all applicable tax laws</li>
              <li>Seeking professional advice when needed</li>
            </ul>

            <h2 className="text-xl font-semibold mb-4">Federal Tax Focus</h2>
            <p className="mb-4">
              This Service focuses on federal estimated tax calculations only. It does not address state or local tax obligations, which may have different requirements, deadlines, and calculation methods.
            </p>

            <h2 className="text-xl font-semibold mb-4">Updates and Changes</h2>
            <p className="mb-4">
              Tax laws and rates change regularly. While we endeavor to keep our calculations current, users should verify that they are using the most up-to-date tax information for their specific tax year.
            </p>

            <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
            <p className="mb-4">
              If you have questions about this disclaimer or need support with the Service, please contact us. However, we cannot provide tax advice or answer tax-related questions that require professional expertise.
            </p>

            <div className="bg-red-50 border-l-4 border-red-400 p-4 mt-8">
              <p className="font-semibold text-red-800 mb-2">
                Remember: When in doubt, consult a professional.
              </p>
              <p className="text-red-700">
                The cost of professional tax advice is often much less than the potential penalties and interest from tax underpayments or errors.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}