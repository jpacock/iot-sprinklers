import cors from 'cors';
import express from 'express';
import { Request, Response, } from 'express';
import { get, isEmpty, isUndefined, omit } from 'lodash';
import moment from 'moment';
import { v4 } from 'uuid';

import { IClient, IRun, IRunInterval, IStartRunRequest } from './@types';
import { configureZones, getStatus as getStatusFromRPi, turnOff, turnOn } from './rpi';

const server = express();
server.use(cors());
server.use(express.json());

configureZones();

let clients = [] as IClient[];
let runs = [] as IRun[];

server.get('/status', statusHandler);

function statusHandler(request: any, res: Response) {
  res.locals.clients = clients;
  const headers = {
    'Content-Type': 'text/event-stream',
    'Connection': 'keep-alive',
    'Cache-Control': 'no-cache'
  };
  res.writeHead(200, headers);

  const clientId = Date.now();

  res.write(`data: ${JSON.stringify(getStatus())}\n\n`)

  const newClient = {
    id: clientId,
    res,
  };

  clients.push(newClient);
  
  request.on('close', () => {
    console.log(`${clientId} Connection closed`);
    clients = clients.filter(client => client.id !== clientId);
  });
}

function getStatus() {
  let latestRun = runs.length > 0 ? runs[runs.length - 1] : {} as IRun;
  if (!isEmpty(latestRun)) {
    latestRun = {
      ...latestRun,
      intervals: latestRun.intervals.map(interval => omit(interval, 'startTimerId', 'stopTimerId')) as any,
    }
  }

  return {
    pinState: getStatusFromRPi(),
    latestRun,
  }
}

function sendStatusToAll() {
  clients.forEach(client => {
    client.res.write(`data: ${JSON.stringify(getStatus())}\n\n`)
  });
};

function startInterval(runId: string, intervalId: string) {
  const run = runs.find(run => run.id === runId);
  if (run) {
    const interval = run.intervals.find(interval => interval.id === intervalId);
    if (interval) {
      turnOn(interval.zoneId);
      interval.started = true;
      interval.startTime = moment.now();
      sendStatusToAll();
      // clearTimeout(interval.startTimerId);
    }
  }
}

function completeInterval(runId: string, intervalId: string) {
  const run = runs.find(run => run.id === runId);
  if (run) {
    const interval = run.intervals.find(interval => interval.id === intervalId);
    if (interval) {
      turnOff(interval.zoneId);
      interval.completed = true;
      sendStatusToAll();
      clearTimeout(interval.startTimerId);
      clearTimeout(interval.stopTimerId);
    }
  }
}

function cancelInterval(runId: string, intervalId: string) {
  const run = runs.find(run => run.id === runId);
  if (isUndefined(run)) return;

  const interval = run.intervals.find(interval => interval.id === intervalId);
  if (isUndefined(interval) || get(interval, 'completed', false)) return;

  interval.cancelled = true;
  if (get(interval, 'started', false)) {
    turnOff(interval.zoneId);
    sendStatusToAll();
  }

  clearTimeout(interval.startTimerId);
  clearTimeout(interval.stopTimerId);
}

function getRuns(res: Response) {
  res.status(200).json(runs.map(run => ({
    ...run,
    intervals: run.intervals.map(interval => omit(interval, 'startTimerId', 'stopTimerId')),
  })))
}

function getRun(req: Request, res: Response) {
  const { id } = req.params;
  const run = runs.find(run => run.id === id);
  if(!run) return;

  res.status(200).json({
    ...run,
    intervals: run.intervals.map(interval => omit(interval, 'startTimerId', 'stopTimerId')),
  });
}

function startRun(req: Request, res: Response) {
  const requestedIntervals = req.body as IStartRunRequest[];
  let accumulatedDuration = 0;
  let intervals = [] as IRunInterval[];
  const runId = v4();
  for (const r of requestedIntervals) {
    const intervalId = v4();
    intervals.push({
      id: intervalId,
      duration: r.duration,
      startTimerId: setTimeout(() => {
        startInterval(runId, intervalId);
      }, accumulatedDuration * 1000),
      stopTimerId: setTimeout(() => {
        completeInterval(runId, intervalId);
      }, (accumulatedDuration + r.duration) * 1000), 
      zoneId: r.zone,
    })
    accumulatedDuration += r.duration;
  }

  const newRun = {
    id: runId,
    intervals,
  } as IRun;

  runs.push(newRun);
  
  res.status(200).json({ id: newRun.id });
}

function stopRun(req: Request, res: Response): void {
  const { runId } = req.query;
  const run = runs.find(run => run.id === runId);
  if (!run) throw Error();
  run.intervals.forEach((interval) => {
    cancelInterval(run.id, interval.id);
  })
  res.status(200).json({ run: run.id })
}

server.get('/runs', getRuns);
server.get('/runs/:id', getRun);
server.post('/runs/start', startRun);
server.post('/runs/stop', stopRun);


server.listen(3000, () =>
  console.log('Server listening on port 3000!'),
);