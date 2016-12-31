'use strict';

const iot = require('aws-iot-device-sdk');

const LAMP_ON = 'MODEL_LAMP_ON';
const LAMP_OFF = 'MODEL_LAMP_OFF';
const LAMP_FLASH = 'MODEL_LAMP_FLASH';

const create = (clientId, opts, listener) => {
  let topic = opts.topic || "info";
  let thingName = opts.thingName || "GroundPi";

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
    let result = shadows.update(thingName, payload);
  };

  shadows.on('delta', (thingName, stateObject) => {
    if (stateObject.state) {
      if ('lamp' in stateObject.state) {
        lamp = !!stateObject.state.lamp;
        listener(lamp ? LAMP_ON : LAMP_OFF);
        report();
      }
    }
  });

  shadows.on('message', () => {
    listener(LAMP_FLASH);
  });

  shadows.on('connect', () => {
    console.log("connected");
    shadows.register(thingName, {}, err => {
      if (err) {
        console.log("unable to register", thingName);
        return;
      }
      let sync = () => {
        report();
        // setTimeout(sync, 3000);
      };
      sync();
    });
  });

  shadows.subscribe(topic);

  let setLamp = value => {
    lamp = value;
    listener(lamp ? LAMP_ON : LAMP_OFF);
    let payload = {state:{desired:{lamp:lamp},reported:{lamp:lamp}}}
    shadows.update(thingName, payload);
  };

  return {
    set: setLamp
  };

};

exports.create = create;
exports.LAMP_ON = LAMP_ON;
exports.LAMP_OFF = LAMP_OFF;
exports.LAMP_FLASH = LAMP_FLASH;
