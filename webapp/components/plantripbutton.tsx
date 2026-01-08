'use client';

import { useRouter } from 'next/navigation';
import { isLoggedIn } from '@/lib/auth';
import { Button } from '@/components/ui/button';

export default function PlanTripButton() {
  const router = useRouter();

  const handleClick = () => {
    if (!isLoggedIn()) {
      router.push('/login');
    } else {
      router.push('/plan-trip');
    }
  };

  return (
    <Button
      onClick={handleClick}
      className="bg-orange-500 hover:bg-orange-600 text-white"
    >
      Plan Your Trip
    </Button>
  );
}
