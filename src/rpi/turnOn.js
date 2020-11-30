const turnOn = (duration) => {
  const rpio = require('rpio');
  rpio.open(8, rpio.OUTPUT, rpio.HIGH);
  rpio.write(8, rpio.LOW);
  // rpio.sleep(duration);
  setTimeout(() => { rpio.write(8, rpio.HIGH) }, duration)
  // rpio.write(8, rpio.HIGH);
};

module.exports = {
  turnOn
};
