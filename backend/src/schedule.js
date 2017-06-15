'use strict';

const CronJob = require('cron').CronJob;
const reminder = require('./workers/remind');
const moment = require('moment');

const schedulerFactory = function() {
  return {
    start: function() {
      new CronJob('00 00 22 * * 0-6', function() {
        console.log('Running Send Reminders for Appointments' +
          moment().format());
        reminder.run();
      }, null, true, '');
    },
  };
};

module.exports = schedulerFactory();