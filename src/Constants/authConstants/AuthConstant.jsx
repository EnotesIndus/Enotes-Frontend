// User roles
export const USER_ROLES = {
  USER: 'USER',
  ADMIN: 'ADMIN',
};

// Default role for registration
export const DEFAULT_USER_ROLE = [{ role: USER_ROLES.USER }];

// API endpoints
export const AUTH_ENDPOINTS = {
  REGISTER: '/enotes/api/v1/auth/register',
  LOGIN: '/enotes/api/v1/auth/login',
  LOGOUT: '/enotes/api/v1/auth/logout',
  VERIFY: '/enotes/api/v1/auth/verify',
  FORGOT_PASSWORD: '/enotes/api/v1/auth/forgot-password',
  RESET_PASSWORD: '/enotes/api/v1/auth/reset-password',
};


// Password validation regex
export const PASSWORD_REGEX = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/;

// Email validation regex
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Mobile number validation regex (10 digits)
export const MOBILE_REGEX = /^\d{10}$/;