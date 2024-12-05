import { useEffect, useState } from 'react';

const SCRIPT_ID = 'google-maps-script';
const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

export function useGoogleMapsScript() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!GOOGLE_MAPS_API_KEY) {
      setError(new Error('Google Maps API key is not configured'));
      return;
    }

    if (window.google?.maps) {
      setIsLoaded(true);
      return;
    }

    const existingScript = document.getElementById(SCRIPT_ID);
    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement('script');
    script.id = SCRIPT_ID;
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`;
    script.async = true;
    script.defer = true;

    const handleLoad = () => {
      console.log('Google Maps script loaded successfully');
      setIsLoaded(true);
    };

    const handleError = () => {
      const error = new Error('Failed to load Google Maps script');
      console.error(error);
      setError(error);
      script.remove();
    };

    script.addEventListener('load', handleLoad);
    script.addEventListener('error', handleError);
    document.head.appendChild(script);

    return () => {
      script.removeEventListener('load', handleLoad);
      script.removeEventListener('error', handleError);
    };
  }, []);

  return { isLoaded, error };
} 