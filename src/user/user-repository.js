import { knex } from '../database.js';

export class UserRepository {
  static async getUsers() {
    return await knex('users')
      .select('users.id','users.email', 'roles.name as role')
      .join('roles', 'users.role_id', 'roles.id').where('roles.role', '!=', 'admin');    
  }

  // Retrieve a single user by ID
  static async getUser(condition) {
    return await knex('users').where(condition).first();
  }

  // Create a new user
  static async insert(user) {
    return await knex('users').insert(user);
  }

  // Update a user by ID
  static async updateUser(userId, updatedUser) {
    return await knex('users').where({ id: userId }).update(updatedUser);
  }

  // Delete a user by ID
  static async deleteUser(userId) {
    return await knex('users').where({ id: userId }).del();
  }
}