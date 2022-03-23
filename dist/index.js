"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const lodash_1 = require("lodash");
const moment_1 = __importDefault(require("moment"));
const uuid_1 = require("uuid");
const rpi_1 = require("./rpi");
const server = (0, express_1.default)();
server.use((0, cors_1.default)());
server.use(express_1.default.json());
(0, rpi_1.configureZones)();
let clients = [];
let runs = [];
server.get('/status', statusHandler);
function statusHandler(request, res) {
    res.locals.clients = clients;
    const headers = {
        'Content-Type': 'text/event-stream',
        'Connection': 'keep-alive',
        'Cache-Control': 'no-cache'
    };
    res.writeHead(200, headers);
    const clientId = Date.now();
    res.write(`data: ${JSON.stringify(getStatus())}\n\n`);
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
    let latestRun = runs.length > 0 ? runs[runs.length - 1] : {};
    if (!(0, lodash_1.isEmpty)(latestRun)) {
        latestRun = Object.assign(Object.assign({}, latestRun), { intervals: latestRun.intervals.map(interval => (0, lodash_1.omit)(interval, 'startTimerId', 'stopTimerId')) });
    }
    return {
        pinState: (0, rpi_1.getStatus)(),
        latestRun,
    };
}
function sendStatusToAll() {
    clients.forEach(client => {
        client.res.write(`data: ${JSON.stringify(getStatus())}\n\n`);
    });
}
;
function startInterval(runId, intervalId) {
    const run = runs.find(run => run.id === runId);
    if (run) {
        const interval = run.intervals.find(interval => interval.id === intervalId);
        if (interval) {
            (0, rpi_1.turnOn)(interval.zoneId);
            interval.started = true;
            interval.startTime = moment_1.default.now();
            sendStatusToAll();
        }
    }
}
function completeInterval(runId, intervalId) {
    const run = runs.find(run => run.id === runId);
    if (run) {
        const interval = run.intervals.find(interval => interval.id === intervalId);
        if (interval) {
            (0, rpi_1.turnOff)(interval.zoneId);
            interval.completed = true;
            sendStatusToAll();
            clearTimeout(interval.startTimerId);
            clearTimeout(interval.stopTimerId);
        }
    }
}
function cancelInterval(runId, intervalId) {
    const run = runs.find(run => run.id === runId);
    if (run) {
        const interval = run.intervals.find(interval => interval.id === intervalId);
        if (interval) {
            if (!(0, lodash_1.get)(interval, 'completed', true)) {
                interval.cancelled = true;
                if ((0, lodash_1.get)(interval, 'started', false)) {
                    (0, rpi_1.turnOff)(interval.zoneId);
                    sendStatusToAll();
                }
                clearTimeout(interval.startTimerId);
                clearTimeout(interval.stopTimerId);
            }
        }
    }
}
function getRuns(res) {
    res.status(200).json(runs.map(run => (Object.assign(Object.assign({}, run), { intervals: run.intervals.map(interval => (0, lodash_1.omit)(interval, 'startTimerId', 'stopTimerId')) }))));
}
function startRun(req, res) {
    const requestedIntervals = req.body;
    let accumulatedDuration = 0;
    let intervals = [];
    const runId = (0, uuid_1.v4)();
    for (const r of requestedIntervals) {
        const intervalId = (0, uuid_1.v4)();
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
        });
        accumulatedDuration += r.duration;
    }
    const newRun = {
        id: runId,
        intervals,
    };
    runs.push(newRun);
    res.status(200).send(newRun.id);
    return;
}
function stopRun(req, res) {
    const { runId } = req.query;
    const run = runs.find(run => run.id === runId);
    if (run) {
        run.intervals.forEach((interval) => {
            cancelInterval(run.id, interval.id);
        });
        res.status(200).json({ run: run.id });
    }
    else {
        throw Error();
    }
}
server.get('/runs', getRuns);
server.post('/runs/start', startRun);
server.post('/runs/stop', stopRun);
server.listen(3000, () => console.log('Server listening on port 3000!'));
//# sourceMappingURL=index.js.map