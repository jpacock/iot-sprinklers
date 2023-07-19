import rpio from 'rpio';

import { getZonePin } from '../util';

export function getStatus() {
  const results = ['1', '2', '3', '4', '5'].map((zone) => ({
    zone,
    open: rpio.read((getZonePin(zone) as number)) === 0,
  }));
  return results;
}
