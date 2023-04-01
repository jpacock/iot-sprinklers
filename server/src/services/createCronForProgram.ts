import { IProgram } from 'shared';
import { scheduleJob } from 'node-schedule';
import cron from 'cron-validate';

import { getZoneDurationByUnit } from '../util';
import { completeInterval } from './completeInterval';
import { startInterval } from './startInterval';

export function createCronForProgram(program: IProgram): void {
  console.log('creating cron');
  if (!program.active) return;

  const cronStr = `${program.startMinutes} ${program.startHours} * * ${program.startDaysOfWeek}`;
  if ((cron(cronStr).isError())) throw new Error('Cron not valid.');

  scheduleJob(program.id, cronStr, () => {
    let accumulatedDuration = 0;

    for (let i = 0; i < program.runTimes.length; i += 1) {
      const runTime = program.runTimes[i];
      const duration = getZoneDurationByUnit(
        runTime.zoneId,
        runTime.measurement,
        program.runTimeUnit,
      );
      setTimeout(() => {
        startInterval(runTime, () => {});
      }, accumulatedDuration * 1000);
      setTimeout(() => {
        completeInterval(runTime, () => {});
      }, (accumulatedDuration + duration) * 1000);
      accumulatedDuration += duration;
    }
  });
}
