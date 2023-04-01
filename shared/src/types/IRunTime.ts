export interface IRunTime {
  id: string,
  cancelled?: boolean,
  completed?: boolean,
  measurement: number;
  started?: boolean;
  startTime?: number;
  zoneId: string,
}
