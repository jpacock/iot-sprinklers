import { startRun } from '../services';

export function handleStartRun(req, res) {
  // const duration = req.body.duration;
  // startRun(zoneId, duration, 'manual');
  const data = req.body;

  // validate body
  startRun(data, 'manual');

  res.send('Running zones');
};
