import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import BookDemo from '@/components/BookDemo';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const policies = [
    { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'Terms of Service', href: '/terms-of-service' },
    { name: 'Refund Policy', href: '/refund-policy' }
  ];

  const quickLinks = [
    { name: 'Our Programs', href: '#programs' },
    { name: 'Why Choose Us', href: '#why-choose' },
    { name: 'Success Stories', href: '#testimonials' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' }
  ];

  const socialLinks = [
    { name: 'Facebook', icon: 'fab fa-facebook-f', href: '#' },
    { name: 'Twitter', icon: 'fab fa-twitter', href: '#' },
    { name: 'LinkedIn', icon: 'fab fa-linkedin-in', href: '#' },
    { name: 'Instagram', icon: 'fab fa-instagram', href: '#' }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-32 h-8 relative">
                <Image
                  src="/sciocare_light.png"
                  alt="ScioCare Logo"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
            <p className="text-gray-300 text-sm">
              Healthcare Communication Training That Actually Works. Empowering healthcare professionals with industry-specific English and soft skills.
            </p>
            
            {/* CTA Button */}
            <div className="pt-4">
              <BookDemo>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2">
                  Schedule Free Demo
                </Button>
              </BookDemo>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-300 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Policies */}
          <div>
            <h3 className="font-semibold text-white mb-4">Legal & Policies</h3>
            <ul className="space-y-2 text-sm">
              {policies.map((policy) => (
                <li key={policy.name}>
                  <Link href={policy.href} className="text-gray-300 hover:text-white transition-colors">
                    {policy.name}
                  </Link>
                </li>
              ))}
            </ul>
            
            {/* Certifications */}
            <div className="mt-6">
              <h4 className="text-xs font-semibold text-white mb-2">Certifications</h4>
              <div className="space-y-1 text-xs text-gray-400">
                <div>🛡️ HIPAA Compliant</div>
                <div>🔒 ISO 27001 Certified</div>
                <div>✅ GDPR Compliant</div>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-white mb-4">Contact</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-2 text-gray-300">
                <i className="fas fa-map-marker-alt w-4 h-4 mt-0.5 flex-shrink-0"></i>
                <div>
                  <div>N-304, Ashiyana Sector – N</div>
                  <div>Lucknow – 226012, India</div>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <i className="fas fa-phone w-4 h-4"></i>
                <span>+91 9495212484</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <i className="fas fa-envelope w-4 h-4"></i>
                <span>info@sciolabs.in</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-6">
              <h4 className="text-sm font-semibold text-white mb-3">Follow Us</h4>
              <div className="flex space-x-3">
                {socialLinks.map((social) => (
                  <Link
                    key={social.name}
                    href={social.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                    aria-label={social.name}
                  >
                    <i className={`${social.icon} w-4 h-4`}></i>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © {currentYear} ScioCare. All rights reserved. | Healthcare Communication Training Excellence
            </div>
            <div className="flex space-x-4 text-sm">
              <span className="text-gray-500">Made with ❤️ by <Link href="https://web.jabin.org" target='_blank' className="text-gray-400 hover:text-white transition-colors">Jabin Web</Link></span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
