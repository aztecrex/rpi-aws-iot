'use strict';

const gpio = require('rpi-gpio-mod');
const pin = 40;

const init = (cb) {
  gpio.setup(pin, err => {
    if (err) {
      console.log("cannot setup pin: ", pin);
      cb(err);
    } else cb(null, true);
  });
}

const on = () => {
  gpio.write(pin, true);
};

const off = () => {
  gpio.write(pin, false);
};

const flash = () => {
  const cycle = rem => {
    if (rem > 0) {
      on();
      delay(.1, () => {
        off();
        delay(.1, () => {
          cycle(rem - 1);
        });
      });
    }
  };
  cycle(10);
};

exports.init = init;
exports.on = on;
exports.off = off;
exports.flash = flash;
