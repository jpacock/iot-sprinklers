import rpio from 'rpio';

import { getZonePin } from '../util/getZonePin';

export function turnOff(zone: string) {
  const zonePin = getZonePin(zone) as number;
  const mainPin = getZonePin('main') as number;

  // Turn off by going pin high
  rpio.write(mainPin, rpio.HIGH);
  console.log(`turned off pin ${mainPin}`);
  rpio.write(zonePin, rpio.HIGH);
  console.log(`turned off pin ${zonePin}`);
}
