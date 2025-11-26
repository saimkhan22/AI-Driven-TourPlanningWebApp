import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    foods: [
      {
        region: "Lahore",
        dish: "Nihari",
        restaurant: "Warish Nihari"
      },
      {
        region: "Karachi",
        dish: "Biryani",
        restaurant: "Student Biryani"
      }
    ]
  });
}
