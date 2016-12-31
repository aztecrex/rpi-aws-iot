# AWS IoT Experiments on RPi 3

[Demo and walkthrough](https://www.youtube.com/watch?v=-rB4b7DbRlk) of earlier version.

## Hardware

Wire up the [test circuit](https://aztecrex.github.io/rpi-verify-gpio/)

## AWS IoT

Eventually will need some scripts here. For now, you need a AWS Thing called _GroundPi_
(or whatever, just change the code if you use something else). Create a certificate
and attach it to the Thing.

I haven't nailed down the permissions yet. For now, just attach a policy to the
certificate that can do all ops in iot on all resources (yeah, I know, sorry).
You can revoke the certificate when you are done if you think it might leak.

## Run it

0. copy your certificate artifacts into the _certs_ directory using these
names:
   - certificate.pem.crt
   - private.pem.key
   - root-CA.crt
0. `npm install`
0. `node index.js`

## Mess with it

0. Go to the IoT console, select your Thing, then go to it's _shadow_. In the shadow,
add a key called _lamp_ with value _true_ to the _desired_ key of the state. 
The LED wired to the Pi will turn on.
0. notice that the _reported_ state of the lamp then becomes true.
0. Change the desired _lamp_ value to _false_ . The LED will turn off.
0. notice that the _reported_ state of the lamp becomes false.
0. Go to the _test_ console and send any message to the topic _info_. The LED will flash
a few times then return to its former state.
0. press the button on the board. The LED will turn on.
0. exit the program and run `gpio unexportall`. The light will turn off.
0. look at the thing console and notice that the desired and reported lamp state is true.
0. run the program again, the light will return to its former on state.

## How it works

### model.js

This project uses AWS IoT to track state. The unit of state in IoT is called a "Thing" or
"Thing Shadow." This is the cloud-tracked state of the device and it persists when the
device is turned on or loses connectivity.

The state includes two keys, _desired_, and _reported_. The desired state is set by
applications. It is the state that an application sets. When an application sets a
value in the desired state, it is saying "I want the state of the device to be this way,
go figure out how to make it so."

The reported stated is what the device says is the current truth. It's the device saying
"I am this way, do you like it?"

When either desired or reported changes, IoT computes a _delta_, which represents the
difference between desired and reported states. IoT sends the delta to the
device. When the device receives the delta, it performs whatever local operations are
necessary to bring it into the desired state. Then, it reports back to IoT the state
changes it has made.

In `model.js`, the state is simply the lamp value with true meaning on, and false meaning
off. It assumes on initialization that the state is "off."  When IoT receives that reported
off state, it compares it to the desired state of the lamp to determine if any change is
needed. If a change is needed, it sends the to the device. If no change is needed, it does not
contact the device.

If a change is needed, the device responds by invoking the configured listener with the
desired state of the lamp, that listener should manipulate the hardware to bring the
light into the requested state. `model.js` then reports the new state back to IoT.

The module also supports setting the light state from a control on the device. When the
module receives a request to set the lamp state, it checks if it is already in that
state. If not, invokes its listener with the new state. Then, it notifies IoT
with the new lamp state in _both_ desired and reported. That way, it can respond 
immediately to the control while keeping IoT correctly synchronized. Because both 
desired and reported are the same, IoT does not send back a delta.

### light.js

This module actually drives the lamp hardware. It uses a queue to track requests so the
calling module need not wait for the hardware to respond. The light modulel can turn
the light on, turn it off, and flash it. After a flash, the light returns to its previously
designated state.

### light-simulator.js

A simulated light module used when developing off of the device. It displays lamp
state on the console.

### button.js

This module drives a momentary pushbutton in hardware. It invokes its listener every
time the button is pressed.

### button-simulator.js

A simulated button module used when developing off of the device. It treats a CR to the
console as a button press.

## Alexa!

The project has an Alexa integration. No installer or continuous delivery yet but it is
deployed manually as an AWS Lambda Function. Sample utterances include "turn on the light,"
"help," and "flash the light."

The Alexa integration does the same things that the console operations above describe. It
updates the _lamp_ value in the "GroudPi" Thing and sends messages to the _info_ topic.

Look in the _alexa_ directory for code.

## Changes

- 2016-12-31 add a button. The button sets the lamp value true in the model

## TODO

0. Automate the AWS setup.
0. Constrain the permissions.
0. Provision less scatterbrained resources. Have each device track its own state. Maybe tie only
the on/off state to each indidual device but have flash apply to all devices. Party.
0. Figure out how other people can run this against a secure shared IoT setup so they can skip that
setup part and all devices will be part of one big happy family.
0. Launch the missiles.
