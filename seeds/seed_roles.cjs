// seeds/seed_roles.js
exports.seed = function (knex) {
  // Deletes ALL existing entries
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
