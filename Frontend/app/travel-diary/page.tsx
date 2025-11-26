"use client";

import Header from "@/components/shared/Header";
import { useState } from "react";
import { Calendar, MapPin } from "lucide-react";

type DiaryEntry = {
  id: number;
  date: string;
  place: string;
  text: string;
};

export default function TravelDiary() {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [date, setDate] = useState("");
  const [place, setPlace] = useState("");
  const [text, setText] = useState("");

  const addEntry = () => {
    if (!date || !place || !text) return;

    setEntries((prev) => [
      {
        id: prev.length + 1,
        date,
        place,
        text,
      },
      ...prev,
    ]);

    setDate("");
    setPlace("");
    setText("");
  };

  return (
    <div className="p-8">
      <Header title="Travel Diary" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">
            Add a New Memory ✨
          </h2>

          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date
          </label>
          <input
            type="date"
            className="w-full border rounded-lg px-3 py-2 mb-3"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <label className="block text-sm font-medium text-gray-700 mb-1">
            Place
          </label>
          <input
            type="text"
            placeholder="Hunza, Skardu, Lahore…"
            className="w-full border rounded-lg px-3 py-2 mb-3"
            value={place}
            onChange={(e) => setPlace(e.target.value)}
          />

          <label className="block text-sm font-medium text-gray-700 mb-1">
            Your Experience
          </label>
          <textarea
            placeholder="Write about your day, people you met, food you tried…"
            className="w-full border rounded-lg px-3 py-2 mb-4 h-32 resize-none"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <button
            onClick={addEntry}
            className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600"
          >
            Save Entry
          </button>
        </div>

        {/* Entries list */}
        <div className="space-y-4">
          {entries.length === 0 && (
            <p className="text-gray-500">
              Your diary is empty. Start by adding your first travel memory!
            </p>
          )}

          {entries.map((e) => (
            <div
              key={e.id}
              className="bg-white rounded-xl shadow-sm p-5 border border-gray-100"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center text-sm text-gray-600 gap-2">
                  <Calendar className="w-4 h-4" />
                  {e.date}
                </div>
                <div className="flex items-center text-sm text-gray-600 gap-1">
                  <MapPin className="w-4 h-4 text-orange-500" />
                  {e.place}
                </div>
              </div>
              <p className="text-gray-800 text-sm whitespace-pre-wrap">
                {e.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
