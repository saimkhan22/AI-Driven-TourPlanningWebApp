import { NextRequest, NextResponse } from 'next/server';
import { searchHotels } from '@/lib/googlePlaces';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const location = searchParams.get('location');
    const radius = searchParams.get('radius');

    if (!location) {
      return NextResponse.json(
        { error: 'Location parameter is required' },
        { status: 400 }
      );
    }

    const hotels = await searchHotels(
      location,
      radius ? parseInt(radius) : 50000
    );

    return NextResponse.json({ hotels, count: hotels.length });
  } catch (error: any) {
    console.error('Error in hotels search API:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch hotels' },
      { status: 500 }
    );
  }
}

