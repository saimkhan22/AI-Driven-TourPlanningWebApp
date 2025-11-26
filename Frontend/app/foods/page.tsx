"use client";

import Header from "@/components/shared/Header";
import { Utensils, MapPin } from "lucide-react";

const foods = [
  {
    id: 1,
    name: "Chapli Kabab",
    city: "Peshawar, KPK",
    description: "Spicy minced meat kebab, best with naan and raita.",
    where: "Namak Mandi Food Street",
  },
  {
    id: 2,
    name: "Karahi Gosht",
    city: "Lahore, Punjab",
    description: "Rich tomato-based mutton karahi cooked in desi ghee.",
    where: "Lakshmi Chowk",
  },
  {
    id: 3,
    name: "Sindhi Biryani",
    city: "Karachi, Sindh",
    description: "Aromatic rice with spicy meat and potatoes.",
    where: "Burns Road Food Street",
  },
  {
    id: 4,
    name: "Thukpa & Momos",
    city: "Skardu, GB",
    description: "Tibetan noodle soup and dumplings in the mountains.",
    where: "Local cafes in Skardu Bazaar",
  },
];

export default function Foods() {
  return (
    <div className="p-8">
      <Header title="Local Foods & Where to Try Them" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {foods.map((f) => (
          <div
            key={f.id}
            className="bg-white rounded-xl shadow-md p-5 border border-gray-100"
          >
            <h2 className="text-lg font-semibold mb-1 flex items-center gap-2">
              <Utensils className="w-5 h-5 text-orange-600" />
              {f.name}
            </h2>
            <div className="flex items-center text-sm text-gray-600 mb-2">
              <MapPin className="w-4 h-4 mr-1" />
              {f.city}
            </div>
            <p className="text-gray-700 text-sm mb-3">{f.description}</p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Best place:</span> {f.where}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
