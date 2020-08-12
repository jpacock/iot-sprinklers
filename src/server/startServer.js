const { handleHealthCheck } = require('../handlers/handleHealthCheck.js');
const { handleTurnZoneOn } = require('../handlers/handleTurnZoneOn');
const { runZone } = require('../services/runZone.js');

const startServer = () => {
  require('../services/runZone');
  require('dotenv').config();
  const express = require('express');

  const server = express();
  server.use(express.json());

  server.get('/health', (req, res) => handleHealthCheck(req, res));
  server.post('/zones/:zoneId/on', (req, res) => handleTurnZoneOn(req, res));

  const CronJob = require('cron').CronJob;
  const job = new CronJob('0 0 4 * * 3', () => {
    runZone(1, 1200);
  }, null, true, 'America/Chicago');
  job.start();

  server.listen(3000, () =>
    console.log('Server listening on port 3000!'),
  );
};

module.exports = {
  startServer
};
