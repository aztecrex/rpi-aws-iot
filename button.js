'use strict';

const gpio = require('rpi-gpio-mod');
const pin = 37;

const listeners = [];

const broadcast = hwValue => {
  listeners.forEach(listener => {
    listener(!hwValue); // pulled up
  });
};

gpio.on('change', function(channel, value) {
  if (channel === pin) {
    broadcast(value);
  }
});

const init = () => {
  gpio.setup(pin, gpio.DIR_IN, gpio.EDGE_BOTH, err => {
    if (err) {
      console.log("cannot setup pin: ", pin);
    }
  });
};

const check = () => {
  gpio.read(pin, (err, value) => {
    if (err) {
      console.log("error reading button pin");
    } else {
      broadcast(value);
    }
  });
};

const listen = listener => {
  listeners.push(listener);
};


exports.listen = listen;
exports.init = init;
exports.check = check;
