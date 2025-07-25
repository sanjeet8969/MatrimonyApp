import api from './api';

export const uploadService = {
  // Upload single image
  uploadImage: async (file, options = {}) => {
    const formData = new FormData();
    formData.append('image', file);
    
    if (options.folder) {
      formData.append('folder', options.folder);
    }
    
    const response = await api.post('/uploads/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress: options.onProgress
    });
    
    return response.data;
  },

  // Upload multiple images
  uploadImages: async (files, options = {}) => {
    const formData = new FormData();
    
    files.forEach((file, index) => {
      formData.append(`images`, file);
    });
    
    if (options.folder) {
      formData.append('folder', options.folder);
    }
    
    const response = await api.post('/uploads/images', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress: options.onProgress
    });
    
    return response.data;
  },

  // Upload document
  uploadDocument: async (file, options = {}) => {
    const formData = new FormData();
    formData.append('document', file);
    
    if (options.folder) {
      formData.append('folder', options.folder);
    }
    
    const response = await api.post('/uploads/document', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress: options.onProgress
    });
    
    return response.data;
  },

  // Delete uploaded file
  deleteFile: async (publicId) => {
    const response = await api.delete(`/uploads/${publicId}`);
    return response.data;
  },

  // Get signed URL for direct upload
  getSignedUrl: async (fileName, fileType, folder = 'general') => {
    const response = await api.post('/uploads/signed-url', {
      fileName,
      fileType,
      folder
    });
    return response.data;
  },

  // Upload file using signed URL
  uploadToSignedUrl: async (signedUrl, file, options = {}) => {
    const response = await fetch(signedUrl, {
      method: 'PUT',
      body: file,
      headers: {
        'Content-Type': file.type
      }
    });
    
    if (!response.ok) {
      throw new Error('Upload failed');
    }
    
    return response;
  },

  // Validate file before upload
  validateFile: (file, options = {}) => {
    const {
      maxSize = 5 * 1024 * 1024, // 5MB
      allowedTypes = ['image/jpeg', 'image/png', 'image/gif'],
      maxWidth = null,
      maxHeight = null
    } = options;

    const errors = [];

    // Check file size
    if (file.size > maxSize) {
      errors.push(`File size must be less than ${maxSize / (1024 * 1024)}MB`);
    }

    // Check file type
    if (!allowedTypes.includes(file.type)) {
      errors.push(`File type must be one of: ${allowedTypes.join(', ')}`);
    }

    // Check image dimensions (if applicable)
    if (file.type.startsWith('image/') && (maxWidth || maxHeight)) {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          if (maxWidth && img.width > maxWidth) {
            errors.push(`Image width must be less than ${maxWidth}px`);
          }
          if (maxHeight && img.height > maxHeight) {
            errors.push(`Image height must be less than ${maxHeight}px`);
          }
          resolve({ valid: errors.length === 0, errors });
        };
        img.src = URL.createObjectURL(file);
      });
    }

    return Promise.resolve({ valid: errors.length === 0, errors });
  }
};
