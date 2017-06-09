'use strict';

var express = require('express');
var router = express.Router();
var bodyparser = require('body-parser');

// Load the twilio module
var twilio = require('twilio');

// Twilio Credentials 
var accountSid = 'AC09788df6478ec798673fddaa4236ec4c';
var authToken = 'd12636a544c81c07c7441d9795faa624';
 
//require the Twilio module and create a REST client 
var client = require('twilio')(accountSid, authToken); 
var exports = module.exports;

// sendText: Send text message to employees when a visitor makes an appointment
module.exports.sendText = function(patientName, employees, done) {
  if(employees === null || (employees.length <= 0)) {
    if(done) return done();
  }

  var len = employees.length;
  var callback = function(i) {
    return function(error, message) { 
      if(error) {
        console.log(error);
        console.log("Error occurred sending text");
        //res.json({message : "Error occurred sending text"});
      } else {
        //res.json({message: "Text was sent."});
        console.log("Text was sent.");
      }
      if(done && len-1 == i) done();
    };
  };
  // iterate through all employees 
  for (var index = 0; index < employees.length; index++) {
    // create text message object that will be sent
    client.messages.create({  
      to: employees[index].phone_number,
      from: "+15014062414",
      body:'Your visitorList ' + patientName + ' is ready.'
    }, callback(index));
  }
};
