import { IRunTime } from './IRunTime';
import { RunTimeUnitType } from './RunTimeUnitType';

export interface IProgram {
  id: string,
  displayName: string,
  startMinutes: number,
  startHours: number,
  startDaysOfWeek: string,
  active: boolean,
  runTimes: IRunTime[],
  runTimeUnit: RunTimeUnitType,
}
