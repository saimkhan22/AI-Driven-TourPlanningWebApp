import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Helper function to get current season
function getCurrentSeason(): string {
  const month = new Date().getMonth() + 1;
  if (month >= 3 && month <= 5) return 'Spring';
  if (month >= 6 && month <= 8) return 'Summer';
  if (month >= 9 && month <= 11) return 'Autumn';
  return 'Winter';
}

export interface TripPlanRequest {
  destination: string;
  duration: number;
  budget: number;
  travelers: number;
  interests: string[];
  startDate?: string;
}

export interface TripPlan {
  destination: string;
  overview: string;
  itinerary: DayPlan[];
  estimatedCost: {
    accommodation: number;
    transportation: number;
    food: number;
    activities: number;
    total: number;
  };
  recommendations: {
    hotels: string[];
    restaurants: string[];
    activities: string[];
    tips: string[];
  };
}

export interface DayPlan {
  day: number;
  title: string;
  activities: Activity[];
  meals: string[];
  accommodation: string;
}

export interface Activity {
  time: string;
  name: string;
  description: string;
  duration: string;
  estimatedCost: number;
}

// Fallback trip plan generator when OpenAI is not available
function generateFallbackTripPlan(request: TripPlanRequest): TripPlan {
  const { destination, duration, budget, travelers } = request;

  // Create a basic but comprehensive trip plan
  const itinerary: DayPlan[] = [];
  const dailyBudget = Math.floor(budget / duration);

  for (let day = 1; day <= duration; day++) {
    itinerary.push({
      day,
      title: `Day ${day} - Exploring ${destination}`,
      activities: [
        {
          time: '09:00 AM',
          name: 'Morning Sightseeing',
          description: `Visit popular attractions in ${destination}`,
          duration: '3 hours',
          estimatedCost: Math.floor(dailyBudget * 0.3),
        },
        {
          time: '02:00 PM',
          name: 'Afternoon Activities',
          description: `Explore local markets and cultural sites`,
          duration: '3 hours',
          estimatedCost: Math.floor(dailyBudget * 0.2),
        },
        {
          time: '06:00 PM',
          name: 'Evening Leisure',
          description: `Enjoy local cuisine and evening views`,
          duration: '2 hours',
          estimatedCost: Math.floor(dailyBudget * 0.15),
        },
      ],
      meals: [
        `Local breakfast spot in ${destination}`,
        `Traditional lunch restaurant`,
        `Dinner at popular local eatery`,
      ],
      accommodation: `Comfortable hotel in ${destination} city center`,
    });
  }

  const accommodationCost = Math.floor(budget * 0.35);
  const transportationCost = Math.floor(budget * 0.20);
  const foodCost = Math.floor(budget * 0.25);
  const activitiesCost = Math.floor(budget * 0.20);

  return {
    destination,
    overview: `A ${duration}-day adventure in ${destination}, Pakistan. This itinerary is designed for ${travelers} traveler(s) with a budget of PKR ${budget}. Experience the best of ${destination} including cultural sites, local cuisine, and scenic attractions.`,
    itinerary,
    estimatedCost: {
      accommodation: accommodationCost,
      transportation: transportationCost,
      food: foodCost,
      activities: activitiesCost,
      total: budget,
    },
    recommendations: {
      hotels: [
        `${destination} Grand Hotel`,
        `${destination} Comfort Inn`,
        `${destination} Budget Lodge`,
      ],
      restaurants: [
        `Traditional ${destination} Restaurant`,
        `Local Food Street`,
        `Popular Dining Spot`,
      ],
      activities: [
        `Visit historical landmarks`,
        `Explore local markets`,
        `Photography tour`,
        `Cultural experiences`,
      ],
      tips: [
        `Best time to visit is early morning to avoid crowds`,
        `Carry local currency (PKR) for small purchases`,
        `Respect local customs and dress modestly`,
        `Stay hydrated and use sunscreen`,
        `Book accommodations in advance during peak season`,
      ],
    },
  };
}

export async function generateTripPlan(
  request: TripPlanRequest
): Promise<TripPlan> {
  try {
    // Check if OpenAI API key is configured
    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY.includes('your_openai')) {
      console.log('OpenAI API key not configured, using fallback trip planner');
      return generateFallbackTripPlan(request);
    }

    // Get current month for seasonal recommendations
    const currentMonth = new Date().toLocaleString('default', { month: 'long' });
    const currentSeason = getCurrentSeason();

    const prompt = `You are an expert AI travel planner for Pakistan with deep knowledge of local culture, weather patterns, and optimal routes. Create a detailed ${request.duration}-day trip plan for ${request.destination}, Pakistan.

Trip Details:
- Destination: ${request.destination}
- Duration: ${request.duration} days
- Budget: PKR ${request.budget}
- Number of travelers: ${request.travelers}
- Interests: ${request.interests.join(', ')}
${request.startDate ? `- Start Date: ${request.startDate}` : `- Current Season: ${currentSeason} (${currentMonth})`}

IMPORTANT CONSIDERATIONS:
1. Weather: Consider ${currentSeason} weather conditions for ${request.destination}
2. Routes: Suggest the most scenic and efficient routes
3. Budget: Optimize costs while maintaining quality experiences
4. Safety: Include safety tips and emergency contacts
5. Local Culture: Respect local customs and traditions
6. Best Times: Recommend optimal times for each activity to avoid crowds

Please provide a comprehensive trip plan in JSON format with the following structure:
{
  "destination": "destination name",
  "overview": "brief overview of the trip",
  "itinerary": [
    {
      "day": 1,
      "title": "day title",
      "activities": [
        {
          "time": "09:00 AM",
          "name": "activity name",
          "description": "activity description",
          "duration": "2 hours",
          "estimatedCost": 1000
        }
      ],
      "meals": ["breakfast location", "lunch location", "dinner location"],
      "accommodation": "hotel name and area"
    }
  ],
  "estimatedCost": {
    "accommodation": 15000,
    "transportation": 8000,
    "food": 12000,
    "activities": 10000,
    "total": 45000
  },
  "recommendations": {
    "hotels": ["hotel 1", "hotel 2", "hotel 3"],
    "restaurants": ["restaurant 1", "restaurant 2"],
    "activities": ["activity 1", "activity 2"],
    "tips": ["tip 1", "tip 2", "tip 3"]
  }
}

Focus on:
- Authentic Pakistani experiences and local cuisine
- Cultural sites and hidden gems
- Optimal routes and transportation
- Weather-appropriate activities
- Budget optimization
- Safety and emergency information
- Best times to visit each location
- Local customs and etiquette

Include specific locations, timings, and realistic costs in PKR.`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content:
            'You are an expert AI travel planner specializing in Pakistan tourism with 20+ years of experience. You provide detailed, culturally aware, budget-conscious, and weather-optimized travel itineraries. You consider safety, local customs, best routes, and seasonal factors in your recommendations.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 2500,
    });

    const responseText = completion.choices[0].message.content || '';

    // Extract JSON from the response
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Failed to parse AI response');
    }

    const tripPlan: TripPlan = JSON.parse(jsonMatch[0]);
    return tripPlan;
  } catch (error: any) {
    console.error('Error generating trip plan:', error);

    // If OpenAI fails, use fallback
    if (error.status === 401 || error.code === 'invalid_api_key' || error.message?.includes('API key')) {
      console.log('OpenAI API error, using fallback trip planner');
      return generateFallbackTripPlan(request);
    }

    // For other errors, also use fallback
    console.log('Using fallback trip planner due to error');
    return generateFallbackTripPlan(request);
  }
}

export async function getChatResponse(message: string): Promise<string> {
  try {
    // Check if API key is configured
    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'your_openai_api_key_here') {
      return getFallbackResponse(message);
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content:
            'You are a helpful travel assistant for Pakistan. Provide concise, accurate information about Pakistani destinations, hotels, transportation, weather, and travel tips. Be friendly and culturally aware. Keep responses under 200 words.',
        },
        {
          role: 'user',
          content: message,
        },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    return completion.choices[0].message.content || 'Sorry, I could not generate a response.';
  } catch (error: any) {
    console.error('Error getting chat response:', error);
    // Return fallback response instead of error
    return getFallbackResponse(message);
  }
}

// Fallback responses when OpenAI is not available
function getFallbackResponse(message: string): string {
  const lowerMessage = message.toLowerCase();

  // Destination queries
  if (lowerMessage.includes('hunza') || lowerMessage.includes('gilgit')) {
    return "Hunza Valley is one of Pakistan's most beautiful destinations! Best time to visit is April-October. Must-see: Attabad Lake, Baltit Fort, Passu Cones. Average trip cost: PKR 40,000-60,000 for 5 days. I recommend booking a 4x4 vehicle for the mountainous terrain.";
  }

  if (lowerMessage.includes('skardu')) {
    return "Skardu is a paradise for adventure lovers! Visit Shangrila Resort, Deosai Plains, and Satpara Lake. Best months: May-September. Budget: PKR 50,000-70,000 for a week. Don't miss the stunning Shigar Fort!";
  }

  if (lowerMessage.includes('swat') || lowerMessage.includes('kalam')) {
    return "Swat Valley, the 'Switzerland of Pakistan'! Visit Kalam, Malam Jabba, and Mingora. Best time: March-October. Budget-friendly destination with costs around PKR 30,000-45,000 for 4-5 days.";
  }

  if (lowerMessage.includes('murree') || lowerMessage.includes('nathia')) {
    return "Murree is perfect for a quick getaway! Visit Mall Road, Patriata Chair Lift, and Nathia Gali. Accessible year-round, but magical in winter with snow. Budget: PKR 20,000-35,000 for 2-3 days.";
  }

  if (lowerMessage.includes('naran') || lowerMessage.includes('kaghan')) {
    return "Naran-Kaghan Valley is breathtaking! Visit Lake Saif-ul-Malook, Lalazar, and Babusar Top. Best time: June-September. Budget: PKR 35,000-50,000 for 4-5 days. Book hotels in advance during peak season!";
  }

  if (lowerMessage.includes('lahore')) {
    return "Lahore, the cultural heart of Pakistan! Must-visit: Badshahi Mosque, Lahore Fort, Food Street. Rich history and amazing food scene. Budget: PKR 15,000-25,000 for 3 days. Don't miss the traditional Lahori breakfast!";
  }

  if (lowerMessage.includes('karachi')) {
    return "Karachi, the city of lights! Visit Clifton Beach, Mohatta Palace, and Port Grand. Great food scene and vibrant nightlife. Budget: PKR 20,000-30,000 for 3 days. Try the famous Karachi biryani!";
  }

  if (lowerMessage.includes('islamabad')) {
    return "Islamabad, the beautiful capital! Visit Faisal Mosque, Daman-e-Koh, and Lok Virsa Museum. Clean, green, and well-planned city. Budget: PKR 18,000-28,000 for 3 days. Perfect for family trips!";
  }

  // Weather queries
  if (lowerMessage.includes('weather') || lowerMessage.includes('temperature')) {
    return "Pakistan has diverse weather! Northern areas (Hunza, Skardu): Cold, best in summer. Plains (Lahore, Islamabad): Hot summers, mild winters. Coastal (Karachi): Humid, warm year-round. Check specific destination weather before planning!";
  }

  // Budget queries
  if (lowerMessage.includes('budget') || lowerMessage.includes('cost') || lowerMessage.includes('price')) {
    return "Average Pakistan trip costs: Budget: PKR 25,000-40,000/week, Mid-range: PKR 50,000-80,000/week, Luxury: PKR 100,000+/week. Includes accommodation, food, transport, and activities. Northern areas are slightly more expensive due to travel distance.";
  }

  // Hotel queries
  if (lowerMessage.includes('hotel') || lowerMessage.includes('accommodation')) {
    return "Pakistan offers diverse accommodations! Budget hotels: PKR 2,000-4,000/night, Mid-range: PKR 5,000-10,000/night, Luxury: PKR 15,000+/night. Book in advance for northern areas during peak season (June-September).";
  }

  // Transport queries
  if (lowerMessage.includes('transport') || lowerMessage.includes('vehicle') || lowerMessage.includes('car')) {
    return "Transport options in Pakistan: Rental cars (PKR 3,000-8,000/day), Buses (economical for long distances), Domestic flights (for far destinations). For northern areas, I recommend 4x4 vehicles. Book vehicles through our platform for best rates!";
  }

  // Food queries
  if (lowerMessage.includes('food') || lowerMessage.includes('eat')) {
    return "Pakistani cuisine is amazing! Must-try: Biryani, Nihari, Karahi, Sajji, and street food. Average meal costs: Street food PKR 200-500, Restaurants PKR 800-2,000, Fine dining PKR 3,000+. Each region has unique specialties!";
  }

  // Safety queries
  if (lowerMessage.includes('safe') || lowerMessage.includes('security')) {
    return "Pakistan is generally safe for tourists! Tourist areas are well-secured. Tips: Travel in groups, use registered tour operators, respect local customs, keep emergency contacts handy. Northern areas and major cities are very tourist-friendly.";
  }

  // Best time queries
  if (lowerMessage.includes('best time') || lowerMessage.includes('when to visit')) {
    return "Best time to visit Pakistan: Northern areas (April-October), Plains (October-March), Coastal areas (November-February). Avoid monsoon season (July-August) in plains. Peak tourist season is May-September for mountains.";
  }

  // Default response
  return "I'm your AI travel assistant for Pakistan! I can help you with:\n\n✈️ Destination recommendations\n🏨 Hotel suggestions\n🚗 Transport options\n💰 Budget planning\n🌤️ Weather information\n🍽️ Food recommendations\n\nWhat would you like to know about traveling in Pakistan?";
}

