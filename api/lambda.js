const app = require('./src/index');
const serverless = require('serverless-http');

exports.handler = serverless(app);