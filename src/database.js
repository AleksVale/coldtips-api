import 'dotenv/config';
import setupKnex from 'knex';

export const config = {
  client: process.env.DATABASE_CLIENT || 'mysql',
  connection:{
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    password: process.env.DATABASE_PASSWORD,
    user: process.env.DATABASE_USER,
    database: process.env.DATABASE
  },
  acquireConnectionTimeout: 1000000,
  pool: {
    min: 0,
    max: 1,
    acquireTimeoutMillis: 300000,
    createTimeoutMillis: 300000,
    destroyTimeoutMillis: 300000,
    idleTimeoutMillis: 30000,
    reapIntervalMillis:1000,
    createRetryIntervalMillis: 2000
  },
};

export const knex = setupKnex(config);