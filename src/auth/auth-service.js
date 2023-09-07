import { UserRepository } from '../user/user-repository.js';
import { BadRequestError } from '../errors/BadRequestError.js';	
import 'dotenv/config';
import bcrypt from 'bcrypt';
import { findRole } from '../role/role-service.js';
import jwt from 'jsonwebtoken';

export async function login(data) {
  const expirationJWT = process.env.JWT_EXPIRES;
  const secretKey = process.env.JWT_SECRET_KEY;
  const user = await UserRepository.getUser({email: data.email});
  if (!user) {
    throw new BadRequestError('Invalid email or password');
  }
  const userRole = await findRole(user.role_id);
  if (userRole.role === 'admin') {
    const validPassword = await bcrypt.compare(data.senha, user.password);
    if (!validPassword) {
      throw new BadRequestError('Invalid email or password');
    }
  }
  const token = await new Promise((resolve, reject) => {
    jwt.sign({sub: user.id, role: userRole.role}, secretKey, {expiresIn: expirationJWT},(err, token) => {
      if (err) {
        reject(err);
      }
      resolve(token);
    });
  });
  return {
    token,
    userRole,
  };
}