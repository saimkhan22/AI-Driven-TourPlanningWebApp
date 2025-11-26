import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    alert: "Heavy Snowfall Expected",
    area: "Naran - Babusar Top",
    risk: "High",
    suggestions: [
      "Avoid night travel",
      "Use snow chains",
      "4x4 vehicle recommended"
    ]
  });
}
