import { IRunTime } from '../IRunTime';
import { RunTimeUnitType } from '../RunTimeUnitType';

export interface IUpdateProgramRequest {
  id: string,
  displayName: string,
  startMinutes: number,
  startHours: number,
  startDaysOfWeek: string,
  active: boolean,
  runTimes: IRunTime[],
  runTimeUnit: RunTimeUnitType,
}
