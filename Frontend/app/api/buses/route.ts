import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    buses: [
      {
        company: "Daewoo Express",
        route: "Lahore → Islamabad",
        departure: "8:00 AM",
        seats: 12
      },
      {
        company: "Faisal Movers",
        route: "Karachi → Multan",
        departure: "10:30 AM",
        seats: 5
      }
    ]
  });
}
