import React from 'react';
import { Users, UserCheck, MessageSquare, Heart, TrendingUp, AlertTriangle } from 'lucide-react';
import Card from '../common/Card';
import AnalyticsChart from './AnalyticsChart';

const AdminDashboard = ({ stats, chartData }) => {
  const statCards = [
    {
      title: 'Total Users',
      value: stats?.totalUsers || 0,
      change: '+12%',
      changeType: 'positive',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Active Profiles',
      value: stats?.activeProfiles || 0,
      change: '+8%',
      changeType: 'positive',
      icon: UserCheck,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Messages Today',
      value: stats?.messagesToday || 0,
      change: '+15%',
      changeType: 'positive',
      icon: MessageSquare,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      title: 'Matches Made',
      value: stats?.matchesMade || 0,
      change: '+5%',
      changeType: 'positive',
      icon: Heart,
      color: 'text-red-600',
      bgColor: 'bg-red-100'
    }
  ];

  const recentActivity = [
    { id: 1, action: 'New user registration', user: 'John Doe', time: '2 min ago', type: 'user' },
    { id: 2, action: 'Profile reported', user: 'Jane Smith', time: '5 min ago', type: 'report' },
    { id: 3, action: 'Premium subscription', user: 'Mike Johnson', time: '10 min ago', type: 'payment' },
    { id: 4, action: 'Match created', user: 'Sarah Wilson', time: '15 min ago', type: 'match' }
  ];

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value.toLocaleString()}</p>
                  <div className="flex items-center space-x-1 mt-2">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-green-600 font-medium">{stat.change}</span>
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

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">User Growth</h3>
          <AnalyticsChart data={chartData?.userGrowth} title="New Users Over Time" />
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Match Success Rate</h3>
          <AnalyticsChart data={chartData?.matchSuccess} title="Successful Matches" />
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
          <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
            View All
          </button>
        </div>

        <div className="space-y-4">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                activity.type === 'user' ? 'bg-blue-100' :
                activity.type === 'report' ? 'bg-red-100' :
                activity.type === 'payment' ? 'bg-green-100' :
                'bg-purple-100'
              }`}>
                {activity.type === 'user' && <Users className="w-5 h-5 text-blue-600" />}
                {activity.type === 'report' && <AlertTriangle className="w-5 h-5 text-red-600" />}
                {activity.type === 'payment' && <TrendingUp className="w-5 h-5 text-green-600" />}
                {activity.type === 'match' && <Heart className="w-5 h-5 text-purple-600" />}
              </div>
              
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                <p className="text-sm text-gray-600">by {activity.user}</p>
              </div>
              
              <span className="text-xs text-gray-500">{activity.time}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default AdminDashboard;
