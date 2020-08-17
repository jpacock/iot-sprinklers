const { runZone } = require('../services/runZone');

const handleClearWater = (req, res) => {
  require('../services/runZone');

  runZone(1, 10);

  res.send(`Cleared system.`);
};

module.exports = {
  handleClearWater
};
