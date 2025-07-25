import React, { useState } from 'react';
import { useResponsive } from '../hooks/useResponsive';
import { 
  Search, 
  ChevronDown, 
  ChevronRight, 
  MessageCircle, 
  Mail, 
  Phone,
  Book,
  Users,
  Shield,
  Heart,
  Settings
} from 'lucide-react';

const Help = () => {
  const { isMobile } = useResponsive();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState(null);

  const helpCategories = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: Book,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      id: 'profile',
      title: 'Profile Management',
      icon: Users,
      color: 'bg-green-100 text-green-600'
    },
    {
      id: 'matching',
      title: 'Matching & Search',
      icon: Heart,
      color: 'bg-red-100 text-red-600'
    },
    {
      id: 'communication',
      title: 'Communication',
      icon: MessageCircle,
      color: 'bg-purple-100 text-purple-600'
    },
    {
      id: 'privacy',
      title: 'Privacy & Safety',
      icon: Shield,
      color: 'bg-yellow-100 text-yellow-600'
    },
    {
      id: 'account',
      title: 'Account Settings',
      icon: Settings,
      color: 'bg-gray-100 text-gray-600'
    }
  ];

  const faqData = [
    {
      id: 1,
      category: 'getting-started',
      question: 'How do I create my profile?',
      answer: 'After registering, go to "Edit Profile" to add your personal details, photos, and preferences. Complete all sections for better matches.'
    },
    {
      id: 2,
      category: 'getting-started',
      question: 'What information should I include in my profile?',
      answer: 'Include accurate personal details, recent photos, education, profession, family background, and your partner preferences. Be honest and authentic.'
    },
    {
      id: 3,
      category: 'profile',
      question: 'How can I make my profile more attractive?',
      answer: 'Use high-quality recent photos, write a compelling bio, complete all profile sections, and keep your information updated.'
    },
    {
      id: 4,
      category: 'profile',
      question: 'Can I hide my profile from certain users?',
      answer: 'Yes, you can control profile visibility in settings and block specific users if needed.'
    },
    {
      id: 5,
      category: 'matching',
      question: 'How does the matching algorithm work?',
      answer: 'Our algorithm considers age, location, religion, education, lifestyle preferences, and other compatibility factors to suggest suitable matches.'
    },
    {
      id: 6,
      category: 'matching',
      question: 'Why am I not getting good matches?',
      answer: 'Ensure your profile is complete, update your preferences, expand your search criteria, or contact support for personalized assistance.'
    },
    {
      id: 7,
      category: 'communication',
      question: 'How do I send an interest to someone?',
      answer: 'Visit their profile and click the "Send Interest" button. You can include a personal message with your interest request.'
    },
    {
      id: 8,
      category: 'communication',
      question: 'When can I start messaging someone?',
      answer: 'You can message someone after both parties have accepted each other\'s interest, creating a mutual match.'
    },
    {
      id: 9,
      category: 'privacy',
      question: 'Is my information safe and private?',
      answer: 'Yes, we use advanced security measures to protect your data. Only verified users can access profiles, and you control what information to share.'
    },
    {
      id: 10,
      category: 'privacy',
      question: 'How do I report inappropriate behavior?',
      answer: 'Use the "Report" button on any profile or message. Our team reviews all reports within 24 hours and takes appropriate action.'
    },
    {
      id: 11,
      category: 'account',
      question: 'How do I change my password?',
      answer: 'Go to Settings > Security > Change Password. Enter your current password and create a new strong password.'
    },
    {
      id: 12,
      category: 'account',
      question: 'Can I delete my account?',
      answer: 'Yes, you can delete your account from Settings > Account > Delete Account. This action is permanent and cannot be undone.'
    }
  ];

  const [selectedCategory, setSelectedCategory] = useState('getting-started');

  const filteredFaqs = faqData.filter(faq => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFaq = (faqId) => {
    setExpandedFaq(expandedFaq === faqId ? null : faqId);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6 lg:py-8">
      <div className="container-responsive">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            How can we help you?
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find quick answers to common questions or get in touch with our support team
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for help topics..."
              className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent text-lg"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Categories Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 sticky top-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Help Categories</h2>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    selectedCategory === 'all' 
                      ? 'bg-primary-50 text-primary-700 border border-primary-200'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Book className="w-5 h-5" />
                  <span>All Topics</span>
                </button>
                {helpCategories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                        selectedCategory === category.id
                          ? 'bg-primary-50 text-primary-700 border border-primary-200'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${category.color}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className={`${isMobile ? 'text-sm' : 'text-base'}`}>
                        {category.title}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* FAQ Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">
                  Frequently Asked Questions
                </h2>
                <p className="text-gray-600 mt-1">
                  {filteredFaqs.length} questions found
                </p>
              </div>

              <div className="divide-y divide-gray-200">
                {filteredFaqs.map((faq) => (
                  <div key={faq.id} className="p-6">
                    <button
                      onClick={() => toggleFaq(faq.id)}
                      className="w-full flex items-center justify-between text-left"
                    >
                      <h3 className="text-lg font-medium text-gray-900 pr-4">
                        {faq.question}
                      </h3>
                      {expandedFaq === faq.id ? (
                        <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-gray-500 flex-shrink-0" />
                      )}
                    </button>
                    
                    {expandedFaq === faq.id && (
                      <div className="mt-4 text-gray-700 leading-relaxed">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {filteredFaqs.length === 0 && (
                <div className="p-12 text-center">
                  <div className="text-gray-400 mb-4">
                    <Search className="w-12 h-12 mx-auto" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
                  <p className="text-gray-600">
                    Try different keywords or browse our help categories
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Contact Support */}
        <div className="mt-12">
          <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl p-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-4">Still need help?</h2>
            <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
              Can't find what you're looking for? Our support team is here to help you with any questions or concerns.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
              <a
                href="/contact"
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl p-6 transition-all"
              >
                <MessageCircle className="w-8 h-8 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Live Chat</h3>
                <p className="text-sm text-primary-100">Available 9 AM - 6 PM</p>
              </a>
              
              <a
                href="mailto:support@matrimonyapp.com"
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl p-6 transition-all"
              >
                <Mail className="w-8 h-8 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Email Support</h3>
                <p className="text-sm text-primary-100">support@matrimonyapp.com</p>
              </a>
              
              <a
                href="tel:+1234567890"
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl p-6 transition-all"
              >
                <Phone className="w-8 h-8 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Phone Support</h3>
                <p className="text-sm text-primary-100">(123) 456-7890</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
