'use strict';

const readlineLib = require('readline');

const BUTTON_PRESS = 'BUTTON_PRESS';

const readline = readlineLib.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log("in button simulator");

const create = (pin, listener) => {

  readline.on('line', ()  => listener(BUTTON_PRESS));

  return {};
};

exports.create = create;
exports.BUTTON_PRESS = BUTTON_PRESS;
