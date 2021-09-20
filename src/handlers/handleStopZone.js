import { stopZone } from '../services';

export function handleStopZone(req, res) {
  const zoneId = req.params.zoneId;

  stopZone(zoneId);

  res.send(`Stopped zone ${zoneId}`);
};
