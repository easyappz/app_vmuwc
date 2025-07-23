import { instance } from './axios';

/**
 * Get user profile
 */
export const getProfile = async () => {
  const response = await instance.get('/api/profile');
  return response.data;
};

/**
 * Update user profile
 * @param {Object} data - Profile data to update
 * @param {string} data.firstName - User first name
 * @param {string} data.lastName - User last name
 * @param {string} data.bio - User bio
 * @param {string} data.avatar - User avatar URL
 */
export const updateProfile = async (data) => {
  const response = await instance.put('/api/profile', data);
  return response.data;
};

/**
 * Get user by ID
 * @param {string} userId - User ID
 */
export const getUserById = async (userId) => {
  const response = await instance.get(`/api/user/${userId}`);
  return response.data;
};
