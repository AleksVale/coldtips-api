import { knex } from '../database.js';
import bcrypt from 'bcrypt';
import { UserRepository } from './user-repository.js';
import { validateUser } from './validation/createUserSchema.js';
import {BadRequestError} from '../errors/BadRequestError.js';
import { getRole } from '../role/role-service.js';


export async function getUsers() {
  const users = UserRepository.getUsers();
  return users;
}

// Retrieve a single user by ID
export async function getUserById(userId) {
  return UserRepository.getUser({ id: userId });
}

// Create a new user
export async function createUser(user) {
  const existsUser = await UserRepository.getUser({ email: user.email });
  if (existsUser) {
    throw new BadRequestError('User already exists');
  }
  if (user.role === 'admin' && !user.password) {
    throw new BadRequestError('Password is required for admin user');
  }
  validateUser.parse(user);
  const hashedPass = user.password ?  await bcrypt.hash(user.password, 10) : null;
  const role = await getRole(user.role);
  const entity = {
    email: user.email,
    password: hashedPass,
    role_id:  role.id
  };
  return await UserRepository.insert(entity);
}

// Update a user by ID
export async function updateUser(userId, updatedUser) {
  return await knex('users').where({ id: userId }).update(updatedUser);
}

// Delete a user by ID
export async function deleteUser(userId) {
  return await knex('users').where({ id: userId }).del();
}