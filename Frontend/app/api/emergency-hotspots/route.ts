import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json([
    {
      name: "Rescue 1122",
      contact: "1122",
      location: "Nearby Station"
    },
    {
      name: "Police Station",
      contact: "15",
      location: "City Center"
    },
    {
      name: "Nearest Hospital",
      contact: "+92-300-1234567",
      location: "Main Road"
    }
  ]);
}
