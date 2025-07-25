import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Heart, Quote } from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';

const SuccessStories = ({ stories = [] }) => {
  const [currentStory, setCurrentStory] = useState(0);

  const nextStory = () => {
    setCurrentStory((prev) => (prev + 1) % stories.length);
  };

  const prevStory = () => {
    setCurrentStory((prev) => (prev - 1 + stories.length) % stories.length);
  };

  if (stories.length === 0) {
    return (
      <Card className="p-6">
        <div className="text-center py-8">
          <Heart className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Success Stories Yet</h3>
          <p className="text-gray-600">Be the first to share your love story!</p>
        </div>
      </Card>
    );
  }

  const story = stories[currentStory];

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Success Stories</h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">
            {currentStory + 1} of {stories.length}
          </span>
          <div className="flex space-x-1">
            <button
              onClick={prevStory}
              disabled={stories.length <= 1}
              className="p-1 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextStory}
              disabled={stories.length <= 1}
              className="p-1 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="relative">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <div className="relative">
              <img
                src={story.couplePhoto || '/api/placeholder/80/80'}
                alt={`${story.groomName} & ${story.brideName}`}
                className="w-20 h-20 rounded-full object-cover border-4 border-pink-100"
              />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center">
                <Heart className="w-3 h-3 text-white fill-current" />
              </div>
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-2">
              <h3 className="font-semibold text-gray-900">
                {story.groomName} & {story.brideName}
              </h3>
              <span className="text-sm text-gray-500">•</span>
              <span className="text-sm text-gray-500">
                Married {story.marriageDate ? new Date(story.marriageDate).getFullYear() : 'Recently'}
              </span>
            </div>

            <div className="mb-4">
              <div className="flex items-start space-x-2">
                <Quote className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
                <p className="text-gray-700 italic leading-relaxed">
                  {story.testimonial}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500">
                {story.location && (
                  <span>📍 {story.location}</span>
                )}
              </div>
              
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Story Navigation Dots */}
        {stories.length > 1 && (
          <div className="flex justify-center space-x-2 mt-6">
            {stories.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentStory(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentStory ? 'bg-primary-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};

export default SuccessStories;
