const zonePinMap = new Map();
zonePinMap.set('1', 31);
zonePinMap.set('2', 33);
zonePinMap.set('3', 35);
zonePinMap.set('4', 37);
zonePinMap.set('main', 29);

// Zone 1
const turnOn = (zone, duration) => {
  const rpio = require('rpio');
  console.log('zone', zone);
  const durationInMilliseconds = duration * 1000;
  const zonePin = zonePinMap.get(zone);
  const mainPin = zonePinMap.get('main');
  console.log('zone Pin', zonePin);
  console.log('main Pin', mainPin);
  // setup pin out status
  rpio.open(zonePin, rpio.OUTPUT, rpio.HIGH);
  rpio.open(mainPin, rpio.OUTPUT, rpio.HIGH);

  // set pins to low
  rpio.write(mainPin, rpio.LOW);
  console.log(`turned on pin ${mainPin}`);
  rpio.write(zonePin, rpio.LOW);
  console.log(`turned on pin ${zonePin}`);

  // Set timeout to shut zone off
  setTimeout(() => {
    rpio.write(mainPin, rpio.HIGH);
    console.log(`turned off pin ${mainPin}`);
    rpio.write(zonePin, rpio.HIGH);
    console.log(`turned off pin ${zonePin}`);
  }, durationInMilliseconds);
};

module.exports = {
  turnOn,
};
