import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useResponsive } from '../hooks/useResponsive';
import { 
  Heart, 
  X, 
  CheckCircle, 
  Filter, 
  Clock,
  Star,
  MessageCircle,
  Eye,
  Users,
  TrendingUp,
  Calendar,
  MapPin,
  GraduationCap,
  Briefcase
} from 'lucide-react';
import toast from 'react-hot-toast';

const Matches = () => {
  const { user } = useAuth();
  const { isMobile } = useResponsive();
  const [activeTab, setActiveTab] = useState('suggested');
  const [matches, setMatches] = useState([]);
  const [interestRequests, setInterestRequests] = useState({ sent: [], received: [] });
  const [filteredMatches, setFilteredMatches] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ 
    ageRange: [18, 60], 
    location: '',
    education: '',
    matchScore: 70
  });

  const tabs = [
    { id: 'suggested', name: 'Suggested Matches', icon: Heart, count: 24 },
    { id: 'received', name: 'Interest Received', icon: Users, count: 8 },
    { id: 'sent', name: 'Interest Sent', icon: TrendingUp, count: 12 },
    { id: 'mutual', name: 'Mutual Matches', icon: CheckCircle, count: 3 }
  ];

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    // Mock data loading
    setTimeout(() => {
      const mockMatches = [
        {
          id: '1',
          personalDetails: { firstName: 'Priya', lastName: 'S.', age: 27, height: '5\'4"' },
          contactDetails: { address: { city: 'Delhi', state: 'Delhi' } },
          religiousDetails: { religion: 'Hindu', caste: 'Brahmin' },
          educationDetails: { 
            highestQualification: 'MBA', 
            workAs: 'Software Engineer',
            annualIncome: '₹12-15 Lakhs'
          },
          photos: ['/api/placeholder/300/400'],
          aboutMe: 'Looking for a caring and understanding life partner.',
          matchScore: 95,
          lastActive: '2 hours ago',
          verified: true,
          premium: false,
          status: 'suggested',
          commonInterests: ['Reading', 'Traveling'],
          profileCompletion: 92
        },
        {
          id: '2',
          personalDetails: { firstName: 'Anita', lastName: 'P.', age: 25, height: '5\'2"' },
          contactDetails: { address: { city: 'Mumbai', state: 'Maharashtra' } },
          religiousDetails: { religion: 'Hindu', caste: 'Patel' },
          educationDetails: { 
            highestQualification: 'B.Tech', 
            workAs: 'Teacher',
            annualIncome: '₹5-8 Lakhs'
          },
          photos: ['/api/placeholder/300/400'],
          aboutMe: 'Family-oriented person who loves music and dance.',
          matchScore: 89,
          lastActive: '1 day ago',
          verified: true,
          premium: true,
          status: 'suggested',
          commonInterests: ['Music', 'Cooking'],
          profileCompletion: 88
        },
        {
          id: '3',
          personalDetails: { firstName: 'Meera', lastName: 'G.', age: 26, height: '5\'5"' },
          contactDetails: { address: { city: 'Bangalore', state: 'Karnataka' } },
          religiousDetails: { religion: 'Hindu', caste: 'Agarwal' },
          educationDetails: { 
            highestQualification: 'MBBS', 
            workAs: 'Doctor',
            annualIncome: '₹15-20 Lakhs'
          },
          photos: ['/api/placeholder/300/400'],
          aboutMe: 'Passionate about healthcare and helping others.',
          matchScore: 87,
          lastActive: '30 minutes ago',
          verified: true,
          premium: true,
          status: 'suggested',
          commonInterests: ['Yoga', 'Reading'],
          profileCompletion: 95
        }
      ];

      const mockInterestRequests = {
        received: [
          {
            id: 'ir1',
            senderId: 'u4',
            senderDetails: {
              name: 'Rahul M.',
              age: 29,
              location: 'Chennai',
              photo: '/api/placeholder/300/400',
              profession: 'Business Analyst'
            },
            message: 'Hi! I found your profile very interesting. Would love to connect.',
            sentAt: '2024-01-20T10:30:00Z',
            status: 'pending'
          },
          {
            id: 'ir2',
            senderId: 'u5',
            senderDetails: {
              name: 'Arjun K.',
              age: 28,
              location: 'Pune',
              photo: '/api/placeholder/300/400',
              profession: 'Software Developer'
            },
            message: 'Hello! I think we have a lot in common. Let\'s get to know each other.',
            sentAt: '2024-01-19T15:45:00Z',
            status: 'pending'
          }
        ],
        sent: [
          {
            id: 'is1',
            receiverId: 'u6',
            receiverDetails: {
              name: 'Kavya R.',
              age: 24,
              location: 'Hyderabad',
              photo: '/api/placeholder/300/400',
              profession: 'Marketing Manager'
            },
            message: 'Hi! Your profile caught my attention. Would like to connect.',
            sentAt: '2024-01-18T09:15:00Z',
            status: 'pending'
          },
          {
            id: 'is2',
            receiverId: 'u7',
            receiverDetails: {
              name: 'Sneha V.',
              age: 26,
              location: 'Kolkata',
              photo: '/api/placeholder/300/400',
              profession: 'Graphic Designer'
            },
            message: 'Hello! I believe we share similar interests.',
            sentAt: '2024-01-17T14:20:00Z',
            status: 'accepted'
          }
        ]
      };

      setMatches(mockMatches);
      setInterestRequests(mockInterestRequests);
      setFilteredMatches(mockMatches);
      setLoading(false);
    }, 1000);
  };

  const applyFilters = () => {
    const [min, max] = filters.ageRange;
    const filtered = matches.filter(match => {
      const ageMatch = match.personalDetails.age >= min && match.personalDetails.age <= max;
      const locationMatch = !filters.location || 
        match.contactDetails.address.city.toLowerCase().includes(filters.location.toLowerCase()) ||
        match.contactDetails.address.state.toLowerCase().includes(filters.location.toLowerCase());
      const educationMatch = !filters.education || 
        match.educationDetails.highestQualification.toLowerCase().includes(filters.education.toLowerCase());
      const scoreMatch = match.matchScore >= filters.matchScore;
      
      return ageMatch && locationMatch && educationMatch && scoreMatch;
    });
    setFilteredMatches(filtered);
  };

  const handleRangeChange = (index, value) => {
    const newRange = [...filters.ageRange];
    newRange[index] = Number(value);
    setFilters(prev => ({ ...prev, ageRange: newRange }));
  };

  const handleSendInterest = async (matchId) => {
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Interest sent successfully!');
      
      // Update local state
      setMatches(prev => prev.map(match => 
        match.id === matchId ? { ...match, interestSent: true } : match
      ));
    } catch (error) {
      toast.error('Failed to send interest');
    }
  };

  const handleRespondToInterest = async (requestId, response) => {
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setInterestRequests(prev => ({
        ...prev,
        received: prev.received.map(request =>
          request.id === requestId ? { ...request, status: response } : request
        )
      }));

      toast.success(`Interest ${response} successfully!`);
    } catch (error) {
      toast.error(`Failed to ${response} interest`);
    }
  };

  const MatchCard = ({ match }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative">
        <img
          src={match.photos[0]}
          alt={`${match.personalDetails.firstName} ${match.personalDetails.lastName}`}
          className="w-full h-64 object-cover"
        />
        
        {/* Match Score Badge */}
        <div className="absolute top-3 left-3 bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
          {match.matchScore}% Match
        </div>
        
        {/* Status Badges */}
        <div className="absolute top-3 right-3 flex flex-col space-y-2">
          {match.verified && (
            <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full flex items-center space-x-1">
              <CheckCircle className="w-3 h-3" />
              <span>Verified</span>
            </span>
          )}
          {match.premium && (
            <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
              Premium
            </span>
          )}
        </div>

        {/* Last Active */}
        <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
          {match.lastActive}
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {match.personalDetails.firstName} {match.personalDetails.lastName}
            </h3>
            <p className="text-gray-600 text-sm">
              {match.personalDetails.age} years, {match.personalDetails.height}
            </p>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500">Profile</div>
            <div className="text-sm font-medium text-primary-600">{match.profileCompletion}% complete</div>
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="w-4 h-4 mr-2" />
            {match.contactDetails.address.city}, {match.contactDetails.address.state}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <GraduationCap className="w-4 h-4 mr-2" />
            {match.educationDetails.highestQualification}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Briefcase className="w-4 h-4 mr-2" />
            {match.educationDetails.workAs}
          </div>
        </div>

        {/* Common Interests */}
        {match.commonInterests && match.commonInterests.length > 0 && (
          <div className="mb-4">
            <div className="text-sm font-medium text-gray-700 mb-2">Common Interests</div>
            <div className="flex flex-wrap gap-1">
              {match.commonInterests.map((interest, index) => (
                <span key={index} className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full">
                  {interest}
                </span>
              ))}
            </div>
          </div>
        )}

        <p className="text-sm text-gray-700 mb-4 line-clamp-2">
          {match.aboutMe}
        </p>

        <div className="flex space-x-2">
          <Link
            to={`/profile/${match.id}`}
            className="flex-1 bg-gray-100 text-gray-700 text-center py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
          >
            View Profile
          </Link>
          {!match.interestSent ? (
            <button
              onClick={() => handleSendInterest(match.id)}
              className="flex-1 bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium flex items-center justify-center space-x-1"
            >
              <Heart className="w-4 h-4" />
              <span>Send Interest</span>
            </button>
          ) : (
            <button
              disabled
              className="flex-1 bg-green-100 text-green-700 py-2 rounded-lg text-sm font-medium flex items-center justify-center space-x-1"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Interest Sent</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );

  const InterestRequestCard = ({ request, type }) => (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <div className="flex space-x-4">
        <img
          src={type === 'received' ? request.senderDetails.photo : request.receiverDetails.photo}
          alt="Profile"
          className="w-16 h-20 object-cover rounded-lg"
        />
        
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-semibold text-gray-900">
                {type === 'received' ? request.senderDetails.name : request.receiverDetails.name}
              </h3>
              <p className="text-sm text-gray-600">
                {type === 'received' ? request.senderDetails.age : request.receiverDetails.age} years • {' '}
                {type === 'received' ? request.senderDetails.location : request.receiverDetails.location}
              </p>
              <p className="text-sm text-gray-600">
                {type === 'received' ? request.senderDetails.profession : request.receiverDetails.profession}
              </p>
            </div>
            <div className="text-right">
              <div className="text-xs text-gray-500">
                {new Date(request.sentAt).toLocaleDateString()}
              </div>
              <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 ${
                request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                request.status === 'accepted' ? 'bg-green-100 text-green-800' :
                'bg-red-100 text-red-800'
              }`}>
                {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
              </span>
            </div>
          </div>

          {request.message && (
            <div className="bg-gray-50 rounded-lg p-3 mb-4">
              <p className="text-sm text-gray-700 italic">"{request.message}"</p>
            </div>
          )}

          <div className="flex space-x-3">
            {type === 'received' && request.status === 'pending' ? (
              <>
                <button
                  onClick={() => handleRespondToInterest(request.id, 'accepted')}
                  className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium flex items-center justify-center space-x-1"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>Accept</span>
                </button>
                <button
                  onClick={() => handleRespondToInterest(request.id, 'declined')}
                  className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors text-sm font-medium flex items-center justify-center space-x-1"
                >
                  <X className="w-4 h-4" />
                  <span>Decline</span>
                </button>
              </>
            ) : (
              <Link
                to={`/profile/${type === 'received' ? request.senderId : request.receiverId}`}
                className="flex-1 bg-primary-600 text-white text-center py-2 rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium"
              >
                View Profile
              </Link>
            )}
            {request.status === 'accepted' && (
              <Link
                to={`/messages/${type === 'received' ? request.senderId : request.receiverId}`}
                className="flex-1 bg-blue-600 text-white text-center py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center justify-center space-x-1"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Message</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    if (loading) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden animate-pulse">
              <div className="w-full h-64 bg-gray-200"></div>
              <div className="p-4">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded mb-4"></div>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 rounded"></div>
                  <div className="h-3 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }

    switch (activeTab) {
      case 'suggested':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMatches.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        );
      
      case 'received':
        return (
          <div className="space-y-6">
            {interestRequests.received.map((request) => (
              <InterestRequestCard key={request.id} request={request} type="received" />
            ))}
          </div>
        );
      
      case 'sent':
        return (
          <div className="space-y-6">
            {interestRequests.sent.map((request) => (
              <InterestRequestCard key={request.id} request={request} type="sent" />
            ))}
          </div>
        );
      
      case 'mutual':
        const mutualMatches = interestRequests.sent.filter(req => req.status === 'accepted');
        return (
          <div className="space-y-6">
            {mutualMatches.map((request) => (
              <InterestRequestCard key={request.id} request={request} type="sent" />
            ))}
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6 lg:py-8">
      <div className="container-responsive">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">Your Matches</h1>
          <p className="text-gray-600">
            Find your perfect life partner from our curated matches based on your preferences
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className={`flex ${isMobile ? 'space-x-2' : 'space-x-8'}`}>
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-primary-500 text-primary-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className={isMobile ? 'hidden' : 'block'}>{tab.name}</span>
                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                      {tab.count}
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Filters (only for suggested matches) */}
        {activeTab === 'suggested' && (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">
                {filteredMatches.length} matches found
              </h2>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Filter className="w-4 h-4" />
                <span>Filters</span>
              </button>
            </div>

            {showFilters && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Age Range</label>
                    <div className="flex space-x-2">
                      <input
                        type="number"
                        value={filters.ageRange[0]}
                        onChange={(e) => handleRangeChange(0, e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Min"
                      />
                      <input
                        type="number"
                        value={filters.ageRange[1]}
                        onChange={(e) => handleRangeChange(1, e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Max"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                    <input
                      type="text"
                      value={filters.location}
                      onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="City or State"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Education</label>
                    <input
                      type="text"
                      value={filters.education}
                      onChange={(e) => setFilters(prev => ({ ...prev, education: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Education level"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Min Match Score: {filters.matchScore}%
                    </label>
                    <input
                      type="range"
                      min="50"
                      max="100"
                      value={filters.matchScore}
                      onChange={(e) => setFilters(prev => ({ ...prev, matchScore: parseInt(e.target.value) }))}
                      className="w-full"
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-4 mt-6">
                  <button
                    onClick={() => setFilters({ ageRange: [18, 60], location: '', education: '', matchScore: 70 })}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Reset
                  </button>
                  <button
                    onClick={applyFilters}
                    className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        {/* Content */}
        {renderTabContent()}

        {/* Empty State */}
        {!loading && (
          <>
            {activeTab === 'suggested' && filteredMatches.length === 0 && (
              <div className="text-center py-12">
                <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No matches found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your filters or update your preferences</p>
                <Link
                  to="/edit-profile"
                  className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Update Preferences
                </Link>
              </div>
            )}

            {activeTab === 'received' && interestRequests.received.length === 0 && (
              <div className="text-center py-12">
                <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No interest requests yet</h3>
                <p className="text-gray-600">Interest requests from other users will appear here</p>
              </div>
            )}

            {activeTab === 'sent' && interestRequests.sent.length === 0 && (
              <div className="text-center py-12">
                <TrendingUp className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No interests sent yet</h3>
                <p className="text-gray-600 mb-6">Start sending interests to profiles you like</p>
                <Link
                  to="/search"
                  className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Browse Profiles
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Matches;
