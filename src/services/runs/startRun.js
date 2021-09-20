import { uuid } from 'uuidv4';

import { createRun, updateActualEndTime } from '../../data-access/maria';
import { turnOff, turnOn } from '../../rpi';

export function startRun(zone, duration, initiatedBy) {
  // create run object
  const start = new Date();
  const scheduledEnd = new Date(start.getTime() + duration * 1000);
  const run = {
    id: uuid(),
    initiatedBy,
    zone,
    startDateTime: start,
    scheduledEndDateTime: scheduledEnd,
  };

  console.log('made it to here');

  // log to database
  createRun(run);

  // turn on raspi
  turnOn(run.zone);

  // schedule turn off
  setTimeout(() => {
    // turn off rapi
    turnOff(run.zone);
    // log to database
    updateActualEndTime(run.id, new Date());
  }, duration * 1000);
}
