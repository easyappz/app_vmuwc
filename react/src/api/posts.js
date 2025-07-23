import { instance } from './axios';

/**
 * Create a new post
 * @param {Object} data - Post data
 * @param {string} data.content - Post content
 * @param {string[]} data.images - Array of image URLs
 */
export const createPost = async (data) => {
  const response = await instance.post('/api/posts', data);
  return response.data;
};

/**
 * Get user feed (posts from friends and self)
 */
export const getFeed = async () => {
  const response = await instance.get('/api/feed');
  return response.data;
};

/**
 * Get user's posts
 * @param {string} userId - User ID
 */
export const getUserPosts = async (userId) => {
  const response = await instance.get(`/api/posts/${userId}`);
  return response.data;
};

/**
 * Like a post
 * @param {string} postId - Post ID
 */
export const likePost = async (postId) => {
  const response = await instance.post(`/api/posts/${postId}/like`);
  return response.data;
};

/**
 * Comment on a post
 * @param {string} postId - Post ID
 * @param {Object} data - Comment data
 * @param {string} data.content - Comment content
 */
export const commentPost = async (postId, data) => {
  const response = await instance.post(`/api/posts/${postId}/comment`, data);
  return response.data;
};
