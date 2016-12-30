'use strict';

const iot = require('aws-iot-device-sdk');

const LAMP_STATE = 'MODEL_LAMP';
const LAMP_FLASH = 'MODEL_FLASH';

const create = id => {
  let thing = iot.thingShadow({
    keyPath: 'certs/private.pem.key',
   certPath: 'certs/certificate.pem.crt',
     caPath: 'certs/root-CA.crt',
   clientId: "pi-thing-" + id,
     region: 'us-east-1'
  });
  let listeners = {LAMP_STATE:[],LAMP_FLASH:[]};

  let desireLamp = state => {
    thing.updateSt
  };

  return {
    on: (key, listener) => listners[key].push(listener);
    glow = desireLamp(true);
  };

};


const lamp = value => {
  broadast(LAMP, value);
};

const listen = listener => {
  listeners.push(listener);
};

const init = id => {
};

exports.listen = listen;
exports.init = init;
exports.LAMP = LAMP;
