// user.controller.js
import { getUsers as _getUsers, getUserById as _getUserById, createUser as _createUser, updateUser as _updateUser, deleteUser as _deleteUser } from './user-service.js';

// Retrieve a list of users
async function getUsers(req, res) {
  try {
    const users = await _getUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

// Retrieve a single user by ID
async function getUserById(req, res) {
  const userId = req.params.id;
  try {
    const user = await _getUserById(userId);
    if (!user) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.json(user);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Create a new user
async function createUser(req, res) {
  const newUser = req.body;
  try {
    await _createUser(newUser);
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Update a user by ID
async function updateUser(req, res) {
  const userId = req.params.id;
  const updatedUser = req.body;
  try {
    const result = await _updateUser(userId, updatedUser);
    if (result) {
      res.json({ message: 'User updated successfully' });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Delete a user by ID
async function deleteUser(req, res) {
  const userId = req.params.id;
  try {
    const result = await _deleteUser(userId);
    if (result) {
      res.json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

export {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
