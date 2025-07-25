import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';
import Modal from '../common/Modal';

const ProfileGallery = ({ photos = [], name = 'User' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  };

  const previousImage = () => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const openModal = (index) => {
    setCurrentIndex(index);
    setShowModal(true);
  };

  if (!photos.length) {
    return (
      <div className="bg-gray-100 rounded-lg h-80 flex items-center justify-center">
        <div className="text-center text-gray-500">
          <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-3 flex items-center justify-center">
            <span className="text-2xl">👤</span>
          </div>
          <p>No photos available</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4">
        {/* Main Image */}
        <div className="relative">
          <img
            src={photos[currentIndex]?.url || photos[currentIndex]}
            alt={`${name} - Photo ${currentIndex + 1}`}
            className="w-full h-80 object-cover rounded-lg cursor-pointer"
            onClick={() => openModal(currentIndex)}
          />
          
          {/* Navigation Arrows */}
          {photos.length > 1 && (
            <>
              <button
                onClick={previousImage}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          {/* Zoom Icon */}
          <button
            onClick={() => openModal(currentIndex)}
            className="absolute top-3 right-3 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
          >
            <ZoomIn className="w-4 h-4" />
          </button>

          {/* Photo Counter */}
          {photos.length > 1 && (
            <div className="absolute bottom-3 left-3 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
              {currentIndex + 1} / {photos.length}
            </div>
          )}
        </div>

        {/* Thumbnail Grid */}
        {photos.length > 1 && (
          <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
            {photos.map((photo, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`relative aspect-square rounded-lg overflow-hidden ${
                  index === currentIndex ? 'ring-2 ring-primary-500' : ''
                }`}
              >
                <img
                  src={photo?.url || photo}
                  alt={`${name} - Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover hover:opacity-80 transition-opacity"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Full Screen Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        size="full"
        className="p-0 bg-black"
        showCloseButton={false}
      >
        <div className="relative h-full flex items-center justify-center">
          <img
            src={photos[currentIndex]?.url || photos[currentIndex]}
            alt={`${name} - Photo ${currentIndex + 1}`}
            className="max-w-full max-h-full object-contain"
          />
          
          {/* Close Button */}
          <button
            onClick={() => setShowModal(false)}
            className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation in Modal */}
          {photos.length > 1 && (
            <>
              <button
                onClick={previousImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Photo Counter in Modal */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full">
            {currentIndex + 1} / {photos.length}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ProfileGallery;
