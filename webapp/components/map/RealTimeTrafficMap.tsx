'use client';

import { useEffect, useRef, useState } from 'react';
import { Loader2 } from 'lucide-react';

interface RealTimeTrafficMapProps {
  origin?: string;
  destination?: string;
}

export default function RealTimeTrafficMap({ origin, destination }: RealTimeTrafficMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const directionsServiceRef = useRef<google.maps.DirectionsService | null>(null);
  const directionsRendererRef = useRef<google.maps.DirectionsRenderer | null>(null);
  const trafficLayerRef = useRef<google.maps.TrafficLayer | null>(null);

  useEffect(() => {
    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Error getting location:', error);
          // Default to Islamabad if location access denied
          setUserLocation({ lat: 33.6844, lng: 73.0479 });
        }
      );
    } else {
      // Default to Islamabad
      setUserLocation({ lat: 33.6844, lng: 73.0479 });
    }
  }, []);

  useEffect(() => {
    if (!userLocation) return;

    const loadGoogleMaps = () => {
      if (typeof window.google !== 'undefined') {
        initializeMap();
        return;
      }

      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => initializeMap();
      script.onerror = () => {
        setError('Failed to load Google Maps');
        setLoading(false);
      };
      document.head.appendChild(script);
    };

    const initializeMap = () => {
      if (!mapRef.current) return;

      try {
        const mapInstance = new google.maps.Map(mapRef.current, {
          center: userLocation,
          zoom: 12,
          mapTypeControl: true,
          streetViewControl: true,
          fullscreenControl: true,
        });

        setMap(mapInstance);

        // Add traffic layer
        const trafficLayer = new google.maps.TrafficLayer();
        trafficLayer.setMap(mapInstance);
        trafficLayerRef.current = trafficLayer;

        // Add marker for user location
        new google.maps.Marker({
          position: userLocation,
          map: mapInstance,
          title: 'Your Location',
          icon: {
            url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
          },
        });

        // Initialize directions service and renderer
        directionsServiceRef.current = new google.maps.DirectionsService();
        directionsRendererRef.current = new google.maps.DirectionsRenderer({
          map: mapInstance,
          suppressMarkers: false,
        });

        setLoading(false);
      } catch (err) {
        console.error('Error initializing map:', err);
        setError('Failed to initialize map');
        setLoading(false);
      }
    };

    loadGoogleMaps();
  }, [userLocation]);

  useEffect(() => {
    if (!map || !origin || !destination || !directionsServiceRef.current || !directionsRendererRef.current) {
      return;
    }

    // Calculate and display route
    const request: google.maps.DirectionsRequest = {
      origin: origin,
      destination: destination,
      travelMode: google.maps.TravelMode.DRIVING,
      drivingOptions: {
        departureTime: new Date(),
        trafficModel: google.maps.TrafficModel.BEST_GUESS,
      },
    };

    directionsServiceRef.current.route(request, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK && result) {
        directionsRendererRef.current?.setDirections(result);
      } else {
        console.error('Directions request failed:', status);
      }
    });
  }, [map, origin, destination]);

  if (loading) {
    return (
      <div className="w-full h-[600px] flex items-center justify-center bg-gray-100 rounded-lg">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-orange-500" />
          <p className="text-gray-600">Loading map...</p>
        </div>
      </div>
    );
  }

  if (error) {
    // Fallback: Show embedded Google Maps iframe
    if (origin && destination) {
      const mapsUrl = `https://www.google.com/maps/embed/v1/directions?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || 'YOUR_API_KEY'}&origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&mode=driving`;

      return (
        <div className="w-full h-[600px] rounded-lg overflow-hidden shadow-lg">
          <iframe
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src={mapsUrl}
          />
        </div>
      );
    }

    return (
      <div className="w-full h-[600px] flex items-center justify-center bg-gray-100 rounded-lg">
        <div className="text-center p-6">
          <p className="text-red-600 mb-4">{error}</p>
          <p className="text-gray-600 text-sm">
            Please configure Google Maps API key in environment variables
          </p>
          {origin && destination && (
            <a
              href={`https://www.google.com/maps/dir/${encodeURIComponent(origin)}/${encodeURIComponent(destination)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              Open in Google Maps
            </a>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div ref={mapRef} className="w-full h-[600px] rounded-lg shadow-lg" />

      {/* Traffic Legend */}
      <div className="absolute top-4 left-4 bg-white p-3 rounded-lg shadow-md">
        <p className="font-semibold text-sm mb-2">Traffic Conditions</p>
        <div className="flex items-center gap-2 text-sm">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span>Light Traffic</span>
        </div>
        <div className="flex items-center gap-2 text-sm mt-1">
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <span>Moderate Traffic</span>
        </div>
        <div className="flex items-center gap-2 text-sm mt-1">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <span>Heavy Traffic</span>
        </div>
        <div className="flex items-center gap-2 text-sm mt-1">
          <div className="w-3 h-3 bg-gray-700 rounded-full"></div>
          <span>Very Heavy</span>
        </div>
      </div>

      {/* Open in Google Maps Button */}
      {origin && destination && (
        <div className="absolute top-4 right-4">
          <a
            href={`https://www.google.com/maps/dir/${encodeURIComponent(origin)}/${encodeURIComponent(destination)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-shadow text-sm font-medium text-orange-600 hover:text-orange-700 flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            Open in Google Maps
          </a>
        </div>
      )}
    </div>
  );
}

