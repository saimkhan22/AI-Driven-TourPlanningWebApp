'use client';

import { useEffect, useRef, useState } from 'react';
import { Loader2, MapPin, Navigation2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface InteractiveMapProps {
  origin?: string;
  destination?: string;
  locations?: Array<{ name: string; lat: number; lng: number }>;
  height?: string;
}

export default function InteractiveMap({ 
  origin, 
  destination, 
  locations = [],
  height = '600px' 
}: InteractiveMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [useGoogleMaps, setUseGoogleMaps] = useState(true);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

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
          console.log('Location access denied, using default location');
          // Default to Islamabad
          setUserLocation({ lat: 33.6844, lng: 73.0479 });
        }
      );
    } else {
      setUserLocation({ lat: 33.6844, lng: 73.0479 });
    }
  }, []);

  useEffect(() => {
    if (!userLocation) return;

    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    
    // Check if Google Maps API is available
    if (!apiKey || apiKey.includes('your_') || apiKey.includes('YOUR_')) {
      setUseGoogleMaps(false);
      setLoading(false);
      return;
    }

    // Load Google Maps
    const loadGoogleMaps = () => {
      if (typeof window.google !== 'undefined') {
        initializeGoogleMap();
        return;
      }

      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => initializeGoogleMap();
      script.onerror = () => {
        console.error('Failed to load Google Maps');
        setUseGoogleMaps(false);
        setLoading(false);
      };
      document.head.appendChild(script);
    };

    const initializeGoogleMap = () => {
      if (!mapRef.current) return;

      try {
        const map = new google.maps.Map(mapRef.current, {
          center: userLocation,
          zoom: 12,
          mapTypeControl: true,
          streetViewControl: true,
          fullscreenControl: true,
        });

        // Add traffic layer
        const trafficLayer = new google.maps.TrafficLayer();
        trafficLayer.setMap(map);

        // Add user location marker
        new google.maps.Marker({
          position: userLocation,
          map: map,
          title: 'Your Location',
          icon: {
            url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
          },
        });

        // Add markers for locations
        locations.forEach((loc) => {
          new google.maps.Marker({
            position: { lat: loc.lat, lng: loc.lng },
            map: map,
            title: loc.name,
          });
        });

        // Draw route if origin and destination provided
        if (origin && destination) {
          const directionsService = new google.maps.DirectionsService();
          const directionsRenderer = new google.maps.DirectionsRenderer({
            map: map,
            suppressMarkers: false,
          });

          directionsService.route(
            {
              origin: origin,
              destination: destination,
              travelMode: google.maps.TravelMode.DRIVING,
              drivingOptions: {
                departureTime: new Date(),
                trafficModel: google.maps.TrafficModel.BEST_GUESS,
              },
            },
            (result, status) => {
              if (status === google.maps.DirectionsStatus.OK && result) {
                directionsRenderer.setDirections(result);
              }
            }
          );
        }

        setLoading(false);
      } catch (err) {
        console.error('Error initializing Google Maps:', err);
        setUseGoogleMaps(false);
        setLoading(false);
      }
    };

    loadGoogleMaps();
  }, [userLocation, origin, destination, locations]);

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center bg-gray-100 rounded-lg" style={{ height }}>
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-orange-500" />
          <p className="text-gray-600">Loading map...</p>
        </div>
      </div>
    );
  }

  // Fallback to embedded map or OpenStreetMap
  if (!useGoogleMaps) {
    return (
      <div className="w-full rounded-lg overflow-hidden shadow-lg bg-white" style={{ height }}>
        {origin && destination ? (
          <div className="relative w-full h-full">
            {/* OpenStreetMap with Leaflet */}
            <div className="w-full h-full bg-gray-100 flex flex-col items-center justify-center p-8">
              <MapPin className="w-16 h-16 text-orange-500 mb-4" />
              <h3 className="text-xl font-bold mb-2">Route: {origin} → {destination}</h3>
              <p className="text-gray-600 mb-6 text-center">
                Google Maps API not configured. Click below to view route in Google Maps.
              </p>
              <div className="flex gap-4">
                <a
                  href={`https://www.google.com/maps/dir/${encodeURIComponent(origin)}/${encodeURIComponent(destination)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors flex items-center gap-2"
                >
                  <Navigation2 className="w-5 h-5" />
                  Open in Google Maps
                </a>
                <a
                  href={`https://www.openstreetmap.org/directions?engine=fossgis_osrm_car&route=${encodeURIComponent(origin)}%3B${encodeURIComponent(destination)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
                >
                  <MapPin className="w-5 h-5" />
                  Open in OpenStreetMap
                </a>
              </div>

              {/* Simple route visualization */}
              <div className="mt-8 w-full max-w-md bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">
                      A
                    </div>
                    <div>
                      <p className="font-semibold">Origin</p>
                      <p className="text-sm text-gray-600">{origin}</p>
                    </div>
                  </div>
                </div>

                <div className="my-4 ml-5 border-l-2 border-dashed border-gray-300 h-12"></div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-white font-bold">
                      B
                    </div>
                    <div>
                      <p className="font-semibold">Destination</p>
                      <p className="text-sm text-gray-600">{destination}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full h-full bg-gray-100 flex flex-col items-center justify-center p-8">
            <MapPin className="w-16 h-16 text-gray-400 mb-4" />
            <h3 className="text-xl font-bold mb-2">Enter locations to view map</h3>
            <p className="text-gray-600 text-center">
              Enter origin and destination to see the route
            </p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative">
      <div ref={mapRef} className="w-full rounded-lg shadow-lg" style={{ height }} />

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
            <Navigation2 className="w-4 h-4" />
            Open in Google Maps
          </a>
        </div>
      )}
    </div>
  );
}


