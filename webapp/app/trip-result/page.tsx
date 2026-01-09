'use client';

import { useRouter } from 'next/navigation';


export default function PlanResult() {
    const router = useRouter();
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Your Trip Plan</h1>

      <ul className="space-y-2 text-gray-700">
        <li>📍 Destination optimized</li>
        <li>🚗 Best vehicle selected</li>
        <li>🌦 Weather checked</li>
        <li>🛣 Scenic routes suggested</li>
        <li>🍽 Food & rest stops included</li>
      </ul>

      <p className="mt-6 text-green-600 font-medium">
        ✅ Trip generated successfully
      </p>
    </div>
  );
}
