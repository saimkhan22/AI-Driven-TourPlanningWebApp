'use client';

import { useEffect, useRef, useState } from 'react';
import { Loader2 } from 'lucide-react';

interface RouteDirectionMapProps {
  origin: string;
  destination: string;
  waypoints?: string[];
}

export default function RouteDirectionMap({ origin, destination, waypoints = [] }: RouteDirectionMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const directionsRendererRef = useRef<google.maps.DirectionsRenderer | null>(null);

  useEffect(() => {
    if (!origin || !destination) {
      setLoading(false);
      return;
    }

    const initMap = async () => {
      try {
        setLoading(true);
        setError(null);

        // Wait for Google Maps to load
        if (typeof google === 'undefined') {
          setError('Google Maps not loaded');
          setLoading(false);
          return;
        }

        if (!mapRef.current) return;

        // Initialize map
        const map = new google.maps.Map(mapRef.current, {
          zoom: 7,
          center: { lat: 30.3753, lng: 69.3451 }, // Center of Pakistan
          mapTypeControl: false,
          fullscreenControl: false,
          streetViewControl: false,
        });

        mapInstanceRef.current = map;

        // Initialize directions service and renderer
        const directionsService = new google.maps.DirectionsService();
        const directionsRenderer = new google.maps.DirectionsRenderer({
          map: map,
          suppressMarkers: false,
          polylineOptions: {
            strokeColor: '#FF6B35',
            strokeWeight: 5,
            strokeOpacity: 0.8,
          },
        });

        directionsRendererRef.current = directionsRenderer;

        // Build waypoints array
        const waypointsArray = waypoints.map((waypoint) => ({
          location: waypoint + ', Pakistan',
          stopover: true,
        }));

        // Request directions
        const request: google.maps.DirectionsRequest = {
          origin: origin + ', Pakistan',
          destination: destination + ', Pakistan',
          waypoints: waypointsArray,
          travelMode: google.maps.TravelMode.DRIVING,
          optimizeWaypoints: true,
        };

        directionsService.route(request, (result, status) => {
          if (status === 'OK' && result) {
            directionsRenderer.setDirections(result);
            setLoading(false);
          } else {
            console.error('Directions request failed:', status);
            setError('Unable to calculate route. Please try again.');
            setLoading(false);
          }
        });
      } catch (err) {
        console.error('Error initializing map:', err);
        setError('Failed to load map');
        setLoading(false);
      }
    };

    initMap();

    // Cleanup
    return () => {
      if (directionsRendererRef.current) {
        directionsRendererRef.current.setMap(null);
      }
    };
  }, [origin, destination, waypoints]);

  if (!origin || !destination) {
    return (
      <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center">
        <p className="text-gray-500">Enter origin and destination to see route</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-64 bg-gray-100 rounded-lg overflow-hidden">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-90 z-10">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin text-orange-500 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Loading route map...</p>
          </div>
        </div>
      )}
      
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-red-50 z-10">
          <div className="text-center p-4">
            <p className="text-red-600 font-semibold mb-1">Map Error</p>
            <p className="text-sm text-red-500">{error}</p>
          </div>
        </div>
      )}

      <div ref={mapRef} className="w-full h-full" />
    </div>
  );
}

