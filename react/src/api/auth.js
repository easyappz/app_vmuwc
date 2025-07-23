import { instance } from './axios';

/**
 * Register a new user
 * @param {Object} data - Registration data
 * @param {string} data.email - User's email
 * @param {string} data.password - User's password
 * @param {string} data.firstName - User's first name
 * @param {string} data.lastName - User's last name
 * @returns {Promise<Object>} - Response data
 */
export const register = async (data) => {
  const response = await instance.post('/api/register', data);
  return response.data;
};

/**
 * Login a user
 * @param {Object} data - Login data
 * @param {string} data.email - User's email
 * @param {string} data.password - User's password
 * @returns {Promise<Object>} - Response data
 */
export const login = async (data) => {
  const response = await instance.post('/api/login', data);
  return response.data;
};
