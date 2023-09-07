// user.controller.js
import { ZodError } from 'zod';
import { login } from './auth-service.js';
async function loginService(req, res, next) {
  try {
    const data = await login(req.body); // Call the login function to get the token
    res.json({token: data.token, userRole: data.userRole.role });
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({ error: error });
    } else {
      next(error);
    }
  }
}


export {
  loginService,
};
