import { Express } from 'express';

import {
  handleHealthCheck,
  // handleGetRuns,
  // handleGetZonesStatus,
  // handleGetZoneStatusStream,
  handleStartRun,
  // handleStopRun,
} from '../../handlers';

export function initRoutes(server: Express, clients: any): Express {
  server.get('/health', handleHealthCheck);

  // server.get('/runs', handleGetRuns);
  server.get('/runs/start', handleStartRun);
  // server.post('/runs/stop', handleStopRun);
  // server.get('/zones/status', handleGetZonesStatus);
  // server.get('/zones/status/stream', handleGetZoneStatusStream);

  return server;
}
