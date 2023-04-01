import { IRunTime } from 'shared/types';

import { turnOn } from '../rpi';

export function startInterval(runTime: IRunTime, cb: () => void) {
  turnOn(runTime.zoneId);
  cb();
  // if (runTime.startTimerId) clearTimeout(runTime.startTimerId);
}
