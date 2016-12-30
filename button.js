'use strict';

const gpio = require('rpi-gpio-mod');
const pin = 37;

const listeners = [];

const broadcast = hwValue => {
  listeners.forEach(listener => {
    listener(); // pulled up
  });
};

gpio.on('change', function(channel, value) {
  if (channel === pin && !value) {
    broadcast();
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

exports.init = init;
exports.listen = listen;
