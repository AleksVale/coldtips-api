import {createHistory} from './games-service.js';
import { GamesRepository } from './games-repository.js';
import { validateBodyCreateGame } from './validation/create-game-history-validation.js';
import { ZodError } from 'zod';
export async function createGameHistory(req, res, next) {
  try {
    const {sub} = req.userInfo;
    validateBodyCreateGame.parse(req.body);
    const { gameName } = req.body;

    const game = await GamesRepository.getGame({name: gameName});
    await createHistory({
      userId: sub,
      gameId: game.id,
    });
    res.json({success: true});
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({ error: error });
    } else {
      next(error);
    }
  }
}

export async function listHistory(req, res, next) {
  try {
    const history = await GamesRepository.listHistory();

    res.json({history});
  } catch (err) {
    next(err);
  }
}