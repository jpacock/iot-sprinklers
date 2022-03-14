import { stopRun } from '../services';

export function handleStopRun(req, res) {
  stopZone(zoneId);
  res.send(`Stopped run ${zoneId}`);
};
