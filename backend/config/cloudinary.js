const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload image with transformations
const uploadImage = async (filePath, options = {}) => {
  try {
    const defaultOptions = {
      folder: 'matrimony',
      transformation: [
        { width: 800, height: 600, crop: 'limit' },
        { quality: 'auto' },
        { fetch_format: 'auto' }
      ]
    };

    const uploadOptions = { ...defaultOptions, ...options };
    const result = await cloudinary.uploader.upload(filePath, uploadOptions);
    
    return {
      success: true,
      url: result.secure_url,
      public_id: result.public_id,
      width: result.width,
      height: result.height
    };
  } catch (error) {
    return {
      success: false,
      message: error.message
    };
  }
};

// Delete image
const deleteImage = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return {
      success: result.result === 'ok',
      result: result.result
    };
  } catch (error) {
    return {
      success: false,
      message: error.message
    };
  }
};

// Generate signed URL for secure uploads
const generateSignedUrl = (publicId, options = {}) => {
  const defaultOptions = {
    sign_url: true,
    type: 'authenticated'
  };
  
  const urlOptions = { ...defaultOptions, ...options };
  return cloudinary.url(publicId, urlOptions);
};

module.exports = {
  cloudinary,
  uploadImage,
  deleteImage,
  generateSignedUrl
};
