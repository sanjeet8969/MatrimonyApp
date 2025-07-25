import React from 'react';
import { Bell, Heart, MessageCircle, User, Eye, X } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const NotificationList = ({ 
  notifications = [], 
  onMarkAsRead, 
  onMarkAllAsRead,
  onDelete 
}) => {
  const getNotificationIcon = (type) => {
    const iconMap = {
      interest: Heart,
      message: MessageCircle,
      profile_view: Eye,
      new_match: User,
      general: Bell
    };
    return iconMap[type] || Bell;
  };

  const getNotificationColor = (type) => {
    const colorMap = {
      interest: 'text-red-500',
      message: 'text-blue-500',
      profile_view: 'text-green-500',
      new_match: 'text-purple-500',
      general: 'text-gray-500'
    };
    return colorMap[type] || 'text-gray-500';
  };

  if (notifications.length === 0) {
    return (
      <div className="text-center py-12">
        <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications</h3>
        <p className="text-gray-600">You're all caught up!</p>
      </div>
    );
  }

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">
          Notifications {unreadCount > 0 && (
            <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full ml-2">
              {unreadCount} new
            </span>
          )}
        </h2>
        
        {unreadCount > 0 && (
          <button
            onClick={onMarkAllAsRead}
            className="text-sm text-primary-600 hover:text-primary-700 font-medium"
          >
            Mark all as read
          </button>
        )}
      </div>

      {/* Notifications */}
      <div className="space-y-2">
        {notifications.map((notification) => {
          const Icon = getNotificationIcon(notification.type);
          const iconColor = getNotificationColor(notification.type);
          
          return (
            <div
              key={notification.id}
              className={`flex items-start space-x-3 p-4 rounded-lg border transition-colors ${
                notification.isRead 
                  ? 'bg-white border-gray-200' 
                  : 'bg-blue-50 border-blue-200'
              }`}
            >
              <div className={`w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center ${iconColor}`}>
                <Icon className="w-5 h-5" />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className={`text-sm font-medium ${
                      notification.isRead ? 'text-gray-900' : 'text-gray-900'
                    }`}>
                      {notification.title}
                    </h4>
                    <p className={`text-sm mt-1 ${
                      notification.isRead ? 'text-gray-600' : 'text-gray-700'
                    }`}>
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    {!notification.isRead && (
                      <button
                        onClick={() => onMarkAsRead(notification.id)}
                        className="text-xs text-primary-600 hover:text-primary-700 font-medium"
                      >
                        Mark read
                      </button>
                    )}
                    
                    <button
                      onClick={() => onDelete(notification.id)}
                      className="p-1 text-gray-400 hover:text-red-500"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NotificationList;
