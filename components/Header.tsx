'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { 
  Heart, 
  Menu, 
  X, 
  Phone, 
  Mail, 
  Download,
  BookOpen,
  Users
} from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: 'Programs', href: '#programs', icon: BookOpen },
    { name: 'About', href: '#about', icon: Heart },
    { name: 'Why ScioCare', href: '#why-choose', icon: Users },
    { name: 'Contact', href: '#contact', icon: Phone },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-green-500 to-purple-500 rounded-xl flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="font-heading text-xl font-bold bg-gradient-to-r from-blue-600 via-green-600 to-purple-600 bg-clip-text text-transparent">
                ScioCare
              </span>
              <div className="text-xs text-gray-600 -mt-1">Healthcare Education</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => {
              const IconComponent = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors font-medium"
                >
                  <IconComponent className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Button variant="outline" size="sm" className="border-blue-200 hover:bg-blue-50">
              <Download className="w-4 h-4 mr-2" />
              Brochure
            </Button>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
              <Mail className="w-4 h-4 mr-2" />
              Get Demo
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="space-y-4">
              {navigation.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 transition-colors font-medium py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <IconComponent className="w-5 h-5" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>
            
            <div className="mt-6 space-y-3">
              <Button 
                variant="outline" 
                className="w-full border-blue-200 hover:bg-blue-50"
                onClick={() => setIsMenuOpen(false)}
              >
                <Download className="w-4 h-4 mr-2" />
                Download Brochure
              </Button>
              <Button 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                <Mail className="w-4 h-4 mr-2" />
                Get Demo
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
