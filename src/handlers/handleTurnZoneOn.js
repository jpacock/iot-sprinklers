module.exports.handleTurnZoneOn = (req, res) => {
  const rpio = require('rpio');
  rpio.init({ mapping: 'gpio' });
  rpio.open(8, rpio.OUTPUT, rpio.HIGH);
  
  const duration = req.body.duration;
  const zoneId = req.params.zoneId;
  rpio.write(8, rpio.LOW);
  rpio.sleep(duration);
  console.log(`Turn zone ${zoneId} on for ${duration} seconds.`);
  rpio.write(8, rpio.HIGH);
  console.log(`Turn zone ${zoneId} off.`);
  res.send(`Turned on zone ${zoneId}`);
};
