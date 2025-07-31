import axios from "axios";

// Determine the API base URL based on the environment.
// In development, it will default to 'http://localhost:5000/api'.
// In production (after deployment to Netlify/Vercel), you will set
// the REACT_APP_API_BASE_URL environment variable to your deployed backend URL.
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000/api";

const API = axios.create({
  baseURL: API_BASE_URL,
});

// Axios interceptor to automatically attach the authorization token
// This runs before every request made using this API instance.
API.interceptors.request.use((req) => {
  // Retrieve the token from localStorage
  const token = localStorage.getItem("token");
  // If a token exists, set the Authorization header with a Bearer token
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  // Return the modified request configuration
  return req;
});

export default API;
