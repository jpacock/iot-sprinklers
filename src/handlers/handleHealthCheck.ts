import { Request, Response } from 'express';
export function handleHealthCheck(req: Request, res: Response, clients: any) {
  res.send('OK');
};
