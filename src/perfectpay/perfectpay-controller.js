import {createUserWebhook} from './perfectpay-service.js';

export async function webhook(req, res, next) {
  try {
    const request = req.body;
    await createUserWebhook(request);
    res.status(200).send();
  } catch (error) {
    next(error);
  }
}