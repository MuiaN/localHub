import React from 'react';
import { Icons } from '../../lib/icons';
import { cn, inputStyles } from '../../lib/utils';

interface ImagesSectionProps {
  images: {
    logo?: string;
    banner?: string;
    gallery: string[];
  };
  isProcessing: boolean;
  onImageUpload: (type: 'logo' | 'banner' | 'gallery') => void;
  onImageRemove: (type: 'logo' | 'banner' | 'gallery', index?: number) => void;
}

export function ImagesSection({
  images,
  isProcessing,
  onImageUpload,
  onImageRemove,
}: ImagesSectionProps) {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Business Images</h3>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label className={inputStyles.label}>Logo</label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
            <div className="space-y-1 text-center">
              {images.logo ? (
                <div className="relative">
                  <img
                    src={images.logo}
                    alt="Business logo"
                    className="mx-auto h-24 w-24 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => onImageRemove('logo')}
                    disabled={isProcessing}
                    className={cn(
                      "absolute top-0 right-0 p-1 bg-red-100 rounded-full text-red-600 hover:bg-red-200",
                      isProcessing && inputStyles.disabled
                    )}
                  >
                    <Icons.X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <>
                  <Icons.Image className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <button
                      type="button"
                      onClick={() => onImageUpload('logo')}
                      disabled={isProcessing}
                      className={cn(
                        "relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500",
                        isProcessing && inputStyles.disabled
                      )}
                    >
                      Upload logo
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <div>
          <label className={inputStyles.label}>Banner</label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
            <div className="space-y-1 text-center">
              {images.banner ? (
                <div className="relative">
                  <img
                    src={images.banner}
                    alt="Business banner"
                    className="mx-auto h-24 w-full object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => onImageRemove('banner')}
                    disabled={isProcessing}
                    className={cn(
                      "absolute top-0 right-0 p-1 bg-red-100 rounded-full text-red-600 hover:bg-red-200",
                      isProcessing && inputStyles.disabled
                    )}
                  >
                    <Icons.X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <>
                  <Icons.Image className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <button
                      type="button"
                      onClick={() => onImageUpload('banner')}
                      disabled={isProcessing}
                      className={cn(
                        "relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500",
                        isProcessing && inputStyles.disabled
                      )}
                    >
                      Upload banner
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="sm:col-span-2">
          <label className={inputStyles.label}>Gallery</label>
          <div className="mt-2 grid grid-cols-3 gap-4">
            {images.gallery.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={image}
                  alt={`Gallery image ${index + 1}`}
                  className="h-24 w-full object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => onImageRemove('gallery', index)}
                  disabled={isProcessing}
                  className={cn(
                    "absolute top-0 right-0 p-1 bg-red-100 rounded-full text-red-600 hover:bg-red-200",
                    isProcessing && inputStyles.disabled
                  )}
                >
                  <Icons.X className="h-4 w-4" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => onImageUpload('gallery')}
              disabled={isProcessing}
              className={cn(
                "h-24 flex items-center justify-center border-2 border-gray-300 border-dashed rounded-lg hover:border-gray-400",
                isProcessing && inputStyles.disabled
              )}
            >
              <Icons.Plus className="h-8 w-8 text-gray-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 