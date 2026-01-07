'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
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
} from 'lucide-react';

export default function DashboardPage() {
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

            <Button variant="outline">Logout</Button>
          </div>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* WELCOME */}
        <section className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back 👋
          </h1>
          <p className="text-gray-600">
            Plan your next journey across Pakistan with AI-powered assistance.
          </p>
        </section>

        {/* QUICK ACTIONS */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
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
