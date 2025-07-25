import React, { useState } from 'react';
import { useResponsive } from '../hooks/useResponsive';
import { FileText, Users, Shield, AlertTriangle, Scale, CheckCircle } from 'lucide-react';

const Terms = () => {
  const { isMobile } = useResponsive();
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const sections = [
    {
      id: 'acceptance',
      title: 'Acceptance of Terms',
      icon: CheckCircle,
      content: [
        {
          text: 'By accessing and using MatrimonyApp, you accept and agree to be bound by the terms and provision of this agreement.'
        },
        {
          text: 'If you do not agree to abide by the above, please do not use this service.'
        },
        {
          text: 'These terms apply to all users of the platform, including visitors, registered users, and premium members.'
        }
      ]
    },
    {
      id: 'user-accounts',
      title: 'User Accounts and Registration',
      icon: Users,
      content: [
        {
          subtitle: 'Account Creation',
          text: 'You must be at least 18 years old to create an account. You are responsible for maintaining the confidentiality of your account and password.'
        },
        {
          subtitle: 'Accurate Information',
          text: 'You agree to provide accurate, current, and complete information during registration and to update such information as necessary.'
        },
        {
          subtitle: 'Account Responsibility',
          text: 'You are solely responsible for all activities that occur under your account, whether or not you authorized such activities.'
        }
      ]
    },
    {
      id: 'user-conduct',
      title: 'User Conduct and Responsibilities',
      icon: Shield,
      content: [
        {
          subtitle: 'Acceptable Use',
          text: 'You agree to use the platform only for lawful purposes and in accordance with these terms of service.'
        },
        {
          subtitle: 'Prohibited Activities',
          text: 'You may not use the platform to harass, abuse, stalk, threaten, defame, or otherwise violate the legal rights of others.'
        },
        {
          subtitle: 'Content Guidelines',
          text: 'You are responsible for all content you post and must ensure it does not violate our community guidelines or applicable laws.'
        }
      ]
    },
    {
      id: 'privacy-safety',
      title: 'Privacy and Safety',
      icon: AlertTriangle,
      content: [
        {
          subtitle: 'Personal Information',
          text: 'We take your privacy seriously. Please review our Privacy Policy to understand how we collect, use, and protect your information.'
        },
        {
          subtitle: 'Safety Measures',
          text: 'We implement various safety measures, but you should exercise caution when interacting with other users and meeting in person.'
        },
        {
          subtitle: 'Reporting',
          text: 'Please report any suspicious or inappropriate behavior to our support team immediately.'
        }
      ]
    },
    {
      id: 'service-availability',
      title: 'Service Availability and Modifications',
      icon: FileText,
      content: [
        {
          subtitle: 'Service Availability',
          text: 'We strive to maintain continuous service availability but do not guarantee uninterrupted access to the platform.'
        },
        {
          subtitle: 'Service Modifications',
          text: 'We reserve the right to modify, suspend, or discontinue any part of our service at any time with or without notice.'
        },
        {
          subtitle: 'Updates',
          text: 'We may update our platform features, terms of service, and policies to improve user experience and security.'
        }
      ]
    },
    {
      id: 'liability',
      title: 'Limitation of Liability',
      icon: Scale,
      content: [
        {
          subtitle: 'Service Disclaimer',
          text: 'MatrimonyApp is provided "as is" without warranties of any kind, either express or implied.'
        },
        {
          subtitle: 'User Interactions',
          text: 'We are not responsible for the conduct of users or the accuracy of information provided by users.'
        },
        {
          subtitle: 'Limitation',
          text: 'Our liability for any claims arising from your use of the service is limited to the amount you paid for the service.'
        }
      ]
    }
  ];

  const prohibitedActivities = [
    'Creating fake or misleading profiles',
    'Harassment, stalking, or threatening other users',
    'Posting inappropriate, offensive, or explicit content',
    'Sharing false information about yourself or others',
    'Attempting to access other users\' accounts',
    'Using the platform for commercial purposes without permission',
    'Sending spam or unsolicited messages',
    'Violating any applicable laws or regulations'
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-6 lg:py-8">
      <div className="container-responsive">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FileText className="w-8 h-8 text-primary-600" />
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Terms of Service
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Please read these terms of service carefully before using MatrimonyApp. 
            By using our platform, you agree to these terms.
          </p>
          <div className="mt-4 text-sm text-gray-500">
            Effective Date: January 1, 2024
          </div>
        </div>

        {/* Quick Summary */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-8 mb-8">
          <h2 className="text-xl font-bold text-blue-900 mb-4">Quick Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-blue-800 mb-2">Your Rights</h3>
              <ul className="text-blue-700 space-y-1 text-sm">
                <li>• Use our platform to find compatible matches</li>
                <li>• Control your profile privacy and visibility</li>
                <li>• Report inappropriate behavior</li>
                <li>• Delete your account at any time</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-blue-800 mb-2">Your Responsibilities</h3>
              <ul className="text-blue-700 space-y-1 text-sm">
                <li>• Provide accurate and honest information</li>
                <li>• Respect other users and community guidelines</li>
                <li>• Keep your account secure</li>
                <li>• Use the platform legally and appropriately</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <div
                key={section.id}
                id={section.id}
                className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200"
              >
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">{section.title}</h2>
                </div>

                <div className="space-y-6">
                  {section.content.map((item, index) => (
                    <div key={index}>
                      {item.subtitle && (
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">
                          {item.subtitle}
                        </h3>
                      )}
                      <p className="text-gray-700 leading-relaxed">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Prohibited Activities */}
        <div className="mt-8 bg-red-50 border border-red-200 rounded-2xl p-8">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-red-900">Prohibited Activities</h2>
          </div>
          
          <p className="text-red-800 mb-6">
            The following activities are strictly prohibited on our platform and may result in 
            account suspension or termination:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {prohibitedActivities.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                <span className="text-red-700">{activity}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Contact and Changes */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Changes to Terms</h2>
            <p className="text-gray-700 mb-4">
              We may modify these terms at any time. We will notify users of any significant 
              changes via email or platform notifications.
            </p>
            <p className="text-gray-700">
              Continued use of the platform after changes constitutes acceptance of the new terms.
            </p>
          </div>
          
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-gray-700 mb-4">
              If you have questions about these terms, please contact us:
            </p>
            <div className="space-y-2 text-gray-700">
              <div>Email: legal@matrimonyapp.com</div>
              <div>Phone: (123) 456-7890</div>
              <div>Address: 123 Legal Street, Suite 789</div>
            </div>
          </div>
        </div>

        {/* Agreement Confirmation */}
        <div className="mt-8 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Agreement Confirmation</h2>
          <p className="text-primary-100 mb-6">
            By using MatrimonyApp, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
          </p>
          
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="accept-terms"
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
              className="w-5 h-5 text-primary-600 bg-white border-white rounded focus:ring-primary-500 focus:ring-2"
            />
            <label htmlFor="accept-terms" className="text-white">
              I have read and agree to the Terms of Service
            </label>
          </div>
          
          {acceptedTerms && (
            <div className="mt-4 p-4 bg-white/20 backdrop-blur-sm rounded-lg">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-300" />
                <span className="text-green-100">Thank you for accepting our terms!</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Terms;
