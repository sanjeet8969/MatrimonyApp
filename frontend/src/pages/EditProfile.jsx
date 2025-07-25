// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import { useResponsive } from '../hooks/useResponsive';
// import { 
//   User, 
//   Camera, 
//   Save, 
//   ArrowLeft, 
//   MapPin, 
//   GraduationCap, 
//   Briefcase,
//   Users,
//   Heart,
//   X,
//   Plus
// } from 'lucide-react';
// import toast from 'react-hot-toast';

// const EditProfile = () => {
//   const { user } = useAuth();
//   const { isMobile } = useResponsive();
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [activeTab, setActiveTab] = useState('basic');

//   const [formData, setFormData] = useState({
//     personalDetails: {
//       firstName: '',
//       lastName: '',
//       dateOfBirth: '',
//       gender: '',
//       height: '',
//       weight: '',
//       bodyType: '',
//       complexion: '',
//       bloodGroup: '',
//       disability: ''
//     },
//     contactDetails: {
//       phone: '',
//       alternatePhone: '',
//       address: {
//         street: '',
//         city: '',
//         state: '',
//         country: '',
//         pincode: ''
//       }
//     },
//     religiousDetails: {
//       religion: '',
//       caste: '',
//       subCaste: '',
//       mothertongue: '',
//       gothra: '',
//       managlik: false
//     },
//     educationDetails: {
//       highestQualification: '',
//       college: '',
//       specialization: '',
//       workingWith: '',
//       workAs: '',
//       annualIncome: ''
//     },
//     familyDetails: {
//       familyType: '',
//       familyStatus: '',
//       familyValues: '',
//       fatherOccupation: '',
//       motherOccupation: '',
//       brothers: 0,
//       sisters: 0
//     },
//     partnerPreferences: {
//       ageRange: { min: 18, max: 60 },
//       heightRange: { min: '', max: '' },
//       preferredLocation: [],
//       education: [],
//       occupation: [],
//       income: { min: '', max: '' },
//       caste: [],
//       religion: []
//     },
//     photos: [],
//     aboutMe: '',
//     hobbies: [],
//     lifestyle: {
//       drinkingHabits: '',
//       smokingHabits: '',
//       dietaryHabits: '',
//       exerciseHabits: ''
//     }
//   });

//   const [newHobby, setNewHobby] = useState('');
//   const [uploadingPhoto, setUploadingPhoto] = useState(false);

//   const tabs = [
//     { id: 'basic', name: 'Basic Details', icon: User },
//     { id: 'contact', name: 'Contact', icon: MapPin },
//     { id: 'religious', name: 'Religious', icon: Heart },
//     { id: 'education', name: 'Education', icon: GraduationCap },
//     { id: 'family', name: 'Family', icon: Users },
//     { id: 'preferences', name: 'Partner Preferences', icon: Heart },
//     { id: 'lifestyle', name: 'Lifestyle & Photos', icon: Camera }
//   ];

//   // Load existing profile data
//   useEffect(() => {
//     const loadProfileData = async () => {
//       // Mock data loading - replace with actual API call
//       // setFormData with existing profile data
//     };
//     loadProfileData();
//   }, []);

//   const handleInputChange = (section, field, value) => {
//     if (section === 'address') {
//       setFormData(prev => ({
//         ...prev,
//         contactDetails: {
//           ...prev.contactDetails,
//           address: {
//             ...prev.contactDetails.address,
//             [field]: value
//           }
//         }
//       }));
//     } else if (section === 'ageRange' || section === 'heightRange' || section === 'income') {
//       setFormData(prev => ({
//         ...prev,
//         partnerPreferences: {
//           ...prev.partnerPreferences,
//           [section]: {
//             ...prev.partnerPreferences[section],
//             [field]: value
//           }
//         }
//       }));
//     } else {
//       setFormData(prev => ({
//         ...prev,
//         [section]: {
//           ...prev[section],
//           [field]: value
//         }
//       }));
//     }
//   };

//   const handleArrayInput = (section, field, value) => {
//     setFormData(prev => ({
//       ...prev,
//       [section]: {
//         ...prev[section],
//         [field]: value.split(',').map(item => item.trim()).filter(item => item)
//       }
//     }));
//   };

//   const handleAddHobby = () => {
//     if (newHobby.trim() && !formData.hobbies.includes(newHobby.trim())) {
//       setFormData(prev => ({
//         ...prev,
//         hobbies: [...prev.hobbies, newHobby.trim()]
//       }));
//       setNewHobby('');
//     }
//   };

//   const handleRemoveHobby = (hobby) => {
//     setFormData(prev => ({
//       ...prev,
//       hobbies: prev.hobbies.filter(h => h !== hobby)
//     }));
//   };

//   const handlePhotoUpload = async (event) => {
//     const file = event.target.files[0];
//     if (!file) return;

//     setUploadingPhoto(true);
//     try {
//       // Mock photo upload - replace with actual upload logic
//       const photoUrl = '/api/placeholder/400/600';
//       setFormData(prev => ({
//         ...prev,
//         photos: [...prev.photos, { url: photoUrl, public_id: 'temp_id' }]
//       }));
//       toast.success('Photo uploaded successfully');
//     } catch (error) {
//       toast.error('Failed to upload photo');
//     } finally {
//       setUploadingPhoto(false);
//     }
//   };

//   const handleRemovePhoto = (index) => {
//     setFormData(prev => ({
//       ...prev,
//       photos: prev.photos.filter((_, i) => i !== index)
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       // Mock API call - replace with actual save logic
//       await new Promise(resolve => setTimeout(resolve, 2000));
//       toast.success('Profile updated successfully!');
//       navigate(`/profile/${user.id}`);
//     } catch (error) {
//       toast.error('Failed to update profile');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const renderBasicDetails = () => (
//     <div className="space-y-6">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
//           <input
//             type="text"
//             value={formData.personalDetails.firstName}
//             onChange={(e) => handleInputChange('personalDetails', 'firstName', e.target.value)}
//             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
//             placeholder="Enter first name"
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
//           <input
//             type="text"
//             value={formData.personalDetails.lastName}
//             onChange={(e) => handleInputChange('personalDetails', 'lastName', e.target.value)}
//             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
//             placeholder="Enter last name"
//           />
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth *</label>
//           <input
//             type="date"
//             value={formData.personalDetails.dateOfBirth}
//             onChange={(e) => handleInputChange('personalDetails', 'dateOfBirth', e.target.value)}
//             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">Gender *</label>
//           <select
//             value={formData.personalDetails.gender}
//             onChange={(e) => handleInputChange('personalDetails', 'gender', e.target.value)}
//             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
//           >
//             <option value="">Select Gender</option>
//             <option value="male">Male</option>
//             <option value="female">Female</option>
//           </select>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">Height</label>
//           <input
//             type="text"
//             value={formData.personalDetails.height}
//             onChange={(e) => handleInputChange('personalDetails', 'height', e.target.value)}
//             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
//             placeholder="e.g., 5'6\""
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">Weight</label>
//           <input
//             type="text"
//             value={formData.personalDetails.weight}
//             onChange={(e) => handleInputChange('personalDetails', 'weight', e.target.value)}
//             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
//             placeholder="e.g., 65 kg"
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">Blood Group</label>
//           <select
//             value={formData.personalDetails.bloodGroup}
//             onChange={(e) => handleInputChange('personalDetails', 'bloodGroup', e.target.value)}
//             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
//           >
//             <option value="">Select Blood Group</option>
//             <option value="A+">A+</option>
//             <option value="A-">A-</option>
//             <option value="B+">B+</option>
//             <option value="B-">B-</option>
//             <option value="AB+">AB+</option>
//             <option value="AB-">AB-</option>
//             <option value="O+">O+</option>
//             <option value="O-">O-</option>
//           </select>
//         </div>
//       </div>
//     </div>
//   );

//   const renderPhotosAndLifestyle = () => (
//     <div className="space-y-8">
//       {/* Photo Upload */}
//       <div>
//         <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Photos</h3>
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
//           {formData.photos.map((photo, index) => (
//             <div key={index} className="relative group">
//               <img
//                 src={photo.url}
//                 alt={`Profile ${index + 1}`}
//                 className="w-full h-32 object-cover rounded-lg"
//               />
//               <button
//                 onClick={() => handleRemovePhoto(index)}
//                 className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
//               >
//                 <X className="w-4 h-4" />
//               </button>
//             </div>
//           ))}
//           {formData.photos.length < 6 && (
//             <label className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-primary-400 transition-colors">
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={handlePhotoUpload}
//                 className="hidden"
//                 disabled={uploadingPhoto}
//               />
//               {uploadingPhoto ? (
//                 <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
//               ) : (
//                 <div className="text-center">
//                   <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
//                   <span className="text-sm text-gray-600">Add Photo</span>
//                 </div>
//               )}
//             </label>
//           )}
//         </div>
//         <p className="text-sm text-gray-600">Upload up to 6 photos. First photo will be your profile picture.</p>
//       </div>

//       {/* About Me */}
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-2">About Me</label>
//         <textarea
//           value={formData.aboutMe}
//           onChange={(e) => setFormData(prev => ({ ...prev, aboutMe: e.target.value }))}
//           rows={4}
//           className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
//           placeholder="Tell something about yourself..."
//         />
//       </div>

//       {/* Hobbies */}
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-2">Hobbies & Interests</label>
//         <div className="flex flex-wrap gap-2 mb-3">
//           {formData.hobbies.map((hobby, index) => (
//             <span
//               key={index}
//               className="inline-flex items-center space-x-2 bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm"
//             >
//               <span>{hobby}</span>
//               <button
//                 onClick={() => handleRemoveHobby(hobby)}
//                 className="text-primary-600 hover:text-primary-800"
//               >
//                 <X className="w-3 h-3" />
//               </button>
//             </span>
//           ))}
//         </div>
//         <div className="flex space-x-2">
//           <input
//             type="text"
//             value={newHobby}
//             onChange={(e) => setNewHobby(e.target.value)}
//             onKeyPress={(e) => e.key === 'Enter' && handleAddHobby()}
//             className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
//             placeholder="Add a hobby"
//           />
//           <button
//             onClick={handleAddHobby}
//             className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
//           >
//             <Plus className="w-4 h-4" />
//           </button>
//         </div>
//       </div>

//       {/* Lifestyle */}
//       <div>
//         <h3 className="text-lg font-semibold text-gray-900 mb-4">Lifestyle</h3>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Drinking Habits</label>
//             <select
//               value={formData.lifestyle.drinkingHabits}
//               onChange={(e) => handleInputChange('lifestyle', 'drinkingHabits', e.target.value)}
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
//             >
//               <option value="">Select</option>
//               <option value="Never">Never</option>
//               <option value="Occasionally">Occasionally</option>
//               <option value="Socially">Socially</option>
//               <option value="Regularly">Regularly</option>
//             </select>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Smoking Habits</label>
//             <select
//               value={formData.lifestyle.smokingHabits}
//               onChange={(e) => handleInputChange('lifestyle', 'smokingHabits', e.target.value)}
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
//             >
//               <option value="">Select</option>
//               <option value="Never">Never</option>
//               <option value="Occasionally">Occasionally</option>
//               <option value="Socially">Socially</option>
//               <option value="Regularly">Regularly</option>
//             </select>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Dietary Habits</label>
//             <select
//               value={formData.lifestyle.dietaryHabits}
//               onChange={(e) => handleInputChange('lifestyle', 'dietaryHabits', e.target.value)}
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
//             >
//               <option value="">Select</option>
//               <option value="Vegetarian">Vegetarian</option>
//               <option value="Non-Vegetarian">Non-Vegetarian</option>
//               <option value="Vegan">Vegan</option>
//               <option value="Jain">Jain</option>
//             </select>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Exercise Habits</label>
//             <select
//               value={formData.lifestyle.exerciseHabits}
//               onChange={(e) => handleInputChange('lifestyle', 'exerciseHabits', e.target.value)}
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
//             >
//               <option value="">Select</option>
//               <option value="Daily">Daily</option>
//               <option value="Regular">Regular</option>
//               <option value="Sometimes">Sometimes</option>
//               <option value="Never">Never</option>
//             </select>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   const renderTabContent = () => {
//     switch (activeTab) {
//       case 'basic':
//         return renderBasicDetails();
//       case 'lifestyle':
//         return renderPhotosAndLifestyle();
//       // Add other tab rendering functions here
//       default:
//         return <div>Tab content coming soon...</div>;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-6 lg:py-8">
//       <div className="container-responsive">
//         {/* Header */}
//         <div className="flex items-center justify-between mb-8">
//           <div className="flex items-center space-x-4">
//             <button
//               onClick={() => navigate(-1)}
//               className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
//             >
//               <ArrowLeft className="w-5 h-5" />
//             </button>
//             <div>
//               <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Edit Profile</h1>
//               <p className="text-gray-600">Complete your profile to get better matches</p>
//             </div>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
//           {/* Tabs Sidebar */}
//           <div className="lg:col-span-1">
//             <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200 sticky top-6">
//               <nav className="space-y-2">
//                 {tabs.map((tab) => {
//                   const Icon = tab.icon;
//                   return (
//                     <button
//                       key={tab.id}
//                       onClick={() => setActiveTab(tab.id)}
//                       className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
//                         activeTab === tab.id
//                           ? 'bg-primary-50 text-primary-700 border border-primary-200'
//                           : 'text-gray-600 hover:bg-gray-50'
//                       }`}
//                     >
//                       <Icon className="w-5 h-5" />
//                       <span className={`${isMobile ? 'text-sm' : 'text-base'}`}>{tab.name}</span>
//                     </button>
//                   );
//                 })}
//               </nav>
//             </div>
//           </div>

//           {/* Content Area */}
//           <div className="lg:col-span-3">
//             <form onSubmit={handleSubmit}>
//               <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm border border-gray-200">
//                 {renderTabContent()}

//                 {/* Save Button */}
//                 <div className="flex justify-end mt-8 pt-6 border-t border-gray-200">
//                   <button
//                     type="submit"
//                     disabled={loading}
//                     className="flex items-center space-x-2 bg-primary-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                   >
//                     {loading ? (
//                       <>
//                         <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
//                         <span>Saving...</span>
//                       </>
//                     ) : (
//                       <>
//                         <Save className="w-5 h-5" />
//                         <span>Save Changes</span>
//                       </>
//                     )}
//                   </button>
//                 </div>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditProfile;
// // import React, { useState, useEffect } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import { useAuth } from '../context/AuthContext';
// // import { useResponsive } from '../hooks/useResponsive';
// // import { 
// //   User, 
// //   Camera, 
// //   Save, 
// //   ArrowLeft, 
// //   MapPin, 
// //   GraduationCap, 
// //   Briefcase,
// //   Users,
// //   Heart,
// //   X,
// //   Plus,
// //   Upload,
// //   Check
// // } from 'lucide-react';
// // import toast from 'react-hot-toast';

// // const EditProfile = () => {
// //   const { user } = useAuth();
// //   const { isMobile } = useResponsive();
// //   const navigate = useNavigate();
// //   const [loading, setLoading] = useState(false);
// //   const [activeTab, setActiveTab] = useState('basic');
// //   const [profileCompletion, setProfileCompletion] = useState(0);

// //   const [formData, setFormData] = useState({
// //     personalDetails: {
// //       firstName: '',
// //       lastName: '',
// //       dateOfBirth: '',
// //       gender: '',
// //       height: '',
// //       weight: '',
// //       bodyType: '',
// //       complexion: '',
// //       bloodGroup: '',
// //       disability: ''
// //     },
// //     contactDetails: {
// //       phone: '',
// //       alternatePhone: '',
// //       address: {
// //         street: '',
// //         city: '',
// //         state: '',
// //         country: 'India',
// //         pincode: ''
// //       }
// //     },
// //     religiousDetails: {
// //       religion: '',
// //       caste: '',
// //       subCaste: '',
// //       mothertongue: '',
// //       gothra: '',
// //       managlik: false
// //     },
// //     educationDetails: {
// //       highestQualification: '',
// //       college: '',
// //       specialization: '',
// //       workingWith: '',
// //       workAs: '',
// //       annualIncome: ''
// //     },
// //     familyDetails: {
// //       familyType: '',
// //       familyStatus: '',
// //       familyValues: '',
// //       fatherOccupation: '',
// //       motherOccupation: '',
// //       brothers: 0,
// //       sisters: 0
// //     },
// //     partnerPreferences: {
// //       ageRange: { min: 18, max: 60 },
// //       heightRange: { min: '', max: '' },
// //       preferredLocation: [],
// //       education: [],
// //       occupation: [],
// //       income: { min: '', max: '' },
// //       caste: [],
// //       religion: []
// //     },
// //     photos: [],
// //     aboutMe: '',
// //     hobbies: [],
// //     lifestyle: {
// //       drinkingHabits: '',
// //       smokingHabits: '',
// //       dietaryHabits: '',
// //       exerciseHabits: ''
// //     }
// //   });

// //   const [newHobby, setNewHobby] = useState('');
// //   const [uploadingPhoto, setUploadingPhoto] = useState(false);

// //   const tabs = [
// //     { id: 'basic', name: 'Basic Details', icon: User, completed: false },
// //     { id: 'contact', name: 'Contact Info', icon: MapPin, completed: false },
// //     { id: 'religious', name: 'Religious Details', icon: Heart, completed: false },
// //     { id: 'education', name: 'Education & Career', icon: GraduationCap, completed: false },
// //     { id: 'family', name: 'Family Details', icon: Users, completed: false },
// //     { id: 'preferences', name: 'Partner Preferences', icon: Heart, completed: false },
// //     { id: 'lifestyle', name: 'Lifestyle & About', icon: Camera, completed: false }
// //   ];

// //   // Calculate profile completion
// //   useEffect(() => {
// //     const calculateCompletion = () => {
// //       let completedSections = 0;
// //       const totalSections = 7;

// //       // Check each section for completion
// //       if (formData.personalDetails.firstName && formData.personalDetails.lastName && 
// //           formData.personalDetails.dateOfBirth && formData.personalDetails.gender) {
// //         completedSections++;
// //       }
      
// //       if (formData.contactDetails.phone && formData.contactDetails.address.city && 
// //           formData.contactDetails.address.state) {
// //         completedSections++;
// //       }
      
// //       if (formData.religiousDetails.religion && formData.religiousDetails.mothertongue) {
// //         completedSections++;
// //       }
      
// //       if (formData.educationDetails.highestQualification && formData.educationDetails.workAs) {
// //         completedSections++;
// //       }
      
// //       if (formData.familyDetails.familyType) {
// //         completedSections++;
// //       }
      
// //       if (formData.partnerPreferences.ageRange.min && formData.partnerPreferences.ageRange.max) {
// //         completedSections++;
// //       }
      
// //       if (formData.aboutMe || formData.photos.length > 0) {
// //         completedSections++;
// //       }

// //       const completion = Math.round((completedSections / totalSections) * 100);
// //       setProfileCompletion(completion);
// //     };

// //     calculateCompletion();
// //   }, [formData]);

// //   const handleInputChange = (section, field, value) => {
// //     if (section === 'address') {
// //       setFormData(prev => ({
// //         ...prev,
// //         contactDetails: {
// //           ...prev.contactDetails,
// //           address: {
// //             ...prev.contactDetails.address,
// //             [field]: value
// //           }
// //         }
// //       }));
// //     } else if (section === 'ageRange' || section === 'heightRange' || section === 'income') {
// //       setFormData(prev => ({
// //         ...prev,
// //         partnerPreferences: {
// //           ...prev.partnerPreferences,
// //           [section]: {
// //             ...prev.partnerPreferences[section],
// //             [field]: value
// //           }
// //         }
// //       }));
// //     } else {
// //       setFormData(prev => ({
// //         ...prev,
// //         [section]: {
// //           ...prev[section],
// //           [field]: value
// //         }
// //       }));
// //     }
// //   };

// //   const handleArrayInput = (section, field, value) => {
// //     setFormData(prev => ({
// //       ...prev,
// //       [section]: {
// //         ...prev[section],
// //         [field]: value.split(',').map(item => item.trim()).filter(item => item)
// //       }
// //     }));
// //   };

// //   const handleAddHobby = () => {
// //     if (newHobby.trim() && !formData.hobbies.includes(newHobby.trim())) {
// //       setFormData(prev => ({
// //         ...prev,
// //         hobbies: [...prev.hobbies, newHobby.trim()]
// //       }));
// //       setNewHobby('');
// //     }
// //   };

// //   const handleRemoveHobby = (hobby) => {
// //     setFormData(prev => ({
// //       ...prev,
// //       hobbies: prev.hobbies.filter(h => h !== hobby)
// //     }));
// //   };

// //   const handlePhotoUpload = async (event) => {
// //     const file = event.target.files[0];
// //     if (!file) return;

// //     setUploadingPhoto(true);
// //     try {
// //       // Mock photo upload - replace with actual upload logic
// //       const photoUrl = '/api/placeholder/400/600';
// //       setFormData(prev => ({
// //         ...prev,
// //         photos: [...prev.photos, { url: photoUrl, public_id: 'temp_id_' + Date.now() }]
// //       }));
// //       toast.success('Photo uploaded successfully');
// //     } catch (error) {
// //       toast.error('Failed to upload photo');
// //     } finally {
// //       setUploadingPhoto(false);
// //     }
// //   };

// //   const handleRemovePhoto = (index) => {
// //     setFormData(prev => ({
// //       ...prev,
// //       photos: prev.photos.filter((_, i) => i !== index)
// //     }));
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setLoading(true);

// //     try {
// //       // Mock API call - replace with actual save logic
// //       await new Promise(resolve => setTimeout(resolve, 2000));
// //       toast.success('Profile updated successfully!');
// //       navigate(`/profile/${user.id}`);
// //     } catch (error) {
// //       toast.error('Failed to update profile');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const renderBasicDetails = () => (
// //     <div className="space-y-6">
// //       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //         <div>
// //           <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
// //           <input
// //             type="text"
// //             value={formData.personalDetails.firstName}
// //             onChange={(e) => handleInputChange('personalDetails', 'firstName', e.target.value)}
// //             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
// //             placeholder="Enter first name"
// //           />
// //         </div>
// //         <div>
// //           <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
// //           <input
// //             type="text"
// //             value={formData.personalDetails.lastName}
// //             onChange={(e) => handleInputChange('personalDetails', 'lastName', e.target.value)}
// //             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
// //             placeholder="Enter last name"
// //           />
// //         </div>
// //       </div>

// //       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //         <div>
// //           <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth *</label>
// //           <input
// //             type="date"
// //             value={formData.personalDetails.dateOfBirth}
// //             onChange={(e) => handleInputChange('personalDetails', 'dateOfBirth', e.target.value)}
// //             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
// //           />
// //         </div>
// //         <div>
// //           <label className="block text-sm font-medium text-gray-700 mb-2">Gender *</label>
// //           <select
// //             value={formData.personalDetails.gender}
// //             onChange={(e) => handleInputChange('personalDetails', 'gender', e.target.value)}
// //             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
// //           >
// //             <option value="">Select Gender</option>
// //             <option value="male">Male</option>
// //             <option value="female">Female</option>
// //           </select>
// //         </div>
// //       </div>

// //       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// //         <div>
// //           <label className="block text-sm font-medium text-gray-700 mb-2">Height</label>
// //           <select
// //             value={formData.personalDetails.height}
// //             onChange={(e) => handleInputChange('personalDetails', 'height', e.target.value)}
// //             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
// //           >
// //             <option value="">Select Height</option>
// //             <option value="4'6\"">4'6"</option>
// //             <option value="4'7\"">4'7"</option>
// //             <option value="4'8\"">4'8"</option>
// //             <option value="4'9\"">4'9"</option>
// //             <option value="4'10\"">4'10"</option>
// //             <option value="4'11\"">4'11"</option>
// //             <option value="5'0\"">5'0"</option>
// //             <option value="5'1\"">5'1"</option>
// //             <option value="5'2\"">5'2"</option>
// //             <option value="5'3\"">5'3"</option>
// //             <option value="5'4\"">5'4"</option>
// //             <option value="5'5\"">5'5"</option>
// //             <option value="5'6\"">5'6"</option>
// //             <option value="5'7\"">5'7"</option>
// //             <option value="5'8\"">5'8"</option>
// //             <option value="5'9\"">5'9"</option>
// //             <option value="5'10\"">5'10"</option>
// //             <option value="5'11\"">5'11"</option>
// //             <option value="6'0\"">6'0"</option>
// //             <option value="6'1\"">6'1"</option>
// //             <option value="6'2\"">6'2"</option>
// //             <option value="6'3\"">6'3"</option>
// //             <option value="6'4\"">6'4"</option>
// //             <option value="6'5\"">6'5"</option>
// //             <option value="6'6\"">6'6"</option>
// //           </select>
// //         </div>
// //         <div>
// //           <label className="block text-sm font-medium text-gray-700 mb-2">Body Type</label>
// //           <select
// //             value={formData.personalDetails.bodyType}
// //             onChange={(e) => handleInputChange('personalDetails', 'bodyType', e.target.value)}
// //             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
// //           >
// //             <option value="">Select Body Type</option>
// //             <option value="slim">Slim</option>
// //             <option value="average">Average</option>
// //             <option value="athletic">Athletic</option>
// //             <option value="heavy">Heavy</option>
// //           </select>
// //         </div>
// //         <div>
// //           <label className="block text-sm font-medium text-gray-700 mb-2">Blood Group</label>
// //           <select
// //             value={formData.personalDetails.bloodGroup}
// //             onChange={(e) => handleInputChange('personalDetails', 'bloodGroup', e.target.value)}
// //             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
// //           >
// //             <option value="">Select Blood Group</option>
// //             <option value="A+">A+</option>
// //             <option value="A-">A-</option>
// //             <option value="B+">B+</option>
// //             <option value="B-">B-</option>
// //             <option value="AB+">AB+</option>
// //             <option value="AB-">AB-</option>
// //             <option value="O+">O+</option>
// //             <option value="O-">O-</option>
// //           </select>
// //         </div>
// //       </div>
// //     </div>
// //   );

// //   const renderContactDetails = () => (
// //     <div className="space-y-6">
// //       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //         <div>
// //           <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
// //           <input
// //             type="tel"
// //             value={formData.contactDetails.phone}
// //             onChange={(e) => handleInputChange('contactDetails', 'phone', e.target.value)}
// //             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
// //             placeholder="+91 XXXXX XXXXX"
// //           />
// //         </div>
// //         <div>
// //           <label className="block text-sm font-medium text-gray-700 mb-2">Alternate Phone</label>
// //           <input
// //             type="tel"
// //             value={formData.contactDetails.alternatePhone}
// //             onChange={(e) => handleInputChange('contactDetails', 'alternatePhone', e.target.value)}
// //             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
// //             placeholder="+91 XXXXX XXXXX"
// //           />
// //         </div>
// //       </div>

// //       <div>
// //         <label className="block text-sm font-medium text-gray-700 mb-2">Street Address</label>
// //         <input
// //           type="text"
// //           value={formData.contactDetails.address.street}
// //           onChange={(e) => handleInputChange('address', 'street', e.target.value)}
// //           className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
// //           placeholder="Enter street address"
// //         />
// //       </div>

// //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
// //         <div>
// //           <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
// //           <input
// //             type="text"
// //             value={formData.contactDetails.address.city}
// //             onChange={(e) => handleInputChange('address', 'city', e.target.value)}
// //             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
// //             placeholder="Enter city"
// //           />
// //         </div>
// //         <div>
// //           <label className="block text-sm font-medium text-gray-700 mb-2">State *</label>
// //           <input
// //             type="text"
// //             value={formData.contactDetails.address.state}
// //             onChange={(e) => handleInputChange('address', 'state', e.target.value)}
// //             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
// //             placeholder="Enter state"
// //           />
// //         </div>
// //         <div>
// //           <label className="block text-sm font-medium text-gray-700 mb-2">Country *</label>
// //           <select
// //             value={formData.contactDetails.address.country}
// //             onChange={(e) => handleInputChange('address', 'country', e.target.value)}
// //             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
// //           >
// //             <option value="India">India</option>
// //             <option value="USA">USA</option>
// //             <option value="Canada">Canada</option>
// //             <option value="UK">UK</option>
// //             <option value="Australia">Australia</option>
// //           </select>
// //         </div>
// //         <div>
// //           <label className="block text-sm font-medium text-gray-700 mb-2">Pincode</label>
// //           <input
// //             type="text"
// //             value={formData.contactDetails.address.pincode}
// //             onChange={(e) => handleInputChange('address', 'pincode', e.target.value)}
// //             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
// //             placeholder="Enter pincode"
// //           />
// //         </div>
// //       </div>
// //     </div>
// //   );

// //   const renderReligiousDetails = () => (
// //     <div className="space-y-6">
// //       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //         <div>
// //           <label className="block text-sm font-medium text-gray-700 mb-2">Religion *</label>
// //           <select
// //             value={formData.religiousDetails.religion}
// //             onChange={(e) => handleInputChange('religiousDetails', 'religion', e.target.value)}
// //             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
// //           >
// //             <option value="">Select Religion</option>
// //             <option value="Hindu">Hindu</option>
// //             <option value="Muslim">Muslim</option>
// //             <option value="Christian">Christian</option>
// //             <option value="Sikh">Sikh</option>
// //             <option value="Buddhist">Buddhist</option>
// //             <option value="Jain">Jain</option>
// //             <option value="Parsi">Parsi</option>
// //             <option value="Jewish">Jewish</option>
// //             <option value="Other">Other</option>
// //           </select>
// //         </div>
// //         <div>
// //           <label className="block text-sm font-medium text-gray-700 mb-2">Mother Tongue *</label>
// //           <select
// //             value={formData.religiousDetails.mothertongue}
// //             onChange={(e) => handleInputChange('religiousDetails', 'mothertongue', e.target.value)}
// //             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
// //           >
// //             <option value="">Select Mother Tongue</option>
// //             <option value="Hindi">Hindi</option>
// //             <option value="English">English</option>
// //             <option value="Bengali">Bengali</option>
// //             <option value="Telugu">Telugu</option>
// //             <option value="Marathi">Marathi</option>
// //             <option value="Tamil">Tamil</option>
// //             <option value="Gujarati">Gujarati</option>
// //             <option value="Kannada">Kannada</option>
// //             <option value="Odia">Odia</option>
// //             <option value="Malayalam">Malayalam</option>
// //             <option value="Punjabi">Punjabi</option>
// //             <option value="Assamese">Assamese</option>
// //             <option value="Urdu">Urdu</option>
// //           </select>
// //         </div>
// //       </div>

// //       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //         <div>
// //           <label className="block text-sm font-medium text-gray-700 mb-2">Caste</label>
// //           <input
// //             type="text"
// //             value={formData.religiousDetails.caste}
// //             onChange={(e) => handleInputChange('religiousDetails', 'caste', e.target.value)}
// //             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
// //             placeholder="Enter caste"
// //           />
// //         </div>
// //         <div>
// //           <label className="block text-sm font-medium text-gray-700 mb-2">Sub Caste</label>
// //           <input
// //             type="text"
// //             value={formData.religiousDetails.subCaste}
// //             onChange={(e) => handleInputChange('religiousDetails', 'subCaste', e.target.value)}
// //             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
// //             placeholder="Enter sub caste"
// //           />
// //         </div>
// //       </div>

// //       <div>
// //         <label className="block text-sm font-medium text-gray-700 mb-2">Gothra</label>
// //         <input
// //           type="text"
// //           value={formData.religiousDetails.gothra}
// //           onChange={(e) => handleInputChange('religiousDetails', 'gothra', e.target.value)}
// //           className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
// //           placeholder="Enter gothra"
// //         />
// //       </div>

// //       <div className="flex items-center space-x-3">
// //         <input
// //           type="checkbox"
// //           id="managlik"
// //           checked={formData.religiousDetails.managlik}
// //           onChange={(e) => handleInputChange('religiousDetails', 'managlik', e.target.checked)}
// //           className="w-4 h-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
// //         />
// //         <label htmlFor="managlik" className="text-sm font-medium text-gray-700">
// //           Manglik
// //         </label>
// //       </div>
// //     </div>
// //   );

// //   const renderEducationDetails = () => (
// //     <div className="space-y-6">
// //       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //         <div>
// //           <label className="block text-sm font-medium text-gray-700 mb-2">Highest Qualification *</label>
// //           <select
// //             value={formData.educationDetails.highestQualification}
// //             onChange={(e) => handleInputChange('educationDetails', 'highestQualification', e.target.value)}
// //             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
// //           >
// //             <option value="">Select Qualification</option>
// //             <option value="High School">High School</option>
// //             <option value="Diploma">Diploma</option>
// //             <option value="Bachelor's Degree">Bachelor's Degree</option>
// //             <option value="Master's Degree">Master's Degree</option>
// //             <option value="Doctorate">Doctorate</option>
// //             <option value="Professional Degree">Professional Degree</option>
// //           </select>
// //         </div>
// //         <div>
// //           <label className="block text-sm font-medium text-gray-700 mb-2">College/University</label>
// //           <input
// //             type="text"
// //             value={formData.educationDetails.college}
// //             onChange={(e) => handleInputChange('educationDetails', 'college', e.target.value)}
// //             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
// //             placeholder="Enter college/university name"
// //           />
// //         </div>
// //       </div>

// //       <div>
// //         <label className="block text-sm font-medium text-gray-700 mb-2">Specialization</label>
// //         <input
// //           type="text"
// //           value={formData.educationDetails.specialization}
// //           onChange={(e) => handleInputChange('educationDetails', 'specialization', e.target.value)}
// //           className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
// //           placeholder="Enter field of study"
// //         />
// //       </div>

// //       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //         <div>
// //           <label className="block text-sm font-medium text-gray-700 mb-2">Working With</label>
// //           <select
// //             value={formData.educationDetails.workingWith}
// //             onChange={(e) => handleInputChange('educationDetails', 'workingWith', e.target.value)}
// //             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
// //           >
// //             <option value="">Select Work Type</option>
// //             <option value="Private Company">Private Company</option>
// //             <option value="Government">Government</option>
// //             <option value="Self Employed">Self Employed</option>
// //             <option value="Business">Business</option>
// //             <option value="Not Working">Not Working</option>
// //           </select>
// //         </div>
// //         <div>
// //           <label className="block text-sm font-medium text-gray-700 mb-2">Work As *</label>
// //           <input
// //             type="text"
// //             value={formData.educationDetails.workAs}
// //             onChange={(e) => handleInputChange('educationDetails', 'workAs', e.target.value)}
// //             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
// //             placeholder="e.g., Software Engineer, Doctor, Teacher"
// //           />
// //         </div>
// //       </div>

// //       <div>
// //         <label className="block text-sm font-medium text-gray-700 mb-2">Annual Income</label>
// //         <select
// //           value={formData.educationDetails.annualIncome}
// //           onChange={(e) => handleInputChange('educationDetails', 'annualIncome', e.target.value)}
// //           className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
// //         >
// //           <option value="">Select Income Range</option>
// //           <option value="Less than ₹2 Lakhs">Less than ₹2 Lakhs</option>
// //           <option value="₹2-5 Lakhs">₹2-5 Lakhs</option>
// //           <option value="₹5-10 Lakhs">₹5-10 Lakhs</option>
// //           <option value="₹10-15 Lakhs">₹10-15 Lakhs</option>
// //           <option value="₹15-25 Lakhs">₹15-25 Lakhs</option>
// //           <option value="₹25-50 Lakhs">₹25-50 Lakhs</option>
// //           <option value="₹50 Lakhs+">₹50 Lakhs+</option>
// //         </select>
// //       </div>
// //     </div>
// //   );

// //   const renderFamilyDetails = () => (
// //     <div className="space-y-6">
// //       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //         <div>
// //           <label className="block text-sm font-medium text-gray-700 mb-2">Family Type</label>
// //           <select
// //             value={formData.familyDetails.familyType}
// //             onChange={(e) => handleInputChange('familyDetails', 'familyType', e.target.value)}
// //             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
// //           >
// //             <option value="">Select Family Type</option>
// //             <option value="Joint Family">Joint Family</option>
// //             <option value="Nuclear Family">Nuclear Family</option>
// //           </select>
// //         </div>
// //         <div>
// //           <label className="block text-sm font-medium text-gray-700 mb-2">Family Status</label>
// //           <select
// //             value={formData.familyDetails.familyStatus}
// //             onChange={(e) => handleInputChange('familyDetails', 'familyStatus', e.target.value)}
// //             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
// //           >
// //             <option value="">Select Family Status</option>
// //             <option value="Middle Class">Middle Class</option>
// //             <option value="Upper Middle Class">Upper Middle Class</option>
// //             <option value="Rich">Rich</option>
// //             <option value="Affluent">Affluent</option>
// //           </select>
// //         </div>
// //       </div>

// //       <div>
// //         <label className="block text-sm font-medium text-gray-700 mb-2">Family Values</label>
// //         <select
// //           value={formData.familyDetails.familyValues}
// //           onChange={(e) => handleInputChange('familyDetails', 'familyValues', e.target.value)}
// //           className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
// //         >
// //           <option value="">Select Family Values</option>
// //           <option value="Orthodox">Orthodox</option>
// //           <option value="Traditional">Traditional</option>
// //           <option value="Moderate">Moderate</option>
// //           <option value="Liberal">Liberal</option>
// //         </select>
// //       </div>

// //       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //         <div>
// //           <label className="block text-sm font-medium text-gray-700 mb-2">Father's Occupation</label>
// //           <input
// //             type="text"
// //             value={formData.familyDetails.fatherOccupation}
// //             onChange={(e) => handleInputChange('familyDetails', 'fatherOccupation', e.target.value)}
// //             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
// //             placeholder="Enter father's occupation"
// //           />
// //         </div>
// //         <div>
// //           <label className="block text-sm font-medium text-gray-700 mb-2">Mother's Occupation</label>
// //           <input
// //             type="text"
// //             value={formData.familyDetails.motherOccupation}
// //             onChange={(e) => handleInputChange('familyDetails', 'motherOccupation', e.target.value)}
// //             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
// //             placeholder="Enter mother's occupation"
// //           />
// //         </div>
// //       </div>

// //       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //         <div>
// //           <label className="block text-sm font-medium text-gray-700 mb-2">Number of Brothers</label>
// //           <select
// //             value={formData.familyDetails.brothers}
// //             onChange={(e) => handleInputChange('familyDetails', 'brothers', parseInt(e.target.value))}
// //             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
// //           >
// //             <option value={0}>0</option>
// //             <option value={1}>1</option>
// //             <option value={2}>2</option>
// //             <option value={3}>3</option>
// //             <option value={4}>4</option>
// //             <option value={5}>5+</option>
// //           </select>
// //         </div>
// //         <div>
// //           <label className="block text-sm font-medium text-gray-700 mb-2">Number of Sisters</label>
// //           <select
// //             value={formData.familyDetails.sisters}
// //             onChange={(e) => handleInputChange('familyDetails', 'sisters', parseInt(e.target.value))}
// //             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
// //           >
// //             <option value={0}>0</option>
// //             <option value={1}>1</option>
// //             <option value={2}>2</option>
// //             <option value={3}>3</option>
// //             <option value={4}>4</option>
// //             <option value={5}>5+</option>
// //           </select>
// //         </div>
// //       </div>
// //     </div>
// //   );

// //   const renderPartnerPreferences = () => (
// //     <div className="space-y-6">
// //       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //         <div>
// //           <label className="block text-sm font-medium text-gray-700 mb-2">Age Range</label>
// //           <div className="grid grid-cols-2 gap-3">
// //             <div>
// //               <input
// //                 type="number"
// //                 value={formData.partnerPreferences.ageRange.min}
// //                 onChange={(e) => handleInputChange('ageRange', 'min', parseInt(e.target.value))}
// //                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
// //                 placeholder="Min age"
// //                 min="18"
// //                 max="100"
// //               />
// //             </div>
// //             <div>
// //               <input
// //                 type="number"
// //                 value={formData.partnerPreferences.ageRange.max}
// //                 onChange={(e) => handleInputChange('ageRange', 'max', parseInt(e.target.value))}
// //                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
// //                 placeholder="Max age"
// //                 min="18"
// //                 max="100"
// //               />
// //             </div>
// //           </div>
// //         </div>
// //         <div>
// //           <label className="block text-sm font-medium text-gray-700 mb-2">Height Range</label>
// //           <div className="grid grid-cols-2 gap-3">
// //             <select
// //               value={formData.partnerPreferences.heightRange.min}
// //               onChange={(e) => handleInputChange('heightRange', 'min', e.target.value)}
// //               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
// //             >
// //               <option value="">Min height</option>
// //               <option value="4'6\"">4'6"</option>
// //               <option value="4'7\"">4'7"</option>
// //               <option value="4'8\"">4'8"</option>
// //               <option value="4'9\"">4'9"</option>
// //               <option value="4'10\"">4'10"</option>
// //               <option value="4'11\"">4'11"</option>
// //               <option value="5'0\"">5'0"</option>
// //               <option value="5'1\"">5'1"</option>
// //               <option value="5'2\"">5'2"</option>
// //               <option value="5'3\"">5'3"</option>
// //               <option value="5'4\"">5'4"</option>
// //               <option value="5'5\"">5'5"</option>
// //               <option value="5'6\"">5'6"</option>
// //               <option value="5'7\"">5'7"</option>
// //               <option value="5'8\"">5'8"</option>
// //               <option value="5'9\"">5'9"</option>
// //               <option value="5'10\"">5'10"</option>
// //               <option value="5'11\"">5'11"</option>
// //               <option value="6'0\"">6'0"</option>
// //               <option value="6'1\"">6'1"</option>
// //               <option value="6'2\"">6'2"</option>
// //               <option value="6'3\"">6'3"</option>
// //               <option value="6'4\"">6'4"</option>
// //               <option value="6'5\"">6'5"</option>
// //               <option value="6'6\"">6'6"</option>
// //             </select>
// //             <select
// //               value={formData.partnerPreferences.heightRange.max}
// //               onChange={(e) => handleInputChange('heightRange', 'max', e.target.value)}
// //               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
// //             >
// //               <option value="">Max height</option>
// //               <option value="4'6\"">4'6"</option>
// //               <option value="4'7\"">4'7"</option>
// //               <option value="4'8\"">4'8"</option>
// //               <option value="4'9\"">4'9"</option>
// //               <option value="4'10\"">4'10"</option>
// //               <option value="4'11\"">4'11"</option>
// //               <option value="5'0\"">5'0"</option>
// //               <option value="5'1\"">5'1"</option>
// //               <option value="5'2\"">5'2"</option>
// //               <option value="5'3\"">5'3"</option>
// //               <option value="5'4\"">5'4"</option>
// //               <option value="5'5\"">5'5"</option>
// //               <option value="5'6\"">5'6"</option>
// //               <option value="5'7\"">5'7"</option>
// //               <option value="5'8\"">5'8"</option>
// //               <option value="5'9\"">5'9"</option>
// //               <option value="5'10\"">5'10"</option>
// //               <option value="5'11\"">5'11"</option>
// //               <option value="6'0\"">6'0"</option>
// //               <option value="6'1\"">6'1"</option>
// //               <option value="6'2\"">6'2"</option>
// //               <option value="6'3\"">6'3"</option>
// //               <option value="6'4\"">6'4"</option>
// //               <option value="6'5\"">6'5"</option>
// //               <option value="6'6\"">6'6"</option>
// //             </select>
// //           </div>
// //         </div>
// //       </div>

// //       <div>
// //         <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Locations</label>
// //         <input
// //           type="text"
// //           value={formData.partnerPreferences.preferredLocation.join(', ')}
// //           onChange={(e) => handleArrayInput('partnerPreferences', 'preferredLocation', e.target.value)}
// //           className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
// //           placeholder="Enter cities separated by commas (e.g., Mumbai, Delhi, Bangalore)"
// //         />
// //         <p className="text-sm text-gray-500 mt-1">Separate multiple cities with commas</p>
// //       </div>

// //       <div>
// //         <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Education</label>
// //         <input
// //           type="text"
// //           value={formData.partnerPreferences.education.join(', ')}
// //           onChange={(e) => handleArrayInput('partnerPreferences', 'education', e.target.value)}
// //           className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
// //           placeholder="Enter education levels separated by commas (e.g., Bachelor's, Master's)"
// //         />
// //         <p className="text-sm text-gray-500 mt-1">Separate multiple education levels with commas</p>
// //       </div>

// //       <div>
// //         <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Occupations</label>
// //         <input
// //           type="text"
// //           value={formData.partnerPreferences.occupation.join(', ')}
// //           onChange={(e) => handleArrayInput('partnerPreferences', 'occupation', e.target.value)}
// //           className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
// //           placeholder="Enter occupations separated by commas (e.g., Engineer, Doctor, Teacher)"
// //         />
// //         <p className="text-sm text-gray-500 mt-1">Separate multiple occupations with commas</p>
// //       </div>

// //       <div>
// //         <label className="block text-sm font-medium text-gray-700 mb-2">Income Range (₹)</label>
// //         <div className="grid grid-cols-2 gap-3">
// //           <input
// //             type="text"
// //             value={formData.partnerPreferences.income.min}
// //             onChange={(e) => handleInputChange('income', 'min', e.target.value)}
// //             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
// //             placeholder="Minimum income"
// //           />
// //           <input
// //             type="text"
// //             value={formData.partnerPreferences.income.max}
// //             onChange={(e) => handleInputChange('income', 'max', e.target.value)}
// //             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
// //             placeholder="Maximum income"
// //           />
// //         </div>
// //       </div>
// //     </div>
// //   );

// //   const renderLifestyleAndAbout = () => (
// //     <div className="space-y-8">
// //       {/* Photo Upload */}
// //       <div>
// //         <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Photos</h3>
// //         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
// //           {formData.photos.map((photo, index) => (
// //             <div key={index} className="relative group">
// //               <img
// //                 src={photo.url}
// //                 alt={`Profile ${index + 1}`}
// //                 className="w-full h-32 object-cover rounded-lg border-2 border-gray-200"
// //               />
// //               <button
// //                 onClick={() => handleRemovePhoto(index)}
// //                 className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
// //               >
// //                 <X className="w-4 h-4" />
// //               </button>
// //               {index === 0 && (
// //                 <div className="absolute bottom-2 left-2 bg-primary-600 text-white text-xs px-2 py-1 rounded">
// //                   Primary
// //                 </div>
// //               )}
// //             </div>
// //           ))}
// //           {formData.photos.length < 6 && (
// //             <label className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-primary-400 transition-colors">
// //               <input
// //                 type="file"
// //                 accept="image/*"
// //                 onChange={handlePhotoUpload}
// //                 className="hidden"
// //                 disabled={uploadingPhoto}
// //               />
// //               {uploadingPhoto ? (
// //                 <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
// //               ) : (
// //                 <div className="text-center">
// //                   <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
// //                   <span className="text-sm text-gray-600">Add Photo</span>
// //                 </div>
// //               )}
// //             </label>
// //           )}
// //         </div>
// //         <p className="text-sm text-gray-600">Upload up to 6 photos. First photo will be your profile picture.</p>
// //       </div>

// //       {/* About Me */}
// //       <div>
// //         <label className="block text-sm font-medium text-gray-700 mb-2">About Me</label>
// //         <textarea
// //           value={formData.aboutMe}
// //           onChange={(e) => setFormData(prev => ({ ...prev, aboutMe: e.target.value }))}
// //           rows={4}
// //           className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
// //           placeholder="Tell something about yourself, your interests, what you're looking for in a partner..."
// //         />
// //         <p className="text-sm text-gray-500 mt-1">{formData.aboutMe.length}/1000 characters</p>
// //       </div>

// //       {/* Hobbies */}
// //       <div>
// //         <label className="block text-sm font-medium text-gray-700 mb-2">Hobbies & Interests</label>
// //         <div className="flex flex-wrap gap-2 mb-3">
// //           {formData.hobbies.map((hobby, index) => (
// //             <span
// //               key={index}
// //               className="inline-flex items-center space-x-2 bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm"
// //             >
// //               <span>{hobby}</span>
// //               <button
// //                 onClick={() => handleRemoveHobby(hobby)}
// //                 className="text-primary-600 hover:text-primary-800"
// //               >
// //                 <X className="w-3 h-3" />
// //               </button>
// //             </span>
// //           ))}
// //         </div>
// //         <div className="flex space-x-2">
// //           <input
// //             type="text"
// //             value={newHobby}
// //             onChange={(e) => setNewHobby(e.target.value)}
// //             onKeyPress={(e) => e.key === 'Enter' && handleAddHobby()}
// //             className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
// //             placeholder="Add a hobby or interest"
// //           />
// //           <button
// //             onClick={handleAddHobby}
// //             className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
// //           >
// //             <Plus className="w-4 h-4" />
// //           </button>
// //         </div>
// //       </div>

// //       {/* Lifestyle */}
// //       <div>
// //         <h3 className="text-lg font-semibold text-gray-900 mb-4">Lifestyle</h3>
// //         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //           <div>
// //             <label className="block text-sm font-medium text-gray-700 mb-2">Drinking Habits</label>
// //             <select
// //               value={formData.lifestyle.drinkingHabits}
// //               onChange={(e) => handleInputChange('lifestyle', 'drinkingHabits', e.target.value)}
// //               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
// //             >
// //               <option value="">Select</option>
// //               <option value="Never">Never</option>
// //               <option value="Occasionally">Occasionally</option>
// //               <option value="Socially">Socially</option>
// //               <option value="Regularly">Regularly</option>
// //             </select>
// //           </div>
// //           <div>
// //             <label className="block text-sm font-medium text-gray-700 mb-2">Smoking Habits</label>
// //             <select
// //               value={formData.lifestyle.smokingHabits}
// //               onChange={(e) => handleInputChange('lifestyle', 'smokingHabits', e.target.value)}
// //               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
// //             >
// //               <option value="">Select</option>
// //               <option value="Never">Never</option>
// //               <option value="Occasionally">Occasionally</option>
// //               <option value="Socially">Socially</option>
// //               <option value="Regularly">Regularly</option>
// //             </select>
// //           </div>
// //           <div>
// //             <label className="block text-sm font-medium text-gray-700 mb-2">Dietary Habits</label>
// //             <select
// //               value={formData.lifestyle.dietaryHabits}
// //               onChange={(e) => handleInputChange('lifestyle', 'dietaryHabits', e.target.value)}
// //               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
// //             >
// //               <option value="">Select</option>
// //               <option value="Vegetarian">Vegetarian</option>
// //               <option value="Non-Vegetarian">Non-Vegetarian</option>
// //               <option value="Vegan">Vegan</option>
// //               <option value="Jain">Jain</option>
// //             </select>
// //           </div>
// //           <div>
// //             <label className="block text-sm font-medium text-gray-700 mb-2">Exercise Habits</label>
// //             <select
// //               value={formData.lifestyle.exerciseHabits}
// //               onChange={(e) => handleInputChange('lifestyle', 'exerciseHabits', e.target.value)}
// //               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
// //             >
// //               <option value="">Select</option>
// //               <option value="Daily">Daily</option>
// //               <option value="Regular">Regular</option>
// //               <option value="Sometimes">Sometimes</option>
// //               <option value="Never">Never</option>
// //             </select>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );

// //   const renderTabContent = () => {
// //     switch (activeTab) {
// //       case 'basic':
// //         return renderBasicDetails();
// //       case 'contact':
// //         return renderContactDetails();
// //       case 'religious':
// //         return renderReligiousDetails();
// //       case 'education':
// //         return renderEducationDetails();
// //       case 'family':
// //         return renderFamilyDetails();
// //       case 'preferences':
// //         return renderPartnerPreferences();
// //       case 'lifestyle':
// //         return renderLifestyleAndAbout();
// //       default:
// //         return renderBasicDetails();
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen bg-gray-50 py-6 lg:py-8">
// //       <div className="container-responsive">
// //         {/* Header */}
// //         <div className="flex items-center justify-between mb-8">
// //           <div className="flex items-center space-x-4">
// //             <button
// //               onClick={() => navigate(-1)}
// //               className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
// //             >
// //               <ArrowLeft className="w-5 h-5" />
// //             </button>
// //             <div>
// //               <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Edit Profile</h1>
// //               <p className="text-gray-600">Complete your profile to get better matches</p>
// //             </div>
// //           </div>
// //           <div className="text-right">
// //             <div className="text-2xl font-bold text-primary-600">{profileCompletion}%</div>
// //             <div className="text-sm text-gray-600">Complete</div>
// //           </div>
// //         </div>

// //         {/* Progress Bar */}
// //         <div className="mb-8">
// //           <div className="w-full bg-gray-200 rounded-full h-2">
// //             <div 
// //               className="bg-primary-600 h-2 rounded-full transition-all duration-300" 
// //               style={{ width: `${profileCompletion}%` }}
// //             ></div>
// //           </div>
// //         </div>

// //         <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
// //           {/* Tabs Sidebar */}
// //           <div className="lg:col-span-1">
// //             <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200 sticky top-6">
// //               <nav className="space-y-2">
// //                 {tabs.map((tab) => {
// //                   const Icon = tab.icon;
// //                   const isCompleted = profileCompletion >= ((tabs.findIndex(t => t.id === tab.id) + 1) / tabs.length) * 100;
// //                   return (
// //                     <button
// //                       key={tab.id}
// //                       onClick={() => setActiveTab(tab.id)}
// //                       className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
// //                         activeTab === tab.id
// //                           ? 'bg-primary-50 text-primary-700 border border-primary-200'
// //                           : 'text-gray-600 hover:bg-gray-50'
// //                       }`}
// //                     >
// //                       <Icon className="w-5 h-5" />
// //                       <span className={`flex-1 ${isMobile ? 'text-sm' : 'text-base'}`}>{tab.name}</span>
// //                       {isCompleted && (
// //                         <Check className="w-4 h-4 text-green-600" />
// //                       )}
// //                     </button>
// //                   );
// //                 })}
// //               </nav>
// //             </div>
// //           </div>

// //           {/* Content Area */}
// //           <div className="lg:col-span-3">
// //             <form onSubmit={handleSubmit}>
// //               <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm border border-gray-200">
// //                 <div className="mb-6">
// //                   <h2 className="text-xl font-bold text-gray-900">
// //                     {tabs.find(t => t.id === activeTab)?.name}
// //                   </h2>
// //                   <p className="text-gray-600 mt-1">
// //                     Please fill in the information below
// //                   </p>
// //                 </div>

// //                 {renderTabContent()}

// //                 {/* Navigation Buttons */}
// //                 <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
// //                   <button
// //                     type="button"
// //                     onClick={() => {
// //                       const currentIndex = tabs.findIndex(t => t.id === activeTab);
// //                       if (currentIndex > 0) {
// //                         setActiveTab(tabs[currentIndex - 1].id);
// //                       }
// //                     }}
// //                     className={`flex items-center space-x-2 px-6 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors ${
// //                       tabs.findIndex(t => t.id === activeTab) === 0 ? 'opacity-50 cursor-not-allowed' : ''
// //                     }`}
// //                     disabled={tabs.findIndex(t => t.id === activeTab) === 0}
// //                   >
// //                     <ArrowLeft className="w-4 h-4" />
// //                     <span>Previous</span>
// //                   </button>

// //                   <div className="flex space-x-4">
// //                     <button
// //                       type="submit"
// //                       disabled={loading}
// //                       className="flex items-center space-x-2 bg-gray-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
// //                     >
// //                       {loading ? (
// //                         <>
// //                           <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
// //                           <span>Saving...</span>
// //                         </>
// //                       ) : (
// //                         <>
// //                           <Save className="w-5 h-5" />
// //                           <span>Save</span>
// //                         </>
// //                       )}
// //                     </button>

// //                     {tabs.findIndex(t => t.id === activeTab) < tabs.length - 1 && (
// //                       <button
// //                         type="button"
// //                         onClick={() => {
// //                           const currentIndex = tabs.findIndex(t => t.id === activeTab);
// //                           if (currentIndex < tabs.length - 1) {
// //                             setActiveTab(tabs[currentIndex + 1].id);
// //                           }
// //                         }}
// //                         className="flex items-center space-x-2 bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
// //                       >
// //                         <span>Next</span>
// //                         <ArrowLeft className="w-4 h-4 rotate-180" />
// //                       </button>
// //                     )}
// //                   </div>
// //                 </div>
// //               </div>
// //             </form>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default EditProfile;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, ArrowLeft } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useApi } from '../hooks/useApi';
import Button from '../components/common/Button';
import LoadingSpinner from '../components/common/LoadingSpinner';
import PersonalDetails from '../components/profile/PersonalDetails';
import FamilyDetails from '../components/profile/FamilyDetails';
import EducationDetails from '../components/profile/EducationDetails';
import CareerDetails from '../components/profile/CareerDetails';
import PreferencesForm from '../components/profile/PreferencesForm';
import PhotoUpload from '../components/forms/PhotoUpload';
import Tabs from '../components/ui/Tabs';
import toast from 'react-hot-toast';

const EditProfile = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { get, put, loading } = useApi();
  
  const [profile, setProfile] = useState(null);
  const [activeTab, setActiveTab] = useState('personal');
  const [formData, setFormData] = useState({
    personalDetails: {},
    familyDetails: {},
    educationDetails: {},
    careerDetails: {},
    preferences: {},
    photos: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await get('/profiles/me');
        const profileData = response.data?.profile || response.profile;
        setProfile(profileData);
        setFormData({
          personalDetails: profileData.personalDetails || {},
          familyDetails: profileData.familyDetails || {},
          educationDetails: profileData.educationDetails || {},
          careerDetails: profileData.careerDetails || {},
          preferences: profileData.preferences || {},
          photos: profileData.photos || []
        });
      } catch (err) {
        toast.error('Failed to load profile');
      }
    };

    if (user) fetchProfile();
  }, [user, get]);

  // Update form data
  const updateFormData = (section, data) => {
    setFormData(prev => ({
      ...prev,
      [section]: { ...prev[section], ...data }
    }));
  };

  // Save profile
  const handleSave = async () => {
    setIsSubmitting(true);
    try {
      await put('/profiles', formData);
      toast.success('Profile updated successfully!');
      navigate('/profile');
    } catch (err) {
      toast.error('Failed to update profile');
    }
    setIsSubmitting(false);
  };

  const tabs = [
    { id: 'personal', label: 'Personal', component: PersonalDetails },
    { id: 'family', label: 'Family', component: FamilyDetails },
    { id: 'education', label: 'Education', component: EducationDetails },
    { id: 'career', label: 'Career', component: CareerDetails },
    { id: 'preferences', label: 'Preferences', component: PreferencesForm },
    { id: 'photos', label: 'Photos', component: PhotoUpload }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner text="Loading profile..." />
      </div>
    );
  }

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              icon={ArrowLeft}
              onClick={() => navigate('/profile')}
            >
              Back
            </Button>
            <h1 className="text-3xl font-bold text-gray-900">Edit Profile</h1>
          </div>
          
          <Button
            onClick={handleSave}
            loading={isSubmitting}
            icon={Save}
          >
            Save Changes
          </Button>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {ActiveComponent && (
              <ActiveComponent
                data={formData[activeTab === 'photos' ? 'photos' : `${activeTab}Details`] || formData[activeTab]}
                onChange={(data) => updateFormData(
                  activeTab === 'photos' ? 'photos' : `${activeTab}Details`,
                  data
                )}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
