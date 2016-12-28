'use strict';

const gpio = require('rpi-gpio-mod');
const pin = 40;

const queue =[];

const service = () => {

  const setOn = cont => {
    gpio.write(pin, true, () => cont());
  };

  const setOff = cont => {
    gpio.write(pin, false, () => cont());
  };

  const delay = (seconds, cont) => {
    setTimeout(() => cont(), seconds * 1000);
  };

  const setFlash = cont => {
    const cycle = rem => {
      if (rem > 0) {
        setOn(
          () => delay(.1,
          () => setOff(
          () => delay(.1,
          () => cycle(rem - 1)))));
      } else cont();
    };
    cycle(7);
  };

  const handle = (command, cont) => {
    switch (command.op) {
      case 'on':
        setOn(cont);
        break;
      case 'off':
        setOff(cont);
        break;
      case 'flash':
        setFlash(cont);
        break;
    }
  }

  const poll = () => {
    if (queue.length === 0) {
      delay(1, poll);
    } else {
      let head = queue.shift();
      handle(head, poll);
    }
  };

  poll();
};

const init = () => {
  gpio.setup(pin, err => {
    if (err) {
      console.log("cannot setup pin: ", pin);
    }
    service();
  });
}

const on = () => {
  queue.push({op:'on'});
};

const off = () => {
  queue.push({op:'off'});
};

const flash = () => {
  queue.push({op:'flash'});
};

exports.init = init;
exports.on = on;
exports.off = off;
exports.flash = flash;
