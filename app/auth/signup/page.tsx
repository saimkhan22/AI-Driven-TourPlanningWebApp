'use client';

import SignupForm from '@/components/auth/SignupForm';
import { Plane } from 'lucide-react';
import Link from 'next/link';

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-3">
            <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
              <Plane className="w-7 h-7 text-white" />
            </div>
            <div>
              <span className="text-2xl font-bold text-gray-900">SMM Travel</span>
              <p className="text-sm text-gray-600">Explore Pakistan</p>
            </div>
          </Link>
        </div>

        <SignupForm />
      </div>
    </div>
  );
}