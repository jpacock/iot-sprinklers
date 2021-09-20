import express from 'express';

import { getPrograms } from '../data-access/maria/programs';
import { initRoutes } from './routes';

export async function startServer() {
  const server = express();
  server.use(express.json());

  initRoutes(server);

  // const newProgram = {
  //   id: uuid(),
  //   name: 'new program',
  //   startTime: '05:00:00',
  //   zone1Duration: 40,
  //   zone2Duration: 15,
  //   zone3Duration: 40,
  //   zone4Duration: 40,
  //   days: '1,5',
  //   active: true,
  //   running: false,
  // };
  // await createProgram(newProgram);

  // await deleteProgram('d8992e93-ca99-43b7-9867-2d755cb60511');

  const programs = await getPrograms();
  console.log(programs);

  // const CronJob = require('cron').CronJob;
  // const job1 = new CronJob('0 0 5 * * 1,5', () => {
  //   runZone(1, 2399);
  // }, null, true, 'America/Chicago');
  // job1.start();

  // const job2 = new CronJob('0 40 5 * * 1,5', () => {
  //   runZone(2, 1799);
  // }, null, true, 'America/Chicago');
  // job2.start();

  // const job3 = new CronJob('0 10 6 * * 1,5', () => {
  //   runZone(3, 1799);
  // }, null, true, 'America/Chicago');
  // job3.start();

  // const job4 = new CronJob('0 40 6 * * 1,5', () => {
  //   runZone(4, 1799);
  // }, null, true, 'America/Chicago');
  // job4.start();

  server.listen(3000, () =>
    console.log('Server listening on port 3000!'),
  );
};

// module.exports = {
//   startServer
// };
