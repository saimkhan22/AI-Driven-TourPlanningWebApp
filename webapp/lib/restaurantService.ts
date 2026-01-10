import axios from 'axios';

const GOOGLE_PLACES_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY || process.env.GOOGLE_PLACES_API_KEY;

export interface Restaurant {
  id: string;
  name: string;
  location: string;
  address: string;
  rating: number;
  reviews: number;
  priceLevel: number; // 1-4
  image: string;
  cuisine: string[];
  openNow: boolean;
  phone?: string;
  website?: string;
  latitude: number;
  longitude: number;
  placeId: string;
}

export interface FamousFood {
  name: string;
  description: string;
  region: string;
  whereToTry: string[];
  image: string;
  price: string;
}

// Famous foods by region in Pakistan
export const famousFoodsByRegion: { [key: string]: FamousFood[] } = {
  'Lahore': [
    {
      name: 'Lahori Chargha',
      description: 'Whole chicken marinated in spices and deep-fried to perfection',
      region: 'Punjab',
      whereToTry: ['Lakshmi Chowk', 'Food Street Fort Road', 'Gawalmandi'],
      image: 'https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=400',
      price: 'PKR 800-1200',
    },
    {
      name: 'Nihari',
      description: 'Slow-cooked beef stew with aromatic spices, served with naan',
      region: 'Punjab',
      whereToTry: ['Waris Nihari', 'Javed Nihari', 'Mohammadi Nihari'],
      image: 'https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=400',
      price: 'PKR 300-500',
    },
    {
      name: 'Haleem',
      description: 'Rich blend of wheat, barley, meat, and lentils',
      region: 'Punjab',
      whereToTry: ['Phajja Haleem', 'Gawalmandi Food Street'],
      image: 'https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=400',
      price: 'PKR 250-400',
    },
  ],
  'Karachi': [
    {
      name: 'Sindhi Biryani',
      description: 'Aromatic rice with spicy meat, potatoes, and yogurt',
      region: 'Sindh',
      whereToTry: ['Burns Road', 'Boat Basin', 'Karachi Biryani Center'],
      image: 'https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=400',
      price: 'PKR 300-600',
    },
    {
      name: 'Bun Kebab',
      description: 'Spicy kebab patty in a bun with chutney and vegetables',
      region: 'Sindh',
      whereToTry: ['Burns Road', 'Boat Basin', 'Clifton'],
      image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=400',
      price: 'PKR 100-200',
    },
    {
      name: 'Sajji',
      description: 'Whole lamb or chicken roasted with minimal spices',
      region: 'Balochistan/Sindh',
      whereToTry: ['Boat Basin', 'Tariq Road', 'Baloch Sajji House'],
      image: 'https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=400',
      price: 'PKR 1500-3000',
    },
  ],
  'Islamabad': [
    {
      name: 'Chapli Kebab',
      description: 'Flat, spicy minced meat kebab from Peshawar',
      region: 'KPK',
      whereToTry: ['Savour Foods', 'Khyber Shinwari', 'F-6 Markaz'],
      image: 'https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=400',
      price: 'PKR 200-350',
    },
    {
      name: 'Peshawari Karahi',
      description: 'Tomato-based mutton curry cooked in a wok',
      region: 'KPK',
      whereToTry: ['Khyber Shinwari', 'Usmania Restaurant', 'Monal'],
      image: 'https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=400',
      price: 'PKR 800-1500',
    },
  ],
  'Peshawar': [
    {
      name: 'Chapli Kebab',
      description: 'Original Peshawari flat kebab with tomatoes and spices',
      region: 'KPK',
      whereToTry: ['Namak Mandi', 'Qissa Khwani Bazaar', 'Charsi Tikka'],
      image: 'https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=400',
      price: 'PKR 150-300',
    },
    {
      name: 'Kabuli Pulao',
      description: 'Afghan-style rice with carrots, raisins, and lamb',
      region: 'KPK',
      whereToTry: ['Namak Mandi', 'Saddar Bazaar'],
      image: 'https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=400',
      price: 'PKR 400-700',
    },
  ],
  'Multan': [
    {
      name: 'Sohan Halwa',
      description: 'Traditional sweet made from milk, sugar, and ghee',
      region: 'Punjab',
      whereToTry: ['Hafiz Sohan Halwa', 'Multani Sohan Halwa'],
      image: 'https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=400',
      price: 'PKR 500-1000/kg',
    },
  ],
  'Hunza': [
    {
      name: 'Chapshuro',
      description: 'Meat-filled flatbread, a Hunza specialty',
      region: 'Gilgit-Baltistan',
      whereToTry: ['Karimabad Cafes', 'Local Hunza Restaurants'],
      image: 'https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=400',
      price: 'PKR 200-350',
    },
    {
      name: 'Hunza Soup',
      description: 'Nutritious soup with local vegetables and herbs',
      region: 'Gilgit-Baltistan',
      whereToTry: ['Hunza Serena Inn', 'Local Cafes'],
      image: 'https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=400',
      price: 'PKR 150-250',
    },
  ],
};

export async function searchRestaurants(
  location: string,
  radius: number = 5000,
  type: string = 'restaurant'
): Promise<Restaurant[]> {
  try {
    if (!GOOGLE_PLACES_API_KEY || GOOGLE_PLACES_API_KEY.includes('your_')) {
      console.log('Google Places API key not configured, using fallback data');
      return getFallbackRestaurants(location);
    }

    // First, geocode the location
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      location + ', Pakistan'
    )}&key=${GOOGLE_PLACES_API_KEY}`;

    const geocodeResponse = await axios.get(geocodeUrl);

    if (geocodeResponse.data.results.length === 0) {
      return getFallbackRestaurants(location);
    }

    const { lat, lng } = geocodeResponse.data.results[0].geometry.location;

    // Search for restaurants
    const placesUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&type=${type}&key=${GOOGLE_PLACES_API_KEY}`;

    const placesResponse = await axios.get(placesUrl);

    const restaurants: Restaurant[] = placesResponse.data.results.map((place: any) => ({
      id: place.place_id,
      name: place.name,
      location: location,
      address: place.vicinity || place.formatted_address || '',
      rating: place.rating || 0,
      reviews: place.user_ratings_total || 0,
      priceLevel: place.price_level || 2,
      image: place.photos?.[0]
        ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${place.photos[0].photo_reference}&key=${GOOGLE_PLACES_API_KEY}`
        : 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=400',
      cuisine: place.types?.filter((t: string) => !['restaurant', 'food', 'point_of_interest', 'establishment'].includes(t)) || [],
      openNow: place.opening_hours?.open_now ?? true,
      latitude: place.geometry.location.lat,
      longitude: place.geometry.location.lng,
      placeId: place.place_id,
    }));

    return restaurants;
  } catch (error: any) {
    console.error('Error fetching restaurants:', error);
    return getFallbackRestaurants(location);
  }
}

function getFallbackRestaurants(location: string): Restaurant[] {
  const fallbackData: { [key: string]: Restaurant[] } = {
    'lahore': [
      {
        id: 'lhr_1',
        name: 'Butt Karahi',
        location: 'Lahore',
        address: 'Lakshmi Chowk, Lahore',
        rating: 4.5,
        reviews: 2500,
        priceLevel: 2,
        image: 'https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=400',
        cuisine: ['Pakistani', 'Karahi'],
        openNow: true,
        phone: '+92-42-37654321',
        latitude: 31.5497,
        longitude: 74.3436,
        placeId: 'fallback_lhr_1',
      },
      {
        id: 'lhr_2',
        name: 'Gawalmandi Food Street',
        location: 'Lahore',
        address: 'Gawalmandi, Lahore',
        rating: 4.3,
        reviews: 1800,
        priceLevel: 1,
        image: 'https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=400',
        cuisine: ['Pakistani', 'Street Food'],
        openNow: true,
        latitude: 31.5656,
        longitude: 74.3242,
        placeId: 'fallback_lhr_2',
      },
      {
        id: 'lhr_3',
        name: 'Cafe Aylanto',
        location: 'Lahore',
        address: 'MM Alam Road, Gulberg III, Lahore',
        rating: 4.7,
        reviews: 3500,
        priceLevel: 4,
        image: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=400',
        cuisine: ['Continental', 'Italian', 'Fine Dining'],
        openNow: true,
        phone: '+92-42-35756664',
        website: 'https://cafeaylanto.com',
        latitude: 31.5204,
        longitude: 74.3587,
        placeId: 'fallback_lhr_3',
      },
      {
        id: 'lhr_4',
        name: 'Andaaz Restaurant',
        location: 'Lahore',
        address: 'Avari Hotel, Mall Road, Lahore',
        rating: 4.6,
        reviews: 2200,
        priceLevel: 3,
        image: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=400',
        cuisine: ['Pakistani', 'Mughlai', 'BBQ'],
        openNow: true,
        phone: '+92-42-36360101',
        latitude: 31.5656,
        longitude: 74.3242,
        placeId: 'fallback_lhr_4',
      },
      {
        id: 'lhr_5',
        name: 'Cosa Nostra',
        location: 'Lahore',
        address: 'MM Alam Road, Gulberg, Lahore',
        rating: 4.4,
        reviews: 1900,
        priceLevel: 3,
        image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=400',
        cuisine: ['Italian', 'Pizza', 'Pasta'],
        openNow: true,
        latitude: 31.5204,
        longitude: 74.3587,
        placeId: 'fallback_lhr_5',
      },
      {
        id: 'lhr_6',
        name: 'Salt n Pepper Village',
        location: 'Lahore',
        address: 'Jail Road, Lahore',
        rating: 4.2,
        reviews: 4500,
        priceLevel: 2,
        image: 'https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=400',
        cuisine: ['Pakistani', 'Chinese', 'Continental'],
        openNow: true,
        phone: '+92-42-111-100-678',
        latitude: 31.5204,
        longitude: 74.3587,
        placeId: 'fallback_lhr_6',
      },
      {
        id: 'lhr_7',
        name: 'Bundu Khan',
        location: 'Lahore',
        address: 'Multiple Locations, Lahore',
        rating: 4.3,
        reviews: 3800,
        priceLevel: 2,
        image: 'https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=400',
        cuisine: ['Pakistani', 'BBQ', 'Karahi'],
        openNow: true,
        phone: '+92-42-111-111-789',
        latitude: 31.5204,
        longitude: 74.3587,
        placeId: 'fallback_lhr_7',
      },
      {
        id: 'lhr_8',
        name: 'Nando\'s',
        location: 'Lahore',
        address: 'Packages Mall, Lahore',
        rating: 4.1,
        reviews: 2800,
        priceLevel: 2,
        image: 'https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=400',
        cuisine: ['Chicken', 'Peri-Peri', 'Fast Food'],
        openNow: true,
        latitude: 31.4697,
        longitude: 74.2728,
        placeId: 'fallback_lhr_8',
      },
    ],
    'karachi': [
      {
        id: 'khi_1',
        name: 'Burns Road Food Street',
        location: 'Karachi',
        address: 'Burns Road, Karachi',
        rating: 4.4,
        reviews: 3200,
        priceLevel: 1,
        image: 'https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=400',
        cuisine: ['Pakistani', 'Biryani', 'Street Food'],
        openNow: true,
        latitude: 24.8607,
        longitude: 67.0011,
        placeId: 'fallback_khi_1',
      },
      {
        id: 'khi_2',
        name: 'Kolachi Restaurant',
        location: 'Karachi',
        address: 'Do Darya, Phase 8, DHA, Karachi',
        rating: 4.5,
        reviews: 4200,
        priceLevel: 3,
        image: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=400',
        cuisine: ['Pakistani', 'BBQ', 'Seafood'],
        openNow: true,
        phone: '+92-21-35302999',
        latitude: 24.8138,
        longitude: 67.0719,
        placeId: 'fallback_khi_2',
      },
      {
        id: 'khi_3',
        name: 'Boat Basin Food Street',
        location: 'Karachi',
        address: 'Boat Basin, Clifton, Karachi',
        rating: 4.3,
        reviews: 5500,
        priceLevel: 2,
        image: 'https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=400',
        cuisine: ['Pakistani', 'Fast Food', 'BBQ'],
        openNow: true,
        latitude: 24.8138,
        longitude: 67.0297,
        placeId: 'fallback_khi_3',
      },
      {
        id: 'khi_4',
        name: 'Okra',
        location: 'Karachi',
        address: 'Mövenpick Hotel, Club Road, Karachi',
        rating: 4.6,
        reviews: 2100,
        priceLevel: 4,
        image: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=400',
        cuisine: ['Mediterranean', 'Fine Dining', 'Continental'],
        openNow: true,
        phone: '+92-21-111-117-111',
        latitude: 24.8138,
        longitude: 67.0297,
        placeId: 'fallback_khi_4',
      },
      {
        id: 'khi_5',
        name: 'Xander\'s',
        location: 'Karachi',
        address: 'Zamzama, DHA Phase 5, Karachi',
        rating: 4.4,
        reviews: 1800,
        priceLevel: 3,
        image: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=400',
        cuisine: ['Continental', 'Steakhouse', 'Fine Dining'],
        openNow: true,
        latitude: 24.8138,
        longitude: 67.0297,
        placeId: 'fallback_khi_5',
      },
      {
        id: 'khi_6',
        name: 'Karachi Broast',
        location: 'Karachi',
        address: 'Multiple Locations, Karachi',
        rating: 4.2,
        reviews: 6200,
        priceLevel: 1,
        image: 'https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=400',
        cuisine: ['Fast Food', 'Chicken', 'Burgers'],
        openNow: true,
        latitude: 24.8607,
        longitude: 67.0011,
        placeId: 'fallback_khi_6',
      },
      {
        id: 'khi_7',
        name: 'Sajjad Restaurant',
        location: 'Karachi',
        address: 'Tariq Road, Karachi',
        rating: 4.3,
        reviews: 3900,
        priceLevel: 2,
        image: 'https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=400',
        cuisine: ['Pakistani', 'Nihari', 'Haleem'],
        openNow: true,
        latitude: 24.8607,
        longitude: 67.0011,
        placeId: 'fallback_khi_7',
      },
      {
        id: 'khi_8',
        name: 'Café Flo',
        location: 'Karachi',
        address: 'Zamzama, DHA, Karachi',
        rating: 4.5,
        reviews: 2400,
        priceLevel: 3,
        image: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=400',
        cuisine: ['French', 'Continental', 'Bakery'],
        openNow: true,
        latitude: 24.8138,
        longitude: 67.0297,
        placeId: 'fallback_khi_8',
      },
    ],
    'islamabad': [
      {
        id: 'isb_1',
        name: 'Monal Restaurant',
        location: 'Islamabad',
        address: 'Pir Sohawa Road, Islamabad',
        rating: 4.6,
        reviews: 5000,
        priceLevel: 3,
        image: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=400',
        cuisine: ['Pakistani', 'Continental', 'BBQ'],
        openNow: true,
        phone: '+92-51-2898888',
        website: 'https://monal.pk',
        latitude: 33.7294,
        longitude: 73.0931,
        placeId: 'fallback_isb_1',
      },
      {
        id: 'isb_2',
        name: 'Khyber Shinwari',
        location: 'Islamabad',
        address: 'F-6 Markaz, Islamabad',
        rating: 4.4,
        reviews: 3200,
        priceLevel: 2,
        image: 'https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=400',
        cuisine: ['Pakistani', 'Pashtun', 'BBQ'],
        openNow: true,
        phone: '+92-51-2820820',
        latitude: 33.7294,
        longitude: 73.0931,
        placeId: 'fallback_isb_2',
      },
      {
        id: 'isb_3',
        name: 'Tuscany Courtyard',
        location: 'Islamabad',
        address: 'F-6/3, Islamabad',
        rating: 4.5,
        reviews: 2800,
        priceLevel: 3,
        image: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=400',
        cuisine: ['Italian', 'Continental', 'Fine Dining'],
        openNow: true,
        phone: '+92-51-2820820',
        latitude: 33.7294,
        longitude: 73.0931,
        placeId: 'fallback_isb_3',
      },
      {
        id: 'isb_4',
        name: 'Savour Foods',
        location: 'Islamabad',
        address: 'Multiple Locations, Islamabad',
        rating: 4.3,
        reviews: 4500,
        priceLevel: 1,
        image: 'https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=400',
        cuisine: ['Pakistani', 'Fast Food', 'Pulao'],
        openNow: true,
        phone: '+92-51-111-728-687',
        latitude: 33.7294,
        longitude: 73.0931,
        placeId: 'fallback_isb_4',
      },
      {
        id: 'isb_5',
        name: 'Street 1 Cafe',
        location: 'Islamabad',
        address: 'F-7 Markaz, Islamabad',
        rating: 4.4,
        reviews: 2100,
        priceLevel: 2,
        image: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=400',
        cuisine: ['Continental', 'Cafe', 'Desserts'],
        openNow: true,
        latitude: 33.7294,
        longitude: 73.0931,
        placeId: 'fallback_isb_5',
      },
      {
        id: 'isb_6',
        name: 'Des Pardes',
        location: 'Islamabad',
        address: 'Blue Area, Islamabad',
        rating: 4.2,
        reviews: 1900,
        priceLevel: 2,
        image: 'https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=400',
        cuisine: ['Pakistani', 'Desi', 'BBQ'],
        openNow: true,
        latitude: 33.7294,
        longitude: 73.0931,
        placeId: 'fallback_isb_6',
      },
    ],
    'peshawar': [
      {
        id: 'psh_1',
        name: 'Namak Mandi',
        location: 'Peshawar',
        address: 'Namak Mandi, Peshawar',
        rating: 4.5,
        reviews: 4200,
        priceLevel: 1,
        image: 'https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=400',
        cuisine: ['Pashtun', 'BBQ', 'Karahi'],
        openNow: true,
        latitude: 34.0151,
        longitude: 71.5249,
        placeId: 'fallback_psh_1',
      },
      {
        id: 'psh_2',
        name: 'Charsi Tikka',
        location: 'Peshawar',
        address: 'Namak Mandi, Peshawar',
        rating: 4.6,
        reviews: 5100,
        priceLevel: 1,
        image: 'https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=400',
        cuisine: ['Pashtun', 'Tikka', 'BBQ'],
        openNow: true,
        latitude: 34.0151,
        longitude: 71.5249,
        placeId: 'fallback_psh_2',
      },
      {
        id: 'psh_3',
        name: 'Shinwari House',
        location: 'Peshawar',
        address: 'University Road, Peshawar',
        rating: 4.4,
        reviews: 2800,
        priceLevel: 2,
        image: 'https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=400',
        cuisine: ['Pashtun', 'Karahi', 'Pulao'],
        openNow: true,
        latitude: 34.0151,
        longitude: 71.5249,
        placeId: 'fallback_psh_3',
      },
    ],
    'multan': [
      {
        id: 'mlt_1',
        name: 'Multani Sohan Halwa',
        location: 'Multan',
        address: 'Hussain Agahi Bazaar, Multan',
        rating: 4.7,
        reviews: 3500,
        priceLevel: 1,
        image: 'https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=400',
        cuisine: ['Sweets', 'Traditional', 'Desserts'],
        openNow: true,
        latitude: 30.1575,
        longitude: 71.5249,
        placeId: 'fallback_mlt_1',
      },
      {
        id: 'mlt_2',
        name: 'Dewan-e-Khas',
        location: 'Multan',
        address: 'Gulgasht Colony, Multan',
        rating: 4.3,
        reviews: 1900,
        priceLevel: 2,
        image: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=400',
        cuisine: ['Pakistani', 'Mughlai', 'BBQ'],
        openNow: true,
        latitude: 30.1575,
        longitude: 71.5249,
        placeId: 'fallback_mlt_2',
      },
    ],
    'faisalabad': [
      {
        id: 'fsd_1',
        name: 'Dilpasand Sweets',
        location: 'Faisalabad',
        address: 'Jinnah Colony, Faisalabad',
        rating: 4.4,
        reviews: 2600,
        priceLevel: 1,
        image: 'https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=400',
        cuisine: ['Sweets', 'Bakery', 'Fast Food'],
        openNow: true,
        latitude: 31.4504,
        longitude: 73.1350,
        placeId: 'fallback_fsd_1',
      },
      {
        id: 'fsd_2',
        name: 'Lasani Restaurant',
        location: 'Faisalabad',
        address: 'D Ground, Faisalabad',
        rating: 4.2,
        reviews: 1800,
        priceLevel: 2,
        image: 'https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=400',
        cuisine: ['Pakistani', 'Chinese', 'Continental'],
        openNow: true,
        latitude: 31.4504,
        longitude: 73.1350,
        placeId: 'fallback_fsd_2',
      },
    ],
    'quetta': [
      {
        id: 'qta_1',
        name: 'Balochi Sajji House',
        location: 'Quetta',
        address: 'Jinnah Road, Quetta',
        rating: 4.6,
        reviews: 2100,
        priceLevel: 2,
        image: 'https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=400',
        cuisine: ['Balochi', 'Sajji', 'BBQ'],
        openNow: true,
        latitude: 30.1798,
        longitude: 66.9750,
        placeId: 'fallback_qta_1',
      },
      {
        id: 'qta_2',
        name: 'Lehri Sajji',
        location: 'Quetta',
        address: 'Zarghoon Road, Quetta',
        rating: 4.5,
        reviews: 1700,
        priceLevel: 2,
        image: 'https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=400',
        cuisine: ['Balochi', 'Sajji', 'Traditional'],
        openNow: true,
        latitude: 30.1798,
        longitude: 66.9750,
        placeId: 'fallback_qta_2',
      },
    ],
    'rawalpindi': [
      {
        id: 'rwp_1',
        name: 'Lal Qila Restaurant',
        location: 'Rawalpindi',
        address: 'Saddar, Rawalpindi',
        rating: 4.3,
        reviews: 2400,
        priceLevel: 2,
        image: 'https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=400',
        cuisine: ['Pakistani', 'Mughlai', 'BBQ'],
        openNow: true,
        latitude: 33.5651,
        longitude: 73.0169,
        placeId: 'fallback_rwp_1',
      },
      {
        id: 'rwp_2',
        name: 'Usmania Restaurant',
        location: 'Rawalpindi',
        address: 'Committee Chowk, Rawalpindi',
        rating: 4.4,
        reviews: 3200,
        priceLevel: 2,
        image: 'https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=400',
        cuisine: ['Pakistani', 'Karahi', 'BBQ'],
        openNow: true,
        latitude: 33.5651,
        longitude: 73.0169,
        placeId: 'fallback_rwp_2',
      },
    ],
  };

  const cityLower = location.toLowerCase();
  return fallbackData[cityLower] || fallbackData['islamabad'] || [];
}

export function getFamousFoods(region: string): FamousFood[] {
  return famousFoodsByRegion[region] || [];
}

export function getAllFamousFoods(): FamousFood[] {
  return Object.values(famousFoodsByRegion).flat();
}

