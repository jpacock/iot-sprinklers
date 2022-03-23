import { IRunInterval } from '.'

export interface IRun {
  id: string,
  intervals: IRunInterval[],
}
