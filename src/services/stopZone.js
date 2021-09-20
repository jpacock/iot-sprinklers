import { turnOff } from '../rpi';

export function stopZone(zoneId) {
  turnOff(zoneId);
};
