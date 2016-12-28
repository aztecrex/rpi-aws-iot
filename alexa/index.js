'use strict';

const Alexa = require('alexa-sdk');

const APP_ID = undefined;  // TODO replace with your app ID (OPTIONAL).

const languageStrings = {
    'en-US': {
        translation: {
            SKILL_NAME: 'Pi Thing',
            ON_MESSAGE: "Light is lit",
            OFF_MESSAGE: "Light is off",
            FLASH_MESSAGE: "Whoop! Whoop!",
            HELP_MESSAGE: 'You can say "turn on the light" or "flash the light", or, you can say "exit"... What can I help you with?',
            HELP_REPROMPT: 'What can I help you with?',
            STOP_MESSAGE: 'Goodbye!',
        },
    },
};

const handlers = {
    'LaunchRequest': function () {
        this.emit('AMAZON.HelpIntent');
    },
    'FlashIntent': function () {
        this.emit(':tell', this.t('FLASH_MESSAGE'));
    },
    'OnIntent': function () {
        this.emit(':tell', this.t('ON_MESSAGE'));
    },
    'OffIntent': function () {
        this.emit(':tell', this.t('OFF_MESSAGE'));
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = this.t('HELP_MESSAGE');
        const reprompt = this.t('HELP_MESSAGE');
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    'SessionEndedRequest': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
};

exports.handler = (event, context) => {
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
