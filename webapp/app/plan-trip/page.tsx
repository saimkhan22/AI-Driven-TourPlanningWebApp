'use client';

import { useSearchParams } from 'next/navigation';


import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  MapPin,
  Calendar,
  Users,
  Car,
  Wallet,
  ArrowLeft,
  CheckCircle,
} from 'lucide-react';

/* ================= AUTH CHECK ================= */
const isLoggedIn = () =>
  typeof window !== 'undefined' && !!localStorage.getItem('token');

type TripPlan = {
  destination: string;
  travelers: string;
  vehicle: string;
  startDate: string;
  endDate: string;
};

export default function PlanResultPage() {
    const searchParams = useSearchParams();
const isFresh = searchParams.get('fresh');


  const router = useRouter();
  const [trip, setTrip] = useState<TripPlan | null>(null);

  /* ================= PROTECT PAGE ================= */
  useEffect(() => {
    if (!isLoggedIn()) {
      router.replace('/login');
      return;
    }

    const storedTrip = localStorage.getItem('tripPlan');
    if (!storedTrip) {
      router.replace('/plan-trip');
      return;
    }

    setTrip(JSON.parse(storedTrip));
  }, [router]);

  if (!trip) return null;

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex justify-center">
      <div className="w-full max-w-4xl space-y-6">

        {/* HEADER */}
        <div className="flex items-center gap-3">
          {/* ✅ FIXED BACK BUTTON */}
          <Link href="/plan-trip">
            <button
  onClick={() => router.back()}
  className="flex items-center gap-2 text-sm text-gray-600 hover:text-orange-500"
>
  ← Back to Plan Trip
</button>

          </Link>

          <h1 className="text-2xl font-bold">Your Trip Plan ✨</h1>
        </div>

        {/* SUMMARY CARD */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl">Trip Summary</CardTitle>
            <CardDescription>
              AI-generated plan based on your selections
            </CardDescription>
          </CardHeader>

          <CardContent className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <MapPin className="text-orange-500" />
                <span className="font-medium">{trip.destination}</span>
              </div>

              <div className="flex items-center gap-3">
                <Calendar className="text-orange-500" />
                <span>
                  {trip.startDate} → {trip.endDate}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Users className="text-orange-500" />
                <span>{trip.travelers} Travelers</span>
              </div>

              <div className="flex items-center gap-3">
                <Car className="text-orange-500" />
                <span>{trip.vehicle}</span>
              </div>
            </div>

            {/* ESTIMATION */}
            <div className="bg-orange-50 p-4 rounded-lg space-y-3">
              <h3 className="font-semibold flex items-center gap-2">
                <Wallet className="w-4 h-4" />
                Estimated Cost
              </h3>

              <div className="text-sm text-gray-700 space-y-1">
                <p>Vehicle (per day): <strong>PKR 8,000 – 15,000</strong></p>
                <p>Fuel & Tolls: <strong>PKR 6,000</strong></p>
                <p>Miscellaneous: <strong>PKR 4,000</strong></p>
              </div>

              <Badge className="bg-orange-500 text-white w-fit">
                Estimated Total: PKR 35,000+
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* HIGHLIGHTS */}
        <Card>
          <CardHeader>
            <CardTitle>Why this plan works</CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="flex gap-2">
              <CheckCircle className="text-green-600 w-4 h-4 mt-1" />
              Vehicle matched with terrain
            </div>
            <div className="flex gap-2">
              <CheckCircle className="text-green-600 w-4 h-4 mt-1" />
              Suitable for group size
            </div>
            <div className="flex gap-2">
              <CheckCircle className="text-green-600 w-4 h-4 mt-1" />
              Optimized for budget & comfort
            </div>
          </CardContent>
        </Card>

        {/* ACTIONS */}
        <div className="flex flex-col md:flex-row gap-4">
          <Button
            className="bg-orange-500 hover:bg-orange-600"
            onClick={() => alert('Trip confirmed! (Backend coming soon)')}
          >
            Confirm Trip
          </Button>

          <Button variant="outline" onClick={() => router.push('/dashboard')}>
            Save to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}
