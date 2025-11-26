import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { places, days } = await req.json();

  return NextResponse.json({
    diary: `Your ${days}-day trip covered: ${places.join(", ")}.`
  });
}
