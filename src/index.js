var rpio = require('rpio');
import express, { json } from 'express';

const app = express();
rpio.open(8, rpio.OUTPUT, rpio.LOW); // GPIO 14

app.get('/', (req, res) => {
    res.send('Hello World!');
    
    rpio.write(8, rpio.LOW);
    rpio.sleep(20);
    console.log('pin turn on')

    rpio.write(8, rpio.HIGH);
    console.log('pin turn off')
    
});

app.listen(3000, () =>
    console.log('Example app listening on port 3000!'),
);