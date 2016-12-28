# AWS IoT Experiments on RPi 3

<iframe width="560" height="315" src="https://www.youtube.com/embed/-rB4b7DbRlk" frameborder="0" allowfullscreen></iframe>

## Hardware

Wire up the [test circuit](https://aztecrex.github.io/rpi-verify-gpio/)

## AWS IoT

All device state and messages run through the IoT platform. The platform provides
both low-level MQTT communication through _topics_ and higher-level persistent
device state through _Thing Shadows_

Eventually will need some scripts to make setup easy. For now, you need a AWS
Thing called _GroundPi_ (or whatever, just change the code if you use something
else). Create a certificate and attach it to the Thing.

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
add a key called _lamp_ with value _true_.  The LED wired to the Pi will turn on.
0. Change the _lamp_ value to _false_ . The LED will turn off.
0. Go to the _test_ console and send any message to the topic _info_. The LED will flash
a few times then return to its former state.

## Alexa!

Just finished the Alexa integration. No installer or continuous delivery yet but it is
deployed manually as an AWS Lambda Function. Sample utterances include "turn on the light"
and "flash the light."

The Alexa integration does the same things that the console operations above describe. It
updates the _lamp_ value in the "GroudPi" Thing and sends messages to the _info_ topic.

Look in the _alexa_ directory for code.

## TODO

0. Automate the AWS setup.
0. Constrain the permissions.
0. Provision less scatterbrained resources. Have each device track its own state. Maybe tie only
the on/off state to each indidual device but have flash apply to all devices. Party.
0. Figure out how other people can run this against a secure shared IoT setup so they can skip that
setup part and all devices will be part of one big happy family.
0. Launch the missiles.
