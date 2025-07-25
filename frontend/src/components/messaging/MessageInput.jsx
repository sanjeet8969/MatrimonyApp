import React, { useState, useRef } from 'react';
import { Send, Paperclip, Image, Smile } from 'lucide-react';
import Button from '../common/Button';

const MessageInput = ({ 
  onSendMessage, 
  onFileUpload, 
  disabled = false,
  placeholder = "Type a message..." 
}) => {
  const [message, setMessage] = useState('');
  const fileInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file && onFileUpload) {
      onFileUpload(file);
    }
    e.target.value = '';
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 bg-white">
      <div className="flex items-end space-x-2">
        {/* File Attachment */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          disabled={disabled}
        >
          <Paperclip className="w-5 h-5" />
        </button>

        {/* Image Attachment */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          disabled={disabled}
        >
          <Image className="w-5 h-5" />
        </button>

        {/* Message Input */}
        <div className="flex-1 relative">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            disabled={disabled}
            rows={1}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none max-h-24"
            style={{ minHeight: '48px' }}
          />
          
          {/* Emoji Button */}
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-900"
            disabled={disabled}
          >
            <Smile className="w-5 h-5" />
          </button>
        </div>

        {/* Send Button */}
        <Button
          type="submit"
          disabled={!message.trim() || disabled}
          icon={Send}
          size="lg"
          className="px-4"
        >
          <span className="sr-only">Send</span>
        </Button>

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,application/pdf,.doc,.docx"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>
    </form>
  );
};

export default MessageInput;
