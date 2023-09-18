export async function up(knex) {
  return knex.schema.createTable('games', function(table) {
    table.increments('id').primary();
    table.string('label').notNullable();
    table.string('name').notNullable();
  });
}

export async function down(knex) {
  return knex.schema.dropTable('games');
}