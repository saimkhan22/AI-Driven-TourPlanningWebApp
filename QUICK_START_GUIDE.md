# Quick Start Guide - Real-time Data Integration

## 🎯 What Has Been Done

### ✅ Completed Features

1. **Real-time Weather API** (`webapp/lib/weatherService.ts`)
   - OpenWeatherMap integration
   - Fallback data for Pakistan cities
   - Weather alerts support
   - Works WITHOUT API key

2. **Interactive Map Component** (`webapp/components/map/InteractiveMap.tsx`)
   - Google Maps integration
   - User location access
   - Traffic visualization
   - Fallback to OpenStreetMap links
   - Works WITHOUT API key

3. **Restaurant Service** (`webapp/lib/restaurantService.ts`)
   - Google Places API for restaurant search
   - Famous foods by region (Lahore, Karachi, Islamabad, Peshawar, Multan, Hunza)
   - Fallback restaurant data
   - Works WITHOUT API key

4. **Traffic Data Fallback** (`webapp/lib/googlePlaces.ts`)
   - Intelligent fallback for traffic data
   - Pakistan route database
   - Works WITHOUT API key

---

## 🔧 How to Use These Features

### 1. Weather Service

```typescript
import { getCurrentWeather, getWeatherForecast, getWeatherAlerts } from '@/lib/weatherService';

// Get current weather
const weather = await getCurrentWeather('Islamabad');
console.log(weather.temperature, weather.condition);

// Get 5-day forecast
const forecast = await getWeatherForecast('Lahore', 5);

// Get weather alerts
const alerts = await getWeatherAlerts(33.6844, 73.0479);
```

### 2. Interactive Map

```typescript
import InteractiveMap from '@/components/map/InteractiveMap';

// In your component
<InteractiveMap 
  origin="Islamabad"
  destination="Lahore"
  height="600px"
/>

// With multiple locations
<InteractiveMap 
  locations={[
    { name: 'Minar-e-Pakistan', lat: 31.5925, lng: 74.3095 },
    { name: 'Badshahi Mosque', lat: 31.5880, lng: 74.3089 }
  ]}
/>
```

### 3. Restaurant Service

```typescript
import { searchRestaurants, getFamousFoods, getAllFamousFoods } from '@/lib/restaurantService';

// Search restaurants
const restaurants = await searchRestaurants('Lahore', 5000);

// Get famous foods by region
const lahoriFoods = getFamousFoods('Lahore');

// Get all famous foods
const allFoods = getAllFamousFoods();
```

---

## 🔑 API Keys Setup

### Step 1: Get API Keys (Optional - App works without them!)

1. **OpenWeatherMap** (Free)
   - Visit: https://openweathermap.org/api
   - Sign up for free account
   - Get API key from dashboard
   - Free tier: 1,000 calls/day

2. **Google Maps** (Free $200/month credit)
   - Visit: https://console.cloud.google.com/
   - Create new project
   - Enable APIs:
     - Maps JavaScript API
     - Places API
     - Directions API
     - Geocoding API
   - Create credentials → API Key
   - Free tier: $200 credit/month

### Step 2: Add to Environment Variables

Create/update `webapp/.env.local`:

```env
# Weather API
NEXT_PUBLIC_OPENWEATHER_API_KEY=your_openweather_api_key_here

# Google Maps API
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
GOOGLE_PLACES_API_KEY=your_google_maps_api_key_here

# Database (already configured)
MONGODB_URI=your_mongodb_uri_here
```

### Step 3: Restart Server

```bash
cd webapp
npm run dev
```

---

## 📋 What Still Needs to Be Done

### High Priority

1. **Update Food Page** (`webapp/app/foods/page.tsx`)
   - Replace static data with `restaurantService`
   - Add search functionality
   - Add famous foods section

2. **Add Trip Plan Map** (`webapp/app/plan-trip/page.tsx`)
   - Integrate `InteractiveMap` component
   - Show all destinations on map
   - Display route between locations

3. **Update Traffic Page** (`webapp/app/traffic/page.tsx`)
   - Replace `RealTimeTrafficMap` with `InteractiveMap`
   - Add multiple route options
   - Add turn-by-turn directions display

4. **Dashboard Saved Trips** (`webapp/app/dashboard/page.tsx`)
   - Create saved trips section
   - Display booked trips
   - Add trip management (view, edit, cancel)

### Medium Priority

5. **Budget Optimizer** (`webapp/app/budget-optimizer/page.tsx`)
   - Add real calculations
   - Category-wise breakdown
   - Cost-saving recommendations

6. **Weather Alerts Page** (`webapp/app/weather-alerts/page.tsx`)
   - Use `getWeatherAlerts` from weatherService
   - Display alerts with severity levels
   - Add affected areas map

7. **Scenic Routes** (`webapp/app/scenic-routes/page.tsx`)
   - Add interactive map
   - Famous routes in Pakistan
   - Points of interest

### Low Priority

8. **Buses Page** (`webapp/app/buses/page.tsx`)
   - Add bus routes database
   - Booking links to official websites
   - Schedule information

9. **Hotels Booking** (`webapp/app/hotels/page.tsx`)
   - Add save/wishlist functionality
   - Booking integration

---

## 🚀 Quick Implementation Examples

### Example 1: Update Food Page

```typescript
// webapp/app/foods/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { searchRestaurants, getFamousFoods } from '@/lib/restaurantService';

export default function FoodsPage() {
  const [restaurants, setRestaurants] = useState([]);
  const [famousFoods, setFamousFoods] = useState([]);
  const [city, setCity] = useState('Lahore');

  useEffect(() => {
    async function loadData() {
      const rests = await searchRestaurants(city);
      setRestaurants(rests);
      
      const foods = getFamousFoods(city);
      setFamousFoods(foods);
    }
    loadData();
  }, [city]);

  return (
    <div>
      {/* Display restaurants and famous foods */}
    </div>
  );
}
```

### Example 2: Add Map to Trip Plan

```typescript
// webapp/app/plan-trip/page.tsx
import InteractiveMap from '@/components/map/InteractiveMap';

// In your component
<InteractiveMap 
  origin={tripPlan.origin}
  destination={tripPlan.destination}
  locations={tripPlan.stops.map(stop => ({
    name: stop.name,
    lat: stop.latitude,
    lng: stop.longitude
  }))}
  height="500px"
/>
```

---

## 📊 Current Status

| Feature | Status | Has Fallback | Works Without API |
|---------|--------|--------------|-------------------|
| Weather | ✅ Complete | ✅ Yes | ✅ Yes |
| Maps | ✅ Complete | ✅ Yes | ✅ Yes |
| Traffic | ✅ Complete | ✅ Yes | ✅ Yes |
| Restaurants | ✅ Complete | ✅ Yes | ✅ Yes |
| Food Page | ⏳ Pending | - | - |
| Trip Map | ⏳ Pending | - | - |
| Dashboard Trips | ⏳ Pending | - | - |
| Budget Optimizer | ⏳ Pending | - | - |
| Weather Alerts | ⏳ Pending | - | - |
| Scenic Routes | ⏳ Pending | - | - |
| Buses | ⏳ Pending | - | - |

---

## 🎯 Next Steps

1. **Test Current Features**
   - Restart server: `cd webapp && npm run dev`
   - Test weather, maps, and traffic pages
   - Verify fallback data works

2. **Get API Keys** (Optional)
   - OpenWeatherMap for real weather
   - Google Maps for real maps and places

3. **Update Pages**
   - Start with Food page (easiest)
   - Then Trip Plan map
   - Then Dashboard saved trips

4. **Test Everything**
   - Test with and without API keys
   - Verify fallbacks work
   - Check mobile responsiveness

---

## 📞 Support

If you need help with any implementation:
1. Check `IMPLEMENTATION_PLAN.md` for detailed plans
2. Check `FIXES_APPLIED.md` for recent fixes
3. All services have fallback data - app works without API keys!

---

**Last Updated:** January 9, 2026
**Status:** 4 core services completed, ready for integration

