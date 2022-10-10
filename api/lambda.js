const appExpressPath = process.env.APP_EXPRESS_PATH || './src/index';
const app = require(appExpressPath);
const serverless = require('serverless-http');

exports.handler = serverless(app);