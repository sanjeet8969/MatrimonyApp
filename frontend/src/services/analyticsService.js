class AnalyticsService {
  constructor() {
    this.isInitialized = false;
    this.events = [];
  }

  // Initialize analytics
  init(config = {}) {
    if (typeof window === 'undefined') return;

    this.config = {
      trackingId: process.env.VITE_GA_TRACKING_ID,
      debug: process.env.NODE_ENV === 'development',
      ...config
    };

    // Initialize Google Analytics if tracking ID is provided
    if (this.config.trackingId && typeof gtag !== 'undefined') {
      gtag('config', this.config.trackingId);
      this.isInitialized = true;
    }

    // Flush any queued events
    this.flushEvents();
  }

  // Track page view
  trackPageView(path, title) {
    const event = {
      type: 'page_view',
      data: {
        page_path: path,
        page_title: title,
        timestamp: new Date().toISOString()
      }
    };

    this.trackEvent(event);
  }

  // Track user action
  trackUserAction(action, category = 'user', label = '', value = 0) {
    const event = {
      type: 'user_action',
      data: {
        event_category: category,
        event_action: action,
        event_label: label,
        value: value,
        timestamp: new Date().toISOString()
      }
    };

    this.trackEvent(event);
  }

  // Track profile interactions
  trackProfileInteraction(action, profileId, additionalData = {}) {
    const event = {
      type: 'profile_interaction',
      data: {
        action,
        profile_id: profileId,
        timestamp: new Date().toISOString(),
        ...additionalData
      }
    };

    this.trackEvent(event);
  }

  // Track search events
  trackSearch(query, filters = {}, resultsCount = 0) {
    const event = {
      type: 'search',
      data: {
        search_term: query,
        filters: filters,
        results_count: resultsCount,
        timestamp: new Date().toISOString()
      }
    };

    this.trackEvent(event);
  }

  // Track match events
  trackMatchEvent(eventType, matchId, additionalData = {}) {
    const event = {
      type: 'match_event',
      data: {
        event_type: eventType, // 'interest_sent', 'interest_received', 'match_created'
        match_id: matchId,
        timestamp: new Date().toISOString(),
        ...additionalData
      }
    };

    this.trackEvent(event);
  }

  // Track messaging events
  trackMessage(eventType, conversationId, additionalData = {}) {
    const event = {
      type: 'message_event',
      data: {
        event_type: eventType, // 'message_sent', 'message_received', 'conversation_started'
        conversation_id: conversationId,
        timestamp: new Date().toISOString(),
        ...additionalData
      }
    };

    this.trackEvent(event);
  }

  // Track subscription events
  trackSubscription(eventType, planType = '', amount = 0) {
    const event = {
      type: 'subscription',
      data: {
        event_type: eventType, // 'upgrade', 'downgrade', 'cancel'
        plan_type: planType,
        amount: amount,
        timestamp: new Date().toISOString()
      }
    };

    this.trackEvent(event);
  }

  // Track errors
  trackError(error, context = '') {
    const event = {
      type: 'error',
      data: {
        error_message: error.message || error,
        error_stack: error.stack || '',
        context: context,
        user_agent: navigator.userAgent,
        timestamp: new Date().toISOString()
      }
    };

    this.trackEvent(event);
  }

  // Generic event tracking
  trackEvent(event) {
    if (!this.isInitialized) {
      this.events.push(event);
      return;
    }

    try {
      // Send to Google Analytics
      if (typeof gtag !== 'undefined') {
        gtag('event', event.type, event.data);
      }

      // Send to custom analytics endpoint
      this.sendToServer(event);

      // Log in development
      if (this.config?.debug) {
        console.log('Analytics Event:', event);
      }
    } catch (error) {
      console.error('Analytics tracking error:', error);
    }
  }

  // Send event to server
  async sendToServer(event) {
    try {
      if (process.env.VITE_ANALYTICS_ENDPOINT) {
        await fetch(process.env.VITE_ANALYTICS_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(event)
        });
      }
    } catch (error) {
      console.error('Failed to send analytics to server:', error);
    }
  }

  // Flush queued events
  flushEvents() {
    if (this.events.length > 0) {
      this.events.forEach(event => this.trackEvent(event));
      this.events = [];
    }
  }

  // Set user properties
  setUserProperties(properties) {
    if (typeof gtag !== 'undefined') {
      gtag('config', this.config.trackingId, {
        custom_map: properties
      });
    }
  }

  // Set user ID
  setUserId(userId) {
    if (typeof gtag !== 'undefined') {
      gtag('config', this.config.trackingId, {
        user_id: userId
      });
    }
  }
}

export const analyticsService = new AnalyticsService();
