'use client';


const isLoggedIn =
  typeof window !== 'undefined' && localStorage.getItem('token');

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { 
  MapPin, 
  Calendar, 
  Users,
  Mountain,
  Waves,
  Building,
  Trees,
  Camera,
  Coffee,
  Star,
  Clock,
  ArrowLeft,
  Sparkles,
  Heart,
  Share2,
  MessageCircle,
  CheckCircle,
  Sun,
  CloudSnow,
  Thermometer
} from 'lucide-react';
import Link from 'next/link';

export default function DestinationsPage() {
  const [travelMood, setTravelMood] = useState('');
  const [budget, setBudget] = useState('');
  const [duration, setDuration] = useState('');
  const [travelers, setTravelers] = useState('');
  const [interests, setInterests] = useState('');
  const [customRequest, setCustomRequest] = useState('');

  const destinations = [
    {
      id: 1,
      name: 'Hunza Valley',
      region: 'Gilgit-Baltistan',
      type: 'Mountain Paradise',
      image: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop',
      rating: 4.9,
      reviews: 2341,
      price: 8000,
      duration: '7 days',
      weather: { temp: '15°C', condition: 'Clear' },
      highlights: ['Karimabad', 'Altit Fort', 'Attabad Lake', 'Passu Cones'],
      bestFor: ['Adventure', 'Photography', 'Culture'],
      aiMatch: 95,
      itinerary: {
        day1: 'Arrival in Karimabad, Baltit Fort visit',
        day2: 'Attabad Lake boat ride and Passu Cones',
        day3: 'Eagle Nest viewpoint and local culture'
      }
    },
    {
      id: 2,
      name: 'Skardu',
      region: 'Gilgit-Baltistan',
      type: 'Alpine Adventure',
      image: 'https://images.pexels.com/photos/1525041/pexels-photo-1525041.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop',
      rating: 4.8,
      reviews: 1876,
      price: 12000,
      duration: '8 days',
      weather: { temp: '12°C', condition: 'Partly Cloudy' },
      highlights: ['Shangrila Resort', 'Deosai Plains', 'Satpara Lake', 'K2 Base Camp'],
      bestFor: ['Trekking', 'Nature', 'Adventure'],
      aiMatch: 88,
      itinerary: {
        day1: 'Skardu city tour and Shangrila',
        day2: 'Deosai Plains wildlife safari',
        day3: 'Satpara Lake and local markets'
      }
    },
    {
      id: 3,
      name: 'Swat Valley',
      region: 'Khyber Pakhtunkhwa',
      type: 'Green Paradise',
      image: 'https://images.pexels.com/photos/2474690/pexels-photo-2474690.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop',
      rating: 4.7,
      reviews: 1543,
      price: 6000,
      duration: '5 days',
      weather: { temp: '22°C', condition: 'Sunny' },
      highlights: ['Kalam Valley', 'Malam Jabba', 'Ushu Forest', 'Mingora'],
      bestFor: ['Relaxation', 'Nature', 'Families'],
      aiMatch: 92,
      itinerary: {
        day1: 'Mingora to Kalam scenic drive',
        day2: 'Ushu Forest and waterfalls',
        day3: 'Malam Jabba ski resort visit'
      }
    },
    {
      id: 4,
      name: 'Lahore',
      region: 'Punjab',
      type: 'Cultural Heritage',
      image: 'https://images.pexels.com/photos/739407/pexels-photo-739407.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop',
      rating: 4.6,
      reviews: 987,
      price: 4000,
      duration: '4 days',
      weather: { temp: '28°C', condition: 'Hot' },
      highlights: ['Badshahi Mosque', 'Lahore Fort', 'Food Street', 'Shalimar Gardens'],
      bestFor: ['Culture', 'Food', 'History'],
      aiMatch: 78,
      itinerary: {
        day1: 'Walled City and Badshahi Mosque',
        day2: 'Lahore Fort and Shalimar Gardens',
        day3: 'Food Street and local bazaars'
      }
    },
    {
      id: 5,
      name: 'Naran Kaghan',
      region: 'Khyber Pakhtunkhwa',
      type: 'Valley Adventure',
      image: 'https://images.pexels.com/photos/1001965/pexels-photo-1001965.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop',
      rating: 4.8,
      reviews: 2156,
      price: 7000,
      duration: '6 days',
      weather: { temp: '18°C', condition: 'Cool' },
      highlights: ['Saif ul Malook Lake', 'Babusar Pass', 'Lulusar Lake', 'Naran Bazaar'],
      bestFor: ['Adventure', 'Photography', 'Camping'],
      aiMatch: 85,
      itinerary: {
        day1: 'Naran arrival and local exploration',
        day2: 'Saif ul Malook Lake jeep safari',
        day3: 'Babusar Pass and Lulusar Lake'
      }
    },
    {
      id: 6,
      name: 'Karachi',
      region: 'Sindh',
      type: 'Coastal Metropolis',
      image: 'https://images.pexels.com/photos/161815/santorini-oia-greece-water-161815.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop',
      rating: 4.4,
      reviews: 654,
      price: 5000,
      duration: '4 days',
      weather: { temp: '32°C', condition: 'Humid' },
      highlights: ['Clifton Beach', 'Quaid Mausoleum', 'Empress Market', 'Port Grand'],
      bestFor: ['Business', 'Beaches', 'Shopping'],
      aiMatch: 87,
      itinerary: {
        day1: 'City tour and Quaid Mausoleum',
        day2: 'Clifton Beach and Sea View',
        day3: 'Shopping and local cuisine'
      }
    }
  ];

  const getTypeIcon = (type: string) => {
    if (type.includes('Mountain') || type.includes('Alpine')) return <Mountain className="w-4 h-4" />;
    if (type.includes('Coastal') || type.includes('Beach')) return <Waves className="w-4 h-4" />;
    if (type.includes('Cultural') || type.includes('Heritage')) return <Building className="w-4 h-4" />;
    if (type.includes('Green') || type.includes('Valley')) return <Trees className="w-4 h-4" />;
    return <MapPin className="w-4 h-4" />;
  };

  const getMatchColor = (match: number) => {
    if (match >= 90) return 'bg-green-100 text-green-800';
    if (match >= 80) return 'bg-blue-100 text-blue-800';
    if (match >= 70) return 'bg-yellow-100 text-yellow-800';
    return 'bg-gray-100 text-gray-800';
  };

  const getWeatherIcon = (condition: string) => {
    if (condition.includes('Clear') || condition.includes('Sunny')) return <Sun className="w-4 h-4 text-yellow-500" />;
    if (condition.includes('Snow') || condition.includes('Cold')) return <CloudSnow className="w-4 h-4 text-blue-500" />;
    return <Thermometer className="w-4 h-4 text-gray-500" />;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link
  href={isLoggedIn ? '/dashboard' : '/'}
  className="flex items-center gap-2 text-sm text-gray-600 hover:text-orange-500"
>
  ← Back to {isLoggedIn ? 'Dashboard' : 'Home'}
</Link>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Heart className="w-4 h-4 mr-2" />
                Wishlist
              </Button>
              <Button variant="outline" size="sm">
                <MessageCircle className="w-4 h-4 mr-2" />
                AI Chat
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Destination Planning for Pakistan</h1>
          <p className="text-lg text-gray-600">Discover Pakistan's hidden gems with personalized AI recommendations</p>
        </div>

        {/* AI Planning Form */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Sparkles className="w-5 h-5 mr-2" />
              Tell Us About Your Pakistan Adventure
            </CardTitle>
            <CardDescription>
              Our AI will analyze your preferences and create personalized recommendations for Pakistani destinations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Travel Mood</label>
                <Select value={travelMood} onValueChange={setTravelMood}>
                  <SelectTrigger>
                    <SelectValue placeholder="How do you want to feel?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="adventure">Adventure & Trekking</SelectItem>
                    <SelectItem value="cultural">Cultural & Historical</SelectItem>
                    <SelectItem value="relaxed">Peaceful & Scenic</SelectItem>
                    <SelectItem value="family">Family Friendly</SelectItem>
                    <SelectItem value="photography">Photography & Nature</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Budget Range (PKR)</label>
                <Select value={budget} onValueChange={setBudget}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select budget" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="budget">Budget (3,000-6,000/day)</SelectItem>
                    <SelectItem value="mid">Mid-range (6,000-12,000/day)</SelectItem>
                    <SelectItem value="luxury">Luxury (12,000+/day)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                <Select value={duration} onValueChange={setDuration}>
                  <SelectTrigger>
                    <SelectValue placeholder="Trip length" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weekend">Weekend (2-3 days)</SelectItem>
                    <SelectItem value="week">Week (4-7 days)</SelectItem>
                    <SelectItem value="extended">Extended (8+ days)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Travelers</label>
                <Select value={travelers} onValueChange={setTravelers}>
                  <SelectTrigger>
                    <SelectValue placeholder="Number of travelers" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="solo">Solo</SelectItem>
                    <SelectItem value="couple">Couple</SelectItem>
                    <SelectItem value="family">Family</SelectItem>
                    <SelectItem value="group">Group</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Interests</label>
                <Select value={interests} onValueChange={setInterests}>
                  <SelectTrigger>
                    <SelectValue placeholder="What interests you most?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mountains">Mountains & Trekking</SelectItem>
                    <SelectItem value="culture">Culture & History</SelectItem>
                    <SelectItem value="food">Pakistani Cuisine</SelectItem>
                    <SelectItem value="adventure">Adventure Sports</SelectItem>
                    <SelectItem value="photography">Photography</SelectItem>
                    <SelectItem value="spiritual">Spiritual & Religious</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Special Requests</label>
                <Textarea
                  placeholder="Any specific places in Pakistan you'd like to visit..."
                  value={customRequest}
                  onChange={(e) => setCustomRequest(e.target.value)}
                  rows={3}
                />
              </div>
            </div>

            <Button className="w-full md:w-auto bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700">
              <Sparkles className="w-4 h-4 mr-2" />
              Get AI Recommendations
            </Button>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-lg font-medium text-gray-900">
            AI-Curated Pakistani Destinations for You
          </div>
          <div className="flex items-center space-x-4">
            <Select defaultValue="match">
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="match">Best Match</SelectItem>
                <SelectItem value="price">Price</SelectItem>
                <SelectItem value="rating">Rating</SelectItem>
                <SelectItem value="duration">Duration</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Destination Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {destinations.map((destination) => (
            <Card key={destination.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="relative">
                <img 
                  src={destination.image} 
                  alt={destination.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  <Badge className={getMatchColor(destination.aiMatch)}>
                    <Sparkles className="w-3 h-3 mr-1" />
                    {destination.aiMatch}% Match
                  </Badge>
                  <Badge className="bg-black/70 text-white">
                    {getTypeIcon(destination.type)}
                    <span className="ml-1">{destination.type}</span>
                  </Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <Badge className="bg-white/90 text-gray-800">
                    {getWeatherIcon(destination.weather.condition)}
                    <span className="ml-1">{destination.weather.temp}</span>
                  </Badge>
                </div>
                <div className="absolute bottom-4 right-4">
                  <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white">
                    <Heart className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{destination.name}</h3>
                    <div className="flex items-center text-sm text-gray-600 mb-1">
                      <MapPin className="w-4 h-4 mr-1" />
                      {destination.region}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="w-4 h-4 mr-1" />
                      {destination.duration}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">PKR {destination.price.toLocaleString()}</div>
                    <div className="text-sm text-gray-500">per person</div>
                  </div>
                </div>

                <div className="flex items-center mb-4">
                  <div className="flex items-center mr-4">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm font-medium">{destination.rating}</span>
                  </div>
                  <span className="text-sm text-gray-500">({destination.reviews} reviews)</span>
                </div>

                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 mb-2">Highlights</h4>
                  <div className="flex flex-wrap gap-1">
                    {destination.highlights.map((highlight, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {highlight}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 mb-2">Best For</h4>
                  <div className="flex flex-wrap gap-1">
                    {destination.bestFor.map((item, index) => (
                      <Badge key={index} className="text-xs bg-emerald-100 text-emerald-800">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 mb-2">AI-Generated Itinerary Preview</h4>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div>Day 1: {destination.itinerary.day1}</div>
                    <div>Day 2: {destination.itinerary.day2}</div>
                    <div>Day 3: {destination.itinerary.day3}</div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1 bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700">
                    <Calendar className="w-4 h-4 mr-2" />
                    Plan Trip
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* AI Chat Assistant */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageCircle className="w-5 h-5 mr-2" />
              Chat with Your AI Pakistan Travel Guide
            </CardTitle>
            <CardDescription>
              Ask questions about Pakistani destinations, get cultural insights, or plan your detailed itinerary
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 rounded-lg p-4 mb-4 space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">AI Pakistan Guide</p>
                  <p className="text-sm text-gray-600">
                    Assalam-o-Alaikum! I've analyzed your preferences and found some incredible Pakistani destinations for you. 
                    Would you like me to create a detailed itinerary for any of these places? I can also suggest the best time to visit, 
                    local customs, and must-try foods!
                  </p>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Input placeholder="Ask me about Pakistani destinations, culture, or travel tips..." className="flex-1" />
              <Button className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700">
                Send
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}