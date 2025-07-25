import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { Crop, RotateCw, ZoomIn, ZoomOut } from 'lucide-react';
import Modal from '../common/Modal';
import Button from '../common/Button';

const ImageCropper = ({ 
  image, 
  isOpen, 
  onClose, 
  onCropComplete,
  aspect = 1,
  shape = 'rect' // 'rect' or 'round'
}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropCompleteCallback = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const createImage = (url) =>
    new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener('load', () => resolve(image));
      image.addEventListener('error', error => reject(error));
      image.setAttribute('crossOrigin', 'anonymous');
      image.src = url;
    });

  const getCroppedImg = async (imageSrc, pixelCrop, rotation = 0) => {
    const image = await createImage(imageSrc);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const maxSize = Math.max(image.width, image.height);
    const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2));

    canvas.width = safeArea;
    canvas.height = safeArea;

    ctx.translate(safeArea / 2, safeArea / 2);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.translate(-safeArea / 2, -safeArea / 2);

    ctx.drawImage(
      image,
      safeArea / 2 - image.width * 0.5,
      safeArea / 2 - image.height * 0.5
    );

    const data = ctx.getImageData(0, 0, safeArea, safeArea);

    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    ctx.putImageData(
      data,
      Math.round(0 - safeArea / 2 + image.width * 0.5 - pixelCrop.x),
      Math.round(0 - safeArea / 2 + image.height * 0.5 - pixelCrop.y)
    );

    return new Promise(resolve => {
      canvas.toBlob(resolve, 'image/jpeg', 0.8);
    });
  };

  const handleSave = async () => {
    try {
      const croppedImage = await getCroppedImg(image, croppedAreaPixels, rotation);
      onCropComplete(croppedImage);
      onClose();
    } catch (error) {
      console.error('Error cropping image:', error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Crop Image"
      size="lg"
      className="p-0"
    >
      <div className="space-y-4">
        {/* Cropper */}
        <div className="relative h-96 bg-gray-100">
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            rotation={rotation}
            aspect={aspect}
            cropShape={shape}
            showGrid={false}
            onCropChange={setCrop}
            onCropComplete={onCropCompleteCallback}
            onZoomChange={setZoom}
            onRotationChange={setRotation}
          />
        </div>

        {/* Controls */}
        <div className="space-y-4 p-4">
          {/* Zoom */}
          <div className="flex items-center space-x-4">
            <ZoomOut className="w-4 h-4 text-gray-600" />
            <input
              type="range"
              value={zoom}
              min={1}
              max={3}
              step={0.1}
              onChange={(e) => setZoom(e.target.value)}
              className="flex-1"
            />
            <ZoomIn className="w-4 h-4 text-gray-600" />
          </div>

          {/* Rotation */}
          <div className="flex items-center space-x-4">
            <RotateCw className="w-4 h-4 text-gray-600" />
            <input
              type="range"
              value={rotation}
              min={0}
              max={360}
              step={1}
              onChange={(e) => setRotation(e.target.value)}
              className="flex-1"
            />
            <span className="text-sm text-gray-600 w-12">{rotation}°</span>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSave} icon={Crop}>
              Crop & Save
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ImageCropper;
