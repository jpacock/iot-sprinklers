const { runZone } = require('../services/runZone');

module.exports.handleTurnZoneOn = (req, res) => {
  require('../services/runZone');
  // require('../services/createNewRun');
  const duration = req.body.duration;
  const zoneId = req.params.zoneId;

  runZone(1, duration);

  // createNewRun();
  res.send(`Turned on zone ${zoneId}`);
};
