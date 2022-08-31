const express = require('express');
const app = express();

app.set('json spaces', 2);

app.get('/info', (req, res) => {
  res.json({
    name: 'Serverless Todo',
    version: '1.0',
    state: 'demo'
  });
});

module.exports = app;
