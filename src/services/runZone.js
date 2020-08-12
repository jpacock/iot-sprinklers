const { turnOn } = require('../rpi/turnOn');

const runZone = (zoneId, duration) => {
  turnOn(duration);
};

module.exports = {
  runZone
};
