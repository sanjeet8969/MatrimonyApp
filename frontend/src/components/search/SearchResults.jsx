import React from 'react';
import ProfileCard from '../profile/ProfileCard';
import LoadingSpinner from '../common/LoadingSpinner';
import { Search } from 'lucide-react';

const SearchResults = ({ 
  profiles = [], 
  loading = false, 
  onSendInterest, 
  onSaveProfile,
  viewMode = 'grid',
  onLoadMore,
  hasMore = false 
}) => {
  if (loading && profiles.length === 0) {
    return <LoadingSpinner text="Searching profiles..." />;
  }

  if (!loading && profiles.length === 0) {
    return (
      <div className="text-center py-12">
        <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No profiles found</h3>
        <p className="text-gray-600 mb-6">
          Try adjusting your search criteria or filters to find more matches
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Results Count */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">
          {profiles.length} profiles found
        </h2>
      </div>

      {/* Results Grid/List */}
      <div className={
        viewMode === 'grid' 
          ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
          : 'space-y-6'
      }>
        {profiles.map((profile) => (
          <ProfileCard
            key={profile.id}
            profile={profile}
            onSendInterest={onSendInterest}
            onSaveProfile={onSaveProfile}
            compact={viewMode === 'list'}
          />
        ))}
      </div>

      {/* Loading More */}
      {loading && profiles.length > 0 && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
          <p className="text-gray-600 mt-2">Loading more profiles...</p>
        </div>
      )}

      {/* Load More Button */}
      {hasMore && !loading && (
        <div className="text-center pt-8">
          <button
            onClick={onLoadMore}
            className="bg-primary-600 text-white px-8 py-3 rounded-lg hover:bg-primary-700 transition-colors font-medium"
          >
            Load More Profiles
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
