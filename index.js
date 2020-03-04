var rpio = require('rpio');

rpio.open(8, rpio.OUTPUT, rpio.LOW); // GPIO 14 

rpio.write(8, rpio.LOW);
rpio.sleep(20);

rpio.write(8, rpio.HIGH);
