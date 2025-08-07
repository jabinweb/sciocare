import { Card } from '@/components/ui/card';
import { Shield } from 'lucide-react';
import Link from 'next/link';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
            <Shield className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-xl text-gray-600">
            Learn how we protect and handle your personal information
          </p>
          <div className="text-sm text-gray-500 mt-4">
            Last updated: August 6, 2025
          </div>
        </div>

        {/* Content */}
        <Card className="p-8 mb-8">
          <div className="prose prose-lg max-w-none">
            
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Commitment to Your Privacy</h2>
            <p className="text-gray-700 mb-6">
              At ScioCare, we are committed to protecting your privacy and ensuring the security of your personal information. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our 
              healthcare communication training services.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-3">Information We Collect</h3>
            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <h4 className="font-semibold text-gray-900 mb-2">Personal Information:</h4>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Name, email address, and contact information</li>
                <li>Professional credentials and healthcare specialization</li>
                <li>Training progress and assessment results</li>
                <li>Payment and billing information</li>
              </ul>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-3">How We Use Your Information</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
              <li>Provide and improve our training programs</li>
              <li>Track your learning progress and issue certifications</li>
              <li>Communicate with you about your training</li>
              <li>Process payments and manage your account</li>
              <li>Comply with legal and regulatory requirements</li>
            </ul>

            <h3 className="text-xl font-bold text-gray-900 mb-3">HIPAA Compliance</h3>
            <div className="bg-green-50 p-4 rounded-lg mb-6">
              <p className="text-gray-700">
                As a healthcare training provider, we maintain strict HIPAA compliance standards. Any healthcare-related 
                information shared during training scenarios is treated with the highest level of confidentiality and security.
              </p>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-3">Data Security</h3>
            <p className="text-gray-700 mb-6">
              We implement industry-leading security measures including end-to-end encryption, multi-factor authentication, 
              and regular security audits to protect your information. Our systems are ISO 27001 certified and GDPR compliant.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-3">Your Rights</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
              <li>Access and review your personal information</li>
              <li>Request corrections to inaccurate data</li>
              <li>Delete your account and associated data</li>
              <li>Export your training records and certificates</li>
              <li>Opt-out of marketing communications</li>
            </ul>

            <h3 className="text-xl font-bold text-gray-900 mb-3">Contact Us</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700 mb-2">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <ul className="text-gray-700 space-y-1">
                <li><strong>Email:</strong> privacy@sciocare.com</li>
                <li><strong>Phone:</strong> +91-XXXX-XXXXXX</li>
                <li><strong>Address:</strong> [Your Business Address]</li>
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
