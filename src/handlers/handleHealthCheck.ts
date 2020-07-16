import { Request, Response } from 'express';

export function handleHealthCheck(req: Request, res: Response ): void {
  res.send('OK');
}