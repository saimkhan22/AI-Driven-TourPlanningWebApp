'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  Home, 
  Heart, 
  MapPin, 
  Star,
  Trash2,
  ExternalLink
} from 'lucide-react';
import Link from 'next/link';

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState([
    {
      id: 1,
      type: 'Destination',
      name: 'Fairy Meadows',
      location: 'Gilgit-Baltistan',
      image: 'https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
      rating: 4.9,
      price: 'PKR 15,000',
      description: 'Base camp for Nanga Parbat views'
    },
    {
      id: 2,
      type: 'Hotel',
      name: 'Serena Hotel Islamabad',
      location: 'Islamabad',
      image: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
      rating: 4.8,
      price: 'PKR 25,000/night',
      description: 'Luxury hotel in the heart of capital'
    },
    {
      id: 3,
      type: 'Destination',
      name: 'Neelum Valley',
      location: 'Azad Kashmir',
      image: 'https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
      rating: 4.8,
      price: 'PKR 9,000',
      description: 'Paradise on earth with crystal rivers'
    }
  ]);

  const removeFromWishlist = (id: number) => {
    setWishlist(wishlist.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Dashboard
              </Button>
            </Link>
            <h1 className="text-xl font-bold">My Wishlist</h1>
          </div>
          <Link href="/">
            <Button variant="outline" className="flex items-center gap-2">
              <Home className="w-4 h-4" />
              Home
            </Button>
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Your Wishlist</h2>
          <p className="text-gray-600">Save your favorite destinations and hotels for later</p>
        </div>

        {wishlist.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Heart className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Your wishlist is empty</h3>
              <p className="text-gray-600 mb-4">Start adding destinations and hotels you love</p>
              <Link href="/destinations">
                <Button className="bg-orange-500 hover:bg-orange-600">
                  Explore Destinations
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {wishlist.map((item) => (
              <Card key={item.id} className="group hover:shadow-xl transition-all overflow-hidden">
                <div className="relative">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-4 left-4 bg-orange-500 text-white">
                    {item.type}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-4 right-4 bg-white/90 hover:bg-white"
                    onClick={() => removeFromWishlist(item.id)}
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{item.name}</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {item.location}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{item.rating}</span>
                    </div>
                    <span className="text-lg font-bold text-orange-500">{item.price}</span>
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/${item.type.toLowerCase()}s`} className="flex-1">
                      <Button variant="outline" className="w-full" size="sm">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                    </Link>
                    <Link href="/plan-trip" className="flex-1">
                      <Button className="w-full bg-orange-500 hover:bg-orange-600" size="sm">
                        Plan Trip
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

