import setupKnex from 'knex'

export const config = {
  client: 'mysql',
  connection:{
    host: 'localhost',
    port: 3306,
    user: 'root',
    database: 'coldtips'
  }
}

export const knex = setupKnex(config)