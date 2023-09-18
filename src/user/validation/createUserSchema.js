import { z } from 'zod';

const allowedRoles = ['admin', 'free', 'premium'];

export const validateUser = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(100).optional(),
  role: z.enum(['admin', 'free', 'premium']),
});

export const validateUpdateStatus = z.enum(allowedRoles);
