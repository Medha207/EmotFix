/**
 * API Configuration
 * Centralizes the base URL logic for the application.
 */

// Use VITE_API_BASE from environment variables, or fallback to the production URL
// For local development, this should be http://localhost:5000 (specified in .env)
export const BASE_URL = import.meta.env.VITE_API_BASE || 'https://emotfix-3.onrender.com';

console.log(`🚀 API Base URL: ${BASE_URL}`);

export default BASE_URL;
