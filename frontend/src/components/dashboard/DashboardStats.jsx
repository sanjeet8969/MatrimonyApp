import React from 'react';
import { TrendingUp, TrendingDown, Users, Heart, MessageCircle, Eye } from 'lucide-react';
import Card from '../common/Card';

const DashboardStats = ({ stats }) => {
  const statCards = [
    {
      title: 'Profile Views',
      value: stats?.profileViews || 0,
      change: '+12%',
      changeType: 'increase',
      icon: Eye,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Interests Received',
      value: stats?.interestsReceived || 0,
      change: '+5%',
      changeType: 'increase',
      icon: Heart,
      color: 'text-red-600',
      bgColor: 'bg-red-100'
    },
    {
      title: 'Messages',
      value: stats?.totalMessages || 0,
      change: '+8%',
      changeType: 'increase',
      icon: MessageCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Match Score',
      value: `${stats?.averageMatchScore || 0}%`,
      change: '-2%',
      changeType: 'decrease',
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((stat, index) => {
        const Icon = stat.icon;
        const TrendIcon = stat.changeType === 'increase' ? TrendingUp : TrendingDown;
        
        return (
          <Card key={index} className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <div className={`flex items-center space-x-1 mt-2 ${
                  stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                }`}>
                  <TrendIcon className="w-4 h-4" />
                  <span className="text-sm font-medium">{stat.change}</span>
                </div>
              </div>
              <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center`}>
                <Icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default DashboardStats;
