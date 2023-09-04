import { RoleRepository } from './role-repository.js';

export async function getRoles() {
  const roles = RoleRepository.getRoles();
  return roles;
}

// Retrieve a single user by ID
export async function getRole(role) {
  return RoleRepository.getRole({ role });
}

export async function findRole(id) {
  return RoleRepository.getRole({ id });
}