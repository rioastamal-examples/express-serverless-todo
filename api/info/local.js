const appExpressPath = process.env.APP_EXPRESS_PATH || './src/index';
const app = require(appExpressPath);

const port = process.env.APP_PORT || 8080;

app.listen(port, function() {
  console.log(`API server running on port ${port}`);
});