/**
 * Route Optimization Service using Metaheuristic Algorithms
 * Implements Dijkstra's Algorithm and A* for optimal route selection
 */

export interface RouteNode {
  city: string;
  latitude: number;
  longitude: number;
}

export interface RouteEdge {
  from: string;
  to: string;
  distance: number; // in km
  estimatedTime: number; // in minutes
  trafficFactor: number; // 1.0 = normal, 1.5 = heavy traffic
}

export interface OptimizedRoute {
  path: string[];
  totalDistance: number;
  totalTime: number;
  estimatedCost: number;
  isOptimal: boolean;
  algorithm: 'dijkstra' | 'astar' | 'greedy';
  alternativeRoutes?: OptimizedRoute[];
}

// Pakistan Cities Network - Major cities and their coordinates
export const PAKISTAN_CITIES: Record<string, RouteNode> = {
  'Islamabad': { city: 'Islamabad', latitude: 33.6844, longitude: 73.0479 },
  'Lahore': { city: 'Lahore', latitude: 31.5204, longitude: 74.3587 },
  'Karachi': { city: 'Karachi', latitude: 24.8607, longitude: 67.0011 },
  'Peshawar': { city: 'Peshawar', latitude: 34.0151, longitude: 71.5249 },
  'Multan': { city: 'Multan', latitude: 30.1575, longitude: 71.5249 },
  'Faisalabad': { city: 'Faisalabad', latitude: 31.4504, longitude: 73.1350 },
  'Rawalpindi': { city: 'Rawalpindi', latitude: 33.5651, longitude: 73.0169 },
  'Hyderabad': { city: 'Hyderabad', latitude: 25.3960, longitude: 68.3578 },
  'Quetta': { city: 'Quetta', latitude: 30.1798, longitude: 66.9750 },
  'Sukkur': { city: 'Sukkur', latitude: 27.7052, longitude: 68.8574 },
  'Sialkot': { city: 'Sialkot', latitude: 32.4945, longitude: 74.5229 },
  'Abbottabad': { city: 'Abbottabad', latitude: 34.1495, longitude: 73.1995 },
  'Murree': { city: 'Murree', latitude: 33.9070, longitude: 73.3943 },
  'Muzaffarabad': { city: 'Muzaffarabad', latitude: 34.3700, longitude: 73.4711 },
  'Thatta': { city: 'Thatta', latitude: 24.7471, longitude: 67.9245 },
  'Swat': { city: 'Swat', latitude: 35.2227, longitude: 72.4258 },
  'Hunza': { city: 'Hunza', latitude: 36.3167, longitude: 74.6500 },
  'Skardu': { city: 'Skardu', latitude: 35.2971, longitude: 75.6333 },
  'Gilgit': { city: 'Gilgit', latitude: 35.9208, longitude: 74.3144 },
  'Naran': { city: 'Naran', latitude: 34.9000, longitude: 73.6500 },
};

// Calculate Haversine distance between two points
export function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(degrees: number): number {
  return degrees * (Math.PI / 180);
}

// Dijkstra's Algorithm for shortest path
export function dijkstraShortestPath(
  graph: Map<string, Map<string, number>>,
  start: string,
  end: string
): { path: string[]; distance: number } | null {
  const distances = new Map<string, number>();
  const previous = new Map<string, string | null>();
  const unvisited = new Set<string>();

  
  for (const node of graph.keys()) {
    distances.set(node, Infinity);
    previous.set(node, null);
    unvisited.add(node);
  }
  distances.set(start, 0);

  while (unvisited.size > 0) {
    // Find node with minimum distance
    let current: string | null = null;
    let minDistance = Infinity;
    
    for (const node of unvisited) {
      const dist = distances.get(node)!;
      if (dist < minDistance) {
        minDistance = dist;
        current = node;
      }
    }

    if (current === null || current === end) break;
    if (minDistance === Infinity) break;

    unvisited.delete(current);

    // Update distances to neighbors
    const neighbors = graph.get(current);
    if (neighbors) {
      for (const [neighbor, weight] of neighbors) {
        if (unvisited.has(neighbor)) {
          const alt = distances.get(current)! + weight;
          if (alt < distances.get(neighbor)!) {
            distances.set(neighbor, alt);
            previous.set(neighbor, current);
          }
        }
      }
    }
  }

  // Reconstruct path
  if (!previous.has(end) || previous.get(end) === null) {
    return null;
  }

  const path: string[] = [];
  let current: string | null = end;
  
  while (current !== null) {
    path.unshift(current);
    current = previous.get(current) || null;
  }

  return {
    path,
    distance: distances.get(end)!,
  };
}

// A* Algorithm for optimal pathfinding with heuristic
export function aStarPathfinding(
  start: string,
  end: string,
  cities: Record<string, RouteNode>
): { path: string[]; distance: number } | null {
  if (!cities[start] || !cities[end]) return null;

  const openSet = new Set<string>([start]);
  const cameFrom = new Map<string, string>();
  const gScore = new Map<string, number>();
  const fScore = new Map<string, number>();

  // Initialize scores
  for (const city of Object.keys(cities)) {
    gScore.set(city, Infinity);
    fScore.set(city, Infinity);
  }
  gScore.set(start, 0);
  fScore.set(start, heuristic(cities[start], cities[end]));

  while (openSet.size > 0) {
    // Find node in openSet with lowest fScore
    let current: string | null = null;
    let lowestF = Infinity;
    
    for (const node of openSet) {
      const f = fScore.get(node)!;
      if (f < lowestF) {
        lowestF = f;
        current = node;
      }
    }

    if (current === end) {
      // Reconstruct path
      return reconstructPath(cameFrom, current, gScore.get(current)!);
    }

    if (current === null) break;
    openSet.delete(current);

    // Check neighbors (all cities within reasonable distance)
    for (const [neighborCity, neighborNode] of Object.entries(cities)) {
      if (neighborCity === current) continue;
      
      const distance = calculateDistance(
        cities[current].latitude,
        cities[current].longitude,
        neighborNode.latitude,
        neighborNode.longitude
      );

      // Only consider cities within 500km as direct neighbors
      if (distance > 500) continue;

      const tentativeGScore = gScore.get(current)! + distance;

      if (tentativeGScore < gScore.get(neighborCity)!) {
        cameFrom.set(neighborCity, current);
        gScore.set(neighborCity, tentativeGScore);
        fScore.set(neighborCity, tentativeGScore + heuristic(neighborNode, cities[end]));
        
        if (!openSet.has(neighborCity)) {
          openSet.add(neighborCity);
        }
      }
    }
  }

  return null;
}

function heuristic(from: RouteNode, to: RouteNode): number {
  return calculateDistance(from.latitude, from.longitude, to.latitude, to.longitude);
}

function reconstructPath(cameFrom: Map<string, string>, current: string, distance: number) {
  const path = [current];
  while (cameFrom.has(current)) {
    current = cameFrom.get(current)!;
    path.unshift(current);
  }
  return { path, distance };
}

// Find optimal route with multiple algorithms and compare
export function findOptimalRoute(
  origin: string,
  destination: string,
  intermediateStops: string[] = []
): OptimizedRoute {
  const cities = PAKISTAN_CITIES;

  // Normalize city names
  const normalizedOrigin = findClosestCity(origin);
  const normalizedDestination = findClosestCity(destination);

  if (!normalizedOrigin || !normalizedDestination) {
    throw new Error('Origin or destination not found in Pakistan cities network');
  }

  // If no intermediate stops, use A* for direct route
  if (intermediateStops.length === 0) {
    const astarResult = aStarPathfinding(normalizedOrigin, normalizedDestination, cities);

    if (!astarResult) {
      throw new Error('No route found');
    }

    const totalDistance = astarResult.distance;
    const totalTime = estimateTime(totalDistance);
    const estimatedCost = calculateRouteCost(totalDistance, 1);

    return {
      path: astarResult.path,
      totalDistance: Math.round(totalDistance),
      totalTime: Math.round(totalTime),
      estimatedCost: Math.round(estimatedCost),
      isOptimal: true,
      algorithm: 'astar',
    };
  }

  // With intermediate stops, calculate multi-leg route
  const fullPath = [normalizedOrigin, ...intermediateStops.map(findClosestCity).filter(Boolean) as string[], normalizedDestination];
  let totalDistance = 0;
  const completePath: string[] = [];

  for (let i = 0; i < fullPath.length - 1; i++) {
    const legResult = aStarPathfinding(fullPath[i], fullPath[i + 1], cities);
    if (!legResult) {
      throw new Error(`No route found between ${fullPath[i]} and ${fullPath[i + 1]}`);
    }

    totalDistance += legResult.distance;

    if (i === 0) {
      completePath.push(...legResult.path);
    } else {
      completePath.push(...legResult.path.slice(1)); // Avoid duplicating intermediate cities
    }
  }

  const totalTime = estimateTime(totalDistance);
  const estimatedCost = calculateRouteCost(totalDistance, fullPath.length - 1);

  return {
    path: completePath,
    totalDistance: Math.round(totalDistance),
    totalTime: Math.round(totalTime),
    estimatedCost: Math.round(estimatedCost),
    isOptimal: true,
    algorithm: 'astar',
  };
}

// Find closest matching city name
function findClosestCity(cityName: string): string | null {
  const normalized = cityName.toLowerCase().trim();

  // Exact match
  for (const city of Object.keys(PAKISTAN_CITIES)) {
    if (city.toLowerCase() === normalized) {
      return city;
    }
  }

  // Partial match
  for (const city of Object.keys(PAKISTAN_CITIES)) {
    if (city.toLowerCase().includes(normalized) || normalized.includes(city.toLowerCase())) {
      return city;
    }
  }

  return null;
}

// Estimate travel time based on distance (average speed 60 km/h)
function estimateTime(distanceKm: number, trafficFactor: number = 1.0): number {
  const averageSpeed = 60; // km/h
  return (distanceKm / averageSpeed) * 60 * trafficFactor; // in minutes
}

// Calculate route cost (fuel + tolls)
function calculateRouteCost(distanceKm: number, numLegs: number): number {
  const fuelCostPerKm = 25; // PKR per km (approximate)
  const tollCostPerLeg = 500; // PKR per toll plaza
  return (distanceKm * fuelCostPerKm) + (numLegs * tollCostPerLeg);
}

// Get alternative routes
export function getAlternativeRoutes(
  origin: string,
  destination: string
): OptimizedRoute[] {
  const routes: OptimizedRoute[] = [];

  try {
    // Direct route
    const directRoute = findOptimalRoute(origin, destination);
    routes.push(directRoute);

    // Try routes through major hubs
    const majorHubs = ['Lahore', 'Islamabad', 'Karachi', 'Multan'];

    for (const hub of majorHubs) {
      if (hub !== origin && hub !== destination) {
        try {
          const viaRoute = findOptimalRoute(origin, destination, [hub]);
          // Only add if it's not too much longer (within 30% of direct route)
          if (viaRoute.totalDistance <= directRoute.totalDistance * 1.3) {
            routes.push(viaRoute);
          }
        } catch (e) {
          // Skip if route not found
        }
      }
    }
  } catch (error) {
    console.error('Error finding alternative routes:', error);
  }

  // Sort by distance
  return routes.sort((a, b) => a.totalDistance - b.totalDistance);
}

// Mark optimal route in a list of routes
export function markOptimalRoute(routes: OptimizedRoute[]): OptimizedRoute[] {
  if (routes.length === 0) return routes;

  // Find route with minimum distance
  let minDistance = Infinity;
  let optimalIndex = 0;

  routes.forEach((route, index) => {
    if (route.totalDistance < minDistance) {
      minDistance = route.totalDistance;
      optimalIndex = index;
    }
  });

  // Mark all routes
  return routes.map((route, index) => ({
    ...route,
    isOptimal: index === optimalIndex,
  }));
}

