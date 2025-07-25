import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useResponsive } from '../hooks/useResponsive';
import { 
  User, 
  Lock, 
  Bell, 
  Shield, 
  Eye,
  Trash2,
  Moon,
  Sun,
  Globe,
  CreditCard,
  LogOut,
  Save,
  Check,
  X,
  AlertTriangle,
  Settings as SettingsIcon,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';
import toast from 'react-hot-toast';

const Settings = () => {
  const { user, logout } = useAuth();
  const { isMobile } = useResponsive();
  const [activeTab, setActiveTab] = useState('account');
  const [loading, setLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [settings, setSettings] = useState({
    account: {
      email: user?.email || '',
      phone: '+91 9876543210',
      name: 'John Doe',
      location: 'Mumbai, Maharashtra'
    },
    privacy: {
      profileVisibility: 'public',
      showOnlineStatus: true,
      allowMessages: 'matches_only',
      showPhotos: 'all',
      shareContactInfo: false
    },
    notifications: {
      emailNotifications: true,
      pushNotifications: true,
      newMatches: true,
      messages: true,
      interestRequests: true,
      profileViews: false,
      promotions: false
    },
    preferences: {
      theme: 'light',
      language: 'english',
      currency: 'inr',
      autoPlayVideos: false,
      dataUsage: 'standard'
    },
    security: {
      twoFactorAuth: false,
      loginAlerts: true,
      sessionTimeout: '24h'
    }
  });

  const tabs = [
    { id: 'account', name: 'Account', icon: User },
    { id: 'privacy', name: 'Privacy', icon: Shield },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'security', name: 'Security', icon: Lock },
    { id: 'preferences', name: 'Preferences', icon: SettingsIcon },
    { id: 'subscription', name: 'Subscription', icon: CreditCard }
  ];

  const handleSettingChange = (category, key, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value
      }
    }));
  };

  const handleSaveSettings = async () => {
    setLoading(true);
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success('Settings saved successfully!');
    } catch (error) {
      toast.error('Failed to save settings');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Mock API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        toast.success('Account deleted successfully');
        logout();
      } catch (error) {
        toast.error('Failed to delete account');
      }
    }
    setShowDeleteModal(false);
  };

  const renderAccountSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="email"
              value={settings.account.email}
              onChange={(e) => handleSettingChange('account', 'email', e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="tel"
              value={settings.account.phone}
              onChange={(e) => handleSettingChange('account', 'phone', e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={settings.account.name}
              onChange={(e) => handleSettingChange('account', 'name', e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={settings.account.location}
              onChange={(e) => handleSettingChange('account', 'location', e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-medium text-blue-900 mb-2">Account Verification</h4>
        <p className="text-blue-700 text-sm mb-3">
          Verify your account to increase trust and get more matches.
        </p>
        <div className="flex space-x-4">
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            Verify Email
          </button>
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            Verify Phone
          </button>
        </div>
      </div>
    </div>
  );

  const renderPrivacySettings = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">Profile Visibility</label>
        <div className="space-y-3">
          {[
            { value: 'public', label: 'Public', desc: 'Visible to all users' },
            { value: 'matches_only', label: 'Matches Only', desc: 'Visible to matched users only' },
            { value: 'private', label: 'Private', desc: 'Only you can see your profile' }
          ].map((option) => (
            <label key={option.value} className="flex items-start space-x-3 cursor-pointer">
              <input
                type="radio"
                name="profileVisibility"
                value={option.value}
                checked={settings.privacy.profileVisibility === option.value}
                onChange={(e) => handleSettingChange('privacy', 'profileVisibility', e.target.value)}
                className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500 mt-0.5"
              />
              <div>
                <div className="font-medium text-gray-900">{option.label}</div>
                <div className="text-sm text-gray-600">{option.desc}</div>
              </div>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">Who can message you?</label>
        <select
          value={settings.privacy.allowMessages}
          onChange={(e) => handleSettingChange('privacy', 'allowMessages', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        >
          <option value="everyone">Everyone</option>
          <option value="matches_only">Matches Only</option>
          <option value="premium_only">Premium Members Only</option>
          <option value="none">No One</option>
        </select>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-medium text-gray-900">Show Online Status</div>
            <div className="text-sm text-gray-600">Let others see when you're online</div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.privacy.showOnlineStatus}
              onChange={(e) => handleSettingChange('privacy', 'showOnlineStatus', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
          </label>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <div className="font-medium text-gray-900">Share Contact Information</div>
            <div className="text-sm text-gray-600">Allow matches to see your contact details</div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.privacy.shareContactInfo}
              onChange={(e) => handleSettingChange('privacy', 'shareContactInfo', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
          </label>
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Preferences</h3>
        
        <div className="space-y-4">
          {[
            { key: 'emailNotifications', label: 'Email Notifications', desc: 'Receive notifications via email' },
            { key: 'pushNotifications', label: 'Push Notifications', desc: 'Receive push notifications on your device' },
            { key: 'newMatches', label: 'New Matches', desc: 'Get notified when you have new matches' },
            { key: 'messages', label: 'Messages', desc: 'Get notified when you receive messages' },
            { key: 'interestRequests', label: 'Interest Requests', desc: 'Get notified when someone shows interest' },
            { key: 'profileViews', label: 'Profile Views', desc: 'Get notified when someone views your profile' },
            { key: 'promotions', label: 'Promotions', desc: 'Receive promotional offers and updates' }
          ].map((notification) => (
            <div key={notification.key} className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900">{notification.label}</div>
                <div className="text-sm text-gray-600">{notification.desc}</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.notifications[notification.key]}
                  onChange={(e) => handleSettingChange('notifications', notification.key, e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Password & Security</h3>
        
        <div className="space-y-4">
          <button className="w-full text-left p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900">Change Password</div>
                <div className="text-sm text-gray-600">Update your account password</div>
              </div>
              <Lock className="w-5 h-5 text-gray-400" />
            </div>
          </button>

          <div className="flex items-center justify-between p-4 border border-gray-300 rounded-lg">
            <div>
              <div className="font-medium text-gray-900">Two-Factor Authentication</div>
              <div className="text-sm text-gray-600">Add an extra layer of security to your account</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.security.twoFactorAuth}
                onChange={(e) => handleSettingChange('security', 'twoFactorAuth', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 border border-gray-300 rounded-lg">
            <div>
              <div className="font-medium text-gray-900">Login Alerts</div>
              <div className="text-sm text-gray-600">Get notified of suspicious login attempts</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.security.loginAlerts}
                onChange={(e) => handleSettingChange('security', 'loginAlerts', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Session Management</h3>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Session Timeout</label>
          <select
            value={settings.security.sessionTimeout}
            onChange={(e) => handleSettingChange('security', 'sessionTimeout', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="1h">1 Hour</option>
            <option value="6h">6 Hours</option>
            <option value="24h">24 Hours</option>
            <option value="7d">7 Days</option>
            <option value="30d">30 Days</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderPreferencesSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
          <div className="flex space-x-4">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="theme"
                value="light"
                checked={settings.preferences.theme === 'light'}
                onChange={(e) => handleSettingChange('preferences', 'theme', e.target.value)}
                className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
              />
              <Sun className="w-5 h-5 text-yellow-500" />
              <span>Light</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="theme"
                value="dark"
                checked={settings.preferences.theme === 'dark'}
                onChange={(e) => handleSettingChange('preferences', 'theme', e.target.value)}
                className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
              />
              <Moon className="w-5 h-5 text-blue-500" />
              <span>Dark</span>
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
          <div className="relative">
            <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={settings.preferences.language}
              onChange={(e) => handleSettingChange('preferences', 'language', e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="english">English</option>
              <option value="hindi">हिंदी (Hindi)</option>
              <option value="gujarati">ગુજરાતી (Gujarati)</option>
              <option value="marathi">मराठी (Marathi)</option>
              <option value="tamil">தமிழ் (Tamil)</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
          <select
            value={settings.preferences.currency}
            onChange={(e) => handleSettingChange('preferences', 'currency', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="inr">INR (₹)</option>
            <option value="usd">USD ($)</option>
            <option value="eur">EUR (€)</option>
            <option value="gbp">GBP (£)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Data Usage</label>
          <select
            value={settings.preferences.dataUsage}
            onChange={(e) => handleSettingChange('preferences', 'dataUsage', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="low">Low (Save Data)</option>
            <option value="standard">Standard</option>
            <option value="high">High (Best Quality)</option>
          </select>
        </div>
      </div>

      <div className="flex items-center justify-between p-4 border border-gray-300 rounded-lg">
        <div>
          <div className="font-medium text-gray-900">Auto-play Videos</div>
          <div className="text-sm text-gray-600">Automatically play videos in feed</div>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={settings.preferences.autoPlayVideos}
            onChange={(e) => handleSettingChange('preferences', 'autoPlayVideos', e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
        </label>
      </div>
    </div>
  );

  const renderSubscriptionSettings = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl p-6 text-white">
        <h3 className="text-xl font-bold mb-2">Premium Membership</h3>
        <p className="text-primary-100 mb-4">Unlock exclusive features and find your match faster</p>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold">₹999/month</div>
            <div className="text-primary-100 text-sm">Billed monthly</div>
          </div>
          <button className="bg-white text-primary-600 px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">
            Upgrade Now
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border border-gray-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-3">Free Plan</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-green-500" />
              <span>Basic profile creation</span>
            </li>
            <li className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-green-500" />
              <span>Limited matches per day</span>
            </li>
            <li className="flex items-center space-x-2">
              <X className="w-4 h-4 text-red-500" />
              <span>Advanced search filters</span>
            </li>
            <li className="flex items-center space-x-2">
              <X className="w-4 h-4 text-red-500" />
              <span>Priority customer support</span>
            </li>
          </ul>
        </div>

        <div className="border border-primary-200 bg-primary-50 rounded-lg p-4">
          <h4 className="font-semibold text-primary-900 mb-3">Premium Plan</h4>
          <ul className="space-y-2 text-sm text-primary-700">
            <li className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-green-500" />
              <span>Unlimited matches</span>
            </li>
            <li className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-green-500" />
              <span>Advanced search filters</span>
            </li>
            <li className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-green-500" />
              <span>See who liked your profile</span>
            </li>
            <li className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-green-500" />
              <span>Priority customer support</span>
            </li>
            <li className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-green-500" />
              <span>Ad-free experience</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border border-gray-200 rounded-lg p-4">
        <h4 className="font-semibold text-gray-900 mb-3">Billing History</h4>
        <div className="text-sm text-gray-600">
          <p>No billing history available.</p>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'account':
        return renderAccountSettings();
      case 'privacy':
        return renderPrivacySettings();
      case 'notifications':
        return renderNotificationSettings();
      case 'security':
        return renderSecuritySettings();
      case 'preferences':
        return renderPreferencesSettings();
      case 'subscription':
        return renderSubscriptionSettings();
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6 lg:py-8">
      <div className="container-responsive">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Settings</h1>
          <p className="text-gray-600">Manage your account preferences and privacy settings</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
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

              {/* Quick Actions */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="space-y-2">
                  <button
                    onClick={logout}
                    className="w-full flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Sign Out</span>
                  </button>
                  
                  <button
                    onClick={() => setShowDeleteModal(true)}
                    className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                    <span>Delete Account</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  {tabs.find(t => t.id === activeTab)?.name}
                </h2>
                <button
                  onClick={handleSaveSettings}
                  disabled={loading}
                  className="flex items-center space-x-2 bg-primary-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      <span>Save Changes</span>
                    </>
                  )}
                </button>
              </div>

              {renderTabContent()}
            </div>
          </div>
        </div>

        {/* Delete Account Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-6 max-w-md w-full">
              <div className="flex items-center space-x-3 mb-4">
                <AlertTriangle className="w-6 h-6 text-red-500" />
                <h3 className="text-lg font-semibold text-gray-900">Delete Account</h3>
              </div>
              
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete your account? This action cannot be undone and will permanently remove all your data.
              </p>
              
              <div className="flex space-x-4">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteAccount}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
