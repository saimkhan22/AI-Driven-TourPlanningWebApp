'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  Star, 
  Wifi, 
  Car, 
  Coffee, 
  Dumbbell,
  Search,
  Filter,
  ArrowLeft,
  Heart,
  Share2,
  Calendar,
  Users,
  Utensils,
  Shield,
  Mountain,
  Building,
  Phone,
  Mail,
  Award,
  CheckCircle,
  Snowflake,
  Sun,
  TreePine
} from 'lucide-react';
import Link from 'next/link';

export default function HotelsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState([2000, 15000]);
  const [location, setLocation] = useState('');
  const [rating, setRating] = useState('');
  const [guests, setGuests] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');

  const hotels = [
    // Hunza Valley Hotels
    {
      id: 1,
      name: 'Hunza Serena Inn',
      location: 'Karimabad, Hunza Valley',
      region: 'Gilgit-Baltistan',
      rating: 4.8,
      reviews: 1245,
      price: 12000,
      originalPrice: 15000,
      image: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop',
      amenities: ['Mountain View', 'Restaurant', 'Wifi', 'Parking', 'Garden', 'Room Service'],
      description: 'Luxury mountain resort with stunning views of Rakaposhi and traditional Hunza architecture.',
      available: true,
      type: 'Luxury Resort',
      contact: '+92-5813-457801',
      email: 'hunza@serena.com.pk',
      highlights: ['Rakaposhi View', 'Traditional Architecture', 'Local Cuisine', 'Cultural Tours'],
      roomTypes: ['Deluxe Room', 'Suite', 'Family Room'],
      checkInTime: '2:00 PM',
      checkOutTime: '12:00 PM'
    },
    {
      id: 2,
      name: 'Eagle Nest Hotel Duikar',
      location: 'Duikar, Hunza Valley',
      region: 'Gilgit-Baltistan',
      rating: 4.6,
      reviews: 892,
      price: 8500,
      originalPrice: 10000,
      image: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop',
      amenities: ['Valley View', 'Restaurant', 'Wifi', 'Parking', 'Trekking Guide'],
      description: 'Spectacular views of Hunza Valley with easy access to Eagle Nest viewpoint.',
      available: true,
      type: 'Mountain Hotel',
      contact: '+92-300-5567890',
      email: 'info@eaglenesthotel.com',
      highlights: ['Eagle Nest Viewpoint', 'Valley Views', 'Trekking Base', 'Photography Tours'],
      roomTypes: ['Standard Room', 'Deluxe Room'],
      checkInTime: '1:00 PM',
      checkOutTime: '11:00 AM'
    },
    {
      id: 3,
      name: 'Hunza Embassy Hotel',
      location: 'Karimabad, Hunza Valley',
      region: 'Gilgit-Baltistan',
      rating: 4.4,
      reviews: 567,
      price: 6500,
      originalPrice: 8000,
      image: 'https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop',
      amenities: ['Mountain View', 'Restaurant', 'Wifi', 'Local Tours', 'Garden'],
      description: 'Comfortable accommodation in the heart of Karimabad with traditional hospitality.',
      available: true,
      type: 'Mid-Range Hotel',
      contact: '+92-300-4567891',
      email: 'embassy@hunzahotels.com',
      highlights: ['Central Location', 'Traditional Food', 'Baltit Fort Nearby', 'Local Culture'],
      roomTypes: ['Standard Room', 'Family Room'],
      checkInTime: '2:00 PM',
      checkOutTime: '12:00 PM'
    },

    // Skardu Hotels
    {
      id: 4,
      name: 'Shangrila Resort Skardu',
      location: 'Lower Kachura Lake, Skardu',
      region: 'Gilgit-Baltistan',
      rating: 4.9,
      reviews: 1567,
      price: 15000,
      originalPrice: 18000,
      image: 'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop',
      amenities: ['Lake View', 'Boat Rides', 'Restaurant', 'Garden', 'Trekking', 'Conference Hall'],
      description: 'Iconic resort on Lower Kachura Lake, gateway to K2 and Concordia.',
      available: true,
      type: 'Lake Resort',
      contact: '+92-5815-460263',
      email: 'info@shangrilaresorts.com',
      highlights: ['Kachura Lake', 'K2 Base Camp Tours', 'Boat Rides', 'Mountain Views'],
      roomTypes: ['Lake View Room', 'Deluxe Suite', 'Family Cottage'],
      checkInTime: '2:00 PM',
      checkOutTime: '12:00 PM'
    },
    {
      id: 5,
      name: 'Concordia Motel Skardu',
      location: 'Skardu City, Skardu',
      region: 'Gilgit-Baltistan',
      rating: 4.3,
      reviews: 743,
      price: 7500,
      originalPrice: 9000,
      image: 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop',
      amenities: ['City View', 'Restaurant', 'Wifi', 'Parking', 'Tour Desk'],
      description: 'Comfortable city hotel perfect for exploring Skardu and surrounding areas.',
      available: true,
      type: 'City Hotel',
      contact: '+92-5815-452789',
      email: 'concordia@skarduhotels.com',
      highlights: ['City Center', 'Deosai Tours', 'Satpara Lake', 'Local Markets'],
      roomTypes: ['Standard Room', 'Deluxe Room', 'Triple Room'],
      checkInTime: '1:00 PM',
      checkOutTime: '11:00 AM'
    },

    // Swat Valley Hotels
    {
      id: 6,
      name: 'Swat Continental Hotel',
      location: 'Mingora, Swat Valley',
      region: 'Khyber Pakhtunkhwa',
      rating: 4.5,
      reviews: 892,
      price: 6000,
      originalPrice: 7500,
      image: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop',
      amenities: ['Valley View', 'Restaurant', 'Wifi', 'Room Service', 'Conference Room'],
      description: 'Comfortable hotel in the Switzerland of Pakistan with beautiful valley views.',
      available: true,
      type: 'Mountain Hotel',
      contact: '+92-946-711234',
      email: 'info@swatcontinental.com',
      highlights: ['Kalam Valley', 'Malam Jabba', 'Ushu Forest', 'White Palace'],
      roomTypes: ['Standard Room', 'Deluxe Room', 'Executive Suite'],
      checkInTime: '2:00 PM',
      checkOutTime: '12:00 PM'
    },
    {
      id: 7,
      name: 'Kalam Inn',
      location: 'Kalam, Swat Valley',
      region: 'Khyber Pakhtunkhwa',
      rating: 4.2,
      reviews: 456,
      price: 4500,
      originalPrice: 5500,
      image: 'https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop',
      amenities: ['River View', 'Restaurant', 'Wifi', 'Trekking Guide', 'Bonfire'],
      description: 'Cozy mountain inn in beautiful Kalam with river views and mountain access.',
      available: true,
      type: 'Mountain Inn',
      contact: '+92-300-9876543',
      email: 'kalam@swathotels.com',
      highlights: ['Ushu Forest', 'Mahodand Lake', 'River Swat', 'Trekking Trails'],
      roomTypes: ['Standard Room', 'Family Room'],
      checkInTime: '1:00 PM',
      checkOutTime: '11:00 AM'
    },

    // Gilgit Hotels
    {
      id: 8,
      name: 'Serena Hotel Gilgit',
      location: 'Jutial, Gilgit',
      region: 'Gilgit-Baltistan',
      rating: 4.7,
      reviews: 1234,
      price: 11000,
      originalPrice: 13000,
      image: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop',
      amenities: ['Mountain View', 'Restaurant', 'Wifi', 'Spa', 'Conference Hall', 'Garden'],
      description: 'Premium hotel in Gilgit with excellent facilities and mountain views.',
      available: true,
      type: 'Luxury Hotel',
      contact: '+92-5811-456789',
      email: 'gilgit@serena.com.pk',
      highlights: ['Karakoram Highway', 'Fairy Meadows Access', 'Nanga Parbat View', 'Cultural Center'],
      roomTypes: ['Deluxe Room', 'Executive Suite', 'Presidential Suite'],
      checkInTime: '2:00 PM',
      checkOutTime: '12:00 PM'
    },

    // Naran Kaghan Hotels
    {
      id: 9,
      name: 'Naran Inn',
      location: 'Naran Bazaar, Naran',
      region: 'Khyber Pakhtunkhwa',
      rating: 4.3,
      reviews: 634,
      price: 4500,
      originalPrice: 5500,
      image: 'https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop',
      amenities: ['Mountain View', 'Restaurant', 'Heater', 'Local Tours', 'Parking'],
      description: 'Cozy mountain inn perfect for Saif ul Malook Lake and Babusar Pass adventures.',
      available: true,
      type: 'Mountain Inn',
      contact: '+92-300-1234567',
      email: 'info@naraninn.com',
      highlights: ['Saif ul Malook Lake', 'Babusar Pass', 'Lulusar Lake', 'Ansoo Lake'],
      roomTypes: ['Standard Room', 'Deluxe Room', 'Family Room'],
      checkInTime: '1:00 PM',
      checkOutTime: '11:00 AM'
    },
    {
      id: 10,
      name: 'Lake View Hotel Saif ul Malook',
      location: 'Near Saif ul Malook Lake, Naran',
      region: 'Khyber Pakhtunkhwa',
      rating: 4.6,
      reviews: 789,
      price: 7500,
      originalPrice: 9000,
      image: 'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop',
      amenities: ['Lake View', 'Restaurant', 'Heater', 'Jeep Service', 'Trekking Guide'],
      description: 'Unique location near the famous Saif ul Malook Lake with stunning views.',
      available: true,
      type: 'Lake Hotel',
      contact: '+92-300-2345678',
      email: 'lakeview@naranhotels.com',
      highlights: ['Saif ul Malook Lake', 'Malka Parbat', 'Fairy Tale Setting', 'Photography'],
      roomTypes: ['Lake View Room', 'Premium Suite'],
      checkInTime: '12:00 PM',
      checkOutTime: '10:00 AM'
    },

    // Murree Hotels
    {
      id: 11,
      name: 'Pearl Continental Bhurban',
      location: 'Bhurban, Murree',
      region: 'Punjab',
      rating: 4.8,
      reviews: 1567,
      price: 13500,
      originalPrice: 16000,
      image: 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop',
      amenities: ['Hill View', 'Spa', 'Pool', 'Restaurant', 'Golf Course', 'Conference Hall'],
      description: 'Luxury resort in Murree hills with world-class amenities and facilities.',
      available: true,
      type: 'Luxury Resort',
      contact: '+92-51-9269988',
      email: 'bhurban@pchotels.com',
      highlights: ['Golf Course', 'Spa Treatments', 'Hill Station', 'Family Resort'],
      roomTypes: ['Deluxe Room', 'Executive Suite', 'Presidential Suite'],
      checkInTime: '3:00 PM',
      checkOutTime: '12:00 PM'
    },

    // Chitral Hotels
    {
      id: 12,
      name: 'Chitral View Hotel',
      location: 'Chitral City, Chitral',
      region: 'Khyber Pakhtunkhwa',
      rating: 4.4,
      reviews: 456,
      price: 5500,
      originalPrice: 7000,
      image: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop',
      amenities: ['Mountain View', 'Restaurant', 'Wifi', 'Cultural Tours', 'Local Guide'],
      description: 'Gateway to Kalash valleys and Shandur Pass with cultural experiences.',
      available: true,
      type: 'Cultural Hotel',
      contact: '+92-300-3456789',
      email: 'info@chitralview.com',
      highlights: ['Kalash Valleys', 'Shandur Pass', 'Tirich Mir', 'Cultural Heritage'],
      roomTypes: ['Standard Room', 'Deluxe Room'],
      checkInTime: '2:00 PM',
      checkOutTime: '12:00 PM'
    },

    // Lahore Hotels
    {
      id: 13,
      name: 'Pearl Continental Lahore',
      location: 'Mall Road, Lahore',
      region: 'Punjab',
      rating: 4.7,
      reviews: 2156,
      price: 8500,
      originalPrice: 10000,
      image: 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop',
      amenities: ['Pool', 'Spa', 'Fitness', 'Restaurant', 'Business Center', 'Shopping'],
      description: 'Premier business hotel in the heart of Lahore with world-class amenities.',
      available: true,
      type: 'Business Hotel',
      contact: '+92-42-36360210',
      email: 'lahore@pchotels.com',
      highlights: ['Badshahi Mosque', 'Lahore Fort', 'Food Street', 'Shopping'],
      roomTypes: ['Deluxe Room', 'Executive Suite', 'Club Floor'],
      checkInTime: '3:00 PM',
      checkOutTime: '12:00 PM'
    },

    // Karachi Hotels
    {
      id: 14,
      name: 'Avari Towers Karachi',
      location: 'Fatima Jinnah Road, Karachi',
      region: 'Sindh',
      rating: 4.6,
      reviews: 1543,
      price: 7500,
      originalPrice: 9000,
      image: 'https://images.pexels.com/photos/1001965/pexels-photo-1001965.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop',
      amenities: ['City View', 'Pool', 'Multiple Restaurants', 'Spa', 'Shopping', 'Business Center'],
      description: 'Luxury hotel in Karachi\'s commercial district with excellent dining options.',
      available: true,
      type: 'City Hotel',
      contact: '+92-21-35660200',
      email: 'karachi@avarihotels.com',
      highlights: ['Clifton Beach', 'Port Grand', 'Shopping Malls', 'Business District'],
      roomTypes: ['Superior Room', 'Deluxe Room', 'Executive Suite'],
      checkInTime: '2:00 PM',
      checkOutTime: '12:00 PM'
    }
  ];

  const getAmenityIcon = (amenity) => {
    switch (amenity.toLowerCase()) {
      case 'wifi': return <Wifi className="w-4 h-4" />;
      case 'parking': return <Car className="w-4 h-4" />;
      case 'restaurant': return <Coffee className="w-4 h-4" />;
      case 'fitness': return <Dumbbell className="w-4 h-4" />;
      case 'mountain view': return <Mountain className="w-4 h-4" />;
      case 'city view': return <Building className="w-4 h-4" />;
      case 'lake view': return <Snowflake className="w-4 h-4" />;
      case 'valley view': return <TreePine className="w-4 h-4" />;
      case 'spa': return <Star className="w-4 h-4" />;
      case 'pool': return <Snowflake className="w-4 h-4" />;
      default: return <CheckCircle className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type) => {
    switch (type.toLowerCase()) {
      case 'luxury resort': return 'bg-purple-100 text-purple-800';
      case 'luxury hotel': return 'bg-purple-100 text-purple-800';
      case 'business hotel': return 'bg-blue-100 text-blue-800';
      case 'mountain hotel': return 'bg-green-100 text-green-800';
      case 'mountain inn': return 'bg-green-100 text-green-800';
      case 'lake resort': return 'bg-cyan-100 text-cyan-800';
      case 'lake hotel': return 'bg-cyan-100 text-cyan-800';
      case 'city hotel': return 'bg-orange-100 text-orange-800';
      case 'mid-range hotel': return 'bg-yellow-100 text-yellow-800';
      case 'cultural hotel': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredHotels = hotels.filter(hotel => {
    const matchesSearch = hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         hotel.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         hotel.region.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = hotel.price >= priceRange[0] && hotel.price <= priceRange[1];
    const matchesLocation = !location || location === 'all' || hotel.region.toLowerCase().includes(location.toLowerCase());
    const matchesRating = !rating || rating === 'any' || hotel.rating >= parseFloat(rating);
    
    return matchesSearch && matchesPrice && matchesLocation && matchesRating;
  });

  const handleBookNow = (hotel) => {
    alert(`Booking ${hotel.name}\nContact: ${hotel.contact}\nEmail: ${hotel.email}\nCheck-in: ${hotel.checkInTime}\nCheck-out: ${hotel.checkOutTime}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Link href="/dashboard" className="flex items-center text-orange-600 hover:text-orange-700">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Dashboard
              </Link>
              <Link href="/" className="text-gray-600 hover:text-orange-600">
                Home
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Heart className="w-4 h-4 mr-2" />
                Saved Hotels
              </Button>
              <Button variant="outline" size="sm">
                <Phone className="w-4 h-4 mr-2" />
                Contact Support
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Hotels Across Pakistan</h1>
          <p className="text-lg text-gray-600">Discover comfortable stays from Karachi to Karakoram</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {/* Search */}
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search hotels or destinations in Pakistan..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Check-in */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Check-in</label>
              <Input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
              />
            </div>

            {/* Check-out */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Check-out</label>
              <Input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {/* Region */}
            <div>
              <Select value={location} onValueChange={setLocation}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Regions</SelectItem>
                  <SelectItem value="gilgit-baltistan">Gilgit-Baltistan</SelectItem>
                  <SelectItem value="khyber pakhtunkhwa">Khyber Pakhtunkhwa</SelectItem>
                  <SelectItem value="punjab">Punjab</SelectItem>
                  <SelectItem value="sindh">Sindh</SelectItem>
                  <SelectItem value="balochistan">Balochistan</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Rating */}
            <div>
              <Select value={rating} onValueChange={setRating}>
                <SelectTrigger>
                  <SelectValue placeholder="Minimum Rating" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any Rating</SelectItem>
                  <SelectItem value="4.5">4.5+ Stars</SelectItem>
                  <SelectItem value="4.0">4.0+ Stars</SelectItem>
                  <SelectItem value="3.5">3.5+ Stars</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Guests */}
            <div>
              <Select value={guests} onValueChange={setGuests}>
                <SelectTrigger>
                  <SelectValue placeholder="Guests" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Guest</SelectItem>
                  <SelectItem value="2">2 Guests</SelectItem>
                  <SelectItem value="3">3 Guests</SelectItem>
                  <SelectItem value="4">4+ Guests</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Search Button */}
            <div>
              <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white border-0">
                <Search className="w-4 h-4 mr-2" />
                Search Hotels
              </Button>
            </div>
          </div>

          {/* Price Range */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <label className="text-sm font-medium text-gray-700">Price Range (PKR per night)</label>
              <span className="text-sm text-gray-500">
                PKR {priceRange[0].toLocaleString()} - PKR {priceRange[1].toLocaleString()}
              </span>
            </div>
            <Slider
              value={priceRange}
              onValueChange={setPriceRange}
              max={25000}
              min={1000}
              step={500}
              className="w-full"
            />
          </div>
        </div>

        {/* Results */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-lg font-medium text-gray-900">
            {filteredHotels.length} hotels found
          </div>
          <div className="flex items-center space-x-4">
            <Select defaultValue="recommended">
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recommended">Recommended</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Hotel Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredHotels.map((hotel) => (
            <Card key={hotel.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="flex">
                <div className="w-48 h-48 relative overflow-hidden">
                  <img 
                    src={hotel.image} 
                    alt={hotel.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {!hotel.available && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="text-white font-medium">Unavailable</span>
                    </div>
                  )}
                  <div className="absolute top-4 left-4">
                    <Badge className={getTypeColor(hotel.type)}>
                      {hotel.type}
                    </Badge>
                  </div>
                  {hotel.originalPrice > hotel.price && (
                    <div className="absolute bottom-4 left-4">
                      <Badge className="bg-red-500 text-white">
                        Save PKR {(hotel.originalPrice - hotel.price).toLocaleString()}
                      </Badge>
                    </div>
                  )}
                </div>
                
                <div className="flex-1 p-6">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{hotel.name}</h3>
                      <div className="flex items-center text-gray-600 mb-1">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span className="text-sm">{hotel.location}</span>
                      </div>
                      <div className="text-sm text-orange-600 font-medium">{hotel.region}</div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2">
                        {hotel.originalPrice > hotel.price && (
                          <span className="text-sm text-gray-500 line-through">
                            PKR {hotel.originalPrice.toLocaleString()}
                          </span>
                        )}
                        <div className="text-2xl font-bold text-gray-900">PKR {hotel.price.toLocaleString()}</div>
                      </div>
                      <div className="text-sm text-gray-500">per night</div>
                    </div>
                  </div>

                  <div className="flex items-center mb-3">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="ml-1 text-sm font-medium">{hotel.rating}</span>
                    </div>
                    <span className="text-sm text-gray-500 ml-2">({hotel.reviews} reviews)</span>
                  </div>

                  <p className="text-gray-600 text-sm mb-3">{hotel.description}</p>

                  <div className="mb-3">
                    <h4 className="font-medium text-gray-900 mb-2">Highlights</h4>
                    <div className="flex flex-wrap gap-1">
                      {hotel.highlights.slice(0, 3).map((highlight, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {highlight}
                        </Badge>
                      ))}
                      {hotel.highlights.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{hotel.highlights.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {hotel.amenities.slice(0, 4).map((amenity, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {getAmenityIcon(amenity)}
                        <span className="ml-1">{amenity}</span>
                      </Badge>
                    ))}
                    {hotel.amenities.length > 4 && (
                      <Badge variant="secondary" className="text-xs">
                        +{hotel.amenities.length - 4} more
                      </Badge>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 mb-4">
                    <div>Check-in: {hotel.checkInTime}</div>
                    <div>Check-out: {hotel.checkOutTime}</div>
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      className="flex-1 bg-orange-500 hover:bg-orange-600 text-white border-0"
                      disabled={!hotel.available}
                      onClick={() => handleBookNow(hotel)}
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      Book Now
                    </Button>
                    <Button variant="outline" size="sm">
                      <Heart className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Phone className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Destination Guide */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="w-5 h-5 mr-2" />
              Pakistan Hotel Guide by Destination
            </CardTitle>
            <CardDescription>
              Find the perfect accommodation for each Pakistani destination
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900 flex items-center">
                  <Mountain className="w-5 h-5 mr-2 text-orange-500" />
                  Northern Areas
                </h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• <strong>Hunza:</strong> Serena Inn, Eagle Nest Hotel</li>
                  <li>• <strong>Skardu:</strong> Shangrila Resort, Concordia Motel</li>
                  <li>• <strong>Gilgit:</strong> Serena Hotel, Mountain View</li>
                  <li>• <strong>Best Time:</strong> May to September</li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900 flex items-center">
                  <TreePine className="w-5 h-5 mr-2 text-orange-500" />
                  Hill Stations
                </h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• <strong>Swat:</strong> Continental Hotel, Kalam Inn</li>
                  <li>• <strong>Naran:</strong> Naran Inn, Lake View Hotel</li>
                  <li>• <strong>Murree:</strong> PC Bhurban, Hill View</li>
                  <li>• <strong>Best Time:</strong> April to October</li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900 flex items-center">
                  <Building className="w-5 h-5 mr-2 text-orange-500" />
                  Major Cities
                </h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• <strong>Lahore:</strong> Pearl Continental, Luxury Hotels</li>
                  <li>• <strong>Karachi:</strong> Avari Towers, Business Hotels</li>
                  <li>• <strong>Islamabad:</strong> Serena, Marriott</li>
                  <li>• <strong>Best Time:</strong> Year Round</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}