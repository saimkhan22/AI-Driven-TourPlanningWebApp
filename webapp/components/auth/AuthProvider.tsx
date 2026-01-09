'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Try to load cached user data first for instant UI
    const cachedUser = localStorage.getItem('cachedUser');
    if (cachedUser) {
      try {
        setUser(JSON.parse(cachedUser));
        setLoading(false);
      } catch (e) {
        // Invalid cache, continue with normal flow
      }
    }

    // Then verify with server
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/me', {
        // Add cache control for faster subsequent requests
        cache: 'no-cache',
      });
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        // Cache user data for instant loading
        localStorage.setItem('cachedUser', JSON.stringify(data.user));
        // Store user name in localStorage for dashboard
        if (data.user?.name) {
          localStorage.setItem('userName', data.user.name);
        }
      } else {
        // Clear cache if auth fails
        localStorage.removeItem('cachedUser');
        setUser(null);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      localStorage.removeItem('cachedUser');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || 'Login failed');
    }

    const data = await response.json();
    setUser(data.user);
    // Cache user data for instant loading
    localStorage.setItem('cachedUser', JSON.stringify(data.user));
    if (data.user?.name) {
      localStorage.setItem('userName', data.user.name);
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || 'Signup failed');
    }

    const data = await response.json();
    setUser(data.user);
    // Cache user data for instant loading
    localStorage.setItem('cachedUser', JSON.stringify(data.user));
    if (data.user?.name) {
      localStorage.setItem('userName', data.user.name);
    }
  };

  const logout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    setUser(null);
    // Clear all cached data
    localStorage.removeItem('cachedUser');
    localStorage.removeItem('userName');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
}