import { Router } from 'express';
const router = Router();
import { loginService } from './auth-controller.js';

router.post('/login', loginService);

export default router; 