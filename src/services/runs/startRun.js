import { uuid } from 'uuidv4';

import { createRun, updateActualEndTime } from '../../data-access/maria';
import { turnOff, turnOn } from '../../rpi';

export function startRun(runlist, initiatedBy) {
  // create run object
  let start = new Date();
  let accumulativeDuration = 0;
  for (const r of runlist) {
    const scheduledEnd = new Date(start.getTime() + r.duration * 1000);
    const run = {
      id: uuid(),
      initiatedBy,
      zone: `${r.zone}`,
      startDateTime: start,
      scheduledEndDateTime: scheduledEnd,
    };
    // log to database
    createRun(run);

    setTimeout(() => {
      turnOn(run.zone);
    }, accumulativeDuration * 1000);

    setTimeout(() => {
      // turn off rapi
      turnOff(run.zone);
      // log to database
      updateActualEndTime(run.id, new Date());
    }, (accumulativeDuration + r.duration) * 1000);

    start = scheduledEnd;
    accumulativeDuration += r.duration;
  }
}
