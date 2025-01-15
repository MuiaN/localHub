import React from 'react';
import { ImageUpload } from './ImageUpload';

interface MultiImageUploadProps {
  images: string[];
  onImagesChange: (images: string[]) => void;
  maxImages?: number;
}

export function MultiImageUpload({ images, onImagesChange, maxImages = 5 }: MultiImageUploadProps) {
  const handleImageSelect = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      onImagesChange([...images, reader.result as string]);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = (index: number) => {
    onImagesChange(images.filter((_, i) => i !== index));
  };

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {images.map((image, index) => (
        <ImageUpload
          key={index}
          preview={image}
          onImageSelect={() => {}}
          onRemove={() => handleRemoveImage(index)}
        />
      ))}
      {images.length < maxImages && (
        <ImageUpload onImageSelect={handleImageSelect} />
      )}
    </div>
  );
}