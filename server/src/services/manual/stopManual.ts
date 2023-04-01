import { turnOff, turnOn } from '../../rpi';

export const stopManual = (zoneId: string) => {
  turnOff(zoneId);
};
