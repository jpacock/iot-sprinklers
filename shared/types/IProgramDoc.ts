import { RunTimeUnitType } from "./RunTimeUnitType";

export interface IProgramDoc {
  id: string,
  display_name: string,
  start_hours: number,
  start_minutes: number,
  start_days_of_week: string,
  active: boolean,
  run_times: string,
  run_time_unit: RunTimeUnitType,
}
