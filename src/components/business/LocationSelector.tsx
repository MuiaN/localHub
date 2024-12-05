/// <reference types="@types/google.maps" />

import React, { useRef, useState, useCallback, useEffect } from 'react';
import { Icons } from '../../lib/icons';
import { useGoogleMapsScript } from '../../hooks/useGoogleMapsScript';
import { MapContainer } from './MapContainer';

const DEFAULT_CENTER = { lat: -1.2921, lng: 36.8219 }; // Nairobi

interface LocationSelectorProps {
  address?: string;
  city?: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  onChange: (location: {
    address: string;
    city: string;
    coordinates: { lat: number; lng: number };
  }) => void;
}

export function LocationSelector({ address, city, coordinates, onChange }: LocationSelectorProps) {
  const markerRef = useRef<google.maps.Marker | null>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [searchValue, setSearchValue] = useState(address ? `${address}, ${city}` : '');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { isLoaded: isScriptLoaded, error: scriptError } = useGoogleMapsScript();

  // Initialize autocomplete when script is loaded
  useEffect(() => {
    if (isScriptLoaded && searchInputRef.current && !autocompleteRef.current) {
      try {
        const autocomplete = new window.google.maps.places.Autocomplete(searchInputRef.current, {
          fields: ['address_components', 'formatted_address', 'geometry', 'name'],
          types: ['geocode', 'establishment']
        });
        autocompleteRef.current = autocomplete;
      } catch (error) {
        console.error('Error initializing autocomplete:', error);
        setError('Failed to initialize location search');
      }
    }
  }, [isScriptLoaded]);

  const handleMapLoad = useCallback((map: google.maps.Map) => {
    try {
      // Create marker
      const marker = new window.google.maps.Marker({
        map,
        position: coordinates.lat && coordinates.lng ? coordinates : DEFAULT_CENTER,
        draggable: true,
        title: 'Business Location'
      });
      markerRef.current = marker;

      // Bind autocomplete to map
      if (autocompleteRef.current) {
        autocompleteRef.current.bindTo('bounds', map);

        autocompleteRef.current.addListener('place_changed', () => {
          const place = autocompleteRef.current?.getPlace();
          if (!place?.geometry?.location) return;

          if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
          } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);
          }

          marker.setPosition(place.geometry.location);
          updateLocation(place);
        });
      }

      // Add marker drag event
      marker.addListener('dragend', () => {
        const position = marker.getPosition();
        if (!position) return;

        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode(
          { location: position.toJSON() },
          (
            results: google.maps.GeocoderResult[] | null,
            status: google.maps.GeocoderStatus
          ) => {
            if (status === window.google.maps.GeocoderStatus.OK && results && results[0]) {
              updateLocation(results[0]);
            }
          }
        );
      });

      // Add map click event
      map.addListener('click', (e: google.maps.MapMouseEvent) => {
        const clickedLocation = e.latLng;
        if (!clickedLocation) return;

        marker.setPosition(clickedLocation);

        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode(
          { location: clickedLocation.toJSON() },
          (
            results: google.maps.GeocoderResult[] | null,
            status: google.maps.GeocoderStatus
          ) => {
            if (status === window.google.maps.GeocoderStatus.OK && results && results[0]) {
              updateLocation(results[0]);
            }
          }
        );
      });

      setIsLoading(false);
    } catch (error) {
      console.error('Error initializing map:', error);
      setError('Failed to initialize map');
      setIsLoading(false);
    }
  }, [coordinates]);

  const updateLocation = (place: google.maps.GeocoderResult | google.maps.places.PlaceResult) => {
    let newAddress = '';
    let newCity = '';
    
    place.address_components?.forEach((component) => {
      const types = component.types;
      if (types.includes('street_number') || types.includes('route')) {
        newAddress += `${component.long_name} `;
      } else if (types.includes('locality') || types.includes('administrative_area_level_2')) {
        newCity = component.long_name;
      }
    });

    newAddress = newAddress.trim() || place.formatted_address || 'Unknown Address';
    newCity = newCity || 'Unknown City';

    const position = place.geometry?.location;
    if (position) {
      const coordinates = {
        lat: typeof position.lat === 'function' ? position.lat() : position.lat,
        lng: typeof position.lng === 'function' ? position.lng() : position.lng
      } as { lat: number; lng: number };

      onChange({
        address: newAddress,
        city: newCity,
        coordinates
      });

      setSearchValue(place.formatted_address || `${newAddress}, ${newCity}`);
    }
  };

  if (scriptError) {
    return (
      <div className="p-4 bg-red-50 rounded-lg border-2 border-red-200">
        <div className="flex items-center text-red-600">
          <Icons.AlertTriangle className="h-5 w-5 mr-2" />
          <p className="font-medium">Failed to load Google Maps</p>
        </div>
        <p className="mt-2 text-sm text-red-500">{scriptError.message}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        <input
          ref={searchInputRef}
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Enter your business location"
          className="w-full h-12 px-4 py-3 pl-12 text-base border-2 border-gray-200 rounded-lg 
          focus:ring-2 focus:ring-blue-400 focus:border-blue-400 
          hover:border-gray-300 transition-colors duration-200
          placeholder-gray-400 bg-white"
        />
        <Icons.Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
      </div>

      <div className="w-full h-[400px] rounded-lg border-2 border-gray-200 overflow-hidden">
        {!isScriptLoaded ? (
          <div className="w-full h-full flex items-center justify-center bg-gray-50">
            <div className="animate-spin rounded-full h-10 w-10 border-3 border-blue-400 border-t-transparent"></div>
          </div>
        ) : (
          <MapContainer
            center={coordinates.lat && coordinates.lng ? coordinates : DEFAULT_CENTER}
            onMapLoad={handleMapLoad}
          />
        )}
      </div>

      <div className="text-sm text-gray-600 bg-gray-50 p-4 rounded-lg border-2 border-gray-200">
        <p className="font-medium mb-2">Location Selection Options:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Search for your location using the search box above</li>
          <li>Click anywhere on the map to place a marker</li>
          <li>Drag the marker to adjust the exact location</li>
        </ul>
      </div>

      {error && (
        <div className="p-4 bg-red-50 rounded-lg border-2 border-red-200">
          <div className="flex items-center text-red-600">
            <Icons.AlertTriangle className="h-5 w-5 mr-2" />
            <p className="font-medium">{error}</p>
          </div>
        </div>
      )}
    </div>
  );
} 