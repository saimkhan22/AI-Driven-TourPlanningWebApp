"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function Header({ title }: { title: string }) {
  return (
    <div className="flex items-center mb-6 gap-4">
      <Link
        href="/"
        className="flex items-center text-orange-600 font-medium hover:underline"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        Back to Home
      </Link>
      <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
    </div>
  );
}
