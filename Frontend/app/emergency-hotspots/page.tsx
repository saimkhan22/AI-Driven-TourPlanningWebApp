"use client";

import Header from "@/components/shared/Header";
import { PhoneCall, MapPin, ShieldAlert } from "lucide-react";

const hotspots = [
  {
    id: 1,
    name: "Rescue 1122 – Naran Base",
    city: "Naran, KPK",
    type: "Rescue & Ambulance",
    phone: "1122",
    distance: "1.2 km from Naran Bazaar",
  },
  {
    id: 2,
    name: "DHQ Hospital Gilgit",
    city: "Gilgit, Gilgit-Baltistan",
    type: "Hospital",
    phone: "+92-5811-920548",
    distance: "Near Jutial",
  },
  {
    id: 3,
    name: "Police Station Karimabad",
    city: "Hunza, Gilgit-Baltistan",
    type: "Police",
    phone: "15",
    distance: "Main Karimabad Market",
  },
  {
    id: 4,
    name: "Rescue 1122 – Murree",
    city: "Murree, Punjab",
    type: "Rescue & Ambulance",
    phone: "1122",
    distance: "Kashmir Point",
  },
];

export default function EmergencyHotspots() {
  return (
    <div className="p-8">
      <Header title="Emergency Hotspots" />

      <p className="text-gray-600 mb-6">
        Quick access to nearby police, hospitals, and rescue services in
        popular tourist areas of Pakistan.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {hotspots.map((spot) => (
          <div
            key={spot.id}
            className="bg-white rounded-xl shadow-md p-5 border border-gray-100"
          >
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-red-600" />
                {spot.name}
              </h2>
              <span className="text-xs px-3 py-1 rounded-full bg-red-50 text-red-700">
                {spot.type}
              </span>
            </div>

            <div className="flex items-center text-sm text-gray-600 mb-1">
              <MapPin className="w-4 h-4 mr-1 text-orange-500" />
              {spot.city}
            </div>
            <p className="text-sm text-gray-500 mb-3">
              Distance / Location: {spot.distance}
            </p>

            <button
              onClick={() => (window.location.href = `tel:${spot.phone}`)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500 text-white text-sm hover:bg-red-600"
            >
              <PhoneCall className="w-4 h-4" />
              Call: {spot.phone}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
