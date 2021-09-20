import { turnOn } from '../rpi';

export function startZone(zoneId, duration) {
  turnOn(zoneId, duration);
};
