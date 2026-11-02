// cPanel / Phusion Passenger root entry point
require('dotenv').config({ path: require('path').join(__dirname, 'backend', '.env') });
module.exports = require('./backend/app.js');
