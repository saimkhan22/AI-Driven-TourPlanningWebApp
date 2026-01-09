import { NextRequest, NextResponse } from 'next/server';
import { getCurrentWeather } from '@/lib/weatherService';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const city = searchParams.get('city');

    if (!city) {
      return NextResponse.json(
        { error: 'City parameter is required' },
        { status: 400 }
      );
    }

    const weather = await getCurrentWeather(city);

    return NextResponse.json({ weather });
  } catch (error: any) {
    console.error('Error in weather API:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch weather data' },
      { status: 500 }
    );
  }
}

