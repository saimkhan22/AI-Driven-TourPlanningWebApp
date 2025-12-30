"use client";

import Header from "@/components/shared/Header";
import { Wallet } from "lucide-react";
import { useState } from "react";

export default function BudgetOptimizer() {
  const [budget, setBudget] = useState("");
  const [result, setResult] = useState(null as any);

  const calculate = () => {
    const num = Number(budget);
    if (!num) return;

    setResult({
      hotel: num * 0.4,
      travel: num * 0.3,
      food: num * 0.2,
      activities: num * 0.1,
    });
  };

  return (
    <div className="p-8">
      <Header title="Budget Optimizer" />

      <div className="max-w-lg bg-white p-6 rounded-xl shadow-lg">
        <label className="font-medium text-gray-700">Enter Your Budget (PKR)</label>
        <input
          type="number"
          className="w-full border p-3 rounded-lg mt-2 mb-4"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
        />

        <button
          onClick={calculate}
          className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600"
        >
          Calculate
        </button>

        {result && (
          <div className="mt-6">
            <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
              <Wallet className="text-orange-600" /> Suggested Breakdown
            </h3>

            <ul className="space-y-2 text-gray-800">
              <li>🏨 Hotels: PKR {result.hotel}</li>
              <li>🚗 Travel: PKR {result.travel}</li>
              <li>🍽️ Food: PKR {result.food}</li>
              <li>🎟️ Activities: PKR {result.activities}</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
