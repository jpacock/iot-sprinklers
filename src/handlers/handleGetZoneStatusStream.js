import { getZonesStatus } from '../rpi';

export function handleGetZoneStatusStream(req, res) {
  res.set({
    'Cache-Control': 'no-cache',
    'Content-Type': 'text/event-stream',
    Connection: 'keep-alive',
  });
  res.flushHeaders();

  setInterval(() => {
    res.write(`data: ${JSON.stringify(getZonesStatus())}\n\n`);
  }, 1000);
  // res.write(data);

  res.on('close', () => {
    console.log('Connection closed');
  });
}
