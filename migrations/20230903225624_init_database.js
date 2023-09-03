/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up (knex) {
  return knex.schema
    .createTable('roles', (table) => {
      table.increments('id').primary();
      table.string('role').notNullable();
      table.string('name').notNullable();
    })
    .createTable('users', (table) => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('email').notNullable();
      table.string('password').nullable();
      table
        .integer('role_id') // This column will reference the 'id' column in the 'roles' table
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('roles');
      table.timestamps(true, true);
    });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down (knex) {
  return knex.schema.dropTableIfExists('users').dropTableIfExists('roles');
}
