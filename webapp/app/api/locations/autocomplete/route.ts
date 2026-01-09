import { NextRequest, NextResponse } from 'next/server';
import { autocompleteLocation } from '@/lib/googlePlaces';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const input = searchParams.get('input');

    if (!input) {
      return NextResponse.json(
        { error: 'Input parameter is required' },
        { status: 400 }
      );
    }

    const predictions = await autocompleteLocation(input);

    return NextResponse.json({ predictions });
  } catch (error: any) {
    console.error('Error in autocomplete API:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch location suggestions' },
      { status: 500 }
    );
  }
}

