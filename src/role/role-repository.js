import { knex } from '../database.js';

export class RoleRepository {
  static async getRoles() {
    return await knex('roles').select('*');
  }

  // Retrieve a single user by ID
  static async getRole(condition) {
    return await knex('roles').where(condition).first();
  }
}