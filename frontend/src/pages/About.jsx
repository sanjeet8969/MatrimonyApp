import React from 'react';
import { useResponsive } from '../hooks/useResponsive.js';
import { 
  Heart, 
  Users, 
  Shield, 
  Award, 
  Target, 
  Globe,
  CheckCircle,
  Star,
  TrendingUp,
  UserCheck
} from 'lucide-react';

const About = () => {
  const { isMobile } = useResponsive();

  const statistics = [
    {
      number: '50,000+',
      label: 'Active Users',
      icon: Users,
      color: 'text-blue-600'
    },
    {
      number: '15,000+',
      label: 'Success Stories',
      icon: Heart,
      color: 'text-red-600'
    },
    {
      number: '25+',
      label: 'Countries',
      icon: Globe,
      color: 'text-green-600'
    },
    {
      number: '99%',
      label: 'Satisfaction Rate',
      icon: Star,
      color: 'text-yellow-600'
    }
  ];

  const features = [
    {
      title: 'Advanced Matching Algorithm',
      description: 'Our AI-powered algorithm considers multiple compatibility factors to suggest the most suitable matches.',
      icon: Target
    },
    {
      title: 'Verified Profiles',
      description: 'All profiles undergo manual verification to ensure authenticity and safety for our users.',
      icon: UserCheck
    },
    {
      title: 'Privacy & Security',
      description: 'We implement industry-leading security measures to protect your personal information.',
      icon: Shield
    },
    {
      title: 'Success Support',
      description: 'Our dedicated team provides personalized support throughout your journey to find love.',
      icon: Award
    }
  ];

  const team = [
    {
      name: 'Raj Patel',
      role: 'CEO & Founder',
      image: '/api/placeholder/150/150',
      bio: 'With over 15 years in technology and a passion for connecting people, Raj founded MatrimonyApp to revolutionize how people find their life partners.'
    },
    {
      name: 'Priya Sharma',
      role: 'CTO',
      image: '/api/placeholder/150/150',
      bio: 'Priya leads our technology team and is responsible for developing our advanced matching algorithms and platform security.'
    },
    {
      name: 'Arjun Singh',
      role: 'Head of Customer Success',
      image: '/api/placeholder/150/150',
      bio: 'Arjun ensures every user has a positive experience and leads our customer support and success initiatives.'
    },
    {
      name: 'Meera Gupta',
      role: 'Head of Community',
      image: '/api/placeholder/150/150',
      bio: 'Meera manages our community guidelines, safety policies, and works closely with users to build a trustworthy platform.'
    }
  ];

  const values = [
    {
      title: 'Trust & Authenticity',
      description: 'We believe in building genuine connections based on trust and authentic profiles.',
      icon: Shield
    },
    {
      title: 'Respect & Inclusivity',
      description: 'We welcome people from all backgrounds and ensure everyone is treated with respect.',
      icon: Users
    },
    {
      title: 'Privacy & Safety',
      description: 'Your privacy and safety are our top priorities in everything we do.',
      icon: CheckCircle
    },
    {
      title: 'Innovation & Excellence',
      description: 'We continuously innovate to provide the best matchmaking experience.',
      icon: TrendingUp
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-secondary-600 text-white py-16 lg:py-24">
        <div className="container-responsive">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                Connecting Hearts, Creating Families
              </h1>
              <p className="text-xl text-primary-100 mb-8 leading-relaxed">
                MatrimonyApp is India's most trusted matrimonial platform, helping thousands 
                of people find their perfect life partner through our advanced matching technology 
                and personalized approach.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-300" />
                  <span>Verified Profiles</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-300" />
                  <span>Advanced Matching</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-300" />
                  <span>Safe & Secure</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <div className="grid grid-cols-2 gap-6">
                  {statistics.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                      <div key={index} className="text-center">
                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Icon className="w-6 h-6" />
                        </div>
                        <div className="text-2xl font-bold">{stat.number}</div>
                        <div className="text-primary-100 text-sm">{stat.label}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container-responsive">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Our Mission
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              To create meaningful connections and help people find their ideal life partners 
              through innovative technology, personalized service, and a commitment to safety and trust.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Icon className="w-8 h-8 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="container-responsive">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These core values guide everything we do and shape the experience we create for our users.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
                  <div className="flex items-start space-x-6">
                    <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">
                        {value.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container-responsive">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our passionate team is dedicated to helping you find your perfect match and 
              creating the best matrimonial experience possible.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <div className="relative mb-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-primary-100"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {member.name}
                </h3>
                <p className="text-primary-600 font-medium mb-4">
                  {member.role}
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories Preview */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-primary-50 to-secondary-50">
        <div className="container-responsive">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Success Stories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Thousands of couples have found love through MatrimonyApp. Here are just a few of their stories.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                names: 'Rahul & Priya',
                location: 'Mumbai',
                story: 'We found each other through MatrimonyApp and knew we were meant to be. Thank you for helping us find our perfect match!',
                image: '/api/placeholder/300/200'
              },
              {
                names: 'Arjun & Meera',
                location: 'Delhi',
                story: 'The matching algorithm was spot on! We connected instantly and got married last year. Highly recommend MatrimonyApp.',
                image: '/api/placeholder/300/200'
              },
              {
                names: 'Suresh & Anita',
                location: 'Bangalore',
                story: 'Professional, secure, and effective platform. We appreciate the verification process and found our soulmate here.',
                image: '/api/placeholder/300/200'
              }
            ].map((story, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{story.story}"</p>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <Heart className="w-6 h-6 text-primary-600 fill-current" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{story.names}</div>
                    <div className="text-sm text-gray-600">{story.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-primary-600 text-white">
        <div className="container-responsive text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready to Find Your Perfect Match?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-3xl mx-auto">
            Join thousands of others who have found love through MatrimonyApp. 
            Your perfect partner is waiting for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors text-lg">
              Join Now - It's Free
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors text-lg">
              Learn More
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
