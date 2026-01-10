/**
 * Comprehensive ML Training Data for SMM Travel
 * Expanded dataset for better predictions and recommendations
 */

export interface Destination {
  name: string;
  category: string;
  avgCost: number;
  popularity: number;
  season: string[];
  activities: string[];
  region: string;
  altitude: number;
  accessibility: number; // 1-10
  crowdLevel: number; // 1-10
  weatherScore: number; // 1-10
  safetyRating: number; // 1-10
  familyFriendly: boolean;
  adventureLevel: number; // 1-10
  culturalSignificance: number; // 1-10
  photographyScore: number; // 1-10
  bestMonths: number[]; // 1-12
  avgTemperature: { [key: string]: number }; // season -> temp
  accommodationTypes: string[];
  nearbyAttractions: string[];
  travelTime: { [key: string]: number }; // from major cities in hours
}

export const expandedDestinationsData: Destination[] = [
  {
    name: 'Hunza Valley',
    category: 'mountain',
    avgCost: 35000,
    popularity: 95,
    season: ['spring', 'summer', 'autumn'],
    activities: ['hiking', 'photography', 'culture', 'trekking', 'sightseeing'],
    region: 'Gilgit-Baltistan',
    altitude: 2438,
    accessibility: 7,
    crowdLevel: 8,
    weatherScore: 9,
    safetyRating: 9,
    familyFriendly: true,
    adventureLevel: 7,
    culturalSignificance: 9,
    photographyScore: 10,
    bestMonths: [4, 5, 6, 7, 8, 9, 10],
    avgTemperature: { spring: 15, summer: 25, autumn: 12, winter: -5 },
    accommodationTypes: ['hotels', 'guesthouses', 'camping'],
    nearbyAttractions: ['Attabad Lake', 'Rakaposhi', 'Baltit Fort', 'Altit Fort'],
    travelTime: { Islamabad: 18, Lahore: 22, Karachi: 36 },
  },
  {
    name: 'Skardu',
    category: 'mountain',
    avgCost: 40000,
    popularity: 90,
    season: ['summer', 'autumn'],
    activities: ['trekking', 'camping', 'adventure', 'photography', 'mountaineering'],
    region: 'Gilgit-Baltistan',
    altitude: 2228,
    accessibility: 6,
    crowdLevel: 7,
    weatherScore: 8,
    safetyRating: 8,
    familyFriendly: false,
    adventureLevel: 9,
    culturalSignificance: 7,
    photographyScore: 10,
    bestMonths: [5, 6, 7, 8, 9],
    avgTemperature: { spring: 10, summer: 20, autumn: 8, winter: -10 },
    accommodationTypes: ['hotels', 'camping', 'resorts'],
    nearbyAttractions: ['Shangrila Resort', 'Deosai Plains', 'Satpara Lake', 'K2 Base Camp'],
    travelTime: { Islamabad: 20, Lahore: 24, Karachi: 38 },
  },
  {
    name: 'Naran Kaghan',
    category: 'mountain',
    avgCost: 25000,
    popularity: 88,
    season: ['summer'],
    activities: ['hiking', 'lakes', 'nature', 'photography', 'fishing'],
    region: 'KPK',
    altitude: 2409,
    accessibility: 8,
    crowdLevel: 9,
    weatherScore: 8,
    safetyRating: 9,
    familyFriendly: true,
    adventureLevel: 6,
    culturalSignificance: 5,
    photographyScore: 9,
    bestMonths: [5, 6, 7, 8, 9],
    avgTemperature: { spring: 12, summer: 18, autumn: 10, winter: -8 },
    accommodationTypes: ['hotels', 'resorts', 'camping'],
    nearbyAttractions: ['Saif-ul-Malook', 'Lulusar Lake', 'Babusar Top', 'Lalazar'],
    travelTime: { Islamabad: 6, Lahore: 10, Karachi: 24 },
  },
  {
    name: 'Swat Valley',
    category: 'mountain',
    avgCost: 20000,
    popularity: 85,
    season: ['spring', 'summer', 'autumn'],
    activities: ['nature', 'culture', 'relaxation', 'skiing', 'archaeology'],
    region: 'KPK',
    altitude: 980,
    accessibility: 9,
    crowdLevel: 7,
    weatherScore: 9,
    safetyRating: 8,
    familyFriendly: true,
    adventureLevel: 5,
    culturalSignificance: 8,
    photographyScore: 8,
    bestMonths: [3, 4, 5, 6, 7, 8, 9, 10],
    avgTemperature: { spring: 18, summer: 28, autumn: 15, winter: 5 },
    accommodationTypes: ['hotels', 'resorts', 'guesthouses'],
    nearbyAttractions: ['Malam Jabba', 'Kalam', 'Mahodand Lake', 'Mingora'],
    travelTime: { Islamabad: 4, Lahore: 8, Karachi: 22 },
  },
  {
    name: 'Murree',
    category: 'hill',
    avgCost: 15000,
    popularity: 80,
    season: ['winter', 'summer'],
    activities: ['relaxation', 'family', 'shopping', 'sightseeing', 'snowfall'],
    region: 'Punjab',
    altitude: 2291,
    accessibility: 10,
    crowdLevel: 10,
    weatherScore: 7,
    safetyRating: 9,
    familyFriendly: true,
    adventureLevel: 3,
    culturalSignificance: 4,
    photographyScore: 6,
    bestMonths: [1, 2, 6, 7, 8, 12],
    avgTemperature: { spring: 15, summer: 20, autumn: 12, winter: 2 },
    accommodationTypes: ['hotels', 'resorts', 'apartments'],
    nearbyAttractions: ['Mall Road', 'Patriata', 'Ayubia', 'Nathia Gali'],
    travelTime: { Islamabad: 1.5, Lahore: 5, Karachi: 19 },
  },
  {
    name: 'Fairy Meadows',
    category: 'mountain',
    avgCost: 45000,
    popularity: 92,
    season: ['summer'],
    activities: ['trekking', 'camping', 'photography', 'mountaineering', 'nature'],
    region: 'Gilgit-Baltistan',
    altitude: 3300,
    accessibility: 4,
    crowdLevel: 5,
    weatherScore: 9,
    safetyRating: 7,
    familyFriendly: false,
    adventureLevel: 10,
    culturalSignificance: 6,
    photographyScore: 10,
    bestMonths: [6, 7, 8, 9],
    avgTemperature: { spring: 8, summer: 15, autumn: 5, winter: -15 },
    accommodationTypes: ['camping', 'cottages'],
    nearbyAttractions: ['Nanga Parbat', 'Raikot Bridge', 'Beyal Camp'],
    travelTime: { Islamabad: 22, Lahore: 26, Karachi: 40 },
  },
  {
    name: 'Neelum Valley',
    category: 'mountain',
    avgCost: 30000,
    popularity: 87,
    season: ['spring', 'summer', 'autumn'],
    activities: ['nature', 'adventure', 'photography', 'rafting', 'fishing'],
    region: 'AJK',
    altitude: 1524,
    accessibility: 7,
    crowdLevel: 6,
    weatherScore: 8,
    safetyRating: 8,
    familyFriendly: true,
    adventureLevel: 7,
    culturalSignificance: 7,
    photographyScore: 9,
    bestMonths: [4, 5, 6, 7, 8, 9, 10],
    avgTemperature: { spring: 16, summer: 24, autumn: 14, winter: 3 },
    accommodationTypes: ['hotels', 'guesthouses', 'camping'],
    nearbyAttractions: ['Keran', 'Sharda', 'Kel', 'Arang Kel', 'Taobat'],
    travelTime: { Islamabad: 8, Lahore: 12, Karachi: 26 },
  },
  {
    name: 'Lahore',
    category: 'city',
    avgCost: 18000,
    popularity: 75,
    season: ['winter', 'spring'],
    activities: ['culture', 'food', 'history', 'shopping', 'architecture'],
    region: 'Punjab',
    altitude: 217,
    accessibility: 10,
    crowdLevel: 10,
    weatherScore: 6,
    safetyRating: 8,
    familyFriendly: true,
    adventureLevel: 2,
    culturalSignificance: 10,
    photographyScore: 8,
    bestMonths: [1, 2, 3, 10, 11, 12],
    avgTemperature: { spring: 25, summer: 38, autumn: 28, winter: 15 },
    accommodationTypes: ['hotels', 'resorts', 'apartments', 'hostels'],
    nearbyAttractions: ['Badshahi Mosque', 'Lahore Fort', 'Minar-e-Pakistan', 'Food Street'],
    travelTime: { Islamabad: 4, Lahore: 0, Karachi: 14 },
  },
  {
    name: 'Karachi',
    category: 'city',
    avgCost: 20000,
    popularity: 70,
    season: ['winter'],
    activities: ['beach', 'food', 'shopping', 'nightlife', 'culture'],
    region: 'Sindh',
    altitude: 10,
    accessibility: 10,
    crowdLevel: 10,
    weatherScore: 5,
    safetyRating: 7,
    familyFriendly: true,
    adventureLevel: 2,
    culturalSignificance: 8,
    photographyScore: 6,
    bestMonths: [11, 12, 1, 2, 3],
    avgTemperature: { spring: 30, summer: 35, autumn: 32, winter: 22 },
    accommodationTypes: ['hotels', 'resorts', 'apartments', 'hostels'],
    nearbyAttractions: ['Clifton Beach', 'Mohatta Palace', 'Quaid Mausoleum', 'Port Grand'],
    travelTime: { Islamabad: 14, Lahore: 14, Karachi: 0 },
  },
  {
    name: 'Islamabad',
    category: 'city',
    avgCost: 22000,
    popularity: 78,
    season: ['spring', 'autumn'],
    activities: ['nature', 'culture', 'modern', 'hiking', 'dining'],
    region: 'Capital',
    altitude: 540,
    accessibility: 10,
    crowdLevel: 8,
    weatherScore: 8,
    safetyRating: 10,
    familyFriendly: true,
    adventureLevel: 4,
    culturalSignificance: 7,
    photographyScore: 7,
    bestMonths: [3, 4, 5, 9, 10, 11],
    avgTemperature: { spring: 22, summer: 32, autumn: 24, winter: 12 },
    accommodationTypes: ['hotels', 'resorts', 'apartments', 'hostels'],
    nearbyAttractions: ['Faisal Mosque', 'Daman-e-Koh', 'Lok Virsa', 'Margalla Hills'],
    travelTime: { Islamabad: 0, Lahore: 4, Karachi: 14 },
  },
  {
    name: 'Chitral',
    category: 'mountain',
    avgCost: 38000,
    popularity: 83,
    season: ['summer', 'autumn'],
    activities: ['culture', 'trekking', 'adventure', 'festivals', 'nature'],
    region: 'KPK',
    altitude: 1500,
    accessibility: 6,
    crowdLevel: 4,
    weatherScore: 8,
    safetyRating: 8,
    familyFriendly: true,
    adventureLevel: 8,
    culturalSignificance: 9,
    photographyScore: 9,
    bestMonths: [5, 6, 7, 8, 9, 10],
    avgTemperature: { spring: 14, summer: 22, autumn: 12, winter: -2 },
    accommodationTypes: ['hotels', 'guesthouses', 'camping'],
    nearbyAttractions: ['Kalash Valleys', 'Shandur Pass', 'Tirich Mir', 'Chitral Fort'],
    travelTime: { Islamabad: 10, Lahore: 14, Karachi: 28 },
  },
  {
    name: 'Gilgit',
    category: 'mountain',
    avgCost: 32000,
    popularity: 84,
    season: ['spring', 'summer', 'autumn'],
    activities: ['nature', 'culture', 'adventure', 'trekking', 'rafting'],
    region: 'Gilgit-Baltistan',
    altitude: 1500,
    accessibility: 7,
    crowdLevel: 6,
    weatherScore: 8,
    safetyRating: 9,
    familyFriendly: true,
    adventureLevel: 7,
    culturalSignificance: 8,
    photographyScore: 8,
    bestMonths: [4, 5, 6, 7, 8, 9, 10],
    avgTemperature: { spring: 16, summer: 26, autumn: 14, winter: 0 },
    accommodationTypes: ['hotels', 'guesthouses', 'resorts'],
    nearbyAttractions: ['Kargah Buddha', 'Naltar Valley', 'Rakaposhi View', 'Gilgit Bazaar'],
    travelTime: { Islamabad: 16, Lahore: 20, Karachi: 34 },
  },
];

// User behavior patterns for collaborative filtering
export interface UserBehaviorPattern {
  userId: string;
  age: number;
  gender: string;
  travelFrequency: string;
  preferredBudget: string;
  preferredSeason: string;
  interests: string[];
  visitedDestinations: string[];
  ratings: { [destination: string]: number };
}

// Sample user patterns for training
export const userBehaviorData: UserBehaviorPattern[] = [
  {
    userId: 'user_001',
    age: 28,
    gender: 'male',
    travelFrequency: 'frequent',
    preferredBudget: 'medium',
    preferredSeason: 'summer',
    interests: ['adventure', 'trekking', 'photography'],
    visitedDestinations: ['Hunza Valley', 'Skardu', 'Fairy Meadows'],
    ratings: { 'Hunza Valley': 5, 'Skardu': 5, 'Fairy Meadows': 4 },
  },
  {
    userId: 'user_002',
    age: 35,
    gender: 'female',
    travelFrequency: 'regular',
    preferredBudget: 'high',
    preferredSeason: 'spring',
    interests: ['culture', 'photography', 'relaxation'],
    visitedDestinations: ['Lahore', 'Swat Valley', 'Neelum Valley'],
    ratings: { 'Lahore': 4, 'Swat Valley': 5, 'Neelum Valley': 5 },
  },
];

// Weather impact data for predictions
export const weatherImpactData = {
  temperature: {
    veryHot: { comfort: 3, crowdMultiplier: 0.7, priceMultiplier: 0.9 },
    hot: { comfort: 5, crowdMultiplier: 0.8, priceMultiplier: 0.95 },
    moderate: { comfort: 9, crowdMultiplier: 1.2, priceMultiplier: 1.1 },
    cool: { comfort: 8, crowdMultiplier: 1.0, priceMultiplier: 1.0 },
    cold: { comfort: 6, crowdMultiplier: 0.9, priceMultiplier: 1.05 },
  },
};

// Crowd prediction data
export const crowdPredictionData = {
  holidays: {
    eid: { multiplier: 2.5, priceIncrease: 1.4 },
    summer_vacation: { multiplier: 2.0, priceIncrease: 1.3 },
    winter_vacation: { multiplier: 1.8, priceIncrease: 1.2 },
    long_weekend: { multiplier: 1.5, priceIncrease: 1.15 },
    regular: { multiplier: 1.0, priceIncrease: 1.0 },
  },
};

export { expandedDestinationsData as destinationsData };
