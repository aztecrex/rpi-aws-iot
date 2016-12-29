'use strict';

const gpio = require('rpi-gpio-mod');
const pin = 37;

const listeners = [];

gpio.on('change', function(channel, value) {
  if (channel === pin) {
    listeners.forEach(listener => {
      listener(!value);  // pulled up
    });
  }
});


const init = () => {
  gpio.setup(pin, gpio.DIR_IN, gpio.EDGE_BOTH, err => {
    if (err) {
      console.log("cannot setup pin: ", pin);
    }
  });
};

const listen = listener => {
  listeners.push(listener);
};


exports.listen = listen;
exports.init = init;
