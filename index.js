var rpio = require('rpio');

for (var i = 0; i < 5; i++) {
    rpio.write(14, rpio.HIGH);
    rpio.sleep(1);
    
    rpio.write(14, rpio.LOW);
    rpio.msleep(500);
}