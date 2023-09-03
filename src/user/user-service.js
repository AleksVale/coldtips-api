import { knex } from "../database.js";


export async function getUsers() {
  return await knex('users').select('*');
}

// Retrieve a single user by ID
export async function getUserById(userId) {
  return await knex('users').where({ id: userId }).first();
}

// Create a new user
export async function createUser(user) {
  return await knex('users').insert(user);
}

// Update a user by ID
export async function updateUser(userId, updatedUser) {
  return await knex('users').where({ id: userId }).update(updatedUser);
}

// Delete a user by ID
export async function deleteUser(userId) {
  return await knex('users').where({ id: userId }).del();
}