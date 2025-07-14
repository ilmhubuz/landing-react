// Analytics utilities for lazy loading and performance optimization

// Lazy load Google Tag Manager
export const loadGTM = () => {
  return new Promise<void>((resolve) => {
    if (typeof window !== 'undefined' && !(window as any).gtag) {
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://www.googletagmanager.com/gtm.js?id=GTM-PHD8B8FT';
      script.onload = () => {
        // Initialize GTM
        (window as any).dataLayer = (window as any).dataLayer || [];
        (window as any).gtag = function() {
          (window as any).dataLayer.push(arguments);
        };
        (window as any).gtag('js', new Date());
        (window as any).gtag('config', 'GTM-PHD8B8FT');
        resolve();
      };
      document.head.appendChild(script);
    } else {
      resolve();
    }
  });
};

// Lazy load Yandex Metrika
export const loadYandexMetrika = () => {
  return new Promise<void>((resolve) => {
    if (typeof window !== 'undefined' && !(window as any).ym) {
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://mc.yandex.ru/metrika/tag.js';
      script.onload = () => {
        // Initialize Yandex Metrika
        (window as any).ym = (window as any).ym || function() {
          ((window as any).ym.a = (window as any).ym.a || []).push(arguments);
        };
        (window as any).ym.l = 1 * Date.now();
        (window as any).ym(103274126, 'init', {
          clickmap: true,
          trackLinks: true,
          accurateTrackBounce: true,
          webvisor: true
        });
        resolve();
      };
      document.head.appendChild(script);
    } else {
      resolve();
    }
  });
};

// Initialize analytics with delay for better performance
export const initializeAnalytics = () => {
  // Load analytics after page is fully loaded
  if (typeof window !== 'undefined') {
    const loadAnalytics = () => {
      // Use requestIdleCallback for better performance
      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(() => {
          loadGTM();
          loadYandexMetrika();
        });
      } else {
        // Fallback for browsers without requestIdleCallback
        setTimeout(() => {
          loadGTM();
          loadYandexMetrika();
        }, 2000);
      }
    };

    if (document.readyState === 'complete') {
      loadAnalytics();
    } else {
      window.addEventListener('load', loadAnalytics);
    }
  }
};

// Track page views
export const trackPageView = (page: string) => {
  if (typeof window !== 'undefined') {
    // GTM tracking
    if ((window as any).gtag) {
      (window as any).gtag('config', 'GTM-PHD8B8FT', {
        page_path: page
      });
    }
    
    // Yandex Metrika tracking
    if ((window as any).ym) {
      (window as any).ym(103274126, 'hit', page);
    }
  }
};

// Track custom events
export const trackEvent = (eventName: string, parameters?: any) => {
  if (typeof window !== 'undefined') {
    // GTM event tracking
    if ((window as any).gtag) {
      (window as any).gtag('event', eventName, parameters);
    }
    
    // Yandex Metrika event tracking
    if ((window as any).ym) {
      (window as any).ym(103274126, 'reachGoal', eventName, parameters);
    }
  }
};

// Track form submissions
export const trackFormSubmission = (formName: string, formData?: any) => {
  trackEvent('form_submit', {
    form_name: formName,
    ...formData
  });
};

// Track user interactions
export const trackUserInteraction = (interaction: string, element?: string) => {
  trackEvent('user_interaction', {
    interaction_type: interaction,
    element: element
  });
}; 