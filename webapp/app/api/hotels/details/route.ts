import { NextRequest, NextResponse } from 'next/server';
import { getHotelDetails } from '@/lib/googlePlaces';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const placeId = searchParams.get('placeId');

    if (!placeId) {
      return NextResponse.json(
        { error: 'placeId parameter is required' },
        { status: 400 }
      );
    }

    const details = await getHotelDetails(placeId);

    return NextResponse.json({ details });
  } catch (error: any) {
    console.error('Error in hotel details API:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch hotel details' },
      { status: 500 }
    );
  }
}

