import { Card } from '@/components/ui/card';
import { FileText } from 'lucide-react';
import Link from 'next/link';

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-6">
            <FileText className="w-8 h-8 text-orange-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
          <p className="text-xl text-gray-600">
            Clear terms governing our training programs and services
          </p>
          <div className="text-sm text-gray-500 mt-4">
            Last updated: August 6, 2025
          </div>
        </div>

        {/* Content */}
        <Card className="p-8 mb-8">
          <div className="prose prose-lg max-w-none">
            
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome to ScioCare</h2>
            <p className="text-gray-700 mb-6">
              These Terms of Service (&quot;Terms&quot;) govern your use of ScioCare&apos;s healthcare communication training 
              programs and services. By enrolling in our programs, you agree to these terms.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-3">1. Training Program Enrollment</h3>
            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <h4 className="font-semibold text-gray-900 mb-2">Eligibility:</h4>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Must be a healthcare professional or student</li>
                <li>Valid professional credentials may be required</li>
                <li>Minimum age requirement: 18 years</li>
                <li>Access to reliable internet connection</li>
              </ul>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-3">2. Program Access & Usage</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
              <li>Training materials are for personal use only</li>
              <li>No sharing of login credentials</li>
              <li>No downloading or redistributing course content</li>
              <li>Access granted for the duration specified in your enrollment</li>
              <li>Regular participation required to maintain enrollment</li>
            </ul>

            <h3 className="text-xl font-bold text-gray-900 mb-3">3. Payment Terms</h3>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Payment Schedule:</h4>
                <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                  <li>Full payment due upon enrollment</li>
                  <li>Installment plans available for qualifying programs</li>
                  <li>Corporate billing options available</li>
                  <li>All fees in Indian Rupees (INR)</li>
                </ul>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Late Payments:</h4>
                <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                  <li>Grace period: 7 days</li>
                  <li>Account suspension after 14 days</li>
                  <li>Reinstatement fee may apply</li>
                  <li>Access restored upon full payment</li>
                </ul>
              </div>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-3">4. Certification & Completion</h3>
            <div className="bg-purple-50 p-4 rounded-lg mb-6">
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Certificates issued upon successful program completion</li>
                <li>Minimum attendance and assessment scores required</li>
                <li>Certificates are digitally verifiable</li>
                <li>No refund after certificate issuance</li>
              </ul>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-3">5. Intellectual Property</h3>
            <p className="text-gray-700 mb-6">
              All course materials, content, and training resources are the intellectual property of ScioCare. 
              This includes but is not limited to videos, documents, assessments, and training methodologies. 
              Unauthorized use, reproduction, or distribution is strictly prohibited.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-3">6. Code of Conduct</h3>
            <div className="bg-red-50 p-4 rounded-lg mb-6">
              <p className="text-gray-700 mb-2">Students are expected to:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Maintain professional behavior in all interactions</li>
                <li>Respect fellow students and instructors</li>
                <li>Participate actively and constructively</li>
                <li>Report any violations or concerns promptly</li>
              </ul>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-3">7. Limitation of Liability</h3>
            <p className="text-gray-700 mb-6">
              ScioCare provides training programs in good faith but cannot guarantee specific employment outcomes 
              or career advancement. Our liability is limited to the fees paid for the specific program enrolled.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-3">8. Termination</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
              <li>Either party may terminate with 30 days written notice</li>
              <li>Immediate termination for violation of terms</li>
              <li>Refund eligibility subject to our refund policy</li>
              <li>Access to materials ceases upon termination</li>
            </ul>

            <h3 className="text-xl font-bold text-gray-900 mb-3">9. Changes to Terms</h3>
            <div className="bg-yellow-50 p-4 rounded-lg mb-6">
              <p className="text-gray-700">
                We reserve the right to modify these terms with 30 days notice. Continued use of our services 
                after changes constitutes acceptance of the new terms.
              </p>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-3">Contact Information</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700 mb-2">
                Questions about these Terms of Service? Contact us:
              </p>
              <ul className="text-gray-700 space-y-1">
                <li><strong>Email:</strong> legal@sciocare.com</li>
                <li><strong>Phone:</strong> +91-XXXX-XXXXXX</li>
                <li><strong>Business Hours:</strong> Monday-Friday, 9 AM - 6 PM IST</li>
              </ul>
            </div>

          </div>
        </Card>

        {/* Navigation */}
        <div className="text-center">
          <Link 
            href="/" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Back to Home
          </Link>
        </div>

      </div>
    </div>
  );
}
