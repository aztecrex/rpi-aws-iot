'use strict';

const iot = require('aws-iot-device-sdk');

const LAMP_STATE = 'MODEL_LAMP';
const LAMP_FLASH = 'MODEL_FLASH';

const create = (clientId, thingName, topic, listener) => {
  let shadows = iot.thingShadow({
    keyPath: 'certs/private.pem.key',
   certPath: 'certs/certificate.pem.crt',
     caPath: 'certs/root-CA.crt',
   clientId: clientId,
     region: 'us-east-1'
  });

  let lamp = false;

  let report = () => {
    let payload = {state:{reported:{lamp:lamp}}};
    shadows.update(thingName, payload);
  };

  shadows.on('delta', (thingName, stateObject) => {
    if (stateObject.state) {
      if ('lamp' in stateObject.state) {
        lamp = !!stateObject.state.lamp;
        listener(LAMP_STATE, lamp);
        report();
      }
    }
  });

  shadows.on('message', () => {
    listener(LAMP_FLASH, true);
  });

  shadows.on('connect', () => {
    shadows.register(thingName, err => {
      if (err) {
        console.log("unable to register", thingName);
        return;
      }
      let sync = () => {
        report();
        setTimeout(3000, sync);
      };
      sync();
    });
  });

  shadows.subscribe(topic);

  let desireLamp = state => {
    listener(LAMP_STATE, state);
    let payload = {state:{desired:{lamp:state},reported:{lamp:state}}}
    shadows.update(thingName, payload);
  };

  return {
    glow = desireLamp(true);
  };

};

exports.create = create;
exports.LAMP_STATE = LAMP_STATE;
exports.LAMP_FLASH = LAMP_FLASH;
