import React from 'react';
import { useResponsive } from '../hooks/useResponsive';
import { Shield, Eye, Lock, UserCheck, Database, Mail } from 'lucide-react';

const Privacy = () => {
  const { isMobile } = useResponsive();

  const sections = [
    {
      id: 'information-collection',
      title: 'Information We Collect',
      icon: Database,
      content: [
        {
          subtitle: 'Personal Information',
          details: 'We collect information you provide when creating your profile, including name, age, contact details, photos, education, profession, and family background.'
        },
        {
          subtitle: 'Usage Information',
          details: 'We automatically collect information about how you use our platform, including search queries, profile views, and interaction patterns.'
        },
        {
          subtitle: 'Communication',
          details: 'We store messages and communications between users to provide our matching and messaging services.'
        }
      ]
    },
    {
      id: 'information-use',
      title: 'How We Use Your Information',
      icon: UserCheck,
      content: [
        {
          subtitle: 'Matching Services',
          details: 'We use your profile information and preferences to suggest compatible matches and improve our matching algorithm.'
        },
        {
          subtitle: 'Platform Improvement',
          details: 'We analyze usage patterns to enhance user experience, develop new features, and improve our services.'
        },
        {
          subtitle: 'Communication',
          details: 'We use your contact information to send important updates, notifications, and promotional content (with your consent).'
        }
      ]
    },
    {
      id: 'information-sharing',
      title: 'Information Sharing',
      icon: Eye,
      content: [
        {
          subtitle: 'Profile Visibility',
          details: 'Your profile information is visible to other verified users based on your privacy settings and matching criteria.'
        },
        {
          subtitle: 'Third-Party Services',
          details: 'We may share anonymized data with service providers for analytics, payment processing, and platform maintenance.'
        },
        {
          subtitle: 'Legal Requirements',
          details: 'We may disclose information when required by law or to protect the safety and rights of our users and platform.'
        }
      ]
    },
    {
      id: 'data-security',
      title: 'Data Security',
      icon: Lock,
      content: [
        {
          subtitle: 'Encryption',
          details: 'All data transmission is encrypted using industry-standard SSL/TLS protocols to protect your information.'
        },
        {
          subtitle: 'Access Controls',
          details: 'We implement strict access controls and authentication measures to prevent unauthorized access to user data.'
        },
        {
          subtitle: 'Regular Security Audits',
          details: 'We conduct regular security assessments and updates to maintain the highest level of data protection.'
        }
      ]
    },
    {
      id: 'user-controls',
      title: 'Your Privacy Controls',
      icon: Shield,
      content: [
        {
          subtitle: 'Profile Privacy',
          details: 'You can control who can view your profile, photos, and contact information through detailed privacy settings.'
        },
        {
          subtitle: 'Data Access',
          details: 'You have the right to access, update, or delete your personal information at any time through your account settings.'
        },
        {
          subtitle: 'Communication Preferences',
          details: 'You can manage your notification preferences and opt-out of promotional communications while maintaining essential service updates.'
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-6 lg:py-8">
      <div className="container-responsive">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="w-8 h-8 text-primary-600" />
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Your privacy is important to us. This policy explains how we collect, use, and protect your personal information on MatrimonyApp.
          </p>
          <div className="mt-4 text-sm text-gray-500">
            Last updated: January 1, 2024
          </div>
        </div>

        {/* Quick Navigation */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Navigation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <section.icon className="w-5 h-5 text-primary-600" />
                <span className="text-sm font-medium text-gray-700">{section.title}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Content Sections */}
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
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        {item.subtitle}
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        {item.details}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Information */}
        <div className="mt-12 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Rights and Choices</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Data Portability</h3>
              <p className="text-gray-700 mb-4">
                You have the right to download your personal data in a structured, machine-readable format.
              </p>
              <button className="text-primary-600 font-medium hover:text-primary-700 transition-colors">
                Request Data Export →
              </button>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Deletion</h3>
              <p className="text-gray-700 mb-4">
                You can permanently delete your account and all associated data at any time from your settings.
              </p>
              <button className="text-red-600 font-medium hover:text-red-700 transition-colors">
                Delete Account →
              </button>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="mt-8 bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
              <Mail className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Questions About Privacy?</h2>
              <p className="text-gray-600">Our privacy team is here to help</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Email Us</h3>
              <a 
                href="mailto:privacy@matrimonyapp.com"
                className="text-primary-600 hover:text-primary-700 transition-colors"
              >
                privacy@matrimonyapp.com
              </a>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Address</h3>
              <p className="text-gray-700">
                123 Privacy Street<br />
                Suite 456<br />
                City, State 12345
              </p>
            </div>
          </div>
        </div>

        {/* Policy Updates */}
        <div className="mt-8 p-6 bg-yellow-50 border border-yellow-200 rounded-2xl">
          <h3 className="text-lg font-semibold text-yellow-800 mb-2">Policy Updates</h3>
          <p className="text-yellow-700">
            We may update this privacy policy from time to time. We will notify you of any significant changes 
            via email or through our platform. Please review this policy periodically for updates.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
