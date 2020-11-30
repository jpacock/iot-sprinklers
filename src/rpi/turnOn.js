const turnOn = (duration) => {
  const rpio = require('rpio');
  const durationInMilliseconds = duration * 1000;
  rpio.open(8, rpio.OUTPUT, rpio.HIGH);
  rpio.write(8, rpio.LOW);
  // rpio.sleep(duration);
  setTimeout(() => { rpio.write(8, rpio.HIGH) }, durationInMilliseconds)
  // rpio.write(8, rpio.HIGH);
};

module.exports = {
  turnOn
};
