import {createUserWebhook} from './perfectpay-service.js';

export async function webhook(req, res, next) {
  try {
    const request = req.body;
    await createUserWebhook(request);
    res.status(200).send({data: 'WebHook tratado com sucesso'});
  } catch (error) {
    next(error);
  }
}