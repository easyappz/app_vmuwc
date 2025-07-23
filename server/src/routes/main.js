const express = require('express');
const authController = require('@src/controllers/authController');
const userController = require('@src/controllers/userController');
const postController = require('@src/controllers/postController');
const authMiddleware = require('@src/middleware/auth');

const router = express.Router();

// Auth routes
router.post('/register', authController.register);
router.post('/login', authController.login);

// User routes
router.get('/profile', authMiddleware, userController.getProfile);
router.put('/profile', authMiddleware, userController.updateProfile);
router.get('/user/:userId', userController.getUserById);
router.post('/add-friend', authMiddleware, userController.addFriend);

// Post routes
router.post('/posts', authMiddleware, postController.createPost);
router.get('/feed', authMiddleware, postController.getFeed);
router.get('/posts/:userId', userController.getUserById);
router.post('/posts/:postId/like', authMiddleware, postController.likePost);
router.post('/posts/:postId/comment', authMiddleware, postController.commentPost);

// Basic routes
router.get('/hello', (req, res) => {
  res.json({ message: 'Hello from API!' });
});

router.get('/status', (req, res) => {
  res.json({ 
    status: 'ok',
    timestamp: new Date().toISOString()
  });
});

module.exports = router;
