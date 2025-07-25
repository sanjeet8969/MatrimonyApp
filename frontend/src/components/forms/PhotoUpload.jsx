import React, { useState, useRef } from 'react';
import { Upload, X, Camera, Plus } from 'lucide-react';
import Button from '../common/Button';

const PhotoUpload = ({ 
  photos = [], 
  onUpload, 
  onRemove, 
  maxPhotos = 6, 
  className = '' 
}) => {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = async (e) => {
    const files = Array.from(e.target.files);
    
    if (files.length + photos.length > maxPhotos) {
      alert(`You can only upload up to ${maxPhotos} photos`);
      return;
    }

    setUploading(true);
    
    try {
      for (const file of files) {
        await onUpload(file);
      }
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Profile Photos</h3>
        <span className="text-sm text-gray-500">
          {photos.length}/{maxPhotos} photos
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {/* Existing Photos */}
        {photos.map((photo, index) => (
          <div key={index} className="relative group">
            <img
              src={photo.url || photo}
              alt={`Profile ${index + 1}`}
              className="w-full h-32 object-cover rounded-lg border-2 border-gray-200"
            />
            
            {/* Remove Button */}
            <button
              onClick={() => onRemove(index)}
              className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Primary Photo Badge */}
            {index === 0 && (
              <div className="absolute bottom-2 left-2 bg-primary-600 text-white text-xs px-2 py-1 rounded">
                Primary
              </div>
            )}
          </div>
        ))}

        {/* Upload Button */}
        {photos.length < maxPhotos && (
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center hover:border-primary-400 hover:bg-primary-50 transition-colors disabled:opacity-50"
          >
            {uploading ? (
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            ) : (
              <>
                <Camera className="w-8 h-8 text-gray-400 mb-2" />
                <span className="text-sm text-gray-600">Add Photo</span>
              </>
            )}
          </button>
        )}
      </div>

      <p className="text-sm text-gray-600">
        Upload up to {maxPhotos} photos. The first photo will be your profile picture.
        Supported formats: JPG, PNG (max 5MB each)
      </p>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
};

export default PhotoUpload;
