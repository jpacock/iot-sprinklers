const healthCheckHandler = require('../handlers/handleHealthCheck.js')
const handleZoneTurnOnHandler = require ('../handlers/handleTurnZoneOn');
const { runZone } = require('../services/runZone.js');

module.exports.startServer = () => {
  require('../services/runZone');
  require('dotenv').config()
  const express = require('express');

  const server = express();
  server.use(express.json());

  server.get('/health', healthCheckHandler.handleHealthCheck);
  server.post('/zones/:zoneId/on', handleZoneTurnOnHandler.handleTurnZoneOn);

  const CronJob = require('cron').CronJob;
  const job = new CronJob('0 * * * * *', () => {
    runZone(1, 30);
  }, null, true, 'America/Chicago');
  job.start();

  server.listen(3000, () =>
    console.log('Server listening on port 3000!'),
  );
}
