/**
 * Config var for app
**/
module.exports = {
  mongoDBUrl: process.env.MONGODB_URL || process.env.MONGOLAB_URI || 'mongodb://admin:admin@ds143081.mlab.com:43081/cse112-1-emissary' || 'mongodb://localhost:27017/webstormtroopers',
  port: process.env.PORT || 4941,
  secret: process.env.SECRET || 'mysecret',
  twilioAccountSid: 'AC09788df6478ec798673fddaa4236ec4c',
  twilioAuthToken: 'd12636a544c81c07c7441d9795faa624',
  twilioPhoneNumber: '+15014062414'
};
