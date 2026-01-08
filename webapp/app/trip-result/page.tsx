'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plane, MapPin, Calendar, Users, Wallet, Car } from 'lucide-react';

export default function TripResultPage() {
  const [trip, setTrip] = useState<any>(null);

  useEffect(() => {
    const data = localStorage.getItem('tripData');
    if (data) setTrip(JSON.parse(data));
  }, []);

  if (!trip) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Plane className="text-orange-500" />
            <span className="font-bold text-xl">SMM Travel</span>
          </div>
          <Link href="/dashboard" className="text-sm text-orange-500">
            ← Back to Dashboard
          </Link>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-6 py-10">
        <Card>
          <CardHeader>
            <CardTitle>Your Trip Plan ✅</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p><MapPin /> {trip.from} → {trip.destination}</p>
            <p><Calendar /> {trip.startDate} to {trip.endDate}</p>
            <p><Users /> Travelers: {trip.travelers}</p>
            <p><Wallet /> Budget: PKR {trip.budget}</p>
            <p><Car /> Vehicle: {trip.vehicle}</p>

            <Button className="w-full mt-4 bg-orange-500">
              Save Trip to Dashboard
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
