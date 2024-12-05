import React, { useEffect, useRef, useState } from 'react';
import { Icons } from '../../lib/icons';

interface MapContainerProps {
  onMapLoad: (map: google.maps.Map) => void;
  center: google.maps.LatLngLiteral;
}

export function MapContainer({ onMapLoad, center }: MapContainerProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!mapRef.current || !window.google?.maps) return;

    try {
      // Initialize new map
      const map = new window.google.maps.Map(mapRef.current, {
        center,
        zoom: 16,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        zoomControl: true,
        gestureHandling: 'cooperative'
      });

      // Store the map instance
      mapInstanceRef.current = map;
      
      // Create and add the marker
      const marker = new window.google.maps.Marker({
        position: center,
        map,
        title: 'Business Location'
      });

      // Notify parent component
      onMapLoad(map);

      // Force a resize after a short delay to ensure the map fills its container
      setTimeout(() => {
        google.maps.event.trigger(map, 'resize');
        map.setCenter(center);
      }, 100);

    } catch (error) {
      console.error('Error initializing map:', error);
      setError('Failed to initialize map. Please try refreshing the page.');
    }

    return () => {
      if (mapInstanceRef.current) {
        google.maps.event.clearInstanceListeners(mapInstanceRef.current);
        mapInstanceRef.current = null;
      }
    };
  }, [center, onMapLoad]);

  if (error) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center bg-red-50 rounded-lg border-2 border-red-200 p-4">
        <div className="flex items-center text-red-600">
          <Icons.AlertTriangle className="h-5 w-5 mr-2" />
          <span>{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={mapRef}
      className="w-full h-[400px] rounded-lg bg-gray-50"
    />
  );
} 