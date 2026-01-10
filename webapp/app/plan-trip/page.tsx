'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  MapPin,
  Calendar,
  Users,
  Wallet,
  ArrowLeft,
  Sparkles,
  Loader2,
  CheckCircle,
  Hotel,
  Car,
  Utensils,
  Mountain,
  Navigation,
  TrendingDown,
  Star,
} from 'lucide-react';
import TourConfirmationToast from '@/components/TourConfirmationToast';

interface TripPlan {
  destination: string;
  overview: string;
  itinerary: DayPlan[];
  estimatedCost: {
    accommodation: number;
    transportation: number;
    food: number;
    activities: number;
    total: number;
  };
  recommendations: {
    hotels: string[];
    restaurants: string[];
    activities: string[];
    tips: string[];
  };
}

interface DayPlan {
  day: number;
  title: string;
  activities: Activity[];
  meals: string[];
  accommodation: string;
}

interface Activity {
  time: string;
  name: string;
  description: string;
  duration: string;
  estimatedCost: number;
}

export default function PlanTripPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [tripPlan, setTripPlan] = useState<TripPlan | null>(null);
  const [locationSuggestions, setLocationSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [optimizedRoutes, setOptimizedRoutes] = useState<any[]>([]);
  const [loadingRoutes, setLoadingRoutes] = useState(false);
  const [showConfirmationToast, setShowConfirmationToast] = useState(false);

  // Form state
  const [destination, setDestination] = useState('');
  const [duration, setDuration] = useState('');
  const [budget, setBudget] = useState('');
  const [travelers, setTravelers] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [interests, setInterests] = useState<string[]>([]);

  const interestOptions = [
    'Adventure',
    'Culture',
    'Photography',
    'Food',
    'Nature',
    'History',
    'Shopping',
    'Relaxation',
  ];

  const vehicleOptions = [
    { id: 'suzuki-alto', name: 'Suzuki Alto (4-Seater)', capacity: 4, price: 2500 },
    { id: 'suzuki-cultus', name: 'Suzuki Cultus (4-Seater)', capacity: 4, price: 2800 },
    { id: 'toyota-corolla', name: 'Toyota Corolla (4-Seater)', capacity: 4, price: 3500 },
    { id: 'honda-civic', name: 'Honda Civic (4-Seater)', capacity: 4, price: 4500 },
    { id: 'toyota-hiace', name: 'Toyota Hiace (12-Seater)', capacity: 12, price: 8000 },
    { id: 'coaster', name: 'Coaster (30-Seater)', capacity: 30, price: 15000 },
    { id: 'land-cruiser', name: 'Land Cruiser V8 (7-Seater)', capacity: 7, price: 12000 },
    { id: 'prado', name: 'Toyota Prado (7-Seater)', capacity: 7, price: 10000 },
  ];

  // Auto-select vehicle based on number of travelers
  const autoSelectVehicle = (numTravelers: number) => {
    if (numTravelers <= 4) {
      return vehicleOptions.find(v => v.id === 'toyota-corolla')?.id || '';
    } else if (numTravelers <= 7) {
      return vehicleOptions.find(v => v.id === 'land-cruiser')?.id || '';
    } else if (numTravelers <= 12) {
      return vehicleOptions.find(v => v.id === 'toyota-hiace')?.id || '';
    } else {
      return vehicleOptions.find(v => v.id === 'coaster')?.id || '';
    }
  };

  // Handle travelers change and auto-select vehicle
  const handleTravelersChange = (value: string) => {
    setTravelers(value);
    if (value) {
      const numTravelers = parseInt(value);
      const autoVehicle = autoSelectVehicle(numTravelers);
      setSelectedVehicle(autoVehicle);
    }
  };

  // Calculate end date based on start date and duration
  const calculateEndDate = (start: string, days: string) => {
    if (start && days) {
      const startDate = new Date(start);
      const durationDays = parseInt(days);
      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + durationDays);
      return endDate.toISOString().split('T')[0];
    }
    return '';
  };

  // Update end date when start date or duration changes
  const handleStartDateChange = (value: string) => {
    setStartDate(value);
    const calculatedEndDate = calculateEndDate(value, duration);
    setEndDate(calculatedEndDate);
  };

  const handleDurationChange = (value: string) => {
    setDuration(value);
    const calculatedEndDate = calculateEndDate(startDate, value);
    setEndDate(calculatedEndDate);
  };

  const handleLocationInput = async (value: string) => {
    setDestination(value);
    if (value.length > 2) {
      try {
        const response = await fetch(
          `/api/locations/autocomplete?input=${encodeURIComponent(value)}`
        );
        const data = await response.json();
        setLocationSuggestions(data.predictions || []);
        setShowSuggestions(true);
      } catch (error) {
        console.error('Error fetching location suggestions:', error);
      }
    } else {
      setShowSuggestions(false);
    }
  };

  const toggleInterest = (interest: string) => {
    setInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  const handleGeneratePlan = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/ai/trip-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          destination,
          duration: parseInt(duration),
          budget: parseInt(budget),
          travelers: parseInt(travelers),
          interests,
          startDate,
          selectedVehicle,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate trip plan');
      }

      setTripPlan(data.tripPlan);

      // Fetch optimized routes in parallel
      setLoadingRoutes(true);
      try {
        const routeResponse = await fetch('/api/routes/optimize', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            origin: 'Islamabad', // Default starting point
            destination,
            includeAlternatives: true,
          }),
        });

        if (routeResponse.ok) {
          const routeData = await routeResponse.json();
          setOptimizedRoutes(routeData.alternativeRoutes || []);
        }
      } catch (error) {
        console.error('Error fetching routes:', error);
      } finally {
        setLoadingRoutes(false);
      }

      // Save to database
      await fetch('/api/trips/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          destination,
          startDate,
          endDate,
          duration: parseInt(duration),
          budget: parseInt(budget),
          travelers: parseInt(travelers),
          interests,
          vehicle: selectedVehicle,
          itinerary: data.tripPlan.itinerary,
          estimatedCost: data.tripPlan.estimatedCost,
        }),
      });

      // Send tour confirmation notification (SMS & Email)
      const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('token='))
        ?.split('=')[1];

      if (token) {
        try {
          const notifResponse = await fetch('/api/notifications/tour-confirmation', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
              destination,
              duration: parseInt(duration),
              travelers: parseInt(travelers),
              estimatedCost: data.tripPlan.estimatedCost?.total,
              startDate,
              itinerary: data.tripPlan.itinerary,
            }),
          });

          if (notifResponse.ok) {
            console.log('✅ Tour confirmation sent via SMS & Email');
            // Show professional toast notification
            setShowConfirmationToast(true);
          }
        } catch (notifError) {
          console.error('Failed to send tour confirmation:', notifError);
          // Don't fail the whole process if notification fails
        }
      }
    } catch (error: any) {
      alert(error.message || 'Failed to generate trip plan. Please try again.');
      console.error('Trip plan error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveTrip = async () => {
    try {
      alert('Trip saved to your dashboard!');
      router.push('/dashboard');
    } catch (error) {
      alert('Failed to save trip');
    }
  };

  if (tripPlan) {
    return (
      <>
        <TourConfirmationToast
          show={showConfirmationToast}
          onClose={() => setShowConfirmationToast(false)}
          destination={destination}
        />
        <div className="min-h-screen bg-gray-50 p-6">
          <div className="max-w-6xl mx-auto space-y-6">
            {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                onClick={() => setTripPlan(null)}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
              <h1 className="text-3xl font-bold">Your AI-Generated Trip Plan ✨</h1>
            </div>
            <Button
              onClick={handleSaveTrip}
              className="bg-orange-500 hover:bg-orange-600"
            >
              Save to Dashboard
            </Button>
          </div>

          {/* Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-orange-500" />
                {tripPlan.destination}
              </CardTitle>
              <CardDescription>{tripPlan.overview}</CardDescription>
            </CardHeader>
          </Card>

          {/* Cost Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wallet className="w-5 h-5 text-orange-500" />
                Estimated Cost Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <Hotel className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                  <p className="text-sm text-gray-600">Accommodation</p>
                  <p className="font-bold">PKR {tripPlan.estimatedCost.accommodation.toLocaleString()}</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <Car className="w-6 h-6 mx-auto mb-2 text-green-600" />
                  <p className="text-sm text-gray-600">Transportation</p>
                  <p className="font-bold">PKR {tripPlan.estimatedCost.transportation.toLocaleString()}</p>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <Utensils className="w-6 h-6 mx-auto mb-2 text-yellow-600" />
                  <p className="text-sm text-gray-600">Food</p>
                  <p className="font-bold">PKR {tripPlan.estimatedCost.food.toLocaleString()}</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <Mountain className="w-6 h-6 mx-auto mb-2 text-purple-600" />
                  <p className="text-sm text-gray-600">Activities</p>
                  <p className="font-bold">PKR {tripPlan.estimatedCost.activities.toLocaleString()}</p>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <Sparkles className="w-6 h-6 mx-auto mb-2 text-orange-600" />
                  <p className="text-sm text-gray-600">Total</p>
                  <p className="font-bold text-lg">PKR {tripPlan.estimatedCost.total.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Optimized Routes */}
          {optimizedRoutes.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Navigation className="w-5 h-5 text-orange-500" />
                  Optimized Routes to {destination}
                </CardTitle>
                <CardDescription>
                  AI-calculated routes using advanced algorithms (A* & Dijkstra)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {optimizedRoutes.slice(0, 3).map((route: any, index: number) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border-2 ${
                        route.isOptimal
                          ? 'border-green-500 bg-green-50'
                          : 'border-gray-200 bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold">
                            Route {index + 1}
                            {route.isOptimal && (
                              <Badge className="ml-2 bg-green-500">
                                <Star className="w-3 h-3 mr-1" />
                                Recommended
                              </Badge>
                            )}
                          </h4>
                        </div>
                        <Badge variant="outline">
                          <TrendingDown className="w-3 h-3 mr-1" />
                          {route.totalDistance} km
                        </Badge>
                      </div>

                      <div className="grid grid-cols-3 gap-3 text-sm">
                        <div>
                          <p className="text-gray-600">Distance</p>
                          <p className="font-semibold">{route.totalDistance} km</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Est. Time</p>
                          <p className="font-semibold">
                            {Math.floor(route.totalTime / 60)}h {route.totalTime % 60}m
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600">Est. Cost</p>
                          <p className="font-semibold">PKR {route.estimatedCost.toLocaleString()}</p>
                        </div>
                      </div>

                      <div className="mt-3 pt-3 border-t">
                        <p className="text-xs text-gray-600 mb-1">Route:</p>
                        <div className="flex flex-wrap gap-1">
                          {route.path.map((city: string, idx: number) => (
                            <span key={idx} className="text-xs">
                              {city}
                              {idx < route.path.length - 1 && ' → '}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {loadingRoutes && (
            <Card>
              <CardContent className="py-8">
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin text-orange-500" />
                  <p className="text-gray-600">Calculating optimal routes...</p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Day-by-Day Itinerary */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Day-by-Day Itinerary</h2>
            {tripPlan.itinerary.map((day) => (
              <Card key={day.day}>
                <CardHeader>
                  <CardTitle>
                    Day {day.day}: {day.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {day.activities.map((activity, idx) => (
                    <div key={idx} className="flex gap-4 p-3 bg-gray-50 rounded-lg">
                      <div className="text-sm font-medium text-orange-600 min-w-[80px]">
                        {activity.time}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold">{activity.name}</h4>
                        <p className="text-sm text-gray-600">{activity.description}</p>
                        <div className="flex gap-4 mt-2 text-xs text-gray-500">
                          <span>Duration: {activity.duration}</span>
                          <span>Cost: PKR {activity.estimatedCost}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="mt-4 pt-4 border-t">
                    <p className="text-sm">
                      <strong>Meals:</strong> {day.meals.join(', ')}
                    </p>
                    <p className="text-sm mt-1">
                      <strong>Accommodation:</strong> {day.accommodation}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle>Recommendations & Tips</CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Recommended Hotels</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  {tripPlan.recommendations.hotels.map((hotel, idx) => (
                    <li key={idx}>{hotel}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Must-Try Restaurants</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  {tripPlan.recommendations.restaurants.map((restaurant, idx) => (
                    <li key={idx}>{restaurant}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Top Activities</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  {tripPlan.recommendations.activities.map((activity, idx) => (
                    <li key={idx}>{activity}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Travel Tips</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  {tripPlan.recommendations.tips.map((tip, idx) => (
                    <li key={idx}>{tip}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/dashboard">
              <Button variant="ghost" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Dashboard
              </Button>
            </Link>
            <h1 className="text-3xl font-bold">Plan Your Trip with AI ✨</h1>
          </div>
          <Link href="/">
            <Button variant="outline" className="flex items-center gap-2">
              Home
            </Button>
          </Link>
        </div>

        {/* Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-orange-500" />
              AI-Powered Trip Planning
            </CardTitle>
            <CardDescription>
              Tell us about your dream trip and let AI create a personalized itinerary
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleGeneratePlan} className="space-y-6">
              {/* Destination */}
              <div className="space-y-2 relative">
                <Label htmlFor="destination">Destination in Pakistan</Label>
                <Input
                  id="destination"
                  placeholder="e.g., Hunza Valley, Skardu, Lahore"
                  value={destination}
                  onChange={(e) => handleLocationInput(e.target.value)}
                  required
                />
                {showSuggestions && locationSuggestions.length > 0 && (
                  <div className="absolute z-10 w-full bg-white border rounded-lg shadow-lg mt-1 max-h-60 overflow-y-auto">
                    {locationSuggestions.map((suggestion, idx) => (
                      <div
                        key={idx}
                        className="p-3 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          setDestination(suggestion.description);
                          setShowSuggestions(false);
                        }}
                      >
                        <p className="text-sm font-medium">{suggestion.description}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Duration and Budget */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration (days)</Label>
                  <Input
                    id="duration"
                    type="number"
                    min="1"
                    max="30"
                    placeholder="e.g., 5"
                    value={duration}
                    onChange={(e) => handleDurationChange(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="budget">Budget (PKR)</Label>
                  <Input
                    id="budget"
                    type="number"
                    min="5000"
                    placeholder="e.g., 50000"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Travelers */}
              <div className="space-y-2">
                <Label htmlFor="travelers">Number of Travelers</Label>
                <Input
                  id="travelers"
                  type="number"
                  min="1"
                  max="50"
                  placeholder="e.g., 2"
                  value={travelers}
                  onChange={(e) => handleTravelersChange(e.target.value)}
                  required
                />
              </div>

              {/* Vehicle Selection (Auto-selected based on travelers) */}
              {selectedVehicle && (
                <div className="space-y-2">
                  <Label htmlFor="vehicle">Recommended Vehicle</Label>
                  <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Car className="w-5 h-5 text-orange-600" />
                      <span className="font-semibold text-orange-900">
                        {vehicleOptions.find(v => v.id === selectedVehicle)?.name}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Capacity: {vehicleOptions.find(v => v.id === selectedVehicle)?.capacity} passengers
                      <br />
                      Price: PKR {vehicleOptions.find(v => v.id === selectedVehicle)?.price}/day
                    </p>
                    <Button
                      type="button"
                      variant="link"
                      className="text-orange-600 p-0 h-auto mt-2"
                      onClick={() => {
                        const select = document.getElementById('vehicle-select') as HTMLSelectElement;
                        if (select) select.focus();
                      }}
                    >
                      Change vehicle
                    </Button>
                  </div>
                  <select
                    id="vehicle-select"
                    value={selectedVehicle}
                    onChange={(e) => setSelectedVehicle(e.target.value)}
                    className="w-full p-2 border rounded-md"
                  >
                    {vehicleOptions.map((vehicle) => (
                      <option key={vehicle.id} value={vehicle.id}>
                        {vehicle.name} - {vehicle.capacity} seats - PKR {vehicle.price}/day
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Start Date and End Date */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={startDate}
                    onChange={(e) => handleStartDateChange(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={endDate}
                    readOnly
                    className="bg-gray-100"
                    placeholder="Auto-calculated"
                  />
                  <p className="text-xs text-gray-500">
                    Automatically calculated based on duration
                  </p>
                </div>
              </div>

              {/* Interests */}
              <div className="space-y-2">
                <Label>Interests (Select all that apply)</Label>
                <div className="flex flex-wrap gap-2">
                  {interestOptions.map((interest) => (
                    <Badge
                      key={interest}
                      variant={interests.includes(interest) ? 'default' : 'outline'}
                      className={`cursor-pointer ${
                        interests.includes(interest)
                          ? 'bg-orange-500 hover:bg-orange-600'
                          : 'hover:bg-gray-100'
                      }`}
                      onClick={() => toggleInterest(interest)}
                    >
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Generating Your Perfect Trip...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Generate AI Trip Plan
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <CheckCircle className="w-8 h-8 text-green-600 mb-2" />
              <h3 className="font-semibold mb-1">AI-Powered</h3>
              <p className="text-sm text-gray-600">
                Smart itineraries based on your preferences
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <CheckCircle className="w-8 h-8 text-green-600 mb-2" />
              <h3 className="font-semibold mb-1">Budget-Friendly</h3>
              <p className="text-sm text-gray-600">
                Optimized plans within your budget
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <CheckCircle className="w-8 h-8 text-green-600 mb-2" />
              <h3 className="font-semibold mb-1">Local Insights</h3>
              <p className="text-sm text-gray-600">
                Authentic Pakistani experiences
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
