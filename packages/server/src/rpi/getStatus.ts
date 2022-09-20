import rpio from 'rpio';

import { getZonePin } from '../util';

export function getStatus() {
  const results = ['1', '2', '3', '4', 'main'].map((zone) => ({
    zone,
    state: rpio.read((getZonePin(zone) as number)),
  }));
  return results;
}