import { instance } from './axios';

/**
 * Register a new user
 * @param {Object} data - Registration data
 * @param {string} data.email - User email
 * @param {string} data.password - User password
 * @param {string} data.firstName - User first name
 * @param {string} data.lastName - User last name
 */
export const register = async (data) => {
  const response = await instance.post('/api/register', data);
  return response.data;
};

/**
 * Login a user
 * @param {Object} data - Login data
 * @param {string} data.email - User email
 * @param {string} data.password - User password
 */
export const login = async (data) => {
  const response = await instance.post('/api/login', data);
  return response.data;
};
