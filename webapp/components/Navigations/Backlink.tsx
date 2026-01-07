'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function BackLink() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  return (
    <Link
      href={isLoggedIn ? '/dashboard' : '/'}
      className="flex items-center gap-2 text-sm text-gray-600 hover:text-orange-500 mb-6"
    >
      ← Back to {isLoggedIn ? 'Dashboard' : 'Home'}
    </Link>
  );
}
