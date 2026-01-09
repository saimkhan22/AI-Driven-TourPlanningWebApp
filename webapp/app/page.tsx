'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
  MapPin, 
  Car, 
  Hotel, 
  Navigation, 
  Search, 
  Star, 
  Clock, 
  Users, 
  Sparkles,
  ArrowRight,
  MessageCircle,
  Mountain,
  Camera,
  Utensils,
  Calendar,
  Sun,
  CloudRain,
  Plane,
  Menu,
  ChevronDown
} from 'lucide-react';
import Link from 'next/link';
import UserMenu from '@/components/auth/UserMenu';
import AITravelBot from '@/components/chat/AITravelBot';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isExploreOpen, setIsExploreOpen] = useState(false);


  const features = [
    {
      icon: Hotel,
      title: 'Smart Hotel Search',
      description: 'AI-powered hotel recommendations across Pakistan from Karachi to Hunza with local insights.',
      href: '/hotels'
    },
    {
      icon: Navigation,
      title: 'Live Traffic & Routes',
      description: 'Real-time traffic data for Pakistani highways and mountain routes with weather alerts.',
      href: '/traffic'
    },
    {
      icon: Car,
      title: 'Vehicle Booking',
      description: 'Book 4-seater cars, 7-seater vans, 18-seater coaches, or 4WD jeeps for mountain terrain.',
      href: '/vehicles'
    },
    {
      icon: MapPin,
      title: 'Destination Planning',
      description: 'AI-curated itineraries for Pakistan\'s hidden gems and iconic destinations.',
      href: '/destinations'
    }
  ];

  const destinations = [
    {
      name: 'Hunza Valley',
      region: 'Gilgit-Baltistan',
      image: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
      description: 'Breathtaking mountain views and ancient forts',
      highlights: ['Karimabad', 'Altit Fort', 'Attabad Lake']
    },
    {
      name: 'Skardu',
      region: 'Gilgit-Baltistan',
      image: 'https://images.pexels.com/photos/1525041/pexels-photo-1525041.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
      description: 'Gateway to K2 and stunning alpine lakes',
      highlights: ['Shangrila Resort', 'Deosai Plains', 'Satpara Lake']
    },
    {
      name: 'Swat Valley',
      region: 'Khyber Pakhtunkhwa',
      image: 'https://images.pexels.com/photos/2474690/pexels-photo-2474690.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
      description: 'Switzerland of Pakistan with lush green valleys',
      highlights: ['Kalam', 'Malam Jabba', 'Ushu Forest']
    },
    {
      name: 'Lahore',
      region: 'Punjab',
      image: 'https://images.pexels.com/photos/739407/pexels-photo-739407.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
      description: 'Cultural capital with Mughal architecture',
      highlights: ['Badshahi Mosque', 'Lahore Fort', 'Food Street']
    }
  ];

  const testimonials = [
    {
      name: 'Ahmed Hassan',
      location: 'Karachi, Pakistan',
      rating: 5,
      text: 'The AI perfectly planned our northern areas trip. Found amazing hotels in Hunza and suggested the best jeep for mountain roads.',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
      name: 'Sarah Khan',
      location: 'Islamabad, Pakistan',
      rating: 5,
      text: 'Traffic insights saved us hours on the Lahore-Islamabad motorway. The weather alerts were incredibly accurate.',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
      name: 'Michael Thompson',
      location: 'London, UK',
      rating: 5,
      text: 'As a foreign tourist, this app made exploring Pakistan effortless. The cultural insights and local recommendations were invaluable.',
      image: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    }
  ];

  const stats = [
    { value: '200+', label: 'Pakistani Cities', icon: MapPin },
    { value: '5000+', label: 'Hotels & Guesthouses', icon: Hotel },
    { value: '50+', label: 'Tourist Destinations', icon: Mountain },
    { value: '99%', label: 'Customer Satisfaction', icon: Star }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section with Full Background */}
      <section className="relative min-h-screen flex flex-col">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/1525041/pexels-photo-1525041.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop)'
          }}
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40" />
        
        {/* Navigation */}
        <nav className="relative z-50 bg-transparent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/20">
                  <Plane className="w-7 h-7 text-white" />
                </div>
                <div>
                  <span className="text-2xl font-bold text-white">
                    SMM Travel
                  </span>
                </div>
              </div>
              
              <div className="hidden md:flex items-center space-x-8">
                <div className="hidden md:flex items-center space-x-8">

  <div className="hidden md:flex items-center space-x-8">
  {/* Main links */}
  <Link
    href="/"
    className="text-white hover:text-orange-400 transition-colors font-medium text-lg"
  >
    Home
  </Link>

  <Link
    href="/destinations"
    className="text-white/80 hover:text-orange-400 transition-colors font-medium text-lg"
  >
    Destinations
  </Link>

  <Link
    href="/hotels"
    className="text-white/80 hover:text-orange-400 transition-colors font-medium text-lg"
  >
    Hotels
  </Link>

  <Link
    href="/vehicles"
    className="text-white/80 hover:text-orange-400 transition-colors font-medium text-lg"
  >
    Vehicles
  </Link>

  <Link
    href="/traffic"
    className="text-white/80 hover:text-orange-400 transition-colors font-medium text-lg"
  >
    Traffic
  </Link>

  {/* ✅ Explore dropdown (Option A) */}
  <div
  className="relative"
  onMouseEnter={() => setIsExploreOpen(true)}
  onMouseLeave={() => setIsExploreOpen(false)}
>
  <button
    type="button"
    onClick={() => setIsExploreOpen((prev) => !prev)}
    className="text-white/80 hover:text-orange-400 transition-colors font-medium text-lg flex items-center gap-1"
  >
    Explore
    <ChevronDown className="w-4 h-4" />
  </button>

  {/* FIXED DROPDOWN */}
  {isExploreOpen && (
    <div
      className="
        absolute left-0 top-full     /* attaches EXACTLY under Explore button */
        w-56 bg-white shadow-lg rounded-xl
        py-2 z-50
      "
    >
      <Link href="/scenic-routes" className="block px-4 py-2 text-sm hover:bg-gray-100">Scenic Routes</Link>
      <Link href="/weather-alerts" className="block px-4 py-2 text-sm hover:bg-gray-100">Weather Alerts</Link>
      <Link href="/budget-optimizer" className="block px-4 py-2 text-sm hover:bg-gray-100">Budget Optimizer</Link>
      <Link href="/emergency-hotspots" className="block px-4 py-2 text-sm hover:bg-gray-100">Emergency Hotspots</Link>
      <Link href="/buses" className="block px-4 py-2 text-sm hover:bg-gray-100">Buses</Link>
      <Link href="/foods" className="block px-4 py-2 text-sm hover:bg-gray-100">Foods</Link>
      <Link href="/travel-diary" className="block px-4 py-2 text-sm hover:bg-gray-100">Travel Diary</Link>
    </div>
  )}
</div>





  {/* User menu stays at the end */}
  <UserMenu />
</div>


</div>

              </div>

              <div className="md:hidden">
                <Button variant="ghost" size="sm" className="text-white">
                  <Menu className="w-6 h-6" />
                </Button>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Discover Pakistan's Hidden Treasures
            </h1>
            
            <p className="text-xl sm:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
              Plan your journey with AI-powered suggestions, live weather updates, and personalized itineraries.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">

  {/* Plan Your Trip → Signup */}
 <Link href="/plan-trip?fresh=true">

  <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white">
    Plan Your Trip
    <ArrowRight className="w-5 h-5 ml-2" />
  </Button>
</Link>


  {/* Explore Destinations → Destinations */}
  <Link href="/destinations" className="inline-block">
    <Button
      size="lg"
      variant="outline"
      className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-full text-lg font-medium bg-transparent"
    >
      Explore Destinations
    </Button>
  </Link>

</div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
              <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
                <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-bounce"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-orange-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Discover Pakistan's Hidden Gems
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From majestic mountains to vibrant cities, explore the diverse beauty of Pakistan
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {destinations.map((destination, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg overflow-hidden">
                <div className="relative">
                  <img 
                    src={destination.image} 
                    alt={destination.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {destination.region}
                    </span>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{destination.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{destination.description}</p>
                  <div className="space-y-2">
                    {destination.highlights.map((highlight, i) => (
                      <div key={i} className="flex items-center text-sm text-gray-500">
                        <MapPin className="w-3 h-3 mr-2" />
                        {highlight}
                      </div>
                    ))}
                  </div>
                  <Button className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white border-0">
                    Explore
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Smart Travel Planning for Pakistan
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              AI-powered features designed specifically for Pakistani tourism and travel conditions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-500 group-hover:text-white transition-all">
                    <feature.icon className="w-8 h-8 text-orange-600 group-hover:text-white" />
                  </div>
                  <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
                  <CardDescription className="text-gray-600">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <Link href={feature.href}>
                    <Button variant="outline" className="w-full group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-500 transition-all">
                      Explore
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Trusted by Travelers Worldwide
            </h2>
            <p className="text-xl text-gray-600">
              See what our users say about exploring Pakistan with our platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic">"{testimonial.text}"</p>
                  <div className="flex items-center">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <div>
                      <div className="font-medium text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-500">{testimonial.location}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Explore Pakistan?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of travelers discovering Pakistan's beauty with AI-powered planning
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white border-0 px-8 py-4">
              Start Planning Your Trip
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900">
              <MessageCircle className="w-5 h-5 mr-2" />
              Chat with AI Guide
            </Button>
          </div>
        </div>
      </section>

      
      <footer className="bg-gray-900 text-white py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                  <Plane className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="text-xl font-bold">SMM Travel</span>
                </div>
              </div>
              <p className="text-gray-400">
                Your intelligent travel companion for exploring Pakistan's wonders.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Destinations</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/destinations">Northern Areas</Link></li>
                <li><Link href="/destinations">Punjab</Link></li>
                <li><Link href="/destinations">Sindh</Link></li>
                <li><Link href="/destinations">KPK</Link></li>
                <li><Link href="/destinations">Balochistan</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/hotels">Hotels</Link></li>
                <li><Link href="/vehicles">Transport</Link></li>
                <li><Link href="/traffic">Route Planning</Link></li>
                <li><Link href="/destinations">Trip Planning</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/help">Help Center</Link></li>
                <li><Link href="/contact">Contact Us</Link></li>
                <li><Link href="/privacy">Privacy Policy</Link></li>
                <li><Link href="/terms">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 SMM Travel Platform. All rights reserved. Made with ❤️ for Pakistan.</p>
          </div>
        </div>
      </footer>

      {/* AI Travel Bot */}
      <AITravelBot isOpen={isChatOpen} onToggle={() => setIsChatOpen(!isChatOpen)} />
    </div>
  );
}