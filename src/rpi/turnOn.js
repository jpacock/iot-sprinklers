import rpio from 'rpio';

import { getZonePin } from '../util/getZonePin';

export function turnOn(zone) {
  const zonePin = getZonePin.get(zone);
  const mainPin = getZonePin.get('main');
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
};
