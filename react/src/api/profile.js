import { instance } from './axios';

/**
 * Get user profile
 * @returns {Promise<Object>} - Response data
 */
export const getProfile = async () => {
  const response = await instance.get('/api/profile');
  return response.data;
};

/**
 * Update user profile
 * @param {Object} data - Profile update data
 * @param {string} data.firstName - User's first name
 * @param {string} data.lastName - User's last name
 * @param {string} data.bio - User's bio
 * @param {string} data.avatar - User's avatar URL or base64
 * @returns {Promise<Object>} - Response data
 */
export const updateProfile = async (data) => {
  const response = await instance.put('/api/profile', data);
  return response.data;
};

/**
 * Get user by ID
 * @param {string} userId - User ID
 * @returns {Promise<Object>} - Response data
 */
export const getUserById = async (userId) => {
  const response = await instance.get(`/api/user/${userId}`);
  return response.data;
};
