
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.createTable('users', table => {
    table.increments('id').primary()
    table.text('email').notNullable()
    table.text('password').notNullable()
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  knex.schema.dropTableIfExists('users')
}
