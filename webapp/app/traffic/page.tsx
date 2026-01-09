'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { MapPin, Navigation, Clock, ArrowLeft, Home, Loader2, TrendingDown, Star } from 'lucide-react';
import Link from 'next/link';
import RealTimeTrafficMap from '@/components/map/RealTimeTrafficMap';
import { findOptimalRoute, getAlternativeRoutes, type OptimizedRoute } from '@/lib/routeOptimization';

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
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Custom Route Traffic Check</CardTitle>
            <CardDescription>
              Enter any origin and destination in Pakistan to see real-time traffic
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">From</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="e.g., Islamabad"
                    value={fromLocation}
                    onChange={(e) => setFromLocation(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">To</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="e.g., Lahore"
                    value={toLocation}
                    onChange={(e) => setToLocation(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">&nbsp;</label>
                <Button
                  onClick={handleCheckTraffic}
                  className="w-full bg-orange-500 hover:bg-orange-600"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    <>
                      <Navigation className="w-4 h-4 mr-2" />
                      Check Traffic
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Optimized Routes Display */}
        {showRouteDetails && optimizedRoutes.length > 0 && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingDown className="w-5 h-5 text-green-500" />
                Optimized Routes (AI-Powered)
              </CardTitle>
              <CardDescription>
                Routes calculated using advanced metaheuristic algorithms (A* & Dijkstra)
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

