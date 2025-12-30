"use client";

import Header from "@/components/shared/Header";
import { Mountain, MapPin } from "lucide-react";

export default function ScenicRoutes() {
  const routes = [
    {
      id: 1,
      name: "Hunza to Khunjerab Pass",
      distance: "130 km",
      duration: "4 hours",
      highlights: "Highest paved border in the world, snow-capped peaks",
      image:
        "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&w=800",
    },
    {
      id: 2,
      name: "Swat to Kalam Valley",
      distance: "100 km",
      duration: "3 hours",
      highlights: "River Swat, lush forests, waterfalls",
      image:
        "https://images.pexels.com/photos/2474690/pexels-photo-2474690.jpeg?auto=compress&w=800",
    },
  ];

  return (
    <div className="p-8">
      <Header title="Scenic Routes" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {routes.map((route) => (
          <div
            key={route.id}
            className="rounded-xl shadow-lg bg-white overflow-hidden"
          >
            <img src={route.image} className="h-48 w-full object-cover" />

            <div className="p-6">
              <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
                <Mountain className="w-5 h-5 text-orange-600" />
                {route.name}
              </h2>

              <p className="text-gray-600 text-sm mb-2">
                <strong>Distance:</strong> {route.distance}
              </p>
              <p className="text-gray-600 text-sm mb-2">
                <strong>Duration:</strong> {route.duration}
              </p>
              <p className="text-gray-700">{route.highlights}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
