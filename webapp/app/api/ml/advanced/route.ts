import { NextRequest, NextResponse } from 'next/server';
import {
  collaborativeFiltering,
  weatherBasedRecommendations,
  predictCrowdLevels,
  smartBudgetAllocation,
  findSimilarDestinations,
} from '@/lib/advancedMLService';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, data } = body;

    switch (action) {
      case 'collaborative_filtering':
        return NextResponse.json(
          collaborativeFiltering(data.userId, data.preferences)
        );

      case 'weather_recommendations':
        return NextResponse.json(
          weatherBasedRecommendations(data.month, data.preferences)
        );

      case 'crowd_prediction':
        const crowdResult = predictCrowdLevels(
          data.destination,
          new Date(data.date),
          data.holidayType
        );
        return NextResponse.json(crowdResult);

      case 'budget_allocation':
        return NextResponse.json(
          smartBudgetAllocation(
            data.totalBudget,
            data.duration,
            data.travelers,
            data.preferences
          )
        );

      case 'similar_destinations':
        return NextResponse.json(
          findSimilarDestinations(data.destination, 5)
        );

      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Advanced ML API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

