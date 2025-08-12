export const CONSTANTS = {
  // API endpoints
  API_ENDPOINTS: {
    SOURCES: '/api/sources',
    SOURCE_BY_ID: (id: string) => `/api/sources/${id}`,
  },
  
  // Validation
  VALIDATION: {
    YEAR: {
      MIN: 1000,
      MAX: new Date().getFullYear() + 1,
    },
    TITLE: {
      MIN_LENGTH: 1,
      MAX_LENGTH: 500,
    },
    URL: {
      MAX_LENGTH: 2048,
    },
  },
  
  // UI
  UI: {
    TOAST_DURATION: 4000,
    LOADING_DELAY: 300, // Minimum loading time to prevent flickering
  },
  
  // Table
  TABLE: {
    ITEMS_PER_PAGE: 50,
    SORT_DIRECTIONS: {
      ASC: 'asc',
      DESC: 'desc',
    } as const,
  },
} as const;

export const ERROR_MESSAGES = {
  FETCH_FAILED: 'Failed to load sources',
  UPDATE_FAILED: 'Update failed',
  VALIDATION_FAILED: 'Validation failed',
  NETWORK_ERROR: 'Network error occurred',
  UNKNOWN_ERROR: 'An unexpected error occurred',
} as const;

export const SUCCESS_MESSAGES = {
  SOURCE_UPDATED: 'Source updated successfully!',
} as const;
