import cors from 'cors';
import express from 'express';

import { ICreateProgramRequest, IUpdateProgramRequest } from '../../types';
import { getPrograms, getProgramById } from './data-access/maria/programs';
import { initPins } from './rpi';
import {
  createProgram, createCronForProgram, deleteProgram, updateProgram,
} from './services';

const main = async () => {
  initPins();

  const server = express();

  server.use(cors());
  server.use(express.json());

  const existingPrograms = await getPrograms();

  existingPrograms.forEach((program) => createCronForProgram(program));

  // Create programs //
  server.post('/program', async (req, res) => {
    const program = req.body as ICreateProgramRequest;

    const response = await createProgram(program);

    res.status(201).send(response);
  });

  // Get Programs //
  server.get('/program', async (_, res) => {
    const programs = await getPrograms();

    res.status(200).send(programs);
  });

  // Get Program by Id //
  server.get('/program/:id', async (req, res) => {
    const { id } = req.params;
    const programs = await getProgramById(id);

    res.status(200).send(programs);
  });

  // Update program //
  server.put('/program/:id', async (req, res) => {
    const { id } = req.params;
    const updatedProgram = req.body as IUpdateProgramRequest;
    await updateProgram(id, updatedProgram);

    res.status(200).end();
  });

  // Delete program //
  server.delete('/program/:id', async (req, res) => {
    const { id } = req.params;

    await deleteProgram(id);

    res.status(204).end();
  });

  server.listen(3000, () => console.log('Server listening on port 3000!'));
};

main();

// let clients = [] as IClient[];
// const runs = [] as IRun[];

// function getStatus() {
//   let latestRun = runs.length > 0 ? runs[runs.length - 1] : {} as IRun;

//   if (!isEmpty(latestRun)) {
//     latestRun = {
//       ...latestRun,
//       intervals: latestRun.intervals.map(interval => omit(
// interval, 'startTimerId', 'stopTimerId')) as any,
//     };
//   }

//   return {
//     pinState: getStatusFromRPi(),
//     latestRun,
//   };
// }

// function sendStatusToAll() {
//   clients.forEach(client => {
//     client.res.write(`data: ${JSON.stringify(getStatus())}\n\n`);
//   });
// }

// function startInterval(runId: string, intervalId: string) {
//   const run = runs.find(r => r.id === runId);

//   if (run) {
//     const interval = run.intervals.find(i => i.id === intervalId);

//     if (interval) {
//       turnOn(interval.zoneId);
//       interval.started = true;
//       interval.startTime = moment.now();
//       sendStatusToAll();
//       clearTimeout(interval.startTimerId!);
//     }
//   }
// }

// function completeInterval(runId: string, intervalId: string) {
//   const run = runs.find(run => run.id === runId);

//   if (run) {
//     const interval = run.intervals.find(i => i.id === intervalId);

//     if (interval) {
//       turnOff(interval.zoneId);
//       interval.completed = true;
//       sendStatusToAll();
//       clearTimeout(interval.startTimerId!);
//       clearTimeout(interval.stopTimerId!);
//     }
//   }
// }

// schedule.push({
//   ...syringeSchedule,
//   jobs: [
//     scheduleJob(syringeSchedule.id, syringeSchedule.cronExpression, () => {
//       let accumulatedDuration = 0;
//       const intervals = [] as IRunInterval[];
//       const runId = v4();

//       for (const r of syringeSchedule.intervals) {
//         const intervalId = v4();

//         intervals.push({
//           id: intervalId,
//           duration: r.duration,
//           startTimerId: setTimeout(() => {
//             startInterval(runId, intervalId);
//           }, accumulatedDuration * 1000),
//           stopTimerId: setTimeout(() => {
//             completeInterval(runId, intervalId);
//           }, (accumulatedDuration + r.duration) * 1000),
//           zoneId: r.zoneId,
//         });
//         accumulatedDuration += r.duration;
//       }

//       const newRun = {
//         id: runId,
//         intervals,
//       } as IRun;

//       runs.push(newRun);
//     }),
//   ]
// });

// function statusHandler(request: any, res: Response) {
//   res.locals.clients = clients;
//   const headers = {
//     'Content-Type': 'text/event-stream',
//     'Connection': 'keep-alive',
//     'Cache-Control': 'no-cache'
//   };

//   res.writeHead(200, headers);

//   const clientId = Date.now();

//   // res.write(`data: ${JSON.stringify(getStatus())}\n\n`);

//   const newClient = {
//     id: clientId,
//     res,
//   };

//   clients.push(newClient);

//   request.on('close', () => {
//     // console.log(`${clientId} Connection closed`);
//     clients = clients.filter(client => client.id !== clientId);
//   });
// }

// function cancelInterval(runId: string, intervalId: string) {
//   const run = runs.find(r => r.id === runId);

//   if (isUndefined(run)) return;

//   const interval = run.intervals.find(i => i.id === intervalId);

//   if (isUndefined(interval) || get(interval, 'completed', false)) return;

//   interval.cancelled = true;
//   if (get(interval, 'started', false)) {
//     turnOff(interval.zoneId);
//     // sendStatusToAll();
//   }

//   clearTimeout(interval.startTimerId!);
//   clearTimeout(interval.stopTimerId!);
// }

// function getRuns(res: Response) {
//   res.status(200).json(runs.map(run => ({
//     ...run,
//     intervals: run.intervals.map(interval => omit(interval, 'startTimerId', 'stopTimerId')),
//   })));
// }

// function getRun(req: Request, res: Response) {
//   const { id } = req.params;
//   const run = runs.find(r => r.id === id);

//   if(!run) return;

//   res.status(200).json({
//     ...run,
//     intervals: run.intervals.map(interval => omit(interval, 'startTimerId', 'stopTimerId')),
//   });
// }

// function startRun(req: Request, res: Response) {
//   const requestedIntervals = req.body as IStartRunRequest[];
//   let accumulatedDuration = 0;
//   const intervals = [] as IRunInterval[];
//   const runId = v4();

//   for (const r of requestedIntervals) {
//     const intervalId = v4();

//     intervals.push({
//       id: intervalId,
//       duration: r.duration,
//       startTimerId: setTimeout(() => {
//         startInterval(runId, intervalId);
//       }, accumulatedDuration * 1000),
//       stopTimerId: setTimeout(() => {
//         completeInterval(runId, intervalId);
//       }, (accumulatedDuration + r.duration) * 1000),
//       zoneId: r.zone,
//     });
//     accumulatedDuration += r.duration;
//   }

//   const newRun = {
//     id: runId,
//     intervals,
//   } as IRun;

//   runs.push(newRun);

//   res.status(200).json({ id: newRun.id });
// }

// function stopRun(req: Request, res: Response): void {
//   const { runId } = req.query;
//   const run = runs.find(r => r.id === runId);

//   if (!run) throw Error();
//   run.intervals.forEach((interval) => {
//     cancelInterval(run.id, interval.id!);
//   });
//   res.status(200).json({ run: run.id });
// }

// async function getSchedule(req: Request, res: Response) {
//   const response = await getSchedules();

//   res.status(200).json(response);
// }
