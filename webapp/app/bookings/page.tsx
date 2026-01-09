'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  Home, 
  Calendar, 
  MapPin, 
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  Loader2
} from 'lucide-react';
import Link from 'next/link';

export default function BookingsPage() {
  const [bookings] = useState([
    {
      id: 1,
      type: 'Hotel',
      name: 'Pearl Continental Lahore',
      location: 'Lahore, Punjab',
      date: '2026-02-15 to 2026-02-18',
      amount: 'PKR 45,000',
      status: 'Confirmed',
      bookingId: 'BK-2026-001'
    },
    {
      id: 2,
      type: 'Vehicle',
      name: 'Toyota Land Cruiser',
      location: 'Islamabad',
      date: '2026-03-10 to 2026-03-17',
      amount: 'PKR 56,000',
      status: 'Pending',
      bookingId: 'BK-2026-002'
    },
    {
      id: 3,
      type: 'Trip Package',
      name: 'Hunza Valley Tour',
      location: 'Gilgit-Baltistan',
      date: '2026-04-05 to 2026-04-12',
      amount: 'PKR 85,000',
      status: 'Confirmed',
      bookingId: 'BK-2026-003'
    }
  ]);

  const getStatusBadge = (status: string) => {
    if (status === 'Confirmed') {
      return (
        <Badge className="bg-green-100 text-green-800">
          <CheckCircle className="w-3 h-3 mr-1" />
          Confirmed
        </Badge>
      );
    }
    if (status === 'Pending') {
      return (
        <Badge className="bg-yellow-100 text-yellow-800">
          <Loader2 className="w-3 h-3 mr-1 animate-spin" />
          Pending
        </Badge>
      );
    }
    return (
      <Badge className="bg-red-100 text-red-800">
        <XCircle className="w-3 h-3 mr-1" />
        Cancelled
      </Badge>
    );
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
            <h1 className="text-xl font-bold">My Bookings</h1>
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
          <h2 className="text-2xl font-bold mb-2">Your Bookings</h2>
          <p className="text-gray-600">Manage and track all your travel bookings</p>
        </div>

        {bookings.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Calendar className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">No bookings yet</h3>
              <p className="text-gray-600 mb-4">Start planning your trip to create bookings</p>
              <Link href="/plan-trip">
                <Button className="bg-orange-500 hover:bg-orange-600">
                  Plan a Trip
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <Card key={booking.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl">{booking.name}</CardTitle>
                      <CardDescription className="flex items-center gap-2 mt-1">
                        <MapPin className="w-4 h-4" />
                        {booking.location}
                      </CardDescription>
                    </div>
                    {getStatusBadge(booking.status)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-orange-500" />
                      <div>
                        <p className="text-sm text-gray-600">Dates</p>
                        <p className="font-medium text-sm">{booking.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-5 h-5 text-green-500" />
                      <div>
                        <p className="text-sm text-gray-600">Amount</p>
                        <p className="font-medium text-sm">{booking.amount}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-blue-500" />
                      <div>
                        <p className="text-sm text-gray-600">Booking ID</p>
                        <p className="font-medium text-sm">{booking.bookingId}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">View Details</Button>
                    <Button variant="outline" size="sm">Download Invoice</Button>
                    {booking.status === 'Confirmed' && (
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                        Cancel Booking
                      </Button>
                    )}
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

