import React from 'react';
import { Link } from 'react-router-dom';
import { useResponsive } from '../../hooks/useResponsive.js';
import { 
  Heart, 
  Mail, 
  Phone, 
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube
} from 'lucide-react';

const Footer = () => {
  const { isMobile } = useResponsive();

  const footerLinks = {
    company: {
      title: 'Company',
      links: [
        { label: 'About Us', path: '/about' },
        { label: 'Contact', path: '/contact' },
        { label: 'Careers', path: '/careers' },
        { label: 'Press', path: '/press' }
      ]
    },
    services: {
      title: 'Services',
      links: [
        { label: 'Search Profiles', path: '/search' },
        { label: 'Premium Plans', path: '/premium' },
        { label: 'Success Stories', path: '/success-stories' },
        { label: 'Matrimony Events', path: '/events' }
      ]
    },
    support: {
      title: 'Support',
      links: [
        { label: 'Help Center', path: '/help' },
        { label: 'Safety Tips', path: '/safety' },
        { label: 'Community Guidelines', path: '/guidelines' },
        { label: 'Report Issues', path: '/report' }
      ]
    },
    legal: {
      title: 'Legal',
      links: [
        { label: 'Privacy Policy', path: '/privacy' },
        { label: 'Terms of Service', path: '/terms' },
        { label: 'Cookie Policy', path: '/cookies' },
        { label: 'Refund Policy', path: '/refund' }
      ]
    }
  };

  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com/matrimonyapp', label: 'Facebook' },
    { icon: Twitter, href: 'https://twitter.com/matrimonyapp', label: 'Twitter' },
    { icon: Instagram, href: 'https://instagram.com/matrimonyapp', label: 'Instagram' },
    { icon: Linkedin, href: 'https://linkedin.com/company/matrimonyapp', label: 'LinkedIn' },
    { icon: Youtube, href: 'https://youtube.com/matrimonyapp', label: 'YouTube' }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="container-responsive py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                <Heart className="w-5 h-5 text-white fill-current" />
              </div>
              <span className="text-xl font-bold">MatrimonyApp</span>
            </Link>
            
            <p className="text-gray-300 mb-6 leading-relaxed">
              India's most trusted matrimonial platform helping thousands of people find their perfect life partner. 
              Join us today and start your journey to find love.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-primary-400" />
                <a href="mailto:support@matrimonyapp.com" className="text-gray-300 hover:text-white transition-colors">
                  support@matrimonyapp.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-primary-400" />
                <a href="tel:+911234567890" className="text-gray-300 hover:text-white transition-colors">
                  +91 12345 67890
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-primary-400" />
                <span className="text-gray-300">Mumbai, Maharashtra, India</span>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([key, section]) => (
            <div key={key} className="lg:col-span-1">
              <h3 className="font-semibold text-white mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.path}
                      className="text-gray-300 hover:text-white hover:underline transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="max-w-md">
            <h3 className="font-semibold text-white mb-4">Stay Updated</h3>
            <p className="text-gray-300 mb-4">
              Subscribe to our newsletter for the latest updates and success stories.
            </p>
            <div className="flex space-x-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-white placeholder-gray-400"
              />
              <button className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors font-medium">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="container-responsive py-6">
          <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
            {/* Copyright */}
            <div className="text-gray-400 text-sm">
              © 2024 MatrimonyApp. All rights reserved.
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <span className="text-gray-400 text-sm">Follow us:</span>
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>

            {/* App Downloads */}
            <div className="flex items-center space-x-4">
              <span className="text-gray-400 text-sm">Get the app:</span>
              <a
                href="#"
                className="bg-gray-800 hover:bg-gray-700 px-3 py-1 rounded text-sm transition-colors"
              >
                App Store
              </a>
              <a
                href="#"
                className="bg-gray-800 hover:bg-gray-700 px-3 py-1 rounded text-sm transition-colors"
              >
                Play Store
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
