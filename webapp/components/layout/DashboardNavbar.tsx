'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Plane } from 'lucide-react';

export default function DashboardNavbar() {
  return (
    <nav className="bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/dashboard" className="flex items-center gap-2 font-bold text-xl">
          <Plane className="text-orange-500" />
          SMM Travel
        </Link>

        {/* App Navigation */}
        <div className="flex items-center gap-6">
          <Link href="/dashboard" className="hover:text-orange-500 font-medium">
            Dashboard
          </Link>
          <Link href="/destinations" className="hover:text-orange-500 font-medium">
            Destinations
          </Link>
          <Link href="/hotels" className="hover:text-orange-500 font-medium">
            Hotels
          </Link>
          <Link href="/vehicles" className="hover:text-orange-500 font-medium">
            Vehicles
          </Link>

          <Button variant="outline">Logout</Button>
        </div>
      </div>
    </nav>
  );
}
