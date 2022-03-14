import rpio from 'rpio';

import { getZonePin } from '../util/getZonePin';

export function turnOff(zone) {
  const zonePin = getZonePin(zone);
  const mainPin = getZonePin('main');

  // Turn off by going pin high
  rpio.write(mainPin, rpio.HIGH);
  console.log(`turned off pin ${mainPin}`);
  rpio.write(zonePin, rpio.HIGH);
  console.log(`turned off pin ${zonePin}`);
};
