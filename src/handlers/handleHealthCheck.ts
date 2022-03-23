import { Response } from 'express';
export function handleHealthCheck(res: Response) {
  res.send('OK');
};
