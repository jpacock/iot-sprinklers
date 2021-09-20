const { handleClearWater } = require('../handlers/handleClearWater.js');
const { handleHealthCheck } = require('../handlers/handleHealthCheck.js');
const { handleTurnZoneOn } = require('../handlers/handleTurnZoneOn');
const { runZone } = require('../services/runZone.js');

const startServer = () => {
  require('../services/runZone');
  require('dotenv').config();
  const express = require('express');

  const server = express();
  server.use(express.json());

  server.get('/clearWater', (req, res) => handleClearWater(req, res));

  server.get('/health', (req, res) => handleHealthCheck(req, res));
  server.post('/zones/:zoneId/on', (req, res) => handleTurnZoneOn(req, res));

  const CronJob = require('cron').CronJob;
  const job1 = new CronJob('0 0 5 * * 1,5', () => {
    runZone(1, 2399);
  }, null, true, 'America/Chicago');
  job1.start();

  const job2 = new CronJob('0 40 5 * * 1,5', () => {
    runZone(2, 1799);
  }, null, true, 'America/Chicago');
  job2.start();

  const job3 = new CronJob('0 10 6 * * 1,5', () => {
    runZone(3, 1799);
  }, null, true, 'America/Chicago');
  job3.start();

  const job4 = new CronJob('0 40 6 * * 1,5', () => {
    runZone(4, 1799);
  }, null, true, 'America/Chicago');
  job4.start();

  server.listen(3000, () =>
    console.log('Server listening on port 3000!'),
  );
};

module.exports = {
  startServer
};
