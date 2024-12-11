import axios from 'axios';

// Base URL for API calls
// const BASE_URL = 'http://localhost:8080/user';
// USING .env to get URL dynamically
const BASE_URL = process.env.REACT_APP_API_URL + '/user';

/**
 * Login user
 * @param {Object} credentials - Contains username and password
 * @returns {Promise<Object>} - The logged-in user's data
 */
export const login = async (authHeader) => {
  try {
    const response = await axios.get(`${BASE_URL}/login`, {
      headers: {
        'Authorization': authHeader, // Add Authorization header
        'Content-Type': 'application/json',
      },
      withCredentials: true, // Include cookies if needed
    });
    return response.data; // Successfully logged in user data
  } catch (error) {
    // Extract and throw error message for user feedback
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};

/**
Register a new user
 * @param {Object} userData - Contains username, email, and password
 * @returns {Promise<Object>} - The newly created user's data
 */
export const createUser = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/create`, userData);
    return response.data; // Successfully registered user data
  } catch (error) {
    // Extract and throw error message for user feedback
    throw new Error(error.response?.data?.message || 'Registration failed');
  }
};
