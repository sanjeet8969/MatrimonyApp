import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useResponsive } from '../hooks/useResponsive';
import { Heart, Users, Shield, MessageCircle, Search, Star } from 'lucide-react';

const Home = () => {
  const { isAuthenticated } = useAuth();
  const { isMobile, isTablet } = useResponsive();

  const features = [
    {
      icon: Search,
      title: 'Advanced Search',
      description: 'Find your perfect match with detailed filters and preferences'
    },
    {
      icon: Shield,
      title: 'Verified Profiles',
      description: 'All profiles are manually verified for authenticity and safety'
    },
    {
      icon: MessageCircle,
      title: 'Secure Communication',
      description: 'Connect safely with built-in messaging and privacy controls'
    },
    {
      icon: Heart,
      title: 'Smart Matching',
      description: 'AI-powered algorithm suggests compatible profiles based on your preferences'
    }
  ];

  const testimonials = [
    {
      name: 'Priya & Rajesh',
      text: 'We found each other through MatrimonyApp and couldn\'t be happier!',
      rating: 5
    },
    {
      name: 'Anita & Suresh',
      text: 'The platform made our search easy and successful. Highly recommended!',
      rating: 5
    },
    {
      name: 'Meera & Arjun',
      text: 'Professional, secure, and effective. Thank you for helping us find love!',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-secondary-50 py-12 lg:py-20">
        <div className="container-responsive">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-6 lg:space-y-8">
              <h1 className="text-responsive-2xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Find Your Perfect
                <span className="text-primary-600 block">Life Partner</span>
              </h1>
              <p className="text-responsive-base lg:text-xl text-gray-600 max-w-lg">
                Join thousands of successful couples who found their soulmate through our trusted matrimonial platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                {!isAuthenticated ? (
                  <>
                    <Link
                      to="/register"
                      className="bg-primary-600 text-white px-6 lg:px-8 py-3 lg:py-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors text-center"
                    >
                      Get Started Free
                    </Link>
                    <Link
                      to="/login"
                      className="border-2 border-primary-600 text-primary-600 px-6 lg:px-8 py-3 lg:py-4 rounded-lg font-semibold hover:bg-primary-50 transition-colors text-center"
                    >
                      Sign In
                    </Link>
                  </>
                ) : (
                  <Link
                    to="/dashboard"
                    className="bg-primary-600 text-white px-6 lg:px-8 py-3 lg:py-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors text-center"
                  >
                    Go to Dashboard
                  </Link>
                )}
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-6 lg:p-8 max-w-md mx-auto">
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto">
                    <Heart className="w-10 h-10 text-primary-600 fill-current" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Join Today</h3>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-primary-600">50K+</div>
                      <div className="text-sm text-gray-600">Active Users</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-secondary-600">15K+</div>
                      <div className="text-sm text-gray-600">Success Stories</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary-600">99%</div>
                      <div className="text-sm text-gray-600">Satisfaction</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 lg:py-20 bg-white">
        <div className="container-responsive">
          <div className="text-center space-y-4 mb-12 lg:mb-16">
            <h2 className="text-responsive-xl lg:text-4xl font-bold text-gray-900">
              Why Choose MatrimonyApp?
            </h2>
            <p className="text-responsive-base lg:text-xl text-gray-600 max-w-3xl mx-auto">
              We provide a safe, secure, and effective platform to help you find your ideal life partner.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="text-center space-y-4 p-6 rounded-xl hover:shadow-lg transition-shadow">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto">
                    <Icon className="w-8 h-8 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-12 lg:py-20 bg-gray-50">
        <div className="container-responsive">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl lg:text-5xl font-bold text-primary-600">50,000+</div>
              <div className="text-lg text-gray-600">Active Profiles</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl lg:text-5xl font-bold text-secondary-600">15,000+</div>
              <div className="text-lg text-gray-600">Happy Couples</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl lg:text-5xl font-bold text-primary-600">25+</div>
              <div className="text-lg text-gray-600">Countries</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 lg:py-20 bg-white">
        <div className="container-responsive">
          <div className="text-center space-y-4 mb-12 lg:mb-16">
            <h2 className="text-responsive-xl lg:text-4xl font-bold text-gray-900">
              Success Stories
            </h2>
            <p className="text-responsive-base lg:text-xl text-gray-600">
              Real couples, real stories of finding love through our platform.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">"{testimonial.text}"</p>
                <div className="font-semibold text-gray-900">- {testimonial.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 lg:py-20 bg-primary-600">
        <div className="container-responsive text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-responsive-xl lg:text-4xl font-bold text-white">
              Ready to Find Your Life Partner?
            </h2>
            <p className="text-responsive-base lg:text-xl text-primary-100">
              Join thousands of others who have found love through our platform. Your perfect match is waiting for you.
            </p>
            {!isAuthenticated && (
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/register"
                  className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  Create Free Account
                </Link>
                <Link
                  to="/login"
                  className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
                >
                  Sign In Now
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
