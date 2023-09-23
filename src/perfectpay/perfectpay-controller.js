import {createUserWebhook} from './perfectpay-service.js';
import {sendEmail} from '../providers/email.provider.js';

export async function webhook(req, res, next) {
  try {
    const request = req.body;
    if (request.token !== process.env.PERFECT_KEY) {
      res.status(401).send({data: 'Token inválido'});
      return;
    }
    await createUserWebhook(request);
    sendEmail();
    res.status(200).send({data: 'WebHook tratado com sucesso'});
  } catch (error) {
    next(error);
  }
}