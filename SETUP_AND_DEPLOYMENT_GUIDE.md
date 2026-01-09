# 🚀 COMPLETE SETUP & DEPLOYMENT GUIDE

## 📋 TABLE OF CONTENTS
1. [Prerequisites](#prerequisites)
2. [Local Development Setup](#local-development-setup)
3. [Environment Configuration](#environment-configuration)
4. [Running the Application](#running-the-application)
5. [Production Deployment](#production-deployment)
6. [Testing](#testing)
7. [Troubleshooting](#troubleshooting)

---

## ✅ PREREQUISITES

### Required Software:
- **Node.js** 18.x or higher ([Download](https://nodejs.org/))
- **npm** or **yarn** (comes with Node.js)
- **Git** ([Download](https://git-scm.com/))

### Optional (for enhanced features):
- **MongoDB** account ([MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- **OpenAI API Key** ([OpenAI Platform](https://platform.openai.com/))
- **Google Maps API Key** ([Google Cloud Console](https://console.cloud.google.com/))

---

## 🛠️ LOCAL DEVELOPMENT SETUP

### Step 1: Clone the Repository
```bash
cd Desktop/AI-Driven-TourPlanningWebApp
```

### Step 2: Install Dependencies
```bash
cd webapp
npm install
```

This will install all required packages including:
- Next.js 13.5.1
- React 18.2.0
- Tailwind CSS
- Radix UI components
- OpenAI SDK
- Google Maps Services
- MongoDB/Mongoose
- NextAuth.js
- And 60+ other dependencies

### Step 3: Verify Installation
```bash
npm list --depth=0
```

You should see all packages listed without errors.

---

## 🔐 ENVIRONMENT CONFIGURATION

### Step 1: Create Environment File

Create a `.env.local` file in the `webapp` directory:

```bash
cd webapp
# On Windows PowerShell:
New-Item .env.local

# On Mac/Linux:
touch .env.local
```

### Step 2: Add Environment Variables

**MINIMUM CONFIGURATION (App works without API keys!):**
```env
# App will use intelligent fallback systems
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

**FULL CONFIGURATION (Recommended for production):**
```env
# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development

# MongoDB (Optional - for user data persistence)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/tourplanning?retryWrites=true&w=majority

# NextAuth (Optional - for authentication)
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here-generate-with-openssl

# OpenAI (Optional - for enhanced AI features)
OPENAI_API_KEY=sk-your-openai-api-key-here

# Google Maps (Optional - for live traffic & maps)
GOOGLE_MAPS_API_KEY=your-google-maps-api-key-here
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-google-maps-api-key-here
```

### Step 3: Generate Secrets

**Generate NEXTAUTH_SECRET:**
```bash
# On Windows PowerShell:
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# On Mac/Linux:
openssl rand -hex 32
```

---

## 🚀 RUNNING THE APPLICATION

### Development Mode

```bash
cd webapp
npm run dev
```

The app will start at: **http://localhost:3000**

### Build for Production

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

---

## 🌐 PRODUCTION DEPLOYMENT

### Option 1: Vercel (Recommended - Easiest)

1. **Install Vercel CLI:**
```bash
npm install -g vercel
```

2. **Login to Vercel:**
```bash
vercel login
```

3. **Deploy:**
```bash
cd webapp
vercel
```

4. **Add Environment Variables:**
   - Go to Vercel Dashboard
   - Select your project
   - Settings → Environment Variables
   - Add all variables from `.env.local`

5. **Redeploy:**
```bash
vercel --prod
```

### Option 2: Netlify

1. **Install Netlify CLI:**
```bash
npm install -g netlify-cli
```

2. **Login:**
```bash
netlify login
```

3. **Deploy:**
```bash
cd webapp
netlify deploy --prod
```

### Option 3: Docker

1. **Create Dockerfile** (in webapp directory):
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

2. **Build Image:**
```bash
docker build -t tour-planning-app .
```

3. **Run Container:**
```bash
docker run -p 3000:3000 --env-file .env.local tour-planning-app
```

---

## 🧪 TESTING

### Test the Application

1. **Homepage:** http://localhost:3000
2. **Plan Trip:** http://localhost:3000/plan-trip
3. **Traffic:** http://localhost:3000/traffic
4. **Dashboard:** http://localhost:3000/dashboard

### Test Features:

#### 1. Trip Planning (Works WITHOUT API keys!)
- Go to "Plan Trip"
- Fill in: Destination, Duration, Budget, Travelers
- Click "Generate AI Trip Plan"
- Should see detailed itinerary (uses fallback if no OpenAI key)

#### 2. Route Optimization
- Go to "Traffic"
- Click any popular route (e.g., "Islamabad → Lahore")
- Should see 3 optimized routes with:
  - Distance, time, cost
  - Optimal route marked with ⭐
  - Complete route path

#### 3. Traffic Monitoring
- Go to "Traffic"
- Enter origin and destination
- Click "Check Traffic"
- Should see Google Maps with directions

---

## 🔧 TROUBLESHOOTING

### Issue: "Module not found" errors

**Solution:**
```bash
cd webapp
rm -rf node_modules package-lock.json
npm install
```

### Issue: Port 3000 already in use

**Solution:**
```bash
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux:
lsof -ti:3000 | xargs kill -9
```

Or use a different port:
```bash
PORT=3001 npm run dev
```

### Issue: Build fails

**Solution:**
```bash
# Clear Next.js cache
rm -rf .next

# Rebuild
npm run build
```

### Issue: API errors in production

**Check:**
1. Environment variables are set in deployment platform
2. API keys are valid and have correct permissions
3. Check deployment logs for specific errors

---

## 📊 PERFORMANCE OPTIMIZATION

### Enable Caching (Already Implemented!)
- ✅ API responses cached for 5-30 minutes
- ✅ Route calculations cached for 10 minutes
- ✅ Trip plans cached for 30 minutes

### Enable Rate Limiting (Already Implemented!)
- ✅ API: 100 requests / 15 minutes
- ✅ AI: 20 requests / hour
- ✅ Auth: 10 requests / 15 minutes

### Monitor Performance:
```bash
# Check build size
npm run build

# Analyze bundle
npm install -g @next/bundle-analyzer
ANALYZE=true npm run build
```

---

## 🎯 NEXT STEPS AFTER DEPLOYMENT

1. **Add Custom Domain** (Vercel/Netlify)
2. **Enable Analytics** (Vercel Analytics, Google Analytics)
3. **Set up Monitoring** (Sentry, LogRocket)
4. **Add SSL Certificate** (Automatic on Vercel/Netlify)
5. **Configure CDN** (Automatic on Vercel/Netlify)

---

## 📞 SUPPORT

### Common Commands:

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint

# Clear cache
rm -rf .next node_modules
npm install
```

---

## ✅ DEPLOYMENT CHECKLIST

- [ ] All dependencies installed (`npm install`)
- [ ] Environment variables configured
- [ ] App runs locally (`npm run dev`)
- [ ] Build succeeds (`npm run build`)
- [ ] All features tested
- [ ] API keys added (optional)
- [ ] Deployment platform chosen
- [ ] Environment variables added to platform
- [ ] App deployed successfully
- [ ] Production URL tested
- [ ] Custom domain configured (optional)

---

**Your app is ready for production! 🚀**

For issues or questions, check the logs:
- Development: Terminal output
- Production: Vercel/Netlify dashboard logs

