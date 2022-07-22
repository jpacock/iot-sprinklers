import { scheduleJob,  } from 'node-schedule';
import cron from 'cron-validate';

import { IProgram } from '../../../types';
import { completeInterval } from './completeInterval';
import { startInterval } from './startInterval';

export function createCronForProgram(program: IProgram): void {
  console.log('creating cron');
  if (!program.active) return;

  const cronStr = `${program.startMinutes} ${program.startHours} * * ${program.startDaysOfWeek}`;
  if ((cron(cronStr).isError())) console.log('Cron not valid.', cronStr);

  scheduleJob(program.id, cronStr, () => {
    let accumulatedDuration = 0;

    for (let i = 0; i < program.runTimes.length; i += 1) {
      const runTime = program.runTimes[i];
      setTimeout(() => {
        startInterval(runTime, () => {});
      }, accumulatedDuration * 1000);
      setTimeout(() => {
        completeInterval(runTime, () => {});
      }, (accumulatedDuration + runTime.measurement) * 1000);
      accumulatedDuration += runTime.measurement;
    }
  });
}
