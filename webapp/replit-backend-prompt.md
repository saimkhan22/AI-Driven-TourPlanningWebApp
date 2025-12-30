# SMM Travel Platform - Backend Development Request for Replit

## 🎯 Project Overview
I have built a complete frontend for **SMM Travel** - a comprehensive travel booking platform specifically designed for Pakistan tourism. I need you to create a complete Node.js backend that integrates perfectly with my existing frontend.

## 📱 Frontend Description
My frontend is a **Next.js 13** application with the following pages and features:

### **Main Pages:**
1. **Homepage (/)** - Hero section with Pakistani destinations showcase
2. **Hotels Page (/hotels)** - Hotel search and booking interface
3. **Vehicles Page (/vehicles)** - Vehicle rental booking system
4. **Destinations Page (/destinations)** - AI-powered trip planning
5. **Traffic Page (/traffic)** - Live traffic insights for Pakistani routes
6. **Dashboard Page (/dashboard)** - User dashboard with bookings and stats
7. **Authentication Pages** - Sign in and sign up forms

### **Current Authentication Setup:**
- Using **NextAuth.js** with JWT strategy
- Mock user data in `lib/auth.ts`
- Three user roles: `customer`, `hotel_owner`, `admin`
- Demo accounts already configured

### **Frontend Data Structure:**
The frontend expects specific data formats for:
- **Hotels:** 15+ hotels across Pakistani regions (Hunza, Skardu, Swat, etc.)
- **Vehicles:** Cars, SUVs, vans, buses, motorcycles with Pakistani specifications
- **Destinations:** Major Pakistani tourist spots with AI matching
- **Users:** Different roles with Pakistani contact information

## 🎯 What I Need You to Build

Please create a **complete Node.js Express backend** with **step-by-step instructions** that includes:

### **Step 1: Project Setup**
- Initialize Node.js project with Express
- Install all required dependencies
- Set up folder structure
- Configure environment variables

### **Step 2: Database Setup**
- MongoDB connection setup
- Create all database models/schemas
- Set up database connection middleware

### **Step 3: Authentication System**
- JWT-based authentication
- Password hashing with bcrypt
- User registration and login endpoints
- Role-based authorization middleware

### **Step 4: Core API Endpoints**
Create RESTful APIs for:
- **Users:** Registration, login, profile management
- **Hotels:** CRUD operations, search, filtering
- **Vehicles:** CRUD operations, search, filtering  
- **Destinations:** CRUD operations, AI recommendations
- **Bookings:** Hotel and vehicle booking system
- **Reviews:** Rating and review system

### **Step 5: Data Population**
- Create seed data that matches my frontend
- Pakistani hotels with real locations and details
- Pakistani vehicles with local specifications
- Pakistani destinations with cultural information

## 📊 Required Database Models

### **User Model:**
```javascript
{
  fullName: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  phoneNumber: String,
  userType: String (enum: ['customer', 'hotel_owner', 'vehicle_owner', 'admin']),
  profileImage: String,
  isEmailVerified: Boolean (default: false),
  createdAt: Date,
  updatedAt: Date
}
```

### **Hotel Model:**
```javascript
{
  name: String (required),
  description: String,
  location: String (required),
  region: String (required, enum: ['Gilgit-Baltistan', 'Khyber Pakhtunkhwa', 'Punjab', 'Sindh', 'Balochistan']),
  hotelType: String (enum: ['Luxury Resort', 'Mountain Hotel', 'City Hotel', 'Lake Resort', 'Business Hotel']),
  rating: Number (default: 0),
  reviewCount: Number (default: 0),
  pricePerNight: Number (required),
  originalPrice: Number,
  contactPhone: String (required),
  contactEmail: String,
  checkInTime: String,
  checkOutTime: String,
  amenities: [String],
  highlights: [String],
  roomTypes: [String],
  images: [String],
  ownerId: ObjectId (ref: 'User'),
  isActive: Boolean (default: true),
  createdAt: Date,
  updatedAt: Date
}
```

### **Vehicle Model:**
```javascript
{
  name: String (required),
  vehicleType: String (required),
  category: String (required),
  description: String,
  passengerCapacity: Number (required),
  luggageCapacity: Number,
  transmission: String (enum: ['Manual', 'Automatic']),
  fuelType: String (enum: ['Petrol', 'Diesel', 'CNG']),
  engineSize: String,
  mileage: String,
  pricePerDay: Number (required),
  features: [String],
  bestFor: [String],
  availableLocations: [String],
  contactPhone: String (required),
  images: [String],
  rating: Number (default: 0),
  reviewCount: Number (default: 0),
  ownerId: ObjectId (ref: 'User'),
  isAvailable: Boolean (default: true),
  createdAt: Date,
  updatedAt: Date
}
```

### **Destination Model:**
```javascript
{
  name: String (required),
  region: String (required),
  destinationType: String,
  description: String,
  highlights: [String],
  bestFor: [String],
  estimatedBudget: Number,
  recommendedDuration: String,
  weatherCondition: String,
  temperature: String,
  images: [String],
  aiMatchScore: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### **Hotel Booking Model:**
```javascript
{
  userId: ObjectId (ref: 'User', required),
  hotelId: ObjectId (ref: 'Hotel', required),
  checkInDate: Date (required),
  checkOutDate: Date (required),
  numberOfGuests: Number (required),
  roomType: String,
  totalAmount: Number (required),
  bookingStatus: String (enum: ['pending', 'confirmed', 'cancelled', 'completed'], default: 'pending'),
  paymentStatus: String (enum: ['pending', 'paid', 'refunded'], default: 'pending'),
  bookingReference: String (unique),
  createdAt: Date,
  updatedAt: Date
}
```

### **Vehicle Booking Model:**
```javascript
{
  userId: ObjectId (ref: 'User', required),
  vehicleId: ObjectId (ref: 'Vehicle', required),
  pickupLocation: String (required),
  dropoffLocation: String,
  pickupDate: Date (required),
  returnDate: Date (required),
  numberOfPassengers: Number (required),
  totalAmount: Number (required),
  bookingStatus: String (enum: ['pending', 'confirmed', 'cancelled', 'completed'], default: 'pending'),
  paymentStatus: String (enum: ['pending', 'paid', 'refunded'], default: 'pending'),
  bookingReference: String (unique),
  createdAt: Date,
  updatedAt: Date
}
```

### **Review Model:**
```javascript
{
  userId: ObjectId (ref: 'User', required),
  reviewableType: String (enum: ['Hotel', 'Vehicle'], required),
  reviewableId: ObjectId (required),
  rating: Number (required, min: 1, max: 5),
  reviewText: String,
  images: [String],
  isVerified: Boolean (default: false),
  createdAt: Date,
  updatedAt: Date
}
```

## 🛠 Required API Endpoints

### **Authentication Routes (/api/auth):**
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile
- `POST /api/auth/logout` - User logout

### **Hotel Routes (/api/hotels):**
- `GET /api/hotels` - Get all hotels with filtering (region, price, rating)
- `GET /api/hotels/:id` - Get single hotel details
- `POST /api/hotels` - Create new hotel (hotel owners only)
- `PUT /api/hotels/:id` - Update hotel (owner/admin only)
- `DELETE /api/hotels/:id` - Delete hotel (owner/admin only)
- `POST /api/hotels/:id/book` - Book a hotel room
- `GET /api/hotels/:id/reviews` - Get hotel reviews
- `POST /api/hotels/:id/reviews` - Add hotel review

### **Vehicle Routes (/api/vehicles):**
- `GET /api/vehicles` - Get all vehicles with filtering
- `GET /api/vehicles/:id` - Get single vehicle details
- `POST /api/vehicles` - Create new vehicle (vehicle owners only)
- `PUT /api/vehicles/:id` - Update vehicle (owner/admin only)
- `DELETE /api/vehicles/:id` - Delete vehicle (owner/admin only)
- `POST /api/vehicles/:id/book` - Book a vehicle
- `GET /api/vehicles/:id/reviews` - Get vehicle reviews
- `POST /api/vehicles/:id/reviews` - Add vehicle review

### **Destination Routes (/api/destinations):**
- `GET /api/destinations` - Get all destinations
- `GET /api/destinations/:id` - Get single destination details
- `POST /api/destinations` - Create new destination (admin only)
- `PUT /api/destinations/:id` - Update destination (admin only)

### **Booking Routes (/api/bookings):**
- `GET /api/bookings/hotels` - Get user's hotel bookings
- `GET /api/bookings/vehicles` - Get user's vehicle bookings
- `GET /api/bookings/:id` - Get specific booking details
- `PUT /api/bookings/:id/cancel` - Cancel a booking

## 📋 Step-by-Step Implementation Request

Please provide me with **detailed step-by-step instructions** for:

### **Step 1: Initial Setup**
- Exact commands to run
- Dependencies to install
- Folder structure to create
- Environment file setup

### **Step 2: Database Configuration**
- MongoDB connection setup
- Model creation with Mongoose
- Database initialization

### **Step 3: Authentication Implementation**
- JWT middleware setup
- Password hashing implementation
- Login/register endpoint creation

### **Step 4: API Development**
- Each endpoint implementation
- Request validation
- Error handling
- Response formatting

### **Step 5: Data Seeding**
- Sample data creation scripts
- Database population
- Testing data setup

### **Step 6: Integration Testing**
- How to test each endpoint
- Sample API calls
- Frontend integration steps

## 🇵🇰 Pakistani Context Requirements

### **Sample Data Must Include:**
- **Hotels:** Hunza Serena Inn, Shangrila Resort Skardu, Swat Continental, etc.
- **Vehicles:** Toyota Corolla, Fortuner, Pakistani Coasters, Honda 125cc, etc.
- **Destinations:** Hunza Valley, Skardu, Swat Valley, Lahore, Karachi, etc.
- **Regions:** Gilgit-Baltistan, Khyber Pakhtunkhwa, Punjab, Sindh, Balochistan

### **Pakistani-Specific Features:**
- Pakistani phone number format (+92-xxx-xxxxxxx)
- PKR currency formatting
- Pakistani city and region names
- Local vehicle types (Pakistani Coasters, etc.)
- Cultural considerations

## 🔧 Technical Requirements

### **Technology Stack:**
- **Backend:** Node.js with Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT tokens
- **Validation:** Joi or express-validator
- **Password Hashing:** bcryptjs
- **File Upload:** Multer (for future image uploads)
- **CORS:** cors middleware
- **Environment:** dotenv

### **Code Quality Requirements:**
- Proper error handling
- Input validation
- Security best practices
- Clean code structure
- Comprehensive comments

## 📝 Deliverables Expected

Please provide:

1. **Complete project setup commands**
2. **All backend files with full code**
3. **Database models and schemas**
4. **All API endpoints implemented**
5. **Sample data insertion scripts**
6. **Testing instructions**
7. **Integration guide with my frontend**
8. **Environment configuration guide**

## 🚀 Integration Notes

My frontend is already configured to work with:
- NextAuth.js authentication
- API calls to `/api/*` endpoints
- Pakistani data formats and structures
- Role-based access control

I need the backend to seamlessly integrate with my existing frontend without requiring frontend changes.

---

**Please provide step-by-step instructions and complete code implementation for this backend system. I want to be able to copy-paste your code and have a fully functional backend for my SMM Travel platform.**