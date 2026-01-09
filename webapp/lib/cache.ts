/**
 * Simple in-memory cache for API responses
 * Improves performance by caching frequently accessed data
 */

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  expiresIn: number; // in milliseconds
}

class Cache {
  private cache: Map<string, CacheEntry<any>>;
  private maxSize: number;

  constructor(maxSize: number = 100) {
    this.cache = new Map();
    this.maxSize = maxSize;
  }

  /**
   * Set a value in cache with expiration time
   */
  set<T>(key: string, data: T, expiresIn: number = 5 * 60 * 1000): void {
    // If cache is full, remove oldest entry
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }

    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      expiresIn,
    });
  }

  /**
   * Get a value from cache if it exists and hasn't expired
   */
  get<T>(key: string): T | null {
    const entry = this.cache.get(key);

    if (!entry) {
      return null;
    }

    // Check if expired
    if (Date.now() - entry.timestamp > entry.expiresIn) {
      this.cache.delete(key);
      return null;
    }

    return entry.data as T;
  }

  /**
   * Check if a key exists and is valid
   */
  has(key: string): boolean {
    return this.get(key) !== null;
  }

  /**
   * Delete a specific key
   */
  delete(key: string): void {
    this.cache.delete(key);
  }

  /**
   * Clear all cache
   */
  clear(): void {
    this.cache.clear();
  }

  /**
   * Get cache size
   */
  size(): number {
    return this.cache.size;
  }

  /**
   * Clean up expired entries
   */
  cleanup(): void {
    const now = Date.now();
    for (const [key, entry] of this.cache.entries()) {
      if (now - entry.timestamp > entry.expiresIn) {
        this.cache.delete(key);
      }
    }
  }
}

// Create singleton instances for different cache types
export const apiCache = new Cache(100);
export const routeCache = new Cache(50);
export const tripPlanCache = new Cache(30);

// Auto cleanup every 10 minutes
setInterval(() => {
  apiCache.cleanup();
  routeCache.cleanup();
  tripPlanCache.cleanup();
}, 10 * 60 * 1000);

/**
 * Helper function to create cache key from object
 */
export function createCacheKey(prefix: string, params: Record<string, any>): string {
  const sortedParams = Object.keys(params)
    .sort()
    .map((key) => `${key}=${params[key]}`)
    .join('&');
  return `${prefix}:${sortedParams}`;
}

/**
 * Decorator for caching async functions
 */
export function withCache<T>(
  cache: Cache,
  keyPrefix: string,
  expiresIn: number = 5 * 60 * 1000
) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const cacheKey = createCacheKey(keyPrefix, { args: JSON.stringify(args) });
      
      // Try to get from cache
      const cached = cache.get<T>(cacheKey);
      if (cached !== null) {
        console.log(`Cache hit for ${cacheKey}`);
        return cached;
      }

      // Execute original method
      console.log(`Cache miss for ${cacheKey}`);
      const result = await originalMethod.apply(this, args);
      
      // Store in cache
      cache.set(cacheKey, result, expiresIn);
      
      return result;
    };

    return descriptor;
  };
}

export default Cache;

