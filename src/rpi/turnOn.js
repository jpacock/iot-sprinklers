const turnOn = (duration) => {
  const rpio = require('rpio');
  const durationInMilliseconds = duration * 1000;
  rpio.open(8, rpio.OUTPUT, rpio.HIGH);
  rpio.write(8, rpio.LOW);
  console.log('turned on');
  // rpio.sleep(duration);
  setTimeout(() => { rpio.write(8, rpio.HIGH); console.log('turned off') }, durationInMilliseconds)
  // rpio.write(8, rpio.HIGH);
};

module.exports = {
  turnOn
};
