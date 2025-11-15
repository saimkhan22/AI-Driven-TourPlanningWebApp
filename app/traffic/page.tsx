'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Navigation, Clock, TriangleAlert as AlertTriangle, CircleCheck as CheckCircle, Circle as XCircle, ArrowLeft, Route, Car, Timer, TrendingUp, Zap, Mountain, CloudRain, Sun } from 'lucide-react';
import Link from 'next/link';
import TrafficMap from '@/components/map/TrafficMap';

export default function TrafficPage() {
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [sortBy, setSortBy] = useState('recommended');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const trafficData = [
    {
      route: 'Islamabad to Lahore (M2 Motorway)',
      distance: '375 km',
      normalTime: '4 hours',
      currentTime: '4 hours 30 min',
      delay: '30 min',
      status: 'moderate',
      incidents: ['Fog near Kallar Kahar', 'Heavy traffic at Lahore toll'],
      color: 'yellow',
      weather: 'Foggy'
    },
    {
      route: 'Karachi to Hyderabad (M9)',
      distance: '165 km',
      normalTime: '2 hours',
      currentTime: '3 hours 15 min',
      delay: '1 hour 15 min',
      status: 'heavy',
      incidents: ['Road construction near Kotri', 'Accident at Super Highway'],
      color: 'red',
      weather: 'Hot'
    },
    {
      route: 'Islamabad to Murree',
      distance: '65 km',
      normalTime: '1 hour 30 min',
      currentTime: '1 hour 30 min',
      delay: '0 min',
      status: 'clear',
      incidents: [],
      color: 'green',
      weather: 'Clear'
    },
    {
      route: 'Peshawar to Chitral',
      distance: '320 km',
      normalTime: '7 hours',
      currentTime: '8 hours 30 min',
      delay: '1 hour 30 min',
      status: 'heavy',
      incidents: ['Landslide near Dir', 'Road maintenance at Lowari Pass'],
      color: 'red',
      weather: 'Rainy'
    }
  ];

  const routeOptions = [
    {
      name: 'Fastest Route (M2 Motorway)',
      time: '4 hours 15 min',
      distance: '375 km',
      traffic: 'Light traffic',
      highlights: ['Toll motorway', 'Rest areas available', 'Well maintained'],
      savings: '45 min faster',
      recommended: true,
      weather: 'Clear skies'
    },
    {
      name: 'Scenic Route (GT Road)',
      time: '6 hours 30 min',
      distance: '385 km',
      traffic: 'Moderate traffic',
      highlights: ['Historical sites', 'Local food stops', 'Cultural experience'],
      savings: 'Most scenic',
      weather: 'Partly cloudy'
    },
    {
      name: 'Alternative Route (N5)',
      time: '5 hours 45 min',
      distance: '390 km',
      traffic: 'Heavy traffic',
      highlights: ['Bypass major cities', 'Truck route', 'Industrial areas'],
      savings: 'Avoid city traffic',
      weather: 'Sunny'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'clear': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'moderate': return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'heavy': return <XCircle className="w-5 h-5 text-red-500" />;
      default: return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'clear': return 'bg-green-100 text-green-800';
      case 'moderate': return 'bg-yellow-100 text-yellow-800';
      case 'heavy': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getWeatherIcon = (weather: string) => {
    if (weather.includes('Rain') || weather.includes('Fog')) return <CloudRain className="w-4 h-4 text-blue-500" />;
    return <Sun className="w-4 h-4 text-yellow-500" />;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center text-emerald-600 hover:text-emerald-700">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Home
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                Last updated: {currentTime.toLocaleTimeString()}
              </div>
              <Button variant="outline" size="sm">
                <Zap className="w-4 h-4 mr-2" />
                Live Updates
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Live Traffic Insights for Pakistan</h1>
          <p className="text-lg text-gray-600">AI-powered route optimization with real-time traffic and weather data</p>
        </div>

        {/* Live Traffic Map */}
        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                Live Traffic Map - Pakistan
              </CardTitle>
              <CardDescription>
                Real-time traffic incidents, road closures, and congestion updates across Pakistan
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TrafficMap />
            </CardContent>
          </Card>
        </div>

        {/* Route Planner */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Route className="w-5 h-5 mr-2" />
              Plan Your Route in Pakistan
            </CardTitle>
            <CardDescription>
              Get the fastest route with real-time traffic updates and weather conditions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Select value={fromLocation} onValueChange={setFromLocation}>
                    <SelectTrigger className="pl-10">
                      <SelectValue placeholder="Select starting city" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="islamabad">Islamabad</SelectItem>
                      <SelectItem value="lahore">Lahore</SelectItem>
                      <SelectItem value="karachi">Karachi</SelectItem>
                      <SelectItem value="peshawar">Peshawar</SelectItem>
                      <SelectItem value="quetta">Quetta</SelectItem>
                      <SelectItem value="multan">Multan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
                <div className="relative">
                  <Navigation className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Select value={toLocation} onValueChange={setToLocation}>
                    <SelectTrigger className="pl-10">
                      <SelectValue placeholder="Select destination" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hunza">Hunza Valley</SelectItem>
                      <SelectItem value="skardu">Skardu</SelectItem>
                      <SelectItem value="swat">Swat Valley</SelectItem>
                      <SelectItem value="murree">Murree</SelectItem>
                      <SelectItem value="naran">Naran Kaghan</SelectItem>
                      <SelectItem value="chitral">Chitral</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <Button className="w-full md:w-auto bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700">
              <Navigation className="w-4 h-4 mr-2" />
              Get Directions
            </Button>
          </CardContent>
        </Card>

        {/* Current Traffic Overview */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Current Traffic Conditions</h2>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recommended">Recommended</SelectItem>
                <SelectItem value="fastest">Fastest Route</SelectItem>
                <SelectItem value="shortest">Shortest Distance</SelectItem>
                <SelectItem value="least-traffic">Least Traffic</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {trafficData.map((traffic, index) => (
              <Card key={index} className="border-l-4" style={{ borderLeftColor: traffic.color === 'green' ? '#10b981' : traffic.color === 'yellow' ? '#f59e0b' : '#ef4444' }}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{traffic.route}</CardTitle>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(traffic.status)}
                      {getWeatherIcon(traffic.weather)}
                    </div>
                  </div>
                  <CardDescription className="text-sm text-gray-600">
                    {traffic.distance} • Normal: {traffic.normalTime}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Current Time:</span>
                      <span className="text-lg font-bold">{traffic.currentTime}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Delay:</span>
                      <Badge className={getStatusColor(traffic.status)}>
                        +{traffic.delay}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Weather:</span>
                      <span className="text-sm text-gray-600">{traffic.weather}</span>
                    </div>
                    {traffic.incidents.length > 0 && (
                      <div className="mt-4">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Current Issues:</h4>
                        <ul className="space-y-1">
                          {traffic.incidents.map((incident, i) => (
                            <li key={i} className="text-xs text-gray-600 flex items-start">
                              <AlertTriangle className="w-3 h-3 mr-1 mt-0.5 flex-shrink-0" />
                              {incident}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Route Options */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Recommended Routes</h2>
          <div className="space-y-4">
            {routeOptions.map((route, index) => (
              <Card key={index} className={`${route.recommended ? 'ring-2 ring-emerald-500' : ''}`}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{route.name}</h3>
                        {route.recommended && (
                          <Badge className="ml-2 bg-emerald-100 text-emerald-800">AI Recommended</Badge>
                        )}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center">
                          <Timer className="w-4 h-4 mr-1" />
                          {route.time}
                        </div>
                        <div className="flex items-center">
                          <Car className="w-4 h-4 mr-1" />
                          {route.distance}
                        </div>
                        <div className="flex items-center">
                          <TrendingUp className="w-4 h-4 mr-1" />
                          {route.traffic}
                        </div>
                        <div className="flex items-center">
                          {getWeatherIcon(route.weather)}
                          <span className="ml-1">{route.weather}</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {route.highlights.map((highlight, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            {highlight}
                          </Badge>
                        ))}
                      </div>
                      <div className="text-sm font-medium text-emerald-600">
                        {route.savings}
                      </div>
                    </div>
                    <div className="ml-4">
                      <Button 
                        variant={route.recommended ? "default" : "outline"}
                        className={route.recommended ? "bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700" : ""}
                      >
                        Select Route
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Traffic Insights */}
        <Card>
          <CardHeader>
            <CardTitle>AI Traffic Insights for Pakistan</CardTitle>
            <CardDescription>
              Smart predictions based on Pakistani traffic patterns and weather conditions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">Peak Traffic Times</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Morning Rush</span>
                    <Badge variant="secondary">8:00 AM - 10:00 AM</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Evening Rush</span>
                    <Badge variant="secondary">5:00 PM - 8:00 PM</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Friday Prayer Time</span>
                    <Badge variant="secondary">12:00 PM - 2:00 PM</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Best Travel Time</span>
                    <Badge className="bg-green-100 text-green-800">10:00 AM - 4:00 PM</Badge>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">Smart Recommendations</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-green-500" />
                    Avoid GT Road during peak hours - use motorways
                  </li>
                  <li className="flex items-start">
                    <Mountain className="w-4 h-4 mr-2 mt-0.5 text-green-500" />
                    Northern areas best visited in summer months
                  </li>
                  <li className="flex items-start">
                    <CloudRain className="w-4 h-4 mr-2 mt-0.5 text-green-500" />
                    Check weather alerts for mountain passes
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-green-500" />
                    Fuel up before long journeys - stations may be sparse
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}