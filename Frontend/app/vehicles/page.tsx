'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Car, Truck, Bike, Users, Luggage, Fuel, Shield, Star, Calendar, ArrowLeft, MapPin, Clock, CircleCheck as CheckCircle, Zap, Mountain, Navigation, Bus, Plane, Phone, Mail, Award, TriangleAlert as AlertTriangle, MessageCircle, CloudRain, Sun, Wind, Eye } from 'lucide-react';
import Link from 'next/link';
import WeatherAlert from '@/components/weather/WeatherAlert';
import AIVehicleBot from '@/components/chat/AIVehicleBot';

export default function VehiclesPage() {
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropoffLocation, setDropoffLocation] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [dropoffDate, setDropoffDate] = useState('');
  const [passengers, setPassengers] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [priceRange, setPriceRange] = useState([1000, 25000]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [sortBy, setSortBy] = useState('recommended');

  // Comprehensive Pakistani vehicle database
  const vehicles = [
    // Economy Cars (4-Seater)
    {
      id: 1,
      name: 'Suzuki Alto',
      type: '4-Seater Car',
      category: 'Economy Cars',
      image: 'https://static.pakwheels.com/2025/04/IMG-20250417-WA0065-1.jpg',
      price: 2500,
      passengers: 4,
      luggage: 2,
      transmission: 'Manual',
      fuel: 'Petrol',
      mileage: '22 km/l',
      engine: '660cc',
      features: ['Fuel Efficient', 'Compact', 'Easy Parking', 'Budget Friendly', 'Air Conditioning'],
      rating: 4.1,
      reviews: 245,
      available: true,
      recommended: false,
      bestFor: ['City Travel', 'Budget Travel', 'Short Trips'],
      description: 'Most economical car in Pakistan. Perfect for city driving and budget-conscious travelers.',
      contact: '+92-300-1234567',
      location: 'Available in Islamabad, Lahore, Karachi, Peshawar',
      weatherSuitability: ['Clear', 'Sunny', 'Light Rain'],
      roadSuitability: ['City Roads', 'Highways', 'Paved Roads']
    },
    {
      id: 2,
      name: 'Suzuki Cultus',
      type: '4-Seater Car',
      category: 'Economy Cars',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIifekuxVkAGjgKv-sjrkkBC7sQEF1jJWKKg&s',
      price: 2800,
      passengers: 4,
      luggage: 2,
      transmission: 'Manual',
      fuel: 'Petrol',
      mileage: '20 km/l',
      engine: '1000cc',
      features: ['Fuel Efficient', 'Reliable', 'Easy Maintenance', 'Spacious Interior'],
      rating: 4.2,
      reviews: 189,
      available: true,
      recommended: false,
      bestFor: ['Budget Travel', 'City Driving', 'Daily Commute'],
      description: 'Popular Pakistani hatchback with excellent fuel economy and reliability.',
      contact: '+92-300-2345678',
      location: 'Available nationwide',
      weatherSuitability: ['Clear', 'Sunny', 'Light Rain'],
      roadSuitability: ['City Roads', 'Highways', 'Paved Roads']
    },
    {
      id: 3,
      name: 'Toyota Corolla',
      type: '4-Seater Car',
      category: 'Standard Cars',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDG-FjgBNEB7X8yRg8xw5OiWgL07NMdc98fQ&s',
      price: 3500,
      passengers: 4,
      luggage: 3,
      transmission: 'Automatic',
      fuel: 'Petrol',
      mileage: '16 km/l',
      engine: '1300cc',
      features: ['Air Conditioning', 'GPS Navigation', 'USB Charging', 'Bluetooth', 'Power Steering', 'Fog Lights'],
      rating: 4.4,
      reviews: 567,
      available: true,
      recommended: true,
      bestFor: ['City Travel', 'Business Trips', 'Long Distance', 'Fog Conditions'],
      description: 'Most popular sedan in Pakistan. Reliable, comfortable, and perfect for all weather conditions.',
      contact: '+92-300-3456789',
      location: 'Available in all major cities',
      weatherSuitability: ['Clear', 'Sunny', 'Rain', 'Fog'],
      roadSuitability: ['City Roads', 'Highways', 'Motorways']
    },
    {
      id: 4,
      name: 'Honda Civic',
      type: '4-Seater Car',
      category: 'Premium Cars',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTb8U99hayd0hZuZ6ZxipWF3MQhqjQxNtMwXQ&s',
      price: 4500,
      passengers: 4,
      luggage: 3,
      transmission: 'Automatic',
      fuel: 'Petrol',
      mileage: '14 km/l',
      engine: '1500cc',
      features: ['Premium Interior', 'Sunroof', 'Heated Seats', 'Advanced Safety', 'Leather Seats', 'Fog Lights'],
      rating: 4.6,
      reviews: 234,
      available: true,
      recommended: false,
      bestFor: ['Luxury Travel', 'Business', 'VIP Transport', 'All Weather'],
      description: 'Premium sedan with luxury features and excellent safety ratings.',
      contact: '+92-300-4567890',
      location: 'Islamabad, Lahore, Karachi',
      weatherSuitability: ['Clear', 'Sunny', 'Rain', 'Fog'],
      roadSuitability: ['City Roads', 'Highways', 'Motorways']
    },
    {
      id: 5,
      name: 'Suzuki Wagon R',
      type: '4-Seater Car',
      category: 'Compact Cars',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXVC9hHLkj-XzOVXkPPALDVHfYq9cFf_UJwA&s',
      price: 3000,
      passengers: 4,
      luggage: 2,
      transmission: 'Manual',
      fuel: 'Petrol',
      mileage: '18 km/l',
      engine: '1000cc',
      features: ['Tall Boy Design', 'Spacious Interior', 'Good Visibility', 'Easy Entry/Exit'],
      rating: 4.0,
      reviews: 145,
      available: true,
      recommended: false,
      bestFor: ['Family Use', 'City Driving', 'Easy Parking'],
      description: 'Unique tall-boy design offering spacious interior in compact footprint.',
      contact: '+92-300-5678901',
      location: 'Available in major cities',
      weatherSuitability: ['Clear', 'Sunny', 'Light Rain'],
      roadSuitability: ['City Roads', 'Paved Roads']
    },

   
    {
      id: 6,
      name: 'Toyota Fortuner',
      type: '7-Seater SUV',
      category: 'Premium SUVs',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6IJy4I-jKTFTpo-fHbVvONjIuMNMw37JlZQ&s',
      price: 9500,
      passengers: 7,
      luggage: 5,
      transmission: 'Automatic',
      fuel: 'Diesel',
      mileage: '12 km/l',
      engine: '2700cc',
      features: ['4WD', 'Premium Interior', 'Hill Assist', 'Traction Control', 'Professional Driver', 'Mountain Ready'],
      rating: 4.8,
      reviews: 345,
      available: true,
      recommended: true,
      bestFor: ['Mountain Travel', 'Northern Areas', 'Family Trips', 'All Weather', 'Off-Road'],
      description: 'Premium SUV perfect for Pakistani mountain terrain. Ideal for Hunza, Skardu, and northern areas.',
      contact: '+92-300-6789012',
      location: 'Islamabad, Lahore, Gilgit, Skardu, Chitral',
      weatherSuitability: ['Clear', 'Rain', 'Snow', 'Fog', 'All Weather'],
      roadSuitability: ['City Roads', 'Highways', 'Mountain Roads', 'Off-Road']
    },
    {
      id: 7,
      name: 'Toyota Prado',
      type: '7-Seater SUV',
      category: 'Luxury SUVs',
      image: 'https://nextgen-images.cdn.dealersolutions.com.au/modular.multisite.dealer.solutions/wp-content/uploads/sites/1576/2020/03/06092755/Prado_Horizon_Special-3-1200x675.jpg?format=webp&width=1200',
      price: 12000,
      passengers: 7,
      luggage: 5,
      transmission: 'Automatic',
      fuel: 'Petrol',
      mileage: '10 km/l',
      engine: '4000cc',
      features: ['4WD', 'Luxury Interior', 'Advanced 4WD System', 'Hill Descent Control', 'VIP Comfort', 'Professional Driver'],
      rating: 4.9,
      reviews: 189,
      available: true,
      recommended: false,
      bestFor: ['VIP Travel', 'Extreme Terrain', 'K2 Base Camp', 'Luxury Mountain Travel'],
      description: 'Ultimate luxury SUV for extreme Pakistani terrain. Perfect for K2 base camp and high-altitude travel.',
      contact: '+92-300-7890123',
      location: 'Northern Areas, Islamabad, Lahore',
      weatherSuitability: ['All Weather', 'Extreme Conditions'],
      roadSuitability: ['All Terrain', 'Extreme Off-Road']
    },
    {
      id: 8,
      name: 'Honda BR-V',
      type: '7-Seater SUV',
      category: 'Family SUVs',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/2022_Honda_BR-V_Prestige_with_Honda_Sensing_1.5_DG3_%2820220429%29.jpg/1200px-2022_Honda_BR-V_Prestige_with_Honda_Sensing_1.5_DG3_%2820220429%29.jpg',
      price: 6500,
      passengers: 7,
      luggage: 4,
      transmission: 'Automatic',
      fuel: 'Petrol',
      mileage: '13 km/l',
      engine: '1500cc',
      features: ['Family Friendly', 'Good Ground Clearance', 'Spacious Interior', 'Modern Features', 'Easy Access'],
      rating: 4.3,
      reviews: 198,
      available: true,
      recommended: false,
      bestFor: ['Family Travel', 'City SUV', 'Comfort', 'Hill Stations'],
      description: 'Perfect family SUV for Pakistani families. Great for hill stations and city driving.',
      contact: '+92-300-8901234',
      location: 'Major cities nationwide',
      weatherSuitability: ['Clear', 'Rain', 'Light Snow'],
      roadSuitability: ['City Roads', 'Highways', 'Hill Roads']
    },
    {
      id: 9,
      name: 'Suzuki Vitara',
      type: '5-Seater SUV',
      category: 'Compact SUVs',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXEFke7ykUxV1SnQ_RD2E5jnEFFzRSknAbiw&s',
      price: 5500,
      passengers: 5,
      luggage: 3,
      transmission: 'Manual',
      fuel: 'Petrol',
      mileage: '15 km/l',
      engine: '1600cc',
      features: ['Compact SUV', 'Good Ground Clearance', 'Fuel Efficient', 'Easy Handling'],
      rating: 4.1,
      reviews: 123,
      available: true,
      recommended: false,
      bestFor: ['Small Families', 'City SUV', 'Fuel Economy'],
      description: 'Compact SUV perfect for small families and city driving with SUV benefits.',
      contact: '+92-300-9012345',
      location: 'Available in major cities',
      weatherSuitability: ['Clear', 'Rain'],
      roadSuitability: ['City Roads', 'Highways']
    },

    
    {
      id: 10,
      name: 'Suzuki APV',
      type: '8-Seater Van',
      category: 'Family Vans',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/2014_Suzuki_APV_Arena_SGX_1.5_DN42V_%2820190623%29.jpg/330px-2014_Suzuki_APV_Arena_SGX_1.5_DN42V_%2820190623%29.jpg',
      price: 6000,
      passengers: 8,
      luggage: 6,
      transmission: 'Manual',
      fuel: 'Petrol',
      mileage: '12 km/l',
      engine: '1600cc',
      features: ['Family Van', 'Sliding Doors', 'High Seating', 'Good for Hills', 'Economical', 'Reliable'],
      rating: 4.4,
      reviews: 203,
      available: true,
      recommended: true,
      bestFor: ['Large Families', 'Group Travel', 'Hill Stations', 'Economical Transport'],
      description: 'Most popular family van in Pakistan. Perfect for large families and group travel.',
      contact: '+92-300-0123456',
      location: 'Available nationwide',
      weatherSuitability: ['Clear', 'Rain', 'Light Snow'],
      roadSuitability: ['City Roads', 'Highways', 'Hill Roads']
    },
    {
      id: 11,
      name: 'Toyota Hiace',
      type: '15-Seater Van',
      category: 'Group Transport',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTibl09eCFjRqwDThuQwg259N6n9oMoa57PA&s',
      price: 12000,
      passengers: 15,
      luggage: 10,
      transmission: 'Manual',
      fuel: 'Diesel',
      mileage: '10 km/l',
      engine: '3000cc',
      features: ['Group Transport', 'Professional Driver', 'AC', 'Comfortable Seating', 'Large Luggage Space'],
      rating: 4.6,
      reviews: 256,
      available: true,
      recommended: true,
      bestFor: ['Group Tours', 'Corporate Travel', 'Wedding Transport', 'Long Distance'],
      description: 'Premium group transport solution. Perfect for corporate events and group tours across Pakistan.',
      contact: '+92-300-1234567',
      location: 'All major tourist destinations',
      weatherSuitability: ['Clear', 'Rain', 'Fog'],
      roadSuitability: ['Highways', 'Motorways', 'City Roads']
    },
    {
      id: 12,
      name: 'Suzuki Bolan',
      type: '8-Seater Van',
      category: 'Budget Vans',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTe190eAKq4cdRlmbf45nfJgxnDPaLs_PMkA&s',
      price: 4500,
      passengers: 8,
      luggage: 4,
      transmission: 'Manual',
      fuel: 'Petrol',
      mileage: '14 km/l',
      engine: '800cc',
      features: ['Budget Friendly', 'Fuel Efficient', 'Easy Maintenance', 'Compact Van'],
      rating: 3.8,
      reviews: 167,
      available: true,
      recommended: false,
      bestFor: ['Budget Groups', 'Short Distance', 'Local Transport'],
      description: 'Most economical van option in Pakistan. Good for budget-conscious group travel.',
      contact: '+92-300-2345678',
      location: 'Available in major cities',
      weatherSuitability: ['Clear', 'Light Rain'],
      roadSuitability: ['City Roads', 'Paved Roads']
    },

   
    {
      id: 13,
      name: 'Pakistani Coaster (25-Seater)',
      type: '25-Seater Bus',
      category: 'Tour Buses',
      image: 'https://i.ytimg.com/vi/h0TJ2wuRg5U/maxresdefault.jpg',
      price: 18000,
      passengers: 25,
      luggage: 15,
      transmission: 'Manual',
      fuel: 'Diesel',
      mileage: '8 km/l',
      engine: '4000cc',
      features: ['Tour Bus', 'AC', 'Reclining Seats', 'Entertainment System', 'Professional Driver', 'Luggage Compartment'],
      rating: 4.5,
      reviews: 89,
      available: true,
      recommended: false,
      bestFor: ['Large Groups', 'School Tours', 'Corporate Events', 'Wedding Parties'],
      description: 'Standard Pakistani coaster perfect for group tours and events across Pakistan.',
      contact: '+92-300-3456789',
      location: 'Major cities and tourist routes',
      weatherSuitability: ['Clear', 'Rain', 'Fog'],
      roadSuitability: ['Highways', 'Motorways']
    },
    {
      id: 14,
      name: 'Large Pakistani Coaster (30-Seater)',
      type: '30-Seater Bus',
      category: 'Tour Buses',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTp1Qmy_0NqNiDS6-6DgIaWcXwDxXhU6Ik0Aw&s',
      price: 22000,
      passengers: 30,
      luggage: 20,
      transmission: 'Manual',
      fuel: 'Diesel',
      mileage: '7 km/l',
      engine: '4200cc',
      features: ['Large Groups', 'Premium AC', 'TV/DVD', 'Sound System', 'Reclining Seats', 'Professional Driver'],
      rating: 4.6,
      reviews: 67,
      available: true,
      recommended: false,
      bestFor: ['Very Large Groups', 'Long Tours', 'Corporate Events', 'Pilgrimage Tours'],
      description: 'Premium large coaster for very large groups with entertainment facilities.',
      contact: '+92-300-4567890',
      location: 'Available for long-distance tours',
      weatherSuitability: ['Clear', 'Rain'],
      roadSuitability: ['Highways', 'Motorways']
    },

    {
      id: 15,
      name: 'Honda CD 125',
      type: 'Motorcycle',
      category: 'Standard Bikes',
      image: 'https://propakistani.pk/wp-content/uploads/2021/10/CG-125-e1634030390368.jpg',
      price: 1500,
      passengers: 2,
      luggage: 1,
      transmission: 'Manual',
      fuel: 'Petrol',
      mileage: '45 km/l',
      engine: '125cc',
      features: ['Fuel Efficient', 'Reliable', 'Easy Maintenance', 'Helmet Included', 'City Navigation'],
      rating: 4.3,
      reviews: 294,
      available: true,
      recommended: true,
      bestFor: ['Solo Travel', 'City Exploration', 'Budget Travel', 'Traffic Navigation'],
      description: 'Most popular motorcycle in Pakistan. Perfect for city exploration and budget travel.',
      contact: '+92-300-8901234',
      location: 'Available in all cities',
      weatherSuitability: ['Clear', 'Sunny'],
      roadSuitability: ['City Roads', 'Highways']
    },
    {
      id: 16,
      name: 'Yamaha YBR 125',
      type: 'Motorcycle',
      category: 'Sport Bikes',
      image: 'https://www.yamaha-motor.com.pk/wp-content/uploads/2024/09/YELLOW-125G-INSIDE-PRODUCT.png',
      price: 1800,
      passengers: 2,
      luggage: 1,
      transmission: 'Manual',
      fuel: 'Petrol',
      mileage: '40 km/l',
      engine: '125cc',
      features: ['Sporty Design', 'Good Performance', 'Comfortable Ride', 'Helmet Included'],
      rating: 4.4,
      reviews: 176,
      available: true,
      recommended: false,
      bestFor: ['Adventure Rides', 'Long Distance', 'Performance', 'Young Travelers'],
      description: 'Sporty motorcycle perfect for adventure rides and long-distance travel in Pakistan.',
      contact: '+92-300-9012345',
      location: 'Major cities and tourist areas',
      weatherSuitability: ['Clear', 'Sunny'],
      roadSuitability: ['City Roads', 'Highways', 'Hill Roads']
    }
  ];

  const getVehicleIcon = (type) => {
    if (type.includes('Van') || type.includes('Bus')) return <Bus className="w-5 h-5" />;
    if (type.includes('Motorcycle')) return <Bike className="w-5 h-5" />;
    if (type.includes('Jeep') || type.includes('SUV')) return <Mountain className="w-5 h-5" />;
    return <Car className="w-5 h-5" />;
  };

  const getTypeColor = (category) => {
    switch (category) {
      case 'Economy Cars': return 'bg-blue-100 text-blue-800';
      case 'Standard Cars': return 'bg-green-100 text-green-800';
      case 'Premium Cars': return 'bg-purple-100 text-purple-800';
      case 'Luxury Cars': return 'bg-red-100 text-red-800';
      case 'Hybrid Cars': return 'bg-emerald-100 text-emerald-800';
      case 'Premium SUVs': return 'bg-orange-100 text-orange-800';
      case 'Luxury SUVs': return 'bg-red-100 text-red-800';
      case 'Family SUVs': return 'bg-teal-100 text-teal-800';
      case 'Compact SUVs': return 'bg-cyan-100 text-cyan-800';
      case 'Family Vans': return 'bg-indigo-100 text-indigo-800';
      case 'Budget Vans': return 'bg-gray-100 text-gray-800';
      case 'Group Transport': return 'bg-violet-100 text-violet-800';
      case 'Tour Buses': return 'bg-pink-100 text-pink-800';
      case 'Luxury Buses': return 'bg-rose-100 text-rose-800';
      case 'Adventure Vehicles': return 'bg-yellow-100 text-yellow-800';
      case 'Standard Bikes': return 'bg-slate-100 text-slate-800';
      case 'Sport Bikes': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredVehicles = vehicles.filter(vehicle => {
    const matchesType = !vehicleType || vehicleType === 'all' || vehicle.category.toLowerCase().includes(vehicleType.toLowerCase());
    const matchesPrice = vehicle.price >= priceRange[0] && vehicle.price <= priceRange[1];
    const matchesPassengers = !passengers || vehicle.passengers >= parseInt(passengers);
    
    return matchesType && matchesPrice && matchesPassengers;
  });

  const handleBookNow = (vehicle) => {
    alert(`Booking ${vehicle.name}\n\nContact: ${vehicle.contact}\nLocation: ${vehicle.location}\n\nWeather Suitability: ${vehicle.weatherSuitability.join(', ')}\nRoad Suitability: ${vehicle.roadSuitability.join(', ')}\n\nNote: Professional driver included for SUVs and mountain vehicles.`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center text-orange-600 hover:text-orange-700">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Home
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Calendar className="w-4 h-4 mr-2" />
                My Bookings
              </Button>
              <Button variant="outline" size="sm" onClick={() => setIsChatOpen(true)}>
                <MessageCircle className="w-4 h-4 mr-2" />
                AI Assistant
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Vehicle Booking for Pakistan</h1>
          <p className="text-lg text-gray-600">From city cars to mountain jeeps - find the perfect vehicle for Pakistani terrain</p>
        </div>

        {/* Weather Alert Section */}
        <div className="mb-8">
          <WeatherAlert 
            selectedLocation={selectedLocation} 
            onLocationChange={setSelectedLocation}
          />
        </div>

        {/* Booking Form */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Car className="w-5 h-5 mr-2" />
              Book Your Vehicle
            </CardTitle>
            <CardDescription>
              Choose from our extensive fleet of vehicles suitable for all Pakistani destinations and weather conditions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Pickup City</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Select value={pickupLocation} onValueChange={(value) => {
                    setPickupLocation(value);
                    setSelectedLocation(value);
                  }}>
                    <SelectTrigger className="pl-10">
                      <SelectValue placeholder="Select pickup city" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="islamabad">Islamabad</SelectItem>
                      <SelectItem value="lahore">Lahore</SelectItem>
                      <SelectItem value="karachi">Karachi</SelectItem>
                      <SelectItem value="peshawar">Peshawar</SelectItem>
                      <SelectItem value="gilgit">Gilgit</SelectItem>
                      <SelectItem value="skardu">Skardu</SelectItem>
                      <SelectItem value="chitral">Chitral</SelectItem>
                      <SelectItem value="swat">Swat Valley</SelectItem>
                      <SelectItem value="hunza">Hunza Valley</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Destination</label>
                <div className="relative">
                  <Navigation className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Select value={dropoffLocation} onValueChange={setDropoffLocation}>
                    <SelectTrigger className="pl-10">
                      <SelectValue placeholder="Select destination" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hunza">Hunza Valley</SelectItem>
                      <SelectItem value="skardu">Skardu</SelectItem>
                      <SelectItem value="swat">Swat Valley</SelectItem>
                      <SelectItem value="naran">Naran Kaghan</SelectItem>
                      <SelectItem value="murree">Murree</SelectItem>
                      <SelectItem value="fairy-meadows">Fairy Meadows</SelectItem>
                      <SelectItem value="chitral">Chitral</SelectItem>
                      <SelectItem value="deosai">Deosai Plains</SelectItem>
                      <SelectItem value="k2-base-camp">K2 Base Camp</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Pickup Date</label>
                <Input
                  type="date"
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Return Date</label>
                <Input
                  type="date"
                  value={dropoffDate}
                  onChange={(e) => setDropoffDate(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Passengers</label>
                <Select value={passengers} onValueChange={setPassengers}>
                  <SelectTrigger>
                    <SelectValue placeholder="Number of passengers" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1-2 Passengers</SelectItem>
                    <SelectItem value="4">3-4 Passengers</SelectItem>
                    <SelectItem value="7">5-7 Passengers</SelectItem>
                    <SelectItem value="15">8-15 Passengers</SelectItem>
                    <SelectItem value="25">16-25 Passengers</SelectItem>
                    <SelectItem value="30">26+ Passengers</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Category</label>
                <Select value={vehicleType} onValueChange={setVehicleType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">All Categories</SelectItem>
                    <SelectItem value="economy">Economy Cars</SelectItem>
                    <SelectItem value="standard">Standard Cars</SelectItem>
                    <SelectItem value="premium">Premium Cars</SelectItem>
                    <SelectItem value="luxury">Luxury Cars</SelectItem>
                    <SelectItem value="suv">SUVs</SelectItem>
                    <SelectItem value="van">Vans</SelectItem>
                    <SelectItem value="bus">Buses</SelectItem>
                    <SelectItem value="adventure">Adventure Vehicles</SelectItem>
                    <SelectItem value="motorcycle">Motorcycles</SelectItem>
                    <SelectItem value="hybrid">Hybrid Cars</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Budget Range (PKR/day)</label>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">{priceRange[0].toLocaleString()}</span>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={35000}
                    min={500}
                    step={500}
                    className="flex-1"
                  />
                  <span className="text-sm text-gray-500">{priceRange[1].toLocaleString()}</span>
                </div>
              </div>
            </div>

            <Button className="w-full md:w-auto bg-orange-500 hover:bg-orange-600 text-white border-0">
              <Zap className="w-4 h-4 mr-2" />
              Search Vehicles
            </Button>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-lg font-medium text-gray-900">
            {filteredVehicles.length} vehicles available
          </div>
          <div className="flex items-center space-x-4">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recommended">Recommended</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="passengers">Passenger Capacity</SelectItem>
                <SelectItem value="fuel-efficient">Most Fuel Efficient</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Vehicle Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredVehicles.map((vehicle) => (
            <Card key={vehicle.id} className={`group hover:shadow-xl transition-all duration-300 ${vehicle.recommended ? 'ring-2 ring-orange-500' : ''}`}>
              <div className="relative">
                <img 
                  src={vehicle.image} 
                  alt={vehicle.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                {vehicle.recommended && (
                  <Badge className="absolute top-4 left-4 bg-orange-500 text-white">
                    <Award className="w-3 h-3 mr-1" />
                    Recommended
                  </Badge>
                )}
                <Badge className={`absolute top-4 right-4 ${getTypeColor(vehicle.category)}`}>
                  {getVehicleIcon(vehicle.type)}
                  <span className="ml-1">{vehicle.category}</span>
                </Badge>
                {!vehicle.available && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-t-lg">
                    <span className="text-white font-medium">Currently Unavailable</span>
                  </div>
                )}
              </div>
              
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{vehicle.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{vehicle.description}</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="w-4 h-4 mr-1" />
                      {vehicle.location}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">PKR {vehicle.price.toLocaleString()}</div>
                    <div className="text-sm text-gray-500">per day</div>
                  </div>
                </div>

                <div className="flex items-center mb-4">
                  <div className="flex items-center mr-4">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm font-medium">{vehicle.rating}</span>
                  </div>
                  <span className="text-sm text-gray-500">({vehicle.reviews} reviews)</span>
                </div>

                <div className="grid grid-cols-4 gap-4 mb-4 text-sm">
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1 text-gray-400" />
                    <span>{vehicle.passengers} seats</span>
                  </div>
                  <div className="flex items-center">
                    <Luggage className="w-4 h-4 mr-1 text-gray-400" />
                    <span>{vehicle.luggage} bags</span>
                  </div>
                  <div className="flex items-center">
                    <Fuel className="w-4 h-4 mr-1 text-gray-400" />
                    <span>{vehicle.fuel}</span>
                  </div>
                  <div className="flex items-center">
                    <Zap className="w-4 h-4 mr-1 text-gray-400" />
                    <span>{vehicle.mileage}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 mb-2">Vehicle Specifications</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                    <div>Engine: {vehicle.engine}</div>
                    <div>Transmission: {vehicle.transmission}</div>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 mb-2">Best For</h4>
                  <div className="flex flex-wrap gap-1">
                    {vehicle.bestFor.map((item, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 mb-2">Weather & Road Suitability</h4>
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-1">
                      <span className="text-xs text-gray-600 mr-2">Weather:</span>
                      {vehicle.weatherSuitability.map((weather, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {weather}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      <span className="text-xs text-gray-600 mr-2">Roads:</span>
                      {vehicle.roadSuitability.map((road, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {road}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {vehicle.features.slice(0, 3).map((feature, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      {feature}
                    </Badge>
                  ))}
                  {vehicle.features.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{vehicle.features.length - 3} more
                    </Badge>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button 
                    className="flex-1 bg-orange-500 hover:bg-orange-600 text-white border-0"
                    disabled={!vehicle.available}
                    onClick={() => handleBookNow(vehicle)}
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Book Now
                  </Button>
                  <Button variant="outline" size="sm">
                    <Phone className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Mail className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Vehicle Categories Info */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Zap className="w-5 h-5 mr-2" />
              Complete Vehicle Guide for Pakistan
            </CardTitle>
            <CardDescription>
              Choose the right vehicle for your Pakistani adventure based on destination and weather
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900 flex items-center">
                  <Car className="w-5 h-5 mr-2 text-orange-500" />
                  Economy Cars (PKR 2,500-4,500)
                </h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• <strong>Suzuki Alto:</strong> Most economical (22 km/l)</li>
                  <li>• <strong>Toyota Corolla:</strong> Best for fog conditions</li>
                  <li>• <strong>Honda Civic:</strong> Premium comfort</li>
                  <li>• Perfect for city travel and highways</li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900 flex items-center">
                  <Mountain className="w-5 h-5 mr-2 text-orange-500" />
                  SUVs & 4WDs (PKR 6,500-15,000)
                </h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• <strong>Toyota Fortuner:</strong> Best for northern areas</li>
                  <li>• <strong>Toyota Prado:</strong> Ultimate mountain vehicle</li>
                  <li>• <strong>Land Cruiser:</strong> Extreme terrain specialist</li>
                  <li>• Mandatory for snow and mountain roads</li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900 flex items-center">
                  <Bus className="w-5 h-5 mr-2 text-orange-500" />
                  Group Transport (PKR 6,000-35,000)
                </h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• <strong>Suzuki APV:</strong> 8-seater family van</li>
                  <li>• <strong>Toyota Hiace:</strong> 15-seater premium</li>
                  <li>• <strong>Pakistani Coaster:</strong> 25-30 seater</li>
                  <li>• Professional drivers included</li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900 flex items-center">
                  <Bike className="w-5 h-5 mr-2 text-orange-500" />
                  Motorcycles (PKR 1,500-2,200)
                </h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• <strong>Honda CD 125:</strong> Most fuel efficient (45 km/l)</li>
                  <li>• <strong>Yamaha YBR:</strong> Best for long rides</li>
                  <li>• <strong>Honda CB 150F:</strong> High performance</li>
                  <li>• Helmets included, avoid in bad weather</li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900 flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2 text-orange-500" />
                  Weather Recommendations
                </h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• <strong>Fog:</strong> Cars with fog lights (Corolla, Civic)</li>
                  <li>• <strong>Snow:</strong> 4WD mandatory (Fortuner, Prado)</li>
                  <li>• <strong>Rain:</strong> Good tire grip, avoid bikes</li>
                  <li>• <strong>Mountains:</strong> High ground clearance essential</li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900 flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-orange-500" />
                  Safety & Services
                </h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Professional drivers for SUVs and buses</li>
                  <li>• Insurance included in all prices</li>
                  <li>• 24/7 roadside assistance</li>
                  <li>• GPS tracking for mountain vehicles</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Vehicle Bot */}
      <AIVehicleBot isOpen={isChatOpen} onToggle={() => setIsChatOpen(!isChatOpen)} />
    </div>
  );
}