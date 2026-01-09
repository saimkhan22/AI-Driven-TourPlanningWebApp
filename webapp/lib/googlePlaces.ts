import axios from 'axios';

const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY;
const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

export interface Hotel {
  id: string;
  name: string;
  location: string;
  address: string;
  rating: number;
  reviews: number;
  price?: number;
  image: string;
  amenities: string[];
  contact?: string;
  email?: string;
  latitude: number;
  longitude: number;
  placeId: string;
  types: string[];
}

export async function searchHotels(
  location: string,
  radius: number = 50000
): Promise<Hotel[]> {
  try {
    // First, geocode the location
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      location + ', Pakistan'
    )}&key=${GOOGLE_MAPS_API_KEY}`;

    const geocodeResponse = await axios.get(geocodeUrl);

    if (geocodeResponse.data.results.length === 0) {
      throw new Error('Location not found');
    }

    const { lat, lng } = geocodeResponse.data.results[0].geometry.location;

    // Search for hotels near the location
    const placesUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&type=lodging&key=${GOOGLE_PLACES_API_KEY}`;

    const placesResponse = await axios.get(placesUrl);

    const hotels: Hotel[] = placesResponse.data.results.map((place: any) => ({
      id: place.place_id,
      name: place.name,
      location: location,
      address: place.vicinity || place.formatted_address || '',
      rating: place.rating || 0,
      reviews: place.user_ratings_total || 0,
      price: place.price_level ? place.price_level * 3000 : undefined,
      image: place.photos?.[0]
        ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${place.photos[0].photo_reference}&key=${GOOGLE_PLACES_API_KEY}`
        : 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop',
      amenities: place.types || [],
      latitude: place.geometry.location.lat,
      longitude: place.geometry.location.lng,
      placeId: place.place_id,
      types: place.types || [],
    }));

    return hotels;
  } catch (error) {
    console.error('Error fetching hotels from Google Places:', error);
    throw error;
  }
}

export async function getHotelDetails(placeId: string): Promise<any> {
  try {
    const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,formatted_phone_number,formatted_address,website,opening_hours,photos,reviews,price_level,types&key=${GOOGLE_PLACES_API_KEY}`;

    const response = await axios.get(detailsUrl);

    return response.data.result;
  } catch (error) {
    console.error('Error fetching hotel details:', error);
    throw error;
  }
}

export async function autocompleteLocation(input: string): Promise<any[]> {
  try {
    const autocompleteUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
      input
    )}&components=country:pk&types=(cities)&key=${GOOGLE_PLACES_API_KEY}`;

    const response = await axios.get(autocompleteUrl);

    return response.data.predictions || [];
  } catch (error) {
    console.error('Error in autocomplete:', error);
    return [];
  }
}

// Fallback traffic data generator when Google Maps API is not available
function generateFallbackTrafficData(origin: string, destination: string): any {
  // Estimate distance based on common Pakistan routes
  const routeDistances: { [key: string]: number } = {
    'islamabad-lahore': 375,
    'lahore-islamabad': 375,
    'karachi-hyderabad': 165,
    'hyderabad-karachi': 165,
    'lahore-multan': 340,
    'multan-lahore': 340,
    'islamabad-peshawar': 180,
    'peshawar-islamabad': 180,
    'karachi-sukkur': 470,
    'sukkur-karachi': 470,
    'lahore-faisalabad': 130,
    'faisalabad-lahore': 130,
  };

  const routeKey = `${origin.toLowerCase()}-${destination.toLowerCase()}`;
  const distance = routeDistances[routeKey] || 200; // Default 200km
  const duration = Math.round(distance / 60); // Assume 60 km/h average
  const durationInTraffic = Math.round(duration * 1.2); // Add 20% for traffic

  return {
    distance: `${distance} km`,
    duration: `${duration} hours`,
    durationInTraffic: `${durationInTraffic} hours`,
    steps: [
      {
        html_instructions: `Head towards ${destination}`,
        distance: { text: `${Math.round(distance * 0.3)} km` },
        duration: { text: `${Math.round(duration * 0.3)} hours` },
      },
      {
        html_instructions: `Continue on main highway`,
        distance: { text: `${Math.round(distance * 0.5)} km` },
        duration: { text: `${Math.round(duration * 0.5)} hours` },
      },
      {
        html_instructions: `Arrive at ${destination}`,
        distance: { text: `${Math.round(distance * 0.2)} km` },
        duration: { text: `${Math.round(duration * 0.2)} hours` },
      },
    ],
    polyline: '',
    fallback: true,
  };
}

export async function getTrafficData(
  origin: string,
  destination: string
): Promise<any> {
  try {
    // Check if Google Maps API key is configured
    if (!GOOGLE_MAPS_API_KEY || GOOGLE_MAPS_API_KEY.includes('your_google')) {
      console.log('Google Maps API key not configured, using fallback traffic data');
      return generateFallbackTrafficData(origin, destination);
    }

    const directionsUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${encodeURIComponent(
      origin
    )}&destination=${encodeURIComponent(
      destination
    )}&departure_time=now&traffic_model=best_guess&key=${GOOGLE_MAPS_API_KEY}`;

    const response = await axios.get(directionsUrl);

    if (response.data.status === 'REQUEST_DENIED' || response.data.status === 'INVALID_REQUEST') {
      console.log('Google Maps API error, using fallback traffic data');
      return generateFallbackTrafficData(origin, destination);
    }

    if (response.data.routes.length === 0) {
      console.log('No route found from Google Maps, using fallback');
      return generateFallbackTrafficData(origin, destination);
    }

    const route = response.data.routes[0];
    const leg = route.legs[0];

    return {
      distance: leg.distance.text,
      duration: leg.duration.text,
      durationInTraffic: leg.duration_in_traffic?.text || leg.duration.text,
      steps: leg.steps,
      polyline: route.overview_polyline.points,
      fallback: false,
    };
  } catch (error: any) {
    console.error('Error fetching traffic data:', error);

    // Use fallback for any error
    console.log('Using fallback traffic data due to error');
    return generateFallbackTrafficData(origin, destination);
  }
}

