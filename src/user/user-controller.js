// user.controller.js
import { ZodError } from 'zod';
import { getUsers as _getUsers, getUserById as _getUserById, createUser as _createUser, updateUser as _updateUser, deleteUser as _deleteUser, changeUserStatus } from './user-service.js';
import { getRole } from '../role/role-service.js';
import { validateUpdateStatus } from './validation/createUserSchema.js';
// Retrieve a list of users
async function getUsers(req, res,next) {
  try {
    if (req.userInfo.role !== 'admin') {
      res.status(401).json({ error: 'Usuário não autorizado' });
    } else {
      const users = await _getUsers();
      res.json({ users });
    }
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({ error: error });
    } else {
      next(error);
    }
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
    if (error instanceof ZodError) {
      res.status(400).json({ error: error });
    } else {
      throw error;
    }
  }
}

// Create a new user
async function createUser(req, res, next) {
  try {
    const newUser = req.body;
    await _createUser(newUser);
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    next(error);
  }
}

// Update a user by ID
async function updateUser(req, res, next) {
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
    if (error instanceof ZodError) {
      res.status(400).json({ error: error.errors });
    } else {
      next(error);
    }
  }
}

async function changeStatus(req, res,next) {
  try {
    const userId = parseInt(req.params.id, 10);
    const role = req.body.role;
  
    // Validate the parameters
    const validatedRole = validateUpdateStatus.parse(role);
    const user = await _getUserById(userId);
    if (!userId || !user) {
      return res.status(404).json({ error: 'ID and role are required' }).end();
    }
    const newRole = await getRole(validatedRole);
    const result = await changeUserStatus(userId, newRole.id);
    if (result) {
      res.json({ message: 'User updated successfully' });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({ error: error });
    } else {
      next(error);
    }
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
    if (error instanceof ZodError) {
      res.status(400).json({ error: error });
    } else {
      throw error;
    }
  }
}

export {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  changeStatus
};
