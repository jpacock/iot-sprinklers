import { startRun } from '../services';

export function handleStartRun(req, res) {
  // const duration = req.body.duration;
  // startRun(zoneId, duration, 'manual');
  const data = req.body;

  // validate body
  // for (const run in data) {
  //   if (i)) {
  //     throw new Error('Bad Request!');
  //   }
  // }

  const response = startRun(data, 'manual');

  res.json(response);
};
