// Image compression and manipulation utilities
export const compressImage = (file, maxWidth = 800, maxHeight = 600, quality = 0.8) => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      // Calculate new dimensions
      let { width, height } = img;
      
      if (width > height) {
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width = (width * maxHeight) / height;
          height = maxHeight;
        }
      }

      canvas.width = width;
      canvas.height = height;

      // Draw and compress
      ctx.drawImage(img, 0, 0, width, height);
      
      canvas.toBlob(resolve, 'image/jpeg', quality);
    };

    img.src = URL.createObjectURL(file);
  });
};

// Resize image while maintaining aspect ratio
export const resizeImage = (file, maxWidth, maxHeight) => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      const ratio = Math.min(maxWidth / img.width, maxHeight / img.height);
      const width = img.width * ratio;
      const height = img.height * ratio;

      canvas.width = width;
      canvas.height = height;

      ctx.drawImage(img, 0, 0, width, height);
      
      canvas.toBlob(resolve, file.type, 0.9);
    };

    img.src = URL.createObjectURL(file);
  });
};

// Create image thumbnail
export const createThumbnail = (file, size = 150) => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      canvas.width = size;
      canvas.height = size;

      // Calculate crop dimensions for square thumbnail
      const minDimension = Math.min(img.width, img.height);
      const x = (img.width - minDimension) / 2;
      const y = (img.height - minDimension) / 2;

      ctx.drawImage(img, x, y, minDimension, minDimension, 0, 0, size, size);
      
      canvas.toBlob(resolve, 'image/jpeg', 0.8);
    };

    img.src = URL.createObjectURL(file);
  });
};

// Get image dimensions
export const getImageDimensions = (file) => {
  return new Promise((resolve) => {
    const img = new Image();
    
    img.onload = () => {
      resolve({
        width: img.width,
        height: img.height,
        aspectRatio: img.width / img.height
      });
    };

    img.src = URL.createObjectURL(file);
  });
};

// Convert image to base64
export const imageToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

// Validate image file
export const validateImageFile = (file, options = {}) => {
  const {
    maxSize = 5 * 1024 * 1024, // 5MB
    allowedTypes = ['image/jpeg', 'image/png', 'image/gif'],
    minWidth = 0,
    minHeight = 0,
    maxWidth = Infinity,
    maxHeight = Infinity
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

  // Check dimensions (returns promise for async validation)
  return getImageDimensions(file).then(dimensions => {
    if (dimensions.width < minWidth) {
      errors.push(`Image width must be at least ${minWidth}px`);
    }
    
    if (dimensions.height < minHeight) {
      errors.push(`Image height must be at least ${minHeight}px`);
    }
    
    if (dimensions.width > maxWidth) {
      errors.push(`Image width must be less than ${maxWidth}px`);
    }
    
    if (dimensions.height > maxHeight) {
      errors.push(`Image height must be less than ${maxHeight}px`);
    }

    return {
      isValid: errors.length === 0,
      errors,
      dimensions
    };
  });
};

// Create image preview URL
export const createPreviewUrl = (file) => {
  return URL.createObjectURL(file);
};

// Clean up preview URL
export const revokePreviewUrl = (url) => {
  URL.revokeObjectURL(url);
};

// Generate placeholder image
export const generatePlaceholder = (width, height, text = '', bgColor = '#f3f4f6', textColor = '#6b7280') => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  canvas.width = width;
  canvas.height = height;
  
  // Fill background
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, width, height);
  
  if (text) {
    // Add text
    ctx.fillStyle = textColor;
    ctx.font = `${Math.min(width, height) / 8}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, width / 2, height / 2);
  }
  
  return canvas.toDataURL();
};

// Extract dominant color from image
export const getDominantColor = (imageElement) => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  canvas.width = imageElement.width;
  canvas.height = imageElement.height;
  
  ctx.drawImage(imageElement, 0, 0);
  
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  
  let r = 0, g = 0, b = 0;
  let pixelCount = 0;
  
  for (let i = 0; i < data.length; i += 4) {
    r += data[i];
    g += data[i + 1];
    b += data[i + 2];
    pixelCount++;
  }
  
  r = Math.floor(r / pixelCount);
  g = Math.floor(g / pixelCount);
  b = Math.floor(b / pixelCount);
  
  return `rgb(${r}, ${g}, ${b})`;
};
