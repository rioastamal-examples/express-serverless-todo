const app = require(process.env.APP_EXPRESS_PATH || './src/index.js');
const serverless = require('serverless-http');

exports.handler = serverless(app);