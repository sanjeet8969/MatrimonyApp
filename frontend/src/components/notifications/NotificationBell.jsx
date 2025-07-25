import React, { useState, useRef, useEffect } from 'react';
import { Bell, X } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const NotificationBell = ({ notifications = [], onMarkAsRead, onMarkAllAsRead }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Notification Dropdown */}
      {isOpen && (
        <div className="absolute right-0 top-12 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h3 className="font-semibold text-gray-900">Notifications</h3>
            {unreadCount > 0 && (
              <button
                onClick={onMarkAllAsRead}
                className="text-sm text-primary-600 hover:text-primary-700"
              >
                Mark all as read
              </button>
            )}
          </div>

          {/* Notifications List */}
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <Bell className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No notifications yet</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  onMarkAsRead={onMarkAsRead}
                />
              ))
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="p-3 border-t border-gray-200 text-center">
              <button className="text-sm text-primary-600 hover:text-primary-700">
                View all notifications
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const NotificationItem = ({ notification, onMarkAsRead }) => {
  const handleClick = () => {
    if (!notification.isRead) {
      onMarkAsRead(notification.id);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
        !notification.isRead ? 'bg-blue-50' : ''
      }`}
    >
      <div className="flex items-start space-x-3">
        <div className={`w-2 h-2 rounded-full mt-2 ${
          notification.isRead ? 'bg-transparent' : 'bg-blue-500'
        }`} />
        
        <div className="flex-1 min-w-0">
          <p className={`text-sm ${
            notification.isRead ? 'text-gray-600' : 'text-gray-900 font-medium'
          }`}>
            {notification.title}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            {notification.message}
          </p>
          <p className="text-xs text-gray-400 mt-2">
            {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotificationBell;
