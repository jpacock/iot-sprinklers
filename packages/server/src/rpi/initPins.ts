import rpio from 'rpio';

import { getZonePin } from '../util/getZonePin';

export function initPins() {
  ['1', '2', '3', '4', 'main'].forEach((zone) => {
    rpio.open((getZonePin(zone) as number), rpio.OUTPUT, rpio.HIGH);
  });
}
