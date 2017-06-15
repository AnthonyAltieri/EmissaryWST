'use strict';

const Appointment = require('../models/Appointment');

const reminder = function() {
  return {
    run: function() {
      Appointment.sendReminder();
    },
  };
};

module.exports = reminder();