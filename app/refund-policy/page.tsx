import { Card } from '@/components/ui/card';
import { CreditCard } from 'lucide-react';
import Link from 'next/link';

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-6">
            <CreditCard className="w-8 h-8 text-purple-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Refund Policy</h1>
          <p className="text-xl text-gray-600">
            Transparent refund terms for our training programs
          </p>
          <div className="text-sm text-gray-500 mt-4">
            Last updated: August 6, 2025
          </div>
        </div>

        {/* Content */}
        <Card className="p-8 mb-8">
          <div className="prose prose-lg max-w-none">
            
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Commitment to Fair Refunds</h2>
            <p className="text-gray-700 mb-6">
              We want you to be completely satisfied with your ScioCare training experience. Our refund policy 
              is designed to be fair and transparent while protecting the quality of our programs.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-3">Full Refund Eligibility</h3>
            <div className="bg-green-50 p-4 rounded-lg mb-6">
              <h4 className="font-semibold text-gray-900 mb-2">100% Refund Available:</h4>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li><strong>Within 7 days</strong> of enrollment and before accessing any course materials</li>
                <li><strong>Technical issues</strong> preventing access that cannot be resolved within 48 hours</li>
                <li><strong>Course cancellation</strong> by ScioCare due to insufficient enrollment</li>
                <li><strong>Medical emergencies</strong> with proper documentation</li>
              </ul>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-3">Partial Refund Schedule</h3>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Within 14 Days:</h4>
                <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                  <li>75% refund if less than 25% content accessed</li>
                  <li>Applies to standard training programs</li>
                  <li>Processing time: 5-7 business days</li>
                </ul>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Within 30 Days:</h4>
                <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                  <li>50% refund if less than 50% content accessed</li>
                  <li>Subject to case-by-case review</li>
                  <li>Processing time: 7-10 business days</li>
                </ul>
              </div>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-3">No Refund Conditions</h3>
            <div className="bg-red-50 p-4 rounded-lg mb-6">
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>After 30 days from enrollment date</li>
                <li>More than 50% of course content has been accessed</li>
                <li>After receiving course completion certificate</li>
                <li>Violation of terms of service or code of conduct</li>
                <li>Downloadable resources or materials have been accessed</li>
              </ul>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-3">Special Program Policies</h3>
            <div className="space-y-4 mb-6">
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Corporate Training Programs:</h4>
                <p className="text-gray-700 text-sm">
                  Custom refund terms as specified in corporate agreements. Generally 14-day full refund period 
                  before program commencement.
                </p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Certification Programs:</h4>
                <p className="text-gray-700 text-sm">
                  Partial refunds available only within first 7 days. No refunds after practical assessments begin.
                </p>
              </div>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-3">Refund Process</h3>
            <ol className="list-decimal list-inside text-gray-700 space-y-2 mb-6">
              <li>Submit refund request via email to refunds@sciocare.com</li>
              <li>Include your enrollment details and reason for refund</li>
              <li>Our team will review within 2 business days</li>
              <li>Approved refunds processed within 7-10 business days</li>
              <li>Refunds credited to original payment method</li>
            </ol>

            <h3 className="text-xl font-bold text-gray-900 mb-3">Alternative Solutions</h3>
            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <p className="text-gray-700 mb-2">Before requesting a refund, consider these options:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li><strong>Program Transfer:</strong> Switch to a different program that better fits your needs</li>
                <li><strong>Extended Access:</strong> Additional time to complete if facing personal challenges</li>
                <li><strong>One-on-One Support:</strong> Extra help from our training coordinators</li>
                <li><strong>Pause Option:</strong> Temporary suspension with later resumption</li>
              </ul>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-3">Contact Refund Team</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700 mb-2">
                Questions about refunds or need to request one?
              </p>
              <ul className="text-gray-700 space-y-1">
                <li><strong>Email:</strong> refunds@sciocare.com</li>
                <li><strong>Phone:</strong> +91-XXXX-XXXXXX</li>
                <li><strong>Response Time:</strong> Within 24 hours during business days</li>
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
