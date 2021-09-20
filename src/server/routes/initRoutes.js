import {
  handleHealthCheck,
  handleGetRuns,
  handleStartRun,
  handleStopZone,
} from '../../handlers';

export function initRoutes(server) {
  server.get('/health', handleHealthCheck);
  server.get('/runs', handleGetRuns);
  server.post('/runs/:zoneId/start', handleStartRun);
  server.post('/zones/:zoneId/stop', handleStopZone);

  return server;
}
