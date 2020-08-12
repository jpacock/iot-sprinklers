module.exports.runZone = (zoneId, duration) => {
    const rpio = require('rpio');
    rpio.open(8, rpio.OUTPUT, rpio.HIGH);
    
    rpio.write(8, rpio.LOW);
    rpio.sleep(duration);
    console.log(`Turn zone ${zoneId} on for ${duration} seconds.`);
    rpio.write(8, rpio.HIGH);
    console.log(`Turn zone ${zoneId} off.`);
};