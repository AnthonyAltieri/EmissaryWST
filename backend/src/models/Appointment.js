/**
 * Created by kevingu on 2/21/16.
 */
'use strict';

/* Require mongoose to interact with mongoDB */
var mongoose = require('mongoose');
var config = require('../config/config');
var Schema = mongoose.Schema;
var Twilio = require('twilio'); 
const moment = require('moment');
/*
 * Appointment schema
 */

//TODO add last and first name field
var appointmentSchema = mongoose.Schema({
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    phone_number: {type: String, required: true},
    date: {type: Date, required: true},
    provider_name: {type: String, required: true},
    company_id: { type: Schema.Types.ObjectId, ref: 'Company', required: true },
    is_checkedin: {type: Boolean, default: false },
});

appointmentSchema.methods.requiresReminder = function(date) {
	
  return Math.round(moment.duration(moment(this.date).utc()
                          .diff(moment(date).utc())
                        ).asHours()) < 24;
};


appointmentSchema.statics.sendReminder = function(callback) {
  // now
  const searchDate = new Date();
  console.log("running reminder at "+ searchDate);
  Appointment
    .find()
    .then(function(appointments) {
      appointments = appointments.filter(function(appointment) {
              return appointment.requiresReminder(searchDate);
      });
      console.log("after filter");
      console.log(appointments);
      if (appointments.length > 0) {
        sendReminder(appointments);
      }
    });

    /**
    * Send messages to all appoinment owners via Twilio
    * @param {array} appointments List of appointments.
    */
    function sendReminder(appointments) {
        const client = new Twilio(config.twilioAccountSid, config.twilioAuthToken);
        appointments.forEach(function(appointment) {
        	
            const options = {
                to: appointment.phone_number,
                from: config.twilioPhoneNumber,
                /* eslint-disable max-len */
                body: `Hi ${appointment.first_name}. Just a reminder that you have an appointment coming up at ${appointment.date}.`,
                /* eslint-enable max-len */
            };

            // Send the message!
            client.messages.create(options, function(err, response) {
                if (err) {
                    // Just log it for now
                    console.error(err);
                } else {
                    // Log the last few digits of a phone number
                    var masked = appointment.phone_number.substr(0,
                        appointment.phone_number.length - 5);
                    masked += '*****';
                    console.log(`Message sent to ${masked}`);
                }
            });
        });

        // Don't wait on success/failure, just indicate all messages have been
        // queued for delivery
        if (callback) {
          callback.call();
        }
    }
};



const Appointment = mongoose.model('appointment', appointmentSchema);
module.exports = Appointment;

