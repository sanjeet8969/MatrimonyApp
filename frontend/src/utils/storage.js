import { STORAGE_KEYS } from './constants';

// Local Storage utilities with error handling
class Storage {
  // Get item from localStorage
  static get(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Error getting item from localStorage: ${key}`, error);
      return defaultValue;
    }
  }

  // Set item in localStorage
  static set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Error setting item in localStorage: ${key}`, error);
      return false;
    }
  }

  // Remove item from localStorage
  static remove(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error removing item from localStorage: ${key}`, error);
      return false;
    }
  }

  // Clear all localStorage
  static clear() {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error('Error clearing localStorage', error);
      return false;
    }
  }

  // Check if key exists
  static has(key) {
    return localStorage.getItem(key) !== null;
  }

  // Get all keys
  static keys() {
    return Object.keys(localStorage);
  }

  // Get storage size in bytes
  static getSize() {
    let total = 0;
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        total += localStorage[key].length + key.length;
      }
    }
    return total;
  }
}

// Session Storage utilities
class SessionStorage {
  static get(key, defaultValue = null) {
    try {
      const item = sessionStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Error getting item from sessionStorage: ${key}`, error);
      return defaultValue;
    }
  }

  static set(key, value) {
    try {
      sessionStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Error setting item in sessionStorage: ${key}`, error);
      return false;
    }
  }

  static remove(key) {
    try {
      sessionStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error removing item from sessionStorage: ${key}`, error);
      return false;
    }
  }

  static clear() {
    try {
      sessionStorage.clear();
      return true;
    } catch (error) {
      console.error('Error clearing sessionStorage', error);
      return false;
    }
  }

  static has(key) {
    return sessionStorage.getItem(key) !== null;
  }
}

// App-specific storage utilities
export const AppStorage = {
  // Authentication
  getAuthToken: () => Storage.get(STORAGE_KEYS.AUTH_TOKEN),
  setAuthToken: (token) => Storage.set(STORAGE_KEYS.AUTH_TOKEN, token),
  removeAuthToken: () => Storage.remove(STORAGE_KEYS.AUTH_TOKEN),

  getRefreshToken: () => Storage.get(STORAGE_KEYS.REFRESH_TOKEN),
  setRefreshToken: (token) => Storage.set(STORAGE_KEYS.REFRESH_TOKEN, token),
  removeRefreshToken: () => Storage.remove(STORAGE_KEYS.REFRESH_TOKEN),

  // User data
  getUserData: () => Storage.get(STORAGE_KEYS.USER_DATA),
  setUserData: (userData) => Storage.set(STORAGE_KEYS.USER_DATA, userData),
  removeUserData: () => Storage.remove(STORAGE_KEYS.USER_DATA),

  // Theme
  getTheme: () => Storage.get(STORAGE_KEYS.THEME, 'light'),
  setTheme: (theme) => Storage.set(STORAGE_KEYS.THEME, theme),

  // Language
  getLanguage: () => Storage.get(STORAGE_KEYS.LANGUAGE, 'en'),
  setLanguage: (language) => Storage.set(STORAGE_KEYS.LANGUAGE, language),

  // Search filters
  getSearchFilters: () => Storage.get(STORAGE_KEYS.SEARCH_FILTERS, {}),
  setSearchFilters: (filters) => Storage.set(STORAGE_KEYS.SEARCH_FILTERS, filters),
  removeSearchFilters: () => Storage.remove(STORAGE_KEYS.SEARCH_FILTERS),

  // Clear all app data
  clearAll: () => {
    const keysToRemove = Object.values(STORAGE_KEYS);
    keysToRemove.forEach(key => Storage.remove(key));
  }
};

// Cache utilities with expiration
export const CacheStorage = {
  set: (key, data, expirationInMinutes = 60) => {
    const expirationTime = new Date().getTime() + (expirationInMinutes * 60 * 1000);
    const cacheData = {
      data,
      expiration: expirationTime
    };
    return Storage.set(`cache_${key}`, cacheData);
  },

  get: (key) => {
    const cacheData = Storage.get(`cache_${key}`);
    
    if (!cacheData) {
      return null;
    }

    const now = new Date().getTime();
    if (now > cacheData.expiration) {
      Storage.remove(`cache_${key}`);
      return null;
    }

    return cacheData.data;
  },

  remove: (key) => {
    return Storage.remove(`cache_${key}`);
  },

  clear: () => {
    const keys = Storage.keys();
    const cacheKeys = keys.filter(key => key.startsWith('cache_'));
    cacheKeys.forEach(key => Storage.remove(key));
  },

  // Clean expired cache entries
  cleanExpired: () => {
    const keys = Storage.keys();
    const cacheKeys = keys.filter(key => key.startsWith('cache_'));
    const now = new Date().getTime();

    cacheKeys.forEach(key => {
      const cacheData = Storage.get(key);
      if (cacheData && now > cacheData.expiration) {
        Storage.remove(key);
      }
    });
  }
};

export { Storage, SessionStorage };
export default Storage;
