// user.controller.js
import { ZodError } from 'zod';
import { login } from './auth-service.js';
// Retrieve a list of users
async function loginService(req, res) {
  try {
    const token = await login(req.body); // Call the login function to get the token
    res.json({ token });
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({ error: error });
    } else {
      throw error;
    }
  }
}

export {
  loginService,
};
