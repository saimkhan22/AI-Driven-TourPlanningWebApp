'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { MapPin, Navigation, Clock, ArrowLeft, Home, Loader2, TrendingDown, Star, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import RealTimeTrafficMap from '@/components/map/RealTimeTrafficMap';
import { getAlternativeRoutes, type OptimizedRoute } from '@/lib/routeOptimization';

export default function TrafficPage() {
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [showMap, setShowMap] = useState(true); // Show map by default
  const [trafficData, setTrafficData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [optimizedRoutes, setOptimizedRoutes] = useState<OptimizedRoute[]>([]);
  const [showRouteDetails, setShowRouteDetails] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCheckTraffic = async () => {
    if (!fromLocation || !toLocation) {
      alert('Please enter both origin and destination');
      return;
    }

    setLoading(true);
    setShowMap(true);
    setShowRouteDetails(true);

    try {
      // Calculate optimal routes using metaheuristic algorithm
      const routes = getAlternativeRoutes(fromLocation, toLocation);
      setOptimizedRoutes(routes);

      // Fetch real-time traffic data from Google Maps
      const response = await fetch(
        `/api/traffic/route?origin=${encodeURIComponent(fromLocation)}&destination=${encodeURIComponent(toLocation)}`
      );
      const data = await response.json();

      if (response.ok) {
        setTrafficData(data.traffic);
      } else {
        // Even if API fails, we still have optimized routes
        console.log('Traffic API failed, showing optimized routes only');
      }
    } catch (error) {
      console.error('Error fetching traffic:', error);
      // Don't show alert, just log - we still have route optimization
    } finally {
      setLoading(false);
    }
  };

  // Function to open Google Maps with directions
  const openGoogleMapsDirections = (route: OptimizedRoute) => {
    const origin = encodeURIComponent(route.path[0] + ', Pakistan');
    const destination = encodeURIComponent(route.path[route.path.length - 1] + ', Pakistan');

    // Add waypoints if there are intermediate stops
    let waypointsParam = '';
    if (route.path.length > 2) {
      const waypoints = route.path.slice(1, -1).map(city => encodeURIComponent(city + ', Pakistan')).join('|');
      waypointsParam = `&waypoints=${waypoints}`;
    }

    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}${waypointsParam}&travelmode=driving`;

    window.open(googleMapsUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Dashboard
              </Button>
            </Link>
            <h1 className="text-xl font-bold">Real-Time Traffic Updates</h1>
          </div>
          <Link href="/">
            <Button variant="outline" className="flex items-center gap-2">
              <Home className="w-4 h-4" />
              Home
            </Button>
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <Navigation className="w-8 h-8 text-orange-500" />
              <div>
                <h2 className="text-2xl font-bold">Live Traffic Monitoring</h2>
                <p className="text-gray-600">Real-time traffic conditions powered by Google Maps</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Current Time</p>
              <p className="text-lg font-semibold">{currentTime.toLocaleTimeString()}</p>
            </div>
          </div>
        </div>

        {/* Popular Routes - Quick Access */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Popular Pakistan Routes</CardTitle>
            <CardDescription>
              Click on any route to check real-time traffic conditions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                { from: 'Islamabad', to: 'Lahore', distance: '375 km', icon: '🏛️' },
                { from: 'Karachi', to: 'Hyderabad', distance: '165 km', icon: '🌊' },
                { from: 'Lahore', to: 'Multan', distance: '340 km', icon: '🕌' },
                { from: 'Islamabad', to: 'Peshawar', distance: '180 km', icon: '⛰️' },
                { from: 'Karachi', to: 'Sukkur', distance: '470 km', icon: '🏜️' },
                { from: 'Lahore', to: 'Faisalabad', distance: '130 km', icon: '🏭' },
                { from: 'Islamabad', to: 'Murree', distance: '60 km', icon: '🏔️' },
                { from: 'Rawalpindi', to: 'Abbottabad', distance: '120 km', icon: '🌲' },
                { from: 'Lahore', to: 'Sialkot', distance: '125 km', icon: '⚽' },
                { from: 'Karachi', to: 'Thatta', distance: '100 km', icon: '🏛️' },
                { from: 'Islamabad', to: 'Muzaffarabad', distance: '140 km', icon: '🏞️' },
                { from: 'Peshawar', to: 'Swat', distance: '170 km', icon: '🌄' },
              ].map((route, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="h-auto p-4 flex flex-col items-start hover:bg-orange-50 hover:border-orange-500 transition-all"
                  onClick={() => {
                    setFromLocation(route.from);
                    setToLocation(route.to);
                    setTimeout(() => handleCheckTraffic(), 100);
                  }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-2xl">{route.icon}</span>
                    <span className="font-semibold text-sm">{route.from} → {route.to}</span>
                  </div>
                  <span className="text-xs text-gray-500">{route.distance}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Search Form */}
        <Card className="mb-6 border-2 border-orange-200 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-orange-50 to-blue-50">
            <CardTitle className="flex items-center gap-2">
              <Navigation className="w-5 h-5 text-orange-500" />
              Find Shortest Path - Any Location
            </CardTitle>
            <CardDescription>
              🗺️ Enter ANY location in Pakistan (cities, towns, landmarks) - Our AI will calculate the shortest path and provide Google Maps directions
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-green-500" />
                  Starting Point
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Any city, town, or landmark"
                    value={fromLocation}
                    onChange={(e) => setFromLocation(e.target.value)}
                    className="pl-10 border-2 focus:border-orange-500"
                  />
                </div>
                <p className="text-xs text-gray-500">e.g., Islamabad, Murree, Faisal Mosque</p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-red-500" />
                  Destination
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Any city, town, or landmark"
                    value={toLocation}
                    onChange={(e) => setToLocation(e.target.value)}
                    className="pl-10 border-2 focus:border-orange-500"
                  />
                </div>
                <p className="text-xs text-gray-500">e.g., Lahore, Hunza, Badshahi Mosque</p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">&nbsp;</label>
                <Button
                  onClick={handleCheckTraffic}
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold h-12"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Calculating Shortest Path...
                    </>
                  ) : (
                    <>
                      <Navigation className="w-5 h-5 mr-2" />
                      Find Shortest Path
                    </>
                  )}
                </Button>
                <p className="text-xs text-center text-gray-500 mt-1">
                  ⚡ Powered by AI Metaheuristic Algorithms
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Optimized Routes Display */}
        {showRouteDetails && optimizedRoutes.length > 0 && (
          <Card className="mb-6 border-2 border-green-200 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50">
              <CardTitle className="flex items-center gap-2">
                <TrendingDown className="w-6 h-6 text-green-600" />
                🎯 Shortest Path Results - AI Optimized
              </CardTitle>
              <CardDescription className="text-base">
                ✨ Routes calculated using advanced metaheuristic algorithms (A* & Dijkstra)
                <br />
                📍 Click "Get Directions on Google Maps" to navigate with real-time traffic
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {optimizedRoutes.map((route, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border-2 ${
                      route.isOptimal
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 bg-white'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-lg">
                          Route {index + 1}
                          {route.isOptimal && (
                            <Badge className="ml-2 bg-green-500">
                              <Star className="w-3 h-3 mr-1" />
                              Optimal
                            </Badge>
                          )}
                        </h3>
                      </div>
                      <Badge variant="outline">{route.algorithm.toUpperCase()}</Badge>
                    </div>

                    <div className="grid md:grid-cols-4 gap-4 mb-3">
                      <div>
                        <p className="text-sm text-gray-600">Distance</p>
                        <p className="font-semibold text-lg">{route.totalDistance} km</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Est. Time</p>
                        <p className="font-semibold text-lg">
                          {Math.floor(route.totalTime / 60)}h {route.totalTime % 60}m
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Est. Cost</p>
                        <p className="font-semibold text-lg">PKR {route.estimatedCost.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Stops</p>
                        <p className="font-semibold text-lg">{route.path.length - 2}</p>
                      </div>
                    </div>

                    <div className="mt-3 pt-3 border-t">
                      <p className="text-sm text-gray-600 mb-2">Route Path:</p>
                      <div className="flex flex-wrap gap-2">
                        {route.path.map((city, idx) => (
                          <div key={idx} className="flex items-center">
                            <Badge variant="secondary">{city}</Badge>
                            {idx < route.path.length - 1 && (
                              <span className="mx-2 text-gray-400">→</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {route.isOptimal && (
                      <div className="mt-3 p-2 bg-green-100 rounded text-sm text-green-800">
                        ✓ This is the shortest route with minimum distance and cost
                      </div>
                    )}

                    {/* Google Maps Direction Button */}
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <p className="text-xs text-blue-800 mb-2 font-medium">
                        🗺️ Ready to navigate? Get turn-by-turn directions:
                      </p>
                      <Button
                        onClick={() => openGoogleMapsDirections(route)}
                        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold shadow-md"
                      >
                        <ExternalLink className="w-5 h-5 mr-2" />
                        Open in Google Maps
                      </Button>
                      <p className="text-xs text-gray-500 mt-2 text-center">
                        Opens in new tab with real-time traffic & navigation
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Traffic Data Display */}
        {trafficData && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Real-Time Traffic Information</CardTitle>
              <CardDescription>Live data from Google Maps</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="text-sm text-gray-600">Duration</p>
                    <p className="font-semibold">{trafficData.duration}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-green-500" />
                  <div>
                    <p className="text-sm text-gray-600">Distance</p>
                    <p className="font-semibold">{trafficData.distance}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Navigation className="w-5 h-5 text-orange-500" />
                  <div>
                    <p className="text-sm text-gray-600">In Traffic</p>
                    <p className="font-semibold">{trafficData.durationInTraffic || trafficData.duration}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Real-Time Traffic Map */}
        <Card>
          <CardHeader>
            <CardTitle>Live Traffic Map</CardTitle>
            <CardDescription>
              Green = Light traffic, Yellow = Moderate traffic, Red = Heavy traffic
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RealTimeTrafficMap 
              origin={fromLocation} 
              destination={toLocation}
            />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

