'use strict';

const gpio = require('rpi-gpio-mod');

const BUTTON_PRESS = 'BUTTON_PRESS';

const init = (pin, cont) => {
    gpio.setup(pin, gpio.DIR_IN, gpio.EDGE_FALLING, err => {
      if (err) console.log("cannot setup pin", pin);
      cont();
    });
};

const watch = (pin, action) => {
  gpio.on('change', (channel, value) => {
    if (channel === pin) action();
  });
};

gpio.on('change', function(channel, value) {
  if (channel === pin && !value) {
    broadcast();
  }
});

create (pin, listener) => {

  init(pin, () => watch(pin, () => listener(BUTTON_PRESS)));

  return {};
};

exports.create = create;
exports.BUTTON_PRESS = BUTTON_PRESS;
