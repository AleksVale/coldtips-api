import 'dotenv/config'
import setupKnex from 'knex'

export const config = {
  client: process.env.DATABASE_CLIENT || 'mysql',
  connection:{
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
  }
}

export const knex = setupKnex(config)