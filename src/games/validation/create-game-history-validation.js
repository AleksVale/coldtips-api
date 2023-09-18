import { z } from 'zod';

const allowedGames = ['aviator', 'mines', 'spaceman', 'tiger'];

export const validateBodyCreateGame = z.object({
  gameName: z.enum(allowedGames),
});
