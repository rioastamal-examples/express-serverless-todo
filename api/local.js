const app = require('./src/index');

const port = process.env.APP_PORT || 8080;

app.listen(port, function() {
  console.log(`API server running on port ${port}`);
});