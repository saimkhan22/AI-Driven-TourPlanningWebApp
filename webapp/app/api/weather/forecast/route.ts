import { NextRequest, NextResponse } from 'next/server';
import { getWeatherForecast } from '@/lib/weatherService';

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

    const forecast = await getWeatherForecast(city);

    return NextResponse.json({ forecast });
  } catch (error: any) {
    console.error('Error in weather forecast API:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch weather forecast' },
      { status: 500 }
    );
  }
}

