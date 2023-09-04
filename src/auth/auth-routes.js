import { Router } from 'express';
const router = Router();
import { loginService } from './auth-controller.js';

router.post('/', loginService);

export default router; 