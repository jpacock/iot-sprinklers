import { getZonesStatus } from '../rpi';

export function handleGetZonesStatus(req, res) {
  res.send(getZonesStatus());
}
