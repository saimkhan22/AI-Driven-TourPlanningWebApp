'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  User, 
  Calendar, 
  Heart, 
  Settings,
  Hotel,
  Car,
  MapPin,
  Star,
  Clock,
  Building,
  Shield,
  TrendingUp,
  Users,
  DollarSign
} from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return;
    if (!session) {
      router.push('/auth/signin');
    }
  }, [session, status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const userRole = (session.user as any)?.role || 'customer';

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin': return <Shield className="w-5 h-5" />;
      case 'hotel_owner': return <Building className="w-5 h-5" />;
      case 'vehicle_owner': return <Car className="w-5 h-5" />;
      default: return <User className="w-5 h-5" />;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800';
      case 'hotel_owner': return 'bg-blue-100 text-blue-800';
      case 'vehicle_owner': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'admin': return 'Administrator';
      case 'hotel_owner': return 'Hotel Owner';
      case 'vehicle_owner': return 'Vehicle Owner';
      default: return 'Customer';
    }
  };

  // Mock data - replace with real data from your backend
  const mockBookings = [
    {
      id: 1,
      type: 'hotel',
      name: 'Hunza Serena Inn',
      location: 'Karimabad, Hunza Valley',
      date: '2024-02-15',
      status: 'confirmed',
      amount: 12000
    },
    {
      id: 2,
      type: 'vehicle',
      name: 'Toyota Fortuner',
      location: 'Islamabad to Hunza',
      date: '2024-02-14',
      status: 'pending',
      amount: 9500
    }
  ];

  const mockStats = {
    totalBookings: 5,
    totalSpent: 45000,
    savedItems: 12,
    reviewsGiven: 3
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={session.user?.image || ''} alt={session.user?.name || ''} />
                <AvatarFallback className="text-lg">
                  {session.user?.name?.charAt(0).toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Welcome back, {session.user?.name?.split(' ')[0]}!
                </h1>
                <p className="text-gray-600">{session.user?.email}</p>
                <Badge className={`mt-2 ${getRoleColor(userRole)}`}>
                  {getRoleIcon(userRole)}
                  <span className="ml-1">{getRoleLabel(userRole)}</span>
                </Badge>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Link href="/profile">
                <Button variant="outline">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Button>
              </Link>
              <Link href="/">
                <Button className="bg-orange-500 hover:bg-orange-600">
                  Explore Pakistan
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                  <p className="text-2xl font-bold text-gray-900">{mockStats.totalBookings}</p>
                </div>
                <Calendar className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Spent</p>
                  <p className="text-2xl font-bold text-gray-900">PKR {mockStats.totalSpent.toLocaleString()}</p>
                </div>
                <DollarSign className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Saved Items</p>
                  <p className="text-2xl font-bold text-gray-900">{mockStats.savedItems}</p>
                </div>
                <Heart className="w-8 h-8 text-red-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Reviews Given</p>
                  <p className="text-2xl font-bold text-gray-900">{mockStats.reviewsGiven}</p>
                </div>
                <Star className="w-8 h-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Bookings */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  Recent Bookings
                </CardTitle>
                <CardDescription>
                  Your latest hotel and vehicle bookings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockBookings.map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                          {booking.type === 'hotel' ? (
                            <Hotel className="w-5 h-5 text-orange-600" />
                          ) : (
                            <Car className="w-5 h-5 text-orange-600" />
                          )}
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{booking.name}</h4>
                          <div className="flex items-center text-sm text-gray-600">
                            <MapPin className="w-3 h-3 mr-1" />
                            {booking.location}
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <Clock className="w-3 h-3 mr-1" />
                            {booking.date}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">PKR {booking.amount.toLocaleString()}</p>
                        <Badge 
                          className={booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}
                        >
                          {booking.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <Link href="/bookings">
                    <Button variant="outline" className="w-full">
                      View All Bookings
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                  Explore Pakistan's destinations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/hotels">
                  <Button variant="outline" className="w-full justify-start">
                    <Hotel className="w-4 h-4 mr-2" />
                    Find Hotels
                  </Button>
                </Link>
                <Link href="/vehicles">
                  <Button variant="outline" className="w-full justify-start">
                    <Car className="w-4 h-4 mr-2" />
                    Rent Vehicles
                  </Button>
                </Link>
                <Link href="/destinations">
                  <Button variant="outline" className="w-full justify-start">
                    <MapPin className="w-4 h-4 mr-2" />
                    Plan Trip
                  </Button>
                </Link>
                <Link href="/traffic">
                  <Button variant="outline" className="w-full justify-start">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Check Traffic
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {userRole !== 'customer' && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    {getRoleIcon(userRole)}
                    <span className="ml-2">Management</span>
                  </CardTitle>
                  <CardDescription>
                    Manage your listings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {userRole === 'admin' && (
                    <>
                      <Button variant="outline" className="w-full justify-start">
                        <Users className="w-4 h-4 mr-2" />
                        Manage Users
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <TrendingUp className="w-4 h-4 mr-2" />
                        Analytics
                      </Button>
                    </>
                  )}
                  {userRole === 'hotel_owner' && (
                    <Button variant="outline" className="w-full justify-start">
                      <Building className="w-4 h-4 mr-2" />
                      My Hotels
                    </Button>
                  )}
                  {userRole === 'vehicle_owner' && (
                    <Button variant="outline" className="w-full justify-start">
                      <Car className="w-4 h-4 mr-2" />
                      My Vehicles
                    </Button>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}