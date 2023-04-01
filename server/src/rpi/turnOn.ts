import rpio from 'rpio';

import { getZonePin } from '../util/getZonePin';

export function turnOn(zone: string) {
  const zonePin = getZonePin(zone) as number;
  const mainPin = getZonePin('main') as number;
  console.log('zone Pin', zonePin);
  console.log('main Pin', mainPin);
  // setup pin out status

  // set pins to low
  rpio.write(mainPin, rpio.LOW);
  console.log(`turned on pin ${mainPin}`);
  rpio.write(zonePin, rpio.LOW);
  console.log(`turned on pin ${zonePin}`);
}