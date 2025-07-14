// Performance monitoring utilities for Core Web Vitals and page performance

interface PerformanceMetrics {
  fcp?: number; // First Contentful Paint
  lcp?: number; // Largest Contentful Paint  
  fid?: number; // First Input Delay
  cls?: number; // Cumulative Layout Shift
  ttfb?: number; // Time to First Byte
  domContentLoaded?: number;
  windowLoad?: number;
}

// Store performance metrics
let performanceMetrics: PerformanceMetrics = {};

// Initialize performance monitoring
export function initPerformanceMonitoring() {
  // Check if Performance Observer is supported
  if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
    observeWebVitals();
    observeNavigationTiming();
  }
}

// Observe Core Web Vitals
function observeWebVitals() {
  try {
    // First Contentful Paint
    const fcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const fcpEntry = entries.find(entry => entry.name === 'first-contentful-paint');
      if (fcpEntry) {
        performanceMetrics.fcp = fcpEntry.startTime;
        reportMetric('FCP', fcpEntry.startTime);
      }
    });
    fcpObserver.observe({ entryTypes: ['paint'] });

    // Largest Contentful Paint
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      performanceMetrics.lcp = lastEntry.startTime;
      reportMetric('LCP', lastEntry.startTime);
    });
    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

    // First Input Delay
    const fidObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry: any) => {
        if (entry.processingStart && entry.startTime) {
          const fid = entry.processingStart - entry.startTime;
          performanceMetrics.fid = fid;
          reportMetric('FID', fid);
        }
      });
    });
    fidObserver.observe({ entryTypes: ['first-input'] });

    // Cumulative Layout Shift
    let clsValue = 0;
    const clsObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry: any) => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      });
      performanceMetrics.cls = clsValue;
      reportMetric('CLS', clsValue);
    });
    clsObserver.observe({ entryTypes: ['layout-shift'] });

  } catch (error) {
    console.warn('Performance monitoring not fully supported:', error);
  }
}

// Observe navigation timing
function observeNavigationTiming() {
  window.addEventListener('load', () => {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    
    if (navigation) {
      performanceMetrics.ttfb = navigation.responseStart - navigation.requestStart;
      performanceMetrics.domContentLoaded = navigation.domContentLoadedEventEnd - navigation.fetchStart;
      performanceMetrics.windowLoad = navigation.loadEventEnd - navigation.fetchStart;
      
      reportMetric('TTFB', performanceMetrics.ttfb);
      reportMetric('DOM Content Loaded', performanceMetrics.domContentLoaded);
      reportMetric('Window Load', performanceMetrics.windowLoad);
    }
  });
}

// Report metric to analytics
function reportMetric(name: string, value: number) {
  // Report to Google Analytics if available
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'timing_complete', {
      name: name,
      value: Math.round(value)
    });
  }
  
  // Report to Yandex Metrika if available
  if (typeof window !== 'undefined' && (window as any).ym) {
    (window as any).ym(103274126, 'params', {
      [`performance_${name.toLowerCase().replace(/\s+/g, '_')}`]: Math.round(value)
    });
  }
  
  // Log to console in development
  if (import.meta.env.DEV) {
    console.log(`Performance Metric - ${name}: ${Math.round(value)}ms`);
  }
}

// Get all performance metrics
export function getPerformanceMetrics(): PerformanceMetrics {
  return { ...performanceMetrics };
}

// Performance score calculation
export function calculatePerformanceScore(): number {
  const { fcp, lcp, fid, cls } = performanceMetrics;
  
  if (!fcp || !lcp || fid === undefined || cls === undefined) {
    return 0;
  }
  
  // Scoring based on Google's thresholds
  const fcpScore = fcp <= 1800 ? 100 : fcp <= 3000 ? 50 : 0;
  const lcpScore = lcp <= 2500 ? 100 : lcp <= 4000 ? 50 : 0;
  const fidScore = fid <= 100 ? 100 : fid <= 300 ? 50 : 0;
  const clsScore = cls <= 0.1 ? 100 : cls <= 0.25 ? 50 : 0;
  
  return Math.round((fcpScore + lcpScore + fidScore + clsScore) / 4);
}

// Resource loading performance
export function monitorResourceLoading() {
  window.addEventListener('load', () => {
    const resources = performance.getEntriesByType('resource');
    
    const slowResources = resources.filter(resource => 
      resource.duration > 1000 // Resources taking more than 1 second
    );
    
    if (slowResources.length > 0) {
      console.warn('Slow loading resources:', slowResources);
      
      // Report slow resources to analytics
      slowResources.forEach(resource => {
        reportMetric('Slow Resource', resource.duration);
      });
    }
  });
}

// Memory usage monitoring
export function monitorMemoryUsage() {
  if ('memory' in performance) {
    const memoryInfo = (performance as any).memory;
    
    const memoryUsage = {
      used: memoryInfo.usedJSHeapSize,
      total: memoryInfo.totalJSHeapSize,
      limit: memoryInfo.jsHeapSizeLimit
    };
    
    // Report memory usage if it's getting high
    const usagePercentage = (memoryUsage.used / memoryUsage.limit) * 100;
    
    if (usagePercentage > 80) {
      console.warn('High memory usage detected:', memoryUsage);
      reportMetric('Memory Usage', usagePercentage);
    }
    
    return memoryUsage;
  }
  
  return null;
}

// Connection quality monitoring
export function monitorConnectionQuality() {
  if ('connection' in navigator) {
    const connection = (navigator as any).connection;
    
    const connectionInfo = {
      effectiveType: connection.effectiveType,
      downlink: connection.downlink,
      rtt: connection.rtt,
      saveData: connection.saveData
    };
    
    // Adjust behavior based on connection quality
    if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
      // Disable heavy animations or reduce image quality
      document.body.classList.add('low-bandwidth');
    }
    
    // Report connection quality
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'connection_quality', {
        effective_type: connection.effectiveType,
        downlink: connection.downlink,
        rtt: connection.rtt
      });
    }
    
    return connectionInfo;
  }
  
  return null;
}

// Initialize all performance monitoring
export function initAllPerformanceMonitoring() {
  initPerformanceMonitoring();
  monitorResourceLoading();
  
  // Monitor memory usage every 30 seconds
  setInterval(monitorMemoryUsage, 30000);
  
  // Monitor connection quality
  monitorConnectionQuality();
}

// Performance budget alerts
export function checkPerformanceBudget() {
  const score = calculatePerformanceScore();
  
  if (score < 50) {
    console.warn('Performance budget exceeded! Score:', score);
    
    // Send alert to analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'performance_budget_exceeded', {
        score: score,
        metrics: performanceMetrics
      });
    }
  }
  
  return score;
} 