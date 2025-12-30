"use client";

import Header from "@/components/shared/Header";
import { CloudRain, AlertTriangle } from "lucide-react";

export default function WeatherAlerts() {
  const alerts = [
    {
      id: 1,
      area: "Naran Kaghan",
      alert: "Heavy Snowfall Expected",
      level: "High",
      icon: CloudRain,
    },
    {
      id: 2,
      area: "Gilgit",
      alert: "Landslide Risk Due to Rain",
      level: "Moderate",
      icon: AlertTriangle,
    },
  ];

  return (
    <div className="p-8">
      <Header title="Weather Alerts" />

      <div className="space-y-4">
        {alerts.map((a) => (
          <div
            key={a.id}
            className="p-6 rounded-xl bg-red-50 border border-red-200 shadow-sm"
          >
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <a.icon className="text-red-600" /> {a.area}
            </h3>
            <p className="text-gray-800">{a.alert}</p>
            <p className="text-sm mt-1 font-medium text-red-700">
              Alert Level: {a.level}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
