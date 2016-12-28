'use strict';

const aws = require('aws-sdk');
aws.config.update({region: 'us-east-1'});
const iot = new aws.IotData({endpoint: 'https://ad78o9k6p57sk.iot.us-east-1.amazonaws.com'});



const on = cb => {
  let payload = JSON.stringify({state:{desired:{lamp:true}}});
  let request = {
    payload: payload,
    thingName: 'GroundPi'
  };
  iot.updateThingShadow(request, function(err, data) {
    if (err) console.log(err, err.stack);
    else     console.log(data);
    cb(err, data);
  });
};

const off = cb => {
  let payload = JSON.stringify({state:{desired:{lamp:false}}});
  var request = {
    payload: payload,
    thingName: 'GroundPi'
  };
  iot.updateThingShadow(request, function(err, data) {
    if (err) console.log(err, err.stack);
    else     console.log(data);
    cb(err, data);
  });
};

const flash = cb => {
  let payload = JSON.stringify({message: "whatever"});
  let request = {
    topic: 'info',
    payload: payload,
    qos: 0
  };
  iot.publish(request, function(err, data) {
    if (err) console.log(err, err.stack);
    else     console.log(data);
    cb(err, data);
  });
};

exports.on = on;
exports.off = off;
exports.flash = flash;
