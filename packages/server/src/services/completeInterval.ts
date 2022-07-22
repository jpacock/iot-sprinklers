import { IRunTime } from '../../../types';
import { turnOff } from '../rpi/turnOff';

export function completeInterval(runTime: IRunTime, cb: () => void) {
  turnOff(runTime.zoneId);
  cb();
  // if (runTime.startTimerId) clearTimeout(runTime.startTimerId);
  // if (runTime.stopTimerId) clearTimeout(runTime.stopTimerId);
}
