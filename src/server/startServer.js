const healthCheckHandler = require('../handlers/handleHealthCheck.js')
const handleZoneTurnOnHandler = require ('../handlers/handleTurnZoneOn');

module.exports.startServer = () => {
  const express = require('express');

  const server = express();
  server.use(express.json());

  server.get('/health', healthCheckHandler.handleHealthCheck);
  server.post('/zones/:zoneId/on', handleZoneTurnOnHandler.handleTurnZoneOn);

  server.listen(3000, () =>
    console.log('Server listening on port 3000!'),
  );
}
