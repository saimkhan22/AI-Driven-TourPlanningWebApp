# API Setup Guide - Complete Integration

## 🎉 What's Been Implemented

### ✅ Completed Pages (3/12)

1. **Destinations Page** - Real Google Places data for tourist attractions
2. **Weather Alerts Page** - Real-time weather alerts for all Pakistan cities
3. **Food Page** - Real restaurant data and famous foods by region

### 📁 New API Routes Created (3)

1. `/api/destinations/search` - Search tourist destinations
2. `/api/restaurants/search` - Search restaurants and famous foods
3. `/api/weather/alerts` - Get weather alerts for Pakistan cities

---

## 🔑 API Keys Required

### 1. Google Maps & Places API (Free $200/month)

**What it's used for:**
- Destinations page - tourist attractions
- Food page - restaurant listings
- Maps - directions and traffic
- Hotels - hotel listings

**How to get it:**

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable these APIs:
   - Maps JavaScript API
   - Places API
   - Directions API
   - Geocoding API
4. Go to "Credentials" → "Create Credentials" → "API Key"
5. Copy the API key

**Add to `.env.local`:**
```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
GOOGLE_PLACES_API_KEY=your_google_maps_api_key_here
```

**Free Tier:**
- $200 credit per month
- ~28,000 map loads/month
- ~17,000 place searches/month

---

### 2. OpenWeatherMap API (Free)

**What it's used for:**
- Weather alerts page - real-time alerts
- Current weather data
- 5-day forecasts

**How to get it:**

1. Go to [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for free account
3. Go to "API keys" in your account
4. Copy the default API key (or create new one)

**Add to `.env.local`:**
```env
NEXT_PUBLIC_OPENWEATHER_API_KEY=your_openweather_api_key_here
OPENWEATHER_API_KEY=your_openweather_api_key_here
```

**Free Tier:**
- 1,000 API calls per day
- 60 calls per minute
- Current weather + 5-day forecast

---

### 3. OpenAI API (Optional - for AI features)

**What it's used for:**
- AI trip planning
- Chatbot features
- Personalized recommendations

**How to get it:**

1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Sign up and add payment method
3. Go to "API keys" → "Create new secret key"
4. Copy the API key

**Add to `.env.local`:**
```env
OPENAI_API_KEY=your_openai_api_key_here
```

**Pricing:**
- GPT-3.5-turbo: $0.002 per 1K tokens
- GPT-4: $0.03 per 1K tokens

---

## 📝 Complete .env.local File

Create `webapp/.env.local` with:

```env
# Database
MONGODB_URI=mongodb://127.0.0.1:27017/ai-tour-app
JWT_SECRET=supersecretkey

# Google APIs (Required for maps, places, destinations, restaurants)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
GOOGLE_PLACES_API_KEY=your_google_maps_api_key_here

# Weather API (Required for weather alerts)
NEXT_PUBLIC_OPENWEATHER_API_KEY=your_openweather_api_key_here
OPENWEATHER_API_KEY=your_openweather_api_key_here

# OpenAI for AI Trip Planning (Optional)
OPENAI_API_KEY=your_openai_api_key_here

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## 🚀 How to Start

### 1. Install Dependencies (if not already done)

```powershell
cd webapp
npm install axios
```

### 2. Add API Keys

1. Copy the `.env.local` template above
2. Replace `your_*_api_key_here` with your actual API keys
3. Save the file

### 3. Restart Server

```powershell
cd webapp
Remove-Item -Recurse -Force .next
npm run dev
```

### 4. Test Features

Visit these pages to test:
- http://localhost:3000/destinations - Tourist destinations
- http://localhost:3000/weather-alerts - Weather alerts
- http://localhost:3000/foods - Restaurants and famous foods

---

## ✨ Features That Work WITHOUT API Keys

All pages have **intelligent fallback systems**:

1. **Destinations** - 20+ pre-loaded Pakistan destinations
2. **Weather Alerts** - Mock alerts based on weather conditions
3. **Food** - Famous foods database + fallback restaurants
4. **Maps** - Fallback to OpenStreetMap links
5. **Traffic** - Pakistan route database

**The app works 100% without any API keys!**

---

## 🔧 Troubleshooting

### API Key Not Working?

1. **Check the key is correct** - No extra spaces
2. **Restart the server** - Environment variables need restart
3. **Check API is enabled** - In Google Cloud Console
4. **Check billing** - Google requires billing enabled (but won't charge within free tier)
5. **Check quotas** - Make sure you haven't exceeded limits

### Still Using Fallback Data?

Check browser console (F12) for messages like:
- "Google Places API not configured, using fallback"
- "OpenWeather API not configured, using fallback"

This means the API key isn't being read correctly.

---

## 📊 What's Next

### Remaining Pages to Implement:

1. **Hotels Page** - Add real-time booking
2. **Budget Optimizer** - Real calculations
3. **Scenic Routes** - Interactive maps
4. **Buses Page** - Bus routes and schedules
5. **Trip Plan** - Interactive map integration
6. **Dashboard** - Saved trips section

All the infrastructure is ready! Just need to integrate the services.

---

## 💡 Pro Tips

1. **Start with free APIs** - Google and OpenWeather are free
2. **Test fallback first** - Make sure app works without keys
3. **Monitor usage** - Check Google Cloud Console for API usage
4. **Set up alerts** - Get notified when approaching limits
5. **Use environment variables** - Never commit API keys to git

---

**Last Updated:** January 10, 2026
**Status:** 3 pages completed with real-time data
**Next:** Complete remaining 9 pages

