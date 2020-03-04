var rpio = require('rpio');

rpio.open(8, rpio.OUTPUT, rpio.LOW); // GPIO 14 

for (var i = 0; i < 5; i++) {
    rpio.write(8, rpio.HIGH);
    rpio.sleep(1);
    
    rpio.write(8, rpio.LOW);
    rpio.msleep(500);
}