# TourSmart - Professional Tourism Planning App

A beautiful and fully-featured Next.js application for tourism planning with AI-powered suggestions, weather updates, and comprehensive tour management.

## Features

- 🏠 **Beautiful Homepage** with hero section, features, and destinations
- 🗺️ **Smart Trip Planner** with AI suggestions and weather integration
- 📍 **Destinations Gallery** with detailed information and booking options
- 🏨 **Hotel Booking System** with real-time search and filtering
- 🚦 **Live Traffic Updates** with interactive maps and route planning
- 💬 **Feedback System** with star ratings and user reviews
- 👨‍💼 **Admin Dashboard** for managing tours, users, and feedback
- 📱 **Responsive Design** that works on all devices
- 🎨 **Modern UI** with smooth animations and hover effects

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Custom CSS with CSS Variables
- **Icons**: Lucide React
- **Images**: Next.js Image Optimization
- **Deployment**: Ready for Vercel, Netlify, or any hosting platform

## Quick Start

### Prerequisites
- Node.js (version 18 or higher)
- npm or yarn

### Installation Steps

1. **Clone or Download this project**
   ```bash
   git clone [repository-url]
   cd toursmart-app
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start the Development Server**
   ```bash
   npm run dev
   ```

4. **Open in Browser**
   - Navigate to `http://localhost:3000`
   - The app will automatically reload when you make changes

### That's it! 🎉

The application will start automatically and you can begin exploring all the features.

## Available Scripts

- `npm run dev` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm start` - Runs the built app in production mode
- `npm run lint` - Runs ESLint to check for code issues

## Project Structure

```
app/
├── components/
│   └── Header.tsx          # Navigation header
├── page.tsx                # Homepage with hero and features
├── planner/
│   └── page.tsx           # Trip planning with AI suggestions
├── destinations/
│   ├── page.tsx           # Destinations gallery
│   └── [id]/
│       └── page.tsx       # Individual destination details
├── hotels/
│   └── page.tsx           # Hotel search and booking
├── traffic/
│   └── page.tsx           # Traffic updates and route planning
├── feedback/
│   └── page.tsx           # User feedback form
├── admin/
│   └── page.tsx           # Admin dashboard
├── globals.css            # Global styles and CSS variables
└── layout.tsx             # Root layout with header
```

## Key Features Explained

### 🏠 Homepage
- Stunning hero section with call-to-action buttons
- Feature cards explaining the platform benefits
- Featured destinations with ratings and images
- Fully responsive design with modern aesthetics

### 🗺️ Trip Planner
- Interactive form for trip preferences
- AI-powered destination suggestions
- Live weather widget with forecasts
- Vehicle selection options
- Date range picker with validation

### 📍 Destinations
- Beautiful destination cards with high-quality images
- Advanced filtering and search functionality
- Detailed destination pages with itineraries
- Pricing and duration information
- Weather forecasts and nearby hotels

### 🏨 Hotels
- Comprehensive hotel search with multiple filters
- Real-time availability and pricing
- Amenity filtering and sorting options
- Detailed hotel information with reviews
- Responsive grid layout for optimal viewing

### 🚦 Traffic
- Live traffic conditions with color-coded status
- Interactive route planning with alternatives
- Weather alerts and road conditions
- Safety tips and recommendations
- Tabbed interface for different features

### 💬 Feedback System
- Interactive star rating system
- Comprehensive feedback form with validation
- Thank you page with confirmation
- Contact information and response times

### 👨‍💼 Admin Dashboard
- Statistics overview with visual cards
- Tour management with CRUD operations
- User management interface
- Feedback monitoring and analytics
- Responsive sidebar navigation

## Design System

The app uses a comprehensive design system with:

### Colors
- **Primary**: Dark blue (#0F172A)
- **Accent**: Orange (#F97316)
- **Success**: Green (#10B981)
- **Warning**: Yellow (#F59E0B)
- **Error**: Red (#EF4444)

### Typography
- **Font**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700, 800
- **Line Heights**: 150% for body, 120% for headings

### Spacing
- **System**: 8px base unit
- **Consistent**: All margins and paddings follow the 8px grid

### Components
- **Cards**: Elevated surfaces with subtle shadows
- **Buttons**: Multiple variants with hover effects
- **Forms**: Consistent styling with focus states
- **Navigation**: Fixed header with active states

## Customization

### Colors
Update CSS variables in `app/globals.css`:
```css
:root {
  --primary: #0F172A;
  --accent: #F97316;
  /* Add your custom colors */
}
```

### Typography
Modify font imports and CSS variables for typography scales.

### Layout
Adjust container max-widths and breakpoints in the CSS.

## Browser Support

Works in all modern browsers including:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Features

- **Next.js Image Optimization**: Automatic image optimization and lazy loading
- **Code Splitting**: Automatic code splitting for optimal loading
- **CSS Optimization**: Minimal CSS with efficient selectors
- **TypeScript**: Type safety and better development experience

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Netlify
1. Build the project: `npm run build`
2. Deploy the `out` folder to Netlify

### Other Platforms
The app can be deployed to any platform that supports Node.js applications.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions:
- Email: support@toursmart.com
- Documentation: Check the code comments and README
- Issues: Create an issue in the repository

Happy coding! 🚀