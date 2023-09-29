import { knex } from '../database.js';
import bcrypt from 'bcrypt';
import { UserRepository } from './user-repository.js';
import { validateUser } from './validation/createUserSchema.js';
import {BadRequestError} from '../errors/BadRequestError.js';
import { getRole } from '../role/role-service.js';


export async function getUsers({roleName, email}) {
  const users = UserRepository.getUsers({roleName, email});
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
    name: user.name,
    email: user.email,
    phone_number: user.phone,
    password: hashedPass,
    role_id:  role.id,
  };
  return await UserRepository.insert(entity);
}

// Update a user by ID
export async function updateUser(userId, updatedUser) {
  return await UserRepository.updateUser(userId, updatedUser);
}

export async function changeUserStatus(userId, role) {
  return await UserRepository.updateUser(userId, {role_id: role});
}

// Delete a user by ID
export async function deleteUser(userId) {
  return await knex('users').where({ id: userId }).del();
}