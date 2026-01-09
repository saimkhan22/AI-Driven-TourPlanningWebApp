# 🚀 QUICK REFERENCE CARD

## ⚡ INSTANT START

```bash
cd webapp
npm install
npm run dev
```

**Open:** http://localhost:3000

---

## 📁 PROJECT STRUCTURE

```
webapp/
├── app/                    # Next.js 13 App Router
│   ├── page.tsx           # Home page
│   ├── plan-trip/         # Trip planning
│   ├── traffic/           # Traffic monitoring
│   ├── dashboard/         # User dashboard
│   └── api/               # API routes
│       ├── ai/            # AI endpoints
│       ├── traffic/       # Traffic endpoints
│       └── routes/        # Route optimization
├── components/            # React components
│   ├── ui/               # Shadcn UI components
│   └── map/              # Map components
├── lib/                   # Core libraries
│   ├── routeOptimization.ts  # A*, Dijkstra algorithms
│   ├── cache.ts              # Caching system
│   ├── rateLimit.ts          # Rate limiting
│   ├── openaiService.ts      # AI with fallback
│   └── googlePlaces.ts       # Google Maps API
└── public/                # Static assets
```

---

## 🎯 KEY FEATURES

### 1. Route Optimization
**File:** `lib/routeOptimization.ts`
```typescript
import { findOptimalRoute, getAlternativeRoutes } from '@/lib/routeOptimization';

// Find optimal route
const route = findOptimalRoute('Islamabad', 'Lahore', []);

// Get alternatives
const routes = getAlternativeRoutes('Islamabad', 'Lahore');
```

### 2. Caching
**File:** `lib/cache.ts`
```typescript
import { apiCache, createCacheKey } from '@/lib/cache';

// Set cache
const key = createCacheKey('prefix', { param: 'value' });
apiCache.set(key, data, 5 * 60 * 1000); // 5 min

// Get cache
const cached = apiCache.get(key);
```

### 3. Rate Limiting
**File:** `lib/rateLimit.ts`
```typescript
import { apiRateLimiter, getClientIdentifier } from '@/lib/rateLimit';

// Check rate limit
const identifier = getClientIdentifier(request);
if (!apiRateLimiter.isAllowed(identifier)) {
  return new Response('Too many requests', { status: 429 });
}
```

---

## 🔌 API ENDPOINTS

### Trip Planning
```
POST /api/ai/trip-plan
Body: {
  destination: string,
  duration: number,
  budget: number,
  travelers: number,
  interests: string[],
  startDate?: string
}
```

### Route Optimization
```
POST /api/routes/optimize
Body: {
  origin: string,
  destination: string,
  intermediateStops?: string[],
  includeAlternatives?: boolean
}
```

### Traffic Data
```
GET /api/traffic/route?origin=Islamabad&destination=Lahore
```

---

## 🧠 ALGORITHMS

### A* Pathfinding
- **Complexity:** O((V + E) log V)
- **Use:** Optimal path with heuristic
- **Guarantees:** Optimal solution

### Dijkstra's Algorithm
- **Complexity:** O(V²)
- **Use:** Shortest path in weighted graph
- **Guarantees:** Shortest path

### Greedy Best-First
- **Complexity:** O(b^m)
- **Use:** Fast approximation
- **Guarantees:** Fast but may not be optimal

---

## ⚙️ CONFIGURATION

### Environment Variables (.env.local)

**Minimum (App works without these!):**
```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

**Full Configuration:**
```env
# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development

# MongoDB (Optional)
MONGODB_URI=mongodb+srv://...

# NextAuth (Optional)
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=generate-with-openssl

# OpenAI (Optional)
OPENAI_API_KEY=sk-...

# Google Maps (Optional)
GOOGLE_MAPS_API_KEY=...
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=...
```

---

## 🎨 UI COMPONENTS

### Using Shadcn UI
```tsx
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

<Button variant="default">Click Me</Button>
<Card>
  <CardHeader>Title</CardHeader>
  <CardContent>Content</CardContent>
</Card>
<Badge>New</Badge>
```

---

## 📊 PERFORMANCE

### Cache Configuration
```typescript
// API Cache: 100 entries, 5 min
apiCache.set(key, data, 5 * 60 * 1000);

// Route Cache: 50 entries, 5 min
routeCache.set(key, data, 5 * 60 * 1000);

// Trip Plan Cache: 30 entries, 30 min
tripPlanCache.set(key, data, 30 * 60 * 1000);
```

### Rate Limits
```typescript
// API: 100 requests / 15 minutes
apiRateLimiter = new RateLimiter(100, 15 * 60 * 1000);

// Auth: 10 requests / 15 minutes
authRateLimiter = new RateLimiter(10, 15 * 60 * 1000);

// AI: 20 requests / hour
aiRateLimiter = new RateLimiter(20, 60 * 60 * 1000);
```

---

## 🛠️ COMMON COMMANDS

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm start                # Start production server
npm run lint             # Run linter

# Cleanup
rm -rf .next node_modules
npm install

# Port management
PORT=3001 npm run dev    # Use different port
```

---

## 🐛 DEBUGGING

### Check Logs
```bash
# Development: Terminal output
# Production: Vercel/Netlify dashboard
```

### Common Issues

**Port in use:**
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:3000 | xargs kill -9
```

**Build fails:**
```bash
rm -rf .next
npm run build
```

**Module not found:**
```bash
rm -rf node_modules package-lock.json
npm install
```

---

## 📚 DOCUMENTATION FILES

1. **README_FINAL_SUMMARY.md** - Complete overview
2. **ADVANCED_FEATURES_IMPLEMENTED.md** - Feature details
3. **SETUP_AND_DEPLOYMENT_GUIDE.md** - Setup instructions
4. **ROUTE_OPTIMIZATION_ALGORITHMS.md** - Algorithm docs
5. **QUICK_REFERENCE.md** - This file

---

## 🚀 DEPLOYMENT

### Vercel (Recommended)
```bash
npm install -g vercel
cd webapp
vercel
```

### Netlify
```bash
npm install -g netlify-cli
cd webapp
netlify deploy --prod
```

### Docker
```bash
docker build -t tour-app .
docker run -p 3000:3000 tour-app
```

---

## 🎯 TESTING CHECKLIST

- [ ] Home page loads
- [ ] Plan trip form works
- [ ] Trip plan generates (with/without API key)
- [ ] Traffic page shows routes
- [ ] Route optimization displays
- [ ] Dashboard shows trips
- [ ] AI chatbot responds
- [ ] Authentication works
- [ ] All links functional

---

## 📞 QUICK HELP

**App won't start?**
→ `rm -rf node_modules && npm install`

**API errors?**
→ Check `.env.local` file exists

**Slow performance?**
→ Cache is working! First request slow, rest fast

**Rate limited?**
→ Wait 15 minutes or restart server

---

**Happy Coding! 🚀**

