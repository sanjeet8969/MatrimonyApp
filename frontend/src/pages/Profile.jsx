import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useResponsive } from '../hooks/useResponsive';
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  MapPin, 
  Calendar, 
  GraduationCap,
  Briefcase,
  Users,
  Star,
  Edit,
  Camera,
  ArrowLeft
} from 'lucide-react';

const Profile = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { isMobile, isTablet } = useResponsive();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const isOwnProfile = user?.id === id;

  // Mock profile data - replace with API call
  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        setProfile({
          id: id,
          personalDetails: {
            firstName: 'Priya',
            lastName: 'Sharma',
            age: 26,
            height: '5\'4"',
            dateOfBirth: '1997-05-15',
            gender: 'female'
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
            highestQualification: 'Master\'s in Computer Science',
            college: 'IIT Mumbai',
            workingWith: 'Private Company',
            workAs: 'Software Engineer',
            annualIncome: '₹12-15 Lakhs'
          },
          familyDetails: {
            familyType: 'Nuclear Family',
            familyStatus: 'Middle Class',
            fatherOccupation: 'Business',
            motherOccupation: 'Teacher',
            brothers: 1,
            sisters: 0
          },
          photos: [
            '/api/placeholder/400/600',
            '/api/placeholder/400/600',
            '/api/placeholder/400/600',
            '/api/placeholder/400/600'
          ],
          aboutMe: 'I am a software engineer working in Mumbai. I love traveling, reading books, and spending time with family. Looking for a life partner who shares similar values and interests.',
          hobbies: ['Reading', 'Traveling', 'Cooking', 'Photography'],
          lifestyle: {
            drinkingHabits: 'Never',
            smokingHabits: 'Never',
            dietaryHabits: 'Vegetarian'
          },
          profileCompletion: 95,
          lastActive: '2 hours ago'
        });
        setLoading(false);
      }, 1000);
    };

    fetchProfile();
  }, [id]);

  const handleSendInterest = () => {
    // Handle send interest logic
    console.log('Sending interest to profile:', id);
  };

  const handleSendMessage = () => {
    // Handle send message logic
    console.log('Sending message to profile:', id);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Profile Not Found</h2>
          <Link to="/search" className="text-primary-600 hover:text-primary-700">
            Back to Search
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 lg:py-8">
      <div className="container-responsive">
        {/* Back Button */}
        <div className="mb-6">
          <Link
            to="/search"
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-primary-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Search</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Photo Gallery & Basic Info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              {/* Photo Gallery */}
              <div className="relative">
                <img
                  src={profile.photos[currentImageIndex]}
                  alt={`${profile.personalDetails.firstName} ${profile.personalDetails.lastName}`}
                  className="w-full h-80 lg:h-96 object-cover"
                />
                {profile.photos.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {profile.photos.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2 h-2 rounded-full ${
                          index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                        }`}
                      />
                    ))}
                  </div>
                )}
                {isOwnProfile && (
                  <button className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors">
                    <Camera className="w-5 h-5" />
                  </button>
                )}
              </div>

              {/* Basic Info */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                      {profile.personalDetails.firstName} {profile.personalDetails.lastName}
                    </h1>
                    <p className="text-gray-600">
                      {profile.personalDetails.age} years, {profile.personalDetails.height}
                    </p>
                  </div>
                  {isOwnProfile && (
                    <Link
                      to="/edit-profile"
                      className="p-2 text-gray-400 hover:text-primary-600 transition-colors"
                    >
                      <Edit className="w-5 h-5" />
                    </Link>
                  )}
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>
                      {profile.contactDetails.address.city}, {profile.contactDetails.address.state}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <GraduationCap className="w-4 h-4" />
                    <span>{profile.educationDetails.highestQualification}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Briefcase className="w-4 h-4" />
                    <span>{profile.educationDetails.workAs}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                {!isOwnProfile && (
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={handleSendInterest}
                      className="flex items-center justify-center space-x-2 bg-primary-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
                    >
                      <Heart className="w-4 h-4" />
                      <span>Interest</span>
                    </button>
                    <button
                      onClick={handleSendMessage}
                      className="flex items-center justify-center space-x-2 border border-primary-600 text-primary-600 px-4 py-3 rounded-lg font-medium hover:bg-primary-50 transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Message</span>
                    </button>
                  </div>
                )}

                {/* Profile Completion */}
                {isOwnProfile && (
                  <div className="mt-6 p-4 bg-primary-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-primary-700">Profile Completion</span>
                      <span className="text-sm font-bold text-primary-700">{profile.profileCompletion}%</span>
                    </div>
                    <div className="w-full bg-primary-200 rounded-full h-2">
                      <div 
                        className="bg-primary-600 h-2 rounded-full transition-all" 
                        style={{ width: `${profile.profileCompletion}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Detailed Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* About Me */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-4">About Me</h2>
              <p className="text-gray-700 leading-relaxed">{profile.aboutMe}</p>
              
              {profile.hobbies && profile.hobbies.length > 0 && (
                <div className="mt-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Hobbies & Interests</h3>
                  <div className="flex flex-wrap gap-2">
                    {profile.hobbies.map((hobby, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm"
                      >
                        {hobby}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Personal Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Basic Details */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Basic Details</h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Age</span>
                    <span className="font-medium">{profile.personalDetails.age} years</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Height</span>
                    <span className="font-medium">{profile.personalDetails.height}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Religion</span>
                    <span className="font-medium">{profile.religiousDetails.religion}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Caste</span>
                    <span className="font-medium">{profile.religiousDetails.caste}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Mother Tongue</span>
                    <span className="font-medium">{profile.religiousDetails.mothertongue}</span>
                  </div>
                </div>
              </div>

              {/* Education & Career */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Education & Career</h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Education</span>
                    <span className="font-medium text-right">{profile.educationDetails.highestQualification}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">College</span>
                    <span className="font-medium text-right">{profile.educationDetails.college}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Occupation</span>
                    <span className="font-medium text-right">{profile.educationDetails.workAs}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Working With</span>
                    <span className="font-medium text-right">{profile.educationDetails.workingWith}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Annual Income</span>
                    <span className="font-medium text-right">{profile.educationDetails.annualIncome}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Family Details */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Family Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Family Type</span>
                    <span className="font-medium">{profile.familyDetails.familyType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Family Status</span>
                    <span className="font-medium">{profile.familyDetails.familyStatus}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Father's Occupation</span>
                    <span className="font-medium">{profile.familyDetails.fatherOccupation}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Mother's Occupation</span>
                    <span className="font-medium">{profile.familyDetails.motherOccupation}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Brothers</span>
                    <span className="font-medium">{profile.familyDetails.brothers}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sisters</span>
                    <span className="font-medium">{profile.familyDetails.sisters}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Lifestyle */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Lifestyle</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-gray-600 mb-1">Drinking</div>
                  <div className="font-medium">{profile.lifestyle.drinkingHabits}</div>
                </div>
                <div className="text-center">
                  <div className="text-gray-600 mb-1">Smoking</div>
                  <div className="font-medium">{profile.lifestyle.smokingHabits}</div>
                </div>
                <div className="text-center">
                  <div className="text-gray-600 mb-1">Diet</div>
                  <div className="font-medium">{profile.lifestyle.dietaryHabits}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
