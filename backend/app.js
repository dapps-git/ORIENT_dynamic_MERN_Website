// cPanel / Phusion Passenger backend startup file
require('dotenv').config();
const app = require('./dist/server.js').default || require('./dist/server.js');
module.exports = app;
