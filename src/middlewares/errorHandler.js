import {BadRequestError} from '../errors/BadRequestError.js';
import { ZodError } from 'zod';
import { NotFoundException } from '../errors/NotFoundException.js';


export function errorHandler(err, _req, res, _next) {
  if (err instanceof BadRequestError) {
    res.status(err.status).json({ err: err.message }).end();
  }
  if (err instanceof NotFoundException) {
    res.status(err.status).json({ err: err.message }).end();
  }
  else if (err instanceof ZodError) {
    const errorResponse = {
      err: {
        name: err.constructor.name, // Display the err name
        issues: err.issues.map((issue) => ({
          code: issue.code,
          expected: issue.expected,
          received: issue.received,
          path: issue.path.join('.'),
          message: issue.message,
        })),
      },
    };

    res.status(400).json(errorResponse).end();
  } else {
    res.status(500).json('Internal Server Error').end();
    console.log(err);
  }
}