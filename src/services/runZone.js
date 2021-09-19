const { turnOn } = require('../rpi/turnOn');

const runZone = (zoneId, duration) => {
  turnOn(zoneId, duration);
};

module.exports = {
  runZone
};
