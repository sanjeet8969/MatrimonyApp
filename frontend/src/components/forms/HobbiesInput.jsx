import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';
import Button from '../common/Button';
import Input from '../common/Input';
import Badge from '../common/Badge';

const HobbiesInput = ({ 
  hobbies = [], 
  onChange, 
  maxHobbies = 10,
  suggestions = [
    'Reading', 'Traveling', 'Cooking', 'Music', 'Dancing', 'Photography',
    'Sports', 'Yoga', 'Movies', 'Art', 'Gardening', 'Writing'
  ]
}) => {
  const [newHobby, setNewHobby] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const addHobby = (hobby) => {
    const trimmedHobby = hobby.trim();
    if (trimmedHobby && !hobbies.includes(trimmedHobby) && hobbies.length < maxHobbies) {
      onChange([...hobbies, trimmedHobby]);
      setNewHobby('');
      setShowSuggestions(false);
    }
  };

  const removeHobby = (index) => {
    onChange(hobbies.filter((_, i) => i !== index));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addHobby(newHobby);
    }
  };

  const availableSuggestions = suggestions.filter(
    suggestion => !hobbies.includes(suggestion)
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-gray-700">
          Hobbies & Interests
        </label>
        <span className="text-sm text-gray-500">
          {hobbies.length}/{maxHobbies}
        </span>
      </div>

      {/* Current Hobbies */}
      {hobbies.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {hobbies.map((hobby, index) => (
            <Badge key={index} variant="primary" className="flex items-center space-x-1">
              <span>{hobby}</span>
              <button
                onClick={() => removeHobby(index)}
                className="text-primary-600 hover:text-primary-800"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}

      {/* Add New Hobby */}
      <div className="flex space-x-2">
        <Input
          placeholder="Add a hobby or interest"
          value={newHobby}
          onChange={(e) => setNewHobby(e.target.value)}
          onKeyPress={handleKeyPress}
          onFocus={() => setShowSuggestions(true)}
          className="flex-1"
        />
        <Button
          type="button"
          icon={Plus}
          onClick={() => addHobby(newHobby)}
          disabled={!newHobby.trim() || hobbies.length >= maxHobbies}
        >
          Add
        </Button>
      </div>

      {/* Suggestions */}
      {showSuggestions && availableSuggestions.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm text-gray-600">Suggestions:</p>
          <div className="flex flex-wrap gap-2">
            {availableSuggestions.slice(0, 8).map((suggestion, index) => (
              <button
                key={index}
                onClick={() => addHobby(suggestion)}
                className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full transition-colors"
                disabled={hobbies.length >= maxHobbies}
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}

      <p className="text-sm text-gray-500">
        Add hobbies and interests to help others know you better. Maximum {maxHobbies} items.
      </p>
    </div>
  );
};

export default HobbiesInput;
