export interface IRunInterval {
  id: string,
  cancelled?: boolean,
  completed?: boolean,
  duration: number;
  started?: boolean;
  startTime?: number;
  startTimerId: NodeJS.Timeout,
  stopTimerId: NodeJS.Timeout,
  zoneId: string,
}
