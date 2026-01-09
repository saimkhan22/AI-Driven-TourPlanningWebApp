import { NextRequest, NextResponse } from 'next/server';
import { getTrafficData } from '@/lib/googlePlaces';
import { routeCache, createCacheKey } from '@/lib/cache';
import { apiRateLimiter, getClientIdentifier } from '@/lib/rateLimit';

export async function GET(request: NextRequest) {
  try {
    // Rate limiting
    const identifier = getClientIdentifier(request);
    if (!apiRateLimiter.isAllowed(identifier)) {
      const resetTime = apiRateLimiter.getResetTime(identifier);
      const retryAfter = Math.ceil((resetTime - Date.now()) / 1000);

      return NextResponse.json(
        {
          error: 'Too many requests',
          message: 'Rate limit exceeded. Please try again later.',
          retryAfter
        },
        {
          status: 429,
          headers: {
            'Retry-After': retryAfter.toString(),
          }
        }
      );
    }

    const searchParams = request.nextUrl.searchParams;
    const origin = searchParams.get('origin');
    const destination = searchParams.get('destination');

    if (!origin || !destination) {
      return NextResponse.json(
        { error: 'Origin and destination parameters are required' },
        { status: 400 }
      );
    }

    // Create cache key
    const cacheKey = createCacheKey('traffic', {
      origin: origin.trim(),
      destination: destination.trim(),
    });

    // Check cache (traffic data cached for 5 minutes)
    const cachedData = routeCache.get(cacheKey);
    if (cachedData) {
      console.log('Returning cached traffic data');
      return NextResponse.json({
        traffic: cachedData,
        cached: true
      });
    }

    // Fetch fresh traffic data
    const trafficData = await getTrafficData(origin, destination);

    // Cache the result (5 minutes)
    routeCache.set(cacheKey, trafficData, 5 * 60 * 1000);

    return NextResponse.json({
      traffic: trafficData,
      cached: false
    });
  } catch (error: any) {
    console.error('Error in traffic API:', error);
    return NextResponse.json(
      {
        error: error.message || 'Failed to fetch traffic data',
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}

