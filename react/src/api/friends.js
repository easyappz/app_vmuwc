import { instance } from './axios';

/**
 * Add a friend
 * @param {Object} data - Friend data
 * @param {string} data.friendId - Friend's user ID
 * @returns {Promise<Object>} - Response data
 */
export const addFriend = async (data) => {
  const response = await instance.post('/api/add-friend', data);
  return response.data;
};
