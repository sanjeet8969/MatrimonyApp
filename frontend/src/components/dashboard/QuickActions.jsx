import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Heart, MessageCircle, Settings, User, Edit } from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';

const QuickActions = ({ profileCompletion }) => {
  const actions = [
    {
      title: 'Complete Profile',
      description: 'Add more details to get better matches',
      icon: Edit,
      link: '/edit-profile',
      variant: 'primary',
      show: profileCompletion < 90
    },
    {
      title: 'Browse Profiles',
      description: 'Find your perfect match',
      icon: Search,
      link: '/search',
      variant: 'outline'
    },
    {
      title: 'View Matches',
      description: 'See your compatible matches',
      icon: Heart,
      link: '/matches',
      variant: 'outline'
    },
    {
      title: 'Messages',
      description: 'Chat with your connections',
      icon: MessageCircle,
      link: '/messages',
      variant: 'outline'
    },
    {
      title: 'My Profile',
      description: 'View and edit your profile',
      icon: User,
      link: '/profile',
      variant: 'ghost'
    },
    {
      title: 'Settings',
      description: 'Manage preferences',
      icon: Settings,
      link: '/settings',
      variant: 'ghost'
    }
  ];

  const visibleActions = actions.filter(action => action.show !== false);

  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {visibleActions.map((action, index) => {
          const Icon = action.icon;
          return (
            <Link
              key={index}
              to={action.link}
              className="group p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-all"
            >
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-gray-100 group-hover:bg-primary-100 rounded-lg flex items-center justify-center transition-colors">
                  <Icon className="w-5 h-5 text-gray-600 group-hover:text-primary-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-900 group-hover:text-primary-900 mb-1">
                    {action.title}
                  </h3>
                  <p className="text-sm text-gray-600 group-hover:text-primary-700">
                    {action.description}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </Card>
  );
};

export default QuickActions;
