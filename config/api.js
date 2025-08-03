// API Configuration for different environments
const API_CONFIG = {
  // Development environment
  development: {
    baseUrl: 'http://localhost:8000'
  },
  // Production environment
  production: {
    baseUrl: 'http://20.57.16.254:8000'
  }
};

// Get current environment
const getEnvironment = () => {
  // Check if we're in a browser environment
  if (typeof window !== 'undefined') {
    // Check if we're on the production domain
    if (window.location.hostname === 'www.jobsmato.com' || window.location.hostname === 'jobsmato.com') {
      return 'production';
    }
    return 'development';
  }
  // In server-side rendering, use NODE_ENV
  return process.env.NODE_ENV || 'development';
};

// Get the appropriate config for current environment
const getApiConfig = () => {
  const env = getEnvironment();
  return API_CONFIG[env] || API_CONFIG.development;
};

// Export the base URL
export const API_BASE_URL = getApiConfig().baseUrl;

// Export the full config for other uses
export const apiConfig = getApiConfig();

// Helper function to build full API URLs
export const buildApiUrl = (endpoint) => {
  const baseUrl = API_BASE_URL;
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${baseUrl}${cleanEndpoint}`;
};

// Common API endpoints
export const API_ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    LOGIN: '/api/v1/auth/login',
    SIGNUP: '/api/v1/auth/signup',
    ME: '/api/v1/auth/me',
    CREATE_USER: '/api/v1/auth/create-user',
    GOOGLE_OAUTH: '/api/v1/auth/google/login',
    RECRUITER_LOGIN: '/api/v1/auth/login/recruiter',
    RECRUITER_SIGNUP: '/api/v1/auth/register/recruiter',
    USER_SIGNUP: '/api/v1/auth/register/user'
  },
  // Candidate endpoints
  CANDIDATES: {
    ONBOARDING: '/api/v1/candidates/onboarding',
    LIST: '/api/v1/candidates/',
    GET_BY_ID: (id) => `/api/v1/candidates/${id}/onboarding`
  },
  // Lead endpoints
  LEADS: {
    LIST: '/api/v1/leads/',
    CREATE: '/api/v1/leads/',
    CHECK_EMAIL: (email) => `/api/v1/leads/check-email/${encodeURIComponent(email)}`
  }
};

export default {
  API_BASE_URL,
  apiConfig,
  buildApiUrl,
  API_ENDPOINTS
}; 