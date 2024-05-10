import { turnOff } from '../../rpi';

export const stopManual = (zoneId: string) => {
  turnOff(zoneId);
};
