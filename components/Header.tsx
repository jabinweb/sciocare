'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import BookDemo from '@/components/BookDemo';
import { 
  Menu, 
  X, 
  Phone, 
  Mail, 
  Download,
  BookOpen,
  Users, Globe
} from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'Discover ScioCare', href: '#discover', icon: Globe },
    { name: 'Programs', href: '#programs', icon: BookOpen },
    { name: 'Why ScioCare', href: '#why-choose', icon: Users },
    { name: 'Contact', href: '#brochures', icon: Phone },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md border-b border-gray-200' 
        : 'bg-transparent backdrop-blur-md border-b border-white/10'
    }`}>
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-28 md:w-32 h-8 relative">
              <Image
                src={isScrolled ? "/logo.png" : "/sciocare_light.png"}
                alt="ScioCare Logo"
                fill
                className="object-contain"
              />
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
                  className={`flex items-center space-x-2 font-medium transition-colors duration-300 ${
                    isScrolled 
                      ? 'text-gray-700 hover:text-blue-700' 
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Link href="#brochures">
              <Button 
                variant="outline" 
                size="sm" 
                className={`transition-colors duration-300 ${
                  isScrolled
                    ? 'border-orange-200 hover:bg-orange-50 text-gray-700'
                    : 'border-white/30 bg-white/10 backdrop-blur-sm text-white hover:bg-white hover:text-slate-900'
                }`}
              >
                <Download className="w-4 h-4 mr-2" />
                Brochure
              </Button>
            </Link>
            <BookDemo>
              <Button 
                size="sm" 
                className={`font-semibold transition-colors duration-300 ${
                  isScrolled
                    ? 'bg-blue-700 hover:bg-blue-800 text-white'
                    : 'bg-white text-slate-900 hover:bg-white/90'
                }`}
              >
                <Mail className="w-4 h-4 mr-2" />
                Get Demo
              </Button>
            </BookDemo>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg transition-colors duration-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className={`w-6 h-6 transition-colors duration-300 ${
                isScrolled ? 'text-gray-700' : 'text-white'
              }`} />
            ) : (
              <Menu className={`w-6 h-6 transition-colors duration-300 ${
                isScrolled ? 'text-gray-700' : 'text-white'
              }`} />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className={`md:hidden pb-6 pt-4 backdrop-blur-sm transition-all duration-300 ${
            isScrolled 
              ? 'border-t border-gray-200 bg-white/95' 
              : 'border-t border-white/10 bg-slate-900/95'
          }`}>
            {/* Mobile Navigation Links */}
            <nav className="space-y-1 mb-6">
              {navigation.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center space-x-3 font-medium py-3 px-4 rounded-lg transition-all duration-300 ${
                      isScrolled 
                        ? 'text-gray-700 hover:text-blue-700 hover:bg-blue-50' 
                        : 'text-white/90 hover:text-white hover:bg-white/10'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <IconComponent className="w-5 h-5" />
                    <span className="text-base">{item.name}</span>
                  </Link>
                );
              })}
            </nav>
            
            {/* Mobile CTA Buttons */}
            <div className="space-y-3 px-4">
              <Link href="#brochures" className="block">
                <Button 
                  variant="outline" 
                  className={`w-full py-3 text-base transition-colors duration-300 ${
                    isScrolled
                      ? 'border-gray-300 hover:bg-gray-50 text-gray-700'
                    : 'border-white/30 bg-white/10 backdrop-blur-sm text-white hover:bg-white hover:text-slate-900'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download Brochure
                </Button>
              </Link>
              <BookDemo>
                <Button 
                  className={`w-full py-3 text-base font-semibold transition-colors duration-300 ${
                    isScrolled
                      ? 'bg-blue-700 hover:bg-blue-800 text-white'
                      : 'bg-white text-slate-900 hover:bg-white/90'
                  }`}
                >
                  <Mail className="w-5 h-5 mr-2" />
                  Get Demo
                </Button>
              </BookDemo>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
         