'use strict';

console.log("using device simulator");

var high = false;

const on = () => {
  if (!high)
    console.log("ON");
  high = true;
};

const off = () => {
  if (high)
    console.log("OFF");
  high = false;
};

const flash = () => {
  console.log("FLASH");
};

const init = () => {
  console.log("OFF");
  high = false;
};

exports.init = init;
exports.on = on;
exports.off = off;
exports.flash = flash;
