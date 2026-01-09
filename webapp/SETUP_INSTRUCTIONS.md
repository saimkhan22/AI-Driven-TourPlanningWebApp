# 🚀 AI-Driven Tour Planning Web App - Setup Instructions

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16 or higher)
- **MongoDB** (running locally or MongoDB Atlas account)
- **npm** or **yarn** package manager

## 🔑 Required API Keys

You'll need to obtain the following API keys:

### 1. Google Maps & Places API
- Go to [Google Cloud Console](https://console.cloud.google.com/)
- Create a new project or select an existing one
- Enable the following APIs:
  - **Maps JavaScript API**
  - **Places API**
  - **Directions API**
  - **Geocoding API**
- Create credentials (API Key)
- Copy your API key

### 2. OpenWeatherMap API
- Go to [OpenWeatherMap](https://openweathermap.org/api)
- Sign up for a free account
- Navigate to API keys section
- Copy your API key

### 3. OpenAI API
- Go to [OpenAI Platform](https://platform.openai.com/)
- Sign up or log in
- Navigate to API keys
- Create a new API key
- Copy your API key

## ⚙️ Installation Steps

### Step 1: Navigate to the webapp directory
```bash
cd webapp
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Configure Environment Variables
Create or update the `.env.local` file in the `webapp` directory with your API keys:

```env
# MongoDB Configuration
MONGODB_URI=mongodb://127.0.0.1:27017/ai-tour-app
JWT_SECRET=your_super_secret_jwt_key_here

# Google APIs
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
GOOGLE_PLACES_API_KEY=your_google_places_api_key_here

# Weather API
OPENWEATHER_API_KEY=your_openweather_api_key_here

# OpenAI for AI Trip Planning
OPENAI_API_KEY=your_openai_api_key_here

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Step 4: Start MongoDB
If using local MongoDB:
```bash
# Windows
net start MongoDB

# macOS/Linux
sudo systemctl start mongod
```

If using MongoDB Atlas, ensure your connection string is correct in `.env.local`.

### Step 5: Run the Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## 🎯 Features Implemented

### ✅ Real-time Data Integration
- **Hotels**: Google Places API integration for real-time hotel data
- **Weather**: OpenWeatherMap API for current weather and forecasts
- **Traffic**: Google Maps Directions API for live traffic data
- **Location Autocomplete**: Google Places Autocomplete for smart location suggestions

### ✅ AI-Powered Features
- **Trip Planning**: OpenAI GPT-3.5 generates personalized itineraries
- **Smart Recommendations**: AI suggests hotels, restaurants, and activities
- **Budget Optimization**: AI creates plans within your budget
- **Cultural Insights**: Authentic Pakistani travel experiences

### ✅ Authentication & Security
- **JWT-based Authentication**: Secure user sessions
- **Protected Routes**: Middleware protection for sensitive pages
- **Password Hashing**: bcrypt encryption for user passwords
- **Security Headers**: XSS, CSRF, and clickjacking protection
- **Input Validation**: Server-side validation for all inputs

### ✅ Database Integration
- **User Management**: MongoDB user authentication
- **Trip Storage**: Save and retrieve trip plans
- **Booking System**: Hotel and vehicle booking persistence
- **User Dashboard**: View all saved trips and bookings

## 📱 How to Use the App

### 1. Sign Up / Sign In
- Navigate to `/auth/signup` to create an account
- Or use `/auth/signin` to log in

### 2. Explore Features
- **Home Page**: Browse destinations and features
- **Hotels**: Search real-time hotel data by location
- **Vehicles**: Browse available vehicles for rent
- **Traffic**: Check live traffic conditions
- **Destinations**: Explore Pakistani tourist spots

### 3. Plan a Trip (Protected - Requires Login)
- Click "Plan a Trip" button
- Enter destination, duration, budget, and preferences
- AI generates a personalized itinerary
- Save trip to your dashboard

### 4. Dashboard (Protected - Requires Login)
- View all your saved trips
- Access booking history
- Manage your profile

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Hotels
- `GET /api/hotels/search?location={location}` - Search hotels
- `GET /api/hotels/details?placeId={placeId}` - Get hotel details

### Weather
- `GET /api/weather/current?city={city}` - Current weather
- `GET /api/weather/forecast?city={city}` - Weather forecast

### Traffic
- `GET /api/traffic/route?origin={origin}&destination={destination}` - Traffic data

### AI Features
- `POST /api/ai/trip-plan` - Generate AI trip plan
- `POST /api/ai/chat` - AI chatbot responses

### Trips & Bookings
- `POST /api/trips/create` - Create new trip
- `GET /api/trips/my-trips` - Get user's trips
- `POST /api/bookings/create` - Create booking

## 🛡️ Security Features

1. **JWT Authentication**: Secure token-based auth
2. **HTTP-only Cookies**: Prevents XSS attacks
3. **Password Hashing**: bcrypt with salt rounds
4. **Security Headers**: XSS, CSRF, clickjacking protection
5. **Input Validation**: Server-side validation
6. **Protected Routes**: Middleware authentication
7. **Rate Limiting**: (Can be added with express-rate-limit)

## 🚨 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check connection string in `.env.local`
- Verify network access if using MongoDB Atlas

### API Key Errors
- Verify all API keys are correctly set in `.env.local`
- Check API key permissions and quotas
- Ensure billing is enabled for Google Cloud APIs

### Build Errors
- Delete `node_modules` and `.next` folders
- Run `npm install` again
- Clear npm cache: `npm cache clean --force`

## 📞 Support

For issues or questions:
- Check the console for error messages
- Verify all environment variables are set
- Ensure all API keys are valid and have proper permissions

## 🎉 You're All Set!

Your professional, AI-driven tour planning web app is now ready to use!

