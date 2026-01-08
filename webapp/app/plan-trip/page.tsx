'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
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
      router.push('/signin');
    }
  }, [router]);

  const [from, setFrom] = useState('');
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [travelers, setTravelers] = useState('');
  const [budget, setBudget] = useState('');
  const [vehicle, setVehicle] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePlanTrip = () => {
    // ❌ VALIDATION (professional rule)
    if (
      !from ||
      !destination ||
      !startDate ||
      !endDate ||
      !travelers ||
      !budget ||
      !vehicle
    ) {
      alert('❌ Please fill all required fields');
      return;
    }

    setLoading(true);

    // Save trip temporarily (later DB)
    localStorage.setItem(
      'tripData',
      JSON.stringify({
        from,
        destination,
        startDate,
        endDate,
        travelers,
        budget,
        vehicle,
      })
    );

    setTimeout(() => {
      router.push('/trip-result');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* NAVBAR */}
      <nav className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Plane className="text-orange-500" />
            <span className="font-bold text-xl">SMM Travel</span>
          </div>
        </div>
      </nav>

      {/* CONTENT */}
      <main className="max-w-3xl mx-auto px-6 py-10">
        <Card>
          <CardHeader>
            <CardTitle>Plan Your Trip ✈️</CardTitle>
            <CardDescription>
              Enter details to generate a smart travel plan
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-5">
            <Input placeholder="From (e.g. Lahore)" value={from} onChange={(e) => setFrom(e.target.value)} />
            <Input placeholder="Destination (e.g. Hunza)" value={destination} onChange={(e) => setDestination(e.target.value)} />

            <div className="grid grid-cols-2 gap-4">
              <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
              <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </div>

            <Input type="number" placeholder="Travelers" value={travelers} onChange={(e) => setTravelers(e.target.value)} />
            <Input type="number" placeholder="Budget (PKR)" value={budget} onChange={(e) => setBudget(e.target.value)} />

            <select
              className="w-full border rounded-md px-3 py-2"
              value={vehicle}
              onChange={(e) => setVehicle(e.target.value)}
            >
              <option value="">Select Vehicle</option>
              <option value="Car">Car</option>
              <option value="Van">Van</option>
              <option value="4x4 Jeep">4x4 Jeep</option>
            </select>

            <Button
              onClick={handlePlanTrip}
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600"
            >
              {loading ? 'Generating Plan...' : 'Generate Trip Plan'}
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
