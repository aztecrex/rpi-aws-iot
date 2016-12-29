'use strict';

const gpio = require('rpi-gpio-mod');
const pin = 37;

gpio.on('change', function(channel, value) {
    console.log('Channel ' + channel + ' value is now ' + value);
});


const init = () => {
  gpio.setup(pin, gpio.DIR_IN, gpio.EDGE_BOTH, err => {
    if (err) {
      console.log("cannot setup pin: ", pin);
    }
     gpio.read(pin, (err,val) => {
      if (err) {
         console.log("pin could not be read");
      } else {
         console.log("got pin value", val);
     }
     });
  });
}

init();

exports.await = cb => {

};
