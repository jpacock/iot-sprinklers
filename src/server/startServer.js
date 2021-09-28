import cors from 'cors';
import express from 'express';

// import { getPrograms } from '../data-access/maria/programs';
import { initRoutes } from './routes';

export async function startServer() {
  const server = express();
  server.use(cors());
  server.use(express.json());

  initRoutes(server);

  server.listen(3000, () =>
    console.log('Server listening on port 3000!'),
  );
};

// module.exports = {
//   startServer
// };
