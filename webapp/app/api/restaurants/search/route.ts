import { NextRequest, NextResponse } from 'next/server';
import { searchRestaurants, getFamousFoods, getAllFamousFoods } from '@/lib/restaurantService';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const city = searchParams.get('city') || 'Islamabad';
    const radius = parseInt(searchParams.get('radius') || '5000');
    const type = searchParams.get('type') || 'restaurant';
    const getFamous = searchParams.get('famous') === 'true';

    if (getFamous) {
      // Return famous foods
      const famousFoods = city === 'all' ? getAllFamousFoods() : getFamousFoods(city);
      
      return NextResponse.json({
        success: true,
        famousFoods,
        count: famousFoods.length,
      });
    }

    // Search restaurants
    const restaurants = await searchRestaurants(city, radius, type);

    return NextResponse.json({
      success: true,
      restaurants,
      count: restaurants.length,
      city,
    });
  } catch (error: any) {
    console.error('Error in restaurants API:', error);
    return NextResponse.json({
      success: false,
      error: error.message,
      restaurants: [],
    }, { status: 500 });
  }
}

