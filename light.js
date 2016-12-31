'use strict';

const gpio = require('rpi-gpio-mod');

const doSet = (pin, value, cont) => {
  gpio.write(pin, value, () => {
    if (err) console.log("error writing", pin, value);
    cont();
  });
};

const createSet = (pin, value) => {
  return cont => doSet(pin, value, cont);
};

const createFlash = pin => {

  let delay = (seconds, cont) => {
    setTimeout(cont, seconds);
  };

  let cycle = (rem, cont) => {
    if (rem > 0) {
        doSet(pin, true,
          () => delay(.1,
          () => doSet(pin, false,
          () => delay(.1,
          () => cycle(rem-1, cont))))
        );
    } else cont();
  };
  return cont => cycle(7,cont);
};

const service = queue => {
  let next = () => {
    if (queue.length === 0) {
      head = queue.shift();
      head(next);
    } else setTimeout(next, 50);
  };
};

const init = (pin, cont) => {
  gpio.setup(pin, err => {
    if (err) console.log("cannot setup pin: ", pin);
    cont();
  });
}

const create = pin => {

  var state = false;
  const queue =[];

  let set = newState => {
    if (newValue !== state) {
      state = newState;
      queue.push(createSet(pin, state));
    }
  };

  let flash = () => {
    queue.push(createFlash(pin))
    queue.push(createSet(pin, state));
  };

  init(pin, () => service(queue));

  return {
    on: () => set(true),
    off: () => set(false),
    flash: flash
  };

};

exports.create = create;
