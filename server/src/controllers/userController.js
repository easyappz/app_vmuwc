const User = require('@src/models/User');

// Get user profile
exports.getProfile = async (req, res) => {
  try {
    const userId = req.user.userId; // From JWT middleware
    const user = await User.findById(userId).select('-password');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get profile', details: error.message });
  }
};

// Update user profile
exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { firstName, lastName, bio, avatar } = req.body;

    // Check avatar size if provided (limit to 1MB)
    if (avatar) {
      const sizeInBytes = Buffer.from(avatar, 'base64').length;
      if (sizeInBytes > 1024 * 1024) {
        return res.status(400).json({ error: 'Avatar size exceeds 1MB limit' });
      }
    }

    const updateData = { firstName, lastName, bio, updatedAt: Date.now() };
    if (avatar) updateData.avatar = avatar;

    const user = await User.findByIdAndUpdate(userId, updateData, { new: true }).select('-password');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'Profile updated successfully', user });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update profile', details: error.message });
  }
};

// Get user by ID
exports.getUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).select('-password');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get user', details: error.message });
  }
};

// Add friend
exports.addFriend = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { friendId } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const friend = await User.findById(friendId);
    if (!friend) {
      return res.status(404).json({ error: 'Friend not found' });
    }

    if (user.friends.includes(friendId)) {
      return res.status(400).json({ error: 'User is already a friend' });
    }

    user.friends.push(friendId);
    await user.save();

    res.json({ message: 'Friend added successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add friend', details: error.message });
  }
};
