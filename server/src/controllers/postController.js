const Post = require('@src/models/Post');

// Create a new post
exports.createPost = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { content, images } = req.body;

    // Validate images size (limit to 1MB each)
    if (images && images.length > 0) {
      for (const image of images) {
        const sizeInBytes = Buffer.from(image, 'base64').length;
        if (sizeInBytes > 1024 * 1024) {
          return res.status(400).json({ error: 'Image size exceeds 1MB limit' });
        }
      }
    }

    const post = new Post({
      author: userId,
      content,
      images: images || []
    });

    await post.save();

    // Populate author data
    await post.populate('author', '-password');

    res.status(201).json({ message: 'Post created successfully', post });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create post', details: error.message });
  }
};

// Get feed (posts from friends and user)
exports.getFeed = async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const friendIds = user.friends;
    const authorIds = [...friendIds, userId];

    const posts = await Post.find({ author: { $in: authorIds } })
      .sort({ createdAt: -1 })
      .populate('author', '-password')
      .populate('comments.author', '-password');

    res.json({ posts });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get feed', details: error.message });
  }
};

// Get user's posts
exports.getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;

    const posts = await Post.find({ author: userId })
      .sort({ createdAt: -1 })
      .populate('author', '-password')
      .populate('comments.author', '-password');

    res.json({ posts });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get user posts', details: error.message });
  }
};

// Like a post
exports.likePost = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { postId } = req.params;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    if (post.likes.includes(userId)) {
      return res.status(400).json({ error: 'Post already liked' });
    }

    post.likes.push(userId);
    await post.save();

    res.json({ message: 'Post liked successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to like post', details: error.message });
  }
};

// Comment on a post
exports.commentPost = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { postId } = req.params;
    const { content } = req.body;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    post.comments.push({
      author: userId,
      content
    });
    await post.save();

    await post.populate('comments.author', '-password');

    res.json({ message: 'Comment added successfully', post });
  } catch (error) {
    res.status(500).json({ error: 'Failed to comment on post', details: error.message });
  }
};
