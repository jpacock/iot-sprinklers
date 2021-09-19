const { runZone } = require('../services/runZone');

const handleTurnZoneOn = (req, res) => {
  require('../services/runZone');
  const duration = req.body.duration;
  const zoneId = req.params.zoneId;

  runZone(zoneId, duration);

  // createNewRun();
  res.send(`Turned on zone ${zoneId}`);
};

module.exports = {
  handleTurnZoneOn
};
