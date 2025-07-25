import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useResponsive } from '../hooks/useResponsive';
import { 
  Search as SearchIcon, 
  Filter, 
  Heart, 
  MessageCircle, 
  MapPin, 
  Calendar,
  GraduationCap,
  Briefcase,
  SlidersHorizontal,
  X,
  ChevronDown,
  Grid3x3,
  List,
  Bookmark,
  Share2,
  Eye,
  Star
} from 'lucide-react';
import toast from 'react-hot-toast';

const Search = () => {
  const { isMobile, isTablet } = useResponsive();
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profiles, setProfiles] = useState([]);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [sortBy, setSortBy] = useState('relevance');
  const [savedSearches, setSavedSearches] = useState([]);

  const [filters, setFilters] = useState({
    ageRange: { min: 18, max: 60 },
    heightRange: { min: '', max: '' },
    religion: '',
    caste: '',
    location: '',
    education: '',
    occupation: '',
    income: { min: '', max: '' },
    maritalStatus: 'never_married',
    drinkingHabits: '',
    smokingHabits: '',
    dietaryHabits: '',
    bodyType: '',
    complexion: ''
  });

  // Mock profiles data with more detailed information
  const mockProfiles = [
    {
      id: '1',
      personalDetails: {
        firstName: 'Priya',
        lastName: 'Sharma',
        age: 26,
        height: '5\'4"',
        dateOfBirth: '1997-05-15'
      },
      contactDetails: {
        address: { 
          city: 'Mumbai', 
          state: 'Maharashtra',
          country: 'India'
        }
      },
      religiousDetails: {
        religion: 'Hindu',
        caste: 'Brahmin',
        mothertongue: 'Hindi'
      },
      educationDetails: {
        highestQualification: 'MBA',
        workAs: 'Software Engineer',
        workingWith: 'Private Company',
        annualIncome: '₹12-15 Lakhs'
      },
      photos: ['/api/placeholder/300/400'],
      aboutMe: 'Looking for a life partner who shares similar values and has a good sense of humor.',
      lastActive: '2 hours ago',
      verified: true,
      premium: false,
      profileCompletion: 95,
      lifestyle: {
        drinkingHabits: 'Never',
        smokingHabits: 'Never',
        dietaryHabits: 'Vegetarian'
      },
      hobbies: ['Reading', 'Traveling', 'Cooking'],
      matchPercentage: 92
    },
    {
      id: '2',
      personalDetails: {
        firstName: 'Anita',
        lastName: 'Patel',
        age: 24,
        height: '5\'2"',
        dateOfBirth: '1999-08-20'
      },
      contactDetails: {
        address: { 
          city: 'Ahmedabad', 
          state: 'Gujarat',
          country: 'India'
        }
      },
      religiousDetails: {
        religion: 'Hindu',
        caste: 'Patel',
        mothertongue: 'Gujarati'
      },
      educationDetails: {
        highestQualification: 'B.Tech',
        workAs: 'Teacher',
        workingWith: 'Government',
        annualIncome: '₹5-8 Lakhs'
      },
      photos: ['/api/placeholder/300/400'],
      aboutMe: 'Family-oriented person who loves traveling and exploring new cultures.',
      lastActive: '1 day ago',
      verified: true,
      premium: true,
      profileCompletion: 88,
      lifestyle: {
        drinkingHabits: 'Never',
        smokingHabits: 'Never',
        dietaryHabits: 'Vegetarian'
      },
      hobbies: ['Dancing', 'Photography', 'Music'],
      matchPercentage: 87
    },
    {
      id: '3',
      personalDetails: {
        firstName: 'Meera',
        lastName: 'Gupta',
        age: 28,
        height: '5\'6"',
        dateOfBirth: '1995-12-10'
      },
      contactDetails: {
        address: { 
          city: 'Delhi', 
          state: 'Delhi',
          country: 'India'
        }
      },
      religiousDetails: {
        religion: 'Hindu',
        caste: 'Agarwal',
        mothertongue: 'Hindi'
      },
      educationDetails: {
        highestQualification: 'MBBS',
        workAs: 'Doctor',
        workingWith: 'Private Company',
        annualIncome: '₹15-20 Lakhs'
      },
      photos: ['/api/placeholder/300/400'],
      aboutMe: 'Passionate doctor who believes in work-life balance and enjoys outdoor activities.',
      lastActive: '30 minutes ago',
      verified: true,
      premium: true,
      profileCompletion: 98,
      lifestyle: {
        drinkingHabits: 'Occasionally',
        smokingHabits: 'Never',
        dietaryHabits: 'Non-Vegetarian'
      },
      hobbies: ['Yoga', 'Hiking', 'Reading'],
      matchPercentage: 85
    }
  ];

  useEffect(() => {
    setProfiles(mockProfiles);
  }, []);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleRangeChange = (rangeType, minMax, value) => {
    setFilters(prev => ({
      ...prev,
      [rangeType]: {
        ...prev[rangeType],
        [minMax]: value
      }
    }));
  };

  const handleSearch = async () => {
    setLoading(true);
    // Mock search functionality
    setTimeout(() => {
      // Filter profiles based on search criteria
      let filteredProfiles = mockProfiles;

      if (searchQuery) {
        filteredProfiles = filteredProfiles.filter(profile =>
          profile.personalDetails.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          profile.personalDetails.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          profile.contactDetails.address.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
          profile.educationDetails.workAs.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      // Apply age filter
      if (filters.ageRange.min || filters.ageRange.max) {
        filteredProfiles = filteredProfiles.filter(profile => {
          const age = profile.personalDetails.age;
          return age >= (filters.ageRange.min || 0) && age <= (filters.ageRange.max || 100);
        });
      }

      // Apply other filters
      if (filters.religion) {
        filteredProfiles = filteredProfiles.filter(profile =>
          profile.religiousDetails.religion.toLowerCase().includes(filters.religion.toLowerCase())
        );
      }

      if (filters.location) {
        filteredProfiles = filteredProfiles.filter(profile =>
          profile.contactDetails.address.city.toLowerCase().includes(filters.location.toLowerCase()) ||
          profile.contactDetails.address.state.toLowerCase().includes(filters.location.toLowerCase())
        );
      }

      // Sort profiles
      switch (sortBy) {
        case 'age_low':
          filteredProfiles.sort((a, b) => a.personalDetails.age - b.personalDetails.age);
          break;
        case 'age_high':
          filteredProfiles.sort((a, b) => b.personalDetails.age - a.personalDetails.age);
          break;
        case 'recently_active':
          // Mock sorting by last active
          break;
        case 'match_percentage':
          filteredProfiles.sort((a, b) => b.matchPercentage - a.matchPercentage);
          break;
        default:
          // Relevance - already sorted by match percentage
          break;
      }

      setProfiles(filteredProfiles);
      setLoading(false);
    }, 1000);
  };

  const handleSendInterest = (profileId) => {
    toast.success('Interest sent successfully!');
    console.log('Sending interest to:', profileId);
  };

  const handleSaveProfile = (profileId) => {
    toast.success('Profile saved to favorites!');
    console.log('Saving profile:', profileId);
  };

  const handleSaveSearch = () => {
    const searchData = {
      id: Date.now(),
      name: searchQuery || 'Custom Search',
      filters: filters,
      timestamp: new Date().toISOString()
    };
    setSavedSearches(prev => [...prev, searchData]);
    toast.success('Search saved successfully!');
  };

  const ProfileCard = ({ profile }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative">
        <img
          src={profile.photos[0]}
          alt={`${profile.personalDetails.firstName} ${profile.personalDetails.lastName}`}
          className="w-full h-64 object-cover"
        />
        <div className="absolute top-3 left-3 flex flex-col space-y-2">
          {profile.verified && (
            <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full flex items-center space-x-1">
              <Star className="w-3 h-3" />
              <span>Verified</span>
            </span>
          )}
          {profile.premium && (
            <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
              Premium
            </span>
          )}
        </div>
        <div className="absolute top-3 right-3">
          <span className="bg-black/70 text-white text-xs px-2 py-1 rounded-full">
            {profile.matchPercentage}% Match
          </span>
        </div>
        <div className="absolute bottom-3 right-3">
          <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
            {profile.lastActive}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {profile.personalDetails.firstName} {profile.personalDetails.lastName}
            </h3>
            <p className="text-gray-600 text-sm">
              {profile.personalDetails.age} years, {profile.personalDetails.height}
            </p>
          </div>
          <button
            onClick={() => handleSaveProfile(profile.id)}
            className="p-2 text-gray-400 hover:text-red-500 transition-colors"
          >
            <Bookmark className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="w-4 h-4 mr-2" />
            {profile.contactDetails.address.city}, {profile.contactDetails.address.state}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <GraduationCap className="w-4 h-4 mr-2" />
            {profile.educationDetails.highestQualification}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Briefcase className="w-4 h-4 mr-2" />
            {profile.educationDetails.workAs}
          </div>
        </div>

        {/* Hobbies */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {profile.hobbies.slice(0, 3).map((hobby, index) => (
              <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                {hobby}
              </span>
            ))}
            {profile.hobbies.length > 3 && (
              <span className="text-xs text-gray-500">+{profile.hobbies.length - 3} more</span>
            )}
          </div>
        </div>

        <p className="text-sm text-gray-700 mb-4 line-clamp-2">
          {profile.aboutMe}
        </p>

        <div className="flex space-x-2">
          <Link
            to={`/profile/${profile.id}`}
            className="flex-1 bg-primary-600 text-white text-center py-2 rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium"
          >
            View Profile
          </Link>
          <button
            onClick={() => handleSendInterest(profile.id)}
            className="p-2 border border-primary-600 text-primary-600 rounded-lg hover:bg-primary-50 transition-colors"
          >
            <Heart className="w-4 h-4" />
          </button>
          <button className="p-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors">
            <MessageCircle className="w-4 h-4" />
          </button>
          <button className="p-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors">
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  const ProfileListItem = ({ profile }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex space-x-6">
        <div className="relative flex-shrink-0">
          <img
            src={profile.photos[0]}
            alt={`${profile.personalDetails.firstName} ${profile.personalDetails.lastName}`}
            className="w-24 h-32 object-cover rounded-lg"
          />
          <div className="absolute -top-2 -right-2 bg-primary-600 text-white text-xs px-2 py-1 rounded-full">
            {profile.matchPercentage}%
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 flex items-center space-x-2">
                <span>{profile.personalDetails.firstName} {profile.personalDetails.lastName}</span>
                {profile.verified && <Star className="w-4 h-4 text-green-500 fill-current" />}
              </h3>
              <p className="text-gray-600">
                {profile.personalDetails.age} years, {profile.personalDetails.height} • {profile.contactDetails.address.city}
              </p>
            </div>
            <button
              onClick={() => handleSaveProfile(profile.id)}
              className="p-2 text-gray-400 hover:text-red-500 transition-colors"
            >
              <Bookmark className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div>
              <div className="text-sm text-gray-500">Education</div>
              <div className="font-medium">{profile.educationDetails.highestQualification}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Profession</div>
              <div className="font-medium">{profile.educationDetails.workAs}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Income</div>
              <div className="font-medium">{profile.educationDetails.annualIncome}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Religion</div>
              <div className="font-medium">{profile.religiousDetails.religion}</div>
            </div>
          </div>

          <p className="text-gray-700 mb-4 line-clamp-2">{profile.aboutMe}</p>

          <div className="flex items-center justify-between">
            <div className="flex space-x-2">
              <Link
                to={`/profile/${profile.id}`}
                className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium"
              >
                View Profile
              </Link>
              <button
                onClick={() => handleSendInterest(profile.id)}
                className="border border-primary-600 text-primary-600 px-4 py-2 rounded-lg hover:bg-primary-50 transition-colors text-sm font-medium"
              >
                Send Interest
              </button>
            </div>
            <div className="text-sm text-gray-500">
              Active {profile.lastActive}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-6 lg:py-8">
      <div className="container-responsive">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">Find Your Match</h1>
          
          {/* Search Bar */}
          <div className="flex space-x-4">
            <div className="flex-1 relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, location, profession..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Filter className="w-5 h-5" />
              <span className="hidden sm:inline">Filters</span>
            </button>
            <button
              onClick={handleSearch}
              disabled={loading}
              className="bg-primary-600 text-white px-8 py-3 rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                'Search'
              )}
            </button>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Search Filters</h2>
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleSaveSearch}
                  className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                >
                  Save Search
                </button>
                <button
                  onClick={() => setShowFilters(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Age Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Age Range</label>
                <div className="flex space-x-2">
                  <input
                    type="number"
                    value={filters.ageRange.min}
                    onChange={(e) => handleRangeChange('ageRange', 'min', e.target.value)}
                    placeholder="Min"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                  <input
                    type="number"
                    value={filters.ageRange.max}
                    onChange={(e) => handleRangeChange('ageRange', 'max', e.target.value)}
                    placeholder="Max"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Religion */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Religion</label>
                <select
                  value={filters.religion}
                  onChange={(e) => handleFilterChange('religion', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="">Any Religion</option>
                  <option value="hindu">Hindu</option>
                  <option value="muslim">Muslim</option>
                  <option value="christian">Christian</option>
                  <option value="sikh">Sikh</option>
                  <option value="buddhist">Buddhist</option>
                  <option value="jain">Jain</option>
                </select>
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <input
                  type="text"
                  value={filters.location}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                  placeholder="City, State"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              {/* Education */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Education</label>
                <select
                  value={filters.education}
                  onChange={(e) => handleFilterChange('education', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="">Any Education</option>
                  <option value="high_school">High School</option>
                  <option value="bachelors">Bachelor's</option>
                  <option value="masters">Master's</option>
                  <option value="phd">PhD</option>
                </select>
              </div>

              {/* Occupation */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Occupation</label>
                <input
                  type="text"
                  value={filters.occupation}
                  onChange={(e) => handleFilterChange('occupation', e.target.value)}
                  placeholder="e.g., Software Engineer"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              {/* Dietary Habits */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Dietary Habits</label>
                <select
                  value={filters.dietaryHabits}
                  onChange={(e) => handleFilterChange('dietaryHabits', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="">Any Diet</option>
                  <option value="vegetarian">Vegetarian</option>
                  <option value="non-vegetarian">Non-Vegetarian</option>
                  <option value="vegan">Vegan</option>
                  <option value="jain">Jain</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end space-x-4 mt-6">
              <button
                onClick={() => setFilters({
                  ageRange: { min: 18, max: 60 },
                  heightRange: { min: '', max: '' },
                  religion: '',
                  caste: '',
                  location: '',
                  education: '',
                  occupation: '',
                  income: { min: '', max: '' },
                  maritalStatus: 'never_married',
                  drinkingHabits: '',
                  smokingHabits: '',
                  dietaryHabits: '',
                  bodyType: '',
                  complexion: ''
                })}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Reset Filters
              </button>
              <button
                onClick={handleSearch}
                className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                Apply Filters
              </button>
            </div>
          </div>
        )}

        {/* Results Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              {profiles.length} profiles found
            </h2>
            <div className="flex items-center space-x-4">
              {/* View Mode Toggle */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'grid' ? 'bg-primary-100 text-primary-600' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Grid3x3 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'list' ? 'bg-primary-100 text-primary-600' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>

              {/* Sort Dropdown */}
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="relevance">Relevance</option>
                  <option value="recently_active">Recently Active</option>
                  <option value="age_low">Age (Low to High)</option>
                  <option value="age_high">Age (High to Low)</option>
                  <option value="match_percentage">Match Percentage</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Results */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
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
        ) : (
          <>
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {profiles.map((profile) => (
                  <ProfileCard key={profile.id} profile={profile} />
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {profiles.map((profile) => (
                  <ProfileListItem key={profile.id} profile={profile} />
                ))}
              </div>
            )}
          </>
        )}

        {/* Load More */}
        {profiles.length > 0 && (
          <div className="text-center mt-12">
            <button className="bg-primary-600 text-white px-8 py-3 rounded-lg hover:bg-primary-700 transition-colors">
              Load More Profiles
            </button>
          </div>
        )}

        {/* No Results */}
        {!loading && profiles.length === 0 && (
          <div className="text-center py-12">
            <SearchIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No profiles found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search criteria or filters</p>
            <button
              onClick={() => {
                setFilters({
                  ageRange: { min: 18, max: 60 },
                  heightRange: { min: '', max: '' },
                  religion: '',
                  caste: '',
                  location: '',
                  education: '',
                  occupation: '',
                  income: { min: '', max: '' },
                  maritalStatus: 'never_married',
                  drinkingHabits: '',
                  smokingHabits: '',
                  dietaryHabits: '',
                  bodyType: '',
                  complexion: ''
                });
                setSearchQuery('');
                handleSearch();
              }}
              className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
