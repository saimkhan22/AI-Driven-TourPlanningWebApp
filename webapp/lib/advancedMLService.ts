/**
 * Advanced ML Service for SMM Travel
 * Includes: Collaborative Filtering, Weather-based Recommendations, Crowd Prediction, Smart Budget Allocation
 */

import { destinationsData, userBehaviorData, weatherImpactData, crowdPredictionData } from './mlTrainingData';

// ==================== COLLABORATIVE FILTERING ====================
export function collaborativeFiltering(userId: string, userPreferences: any) {
  // Find similar users based on preferences
  const similarUsers = userBehaviorData.filter(user => {
    const interestOverlap = user.interests.filter(interest =>
      userPreferences.interests.includes(interest)
    ).length;
    return interestOverlap >= 2;
  });

  // Aggregate recommendations from similar users
  const recommendedDestinations = new Map<string, number>();
  
  similarUsers.forEach(user => {
    user.visitedDestinations.forEach(dest => {
      const rating = user.ratings[dest] || 0;
      const currentScore = recommendedDestinations.get(dest) || 0;
      recommendedDestinations.set(dest, currentScore + rating);
    });
  });

  // Sort by score and get top recommendations
  const sorted = Array.from(recommendedDestinations.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const recommendations = sorted.map(([destName, score]) => {
    const dest = destinationsData.find(d => d.name === destName);
    return {
      name: destName,
      score: score / similarUsers.length,
      reason: 'Recommended by similar travelers',
      destination: dest,
    };
  });

  return {
    algorithm: 'Collaborative Filtering',
    similarUsersCount: similarUsers.length,
    recommendations,
  };
}

// ==================== WEATHER-BASED RECOMMENDATIONS ====================
export function weatherBasedRecommendations(month: number, preferences: any) {
  const currentSeason = getSeason(month);
  
  const recommendations = destinationsData
    .filter(dest => dest.bestMonths.includes(month))
    .map(dest => {
      const temp = dest.avgTemperature[currentSeason];
      const weatherCategory = getWeatherCategory(temp);
      const weatherImpact = weatherImpactData.temperature[weatherCategory];
      
      // Calculate weather-adjusted score
      const baseScore = dest.popularity;
      const weatherScore = dest.weatherScore * weatherImpact.comfort;
      const finalScore = (baseScore + weatherScore) / 2;
      
      return {
        name: dest.name,
        score: finalScore,
        temperature: temp,
        weatherCategory,
        comfortLevel: weatherImpact.comfort,
        expectedCrowd: dest.crowdLevel * weatherImpact.crowdMultiplier,
        adjustedPrice: dest.avgCost * weatherImpact.priceMultiplier,
        destination: dest,
      };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 6);

  return {
    algorithm: 'Weather-Based ML Recommendation',
    month,
    season: currentSeason,
    recommendations,
  };
}

// ==================== CROWD PREDICTION ====================
export function predictCrowdLevels(destination: string, date: Date, holidayType: string = 'regular') {
  const dest = destinationsData.find(d => d.name === destination);
  if (!dest) return null;

  const month = date.getMonth() + 1;
  const dayOfWeek = date.getDay();
  
  // Base crowd level from destination data
  let crowdLevel = dest.crowdLevel;
  
  // Apply holiday multiplier
  const holidayData = crowdPredictionData.holidays[holidayType as keyof typeof crowdPredictionData.holidays];
  crowdLevel *= holidayData.multiplier;
  
  // Weekend adjustment
  if (dayOfWeek === 0 || dayOfWeek === 6) {
    crowdLevel *= 1.3;
  }
  
  // Peak season adjustment
  if (dest.bestMonths.includes(month)) {
    crowdLevel *= 1.2;
  }
  
  // Normalize to 1-10 scale
  crowdLevel = Math.min(10, crowdLevel);
  
  const crowdCategory = getCrowdCategory(crowdLevel);
  const predictedPrice = dest.avgCost * holidayData.priceIncrease;
  
  return {
    algorithm: 'Crowd Prediction ML',
    destination: dest.name,
    date: date.toISOString().split('T')[0],
    predictedCrowdLevel: Math.round(crowdLevel * 10) / 10,
    crowdCategory,
    basePrice: dest.avgCost,
    predictedPrice: Math.round(predictedPrice),
    priceIncrease: `${Math.round((holidayData.priceIncrease - 1) * 100)}%`,
    recommendations: getCrowdRecommendations(crowdCategory),
  };
}

// ==================== SMART BUDGET ALLOCATION ====================
export function smartBudgetAllocation(totalBudget: number, duration: number, travelers: number, preferences: any) {
  const perPersonBudget = totalBudget / travelers;
  const dailyBudget = perPersonBudget / duration;
  
  // ML-based allocation percentages based on historical data
  let allocation = {
    transport: 0.25,
    accommodation: 0.35,
    food: 0.20,
    activities: 0.15,
    emergency: 0.05,
  };
  
  // Adjust based on preferences
  if (preferences.travelStyle === 'adventure') {
    allocation.activities += 0.10;
    allocation.accommodation -= 0.05;
    allocation.food -= 0.05;
  } else if (preferences.travelStyle === 'luxury') {
    allocation.accommodation += 0.10;
    allocation.food += 0.05;
    allocation.activities -= 0.05;
    allocation.transport -= 0.10;
  } else if (preferences.travelStyle === 'budget') {
    allocation.accommodation -= 0.10;
    allocation.food -= 0.05;
    allocation.transport += 0.10;
    allocation.emergency += 0.05;
  }
  
  const breakdown = {
    transport: Math.round(totalBudget * allocation.transport),
    accommodation: Math.round(totalBudget * allocation.accommodation),
    food: Math.round(totalBudget * allocation.food),
    activities: Math.round(totalBudget * allocation.activities),
    emergency: Math.round(totalBudget * allocation.emergency),
  };
  
  const dailyBreakdown = {
    transport: Math.round(breakdown.transport / duration),
    accommodation: Math.round(breakdown.accommodation / duration),
    food: Math.round(breakdown.food / duration),
    activities: Math.round(breakdown.activities / duration),
  };

  return {
    algorithm: 'Smart Budget Allocation ML',
    totalBudget,
    duration,
    travelers,
    perPersonBudget,
    dailyBudget: Math.round(dailyBudget),
    breakdown,
    dailyBreakdown,
    allocationStrategy: preferences.travelStyle || 'balanced',
    savingsTips: generateSavingsTips(breakdown, preferences),
  };
}

// ==================== HELPER FUNCTIONS ====================
function getSeason(month: number): string {
  if (month >= 3 && month <= 5) return 'spring';
  if (month >= 6 && month <= 8) return 'summer';
  if (month >= 9 && month <= 11) return 'autumn';
  return 'winter';
}

function getWeatherCategory(temp: number): keyof typeof weatherImpactData.temperature {
  if (temp > 35) return 'veryHot';
  if (temp > 25) return 'hot';
  if (temp > 15) return 'moderate';
  if (temp > 5) return 'cool';
  return 'cold';
}

function getCrowdCategory(level: number): string {
  if (level >= 8) return 'Very Crowded';
  if (level >= 6) return 'Moderately Crowded';
  if (level >= 4) return 'Some Crowds';
  return 'Peaceful';
}

function getCrowdRecommendations(category: string): string[] {
  const recommendations: { [key: string]: string[] } = {
    'Very Crowded': [
      'Book accommodations well in advance',
      'Visit popular spots early morning or late evening',
      'Consider weekday visits instead of weekends',
      'Expect higher prices and longer wait times',
    ],
    'Moderately Crowded': [
      'Book accommodations 1-2 weeks in advance',
      'Popular spots may have moderate wait times',
      'Prices slightly elevated',
    ],
    'Some Crowds': [
      'Good time to visit with manageable crowds',
      'Standard booking timeline works',
      'Normal pricing expected',
    ],
    'Peaceful': [
      'Excellent time for a quiet visit',
      'Last-minute bookings possible',
      'Best prices available',
      'Perfect for photography and relaxation',
    ],
  };

  return recommendations[category] || [];
}

function generateSavingsTips(breakdown: any, preferences: any): string[] {
  const tips: string[] = [];

  if (breakdown.accommodation > breakdown.transport) {
    tips.push('Consider guesthouses or hostels to reduce accommodation costs');
  }

  if (breakdown.food > 5000) {
    tips.push('Try local eateries instead of hotel restaurants for authentic and cheaper meals');
  }

  if (preferences.travelStyle !== 'luxury') {
    tips.push('Book transport and accommodations in advance for better deals');
    tips.push('Travel during off-peak season for 20-30% savings');
  }

  tips.push('Use group discounts when traveling with 4+ people');
  tips.push('Pack snacks and water to reduce food expenses during travel');

  return tips;
}

// ==================== DESTINATION SIMILARITY (Content-Based Filtering) ====================
export function findSimilarDestinations(destinationName: string, count: number = 5) {
  const targetDest = destinationsData.find(d => d.name === destinationName);
  if (!targetDest) return null;

  const similarities = destinationsData
    .filter(d => d.name !== destinationName)
    .map(dest => {
      // Calculate similarity score based on multiple features
      let score = 0;

      // Category match (30%)
      if (dest.category === targetDest.category) score += 30;

      // Activity overlap (25%)
      const activityOverlap = dest.activities.filter(a =>
        targetDest.activities.includes(a)
      ).length;
      score += (activityOverlap / targetDest.activities.length) * 25;

      // Price similarity (15%)
      const priceDiff = Math.abs(dest.avgCost - targetDest.avgCost);
      const priceScore = Math.max(0, 15 - (priceDiff / 5000));
      score += priceScore;

      // Season overlap (15%)
      const seasonOverlap = dest.season.filter(s =>
        targetDest.season.includes(s)
      ).length;
      score += (seasonOverlap / targetDest.season.length) * 15;

      // Adventure level similarity (10%)
      const adventureDiff = Math.abs(dest.adventureLevel - targetDest.adventureLevel);
      score += Math.max(0, 10 - adventureDiff);

      // Family friendly match (5%)
      if (dest.familyFriendly === targetDest.familyFriendly) score += 5;

      return {
        destination: dest,
        similarityScore: Math.round(score),
        matchReasons: getMatchReasons(dest, targetDest),
      };
    })
    .sort((a, b) => b.similarityScore - a.similarityScore)
    .slice(0, count);

  return {
    algorithm: 'Content-Based Similarity',
    targetDestination: targetDest.name,
    similarDestinations: similarities,
  };
}

function getMatchReasons(dest: any, target: any): string[] {
  const reasons: string[] = [];

  if (dest.category === target.category) {
    reasons.push(`Same category: ${dest.category}`);
  }

  const commonActivities = dest.activities.filter((a: string) =>
    target.activities.includes(a)
  );
  if (commonActivities.length > 0) {
    reasons.push(`Shared activities: ${commonActivities.slice(0, 3).join(', ')}`);
  }

  const priceDiff = Math.abs(dest.avgCost - target.avgCost);
  if (priceDiff < 5000) {
    reasons.push('Similar price range');
  }

  return reasons;
}

export { destinationsData };


