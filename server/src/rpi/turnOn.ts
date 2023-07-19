import rpio from 'rpio';

import { getZonePin } from '../util/getZonePin';

export function turnOn(zone: string) {
  const zonePin = getZonePin(zone) as number;

  // set pin to low
  rpio.write(zonePin, rpio.LOW);
  console.log(`turned on pin ${zonePin}`);
}
