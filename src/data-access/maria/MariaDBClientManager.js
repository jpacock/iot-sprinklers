import knex from 'knex';

export function getDB() {
  const server = knex({
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      port: 3306,
      user: 'sprinkler',
      password: 'raspi',
      database: 'sprinklerdb',
    },
  });

  return server;
};
