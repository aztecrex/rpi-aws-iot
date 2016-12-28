'use strict';

const Alexa = require('alexa-sdk');
const light = require('./light');

const APP_ID = 'amzn1.ask.skill.26fe2b9f-073c-4822-8c31-30bd85e72f15';

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
        let me = this;
        light.flash(() => me.emit(':tell', me.t('FLASH_MESSAGE')));
    },
    'OnIntent': function () {
        let me = this;
        light.on(() => me.emit(':tell', me.t('ON_MESSAGE')));
    },
    'OffIntent': function () {
        let me = this;
        light.off(() => me.emit(':tell', me.t('OFF_MESSAGE')));
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
