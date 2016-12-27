'use strict';

console.log("using device simulator");

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
