'use client';

import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TriangleAlert as AlertTriangle, CircleCheck as CheckCircle, Circle as XCircle, Navigation, Clock, MapPin, Zap, Car, Construction, CloudRain, RefreshCw } from 'lucide-react';

interface TrafficIncident {
  id: number;
  type: 'accident' | 'construction' | 'congestion' | 'weather' | 'closure';
  severity: 'low' | 'medium' | 'high';
  location: string;
  coordinates: [number, number];
  description: string;
  reportedAt: string;
  estimatedClearTime?: string;
  affectedRoutes: string[];
  delay: string;
}

interface UserLocation {
  lat: number;
  lng: number;
  accuracy: number;
}

export default function TrafficMap() {
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [locationError, setLocationError] = useState<string>('');
  const [isLoadingLocation, setIsLoadingLocation] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Mock traffic incidents data for Pakistan
  const trafficIncidents: TrafficIncident[] = [
    {
      id: 1,
      type: 'congestion',
      severity: 'high',
      location: 'M2 Motorway - Kallar Kahar',
      coordinates: [32.7833, 72.7000],
      description: 'Heavy traffic due to fog conditions',
      reportedAt: '10 minutes ago',
      estimatedClearTime: '2 hours',
      affectedRoutes: ['M2 Motorway', 'Islamabad-Lahore Route'],
      delay: '45 minutes'
    },
    {
      id: 2,
      type: 'accident',
      severity: 'medium',
      location: 'Super Highway - Near Kotri',
      coordinates: [25.3700, 68.3100],
      description: 'Vehicle breakdown blocking one lane',
      reportedAt: '25 minutes ago',
      estimatedClearTime: '1 hour',
      affectedRoutes: ['National Highway N5', 'Karachi-Hyderabad Route'],
      delay: '30 minutes'
    },
    {
      id: 3,
      type: 'construction',
      severity: 'medium',
      location: 'GT Road - Rawalpindi',
      coordinates: [33.6844, 73.0479],
      description: 'Road maintenance work in progress',
      reportedAt: '2 hours ago',
      estimatedClearTime: '6 hours',
      affectedRoutes: ['GT Road', 'Islamabad-Peshawar Route'],
      delay: '20 minutes'
    },
    {
      id: 4,
      type: 'weather',
      severity: 'high',
      location: 'Lowari Pass - Dir to Chitral',
      coordinates: [35.2167, 71.8333],
      description: 'Heavy snowfall, road temporarily closed',
      reportedAt: '1 hour ago',
      estimatedClearTime: 'Weather dependent',
      affectedRoutes: ['Lowari Pass Road', 'Dir-Chitral Route'],
      delay: 'Road Closed'
    },
    {
      id: 5,
      type: 'congestion',
      severity: 'low',
      location: 'Shahrah-e-Faisal - Karachi',
      coordinates: [24.8607, 67.0011],
      description: 'Moderate traffic during rush hour',
      reportedAt: '5 minutes ago',
      affectedRoutes: ['Shahrah-e-Faisal', 'Airport Road'],
      delay: '15 minutes'
    },
    {
      id: 6,
      type: 'closure',
      severity: 'high',
      location: 'Karakoram Highway - Attabad Lake',
      coordinates: [36.3167, 74.8667],
      description: 'Landslide blocking road completely',
      reportedAt: '3 hours ago',
      estimatedClearTime: '12 hours',
      affectedRoutes: ['Karakoram Highway', 'Hunza Valley Route'],
      delay: 'Complete Closure'
    }
  ];

  useEffect(() => {
    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            accuracy: position.coords.accuracy
          });
          setIsLoadingLocation(false);
        },
        (error) => {
          setLocationError('Unable to get your location. Showing Pakistan overview.');
          setIsLoadingLocation(false);
          console.error('Geolocation error:', error);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000 // 5 minutes
        }
      );
    } else {
      setLocationError('Geolocation is not supported by this browser.');
      setIsLoadingLocation(false);
    }

    // Update timestamp every minute
    const timer = setInterval(() => {
      setLastUpdated(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const getIncidentIcon = (incident: TrafficIncident) => {
    switch (incident.type) {
      case 'accident': return <Car className="w-4 h-4" />;
      case 'construction': return <Construction className="w-4 h-4" />;
      case 'weather': return <CloudRain className="w-4 h-4" />;
      case 'closure': return <XCircle className="w-4 h-4" />;
      default: return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const refreshData = () => {
    setLastUpdated(new Date());
    // In a real app, this would fetch fresh data
  };

  return (
    <div className="space-y-6">
      {/* Location Status */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Navigation className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">
                  {isLoadingLocation ? 'Getting your location...' : 
                   userLocation ? 'Current Location Detected' : 'Location Unavailable'}
                </h3>
                <p className="text-sm text-gray-600">
                  {isLoadingLocation ? 'Please allow location access' :
                   userLocation ? `Lat: ${userLocation.lat.toFixed(4)}, Lng: ${userLocation.lng.toFixed(4)}` :
                   locationError}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge className={userLocation ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                {userLocation ? 'Connected' : 'Limited'}
              </Badge>
              <Button variant="outline" size="sm" onClick={refreshData}>
                <RefreshCw className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Interactive Map Placeholder */}
      <Card>
        <CardContent className="p-0">
          <div className="h-96 w-full relative bg-gradient-to-br from-blue-50 to-green-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-16 h-16 text-blue-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Interactive Traffic Map</h3>
              <p className="text-gray-600 mb-4">Real-time traffic conditions across Pakistan</p>
              <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                {userLocation && (
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <div className="flex items-center justify-center mb-1">
                      <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                      <span className="text-sm font-medium">Your Location</span>
                    </div>
                    <p className="text-xs text-gray-600">
                      {userLocation.lat.toFixed(2)}, {userLocation.lng.toFixed(2)}
                    </p>
                  </div>
                )}
                <div className="bg-red-100 p-3 rounded-lg">
                  <div className="flex items-center justify-center mb-1">
                    <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                    <span className="text-sm font-medium">High Traffic</span>
                  </div>
                  <p className="text-xs text-gray-600">{trafficIncidents.filter(i => i.severity === 'high').length} incidents</p>
                </div>
                <div className="bg-yellow-100 p-3 rounded-lg">
                  <div className="flex items-center justify-center mb-1">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                    <span className="text-sm font-medium">Medium Traffic</span>
                  </div>
                  <p className="text-xs text-gray-600">{trafficIncidents.filter(i => i.severity === 'medium').length} incidents</p>
                </div>
                <div className="bg-green-100 p-3 rounded-lg">
                  <div className="flex items-center justify-center mb-1">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-sm font-medium">Light Traffic</span>
                  </div>
                  <p className="text-xs text-gray-600">{trafficIncidents.filter(i => i.severity === 'low').length} incidents</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Traffic Incidents List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Current Traffic Incidents</h3>
          <div className="text-sm text-gray-500">
            Last updated: {lastUpdated.toLocaleTimeString()}
          </div>
        </div>
        
        <div className="grid gap-4">
          {trafficIncidents.map((incident) => (
            <Card key={incident.id} className={`border-l-4 ${getSeverityColor(incident.severity).includes('red') ? 'border-l-red-500' : getSeverityColor(incident.severity).includes('yellow') ? 'border-l-yellow-500' : 'border-l-green-500'}`}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-full ${getSeverityColor(incident.severity)}`}>
                      {getIncidentIcon(incident)}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{incident.location}</h4>
                      <p className="text-sm text-gray-600 capitalize">{incident.type}</p>
                    </div>
                  </div>
                  <Badge className={getSeverityColor(incident.severity)}>
                    {incident.severity.toUpperCase()}
                  </Badge>
                </div>
                
                <p className="text-gray-700 mb-3">{incident.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span>Reported {incident.reportedAt}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="w-4 h-4 text-gray-400" />
                    <span className="font-medium text-red-600">Delay: {incident.delay}</span>
                  </div>
                  {incident.estimatedClearTime && (
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-gray-400" />
                      <span>Clear in: {incident.estimatedClearTime}</span>
                    </div>
                  )}
                </div>
                
                <div className="mt-3">
                  <p className="text-sm font-medium text-gray-700 mb-2">Affected Routes:</p>
                  <div className="flex flex-wrap gap-2">
                    {incident.affectedRoutes.map((route, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {route}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Traffic Legend */}
      <Card>
        <CardContent className="p-4">
          <h3 className="font-medium text-gray-900 mb-3">Traffic Incident Legend</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              <span className="text-sm">Low Impact</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
              <span className="text-sm">Medium Impact</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-red-500 rounded-full"></div>
              <span className="text-sm">High Impact</span>
            </div>
            <div className="flex items-center space-x-2">
              <Car className="w-4 h-4 text-gray-600" />
              <span className="text-sm">Accident</span>
            </div>
            <div className="flex items-center space-x-2">
              <Construction className="w-4 h-4 text-gray-600" />
              <span className="text-sm">Construction</span>
            </div>
            <div className="flex items-center space-x-2">
              <CloudRain className="w-4 h-4 text-gray-600" />
              <span className="text-sm">Weather</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}