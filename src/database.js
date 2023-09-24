import 'dotenv/config';
import setupKnex from 'knex';

export const config = {
  client: process.env.DATABASE_CLIENT || 'mysql2',
  connection:{
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    password: process.env.DATABASE_PASSWORD,
    user: process.env.DATABASE_USER,
    database: process.env.DATABASE
  }
};

export const knex = setupKnex(config);