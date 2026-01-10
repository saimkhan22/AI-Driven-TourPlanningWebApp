"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from "@/components/shared/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  CloudRain,
  AlertTriangle,
  Wind,
  Thermometer,
  Snowflake,
  Sun,
  MapPin,
  RefreshCw,
  AlertCircle,
  Clock,
  TrendingUp,
  Droplets
} from "lucide-react";

interface WeatherAlert {
  city: string;
  event: string;
  start: number;
  end: number;
  description: string;
  severity: 'minor' | 'moderate' | 'severe' | 'extreme';
  tags: string[];
}

interface CityWeatherData {
  city: string;
  lat: number;
  lng: number;
  weather: {
    temp: number;
    feelsLike: number;
    condition: string;
    humidity: number;
    windSpeed: number;
    pressure: number;
  };
  alerts: WeatherAlert[];
  hasAlerts: boolean;
}

export default function WeatherAlerts() {
  const [weatherData, setWeatherData] = useState<CityWeatherData[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all');

  useEffect(() => {
    fetchWeatherAlerts();
  }, []);

  const fetchWeatherAlerts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/weather/alerts');

      if (response.data.success) {
        setWeatherData(response.data.weatherData || []);
        setLastUpdated(new Date());
      }
    } catch (error) {
      console.error('Error fetching weather alerts:', error);
    } finally {
      setLoading(false);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'extreme':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'severe':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'moderate':
        return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'minor':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'extreme':
      case 'severe':
        return <AlertTriangle className="w-5 h-5" />;
      case 'moderate':
        return <AlertCircle className="w-5 h-5" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getAlertIcon = (tags: string[]) => {
    if (tags.includes('heat')) return <Sun className="w-5 h-5" />;
    if (tags.includes('cold')) return <Snowflake className="w-5 h-5" />;
    if (tags.includes('wind')) return <Wind className="w-5 h-5" />;
    if (tags.includes('humidity')) return <Droplets className="w-5 h-5" />;
    return <CloudRain className="w-5 h-5" />;
  };

  const formatTime = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const allAlerts = weatherData.flatMap(data =>
    data.alerts.map(alert => ({ ...alert, city: data.city }))
  );

  const filteredAlerts = selectedSeverity === 'all'
    ? allAlerts
    : allAlerts.filter(alert => alert.severity === selectedSeverity);

  const alertStats = {
    total: allAlerts.length,
    severe: allAlerts.filter(a => a.severity === 'severe' || a.severity === 'extreme').length,
    moderate: allAlerts.filter(a => a.severity === 'moderate').length,
    minor: allAlerts.filter(a => a.severity === 'minor').length,
    citiesAffected: new Set(allAlerts.map(a => a.city)).size,
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <Header title="Weather Alerts - Pakistan" />
          <Button
            onClick={fetchWeatherAlerts}
            disabled={loading}
            variant="outline"
            size="sm"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Alerts</p>
                  <p className="text-2xl font-bold">{alertStats.total}</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Severe</p>
                  <p className="text-2xl font-bold text-red-600">{alertStats.severe}</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-red-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Moderate</p>
                  <p className="text-2xl font-bold text-orange-600">{alertStats.moderate}</p>
                </div>
                <AlertCircle className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Minor</p>
                  <p className="text-2xl font-bold text-yellow-600">{alertStats.minor}</p>
                </div>
                <AlertCircle className="w-8 h-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Cities Affected</p>
                  <p className="text-2xl font-bold">{alertStats.citiesAffected}</p>
                </div>
                <MapPin className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-2 mb-6">
          <Button
            variant={selectedSeverity === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedSeverity('all')}
          >
            All ({allAlerts.length})
          </Button>
          <Button
            variant={selectedSeverity === 'severe' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedSeverity('severe')}
            className={selectedSeverity === 'severe' ? 'bg-red-600 hover:bg-red-700' : ''}
          >
            Severe ({alertStats.severe})
          </Button>
          <Button
            variant={selectedSeverity === 'moderate' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedSeverity('moderate')}
            className={selectedSeverity === 'moderate' ? 'bg-orange-600 hover:bg-orange-700' : ''}
          >
            Moderate ({alertStats.moderate})
          </Button>
          <Button
            variant={selectedSeverity === 'minor' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedSeverity('minor')}
            className={selectedSeverity === 'minor' ? 'bg-yellow-600 hover:bg-yellow-700' : ''}
          >
            Minor ({alertStats.minor})
          </Button>
        </div>

        {/* Last Updated */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <Clock className="w-4 h-4" />
          Last updated: {lastUpdated.toLocaleTimeString()}
        </div>

        {/* Alerts List */}
        {loading ? (
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <Card key={index} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="h-6 bg-gray-300 rounded mb-4 w-1/3"></div>
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredAlerts.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Weather Alerts</h3>
              <p className="text-gray-600">
                {selectedSeverity === 'all'
                  ? 'There are currently no weather alerts for Pakistan.'
                  : `No ${selectedSeverity} alerts at this time.`}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredAlerts.map((alert, index) => (
              <Card key={index} className={`border-l-4 ${getSeverityColor(alert.severity)}`}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${getSeverityColor(alert.severity)}`}>
                        {getAlertIcon(alert.tags)}
                      </div>
                      <div>
                        <CardTitle className="text-xl mb-1 flex items-center gap-2">
                          {alert.event}
                          <Badge className={getSeverityColor(alert.severity)}>
                            {getSeverityIcon(alert.severity)}
                            <span className="ml-1 capitalize">{alert.severity}</span>
                          </Badge>
                        </CardTitle>
                        <CardDescription className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          {alert.city}
                        </CardDescription>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">{alert.description}</p>

                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>From: {formatTime(alert.start)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-4 h-4" />
                      <span>Until: {formatTime(alert.end)}</span>
                    </div>
                  </div>

                  {alert.tags.length > 0 && (
                    <div className="flex gap-2 mt-4">
                      {alert.tags.map((tag, tagIndex) => (
                        <Badge key={tagIndex} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* City Weather Cards */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Current Weather Conditions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {weatherData.map((cityData, index) => (
              <Card key={index} className={cityData.hasAlerts ? 'border-orange-300' : ''}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <MapPin className="w-5 h-5" />
                      {cityData.city}
                    </span>
                    {cityData.hasAlerts && (
                      <Badge className="bg-orange-100 text-orange-800">
                        <AlertTriangle className="w-3 h-3 mr-1" />
                        {cityData.alerts.length} Alert{cityData.alerts.length > 1 ? 's' : ''}
                      </Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Thermometer className="w-5 h-5 text-red-500" />
                        <span className="text-sm text-gray-600">Temperature</span>
                      </div>
                      <span className="text-lg font-semibold">{cityData.weather.temp}°C</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Droplets className="w-5 h-5 text-blue-500" />
                        <span className="text-sm text-gray-600">Humidity</span>
                      </div>
                      <span className="text-lg font-semibold">{cityData.weather.humidity}%</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Wind className="w-5 h-5 text-gray-500" />
                        <span className="text-sm text-gray-600">Wind Speed</span>
                      </div>
                      <span className="text-lg font-semibold">{cityData.weather.windSpeed} km/h</span>
                    </div>

                    <div className="pt-2 border-t">
                      <p className="text-sm text-gray-600">{cityData.weather.condition}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
