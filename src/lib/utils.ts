import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const inputStyles = {
  base: `block w-full h-12 px-4 py-3 text-base border-2 border-blue-200 rounded-lg
    focus:ring-1 focus:ring-blue-500 focus:border-blue-500
    hover:border-blue-300 transition-colors duration-200
    placeholder-gray-400 bg-white outline-none`,
  textarea: `block w-full min-h-[100px] px-4 py-3 text-base border-2 border-blue-200 rounded-lg
    focus:ring-1 focus:ring-blue-500 focus:border-blue-500
    hover:border-blue-300 transition-colors duration-200
    placeholder-gray-400 bg-white resize-none outline-none`,
  select: `block w-full h-12 px-4 py-3 text-base border-2 border-blue-200 rounded-lg
    focus:ring-1 focus:ring-blue-500 focus:border-blue-500
    hover:border-blue-300 transition-colors duration-200
    bg-white outline-none`,
  label: `block text-sm font-medium text-gray-700 mb-2`,
  error: `p-4 bg-red-50 rounded-lg border-2 border-red-200 text-red-600 font-medium`,
  disabled: `bg-gray-100 cursor-not-allowed opacity-60`,
};