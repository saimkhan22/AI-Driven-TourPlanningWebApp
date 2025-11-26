"use client";

import Header from "@/components/shared/Header";
import { Bus, MapPin } from "lucide-react";
import { useState } from "react";

const routes = [
  {
    id: 1,
    operator: "Daewoo Express",
    from: "Lahore",
    to: "Islamabad",
    departure: "08:00 AM",
    duration: "4.5 hours",
    price: 2500,
  },
  {
    id: 2,
    operator: "Faisal Movers",
    from: "Islamabad",
    to: "Naran",
    departure: "06:00 AM",
    duration: "7 hours",
    price: 3500,
  },
  {
    id: 3,
    operator: "KPK Tours",
    from: "Peshawar",
    to: "Swat",
    departure: "07:30 AM",
    duration: "4 hours",
    price: 2200,
  },
  {
    id: 4,
    operator: "Northern Connect",
    from: "Islamabad",
    to: "Hunza",
    departure: "10:00 PM (Night Coach)",
    duration: "16 hours",
    price: 5500,
  },
];

export default function Buses() {
  const [fromFilter, setFromFilter] = useState("");

  const filtered = fromFilter
    ? routes.filter((r) =>
        r.from.toLowerCase().includes(fromFilter.toLowerCase())
      )
    : routes;

  return (
    <div className="p-8">
      <Header title="Bus Routes & Tickets" />

      <div className="mb-6 max-w-md">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Filter by departure city
        </label>
        <input
          type="text"
          placeholder="e.g. Islamabad, Lahore, Peshawar..."
          className="w-full border rounded-lg px-3 py-2"
          value={fromFilter}
          onChange={(e) => setFromFilter(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto bg-white rounded-xl shadow-md">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-50 text-left">
              <th className="px-4 py-3">Operator</th>
              <th className="px-4 py-3">Route</th>
              <th className="px-4 py-3">Departure</th>
              <th className="px-4 py-3">Duration</th>
              <th className="px-4 py-3">Price (PKR)</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => (
              <tr key={r.id} className="border-t">
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <Bus className="w-4 h-4 text-orange-500" />
                    <span className="font-medium">{r.operator}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-col">
                    <span className="flex items-center">
                      <MapPin className="w-3 h-3 mr-1 text-gray-500" />
                      {r.from} → {r.to}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3">{r.departure}</td>
                <td className="px-4 py-3">{r.duration}</td>
                <td className="px-4 py-3 font-semibold">
                  PKR {r.price.toLocaleString()}
                </td>
              </tr>
            ))}

            {filtered.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-6 text-center text-gray-500"
                >
                  No routes found for this city.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
