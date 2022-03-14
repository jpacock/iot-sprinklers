import cors from 'cors';
import express from 'express';

import { initRoutes } from './routes';
import { configureZones } from '../rpi';

const clients = [];

export async function startServer() {
  const server = express();
  server.use(cors());
  server.use(express.json());

  initRoutes(server);
  configureZones();

  server.listen(3000, () =>
    console.log('Server listening on port 3000!'),
  );
};
