'use strict';

console.log("using device simulator");

const create = pin => {
  var lit = false;

  let show = () => {
    console.log(lit ? "ON" : "OFF");
  };

  let set = newLit => {
    let emit = lit !== newLit;
    lit = newLit;
    if (emit) {
      show();
    }
  };

  let flash = () => {
    console.log("FLASH");
    show();
  };

  show();

  return {
    on: () => set(true),
    off: () => set(false),
    flash: flash
  };

};

exports.create = create;
