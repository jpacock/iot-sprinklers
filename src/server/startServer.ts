import { Request, Response } from 'express';

import { 
  handleHealthCheck,
  handleTurnZoneOn
} from '../handlers';

export function startServer(): void {
  const express = require('express');

  const server = express();
  server.use(express.json());

  server.get('/health', handleHealthCheck);
  server.post('/zones/:zoneId/on', handleTurnZoneOn);

  server.listen(3000, () =>
    console.log('Server listening on port 3000!'),
  );
}
