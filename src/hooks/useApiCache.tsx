import { useState, useEffect, useCallback } from 'react';
import axios, { AxiosRequestConfig } from 'axios';

// Cache storage
const apiCache = new Map<string, { data: any; timestamp: number; expiry: number }>();

// Default cache expiry (5 minutes)
const DEFAULT_CACHE_EXPIRY = 5 * 60 * 1000;

interface UseApiCacheOptions {
  cacheKey: string;
  cacheExpiry?: number;
  enabled?: boolean;
}

export function useApiCache<T>(
  url: string,
  options: UseApiCacheOptions & AxiosRequestConfig
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { cacheKey, cacheExpiry = DEFAULT_CACHE_EXPIRY, enabled = true, ...axiosConfig } = options;

  const fetchData = useCallback(async (force = false) => {
    if (!enabled) return;

    // Check cache first
    const cached = apiCache.get(cacheKey);
    const now = Date.now();

    if (!force && cached && now < cached.timestamp + cached.expiry) {
      setData(cached.data);
      setLoading(false);
      return cached.data;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await axios.get<T>(url, {
        headers: { 'Content-Type': 'application/json' },
        ...axiosConfig
      });

      // Cache the response
      apiCache.set(cacheKey, {
        data: response.data,
        timestamp: now,
        expiry: cacheExpiry
      });

      setData(response.data);
      setLoading(false);
      return response.data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      setLoading(false);
      throw err;
    }
  }, [url, cacheKey, cacheExpiry, enabled, axiosConfig]);

  const clearCache = useCallback(() => {
    apiCache.delete(cacheKey);
  }, [cacheKey]);

  const refreshData = useCallback(() => {
    return fetchData(true);
  }, [fetchData]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    refetch: refreshData,
    clearCache
  };
}

// Hook for locations with caching
export function useCachedLocations() {
  return useApiCache<any[]>('https://api.crm.ilmhub.uz/api/locations', {
    cacheKey: 'locations',
    cacheExpiry: 10 * 60 * 1000, // 10 minutes cache
  });
}

// Hook for courses with caching
export function useCachedCourses() {
  return useApiCache<any[]>('https://api.crm.ilmhub.uz/api/courses', {
    cacheKey: 'courses',
    cacheExpiry: 10 * 60 * 1000, // 10 minutes cache
  });
}

// Hook for course types with caching
export function useCachedCourseTypes() {
  return useApiCache<any[]>('https://api.crm.ilmhub.uz/api/courses/types', {
    cacheKey: 'courseTypes',
    cacheExpiry: 15 * 60 * 1000, // 15 minutes cache
  });
}

// Utility function to clear all caches
export function clearAllApiCaches() {
  apiCache.clear();
}

// Utility function to get cache statistics
export function getCacheStats() {
  const stats = {
    size: apiCache.size,
    entries: Array.from(apiCache.entries()).map(([key, value]) => ({
      key,
      timestamp: value.timestamp,
      expiry: value.expiry,
      expired: Date.now() > value.timestamp + value.expiry
    }))
  };
  return stats;
} 