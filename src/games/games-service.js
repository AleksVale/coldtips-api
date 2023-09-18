import { GamesRepository } from './games-repository.js';

export async function createHistory({userId, gameId}) {
  return GamesRepository.createGameHistory({ userId, gameId });
}