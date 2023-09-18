// seeds/seed_roles.js
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('games')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('games').insert([
        { label: 'Aviator', name: 'aviator' },
        { label: 'mines', name: 'mines' },
        { label: 'Tiger', name: 'tiger' },
        { label: 'Spaceman', name: 'spaceman' },
      ]);
    });
};
