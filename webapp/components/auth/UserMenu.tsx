'use client';

import { useState } from 'react';
import { useAuth } from '@/components/auth/AuthProvider';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  User,
  Settings,
  Calendar,
  Heart,
  LogOut,
  Shield,
  Building,
  Car
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function UserMenu() {
  const { user, logout, loading } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  if (loading) {
    return (
      <div className="flex items-center space-x-2">
        <div className="h-8 w-20 bg-gray-200 animate-pulse rounded"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center space-x-2">
        <Link href="/auth/signin">
          <Button variant="outline" size="sm">
            Sign In
          </Button>
        </Link>
        <Link href="/auth/signup">
          <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
            Sign Up
          </Button>
        </Link>
      </div>
    );
  }

  const handleSignOut = async () => {
    setIsLoading(true);
    await logout();
    router.push('/');
    setIsLoading(false);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-orange-500 text-white">
              {user.name?.charAt(0).toUpperCase() || 'U'}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-2">
            <div className="flex items-center space-x-2">
              <Avatar className="h-12 w-12">
                <AvatarFallback className="bg-orange-500 text-white text-lg">
                  {user.name?.charAt(0).toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-sm font-medium leading-none">{user.name}</p>
                <p className="text-xs leading-none text-muted-foreground mt-1">
                  {user.email}
                </p>
              </div>
            </div>
            <Badge className="w-fit bg-gray-100 text-gray-800">
              <User className="w-4 h-4" />
              <span className="ml-1">Traveler</span>
            </Badge>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <Link href="/dashboard">
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span>Dashboard</span>
          </DropdownMenuItem>
        </Link>

        <Link href="/profile">
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Profile Settings</span>
          </DropdownMenuItem>
        </Link>

        <Link href="/bookings">
          <DropdownMenuItem>
            <Calendar className="mr-2 h-4 w-4" />
            <span>My Bookings</span>
          </DropdownMenuItem>
        </Link>

        <Link href="/wishlist">
          <DropdownMenuItem>
            <Heart className="mr-2 h-4 w-4" />
            <span>Wishlist</span>
          </DropdownMenuItem>
        </Link>

        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut} disabled={isLoading}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>{isLoading ? 'Signing out...' : 'Sign out'}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}