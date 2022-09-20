import { IRunTime } from 'shared/build';
import { turnOn } from '../rpi';

export function startInterval(runTime: IRunTime, cb: () => void) {
  turnOn(runTime.zoneId);
  cb();
  // if (runTime.startTimerId) clearTimeout(runTime.startTimerId);
}
