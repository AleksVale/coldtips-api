/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.alterTable('users', (table) => {
    table.string('phone_number').nullable().after('email'); // Adds the phone_number column
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  return knex.schema.alterTable('users', (table) => {
    table.dropColumn('phone_number'); // Drops the phone_number column
  });
}
