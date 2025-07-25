import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useResponsive } from '../hooks/useResponsive';
import { 
  Heart, 
  Users, 
  MessageCircle, 
  Search, 
  Eye, 
  Star,
  TrendingUp,
  Calendar,
  MapPin,
  User
} from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const { isMobile, isTablet } = useResponsive();
  const [stats, setStats] = useState({
    profileViews: 45,
    newMatches: 12,
    messages: 8,
    interests: 6
  });
  const [recentActivity, setRecentActivity] = useState([
    {
      id: 1,
      type: 'view',
      message: 'Priya S. viewed your profile',
      time: '2 hours ago',
      avatar: '/api/placeholder/40/40'
    },
    {
      id: 2,
      type: 'match',
      message: 'New match found: Rajesh K.',
      time: '4 hours ago',
      avatar: '/api/placeholder/40/40'
    },
    {
      id: 3,
      type: 'message',
      message: 'Anita M. sent you a message',
      time: '1 day ago',
      avatar: '/api/placeholder/40/40'
    },
    {
      id: 4,
      type: 'interest',
      message: 'Suresh P. showed interest in your profile',
      time: '2 days ago',
      avatar: '/api/placeholder/40/40'
    }
  ]);

  const statsCards = [
    {
      title: 'Profile Views',
      value: stats.profileViews,
      icon: Eye,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      change: '+12%'
    },
    {
      title: 'New Matches',
      value: stats.newMatches,
      icon: Heart,
      color: 'text-red-600',
      bgColor: 'bg-red-100',
      change: '+8%'
    },
    {
      title: 'Messages',
      value: stats.messages,
      icon: MessageCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      change: '+15%'
    },
    {
      title: 'Interests',
      value: stats.interests,
      icon: Star,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
      change: '+5%'
    }
  ];

  const quickActions = [
    {
      title: 'Search Profiles',
      description: 'Find your perfect match',
      icon: Search,
      link: '/search',
      color: 'bg-primary-600'
    },
    {
      title: 'View Matches',
      description: 'Check your compatibility',
      icon: Heart,
      link: '/matches',
      color: 'bg-red-600'
    },
    {
      title: 'Messages',
      description: 'Connect with matches',
      icon: MessageCircle,
      link: '/messages',
      color: 'bg-green-600'
    },
    {
      title: 'Edit Profile',
      description: 'Update your information',
      icon: User,
      link: '/edit-profile',
      color: 'bg-purple-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-6 lg:py-8">
      <div className="container-responsive">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl p-6 lg:p-8 text-white">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between">
              <div className="mb-4 lg:mb-0">
                <h1 className="text-2xl lg:text-3xl font-bold mb-2">
                  Welcome back, {user?.email?.split('@')[0]}!
                </h1>
                <p className="text-primary-100 text-lg">
                  Your journey to find love continues. You have {stats.newMatches} new matches waiting!
                </p>
              </div>
              <div className="flex-shrink-0">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                  <Heart className="w-10 h-10 fill-current" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
          {statsCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-xl p-4 lg:p-6 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-10 h-10 lg:w-12 lg:h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 lg:w-6 lg:h-6 ${stat.color}`} />
                  </div>
                  <span className="text-xs lg:text-sm text-green-600 font-medium">
                    {stat.change}
                  </span>
                </div>
                <div className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </div>
                <div className="text-xs lg:text-sm text-gray-600">
                  {stat.title}
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {quickActions.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <Link
                      key={index}
                      to={action.link}
                      className="block p-4 rounded-xl border border-gray-200 hover:border-primary-300 hover:shadow-md transition-all group"
                    >
                      <div className="flex items-start space-x-4">
                        <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center text-white group-hover:scale-110 transition-transform`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 mb-1">{action.title}</h3>
                          <p className="text-sm text-gray-600">{action.description}</p>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h2>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-gray-600" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900 mb-1">{activity.message}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link
                to="/activity"
                className="block w-full text-center text-primary-600 hover:text-primary-700 text-sm font-medium mt-4 pt-4 border-t border-gray-200"
              >
                View All Activity
              </Link>
            </div>
          </div>
        </div>

        {/* Profile Completion */}
        <div className="mt-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between">
              <div className="mb-4 lg:mb-0">
                <h2 className="text-xl font-bold text-gray-900 mb-2">Complete Your Profile</h2>
                <p className="text-gray-600">
                  A complete profile gets 5x more matches. Add more details to increase your visibility.
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary-600">75%</div>
                  <div className="text-sm text-gray-600">Complete</div>
                </div>
                <Link
                  to="/edit-profile"
                  className="bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
                >
                  Complete Profile
                </Link>
              </div>
            </div>
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-primary-600 h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Success Stories */}
        <div className="mt-8">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 lg:p-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Success Stories</h2>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                "We met through MatrimonyApp and got married last year. Thank you for helping us find each other!"
              </p>
              <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
                <span>- Rahul & Priya</span>
                <span>•</span>
                <span>Married in 2023</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
