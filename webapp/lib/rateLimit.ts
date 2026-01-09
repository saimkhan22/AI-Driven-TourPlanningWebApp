/**
 * Rate Limiting for API Routes
 * Prevents abuse and ensures fair usage
 */

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

class RateLimiter {
  private requests: Map<string, RateLimitEntry>;
  private maxRequests: number;
  private windowMs: number;

  constructor(maxRequests: number = 100, windowMs: number = 15 * 60 * 1000) {
    this.requests = new Map();
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
  }

  /**
   * Check if request is allowed
   */
  isAllowed(identifier: string): boolean {
    const now = Date.now();
    const entry = this.requests.get(identifier);

    if (!entry) {
      // First request
      this.requests.set(identifier, {
        count: 1,
        resetTime: now + this.windowMs,
      });
      return true;
    }

    // Check if window has expired
    if (now > entry.resetTime) {
      // Reset window
      this.requests.set(identifier, {
        count: 1,
        resetTime: now + this.windowMs,
      });
      return true;
    }

    // Check if limit exceeded
    if (entry.count >= this.maxRequests) {
      return false;
    }

    // Increment count
    entry.count++;
    return true;
  }

  /**
   * Get remaining requests for identifier
   */
  getRemaining(identifier: string): number {
    const entry = this.requests.get(identifier);
    if (!entry) return this.maxRequests;

    const now = Date.now();
    if (now > entry.resetTime) {
      return this.maxRequests;
    }

    return Math.max(0, this.maxRequests - entry.count);
  }

  /**
   * Get reset time for identifier
   */
  getResetTime(identifier: string): number {
    const entry = this.requests.get(identifier);
    if (!entry) return Date.now() + this.windowMs;

    return entry.resetTime;
  }

  /**
   * Clean up expired entries
   */
  cleanup(): void {
    const now = Date.now();
    for (const [key, entry] of this.requests.entries()) {
      if (now > entry.resetTime) {
        this.requests.delete(key);
      }
    }
  }
}

// Create rate limiters for different endpoints
export const apiRateLimiter = new RateLimiter(100, 15 * 60 * 1000); // 100 requests per 15 minutes
export const authRateLimiter = new RateLimiter(10, 15 * 60 * 1000); // 10 requests per 15 minutes
export const aiRateLimiter = new RateLimiter(20, 60 * 60 * 1000); // 20 requests per hour

// Auto cleanup every 5 minutes
setInterval(() => {
  apiRateLimiter.cleanup();
  authRateLimiter.cleanup();
  aiRateLimiter.cleanup();
}, 5 * 60 * 1000);

/**
 * Get client identifier from request
 */
export function getClientIdentifier(request: Request): string {
  // Try to get IP from headers
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0] : 'unknown';
  
  // You can also use user ID if authenticated
  // const userId = getUserIdFromRequest(request);
  // return userId || ip;
  
  return ip;
}

/**
 * Rate limit middleware for Next.js API routes
 */
export function withRateLimit(
  rateLimiter: RateLimiter = apiRateLimiter
) {
  return async function (
    request: Request,
    handler: () => Promise<Response>
  ): Promise<Response> {
    const identifier = getClientIdentifier(request);

    if (!rateLimiter.isAllowed(identifier)) {
      const resetTime = rateLimiter.getResetTime(identifier);
      const retryAfter = Math.ceil((resetTime - Date.now()) / 1000);

      return new Response(
        JSON.stringify({
          error: 'Too many requests',
          message: 'Rate limit exceeded. Please try again later.',
          retryAfter,
        }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'Retry-After': retryAfter.toString(),
            'X-RateLimit-Limit': rateLimiter['maxRequests'].toString(),
            'X-RateLimit-Remaining': rateLimiter.getRemaining(identifier).toString(),
            'X-RateLimit-Reset': resetTime.toString(),
          },
        }
      );
    }

    // Add rate limit headers to response
    const response = await handler();
    const remaining = rateLimiter.getRemaining(identifier);
    const resetTime = rateLimiter.getResetTime(identifier);

    response.headers.set('X-RateLimit-Limit', rateLimiter['maxRequests'].toString());
    response.headers.set('X-RateLimit-Remaining', remaining.toString());
    response.headers.set('X-RateLimit-Reset', resetTime.toString());

    return response;
  };
}

export default RateLimiter;

