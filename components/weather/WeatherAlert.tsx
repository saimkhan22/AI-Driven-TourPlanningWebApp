'use client';

import { useState, useEffect } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CloudRain, CloudSnow, Sun, Wind, TriangleAlert as AlertTriangle, X, Thermometer, Eye, Mountain } from 'lucide-react';

interface WeatherCondition {
  location: string;
  condition: string;
  temperature: string;
  visibility: string;
  windSpeed: string;
  alert: {
    level: 'low' | 'medium' | 'high';
    message: string;
    recommendation: string;
  } | null;
}

interface WeatherAlertProps {
  selectedLocation?: string;
  onLocationChange?: (location: string) => void;
}

export default function WeatherAlert({ selectedLocation, onLocationChange }: WeatherAlertProps) {
  const [weatherData, setWeatherData] = useState<WeatherCondition[]>([]);
  const [dismissedAlerts, setDismissedAlerts] = useState<string[]>([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Mock weather data for Pakistani locations
  const mockWeatherData: WeatherCondition[] = [
    {
      location: 'Islamabad',
      condition: 'Clear',
      temperature: '25°C',
      visibility: '10 km',
      windSpeed: '15 km/h',
      alert: null
    },
    {
      location: 'Lahore',
      condition: 'Foggy',
      temperature: '18°C',
      visibility: '2 km',
      windSpeed: '8 km/h',
      alert: {
        level: 'high',
        message: 'Dense fog conditions on M2 Motorway',
        recommendation: 'Use vehicles with fog lights. Drive slowly and maintain safe distance.'
      }
    },
    {
      location: 'Karachi',
      condition: 'Partly Cloudy',
      temperature: '28°C',
      visibility: '8 km',
      windSpeed: '20 km/h',
      alert: {
        level: 'low',
        message: 'Light winds expected',
        recommendation: 'Normal driving conditions. Motorcycles should be cautious.'
      }
    },
    {
      location: 'Hunza Valley',
      condition: 'Snow',
      temperature: '-5°C',
      visibility: '5 km',
      windSpeed: '25 km/h',
      alert: {
        level: 'high',
        message: 'Heavy snowfall and icy roads',
        recommendation: '4WD vehicles mandatory. Carry snow chains and emergency supplies.'
      }
    },
    {
      location: 'Skardu',
      condition: 'Cold',
      temperature: '2°C',
      visibility: '7 km',
      windSpeed: '18 km/h',
      alert: {
        level: 'medium',
        message: 'Sub-zero temperatures at night',
        recommendation: 'Use vehicles with good heating. Check antifreeze levels.'
      }
    },
    {
      location: 'Swat Valley',
      condition: 'Rainy',
      temperature: '15°C',
      visibility: '6 km',
      windSpeed: '22 km/h',
      alert: {
        level: 'medium',
        message: 'Moderate rainfall expected',
        recommendation: 'Roads may be slippery. Use vehicles with good tire grip.'
      }
    },
    {
      location: 'Gilgit',
      condition: 'Windy',
      temperature: '12°C',
      visibility: '9 km',
      windSpeed: '35 km/h',
      alert: {
        level: 'medium',
        message: 'Strong winds in mountain passes',
        recommendation: 'High-profile vehicles should be cautious. Avoid motorcycles.'
      }
    },
    {
      location: 'Chitral',
      condition: 'Snow',
      temperature: '-8°C',
      visibility: '3 km',
      windSpeed: '30 km/h',
      alert: {
        level: 'high',
        message: 'Lowari Pass may be closed due to heavy snow',
        recommendation: 'Check road status before travel. 4WD with snow equipment required.'
      }
    }
  ];

  useEffect(() => {
    setWeatherData(mockWeatherData);
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'clear':
      case 'sunny':
        return <Sun className="w-5 h-5 text-yellow-500" />;
      case 'rainy':
      case 'rain':
        return <CloudRain className="w-5 h-5 text-blue-500" />;
      case 'snow':
      case 'snowy':
        return <CloudSnow className="w-5 h-5 text-blue-300" />;
      case 'windy':
        return <Wind className="w-5 h-5 text-gray-500" />;
      case 'foggy':
      case 'fog':
        return <Eye className="w-5 h-5 text-gray-400" />;
      default:
        return <Sun className="w-5 h-5 text-yellow-500" />;
    }
  };

  const getAlertColor = (level: string) => {
    switch (level) {
      case 'high': return 'border-red-200 bg-red-50';
      case 'medium': return 'border-yellow-200 bg-yellow-50';
      case 'low': return 'border-blue-200 bg-blue-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  const getAlertIcon = (level: string) => {
    switch (level) {
      case 'high': return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case 'medium': return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'low': return <AlertTriangle className="w-5 h-5 text-blue-500" />;
      default: return <AlertTriangle className="w-5 h-5 text-gray-500" />;
    }
  };

  const dismissAlert = (location: string) => {
    setDismissedAlerts(prev => [...prev, location]);
  };

  const activeAlerts = weatherData.filter(
    data => data.alert && !dismissedAlerts.includes(data.location)
  );

  const selectedLocationData = selectedLocation 
    ? weatherData.find(data => data.location.toLowerCase() === selectedLocation.toLowerCase())
    : null;

  return (
    <div className="space-y-4">
      {/* Current Time */}
      <div className="text-sm text-gray-600 text-center">
        Last updated: {currentTime.toLocaleString('en-PK', { 
          timeZone: 'Asia/Karachi',
          hour12: true 
        })} PKT
      </div>

      {/* Active Weather Alerts */}
      {activeAlerts.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-semibold text-gray-900 flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2 text-orange-500" />
            Weather Alerts for Pakistan
          </h3>
          {activeAlerts.map((data) => (
            <Alert key={data.location} className={getAlertColor(data.alert!.level)}>
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  {getAlertIcon(data.alert!.level)}
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-medium">{data.location}</span>
                      <Badge variant="secondary" className="text-xs">
                        {data.alert!.level.toUpperCase()}
                      </Badge>
                    </div>
                    <AlertDescription className="text-sm mb-2">
                      <strong>{data.alert!.message}</strong>
                    </AlertDescription>
                    <div className="text-xs text-gray-600 mb-2">
                      🌡️ {data.temperature} • 👁️ {data.visibility} • 💨 {data.windSpeed}
                    </div>
                    <div className="text-sm font-medium text-gray-800">
                      🚗 Recommendation: {data.alert!.recommendation}
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => dismissAlert(data.location)}
                  className="h-6 w-6 p-0"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </Alert>
          ))}
        </div>
      )}

      {/* Selected Location Weather */}
      {selectedLocationData && (
        <Alert className="border-blue-200 bg-blue-50">
          <div className="flex items-center space-x-3">
            {getWeatherIcon(selectedLocationData.condition)}
            <div className="flex-1">
              <div className="font-medium text-gray-900 mb-1">
                Weather for {selectedLocationData.location}
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <Thermometer className="w-4 h-4" />
                  <span>{selectedLocationData.temperature}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Eye className="w-4 h-4" />
                  <span>{selectedLocationData.visibility}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Wind className="w-4 h-4" />
                  <span>{selectedLocationData.windSpeed}</span>
                </div>
                <div className="flex items-center space-x-1">
                  {getWeatherIcon(selectedLocationData.condition)}
                  <span>{selectedLocationData.condition}</span>
                </div>
              </div>
            </div>
          </div>
        </Alert>
      )}

      {/* Weather Overview Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {weatherData.slice(0, 8).map((data) => (
          <div
            key={data.location}
            className={`p-3 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
              data.alert 
                ? getAlertColor(data.alert.level)
                : 'border-gray-200 bg-white hover:bg-gray-50'
            }`}
            onClick={() => onLocationChange?.(data.location)}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">{data.location}</span>
              {data.alert && (
                <Badge 
                  variant="secondary" 
                  className={`text-xs ${
                    data.alert.level === 'high' ? 'bg-red-100 text-red-800' :
                    data.alert.level === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                  }`}
                >
                  {data.alert.level}
                </Badge>
              )}
            </div>
            <div className="flex items-center space-x-2 mb-1">
              {getWeatherIcon(data.condition)}
              <span className="text-sm">{data.condition}</span>
            </div>
            <div className="text-lg font-bold text-gray-900">{data.temperature}</div>
            <div className="text-xs text-gray-500">
              Visibility: {data.visibility}
            </div>
          </div>
        ))}
      </div>

      {/* Vehicle Recommendations Based on Weather */}
      {activeAlerts.length > 0 && (
        <Alert className="border-orange-200 bg-orange-50">
          <Mountain className="w-5 h-5 text-orange-500" />
          <AlertDescription>
            <div className="font-medium mb-2">Recommended Vehicles for Current Weather:</div>
            <div className="space-y-1 text-sm">
              <div>🌫️ <strong>Fog Conditions:</strong> Toyota Corolla, Honda Civic (fog lights equipped)</div>
              <div>❄️ <strong>Snow/Ice:</strong> Toyota Fortuner, Prado, Land Cruiser (4WD mandatory)</div>
              <div>🌧️ <strong>Rain:</strong> SUVs with good tire grip, avoid motorcycles</div>
              <div>💨 <strong>Strong Winds:</strong> Low-profile vehicles, avoid high vans</div>
            </div>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}