I need you to build a complete backend for my SMM Travel platform - a comprehensive travel booking website for Pakistan tourism. Here are the exact requirements:

## Project Description
Build a Node.js Express backend for SMM Travel, a Pakistani tourism platform that handles hotel bookings, vehicle rentals, destination planning, and traffic insights. The platform covers all major Pakistani destinations including Hunza Valley, Skardu, Swat, Gilgit, Naran Kaghan, Murree, Chitral, Lahore, and Karachi.

## Technology Stack to Use
- **Backend:** Node.js with Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT tokens
- **File Upload:** Multer with local storage (or Cloudinary if you prefer)
- **Validation:** Joi or express-validator
- **Password Hashing:** bcryptjs
- **Email:** Nodemailer
- **Environment:** dotenv
- **CORS:** cors middleware
- **Rate Limiting:** express-rate-limit

## Database Models Needed

### 1. User Model
```javascript
{
  fullName: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  phoneNumber: String,
  userType: String (enum: ['customer', 'hotel_owner', 'vehicle_owner', 'admin']),
  profileImage: String,
  isEmailVerified: Boolean (default: false),
  isPhoneVerified: Boolean (default: false),
  createdAt: Date,
  updatedAt: Date
}
```

### 2. Hotel Model
```javascript
{
  name: String (required),
  description: String,
  location: String (required),
  region: String (required, enum: ['Gilgit-Baltistan', 'Khyber Pakhtunkhwa', 'Punjab', 'Sindh', 'Balochistan']),
  address: String,
  hotelType: String (enum: ['Luxury Resort', 'Mountain Hotel', 'City Hotel', 'Lake Resort', 'Business Hotel']),
  rating: Number (default: 0),
  reviewCount: Number (default: 0),
  pricePerNight: Number (required),
  originalPrice: Number,
  contactPhone: String (required),
  contactEmail: String,
  checkInTime: String,
  checkOutTime: String,
  totalRooms: Number,
  amenities: [String],
  features: [String],
  highlights: [String],
  roomTypes: [String],
  images: [String],
  ownerId: ObjectId (ref: 'User'),
  isActive: Boolean (default: true),
  createdAt: Date,
  updatedAt: Date
}
```

### 3. Vehicle Model
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
  contactEmail: String,
  images: [String],
  rating: Number (default: 0),
  reviewCount: Number (default: 0),
  ownerId: ObjectId (ref: 'User'),
  isAvailable: Boolean (default: true),
  createdAt: Date,
  updatedAt: Date
}
```

### 4. Destination Model
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

### 5. Hotel Booking Model
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
  paymentMethod: String,
  specialRequests: String,
  bookingReference: String (unique),
  createdAt: Date,
  updatedAt: Date
}
```

### 6. Vehicle Booking Model
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
  paymentMethod: String,
  specialRequirements: String,
  bookingReference: String (unique),
  createdAt: Date,
  updatedAt: Date
}
```

### 7. Review Model
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

## API Endpoints to Create

### Authentication Routes (/api/auth)
- POST /register - User registration
- POST /login - User login
- POST /logout - User logout
- GET /profile - Get user profile
- PUT /profile - Update user profile
- POST /forgot-password - Send password reset email
- POST /reset-password - Reset password with token

### Hotel Routes (/api/hotels)
- GET / - Get all hotels with filtering (region, price range, rating, etc.)
- GET /:id - Get single hotel details
- POST / - Create new hotel (hotel owners only)
- PUT /:id - Update hotel (owner/admin only)
- DELETE /:id - Delete hotel (owner/admin only)
- GET /search - Search hotels by location, name, etc.
- GET /regions/:region - Get hotels by specific region
- POST /:id/book - Book a hotel room
- GET /:id/reviews - Get hotel reviews
- POST /:id/reviews - Add hotel review

### Vehicle Routes (/api/vehicles)
- GET / - Get all vehicles with filtering (type, capacity, price, etc.)
- GET /:id - Get single vehicle details
- POST / - Create new vehicle listing (vehicle owners only)
- PUT /:id - Update vehicle (owner/admin only)
- DELETE /:id - Delete vehicle (owner/admin only)
- GET /search - Search vehicles
- GET /categories/:category - Get vehicles by category
- POST /:id/book - Book a vehicle
- GET /:id/reviews - Get vehicle reviews
- POST /:id/reviews - Add vehicle review

### Destination Routes (/api/destinations)
- GET / - Get all destinations
- GET /:id - Get single destination details
- GET /regions/:region - Get destinations by region
- POST / - Create new destination (admin only)
- PUT /:id - Update destination (admin only)
- DELETE /:id - Delete destination (admin only)

### Booking Routes (/api/bookings)
- GET /hotels - Get user's hotel bookings
- GET /vehicles - Get user's vehicle bookings
- GET /:id - Get specific booking details
- PUT /:id/cancel - Cancel a booking
- PUT /:id/confirm - Confirm a booking (admin/owner)

### Admin Routes (/api/admin)
- GET /dashboard - Admin dashboard stats
- GET /users - Get all users
- GET /bookings - Get all bookings
- PUT /users/:id/verify - Verify user accounts
- PUT /bookings/:id/status - Update booking status

## Key Features to Implement

1. **Authentication & Authorization**
   - JWT-based authentication
   - Role-based access control (customer, hotel_owner, vehicle_owner, admin)
   - Password hashing with bcrypt
   - Email verification (optional)

2. **Search & Filtering**
   - Hotel search by location, price range, rating, amenities
   - Vehicle search by type, capacity, price, location
   - Destination search by region, type, budget

3. **Booking System**
   - Hotel room booking with date validation
   - Vehicle rental booking with availability check
   - Booking reference generation
   - Booking status management

4. **Review System**
   - 5-star rating system
   - Text reviews with optional images
   - Review verification system
   - Average rating calculation

5. **File Upload**
   - Image upload for hotels, vehicles, and reviews
   - Image resizing and optimization
   - Multiple image support

6. **Validation & Error Handling**
   - Input validation for all endpoints
   - Proper error responses with status codes
   - Data sanitization

7. **Security Features**
   - Rate limiting for API endpoints
   - CORS configuration
   - Input sanitization
   - SQL injection prevention

## Sample Data to Include

Create sample data for:
- 15+ hotels across different Pakistani regions (Hunza, Skardu, Swat, Gilgit, Lahore, Karachi, etc.)
- 15+ vehicles of different types (cars, SUVs, vans, buses, motorcycles)
- 10+ destinations covering major Pakistani tourist spots
- Sample users with different roles
- Sample bookings and reviews

## Additional Requirements

1. **Environment Variables**
   - MongoDB connection string
   - JWT secret
   - Email service credentials
   - Port configuration

2. **Middleware**
   - Authentication middleware
   - Authorization middleware
   - Error handling middleware
   - Request logging

3. **Utilities**
   - Booking reference generator
   - Email templates
   - Image upload handler
   - Date validation helpers

4. **Documentation**
   - API documentation with example requests/responses
   - Setup instructions
   - Environment configuration guide

Please create a complete, production-ready backend with proper folder structure, error handling, validation, and all the endpoints mentioned above. Include sample data and make sure all CRUD operations work properly for hotels, vehicles, destinations, and bookings.