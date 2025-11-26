import { NextResponse } from "next/server";

export async function GET() {
  const scenicSpots = [
    {
      id: 1,
      name: "Attabad Lake Viewpoint",
      description: "Beautiful turquoise lake surrounded by mountains.",
      image: "https://images.pexels.com/photos/1134166/pexels-photo-1134166.jpeg"
    },
    {
      id: 2,
      name: "Hunza Eagle’s Nest",
      description: "Popular sunset point with full Hunza valley view.",
      image: "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg"
    }
  ];

  return NextResponse.json({ scenicSpots });
}
