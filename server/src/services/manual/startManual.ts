import { turnOn } from '../../rpi';

export const startManual = (zoneId: string) => {
  turnOn(zoneId);
};
