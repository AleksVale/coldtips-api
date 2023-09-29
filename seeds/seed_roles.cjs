// seeds/seed_roles.js
exports.seed = function (knex) {
  if (knex('roles').select('*').length > 0) return Promise.resolve();
  return knex('roles')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('roles').insert([
        { role: 'admin', name: 'Administrador' },
        { role: 'free', name: 'Usuário gratuito' },
        { role: 'premium', name: 'Usuário premium' },
      ]);
    });
};
  