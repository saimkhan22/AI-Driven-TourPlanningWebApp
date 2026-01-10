'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import MLChatbot from '@/components/MLChatbot';
import {
  MapPin,
  Navigation,
  ArrowRight,
  Plane,
  MessageCircle,
  Mountain,
  Utensils,
  Bus,
  CloudRain,
  Wallet,
  ShieldAlert,
  BookOpen,
  Calendar,
  Users,
  DollarSign,
  Clock,
  Trash2,
  Eye,
  Home,
} from 'lucide-react';

interface Trip {
  _id: string;
  destination: string;
  startDate: string;
  endDate: string;
  duration: number;
  budget: number;
  travelers: number;
  interests: string[];
  vehicle?: string;
  estimatedCost?: {
    total: number;
  };
  createdAt: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState('Traveler');

  useEffect(() => {
    fetchTrips();
    // Get user name from localStorage or cookie
    const storedName = localStorage.getItem('userName');
    if (storedName) setUserName(storedName);
  }, []);

  const fetchTrips = async () => {
    try {
      const response = await fetch('/api/trips/my-trips');
      if (response.ok) {
        const data = await response.json();
        setTrips(data.trips || []);
      }
    } catch (error) {
      console.error('Error fetching trips:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      localStorage.removeItem('userName');
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const deleteTrip = async (tripId: string) => {
    if (!confirm('Are you sure you want to delete this trip?')) return;

    try {
      const response = await fetch(`/api/trips/${tripId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setTrips(trips.filter(trip => trip._id !== tripId));
      }
    } catch (error) {
      console.error('Error deleting trip:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* TOP NAVBAR */}
      <nav className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Plane className="text-orange-500" />
            <span className="font-bold text-xl">SMM Travel</span>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/dashboard" className="font-medium text-orange-500">
              Dashboard
            </Link>
            <Link href="/destinations" className="font-medium text-gray-700 hover:text-orange-500">
              Destinations
            </Link>
            <Link href="/hotels" className="font-medium text-gray-700 hover:text-orange-500">
              Hotels
            </Link>
            <Link href="/vehicles" className="font-medium text-gray-700 hover:text-orange-500">
              Vehicles
            </Link>
            <Link href="/traffic" className="font-medium text-gray-700 hover:text-orange-500">
              Traffic
            </Link>
            <Link href="/">
              <Button variant="ghost" className="flex items-center gap-2">
                <Home className="w-4 h-4" />
                Home
              </Button>
            </Link>
            <Button variant="outline" onClick={handleLogout}>Logout</Button>
          </div>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* WELCOME */}
        <section className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {userName}! 👋
          </h1>
          <p className="text-gray-600">
            Plan your next journey across Pakistan with AI-powered assistance.
          </p>
        </section>

        {/* TRIP STATISTICS */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Trips</p>
                  <p className="text-2xl font-bold">{trips.length}</p>
                </div>
                <MapPin className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Budget</p>
                  <p className="text-2xl font-bold">
                    PKR {trips.reduce((sum, trip) => sum + (trip.budget || 0), 0).toLocaleString()}
                  </p>
                </div>
                <DollarSign className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Days</p>
                  <p className="text-2xl font-bold">
                    {trips.reduce((sum, trip) => sum + (trip.duration || 0), 0)}
                  </p>
                </div>
                <Clock className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Travelers</p>
                  <p className="text-2xl font-bold">
                    {trips.reduce((sum, trip) => sum + (trip.travelers || 0), 0)}
                  </p>
                </div>
                <Users className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </section>

        {/* QUICK ACTIONS */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card className="hover:shadow-lg transition">
            <CardHeader>
              <CardTitle>Plan a New Trip</CardTitle>
              <CardDescription>
                Create a personalized travel plan using AI
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/plan-trip">
                <Button className="w-full bg-orange-500 hover:bg-orange-600">
                  Start Planning <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition">
            <CardHeader>
              <CardTitle>Explore Destinations</CardTitle>
              <CardDescription>
                Discover famous and hidden places
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/destinations">
                <Button variant="outline" className="w-full">
                  Explore Now
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-purple-600">🧠</span>
                ML Insights
              </CardTitle>
              <CardDescription>
                AI-powered recommendations & predictions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/ml-insights">
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  View Insights
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition">
            <CardHeader>
              <CardTitle>Chat with AI Guide</CardTitle>
              <CardDescription>
                Get instant travel help
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                <MessageCircle className="mr-2 w-4 h-4" />
                Open Chat
              </Button>
            </CardContent>
          </Card>
        </section>

        {/* TRIP HISTORY */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Your Trip History</h2>
            <Link href="/plan-trip">
              <Button className="bg-orange-500 hover:bg-orange-600">
                + New Trip
              </Button>
            </Link>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-500">Loading your trips...</p>
            </div>
          ) : trips.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No trips yet</h3>
                <p className="text-gray-600 mb-6">
                  Start planning your first adventure with AI!
                </p>
                <Link href="/plan-trip">
                  <Button className="bg-orange-500 hover:bg-orange-600">
                    Plan Your First Trip
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trips.map((trip) => (
                <Card key={trip._id} className="hover:shadow-lg transition">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{trip.destination}</CardTitle>
                        <CardDescription>
                          {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
                        </CardDescription>
                      </div>
                      <MapPin className="w-5 h-5 text-orange-500" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <span>{trip.duration} days</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-gray-500" />
                        <span>{trip.travelers} travelers</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-gray-500" />
                        <span>PKR {trip.budget?.toLocaleString()}</span>
                      </div>
                      {trip.interests && trip.interests.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {trip.interests.slice(0, 3).map((interest, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded"
                            >
                              {interest}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => router.push(`/trip/${trip._id}`)}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={() => deleteTrip(trip._id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>

        {/* SERVICES */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Travel Services</h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <ServiceCard
              icon={<Mountain />}
              title="Scenic Routes"
              desc="Beautiful & safe travel paths"
              href="/scenic-routes"
            />
            <ServiceCard
              icon={<Utensils />}
              title="Foods"
              desc="Local cuisines & famous spots"
              href="/foods"
            />
            <ServiceCard
              icon={<Bus />}
              title="Buses"
              desc="Public transport & routes"
              href="/buses"
            />
            <ServiceCard
              icon={<CloudRain />}
              title="Weather Alerts"
              desc="Live weather warnings"
              href="/weather-alerts"
            />
            <ServiceCard
              icon={<Wallet />}
              title="Budget Optimizer"
              desc="Plan trips within budget"
              href="/budget-optimizer"
            />
            <ServiceCard
              icon={<ShieldAlert />}
              title="Emergency Hotspots"
              desc="Hospitals & help points"
              href="/emergency-hotspots"
            />
            <ServiceCard
              icon={<BookOpen />}
              title="Travel Diary"
              desc="Save memories & notes"
              href="/travel-diary"
            />
          </div>
        </section>
      </main>

      {/* ML-Powered Chatbot */}
      <MLChatbot />
    </div>
  );
}

function ServiceCard({
  icon,
  title,
  desc,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  href: string;
}) {
  return (
    <Card className="hover:shadow-lg transition">
      <CardHeader>
        <div className="w-10 h-10 text-orange-500 mb-2">{icon}</div>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{desc}</CardDescription>
      </CardHeader>
      <CardContent>
        <Link href={href}>
          <Button variant="outline" className="w-full">
            Open
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
