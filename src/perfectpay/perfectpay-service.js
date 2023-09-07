import { UserRepository } from '../user/user-repository.js';
import { getRole } from '../role/role-service.js';
const SalesStatusEnum = {
  0: 'none',
  1: 'pending', // boleto pendente
  2: 'approved', // venda aprovada boleto ou cartão
  3: 'in_process', // em revisão manual
  4: 'in_mediation', // em moderação
  5: 'rejected', // rejeitado
  6: 'cancelled', // cancelado do cartão
  7: 'refunded', // devolvido
  8: 'authorized', // autorizada
  9: 'charged_back', // solicitado charge back
  10: 'completed', // 30 dias após a venda aprovada
  11: 'checkout_error', // erro durante checkout
  12: 'precheckout', // abandono
  13: 'expired', // boleto expirado
  16: 'in_review', // em análise
};

export async function createUserWebhook(body) {
  const numberSale = body.sale_status_enum;
  const userEmail = body.customer.email;
  const sale = SalesStatusEnum[numberSale];
  const phoneNumber = body.customer.phone_area_code + body.customer.phone_number;
  const roleAdmin = await getRole('premium');
  const roleFree = await getRole('free');
  const existingUser = await getUser(userEmail);
  if (sale === 'approved' || sale === 'authorized') {
    const entity = {
      email: userEmail,
      role_id: roleAdmin.id,
      phone_number: phoneNumber,
    };
    existingUser ? await UserRepository.updateUser(existingUser.id, entity) : await UserRepository.insert(entity);
  } else if (sale === 'refunded' || sale === 'charged_back') {
    const entity = {
      email: userEmail,
      role_id: roleFree.id,
      phone_number: phoneNumber,
    };
    if (existingUser) await UserRepository.updateUser(existingUser.id, entity);
  }
}

async function getUser(email) {
  const user = await UserRepository.getUser({ email });
  return user;
}