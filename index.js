'use strict';

const env = process.env.ENV || 'production';

const modelLib = require('./model');
const lightLib = (env === 'production')
  ? require('./light')
  : require('./light-simulator');
const buttonLib = (env === 'production')
  ? require('./button')
  : require('./button-simulator');

// const thingName = 'GroundPi';
// const topic = 'info';

const lamp = lightLib.create(40);

const modelListener = event => {

  console.log("listener", event);
  switch(event) {
    case modelLib.LAMP_ON:
      console.log("turning it on");
      lamp.on();
      break;
    case modelLib.LAMP_OFF:
      console.log("turning it off");
      lamp.off();
      break;
    case modelLib.LAMP_FLASH:
      console.log("flashing it");
      lamp.flash();
      break;
  }

};

const model = modelLib.create('thing-001', {}, modelListener);
const button = buttonLib.create(37, () => model.set(true));


// setTimeout(() => model.set(false), 5000);
// setTimeout(() => model.set(true), 7000);


// light.init();
// button.init();
//
// const device = iot.device({
//    keyPath: 'certs/private.pem.key',
//   certPath: 'certs/certificate.pem.crt',
//     caPath: 'certs/root-CA.crt',
//   clientId: 'sub001',
//     region: 'us-east-1'
// });
//
// device
//   .on('connect', () => {
//     console.log('connect', topic);
//     device.subscribe(topic);
//     // device.publish('topic_2', JSON.stringify({ test_data: 1}));
//     });
//
// device
//   .on('message', (topic, payload) => {
//     flashDisplay();
//     // console.log('message', topic, payload.toString());
//   });
//
// const updateDisplay = state => {
//   if (state.lamp) {
//     light.on();
//   } else {
//     light.off();
//   }
// };
//
// const flashDisplay = () => {
//   light.flash();
//   thing.get(thingName);
// };
//
// const thing = iot.thingShadow({
//   keyPath: 'certs/private.pem.key',
//  certPath: 'certs/certificate.pem.crt',
//    caPath: 'certs/root-CA.crt',
//  clientId: 'thing001',
//    region: 'us-east-1'
// });
//
// thing.on('connect', () => {
//   console.log('connect', thingName);
//   thing.register(thingName, {}, () => {
//     console.log("registered");
//     thing.get(thingName);
//     // synchronize once in a while, probably should
//     // use the timeout message instead when I understand
//     // all this a little better
//     const sync = () => {
//       setTimeout(() => {
//         thing.get(thingName);
//         sync();
//       },3000);
//     };
//     sync();
//   });
// });
//
// thing.on('status', (thingName, stat, clientToken, stateObject) => {
//     if (stateObject.state.desired) {
//       updateDisplay(stateObject.state.desired);
//     }
//   });
//
// thing.on('delta', (thingName, stateObject) => {
//     updateDisplay(stateObject.state);
//   });
//
// button.listen(() => console.log("ding"));
