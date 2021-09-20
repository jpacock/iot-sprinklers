import { getRuns } from '../services';

export async function handleGetRuns(req, res) {
  const runs = await getRuns();
  res.send(runs);
};
