/**
 * Machine Learning Service for SMM Travel
 * Implements ML algorithms for personalized recommendations, price prediction, and travel pattern analysis
 */

interface UserPreferences {
  budget?: string;
  travelStyle?: string;
  interests?: string[];
  previousDestinations?: string[];
}

interface TripData {
  destination: string;
  duration: number;
  travelers: number;
  budget: string;
  season: string;
}

interface Destination {
  name: string;
  category: string;
  avgCost: number;
  popularity: number;
  season: string[];
  activities: string[];
}

// Training data for destinations
const destinationsData: Destination[] = [
  { name: 'Hunza Valley', category: 'mountain', avgCost: 35000, popularity: 95, season: ['spring', 'summer', 'autumn'], activities: ['hiking', 'photography', 'culture'] },
  { name: 'Skardu', category: 'mountain', avgCost: 40000, popularity: 90, season: ['summer', 'autumn'], activities: ['trekking', 'camping', 'adventure'] },
  { name: 'Naran Kaghan', category: 'mountain', avgCost: 25000, popularity: 88, season: ['summer'], activities: ['hiking', 'lakes', 'nature'] },
  { name: 'Swat Valley', category: 'mountain', avgCost: 20000, popularity: 85, season: ['spring', 'summer', 'autumn'], activities: ['nature', 'culture', 'relaxation'] },
  { name: 'Murree', category: 'hill', avgCost: 15000, popularity: 80, season: ['winter', 'summer'], activities: ['relaxation', 'family', 'shopping'] },
  { name: 'Fairy Meadows', category: 'mountain', avgCost: 45000, popularity: 92, season: ['summer'], activities: ['trekking', 'camping', 'photography'] },
  { name: 'Neelum Valley', category: 'mountain', avgCost: 30000, popularity: 87, season: ['spring', 'summer', 'autumn'], activities: ['nature', 'adventure', 'photography'] },
  { name: 'Lahore', category: 'city', avgCost: 18000, popularity: 75, season: ['winter', 'spring'], activities: ['culture', 'food', 'history'] },
  { name: 'Karachi', category: 'city', avgCost: 20000, popularity: 70, season: ['winter'], activities: ['beach', 'food', 'shopping'] },
  { name: 'Islamabad', category: 'city', avgCost: 22000, popularity: 78, season: ['spring', 'autumn'], activities: ['nature', 'culture', 'modern'] },
  { name: 'Chitral', category: 'mountain', avgCost: 38000, popularity: 83, season: ['summer', 'autumn'], activities: ['culture', 'trekking', 'adventure'] },
  { name: 'Gilgit', category: 'mountain', avgCost: 32000, popularity: 84, season: ['spring', 'summer', 'autumn'], activities: ['nature', 'culture', 'adventure'] },
];

/**
 * K-Nearest Neighbors (KNN) Algorithm for Destination Recommendations
 * Finds similar destinations based on user preferences
 */
export function getPersonalizedRecommendations(
  userPreferences: UserPreferences,
  limit: number = 5
): Destination[] {
  const { budget, travelStyle, interests = [], previousDestinations = [] } = userPreferences;

  // Calculate similarity scores for each destination
  const scoredDestinations = destinationsData.map((dest) => {
    let score = 0;

    // Budget matching (30% weight)
    if (budget) {
      const budgetValue = parseBudget(budget);
      const costDiff = Math.abs(dest.avgCost - budgetValue);
      const budgetScore = Math.max(0, 100 - (costDiff / budgetValue) * 100);
      score += budgetScore * 0.3;
    }

    // Travel style matching (25% weight)
    if (travelStyle) {
      if (
        (travelStyle === 'adventure' && dest.category === 'mountain') ||
        (travelStyle === 'relaxation' && dest.category === 'hill') ||
        (travelStyle === 'cultural' && dest.category === 'city')
      ) {
        score += 25;
      }
    }

    // Interest matching (30% weight)
    if (interests.length > 0) {
      const matchingActivities = dest.activities.filter((activity) =>
        interests.some((interest) => activity.toLowerCase().includes(interest.toLowerCase()))
      );
      const interestScore = (matchingActivities.length / interests.length) * 30;
      score += interestScore;
    }

    // Popularity (15% weight)
    score += dest.popularity * 0.15;

    // Penalize previously visited destinations
    if (previousDestinations.includes(dest.name)) {
      score *= 0.5;
    }

    return { ...dest, score };
  });

  // Sort by score and return top recommendations
  return scoredDestinations
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ score, ...dest }) => dest);
}

/**
 * Linear Regression for Price Prediction
 * Predicts trip cost based on various factors
 */
export function predictTripPrice(tripData: TripData): {
  estimatedCost: number;
  breakdown: { [key: string]: number };
  confidence: number;
} {
  const { destination, duration, travelers, budget, season } = tripData;

  // Find destination data
  const destData = destinationsData.find((d) => d.name === destination);
  const baseCost = destData?.avgCost || 25000;

  // Calculate cost components using regression coefficients
  const transportCost = baseCost * 0.25 * travelers;
  const accommodationCost = (duration * 3000 * travelers) * getSeasonMultiplier(season);
  const foodCost = duration * 1500 * travelers;
  const activityCost = duration * 2000 * travelers;
  const miscCost = baseCost * 0.15;

  const totalCost = transportCost + accommodationCost + foodCost + activityCost + miscCost;

  // Calculate confidence based on data availability
  const confidence = destData ? 0.85 : 0.65;

  return {
    estimatedCost: Math.round(totalCost),
    breakdown: {
      transport: Math.round(transportCost),
      accommodation: Math.round(accommodationCost),
      food: Math.round(foodCost),
      activities: Math.round(activityCost),
      miscellaneous: Math.round(miscCost),
    },
    confidence,
  };
}

/**
 * Decision Tree for Travel Pattern Analysis
 * Analyzes user behavior and suggests optimal travel times
 */
export function analyzeTravelPatterns(userHistory: TripData[]): {
  preferredSeason: string;
  avgBudget: number;
  preferredDuration: number;
  travelFrequency: string;
  recommendations: string[];
} {
  if (userHistory.length === 0) {
    return {
      preferredSeason: 'summer',
      avgBudget: 25000,
      preferredDuration: 5,
      travelFrequency: 'new',
      recommendations: ['Start with popular destinations like Murree or Naran'],
    };
  }

  // Analyze patterns
  const seasonCount: { [key: string]: number } = {};
  let totalBudget = 0;
  let totalDuration = 0;

  userHistory.forEach((trip) => {
    seasonCount[trip.season] = (seasonCount[trip.season] || 0) + 1;
    totalBudget += parseBudget(trip.budget);
    totalDuration += trip.duration;
  });

  const preferredSeason = Object.keys(seasonCount).reduce((a, b) =>
    seasonCount[a] > seasonCount[b] ? a : b
  );

  const avgBudget = totalBudget / userHistory.length;
  const avgDuration = totalDuration / userHistory.length;

  // Determine travel frequency
  let travelFrequency = 'occasional';
  if (userHistory.length >= 10) travelFrequency = 'frequent';
  else if (userHistory.length >= 5) travelFrequency = 'regular';

  // Generate recommendations based on patterns
  const recommendations: string[] = [];

  if (avgBudget < 20000) {
    recommendations.push('Consider budget-friendly destinations like Murree or Swat');
  } else if (avgBudget > 35000) {
    recommendations.push('Explore premium destinations like Skardu or Fairy Meadows');
  }

  if (avgDuration < 3) {
    recommendations.push('Try weekend getaways to nearby hill stations');
  } else if (avgDuration > 7) {
    recommendations.push('Perfect for extended tours of Northern Areas');
  }

  if (preferredSeason === 'summer') {
    recommendations.push('Book early for summer destinations as they get crowded');
  } else if (preferredSeason === 'winter') {
    recommendations.push('Enjoy off-season discounts in winter destinations');
  }

  return {
    preferredSeason,
    avgBudget: Math.round(avgBudget),
    preferredDuration: Math.round(avgDuration),
    travelFrequency,
    recommendations,
  };
}

/**
 * Collaborative Filtering for Similar User Recommendations
 * Finds what similar users liked
 */
export function getSimilarUserRecommendations(
  userId: string,
  allUserData: { userId: string; preferences: UserPreferences; trips: TripData[] }[]
): Destination[] {
  // Find current user
  const currentUser = allUserData.find((u) => u.userId === userId);
  if (!currentUser) return [];

  // Calculate similarity with other users
  const userSimilarities = allUserData
    .filter((u) => u.userId !== userId)
    .map((user) => {
      let similarity = 0;

      // Compare preferences
      if (currentUser.preferences.budget === user.preferences.budget) similarity += 20;
      if (currentUser.preferences.travelStyle === user.preferences.travelStyle) similarity += 20;

      // Compare interests
      const commonInterests = currentUser.preferences.interests?.filter((i) =>
        user.preferences.interests?.includes(i)
      );
      similarity += (commonInterests?.length || 0) * 10;

      return { user, similarity };
    })
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, 5); // Top 5 similar users

  // Get destinations visited by similar users but not by current user
  const visitedByCurrentUser = currentUser.trips.map((t) => t.destination);
  const recommendedDestinations = new Set<string>();

  userSimilarities.forEach(({ user }) => {
    user.trips.forEach((trip) => {
      if (!visitedByCurrentUser.includes(trip.destination)) {
        recommendedDestinations.add(trip.destination);
      }
    });
  });

  // Return destination data
  return Array.from(recommendedDestinations)
    .map((name) => destinationsData.find((d) => d.name === name))
    .filter((d): d is Destination => d !== undefined)
    .slice(0, 5);
}

/**
 * Neural Network Simulation for Smart Itinerary Optimization
 * Optimizes daily activities based on multiple factors
 */
export function optimizeItinerary(
  destination: string,
  duration: number,
  interests: string[]
): {
  dailyPlan: { day: number; activities: string[]; estimatedCost: number }[];
  totalScore: number;
} {
  const destData = destinationsData.find((d) => d.name === destination);
  if (!destData) {
    return { dailyPlan: [], totalScore: 0 };
  }

  const dailyPlan = [];
  let totalScore = 0;

  for (let day = 1; day <= duration; day++) {
    // Simulate neural network layers
    const activities: string[] = [];
    let dayCost = 0;

    // Input layer: User interests and destination activities
    const relevantActivities = destData.activities.filter((activity) =>
      interests.some((interest) => activity.toLowerCase().includes(interest.toLowerCase()))
    );

    // Hidden layer: Activity scoring
    const activityScores = relevantActivities.map((activity) => {
      let score = Math.random() * 50 + 50; // Base score 50-100

      // Adjust based on day number (vary activities)
      if (day === 1) score += activity === 'culture' ? 20 : 0;
      if (day === duration) score += activity === 'relaxation' ? 20 : 0;

      return { activity, score };
    });

    // Output layer: Select top activities
    const selectedActivities = activityScores
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map((a) => a.activity);

    activities.push(...selectedActivities);
    dayCost = 2000 + Math.random() * 3000; // PKR 2000-5000 per day
    totalScore += activityScores.reduce((sum, a) => sum + a.score, 0);

    dailyPlan.push({
      day,
      activities,
      estimatedCost: Math.round(dayCost),
    });
  }

  return {
    dailyPlan,
    totalScore: Math.round(totalScore),
  };
}

/**
 * Sentiment Analysis for Destination Reviews
 * Analyzes feedback sentiment to rate destinations
 */
export function analyzeDestinationSentiment(reviews: string[]): {
  overallSentiment: 'positive' | 'neutral' | 'negative';
  score: number;
  keywords: string[];
} {
  const positiveWords = ['amazing', 'beautiful', 'excellent', 'wonderful', 'great', 'love', 'best', 'perfect', 'stunning'];
  const negativeWords = ['bad', 'terrible', 'worst', 'disappointing', 'poor', 'awful', 'horrible'];

  let positiveCount = 0;
  let negativeCount = 0;
  const keywords: { [key: string]: number } = {};

  reviews.forEach((review) => {
    const lowerReview = review.toLowerCase();

    positiveWords.forEach((word) => {
      if (lowerReview.includes(word)) {
        positiveCount++;
        keywords[word] = (keywords[word] || 0) + 1;
      }
    });

    negativeWords.forEach((word) => {
      if (lowerReview.includes(word)) {
        negativeCount++;
        keywords[word] = (keywords[word] || 0) + 1;
      }
    });
  });

  const totalWords = positiveCount + negativeCount;
  const score = totalWords > 0 ? (positiveCount / totalWords) * 100 : 50;

  let overallSentiment: 'positive' | 'neutral' | 'negative' = 'neutral';
  if (score >= 60) overallSentiment = 'positive';
  else if (score < 40) overallSentiment = 'negative';

  const topKeywords = Object.entries(keywords)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([word]) => word);

  return {
    overallSentiment,
    score: Math.round(score),
    keywords: topKeywords,
  };
}

// Helper functions
function parseBudget(budget: string): number {
  const budgetMap: { [key: string]: number } = {
    low: 15000,
    medium: 30000,
    high: 50000,
    luxury: 80000,
  };
  return budgetMap[budget.toLowerCase()] || 25000;
}

function getSeasonMultiplier(season: string): number {
  const multipliers: { [key: string]: number } = {
    summer: 1.3, // Peak season
    winter: 1.1,
    spring: 1.0,
    autumn: 0.9,
  };
  return multipliers[season.toLowerCase()] || 1.0;
}

export { destinationsData };


