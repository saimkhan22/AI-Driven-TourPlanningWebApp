import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { budget, days, people } = await req.json();

  return NextResponse.json({
    recommendedHotel: budget < 20000 ? "Budget Guest House" : "Deluxe Hotel",
    recommendedVehicle: people <= 4 ? "Car" : "Hiace",
    breakdown: {
      hotel: budget * 0.4,
      transport: budget * 0.3,
      food: budget * 0.2,
      misc: budget * 0.1
    }
  });
}
