'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  Calendar,
  MapPin,
  Users,
  Wallet,
  ArrowRight,
  Plane,
  Car,
} from 'lucide-react';

export default function PlanTripPage() {
  const router = useRouter();

  // 🔐 AUTH CHECK
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.replace('/signin');
    }
  }, [router]);

  // FORM STATE
  const [from, setFrom] = useState('');
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [travelers, setTravelers] = useState('');
  const [budget, setBudget] = useState('');
  const [vehicle, setVehicle] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // 🚀 PLAN TRIP
  const handlePlanTrip = () => {
    setError('');

    if (
      !from ||
      !destination ||
      !startDate ||
      !endDate ||
      !travelers ||
      !budget ||
      !vehicle
    ) {
      setError('❌ Please fill all required fields');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      alert('✅ Trip plan generated successfully!');
    }, 1500);
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

          <Link
            href="/dashboard"
            className="text-sm text-gray-600 hover:text-orange-500"
          >
            ← Back to Dashboard
          </Link>
        </div>
      </nav>

      {/* MAIN */}
      <main className="max-w-3xl mx-auto px-6 py-10">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">
              Plan Your Trip ✈️
            </CardTitle>
            <CardDescription>
              Enter complete details to generate your travel plan
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* ERROR */}
            {error && (
              <p className="text-red-500 text-sm font-medium">{error}</p>
            )}

            {/* FROM */}
            <div>
              <label className="text-sm font-medium mb-1 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-orange-500" />
                From
              </label>
              <Input
                placeholder="e.g. Lahore"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
              />
            </div>

            {/* DESTINATION */}
            <div>
              <label className="text-sm font-medium mb-1 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-orange-500" />
                Destination
              </label>
              <Input
                placeholder="e.g. Hunza Valley"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>

            {/* DATES */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-orange-500" />
                  Start Date
                </label>
                <Input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-1 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-orange-500" />
                  End Date
                </label>
                <Input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>

            {/* TRAVELERS */}
            <div>
              <label className="text-sm font-medium mb-1 flex items-center gap-2">
                <Users className="w-4 h-4 text-orange-500" />
                Travelers
              </label>
              <Input
                type="number"
                placeholder="e.g. 4"
                value={travelers}
                onChange={(e) => setTravelers(e.target.value)}
              />
            </div>

            {/* BUDGET */}
            <div>
              <label className="text-sm font-medium mb-1 flex items-center gap-2">
                <Wallet className="w-4 h-4 text-orange-500" />
                Budget (PKR)
              </label>
              <Input
                type="number"
                placeholder="e.g. 150000"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
              />
            </div>

            {/* VEHICLE */}
            <div>
              <label className="text-sm font-medium mb-1 flex items-center gap-2">
                <Car className="w-4 h-4 text-orange-500" />
                Vehicle Type
              </label>
              <select
                className="w-full border rounded-md px-3 py-2"
                value={vehicle}
                onChange={(e) => setVehicle(e.target.value)}
              >
                <option value="">Select vehicle</option>
                <option value="car">Car (4 Seater)</option>
                <option value="van">Van (7 Seater)</option>
                <option value="coaster">Coaster (18 Seater)</option>
                <option value="jeep">4x4 Jeep (Mountains)</option>
              </select>
            </div>

            {/* ACTION */}
            <Button
              onClick={handlePlanTrip}
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white"
            >
              {loading ? 'Planning...' : 'Generate Trip Plan'}
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
