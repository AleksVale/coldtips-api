import { Router } from 'express';
const router = Router();
import { getUsers, getUserById, createUser, updateUser, deleteUser,changeStatus } from './user-controller.js';

// Define user routes
router.get('/', getUsers);
router.patch('/:id/change-status', changeStatus);
router.get('/:id', getUserById);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router; 