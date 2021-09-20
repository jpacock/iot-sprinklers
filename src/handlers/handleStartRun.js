import { startRun } from '../services';

export function handleStartRun(req, res) {
  const duration = req.body.duration;
  const zoneId = req.params.zoneId;

  startRun(zoneId, duration, 'manual');

  res.send(`Running zone ${zoneId} for ${duration} seconds.`);
};
