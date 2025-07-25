import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useResponsive } from '../hooks/useResponsive.js';
import { 
  Users, 
  UserCheck, 
  Heart, 
  MessageCircle, 
  TrendingUp, 
  Shield,
  Settings,
  BarChart3,
  Eye,
  AlertTriangle,
  CheckCircle,
  X,
  Search,
  Filter,
  Download
} from 'lucide-react';

const AdminPanel = () => {
  const { user } = useAuth();
  const { isMobile } = useResponsive();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    totalMatches: 0,
    totalMessages: 0,
    newUsersToday: 0,
    successRate: 0
  });
  const [users, setUsers] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  const tabs = [
    { id: 'dashboard', name: 'Dashboard', icon: BarChart3 },
    { id: 'users', name: 'User Management', icon: Users },
    { id: 'profiles', name: 'Profile Moderation', icon: UserCheck },
    { id: 'matches', name: 'Matches & Activity', icon: Heart },
    { id: 'reports', name: 'Reports & Analytics', icon: TrendingUp },
    { id: 'safety', name: 'Safety & Security', icon: Shield },
    { id: 'settings', name: 'Platform Settings', icon: Settings }
  ];

  // Mock data loading
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      // Simulate API calls
      setTimeout(() => {
        setStats({
          totalUsers: 52486,
          activeUsers: 15742,
          totalMatches: 18569,
          totalMessages: 245810,
          newUsersToday: 127,
          successRate: 89.5
        });

        setUsers([
          {
            id: '1',
            name: 'Priya Sharma',
            email: 'priya@example.com',
            status: 'active',
            joinDate: '2024-01-15',
            lastActive: '2 hours ago',
            profileComplete: 95
          },
          {
            id: '2',
            name: 'Rahul Patel',
            email: 'rahul@example.com',
            status: 'suspended',
            joinDate: '2024-01-10',
            lastActive: '1 day ago',
            profileComplete: 78
          }
        ]);

        setProfiles([
          {
            id: '1',
            userId: '1',
            name: 'Priya Sharma',
            status: 'pending',
            submittedAt: '2024-01-20',
            reason: 'Profile photo verification needed'
          },
          {
            id: '2',
            userId: '2',
            name: 'Anita Gupta',
            status: 'approved',
            submittedAt: '2024-01-19',
            reason: null
          }
        ]);

        setLoading(false);
      }, 1000);
    };

    loadData();
  }, []);

  const handleUserAction = (userId, action) => {
    // Handle user management actions
    console.log(`${action} user ${userId}`);
  };

  const handleProfileModeration = (profileId, action) => {
    // Handle profile moderation
    console.log(`${action} profile ${profileId}`);
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Total Users', value: stats.totalUsers.toLocaleString(), icon: Users, color: 'text-blue-600', bg: 'bg-blue-100' },
          { title: 'Active Users', value: stats.activeUsers.toLocaleString(), icon: UserCheck, color: 'text-green-600', bg: 'bg-green-100' },
          { title: 'Total Matches', value: stats.totalMatches.toLocaleString(), icon: Heart, color: 'text-red-600', bg: 'bg-red-100' },
          { title: 'Messages Today', value: stats.totalMessages.toLocaleString(), icon: MessageCircle, color: 'text-purple-600', bg: 'bg-purple-100' }
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 ${stat.bg} rounded-xl flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[
              { type: 'user', action: 'New user registered', user: 'Priya Sharma', time: '5 min ago' },
              { type: 'match', action: 'New match created', user: 'Rahul & Anita', time: '15 min ago' },
              { type: 'report', action: 'User reported', user: 'Profile #1234', time: '1 hour ago' },
              { type: 'profile', action: 'Profile approved', user: 'Meera Patel', time: '2 hours ago' }
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                <div>
                  <p className="font-medium text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-600">{activity.user}</p>
                </div>
                <span className="text-xs text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              { title: 'Pending Profiles', count: 12, color: 'bg-yellow-100 text-yellow-800' },
              { title: 'Reported Users', count: 3, color: 'bg-red-100 text-red-800' },
              { title: 'New Messages', count: 45, color: 'bg-blue-100 text-blue-800' },
              { title: 'Support Tickets', count: 8, color: 'bg-purple-100 text-purple-800' }
            ].map((item, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                <div className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${item.color} mb-2`}>
                  {item.count}
                </div>
                <p className="text-sm font-medium text-gray-900">{item.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderUserManagement = () => (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search users by name, email, or ID..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter className="w-4 h-4" />
            <span>Filters</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">All Users</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Join Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Active</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Profile</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      user.status === 'active' ? 'bg-green-100 text-green-800' : 
                      user.status === 'suspended' ? 'bg-red-100 text-red-800' : 
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.joinDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.lastActive}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.profileComplete}% complete</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                      onClick={() => handleUserAction(user.id, 'view')}
                      className="text-primary-600 hover:text-primary-900"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleUserAction(user.id, 'suspend')}
                      className="text-red-600 hover:text-red-900"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderProfileModeration = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Pending Profile Reviews</h3>
        <div className="space-y-4">
          {profiles.filter(p => p.status === 'pending').map((profile) => (
            <div key={profile.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">{profile.name}</h4>
                  <p className="text-sm text-gray-600">Submitted: {profile.submittedAt}</p>
                  {profile.reason && (
                    <p className="text-sm text-amber-600 mt-1">⚠️ {profile.reason}</p>
                  )}
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleProfileModeration(profile.id, 'approve')}
                    className="flex items-center space-x-1 px-3 py-1 bg-green-100 text-green-800 rounded-lg hover:bg-green-200"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Approve</span>
                  </button>
                  <button
                    onClick={() => handleProfileModeration(profile.id, 'reject')}
                    className="flex items-center space-x-1 px-3 py-1 bg-red-100 text-red-800 rounded-lg hover:bg-red-200"
                  >
                    <X className="w-4 h-4" />
                    <span>Reject</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return renderDashboard();
      case 'users':
        return renderUserManagement();
      case 'profiles':
        return renderProfileModeration();
      default:
        return (
          <div className="bg-white rounded-2xl p-12 shadow-sm border border-gray-200 text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {tabs.find(t => t.id === activeTab)?.name}
            </h3>
            <p className="text-gray-600">This section is under development.</p>
          </div>
        );
    }
  };

  if (user?.role !== 'admin') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600">You don't have permission to access the admin panel.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-responsive py-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Panel</h1>
          <p className="text-gray-600">Manage users, moderate content, and monitor platform activity</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200 sticky top-6">
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                        activeTab === tab.id
                          ? 'bg-primary-50 text-primary-700 border border-primary-200'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className={`${isMobile ? 'text-sm' : 'text-base'}`}>{tab.name}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-4">
            {loading ? (
              <div className="bg-white rounded-2xl p-12 shadow-sm border border-gray-200 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading admin data...</p>
              </div>
            ) : (
              renderTabContent()
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
