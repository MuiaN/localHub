import React, { useState } from 'react';
import { X, Upload, Trash2 } from 'lucide-react';
import type { Business } from '../../types';

interface ImageUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: Business['images'];
  onSave: (images: Business['images']) => void;
}

export function ImageUploadModal({
  isOpen,
  onClose,
  images: initialImages,
  onSave,
}: ImageUploadModalProps) {
  const [images, setImages] = useState<Business['images']>(initialImages);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(images);
    onClose();
  };

  const handleImageChange = (type: keyof Business['images'], value: string) => {
    if (type === 'gallery') {
      setImages({
        ...images,
        gallery: [...images.gallery, value],
      });
    } else {
      setImages({
        ...images,
        [type]: value,
      });
    }
  };

  const handleRemoveGalleryImage = (index: number) => {
    setImages({
      ...images,
      gallery: images.gallery.filter((_, i) => i !== index),
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
          <div className="absolute top-0 right-0 pt-4 pr-4">
            <button
              onClick={onClose}
              className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Business Images</h3>
              <p className="mt-1 text-sm text-gray-500">
                Upload your business logo, banner, and gallery images.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Logo</label>
                <div className="mt-1 flex items-center space-x-4">
                  {images.logo && (
                    <img
                      src={images.logo}
                      alt="Business logo"
                      className="h-12 w-12 rounded-full object-cover"
                    />
                  )}
                  <input
                    type="url"
                    value={images.logo || ''}
                    onChange={(e) => handleImageChange('logo', e.target.value)}
                    placeholder="Enter logo URL"
                    className="flex-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Banner</label>
                <div className="mt-1 flex items-center space-x-4">
                  {images.banner && (
                    <img
                      src={images.banner}
                      alt="Business banner"
                      className="h-12 w-24 object-cover rounded"
                    />
                  )}
                  <input
                    type="url"
                    value={images.banner || ''}
                    onChange={(e) => handleImageChange('banner', e.target.value)}
                    placeholder="Enter banner URL"
                    className="flex-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Gallery</label>
                <div className="mt-2 grid grid-cols-2 gap-4">
                  {images.gallery.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={image}
                        alt={`Gallery image ${index + 1}`}
                        className="h-24 w-full object-cover rounded"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveGalleryImage(index)}
                        className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-sm hover:bg-gray-100"
                      >
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="mt-2">
                  <input
                    type="url"
                    placeholder="Enter gallery image URL"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
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

            <div className="mt-5 sm:mt-6">
              <button
                type="submit"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
              >
                Save Images
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}