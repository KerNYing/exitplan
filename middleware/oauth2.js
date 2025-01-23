// oauth2 secret 정보
// development information
const oauth2_secret = require('../env/oauth2_secret_dev.json');
// production information
// const oauth2_secret = require('../env/oauth2_secret_pro.json');

// google api module
const {google} = require('googleapis');

// client 정보
const YOUR_CLIENT_ID = oauth2_secret['web'].client_id;
const YOUR_CLIENT_SECRET = oauth2_secret['web'].client_secret;
const YOUR_REDIRECT_URL = 'http://localhost:80/';

const oauth2Client = new google.auth.OAuth2(
  YOUR_CLIENT_ID,
  YOUR_CLIENT_SECRET,
  YOUR_REDIRECT_URL
);

// generate a url that asks permissions for Blogger and Google Calendar scopes
const scopes = [
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile'
];

const url = oauth2Client.generateAuthUrl({
  // 'online' (default) or 'offline' (gets refresh_token)
  access_type: 'online',

  // If you only need one scope, you can pass it as a string
  scope: scopes
});

module.exports = url;