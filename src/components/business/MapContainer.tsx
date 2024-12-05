import React, { useEffect, useRef } from 'react';

interface MapContainerProps {
  onMapLoad: (map: google.maps.Map) => void;
  center: google.maps.LatLngLiteral;
}

export function MapContainer({ onMapLoad, center }: MapContainerProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || !window.google?.maps) return;

    const map = new window.google.maps.Map(mapRef.current, {
      center,
      zoom: 16,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
      zoomControl: true,
      gestureHandling: 'cooperative'
    });

    google.maps.event.addListenerOnce(map, 'idle', () => {
      if (mapRef.current) {
        google.maps.event.trigger(map, 'resize');
        map.setCenter(center);
      }
    });

    mapInstanceRef.current = map;
    onMapLoad(map);

    return () => {
      if (mapInstanceRef.current) {
        window.google?.maps.event.clearInstanceListeners(mapInstanceRef.current);
        mapInstanceRef.current = null;
      }
    };
  }, [center, onMapLoad]);

  return (
    <div
      ref={mapRef}
      className="w-full h-full rounded-lg bg-gray-50"
      style={{ minHeight: '100%' }}
    />
  );
} 