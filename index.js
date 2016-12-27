'use strict';
const iot = require('aws-iot-device-sdk');

const topic = 'info';
const thingName = 'GroundPi';

const device = iot.device({
   keyPath: 'certs/private.pem.key',
  certPath: 'certs/certificate.pem.crt',
    caPath: 'certs/root-CA.crt',
  clientId: 'sub001',
    region: 'us-east-1'
});

device
  .on('connect', () => {
    console.log('connect', topic);
    device.subscribe(topic);
    // device.publish('topic_2', JSON.stringify({ test_data: 1}));
    });

device
  .on('message', (topic, payload) => {
    flashDisplay();
    // console.log('message', topic, payload.toString());
  });

const updateDisplay = state => {
  if (state.lamp) {
    console.log("ON");
  } else {
    console.log("OFF");
  }
};

const flashDisplay = () => {
  console.log("FLASH");
  thing.get(thingName);
};

const thing = iot.thingShadow({
  keyPath: 'certs/private.pem.key',
 certPath: 'certs/certificate.pem.crt',
   caPath: 'certs/root-CA.crt',
 clientId: 'thing001',
   region: 'us-east-1'
});

thing.on('connect', () => {
  console.log('connect', thingName);
  thing.register(thingName, {}, () => {
    console.log("registered");
    let token = thing.get(thingName);
  });
});

thing.on('status', (thingName, stat, clientToken, stateObject) => {
    updateDisplay(stateObject.state.desired);
    });


thing.on('delta', (thingName, stateObject) => {
    updateDisplay(stateObject.state);
    });
