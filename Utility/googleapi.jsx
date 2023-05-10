const {google} = require('googleapis');
require('dotenv').config();

const oauth2client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI
);
oauth2client.setCredentials({refresh_token: process.env.REFRESH_TOKEN})
const drive = google.drive({
    version: 'v3',
    auth: oauth2client
})
module.exports = oauth2client;