import { Response } from 'express';

export interface IClient {
  id: number,
  res: Response,
}
