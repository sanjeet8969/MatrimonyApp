import React, { useState, useRef } from 'react';
import { Upload, X, FileText, Image, AlertCircle } from 'lucide-react';

const FileUploader = ({ 
  onUpload,
  accept = "image/*",
  maxSize = 5 * 1024 * 1024, // 5MB
  multiple = false,
  className = ''
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = async (files) => {
    setError('');
    const fileArray = Array.from(files);
    
    // Validate files
    for (const file of fileArray) {
      if (file.size > maxSize) {
        setError(`File "${file.name}" is too large. Maximum size is ${maxSize / (1024 * 1024)}MB.`);
        return;
      }
    }

    setUploading(true);
    
    try {
      if (multiple) {
        await onUpload(fileArray);
      } else {
        await onUpload(fileArray[0]);
      }
    } catch (err) {
      setError(err.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const onButtonClick = () => {
    inputRef.current?.click();
  };

  const getFileIcon = (accept) => {
    if (accept.includes('image')) return Image;
    return FileText;
  };

  const FileIcon = getFileIcon(accept);

  return (
    <div className={className}>
      <div
        className={`relative border-2 border-dashed rounded-lg p-6 transition-colors ${
          dragActive 
            ? 'border-primary-400 bg-primary-50' 
            : 'border-gray-300 hover:border-gray-400'
        } ${uploading ? 'opacity-50 pointer-events-none' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleChange}
          className="hidden"
        />

        <div className="text-center">
          {uploading ? (
            <div className="space-y-2">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
              <p className="text-sm text-gray-600">Uploading...</p>
            </div>
          ) : (
            <div className="space-y-2">
              <FileIcon className="w-8 h-8 text-gray-400 mx-auto" />
              <div className="space-y-1">
                <p className="text-sm text-gray-600">
                  <button
                    type="button"
                    onClick={onButtonClick}
                    className="font-medium text-primary-600 hover:text-primary-500"
                  >
                    Click to upload
                  </button>
                  {' '}or drag and drop
                </p>
                <p className="text-xs text-gray-500">
                  {accept.includes('image') ? 'PNG, JPG, GIF up to ' : 'Files up to '}
                  {maxSize / (1024 * 1024)}MB
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {error && (
        <div className="mt-2 flex items-center space-x-2 text-red-600">
          <AlertCircle className="w-4 h-4" />
          <p className="text-sm">{error}</p>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
