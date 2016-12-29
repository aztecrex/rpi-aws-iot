'use strict';

const gpio = require('rpi-gpio-mod');
const pin = 37;

const init = () => {
  gpio.setup(pin, GPIO.DIR_IN, gpio.EDGE_BOTH err => {
    if (err) {
      console.log("cannot setup pin: ", pin);
    }
    service();
  });
}

gpio.on('change', function(channel, value) {
    console.log('Channel ' + channel + ' value is now ' + value);
});

exports.await = cb => {

};
