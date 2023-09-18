export async function up (knex) {
  return knex.schema.createTable('user_game_history', function (table) {
    table.increments('id').primary();
    table.integer('user_id').unsigned().notNullable().references('id').inTable('users');
    table.integer('game_id').unsigned().notNullable().references('id').inTable('games');
    table.timestamp('played_at').defaultTo(knex.fn.now()); // This will store the timestamp of when the game was played
  });
}

export async function down (knex) {
  return knex.schema.dropTableIfExists('user_game_history');
}
