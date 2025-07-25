import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

// Global styles
import './index.css';
import './styles/components.css';
import './styles/responsive.css';
import './styles/animations.css';

// Performance monitoring (optional)
if (import.meta.env.PROD) {
  // Initialize analytics in production
  import('./services/analyticsService').then(({ analyticsService }) => {
    analyticsService.init({
      trackingId: import.meta.env.VITE_GA_TRACKING_ID,
      debug: false
    });
  });
}

// Error handling for unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
  
  // Report to error tracking service in production
  if (import.meta.env.PROD) {
    import('./services/analyticsService').then(({ analyticsService }) => {
      analyticsService.trackError(event.reason, 'unhandled_promise_rejection');
    });
  }
});

// Error handling for uncaught errors
window.addEventListener('error', (event) => {
  console.error('Uncaught error:', event.error);
  
  // Report to error tracking service in production
  if (import.meta.env.PROD) {
    import('./services/analyticsService').then(({ analyticsService }) => {
      analyticsService.trackError(event.error, 'uncaught_error');
    });
  }
});

// Performance observer (optional)
if ('PerformanceObserver' in window) {
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.entryType === 'navigation') {
        console.log('Page load time:', entry.duration);
        
        // Track page performance in production
        if (import.meta.env.PROD) {
          import('./services/analyticsService').then(({ analyticsService }) => {
            analyticsService.trackEvent('page_performance', {
              page_load_time: entry.duration,
              page_path: window.location.pathname
            });
          });
        }
      }
    }
  });
  
  observer.observe({ entryTypes: ['navigation'] });
}

// Service worker registration (optional)
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

// Initialize app
const container = document.getElementById('root');
const root = createRoot(container);

// Render app with error boundary
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Hot module replacement (HMR) for development
if (import.meta.hot) {
  import.meta.hot.accept('./App.jsx', () => {
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  });
}
