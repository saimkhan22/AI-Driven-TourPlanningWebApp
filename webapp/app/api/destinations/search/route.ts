import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY || process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

interface Destination {
  id: string;
  name: string;
  location: string;
  description: string;
  rating: number;
  reviews: number;
  image: string;
  latitude: number;
  longitude: number;
  types: string[];
  address: string;
  placeId: string;
}

// Famous tourist destinations in Pakistan
const pakistanDestinations = [
  { name: 'Hunza Valley', region: 'Gilgit-Baltistan', lat: 36.3167, lng: 74.6500 },
  { name: 'Skardu', region: 'Gilgit-Baltistan', lat: 35.2978, lng: 75.6333 },
  { name: 'Naran Kaghan', region: 'KPK', lat: 34.9000, lng: 73.6500 },
  { name: 'Swat Valley', region: 'KPK', lat: 35.2227, lng: 72.4258 },
  { name: 'Murree', region: 'Punjab', lat: 33.9070, lng: 73.3903 },
  { name: 'Nathia Gali', region: 'KPK', lat: 34.0778, lng: 73.3889 },
  { name: 'Fairy Meadows', region: 'Gilgit-Baltistan', lat: 35.4167, lng: 74.5833 },
  { name: 'Chitral', region: 'KPK', lat: 35.8514, lng: 71.7869 },
  { name: 'Kalash Valley', region: 'KPK', lat: 35.6667, lng: 71.7167 },
  { name: 'Neelum Valley', region: 'AJK', lat: 34.5833, lng: 73.9167 },
  { name: 'Shogran', region: 'KPK', lat: 34.6333, lng: 73.4833 },
  { name: 'Astore Valley', region: 'Gilgit-Baltistan', lat: 35.3667, lng: 74.9000 },
  { name: 'Deosai Plains', region: 'Gilgit-Baltistan', lat: 35.0000, lng: 75.5000 },
  { name: 'Khunjerab Pass', region: 'Gilgit-Baltistan', lat: 36.8500, lng: 75.4333 },
  { name: 'Mohenjo-daro', region: 'Sindh', lat: 27.3244, lng: 68.1378 },
  { name: 'Badshahi Mosque', region: 'Punjab', lat: 31.5880, lng: 74.3089 },
  { name: 'Faisal Mosque', region: 'Islamabad', lat: 33.7297, lng: 73.0372 },
  { name: 'Minar-e-Pakistan', region: 'Punjab', lat: 31.5925, lng: 74.3095 },
  { name: 'Clifton Beach', region: 'Sindh', lat: 24.8103, lng: 67.0281 },
  { name: 'Makran Coastal Highway', region: 'Balochistan', lat: 25.3000, lng: 64.0000 },
];

async function searchGooglePlaces(query: string, location?: { lat: number; lng: number }): Promise<Destination[]> {
  try {
    if (!GOOGLE_PLACES_API_KEY || GOOGLE_PLACES_API_KEY.includes('your_')) {
      console.log('Google Places API not configured, using fallback');
      return [];
    }

    let url = '';
    if (location) {
      // Nearby search
      url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.lat},${location.lng}&radius=50000&type=tourist_attraction&keyword=${encodeURIComponent(query)}&key=${GOOGLE_PLACES_API_KEY}`;
    } else {
      // Text search
      url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query + ' Pakistan tourist attraction')}&key=${GOOGLE_PLACES_API_KEY}`;
    }

    const response = await axios.get(url);

    if (response.data.status !== 'OK' && response.data.status !== 'ZERO_RESULTS') {
      console.error('Google Places API error:', response.data.status);
      return [];
    }

    const destinations: Destination[] = response.data.results.map((place: any) => ({
      id: place.place_id,
      name: place.name,
      location: place.vicinity || place.formatted_address || '',
      description: place.editorial_summary?.overview || `Popular tourist destination in Pakistan`,
      rating: place.rating || 4.0,
      reviews: place.user_ratings_total || 0,
      image: place.photos?.[0]
        ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photoreference=${place.photos[0].photo_reference}&key=${GOOGLE_PLACES_API_KEY}`
        : 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=800',
      latitude: place.geometry.location.lat,
      longitude: place.geometry.location.lng,
      types: place.types || [],
      address: place.formatted_address || place.vicinity || '',
      placeId: place.place_id,
    }));

    return destinations;
  } catch (error) {
    console.error('Error searching Google Places:', error);
    return [];
  }
}

function getFallbackDestinations(region?: string): Destination[] {
  let destinations = pakistanDestinations;
  
  if (region) {
    destinations = destinations.filter(d => 
      d.region.toLowerCase().includes(region.toLowerCase()) ||
      d.name.toLowerCase().includes(region.toLowerCase())
    );
  }

  return destinations.map((dest, index) => ({
    id: `fallback_${index}`,
    name: dest.name,
    location: dest.region,
    description: `Beautiful tourist destination in ${dest.region}, Pakistan`,
    rating: 4.5 + Math.random() * 0.5,
    reviews: Math.floor(Math.random() * 2000) + 500,
    image: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=800',
    latitude: dest.lat,
    longitude: dest.lng,
    types: ['tourist_attraction', 'point_of_interest'],
    address: `${dest.name}, ${dest.region}, Pakistan`,
    placeId: `fallback_${index}`,
  }));
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('query') || 'tourist attractions';
    const region = searchParams.get('region');
    const lat = searchParams.get('lat');
    const lng = searchParams.get('lng');

    let googleResults: Destination[] = [];

    // Try Google Places API first
    if (lat && lng) {
      googleResults = await searchGooglePlaces(query, { lat: parseFloat(lat), lng: parseFloat(lng) });
    } else {
      googleResults = await searchGooglePlaces(region || query);
    }

    // Get fallback destinations
    const fallbackResults = getFallbackDestinations(region || undefined);

    // Combine results, prioritizing Google results
    const allDestinations = [...googleResults, ...fallbackResults];

    // Remove duplicates based on name similarity
    const uniqueDestinations = allDestinations.filter((dest, index, self) =>
      index === self.findIndex(d => d.name.toLowerCase() === dest.name.toLowerCase())
    );

    return NextResponse.json({
      success: true,
      destinations: uniqueDestinations.slice(0, 20), // Limit to 20 results
      count: uniqueDestinations.length,
      source: googleResults.length > 0 ? 'google' : 'fallback',
    });
  } catch (error: any) {
    console.error('Error in destinations API:', error);
    return NextResponse.json({
      success: false,
      error: error.message,
      destinations: getFallbackDestinations(),
    }, { status: 500 });
  }
}

