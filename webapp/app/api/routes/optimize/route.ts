import { NextRequest, NextResponse } from 'next/server';
import { findOptimalRoute, getAlternativeRoutes } from '@/lib/routeOptimization';
import { routeCache, createCacheKey } from '@/lib/cache';
import { apiRateLimiter, getClientIdentifier } from '@/lib/rateLimit';

export async function POST(request: NextRequest) {
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

    const body = await request.json();
    const { origin, destination, intermediateStops, includeAlternatives } = body;

    // Validation
    if (!origin || !destination) {
      return NextResponse.json(
        { error: 'Origin and destination are required' },
        { status: 400 }
      );
    }

    // Create cache key
    const cacheKey = createCacheKey('route-optimize', {
      origin: origin.trim(),
      destination: destination.trim(),
      stops: (intermediateStops || []).sort().join(','),
      alternatives: includeAlternatives || false,
    });

    // Check cache
    const cachedRoute = routeCache.get(cacheKey);
    if (cachedRoute) {
      console.log('Returning cached optimized route');
      return NextResponse.json({ 
        ...cachedRoute,
        cached: true 
      });
    }

    // Calculate optimal route
    const optimalRoute = findOptimalRoute(
      origin,
      destination,
      intermediateStops || []
    );

    let alternativeRoutes = [];
    if (includeAlternatives) {
      alternativeRoutes = getAlternativeRoutes(origin, destination);
    }

    const result = {
      optimalRoute,
      alternativeRoutes,
      cached: false,
    };

    // Cache the result (10 minutes)
    routeCache.set(cacheKey, result, 10 * 60 * 1000);

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Error in route optimization API:', error);
    return NextResponse.json(
      { 
        error: error.message || 'Failed to optimize route',
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const origin = searchParams.get('origin');
    const destination = searchParams.get('destination');

    if (!origin || !destination) {
      return NextResponse.json(
        { error: 'Origin and destination parameters are required' },
        { status: 400 }
      );
    }

    // Get alternative routes
    const routes = getAlternativeRoutes(origin, destination);

    return NextResponse.json({ 
      routes,
      count: routes.length 
    });
  } catch (error: any) {
    console.error('Error in route alternatives API:', error);
    return NextResponse.json(
      { 
        error: error.message || 'Failed to get alternative routes',
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}

