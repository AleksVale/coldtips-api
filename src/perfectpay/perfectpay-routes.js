import { Router } from 'express';
const router = Router();
import { webhook } from './perfectpay-controller.js';

router.post('/', webhook);

export default router;
