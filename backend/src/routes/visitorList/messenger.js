/**
 * Created by abbas on 5/27/17.
 */
var request = require('request');
var config = require('./../../config/config');
var PAGE_ACCESS_TOKEN = 'EAAFZCV04KRhQBAC6L9qY38TrtizoGSYx865eh9JYRKKqzGKkZBSd0MHf46RO7ZA4sDMpedyuTFRQpCb9FU2t4xCxHpzc01mX3cDK9LBdisXIrJXlmiwbJg6tNAPhZCWCQkHWgEN0YzJ3jN3BWF8wQpNxD2tgLyUqSQ3lSZA0NfQZDZD';
var othertoken = 'abcd12345';
var userState = {};

var toSignIn = "Would you like to sign in?";

exports.get = function (req, res) {

  if (req.query['hub.mode'] === 'subscribe' &&
    req.query['hub.verify_token'] === othertoken) {
    console.log("Validating webhook");
    res.status(200).send(req.query['hub.challenge']);
  }

  else {
    console.error("Failed validation. Make sure the validation tokens match.");
    res.sendStatus(403);
  }
};

exports.post = function (req, res) {
  // 1) check if user is in state
  // 2)
  var data = req.body;

  if (data.object === 'page') {

    data.entry.forEach(function(entry) {
      entry.messaging.forEach(function(event) {

        var sender = event.messaging.sender;
        var message = event.messaging.message;

        if (sender in userState) {
          parseMessage(sender, message);
        }

        else {
          sendTextMessage(sender, toSignIn);
        }
      });
    });
  }


};

function parseMessage(sender, message) {

}


function sendTextMessage(recipientId, messageText) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      text: messageText
    }
  };

  callSendAPI(messageData);
}

function callSendAPI(messageData) {
  request({
    uri: 'https://graph.facebook.com/v2.6/me/messages',
    qs: { access_token: PAGE_ACCESS_TOKEN },
    method: 'POST',
    json: messageData

  }, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var recipientId = body.recipient_id;
      var messageId = body.message_id;

      console.log("Successfully sent generic message with id %s to recipient %s",
        messageId, recipientId);
    } else {
      console.error("Unable to send message.");
      console.error(response);
      console.error(error);
    }
  });
}




