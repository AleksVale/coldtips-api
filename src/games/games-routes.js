import { Router } from 'express';
const router = Router();
import { listHistory, createGameHistory } from './games-controller.js';

// Define user routes
router.get('/', listHistory);
router.post('/', createGameHistory);
export default router; 