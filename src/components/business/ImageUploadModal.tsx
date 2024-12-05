import React, { useState } from 'react';
import { Icons } from '../../lib/icons';
import { cn, inputStyles } from '../../lib/utils';

interface ImageUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: {
    logo?: string;
    banner?: string;
    gallery: string[];
  };
  onSave: (images: { logo?: string; banner?: string; gallery: string[] }) => void;
}

export function ImageUploadModal({
  isOpen,
  onClose,
  images: initialImages,
  onSave,
}: ImageUploadModalProps) {
  const [images, setImages] = useState(initialImages);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleImageChange = (type: 'logo' | 'banner' | 'gallery', value: string) => {
    if (type === 'gallery') {
      setImages(prev => ({
        ...prev,
        gallery: [...prev.gallery, value],
      }));
    } else {
      setImages(prev => ({
        ...prev,
        [type]: value,
      }));
    }
  };

  const handleRemoveImage = (type: 'logo' | 'banner' | 'gallery', index?: number) => {
    if (type === 'gallery' && typeof index === 'number') {
      setImages(prev => ({
        ...prev,
        gallery: prev.gallery.filter((_, i) => i !== index),
      }));
    } else {
      setImages(prev => ({
        ...prev,
        [type]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsProcessing(true);
    try {
      await onSave(images);
      onClose();
    } catch (error) {
      console.error('Failed to save images:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">
            Upload Business Images
          </h2>
          <button
            onClick={onClose}
            disabled={isProcessing}
            className={cn(
              "text-gray-400 hover:text-gray-500",
              isProcessing && inputStyles.disabled
            )}
          >
            <Icons.X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {/* Logo Upload */}
            <div>
              <label className={inputStyles.label}>Logo</label>
              <div className="mt-1">
                {images.logo ? (
                  <div className="relative">
                    <img
                      src={images.logo}
                      alt="Business logo"
                      className="h-32 w-full object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage('logo')}
                      className="absolute top-2 right-2 p-1 bg-red-100 rounded-full text-red-600 hover:bg-red-200"
                    >
                      <Icons.X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <input
                      type="url"
                      placeholder="Enter logo URL"
                      className={cn(inputStyles.base, isProcessing && inputStyles.disabled)}
                      disabled={isProcessing}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          const input = e.target as HTMLInputElement;
                          if (input.value) {
                            handleImageChange('logo', input.value);
                            input.value = '';
                          }
                        }
                      }}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Banner Upload */}
            <div>
              <label className={inputStyles.label}>Banner</label>
              <div className="mt-1">
                {images.banner ? (
                  <div className="relative">
                    <img
                      src={images.banner}
                      alt="Business banner"
                      className="h-32 w-full object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage('banner')}
                      className="absolute top-2 right-2 p-1 bg-red-100 rounded-full text-red-600 hover:bg-red-200"
                    >
                      <Icons.X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <input
                      type="url"
                      placeholder="Enter banner URL"
                      className={cn(inputStyles.base, isProcessing && inputStyles.disabled)}
                      disabled={isProcessing}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          const input = e.target as HTMLInputElement;
                          if (input.value) {
                            handleImageChange('banner', input.value);
                            input.value = '';
                          }
                        }
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Gallery Upload */}
          <div>
            <label className={inputStyles.label}>Gallery Images</label>
            <div className="mt-2 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {images.gallery.map((url, index) => (
                <div key={index} className="relative">
                  <img
                    src={url}
                    alt={`Gallery image ${index + 1}`}
                    className="h-32 w-full object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage('gallery', index)}
                    className="absolute top-2 right-2 p-1 bg-red-100 rounded-full text-red-600 hover:bg-red-200"
                  >
                    <Icons.X className="h-4 w-4" />
                  </button>
                </div>
              ))}
              <div className="flex items-center space-x-2">
                <input
                  type="url"
                  placeholder="Enter gallery image URL"
                  className={cn(inputStyles.base, isProcessing && inputStyles.disabled)}
                  disabled={isProcessing}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      const input = e.target as HTMLInputElement;
                      if (input.value) {
                        handleImageChange('gallery', input.value);
                        input.value = '';
                      }
                    }
                  }}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isProcessing}
              className={cn(
                "px-6 py-3 border-2 border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200",
                isProcessing && inputStyles.disabled
              )}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isProcessing}
              className={cn(
                "px-6 py-3 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2",
                isProcessing && inputStyles.disabled
              )}
            >
              {isProcessing ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></div>
                  Processing...
                </div>
              ) : (
                'Save Images'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}