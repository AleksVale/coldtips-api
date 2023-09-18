import { knex } from '../database.js';

export class GamesRepository {
  static async getGame(condition) {
    return knex('games')
      .where(condition)
      .first();
  }

  static async createGameHistory({userId, gameId}) {
    return knex('user_game_history')
      .insert({
        user_id: userId,
        game_id: gameId,
      });
  }

  static async listHistory() {
    return knex('user_game_history')
      .select('user_game_history.id', 'games.label', 'users.email', 'user_game_history.played_at')
      .join('games', 'games.id', '=', 'user_game_history.game_id')
      .join('users', 'users.id', '=', 'user_game_history.user_id');
  }
}