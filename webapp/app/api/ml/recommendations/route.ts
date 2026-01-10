import { NextRequest, NextResponse } from 'next/server';
import {
  getPersonalizedRecommendations,
  predictTripPrice,
  analyzeTravelPatterns,
  optimizeItinerary,
  analyzeDestinationSentiment,
} from '@/lib/mlService';

// POST - Get ML-powered recommendations
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, data } = body;

    switch (action) {
      case 'personalized_recommendations': {
        const { budget, travelStyle, interests, previousDestinations } = data;
        const recommendations = getPersonalizedRecommendations({
          budget,
          travelStyle,
          interests,
          previousDestinations,
        });

        return NextResponse.json({
          success: true,
          recommendations,
          algorithm: 'K-Nearest Neighbors (KNN)',
        });
      }

      case 'price_prediction': {
        const { destination, duration, travelers, budget, season } = data;
        const prediction = predictTripPrice({
          destination,
          duration,
          travelers,
          budget,
          season,
        });

        return NextResponse.json({
          success: true,
          prediction,
          algorithm: 'Linear Regression',
        });
      }

      case 'travel_patterns': {
        const { userHistory } = data;
        const patterns = analyzeTravelPatterns(userHistory);

        return NextResponse.json({
          success: true,
          patterns,
          algorithm: 'Decision Tree Analysis',
        });
      }

      case 'optimize_itinerary': {
        const { destination, duration, interests } = data;
        const itinerary = optimizeItinerary(destination, duration, interests);

        return NextResponse.json({
          success: true,
          itinerary,
          algorithm: 'Neural Network Simulation',
        });
      }

      case 'sentiment_analysis': {
        const { reviews } = data;
        const sentiment = analyzeDestinationSentiment(reviews);

        return NextResponse.json({
          success: true,
          sentiment,
          algorithm: 'Natural Language Processing',
        });
      }

      default:
        return NextResponse.json(
          { success: false, error: 'Invalid action' },
          { status: 400 }
        );
    }
  } catch (error: any) {
    console.error('ML API Error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET - Get all available ML features
export async function GET() {
  return NextResponse.json({
    success: true,
    features: [
      {
        name: 'Personalized Recommendations',
        action: 'personalized_recommendations',
        algorithm: 'K-Nearest Neighbors (KNN)',
        description: 'Get destination recommendations based on your preferences',
      },
      {
        name: 'Price Prediction',
        action: 'price_prediction',
        algorithm: 'Linear Regression',
        description: 'Predict trip costs with detailed breakdown',
      },
      {
        name: 'Travel Pattern Analysis',
        action: 'travel_patterns',
        algorithm: 'Decision Tree',
        description: 'Analyze your travel history and get insights',
      },
      {
        name: 'Itinerary Optimization',
        action: 'optimize_itinerary',
        algorithm: 'Neural Network',
        description: 'Get AI-optimized daily itinerary',
      },
      {
        name: 'Sentiment Analysis',
        action: 'sentiment_analysis',
        algorithm: 'NLP',
        description: 'Analyze destination reviews and ratings',
      },
    ],
  });
}

