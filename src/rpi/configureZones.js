import rpio from 'rpio';

import { getZonePin } from '../util/getZonePin';

export function configureZones() {
  ['1', '2', '3', '4', 'main'].forEach(zone => {
    rpio.open(getZonePin(zone), rpio.OUTPUT, rpio.HIGH);
  });
}
