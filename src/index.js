// var rpio = require('rpio');
// var express = require('express');

// const app = express();
// app.use(express.json());

// rpio.open(8, rpio.OUTPUT, rpio.HIGH); // GPIO 14

// app.get('/', (req, res) => {
//     rpio.write(8, rpio.LOW);
//     rpio.sleep(20);
//     console.log('pin turn on')

//     rpio.write(8, rpio.HIGH);
//     console.log('pin turn off')
// });

// app.get('/zones/:zoneId/on', (req, res) => {
//     const duration = req.body.duration;
//     const zoneId = req.params.zoneId;

//     rpio.write(8, rpio.LOW);
//     rpio.sleep(duration);
//     console.log('Turn zone ' + zoneId + ' on for ' + duration + ' minutes.');

//     rpio.write(8, rpio.HIGH);
//     console.log('Turn zone ' + zoneId + 'off.')
    
//     res.send('Turned on zone ' + zoneId);
    
// });

// app.listen(3000, () =>
//     console.log('Example app listening on port 3000!'),
// );

// const server = require('./server')