'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/components/auth/AuthProvider';
import { AlertCircle } from 'lucide-react';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface PlanTripButtonProps {
  size?: 'default' | 'sm' | 'lg' | 'icon';
  variant?: 'default' | 'outline' | 'ghost';
  className?: string;
  children?: React.ReactNode;
}

export default function PlanTripButton({
  size = 'default',
  variant = 'default',
  className = "bg-orange-500 hover:bg-orange-600 text-white",
  children = "Plan Your Trip"
}: PlanTripButtonProps) {
  const router = useRouter();
  const { user } = useAuth();
  const [showAuthDialog, setShowAuthDialog] = useState(false);

  const handleClick = () => {
    if (!user) {
      setShowAuthDialog(true);
    } else {
      router.push('/plan-trip');
    }
  };

  return (
    <>
      <Button
        onClick={handleClick}
        size={size}
        variant={variant}
        className={className}
      >
        {children}
      </Button>

      {/* Authentication Required Dialog */}
      <Dialog open={showAuthDialog} onOpenChange={setShowAuthDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-orange-600" />
              </div>
              <DialogTitle className="text-2xl">Authentication Required</DialogTitle>
            </div>
            <DialogDescription className="text-base">
              Please sign in or create an account to start planning your trip with AI-powered recommendations.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-3 mt-4">
            <Button
              onClick={() => router.push('/auth/signup')}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-6 text-lg"
            >
              Create Account
            </Button>
            <Button
              onClick={() => router.push('/auth/signin')}
              variant="outline"
              className="w-full py-6 text-lg"
            >
              Sign In
            </Button>
            <Button
              onClick={() => setShowAuthDialog(false)}
              variant="ghost"
              className="w-full"
            >
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
