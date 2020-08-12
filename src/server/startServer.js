const healthCheckHandler = require('../handlers/handleHealthCheck.js')
const handleZoneTurnOnHandler = require ('../handlers/handleTurnZoneOn');

module.exports.startServer = () => {
  require('dotenv').config()
  const express = require('express');

  const server = express();
  server.use(express.json());

  server.get('/health', healthCheckHandler.handleHealthCheck);
  server.post('/zones/:zoneId/on', handleZoneTurnOnHandler.handleTurnZoneOn);

  const CronJob = require('cron').CronJob;
  const job = new CronJob('0,1,2,3 * * * * *', () => {
    console.log('Run water');
  }, null, true, 'America/Chicago');
  job.start();

  server.listen(3000, () =>
    console.log('Server listening on port 3000!'),
  );
}
