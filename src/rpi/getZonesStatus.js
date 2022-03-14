import rpio from 'rpio';

import { getZonePin } from '../util/getZonePin';

export function getZonesStatus() {
  const results = ['1', '2', '3', '4', 'main'].map(zone => ({
    zone: zone,
    state: rpio.read(getZonePin(zone)),
  }));

  return results;
}
