import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Eye, Heart, MessageCircle, UserPlus, Settings } from 'lucide-react';
import Card from '../common/Card';
import Avatar from '../ui/Avatar';

const RecentActivity = ({ activities = [] }) => {
  const getActivityIcon = (type) => {
    const iconMap = {
      profile_view: Eye,
      interest_received: Heart,
      message_received: MessageCircle,
      new_match: UserPlus,
      profile_update: Settings
    };
    return iconMap[type] || Eye;
  };

  const getActivityColor = (type) => {
    const colorMap = {
      profile_view: 'text-blue-600',
      interest_received: 'text-red-600',
      message_received: 'text-green-600',
      new_match: 'text-purple-600',
      profile_update: 'text-gray-600'
    };
    return colorMap[type] || 'text-gray-600';
  };

  if (activities.length === 0) {
    return (
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Recent Activity</h2>
        <div className="text-center py-8">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Eye className="w-6 h-6 text-gray-400" />
          </div>
          <p className="text-gray-600">No recent activity</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Recent Activity</h2>
      
      <div className="space-y-4">
        {activities.slice(0, 5).map((activity) => {
          const Icon = getActivityIcon(activity.type);
          const iconColor = getActivityColor(activity.type);
          
          return (
            <div key={activity.id} className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <div className={`w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center ${iconColor}`}>
                <Icon className="w-5 h-5" />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  {activity.user && (
                    <Avatar
                      src={activity.user.avatar}
                      name={activity.user.name}
                      size="sm"
                    />
                  )}
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {activity.title}
                    </p>
                    <p className="text-sm text-gray-600">
                      {activity.description}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="text-xs text-gray-500">
                {formatDistanceToNow(new Date(activity.createdAt), { addSuffix: true })}
              </div>
            </div>
          );
        })}
      </div>
      
      {activities.length > 5 && (
        <div className="mt-4 text-center">
          <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
            View all activity
          </button>
        </div>
      )}
    </Card>
  );
};

export default RecentActivity;
