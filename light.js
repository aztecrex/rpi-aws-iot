'use strict';

console.log("using real device");

const on = () => {
  console.log("ON");
};

const off = () => {
  console.log("OFF");
};

const flash = () => {
  console.log("FLASH");
};

exports.on = on;
exports.off = off;
exports.flash = flash;
