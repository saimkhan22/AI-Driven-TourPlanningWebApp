import { NextRequest, NextResponse } from 'next/server';
import { generateTripPlan } from '@/lib/openaiService';
import { tripPlanCache, createCacheKey } from '@/lib/cache';
import { aiRateLimiter, getClientIdentifier } from '@/lib/rateLimit';

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const identifier = getClientIdentifier(request);
    if (!aiRateLimiter.isAllowed(identifier)) {
      const resetTime = aiRateLimiter.getResetTime(identifier);
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
    const { destination, duration, budget, travelers, interests, startDate } = body;

    // Validation
    if (!destination || !duration || !budget || !travelers) {
      return NextResponse.json(
        { error: 'Missing required fields: destination, duration, budget, travelers' },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const sanitizedDestination = destination.trim();
    const sanitizedDuration = Math.max(1, Math.min(30, parseInt(duration))); // 1-30 days
    const sanitizedBudget = Math.max(1000, parseInt(budget)); // Minimum 1000 PKR
    const sanitizedTravelers = Math.max(1, Math.min(20, parseInt(travelers))); // 1-20 travelers

    // Create cache key
    const cacheKey = createCacheKey('trip-plan', {
      destination: sanitizedDestination,
      duration: sanitizedDuration,
      budget: sanitizedBudget,
      travelers: sanitizedTravelers,
      interests: (interests || []).sort().join(','),
    });

    // Check cache
    const cachedPlan = tripPlanCache.get(cacheKey);
    if (cachedPlan) {
      console.log('Returning cached trip plan');
      return NextResponse.json({
        tripPlan: cachedPlan,
        cached: true
      });
    }

    // Generate new trip plan
    const tripPlan = await generateTripPlan({
      destination: sanitizedDestination,
      duration: sanitizedDuration,
      budget: sanitizedBudget,
      travelers: sanitizedTravelers,
      interests: interests || [],
      startDate,
    });

    // Cache the result (30 minutes)
    tripPlanCache.set(cacheKey, tripPlan, 30 * 60 * 1000);

    return NextResponse.json({
      tripPlan,
      cached: false
    });
  } catch (error: any) {
    console.error('Error in trip plan API:', error);
    return NextResponse.json(
      {
        error: error.message || 'Failed to generate trip plan',
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}

