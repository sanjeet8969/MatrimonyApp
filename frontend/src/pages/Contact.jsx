import React, { useState } from 'react';
import { useResponsive } from '../hooks/useResponsive';
import { 
  Mail, 
  Phone, 
  MapPin, 
  MessageCircle, 
  Clock, 
  Send,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import toast from 'react-hot-toast';

const Contact = () => {
  const { isMobile } = useResponsive();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    category: 'general'
  });
  const [loading, setLoading] = useState(false);

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Get help via email',
      contact: 'support@matrimonyapp.com',
      availability: 'Response within 24 hours',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      icon: Phone,
      title: 'Phone Support',
      description: 'Speak with our team',
      contact: '+1 (555) 123-4567',
      availability: 'Mon-Fri, 9 AM - 6 PM',
      color: 'bg-green-100 text-green-600'
    },
    {
      icon: MessageCircle,
      title: 'Live Chat',
      description: 'Chat with support agent',
      contact: 'Available on website',
      availability: 'Mon-Fri, 9 AM - 6 PM',
      color: 'bg-purple-100 text-purple-600'
    },
    {
      icon: MapPin,
      title: 'Office Address',
      description: 'Visit our headquarters',
      contact: '123 Love Street, Heart City, HC 12345',
      availability: 'Mon-Fri, 9 AM - 5 PM',
      color: 'bg-red-100 text-red-600'
    }
  ];

  const faqs = [
    {
      question: 'How do I reset my password?',
      answer: 'Click on "Forgot Password" on the login page and follow the instructions sent to your email.'
    },
    {
      question: 'How do I update my profile?',
      answer: 'Go to "Edit Profile" from your dashboard to update your information and photos.'
    },
    {
      question: 'How do I cancel my subscription?',
      answer: 'Visit Settings > Subscription to manage or cancel your subscription at any time.'
    },
    {
      question: 'How do I report inappropriate behavior?',
      answer: 'Use the "Report" button on any profile or message to report inappropriate behavior.'
    }
  ];

  const categories = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'technical', label: 'Technical Support' },
    { value: 'billing', label: 'Billing & Subscriptions' },
    { value: 'safety', label: 'Safety & Privacy' },
    { value: 'feedback', label: 'Feedback & Suggestions' },
    { value: 'partnership', label: 'Business Partnership' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);
    
    try {
      // Mock API call - replace with actual implementation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('Message sent successfully! We\'ll get back to you soon.');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        category: 'general'
      });
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6 lg:py-8">
      <div className="container-responsive">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Contact Us
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Have questions or need help? We're here to assist you. Choose the best way to reach us 
            or send us a message using the form below.
          </p>
        </div>

        {/* Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {contactMethods.map((method, index) => {
            const Icon = method.icon;
            return (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 text-center">
                <div className={`w-12 h-12 ${method.color} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {method.title}
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  {method.description}
                </p>
                <div className="text-primary-600 font-medium text-sm mb-2">
                  {method.contact}
                </div>
                <div className="flex items-center justify-center space-x-1 text-xs text-gray-500">
                  <Clock className="w-3 h-3" />
                  <span>{method.availability}</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      {categories.map((category) => (
                        <option key={category.value} value={category.value}>
                          {category.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Brief subject of your message"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Please describe your question or concern in detail..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center space-x-2 bg-primary-600 text-white py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* FAQ and Additional Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Quick Help */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Help</h3>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index}>
                    <h4 className="font-medium text-gray-900 mb-2">{faq.question}</h4>
                    <p className="text-sm text-gray-600">{faq.answer}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <a
                  href="/help"
                  className="text-primary-600 hover:text-primary-700 font-medium text-sm"
                >
                  View all FAQs →
                </a>
              </div>
            </div>

            {/* Response Time */}
            <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
              <div className="flex items-center space-x-3 mb-3">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <h3 className="font-semibold text-green-800">Quick Response</h3>
              </div>
              <p className="text-green-700 text-sm">
                We typically respond to all inquiries within 24 hours during business days.
                For urgent matters, please call our support line.
              </p>
            </div>

            {/* Emergency Contact */}
            <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
              <div className="flex items-center space-x-3 mb-3">
                <AlertCircle className="w-6 h-6 text-red-600" />
                <h3 className="font-semibold text-red-800">Emergency Support</h3>
              </div>
              <p className="text-red-700 text-sm mb-3">
                For urgent safety concerns or security issues, contact us immediately:
              </p>
              <div className="text-red-800 font-medium text-sm">
                Emergency Hotline: +1 (555) 911-HELP
              </div>
            </div>
          </div>
        </div>

        {/* Office Locations */}
        <div className="mt-12 bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Our Offices</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                city: 'Mumbai',
                address: '123 Love Street, Bandra West, Mumbai 400050',
                phone: '+91 22 1234 5678',
                email: 'mumbai@matrimonyapp.com'
              },
              {
                city: 'Delhi',
                address: '456 Heart Avenue, Connaught Place, New Delhi 110001',
                phone: '+91 11 8765 4321',
                email: 'delhi@matrimonyapp.com'
              },
              {
                city: 'Bangalore',
                address: '789 Romance Road, Koramangala, Bangalore 560034',
                phone: '+91 80 9876 5432',
                email: 'bangalore@matrimonyapp.com'
              }
            ].map((office, index) => (
              <div key={index} className="text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">{office.city}</h3>
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-start justify-center space-x-2">
                    <MapPin className="w-4 h-4 mt-0.5 text-gray-400" />
                    <span>{office.address}</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span>{office.phone}</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span>{office.email}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
