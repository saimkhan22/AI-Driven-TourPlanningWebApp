"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from "@/components/shared/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Utensils,
  MapPin,
  Star,
  Phone,
  Globe,
  DollarSign,
  Search,
  RefreshCw,
  Heart,
  Navigation,
  Clock,
  Users
} from "lucide-react";

interface Restaurant {
  id: string;
  name: string;
  location: string;
  address: string;
  rating: number;
  reviews: number;
  priceLevel: number;
  image: string;
  cuisine: string[];
  openNow: boolean;
  phone?: string;
  website?: string;
  latitude: number;
  longitude: number;
  placeId: string;
}

interface FamousFood {
  name: string;
  description: string;
  region: string;
  whereToTry: string[];
  image: string;
  price: string;
}

export default function Foods() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [famousFoods, setFamousFoods] = useState<FamousFood[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCity, setSelectedCity] = useState('Lahore');
  const [searchQuery, setSearchQuery] = useState('');
  const [savedRestaurants, setSavedRestaurants] = useState<Set<string>>(new Set());

  const pakistanCities = [
    'Lahore', 'Karachi', 'Islamabad', 'Peshawar', 'Multan',
    'Faisalabad', 'Rawalpindi', 'Quetta', 'Hunza', 'Skardu'
  ];

  useEffect(() => {
    fetchRestaurants();
    fetchFamousFoods();
    loadSavedRestaurants();
  }, [selectedCity]);

  const loadSavedRestaurants = () => {
    const saved = localStorage.getItem('savedRestaurants');
    if (saved) {
      setSavedRestaurants(new Set(JSON.parse(saved)));
    }
  };

  const toggleSaveRestaurant = (restaurantId: string) => {
    setSavedRestaurants(prev => {
      const newSaved = new Set(prev);
      if (newSaved.has(restaurantId)) {
        newSaved.delete(restaurantId);
      } else {
        newSaved.add(restaurantId);
      }
      localStorage.setItem('savedRestaurants', JSON.stringify(Array.from(newSaved)));
      return newSaved;
    });
  };

  const fetchRestaurants = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/restaurants/search', {
        params: {
          city: selectedCity,
          radius: 5000,
          type: 'restaurant',
        },
      });

      if (response.data.success) {
        setRestaurants(response.data.restaurants);
      }
    } catch (error) {
      console.error('Error fetching restaurants:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchFamousFoods = async () => {
    try {
      const response = await axios.get('/api/restaurants/search', {
        params: {
          city: selectedCity,
          famous: true,
        },
      });

      if (response.data.success) {
        setFamousFoods(response.data.famousFoods);
      }
    } catch (error) {
      console.error('Error fetching famous foods:', error);
    }
  };

  const getPriceLevelSymbol = (level: number) => {
    return '$'.repeat(level || 1);
  };

  const filteredRestaurants = restaurants.filter(restaurant =>
    restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    restaurant.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <Header title="Local Foods & Where to Try Them" />
          <Button
            onClick={fetchRestaurants}
            disabled={loading}
            variant="outline"
            size="sm"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>

        {/* City Selector and Search */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <Select value={selectedCity} onValueChange={setSelectedCity}>
            <SelectTrigger className="w-full md:w-64">
              <SelectValue placeholder="Select city" />
            </SelectTrigger>
            <SelectContent>
              {pakistanCities.map(city => (
                <SelectItem key={city} value={city}>{city}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search restaurants..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Tabs for Famous Foods and Restaurants */}
        <Tabs defaultValue="restaurants" className="w-full">
          <TabsList className="grid w-full md:w-96 grid-cols-2">
            <TabsTrigger value="restaurants">
              <Utensils className="w-4 h-4 mr-2" />
              Restaurants ({filteredRestaurants.length})
            </TabsTrigger>
            <TabsTrigger value="famous">
              <Star className="w-4 h-4 mr-2" />
              Famous Foods ({famousFoods.length})
            </TabsTrigger>
          </TabsList>

          {/* Restaurants Tab */}
          <TabsContent value="restaurants" className="mt-6">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, index) => (
                  <Card key={index} className="animate-pulse">
                    <div className="bg-gray-300 h-48 w-full"></div>
                    <CardContent className="p-4">
                      <div className="h-6 bg-gray-300 rounded mb-2"></div>
                      <div className="h-4 bg-gray-300 rounded mb-2"></div>
                      <div className="h-4 bg-gray-300 rounded"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : filteredRestaurants.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <Utensils className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No Restaurants Found</h3>
                  <p className="text-gray-600">Try selecting a different city or adjusting your search.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRestaurants.map((restaurant) => (
                  <Card key={restaurant.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                    <div className="relative">
                      <img
                        src={restaurant.image}
                        alt={restaurant.name}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 right-4">
                        <Button
                          size="sm"
                          variant="secondary"
                          className={`bg-white/90 hover:bg-white ${savedRestaurants.has(restaurant.id) ? 'text-red-500' : ''}`}
                          onClick={() => toggleSaveRestaurant(restaurant.id)}
                        >
                          <Heart className={`w-4 h-4 ${savedRestaurants.has(restaurant.id) ? 'fill-current' : ''}`} />
                        </Button>
                      </div>
                      <div className="absolute top-4 left-4">
                        <Badge className={restaurant.openNow ? 'bg-green-500' : 'bg-red-500'}>
                          <Clock className="w-3 h-3 mr-1" />
                          {restaurant.openNow ? 'Open Now' : 'Closed'}
                        </Badge>
                      </div>
                    </div>

                    <CardHeader>
                      <CardTitle className="text-lg">{restaurant.name}</CardTitle>
                      <CardDescription className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {restaurant.address}
                      </CardDescription>
                    </CardHeader>

                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="font-semibold">{restaurant.rating.toFixed(1)}</span>
                            <span className="text-sm text-gray-500">({restaurant.reviews} reviews)</span>
                          </div>
                          <div className="flex items-center gap-1 text-green-600 font-semibold">
                            <DollarSign className="w-4 h-4" />
                            {getPriceLevelSymbol(restaurant.priceLevel)}
                          </div>
                        </div>

                        {restaurant.cuisine.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {restaurant.cuisine.slice(0, 3).map((cuisine, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {cuisine}
                              </Badge>
                            ))}
                          </div>
                        )}

                        <div className="flex gap-2 pt-2">
                          {restaurant.phone && (
                            <Button size="sm" variant="outline" className="flex-1" asChild>
                              <a href={`tel:${restaurant.phone}`}>
                                <Phone className="w-4 h-4 mr-1" />
                                Call
                              </a>
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1"
                            onClick={() => {
                              window.open(
                                `https://www.google.com/maps/dir/?api=1&destination=${restaurant.latitude},${restaurant.longitude}`,
                                '_blank'
                              );
                            }}
                          >
                            <Navigation className="w-4 h-4 mr-1" />
                            Directions
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Famous Foods Tab */}
          <TabsContent value="famous" className="mt-6">
            {famousFoods.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <Utensils className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No Famous Foods</h3>
                  <p className="text-gray-600">No famous foods data available for {selectedCity}.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {famousFoods.map((food, index) => (
                  <Card key={index} className="overflow-hidden hover:shadow-xl transition-shadow">
                    <div className="relative">
                      <img
                        src={food.image}
                        alt={food.name}
                        className="w-full h-56 object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-orange-500">
                          <Utensils className="w-3 h-3 mr-1" />
                          {food.region}
                        </Badge>
                      </div>
                    </div>

                    <CardHeader>
                      <CardTitle className="text-2xl">{food.name}</CardTitle>
                      <CardDescription>{food.description}</CardDescription>
                    </CardHeader>

                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-sm text-gray-700 mb-2 flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            Where to Try:
                          </h4>
                          <div className="space-y-1">
                            {food.whereToTry.map((place, placeIndex) => (
                              <div key={placeIndex} className="text-sm text-gray-600 pl-6">
                                • {place}
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t">
                          <div className="flex items-center gap-2">
                            <DollarSign className="w-4 h-4 text-green-600" />
                            <span className="text-sm font-semibold text-green-600">{food.price}</span>
                          </div>
                          <Button size="sm" variant="outline">
                            <Users className="w-4 h-4 mr-2" />
                            Find Restaurants
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
